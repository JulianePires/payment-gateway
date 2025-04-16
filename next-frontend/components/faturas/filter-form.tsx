"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const filterSchema = z.object({
  status: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  search: z.string().optional(),
})

type FilterFormValues = z.infer<typeof filterSchema>

export function FilterForm() {
  const toast = useToast()

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      status: "all",
      startDate: "",
      endDate: "",
      search: "",
    },
  })

  function onSubmit(data: FilterFormValues) {
    console.log("Filtros aplicados:", data)
    // Aqui você aplicaria os filtros
    toast.success("Filtros aplicados", {
      description: "Os resultados foram filtrados conforme solicitado.",
    })
  }

  return (
    <Card className="bg-stone-800/50 border-stone-700 mb-6 animate-slide-up">
      <CardContent className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-stone-800 border-stone-700">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-stone-800 border-stone-700">
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="approved">Aprovado</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="rejected">Rejeitado</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Inicial</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="dd/mm/aaaa"
                      className="bg-stone-800 border-stone-700 focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Final</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="dd/mm/aaaa"
                      className="bg-stone-800 border-stone-700 focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buscar</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="ID ou descrição"
                          className="bg-stone-800 border-stone-700 focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <Button type="submit" size="icon" className="hover-lift">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
