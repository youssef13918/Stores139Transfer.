"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { getUserOrders, type Order } from "@/lib/orders"

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirigir si no hay usuario autenticado
    if (!user) {
      router.push("/login")
      return
    }

    // Cargar órdenes del usuario
    const loadOrders = async () => {
      try {
        const userOrders = await getUserOrders(user.username)
        setOrders(userOrders)
      } catch (error) {
        console.error("Error loading orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [user, router])

  if (!user) return null

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Mi perfil</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Información de usuario</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">Nombre de usuario:</p>
                <p className="text-gray-600 mb-2">{user.username}</p>
                {user.fullName && (
                  <>
                    <p className="font-medium">Nombre completo:</p>
                    <p className="text-gray-600 mb-2">{user.fullName}</p>
                  </>
                )}
                <p className="font-medium">Correo electrónico:</p>
                <p className="text-gray-600 mb-4">{user.email}</p>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Mis transacciones</CardTitle>
                <CardDescription>Historial de ventas de WLD</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center py-4">Cargando transacciones...</p>
                ) : orders.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No tienes transacciones todavía</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="bg-gray-50">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">
                                {order.amount} WLD ({order.paymentmethod === "bank" ? "Transferencia" : "PayPal"})
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(order.timestamp).toLocaleDateString()} -
                                {new Date(order.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                            <Badge
                              className={
                                order.status === "pagado"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "cancelado"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                              }
                            >
                              {order.status === "pagado"
                                ? "Pagado"
                                : order.status === "cancelado"
                                  ? "Cancelado"
                                  : "Confirmado"}
                            </Badge>
                          </div>
                          <div className="bg-white p-3 rounded-md">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-gray-500">Precio WLD:</p>
                                <p>${order.wldprice.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Comisión:</p>
                                <p>{((order.commission / order.amount) * 100).toFixed(0)}%</p>
                              </div>
                              <div>
                                <p className="text-gray-500">WLD neto:</p>
                                <p>{(order.amount - order.commission).toFixed(2)} WLD</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Total a recibir:</p>
                                <p className="font-medium">${order.netamount.toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="mt-2 pt-2 border-t text-sm">
                              <p className="text-gray-500">Método de pago:</p>
                              {order.paymentmethod === "bank" ? (
                                <p>
                                  Transferencia a {order.bankname} - {order.fullname} - {order.accountnumber}
                                </p>
                              ) : (
                                <p>PayPal: {order.paypalemail}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
