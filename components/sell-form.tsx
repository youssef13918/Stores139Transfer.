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

// Importa MiniKit y helpers de worldcoin minikit-js
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

  const sendPayment = async (payAmount: number) => {
    try {
      // Paso 1: Iniciar el pago en backend para obtener referencia
      const res = await fetch('/api/initiate-payment', {
        method: 'POST',
      })
      const { id } = await res.json()

      // Limitar amount mínimo 1 y máximo 500 WLD
      const clampedAmount = Math.min(Math.max(payAmount, 1), 500)

      // Preparar payload para pay
      const payload: PayCommandInput = {
        reference: id,
        to: '0xed036da30351904733ca13c7832d2cb51ffc72da', // tu dirección
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(clampedAmount, Tokens.WLD).toString(),
          }
        ],
        description: `Pago de ${clampedAmount} WLD en la mini app`,
      }

      if (!MiniKit.isInstalled()) {
        toast({
          title: "Wallet no detectada",
          description: "Por favor instala World App para poder pagar",
          variant: "destructive",
        })
        return { success: false }
      }

      // Paso 2: Ejecutar el pago on-chain con la wallet
      const { finalPayload } = await MiniKit.commandsAsync.pay(payload)

      // Paso 3: Confirmar el pago en backend
      if (finalPayload.status === "success") {
        const confirmRes = await fetch(`/api/confirm-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalPayload),
        })
        const confirmJson = await confirmRes.json()
        if (confirmJson.success) {
          return { success: true }
        } else {
          toast({
            title: "Pago no confirmado",
            description: "Hubo un problema verificando el pago.",
            variant: "destructive",
          })
          return { success: false }
        }
      } else {
        toast({
          title: "Pago fallido o cancelado",
          description: "El pago no se completó.",
          variant: "destructive",
        })
        return { success: false }
      }
    } catch (error) {
      console.error("Error en proceso de pago:", error)
      toast({
        title: "Error en el pago",
        description: "Inténtalo de nuevo más tarde.",
        variant: "destructive",
      })
      return { success: false }
    }
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

    if (amount <= 0) {
      toast({
        title: "Cantidad inválida",
        description: "Introduce una cantidad válida de WLD",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Ejecutar el pago on-chain primero
    const paymentResult = await sendPayment(amount)

    if (!paymentResult.success) {
      setIsSubmitting(false)
      return
    }

    try {
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
        status: "pendiente",
        timestamp: new Date().toISOString(),
      }

      await createOrder(orderData)

      toast({
        title: "¡Venta procesada con éxito!",
        description: "Recibirás tu pago en menos de 12 horas.",
      })

      setAmount(0)
      setBankName("")
      setFullName("")
      setAccountNumber("")
      setPaypalEmail("")
      router.push("/perfil")
    } catch (error) {
      console.error("Error processing sale:", error)
      toast({
        title: "Error al procesar la venta",
        description: "Por favor, inténtalo de nuevo más tarde.",
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
                  min="0"
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

                <TabsContent value="paypal" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="paypalEmail">Correo electrónico de PayPal</Label>
                    <Input
                      id="paypalEmail"
                      type="email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {amount > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Precio actual de WLD:</span>
                    <div className="flex items-center">
                      <span className="font-medium">${wldPrice.toFixed(2)} USD</span>
                      <span className="text-xs text-gray-500 ml-2">(en vivo)</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Comisión aplicada:</span>
                    <span className="font-medium">{(commissionPercentage * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">WLD después de comisión:</span>
                    <span className="font-medium">{(amount - commission).toFixed(2)} WLD</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                    <span>Total a recibir:</span>
                    <span>${netAmount.toFixed(2)} USD</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  !user ||
                  amount <= 0 ||
                  (paymentMethod === "bank" && (!bankName || !fullName || !accountNumber)) ||
                  (paymentMethod === "paypal" && !paypalEmail) ||
                  isSubmitting
                }
              >
                {isSubmitting ? "Procesando..." : "Vender WLD"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  )
}
