import { createClientSupabaseClient } from "./supabase"

export type Usuario = {
  username: string
  email: string
  fullName?: string
  created_at?: string
}

// Verificar si un usuario ya existe (por username o email)
export async function checkUsuarioExists(username: string, email: string): Promise<boolean> {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase
    .from("usuarios")
    .select("username")
    .or(`username.eq.${username},email.eq.${email}`)
    .limit(1)

  if (error) {
    console.error("Error checking if user exists:", error)
    throw new Error("Error al verificar si el usuario existe")
  }

  return data && data.length > 0
}

// Registrar un nuevo usuario
export async function registerUsuario(username: string, email: string, fullName?: string): Promise<Usuario> {
  const supabase = createClientSupabaseClient()

  // Verificar si el usuario ya existe
  const exists = await checkUsuarioExists(username, email)
  if (exists) {
    throw new Error("El nombre de usuario o correo electrónico ya está registrado")
  }

  // Insertar nuevo usuario - solo con username y email (sin fullName)
  const { data, error } = await supabase.from("usuarios").insert({ username, email }).select().single()

  if (error) {
    console.error("Error registering user:", error)
    throw new Error("Error al registrar el usuario")
  }

  // Añadir el fullName al objeto de retorno aunque no se guarde en la base de datos
  return { ...data, fullName }
}

// Obtener usuario por username
export async function getUsuarioByUsername(username: string): Promise<Usuario | null> {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase.from("usuarios").select("*").eq("username", username).single()

  if (error) {
    if (error.code === "PGRST116") {
      // No se encontró el usuario
      return null
    }
    console.error("Error getting user by username:", error)
    throw new Error("Error al obtener el usuario")
  }

  return data
}

// Obtener usuario por email
export async function getUsuarioByEmail(email: string): Promise<Usuario | null> {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase.from("usuarios").select("*").eq("email", email).single()

  if (error) {
    if (error.code === "PGRST116") {
      // No se encontró el usuario
      return null
    }
    console.error("Error getting user by email:", error)
    throw new Error("Error al obtener el usuario")
  }

  return data
}
