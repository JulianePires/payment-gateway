"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import Image from "next/image"

export default function Header() {
  const pathname = usePathname()
  const isAuthPage = pathname === "/auth"
  const { account, logout } = useAuth()

  return (
    <header className="bg-stone-900 py-4 px-6 flex items-center justify-between border-b border-stone-800 transition-colors duration-300">
      <Link href="/" className="flex text-xl font-bold text-white hover-scale">
          <Image src="/logotipo.png" alt="Logotipo" width={140} height={54} />
      </Link>

      {!isAuthPage && account && (
        <div className="flex items-center gap-4">
          <span className="text-stone-300">Olá, {account.name}</span>
          <Button variant="destructive" size="sm" className="gap-1 hover-lift" onClick={logout}>
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      )}
    </header>
  )
}
