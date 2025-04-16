"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function ToastDemo() {
  const toast = useToast()

  const showToastDemo = () => {
    toast.custom("Demonstração de Notificações", {
      description: "Este é um exemplo do sistema de notificações Sonner.",
      action: {
        label: "Testar Mais",
        onClick: () => {
          toast.success("Sucesso!", {
            description: "Operação realizada com sucesso.",
          })

          setTimeout(() => {
            toast.error("Erro!", {
              description: "Algo deu errado.",
            })
          }, 1000)

          setTimeout(() => {
            toast.warning("Atenção!", {
              description: "Fique atento a esta informação.",
            })
          }, 2000)

          setTimeout(() => {
            toast.info("Informação", {
              description: "Apenas para seu conhecimento.",
            })
          }, 3000)
        },
      },
    })
  }

  return (
    <Button variant="outline" size="icon" onClick={showToastDemo} className="hover:text-primary text-stone-900 transition-colors">
      <Bell className="h-4 w-4" />
      <span className="sr-only">Demonstrar notificações</span>
    </Button>
  )
}
