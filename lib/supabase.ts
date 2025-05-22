import { createClient } from "@supabase/supabase-js"

// Tipos para los usuarios
export type UserProfile = {
  id: string
  username: string
  email: string
  fullName?: string
  created_at?: string
}

// Crear un cliente para el lado del servidor
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, supabaseKey)
}

// Crear un cliente singleton para el lado del cliente
let clientSupabaseClient: ReturnType<typeof createClient> | null = null

export const createClientSupabaseClient = () => {
  if (clientSupabaseClient) return clientSupabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  clientSupabaseClient = createClient(supabaseUrl, supabaseKey)
  return clientSupabaseClient
}
