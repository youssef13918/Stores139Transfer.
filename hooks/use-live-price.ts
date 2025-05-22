"use client"

import { useEffect, useState } from "react"

export function useLivePrice() {
  const [price, setPrice] = useState<number>(1.05)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("https://min-api.cryptocompare.com/data/price?fsym=WLD&tsyms=USD")
        const data = await res.json()
        if (data?.USD) setPrice(data.USD)
      } catch (e) {
        console.error("Error al obtener precio:", e)
      }
    }

    fetchPrice()
    const interval = setInterval(fetchPrice, 60000)
    return () => clearInterval(interval)
  }, [])

  return price
}
