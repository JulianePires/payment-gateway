"use client"

import type React from "react"
import {createContext, useContext, useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {useToast} from "@/hooks/use-toast"
import Cookies from "js-cookie"
import {Account, AccountResponse} from "@/types/user";

type AuthContextType = {
    account: Account | null
    login: (apiKey: string) => Promise<boolean>
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [account, setAccount] = useState<Account | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const toast = useToast()

    // Verificar se o usuário está autenticado ao carregar a página
    useEffect(() => {
        const storedAccount = Cookies.get("account")
        if (storedAccount) {
            setAccount(JSON.parse(storedAccount))
        }
        setIsLoading(false)
    }, [])

    const login = async (apiKey: string): Promise<boolean> => {
        setIsLoading(true)

        try {
            const result = await fetch("http://localhost:8080/accounts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": apiKey,
                },
            }).then((res) => res.json())
                .then((account: AccountResponse) => {
                    return {
                        id: account.id,
                        name: account.name,
                        email: account.email,
                        apiKey: account.api_key,
                        balance: account.balance,
                    }
                });

            if (result) {
                setAccount(result)
                Cookies.set("account", JSON.stringify(result))
                router.push("/faturas")
                return true
            }

            return false
        } catch (error: any) {
            toast.error("Erro ao fazer login", {
                description: "Ocorreu um erro ao tentar fazer login. Tente novamente.",
            })
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        setAccount(null)
        Cookies.remove("account")
        router.push("/auth")
        toast.info("Logout realizado", {
            description: "Você foi desconectado com sucesso.",
        })
    }

    return <AuthContext.Provider value={{account, login, logout, isLoading}}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider")
    }
    return context
}
