import Link from "next/link"
import { Wallet, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold">Store139Transfer</span>
            </div>
            <p className="text-gray-400">Tu puente seguro para convertir WLD en dinero real.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#como-funciona" className="text-gray-400 hover:text-white">
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link href="#comisiones" className="text-gray-400 hover:text-white">
                  Comisiones
                </Link>
              </li>
              <li>
                <Link href="#nosotros" className="text-gray-400 hover:text-white">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="h-5 w-5" />
              <span>store139transfer@gmail.com</span>
            </div>
            <p className="text-gray-400 mt-2">Soporte directo para cualquier duda o consulta.</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Store139Transfer. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
