"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { getAllOrders, updateOrderStatus, type Order } from "@/lib/orders"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [processingOrder, setProcessingOrder] = useState<string | null>(null)

  useEffect(() => {
    // Verificar si el usuario es administrador
    if (!user || user.username !== "admin") {
      toast({
        title: "Acceso denegado",
        description: "No tienes permisos para acceder a esta página",
        variant: "destructive",
      })
      router.push("/")
      return
    }

    // Cargar todas las órdenes
    const loadOrders = async () => {
      try {
        const allOrders = await getAllOrders()
        setOrders(allOrders)
      } catch (error) {
        console.error("Error loading orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [user, router, toast])

  const handleUpdateStatus = async (orderId: string, status: "pendiente" | "pagado" | "cancelado") => {
    setProcessingOrder(orderId)

    try {
      const updatedOrder = await updateOrderStatus(orderId, status)

      if (updatedOrder) {
        // Actualizar la lista de órdenes
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, status } : order)))

        toast({
          title: "Estado actualizado",
          description: `La orden ha sido marcada como ${status}`,
        })
      }
    } catch (error) {
      console.error("Error updating order status:", error)
      toast({
        title: "Error al actualizar",
        description: "No se pudo actualizar el estado de la orden",
        variant: "destructive",
      })
    } finally {
      setProcessingOrder(null)
    }
  }

  if (!user || user.username !== "admin") return null

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
        <p className="text-gray-600 mb-8">Gestiona todas las órdenes de venta de WLD</p>

        <Card>
          <CardHeader>
            <CardTitle>Órdenes de venta</CardTitle>
            <CardDescription>Todas las transacciones de los usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-4">Cargando órdenes...</p>
            ) : orders.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No hay órdenes todavía</p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <Card key={order.id} className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-lg">
                            Usuario: <span className="text-green-600">{order.username}</span>
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

                      <div className="bg-white p-4 rounded-md mb-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium mb-2">Detalles de la venta</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-gray-500">Cantidad WLD:</p>
                                <p>{order.amount.toFixed(2)} WLD</p>
                              </div>
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
                              <div className="col-span-2">
                                <p className="text-gray-500">Total a pagar:</p>
                                <p className="font-medium text-lg">${order.netamount.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium mb-2">Información de pago</h3>
                            <p className="text-sm mb-1">
                              <span className="text-gray-500">Método:</span>{" "}
                              {order.paymentmethod === "bank" ? "Transferencia bancaria" : "PayPal"}
                            </p>

                            {order.paymentmethod === "bank" ? (
                              <div className="text-sm">
                                <p>
                                  <span className="text-gray-500">Banco:</span> {order.bankname}
                                </p>
                                <p>
                                  <span className="text-gray-500">Titular:</span> {order.fullname}
                                </p>
                                <p>
                                  <span className="text-gray-500">Cuenta:</span> {order.accountnumber}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm">
                                <span className="text-gray-500">Email PayPal:</span> {order.paypalemail}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        {order.status !== "pagado" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-green-50 text-green-600 hover:bg-green-100"
                            onClick={() => handleUpdateStatus(order.id!, "pagado")}
                            disabled={processingOrder === order.id}
                          >
                            {processingOrder === order.id ? "Procesando..." : "Marcar como pagado"}
                          </Button>
                        )}

                        {order.status !== "cancelado" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-50 text-red-600 hover:bg-red-100"
                            onClick={() => handleUpdateStatus(order.id!, "cancelado")}
                            disabled={processingOrder === order.id}
                          >
                            {processingOrder === order.id ? "Procesando..." : "Cancelar orden"}
                          </Button>
                        )}

                        {order.status !== "pendiente" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStatus(order.id!, "pendiente")}
                            disabled={processingOrder === order.id}
                          >
                            {processingOrder === order.id ? "Procesando..." : "Marcar como pendiente"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
