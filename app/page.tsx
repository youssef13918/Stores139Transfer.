import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { CommissionTable } from "@/components/commission-table"
import { LivePrice } from "@/components/live-price"
import { SellForm } from "@/components/sell-form"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />

        <section className="py-12 bg-muted/40">
          <div className="container max-w-4xl mx-auto px-4 text-center space-y-6">
            <LivePrice />
            <h2 className="text-3xl md:text-4xl font-extrabold">Vende WLD Fácil y Seguro</h2>
            <SellForm />
          </div>
        </section>

        <HowItWorks />

        <CommissionTable />

        {/* Sección ¿Por qué elegirnos? */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">¿Por qué elegirnos?</h2>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Mejores Precios",
                  desc: "Ofrecemos las mejores tasas del mercado para tus WorldCoin.",
                },
                {
                  title: "Proceso Rápido",
                  desc: "Recibe tu dinero en menos de 24 horas tras la confirmación.",
                },
                {
                  title: "Seguridad Garantizada",
                  desc: "Todas las transacciones están protegidas y son 100% seguras.",
                },
                {
                  title: "Soporte 24/7",
                  desc: "Nuestro equipo está disponible para ayudarte en cualquier momento.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-md transition hover:scale-[1.03]"
                >
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
