"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Wallet } from "lucide-react"

export default function VenderPage() {
  const [cantidad, setCantidad] = useState<number>(0)
  const [metodoPago, setMetodoPago] = useState<string>("transferencia")

  // Tasa de cambio simulada
  const tasaCambio = 0.85
  const total = cantidad * tasaCambio

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">WorldCoin Exchange</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium">
              Inicio
            </Link>
            <Link href="/como-funciona" className="font-medium">
              Cómo Funciona
            </Link>
            <Link href="/contacto" className="font-medium">
              Contacto
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center text-gray-600 mb-6 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>

          <h1 className="text-3xl font-bold mb-8">Vende tus WorldCoin</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la venta</CardTitle>
                <CardDescription>Indica la cantidad de WorldCoin que deseas vender</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cantidad">Cantidad de WorldCoin</Label>
                  <Input
                    id="cantidad"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={cantidad || ""}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tasa de cambio:</span>
                    <span className="font-medium">{tasaCambio} EUR por WorldCoin</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total a recibir:</span>
                    <span>{total.toFixed(2)} EUR</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Método de pago</CardTitle>
                <CardDescription>Selecciona cómo quieres recibir tu dinero</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="transferencia" onValueChange={setMetodoPago}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="transferencia">Transferencia</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    <TabsTrigger value="efectivo">Efectivo</TabsTrigger>
                  </TabsList>

                  <TabsContent value="transferencia" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="titular">Titular de la cuenta</Label>
                      <Input id="titular" placeholder="Nombre completo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iban">IBAN</Label>
                      <Input id="iban" placeholder="ES91 2100 0418 4502 0005 1332" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="banco">Banco</Label>
                      <Input id="banco" placeholder="Nombre del banco" />
                    </div>
                  </TabsContent>

                  <TabsContent value="paypal" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-paypal">Email de PayPal</Label>
                      <Input id="email-paypal" type="email" placeholder="tu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmar-email">Confirmar Email</Label>
                      <Input id="confirmar-email" type="email" placeholder="tu@email.com" />
                    </div>
                  </TabsContent>

                  <TabsContent value="efectivo" className="space-y-4">
                    <div className="p-4 bg-yellow-50 rounded-lg mb-4">
                      <p className="text-yellow-800">
                        El pago en efectivo está disponible solo en nuestras oficinas. Por favor, selecciona la oficina
                        más cercana y programa una cita.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oficina">Selecciona una oficina</Label>
                      <RadioGroup defaultValue="madrid">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="madrid" id="madrid" />
                          <Label htmlFor="madrid">Madrid - Calle Gran Vía, 28</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="barcelona" id="barcelona" />
                          <Label htmlFor="barcelona">Barcelona - Passeig de Gràcia, 43</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="valencia" id="valencia" />
                          <Label htmlFor="valencia">Valencia - Calle Colón, 15</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={cantidad <= 0}>
                  Continuar con la venta
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Información importante</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>El proceso de venta puede tardar hasta 24 horas en completarse.</li>
              <li>La tasa de cambio puede variar según las fluctuaciones del mercado.</li>
              <li>
                Para ventas superiores a 1,000 WorldCoin, contacta con nuestro equipo para obtener una tasa
                personalizada.
              </li>
              <li>Necesitarás proporcionar una identificación válida para completar la transacción.</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} WorldCoin Exchange. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
