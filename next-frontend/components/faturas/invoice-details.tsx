"use client"

import { CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedContainer } from "@/components/ui/animated-container"

interface InvoiceDetailsProps {
  invoice: {
    id: string
    status: "approved" | "pending" | "rejected"
    value: string
    description: string
    creationDate: string
    lastUpdate: string
    paymentMethod: {
      type: string
      lastDigits: string
      holder: string
    }
    timeline: {
      title: string
      date: string
    }[]
    additionalData: {
      accountId: string
      clientIp: string
      device: string
    }
  }
}

export function InvoiceDetails({ invoice }: InvoiceDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Informações da Fatura */}
      <AnimatedContainer direction="up" delay={0.1}>
        <Card className="bg-card/50 card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Informações da Fatura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID da Fatura</span>
              <span>{invoice.id}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Valor</span>
              <span className="text-primary">{invoice.value}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Data de Criação</span>
              <span>{invoice.creationDate}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Última Atualização</span>
              <span>{invoice.lastUpdate}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Descrição</span>
              <span>{invoice.description}</span>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Status da Transação */}
      <AnimatedContainer direction="up" delay={0.2}>
        <Card className="bg-card/50 card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Status da Transação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {invoice.timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-primary text-white p-1 rounded-full">
                    <CheckCircle size={18} />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Método de Pagamento */}
      <AnimatedContainer direction="up" delay={0.3}>
        <Card className="bg-card/50 card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Método de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipo</span>
              <span>{invoice.paymentMethod.type}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Últimos Dígitos</span>
              <span>{invoice.paymentMethod.lastDigits}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Titular</span>
              <span>{invoice.paymentMethod.holder}</span>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Dados Adicionais */}
      <AnimatedContainer direction="up" delay={0.4}>
        <Card className="bg-card/50 card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Dados Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID da Conta</span>
              <span>{invoice.additionalData.accountId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">IP do Cliente</span>
              <span>{invoice.additionalData.clientIp}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Dispositivo</span>
              <span>{invoice.additionalData.device}</span>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  )
}
