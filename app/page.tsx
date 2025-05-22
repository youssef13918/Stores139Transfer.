import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { CommissionTable } from "@/components/commission-table"
import { AboutUs } from "@/components/about-us"
import { LivePrice } from "@/components/live-price"
import { SellForm } from "@/components/sell-form"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <HeroSection />

        <LivePrice />

        {/* Sección con título y formulario justo debajo del LivePrice */}
        <section className="my-12 max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Vende WLD Fácil y Seguro</h2>
          <SellForm />
        </section>

        <HowItWorks />

        <CommissionTable />

        {/* Sección ¿Por qué elegirnos? */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">¿Por qué elegirnos?</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3">Mejores Precios</h3>
                <p className="text-gray-600">
                  Ofrecemos las mejores tasas del mercado para tus WorldCoin.
                </p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3">Proceso Rápido</h3>
                <p className="text-gray-600">
                  Recibe tu dinero en menos de 24 horas tras la confirmación.
                </p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3">Seguridad Garantizada</h3>
                <p className="text-gray-600">
                  Todas las transacciones están protegidas y son 100% seguras.
                </p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3">Soporte 24/7</h3>
                <p className="text-gray-600">
                  Nuestro equipo está disponible para ayudarte en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
