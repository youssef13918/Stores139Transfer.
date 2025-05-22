import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // En una implementación real, aquí enviarías un correo electrónico
    // a store139transfer@gmail.com con los datos de la orden

    console.log("Order data received:", data)

    // Simulación de envío de correo electrónico
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({ success: true, message: "Order submitted successfully" })
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json({ success: false, message: "Failed to process order" }, { status: 500 })
  }
}
