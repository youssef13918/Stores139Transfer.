import { NextRequest, NextResponse } from 'next/server'

// En producción guarda el UUID en tu base de datos para validar después
let lastUUID = ''

export async function POST(req: NextRequest) {
  const uuid = crypto.randomUUID().replace(/-/g, '')
  lastUUID = uuid // Guarda en memoria temporal para demo, reemplaza en prod

  return NextResponse.json({ id: uuid })
}

// Exporta función para obtener referencia en confirm-payment
export function getReferenceFromDB() {
  return lastUUID
}
