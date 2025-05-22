"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { registerUsuario, getUsuarioByUsername, getUsuarioByEmail, type Usuario } from "./usuarios"

type AuthContextType = {
  user: Usuario | null
  isLoading: boolean
  login: (username: string, email: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  register: (username: string, email: string, fullName?: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Error parsing stored user:", e)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Verificar si el usuario existe por username
      const userByUsername = await getUsuarioByUsername(username)

      // Si no existe por username, verificar por email
      const userByEmail = !userByUsername ? await getUsuarioByEmail(email) : null

      // Si no existe ni por username ni por email, error
      if (!userByUsername && !userByEmail) {
        return { success: false, error: "Usuario no encontrado. Por favor, regístrate primero." }
      }

      // Si existe por username pero el email no coincide, error
      if (userByUsername && userByUsername.email !== email) {
        return { success: false, error: "El correo electrónico no coincide con el nombre de usuario." }
      }

      // Si existe por email pero el username no coincide, error
      if (userByEmail && userByEmail.username !== username) {
        return { success: false, error: "El nombre de usuario no coincide con el correo electrónico." }
      }

      // Usuario autenticado correctamente
      const authenticatedUser = userByUsername || userByEmail
      setUser(authenticatedUser)
      localStorage.setItem("user", JSON.stringify(authenticatedUser))

      return { success: true }
    } catch (error) {
      console.error("Error during login:", error)
      return { success: false, error: "Error al iniciar sesión. Por favor, inténtalo de nuevo." }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const register = async (
    username: string,
    email: string,
    fullName?: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Verificar si el usuario ya existe
      try {
        const userByUsername = await getUsuarioByUsername(username)
        if (userByUsername) {
          return { success: false, error: "Este nombre de usuario ya está registrado." }
        }

        const userByEmail = await getUsuarioByEmail(email)
        if (userByEmail) {
          return { success: false, error: "Este correo electrónico ya está registrado." }
        }
      } catch (error) {
        // Ignorar errores de "no encontrado"
      }

      // Registrar nuevo usuario
      const newUser = await registerUsuario(username, email, fullName)

      // Iniciar sesión automáticamente
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))

      return { success: true }
    } catch (error) {
      console.error("Error during registration:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al registrar el usuario. Por favor, inténtalo de nuevo.",
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
