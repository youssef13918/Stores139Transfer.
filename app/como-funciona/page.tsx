import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Wallet, DollarSign, CreditCard, CheckCircle } from "lucide-react"

export default function ComoFuncionaPage() {
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
            <Link href="/como-funciona" className="font-medium text-green-600">
              Cómo Funciona
            </Link>
            <Link href="/contacto" className="font-medium">
              Contacto
            </Link>
          </nav>
          <Button asChild>
            <Link href="/vender">Vender Ahora</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-green-50 to-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">¿Cómo funciona Store139Transfer?</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Vender tus WorldCoin nunca ha sido tan fácil. Sigue estos sencillos pasos para convertir tus criptomonedas
              en dinero real.
            </p>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">1. Selecciona la cantidad</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Indica cuántos WorldCoin deseas vender en nuestro formulario. Verás al instante cuánto dinero
                  recibirás basado en nuestra tasa de cambio actual.
                </p>
                <p className="text-gray-600">No hay cantidad mínima, puedes vender desde 1 WorldCoin.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">2. Elige tu método de pago</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Selecciona cómo quieres recibir tu dinero: transferencia bancaria, PayPal.
                </p>
                <p className="text-gray-600">
                  Proporciona los datos necesarios según el método elegido para que podamos procesarlo correctamente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">3. Recibe tu pago</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Una vez confirmada la transacción, procesaremos tu solicitud y recibirás tu dinero en menos de 12
                  horas.
                </p>
                <p className="text-gray-600">Te notificaremos por email cuando el pago haya sido enviado.</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Preguntas frecuentes</h2>

            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-2">¿Cuál es la tasa de cambio actual?</h3>
                <p className="text-gray-600">
                  Nuestra tasa de cambio se actualiza diariamente según el mercado.  Para cantidades grandes, podemos ofrecer tasas personalizadas.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">¿Cuánto tiempo tarda en procesarse mi pago?</h3>
                <p className="text-gray-600">
                  Los pagos por transferencia bancaria y PayPal suelen procesarse en menos de 12 horas
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">¿Hay alguna comisión por usar el servicio?</h3>
                <p className="text-gray-600">
                  No cobramos comisiones adicionales. La tasa de cambio que mostramos ya incluye nuestro margen. Lo que
                  ves es lo que recibirás.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">¿Es seguro vender mis WorldCoin aquí?</h3>
                <p className="text-gray-600">
                  Absolutamente. Utilizamos tecnología de encriptación avanzada para proteger tus datos y transacciones.
                  Además, cumplimos con todas las regulaciones financieras aplicables.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ventajas de usar Store139Transfer</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Proceso Simple</h3>
                <p className="text-gray-600">Interfaz intuitiva y proceso de venta simplificado en solo 3 pasos.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Mejores Tasas</h3>
                <p className="text-gray-600">Ofrecemos las tasas más competitivas del mercado para tus WorldCoin.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Pagos Rápidos</h3>
                <p className="text-gray-600">Recibe tu dinero en menos de 24 horas tras la confirmación.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Atención Personalizada</h3>
                <p className="text-gray-600">Soporte disponible por chat, email y teléfono para resolver tus dudas.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">¿Listo para vender tus WorldCoin?</h2>
          <Button size="lg" asChild>
            <Link href="/vender" className="text-lg px-8">
              Comenzar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Store139Transfer</h3>
              <p className="text-gray-400">
                La forma más rápida y segura de vender tus WorldCoin por efectivo o transferencia.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/como-funciona" className="text-gray-400 hover:text-white">
                    Cómo Funciona
                  </Link>
                </li>
                <li>
                  <Link href="/precios" className="text-gray-400 hover:text-white">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-gray-400 hover:text-white">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p className="text-gray-400">
                Email: store139transfer@gmail.com
                <br />
            
                <br />
                Horario: Lunes a domingo, 9:00 - 22:00
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Store139Transfer. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
