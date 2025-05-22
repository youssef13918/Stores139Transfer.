import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, CreditCard, Clock } from "lucide-react"

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">¿Cómo funciona?</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>1. Introduce tus datos</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Ingresa tu nombre de usuario de World App y elige tu método de pago preferido.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>2. Elige el monto</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Selecciona la cantidad de WLD que deseas vender y verifica la comisión aplicada.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>3. Recibe tu dinero</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">En menos de 12 horas, recibirás el pago en tu cuenta bancaria o PayPal.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
