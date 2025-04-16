import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { InvoiceDetails } from "@/components/faturas/invoice-details"

// Dados simulados para a fatura
const invoice = {
  id: "#INV-001",
  status: "approved" as const,
  createdAt: "30/03/2025 às 14:30",
  value: "R$ 1.500,00",
  description: "Compra Online #123",
  creationDate: "30/03/2025 14:30",
  lastUpdate: "30/03/2025 14:35",
  paymentMethod: {
    type: "Cartão de Crédito",
    lastDigits: "**** **** **** 1234",
    holder: "João da Silva",
  },
  timeline: [
    {
      title: "Fatura Criada",
      date: "30/03/2025 14:30",
    },
    {
      title: "Pagamento Processado",
      date: "30/03/2025 14:32",
    },
    {
      title: "Transação Aprovada",
      date: "30/03/2025 14:35",
    },
  ],
  additionalData: {
    accountId: "ACC-12345",
    clientIp: "192.168.1.1",
    device: "Desktop - Chrome",
  },
}

export default function FaturaDetalhesPage() {
  return (
    <div className="container mx-auto p-6">
      <Card className="card-hover">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:text-primary transition-colors">
              <Link href="/faturas">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Fatura {invoice.id}</h1>
              <StatusBadge status={invoice.status} />
            </div>
          </div>

          <Button variant="outline" className="hover:text-foreground hover-lift transition-all duration-300">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground mb-6">Criada em {invoice.createdAt}</p>

          <InvoiceDetails invoice={invoice} />
        </CardContent>
      </Card>
    </div>
  )
}
