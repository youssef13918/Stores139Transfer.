import { NextRequest, NextResponse } from 'next/server'
import { MiniAppPaymentSuccessPayload } from '@worldcoin/minikit-js'

interface IRequestPayload {
  payload: MiniAppPaymentSuccessPayload
}

// Simula obtener de tu base de datos
const getReferenceFromDB = () => {
  return 'el-id-que-guardaste-previamente' // Aquí deberías reemplazar por consulta real
}

export async function POST(req: NextRequest) {
  const { payload } = (await req.json()) as IRequestPayload
  const reference = getReferenceFromDB()

  if (payload.reference === reference) {
    const response = await fetch(
      `https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}?app_id=${process.env.APP_ID}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.DEV_PORTAL_API_KEY}`,
        },
      }
    )

    const transaction = await response.json()

    if (transaction.reference == reference && transaction.status !== 'failed') {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false })
    }
  } else {
    // Respuesta si la referencia no coincide
    return NextResponse.json({ success: false })
  }
}
