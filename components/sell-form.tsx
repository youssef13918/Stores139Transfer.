"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { calculateNetAmount } from "@/lib/commission"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { createOrder } from "@/lib/orders"
import { useLivePrice } from "@/hooks/use-live-price"

import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js'

export function SellForm() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [amount, setAmount] = useState<number>(0)
  const [paymentMethod, setPaymentMethod] = useState("bank")
  const [bankName, setBankName] = useState("")
  const [fullName, setFullName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [paypalEmail, setPaypalEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const wldPrice = useLivePrice()
  const { commission, commissionPercentage, netAmount } = calculateNetAmount(amount, wldPrice)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setAmount(isNaN(value) ? 0 : value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Inicia sesión primero",
        description: "Debes iniciar sesión para vender WLD",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (amount < 1 || amount > 500) {
      toast({
        title: "Cantidad inválida",
        description: "Debes vender entre 1 y 500 WLD",
        variant: "destructive",
      })
      return
    }

    if (!MiniKit.isInstalled()) {
      toast({
        title: "World App no detectada",
        description: "Por favor instala y abre World App para continuar",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // 1. Iniciar el pago en backend para obtener el ID
      const res = await fetch('/api/initiate-payment', { method: 'POST' })
      const { id: reference } = await res.json()

      // 2. Preparar el payload para MiniKit Pay command
      const payload: PayCommandInput = {
        reference,
        to: '0x01a0eea37c87cfaf13efd17674d2af21e5401bb0', // tu dirección Worldchain
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(amount, Tokens.WLD).toString(),
          },
        ],
        description: `Venta de ${amount} WLD por ${user.username}`,
      }

      // 3. Ejecutar el pago con MiniKit
      const { finalPayload } = await MiniKit.commandsAsync.pay(payload)

      if (finalPayload.status === 'success') {
        console.log("Pago exitoso!")

        // 4. Confirmar el pago en backend
        const confirmRes = await fetch('/api/confirm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalPayload),
        })
        const payment = await confirmRes.json()

        if (payment.success) {
          // 5. Crear orden y mostrar éxito
          const orderData = {
            username: user.username,
            email: user.email,
            amount,
            paymentmethod: paymentMethod,
            bankname: paymentMethod === "bank" ? bankName : "",
            fullname: paymentMethod === "bank" ? fullName : "",
            accountnumber: paymentMethod === "bank" ? accountNumber : "",
            paypalemail: paymentMethod === "paypal" ? paypalEmail : "",
            wldprice: wldPrice,
            commission,
            netamount: netAmount,
            status: "confirmado",
            timestamp: new Date().toISOString(),
          }
          await createOrder(orderData)

          toast({
            title: "¡Pago exitoso!",
            description: `Has vendido ${amount} WLD correctamente.`,
          })

          setAmount(0)
          setBankName("")
          setFullName("")
          setAccountNumber("")
          setPaypalEmail("")
          router.push("/perfil")
        } else {
          throw new Error('Pago no confirmado por backend')
        }
      } else {
        throw new Error('Pago cancelado o fallido en MiniKit')
      }
    } catch (error) {
      console.error("Error en el pago:", error)
      toast({
        title: "Error al procesar el pago",
        description: "Por favor, inténtalo de nuevo o verifica tu Wallet World App.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="vender" className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Vende tus WLD</h2>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Formulario de venta</CardTitle>
            <CardDescription>Completa los datos para vender tus Worldcoins (WLD)</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {!user && (
                <div className="bg-amber-50 p-4 rounded-lg text-amber-800">
                  <p className="mb-3 text-sm">
                    Debes iniciar sesión con tu nombre de usuario y correo electrónico para vender WLD.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-amber-100 border-amber-200 hover:bg-amber-200 text-amber-800"
                      onClick={() => router.push("/login")}
                    >
                      Iniciar sesión
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-amber-100 border-amber-200 hover:bg-amber-200 text-amber-800"
                      onClick={() => router.push("/register")}
                    >
                      Registrarse
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="amount">Cantidad de WLD a vender</Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  max="500"
                  step="0.01"
                  value={amount || ""}
                  onChange={handleAmountChange}
                  placeholder="0"
                  required
                />
              </div>

              <Tabs defaultValue="bank" onValueChange={setPaymentMethod}>
                <Label>Método de pago</Label>
                <TabsList className="grid w-full grid-cols-2 mt-2">
                  <TabsTrigger value="bank">Transferencia Bancaria</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>

                <TabsContent value="bank" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Nombre del banco</Label>
                    <Input
                      id="bankName"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="Ej: BBVA, Santander, Revolut, etc."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombre completo</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nombre y apellidos"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Número de cuenta</Label>
                    <Input
                      id="accountNumber"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="IBAN o número de cuenta"
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="paypal" className="space-y-2 mt-4">
                  <Label htmlFor="paypalEmail">Correo electrónico de PayPal</Label>
                  <Input
                    id="paypalEmail"
                    type="email"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                  />
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Procesando..." : "Vender WLD"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  )
}
