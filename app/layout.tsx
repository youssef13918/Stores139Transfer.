import type { Metadata } from "next"
import "./globals.css"
import { inter } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"

export const metadata: Metadata = {
  title: "Store139Transfer - Vende WLD Fácil y Seguro",
  description:
    "Vende tus Worldcoins (WLD) de forma rápida, segura y directa, eligiendo entre transferencia bancaria o PayPal como método de pago.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
