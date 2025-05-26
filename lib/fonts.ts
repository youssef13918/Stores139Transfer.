import { Inter } from "next/font/google"

// Exporta la fuente con una configuración clara
export const inter = Inter({
  subsets: ["latin"],
  display: "swap", // mejora el rendimiento de carga de fuente
  variable: "--font-inter", // útil si usas Tailwind con fuentes variables
})

