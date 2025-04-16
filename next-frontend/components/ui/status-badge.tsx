import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        approved: "border-green-500/30 bg-green-500/20 text-green-400 hover:bg-green-500/30",
        pending: "border-amber-500/30 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30",
        rejected: "border-red-500/30 bg-red-500/20 text-red-400 hover:bg-red-500/30",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  },
)

export interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  className?: string
  status: "approved" | "pending" | "rejected"
}

const statusLabels: Record<StatusBadgeProps["status"], string> = {
  approved: "Aprovado",
  pending: "Pendente",
  rejected: "Rejeitado",
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return <span className={cn(statusBadgeVariants({ variant: status }), className)}>{statusLabels[status]}</span>
}
