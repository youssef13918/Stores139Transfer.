"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

export function LivePrice() {
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const API_KEY = "19668bc9f82c98c2f23d6e0ffe164ac2b5cdeb4d063a95d0a6f0f90fdc1ff0a0"

  const fetchLivePrice = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=WLD&tsyms=USD`,
        {
          headers: {
            Authorization: `Apikey ${API_KEY}`,
          },
        }
      )
      const data = await res.json()

      if (data.USD) {
        setPrice(data.USD)
        setLastUpdated(new Date())
      } else {
        console.error("Respuesta inesperada de API:", data)
      }
    } catch (error) {
      console.error("Error al obtener el precio:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchLivePrice()
    const interval = setInterval(fetchLivePrice, 60000)
    return () => clearInterval(interval)
  }, [])

  const formattedTime = `${lastUpdated.getHours().toString().padStart(2, "0")}:${lastUpdated
    .getMinutes()
    .toString()
    .padStart(2, "0")}`

  return (
    <section className="py-8 container mx-auto px-4">
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold mb-1">Precio actual de WLD</h3>
              <div className="flex items-center gap-2">
                {loading || price === null ? (
                  <div className="animate-pulse h-8 w-24 bg-gray-200 rounded" />
                ) : (
                  <span className="text-2xl font-bold">${price.toFixed(2)}</span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Datos en vivo desde CryptoCompare</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <RefreshCw className={`h-3 w-3 mr-1 ${loading ? "animate-spin" : ""}`} />
                <span>Actualizado {loading ? "..." : formattedTime}</span>
              </div>
              <button
                onClick={fetchLivePrice}
                disabled={loading}
                className="text-xs text-green-600 hover:underline disabled:opacity-50"
              >
                {loading ? "Actualizando..." : "Actualizar ahora"}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
