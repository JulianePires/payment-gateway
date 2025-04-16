import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, baseUrl }: PaginationProps) {
  const firstItem = (currentPage - 1) * itemsPerPage + 1
  const lastItem = Math.min(currentPage * itemsPerPage, totalItems)

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-slate-400">
          Mostrando {firstItem} - {lastItem} de {totalItems} resultados
        </div>

        <div className="flex items-center gap-1">
          <Link
              href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : "#"}
              className={cn(
                  "p-2 rounded-md hover:bg-slate-700 transition-colors",
                  currentPage === 1 && "opacity-50 pointer-events-none",
              )}
              aria-disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </Link>

          {pages.map((page) => (
              <Link
                  key={page}
                  href={`${baseUrl}?page=${page}`}
                  className={cn(
                      "min-w-[36px] h-9 flex items-center justify-center rounded-md text-sm transition-colors",
                      page === currentPage ? "bg-indigo-600 text-white" : "hover:bg-slate-700 text-slate-300",
                  )}
              >
                {page}
              </Link>
          ))}

          <Link
              href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : "#"}
              className={cn(
                  "p-2 rounded-md hover:bg-slate-700 transition-colors",
                  currentPage === totalPages && "opacity-50 pointer-events-none",
              )}
              aria-disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
  )
}

export const PaginationContent = () => null
export const PaginationItem = () => null
export const PaginationLink = () => null
export const PaginationEllipsis = () => null
export const PaginationPrevious = () => null
export const PaginationNext = () => null
