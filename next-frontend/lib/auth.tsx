"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string
  name: string
  apiKey: string
}

type AuthContextType = {
  user: User | null
  login: (apiKey: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const toast = useToast()

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (apiKey: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulando uma chamada de API para autenticação
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificar se a API Key é válida (simulação)
      if (apiKey.length >= 10) {
        const newUser = {
          id: "user-1",
          name: "Usuário Demo",
          apiKey,
        }

        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        router.push("/faturas")
        return true
      }

      return false
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      toast.error("Erro ao fazer login", {
        description: "Ocorreu um erro ao tentar fazer login. Tente novamente.",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/auth")
    toast.info("Logout realizado", {
      description: "Você foi desconectado com sucesso.",
    })
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
