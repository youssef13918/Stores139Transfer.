import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, RefreshCw, Mail, CheckCircle } from "lucide-react"

export function AboutUs() {
  return (
    <section id="nosotros" className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Acerca de nosotros</h2>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Store139Transfer – Tu puente seguro para convertir WLD en dinero real.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Seguridad y Rapidez</h3>
                <p className="text-gray-600">Entrega en menos de 12 horas garantizada para todas las transacciones.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Venta Confiable</h3>
                <p className="text-gray-600">
                  A través de verificación y pago integrado con World App para mayor seguridad.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Lock className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Datos Protegidos</h3>
                <p className="text-gray-600">
                  Solo se usa la información necesaria y se envía a nuestro correo de manera segura.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <RefreshCw className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Actualización de Precios</h3>
                <p className="text-gray-600">
                  Se refleja el valor real del WLD en tiempo real para garantizar el mejor precio.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Soporte directo</h3>
                <p className="text-gray-600">Escríbenos a store139transfer@gmail.com para cualquier duda o consulta.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Confianza garantizada</h3>
                <p className="text-gray-600">
                  Usuarios únicos verificados por World App para mayor seguridad en cada transacción.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
