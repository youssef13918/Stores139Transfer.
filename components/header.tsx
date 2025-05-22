"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { User, LogIn, LogOut, Settings } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, logout } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Comprobar si el usuario actual es administrador
    if (user?.username === "admin") {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [user])

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-store139.png"
            alt="Store 139 Transfer"
            width={50}
            height={50}
            className="h-12 w-auto"
          />
          <span className="text-xl font-bold hidden md:inline">Store139Transfer</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="#como-funciona" className="font-medium">
            Cómo Funciona
          </Link>
          <Link href="#comisiones" className="font-medium">
            Comisiones
          </Link>
          <Link href="#vender" className="font-medium">
            Vender
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/perfil" className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Panel Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
