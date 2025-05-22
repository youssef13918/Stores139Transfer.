import { createClientSupabaseClient } from "./supabase"

// Tipo de orden adaptado a los nombres de columnas en Supabase (todo en minúsculas)
export type Order = {
  id?: string
  username: string
  amount: number
  paymentmethod: string // Cambiado a minúsculas
  bankname?: string // Cambiado a minúsculas
  fullname?: string // Cambiado a minúsculas
  accountnumber?: string // Cambiado a minúsculas
  paypalemail?: string // Cambiado a minúsculas
  wldprice: number // Cambiado a minúsculas
  commission: number
  netamount: number // Cambiado a minúsculas
  status: "pendiente" | "pagado" | "cancelado"
  timestamp: string
  email?: string
}

// Crear una nueva orden
export async function createOrder(orderData: Omit<Order, "id">): Promise<Order> {
  const supabase = createClientSupabaseClient()

  try {
    // Crear la orden con la fecha actual
    const newOrder = {
      ...orderData,
      timestamp: new Date().toISOString(),
    }

    // Insertar en Supabase
    const { data, error } = await supabase.from("orders").insert(newOrder).select().single()

    if (error) {
      console.error("Error creating order:", error)
      throw new Error(`Failed to create order: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

// Obtener todas las órdenes
export async function getAllOrders(): Promise<Order[]> {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase.from("orders").select("*").order("timestamp", { ascending: false })

  if (error) {
    console.error("Error fetching orders:", error)
    return []
  }

  return data || []
}

// Obtener órdenes de un usuario específico
export async function getUserOrders(username: string): Promise<Order[]> {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("username", username)
    .order("timestamp", { ascending: false })

  if (error) {
    console.error("Error fetching user orders:", error)
    return []
  }

  return data || []
}

// Actualizar el estado de una orden
export async function updateOrderStatus(
  orderId: string,
  status: "pendiente" | "pagado" | "cancelado",
): Promise<Order | null> {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase.from("orders").update({ status }).eq("id", orderId).select().single()

  if (error) {
    console.error("Error updating order status:", error)
    return null
  }

  return data
}
