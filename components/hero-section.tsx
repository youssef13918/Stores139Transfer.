import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Vende WLD Fácil y Seguro</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Convierte tus Worldcoins (WLD) en dinero real de forma rápida y segura. Elige entre transferencia bancaria o
          PayPal y recibe tu pago en menos de 12 horas.
        </p>
        <Button size="lg" asChild className="text-xl px-10 py-7 rounded-xl">
          <Link href="#vender">
            Vender Ahora
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
