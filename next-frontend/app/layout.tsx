import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { AuthProvider } from "@/lib/auth"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Paga.Nos",
  description: "Sistema de gerenciamento de faturas e pagamentos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen flex flex-col bg-stone-950 text-stone-50`}>
        <AuthProvider>
          <Header />
          <main className="flex-1 flex flex-col animate-fade-in">{children}</main>
          <footer className="flex py-4 text-center justify-center items-center text-sm text-stone-400 animate-fade-in">
            <Image src="/logonos.png" alt="Logotipo" width={80} height={80} />
            © 2025 Paga.Nos. Todos os direitos reservados.
          </footer>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'
import Image from "next/image";