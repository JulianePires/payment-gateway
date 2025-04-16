import Link from "next/link"
import { Plus, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { StatusBadge } from "@/components/ui/status-badge"
import { FilterForm } from "@/components/faturas/filter-form"
import { ToastDemo } from "@/components/toast-demo"

// Dados simulados para a tabela
const invoices = [
  {
    id: "#INV-001",
    date: "30/03/2025",
    description: "Compra Online #123",
    value: "R$ 1.500,00",
    status: "approved",
  },
  {
    id: "#INV-002",
    date: "29/03/2025",
    description: "Serviço Premium",
    value: "R$ 15.000,00",
    status: "pending",
  },
  {
    id: "#INV-003",
    date: "28/03/2025",
    description: "Assinatura Mensal",
    value: "R$ 99,90",
    status: "rejected",
  },
] as const

export default function FaturasPage() {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <Card className="bg-stone-900 border-stone-800 card-hover">
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">Faturas</CardTitle>
            <CardDescription>Gerencie suas faturas e acompanhe os pagamentos</CardDescription>
          </div>

          <div className="flex gap-2">
            <ToastDemo />
            <Button asChild className="hover-lift">
              <Link href="/faturas/nova">
                <Plus className="mr-2 h-4 w-4" />
                Nova Fatura
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Filtros */}
          <FilterForm />

          {/* Tabela */}
          <div className="overflow-x-auto animate-fade-in">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">ID</TableHead>
                  <TableHead className="text-stone-400">DATA</TableHead>
                  <TableHead className="text-stone-400">DESCRIÇÃO</TableHead>
                  <TableHead className="text-stone-400">VALOR</TableHead>
                  <TableHead className="text-stone-400">STATUS</TableHead>
                  <TableHead className="text-right text-stone-400">AÇÕES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice, index) => (
                  <TableRow
                    key={invoice.id}
                    className="border-stone-800 hover:bg-stone-800/30 transition-colors duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell>{invoice.value}</TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild className="hover:text-primary transition-colors">
                          <Link href={`/faturas/${invoice.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver detalhes</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="hover:text-primary transition-colors" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive className="hover-lift">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="hover:text-primary transition-colors">
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="hover:text-primary transition-colors">
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="hover:text-primary transition-colors" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <div className="text-sm text-stone-400 mt-2">Mostrando 1 - 3 de 50 resultados</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
