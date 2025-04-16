"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CreditCard, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { AnimatedContainer } from "@/components/ui/animated-container"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"

const faturaSchema = z.object({
  valor: z.string().min(1, { message: "Valor é obrigatório" }),
  descricao: z.string().min(5, { message: "Descrição deve ter pelo menos 5 caracteres" }),
  cartao: z.object({
    numero: z
      .string()
      .min(16, { message: "Número do cartão deve ter 16 dígitos" })
      .max(19, { message: "Número do cartão inválido" }),
    validade: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: "Formato deve ser MM/AA" }),
    cvv: z.string().length(3, { message: "CVV deve ter 3 dígitos" }),
    titular: z.string().min(3, { message: "Nome do titular é obrigatório" }),
  }),
})

type FaturaFormValues = z.infer<typeof faturaSchema>

export default function NovaFaturaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [valorNumerico, setValorNumerico] = useState(0)
  const [taxaProcessamento, setTaxaProcessamento] = useState(0)
  const [total, setTotal] = useState(0)
  const toast = useToast()
  const router = useRouter()

  const form = useForm<FaturaFormValues>({
    resolver: zodResolver(faturaSchema),
    defaultValues: {
      valor: "",
      descricao: "",
      cartao: {
        numero: "",
        validade: "",
        cvv: "",
        titular: "",
      },
    },
  })

  // Formatar valores para exibição
  const formatarValor = (valor: number) => {
    return valor
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      })
      .replace("R$", "R$ ")
  }

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permitir apenas números e formatar como moeda
    const value = e.target.value.replace(/\D/g, "")
    const valorNumerico = Number.parseInt(value) / 100 || 0

    const valorFormatado = valorNumerico
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      })
      .replace("R$", "")

    form.setValue("valor", valorFormatado)

    // Atualizar cálculos
    setValorNumerico(valorNumerico)
    setTaxaProcessamento(valorNumerico * 0.02)
    setTotal(valorNumerico + valorNumerico * 0.02)
  }

  async function onSubmit(data: FaturaFormValues) {
    setIsSubmitting(true)

    try {
      // Simulando uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Fatura criada:", data)

      toast.success("Pagamento processado com sucesso", {
        description: `Fatura no valor de ${formatarValor(total)} foi criada.`,
        action: {
          label: "Ver detalhes",
          onClick: () => router.push("/faturas/#INV-001"),
        },
      })

      // Redirecionar para a lista de faturas
      router.push("/faturas")
    } catch (error) {
      toast.error("Erro ao processar pagamento", {
        description: "Ocorreu um erro ao processar o pagamento. Tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <AnimatedContainer>
        <Card className="bg-stone-900 border-stone-800 card-hover">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Criar Nova Fatura</CardTitle>
            <CardDescription>Preencha os dados abaixo para processar um novo pagamento</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Coluna da esquerda - Informações básicas */}
                  <AnimatedContainer direction="left" delay={0.2} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="valor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor</FormLabel>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">R$</span>
                            <FormControl>
                              <Input
                                {...field}
                                onChange={(e) => {
                                  handleValorChange(e)
                                  field.onChange(e)
                                }}
                                placeholder="0,00"
                                className="pl-10 bg-stone-800 border-stone-700 focus-visible:ring-primary transition-all duration-300"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="descricao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Descreva o motivo do pagamento"
                              rows={4}
                              className="bg-stone-800 border-stone-700 focus-visible:ring-primary transition-all duration-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AnimatedContainer>

                  {/* Coluna da direita - Dados do cartão */}
                  <AnimatedContainer direction="right" delay={0.3}>
                    <Card className="bg-stone-800/50 border-stone-700 card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Dados do Cartão</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="cartao.numero"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número do Cartão</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="0000 0000 0000 0000"
                                    className="pr-10 bg-stone-800 border-stone-700 focus-visible:ring-primary transition-all duration-300"
                                  />
                                </FormControl>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400">
                                  <CreditCard size={18} />
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="cartao.validade"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Data de Expiração</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="MM/AA"
                                    className="bg-stone-800 border-stone-700 focus-visible:ring-primary transition-all duration-300"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cartao.cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <div className="relative">
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="123"
                                      className="pr-10 bg-stone-800 border-stone-700 focus-visible:ring-primary transition-all duration-300"
                                    />
                                  </FormControl>
                                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400">
                                    <LockKeyhole size={16} />
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="cartao.titular"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome no Cartão</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Como aparece no cartão"
                                  className="bg-stone-800 border-stone-700 focus-visible:ring-primary transition-all duration-300"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </AnimatedContainer>
                </div>

                {/* Resumo do pagamento */}
                <AnimatedContainer delay={0.4} className="mt-8">
                  <Separator className="my-6 bg-stone-800" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-stone-300">
                      <span>Subtotal</span>
                      <span>{formatarValor(valorNumerico)}</span>
                    </div>
                    <div className="flex justify-between text-stone-300">
                      <span>Taxa de Processamento (2%)</span>
                      <span>{formatarValor(taxaProcessamento)}</span>
                    </div>
                    <Separator className="my-4 bg-stone-800" />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatarValor(total)}</span>
                    </div>
                  </div>
                </AnimatedContainer>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="border-stone-700 text-stone-900 hover:bg-stone-800 hover:text-white transition-all duration-300"
                  onClick={() => {
                    toast.info("Operação cancelada", {
                      description: "O processo de criação de fatura foi cancelado.",
                    })
                  }}
                >
                  <Link href="/faturas">Cancelar</Link>
                </Button>
                <Button type="submit" className="hover-lift" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-pulse">Processando</span>
                    </span>
                  ) : (
                    <>
                      <LockKeyhole className="mr-2 h-4 w-4" />
                      Processar Pagamento
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </AnimatedContainer>
    </div>
  )
}
