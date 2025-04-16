"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowRight, Info } from "lucide-react"
import { AnimatedContainer } from "@/components/ui/animated-container"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

const authSchema = z.object({
  apiKey: z.string().length(32, {
    message: "API Key deve ter 32 caracteres",
  }),
})

type AuthFormValues = z.infer<typeof authSchema>

export default function AuthPage() {
  const { login, isLoading } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const toast = useToast()

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      apiKey: "",
    },
  })

  async function onSubmit(data: AuthFormValues) {
    setError(null)
    const success = await login(data.apiKey)

    if (success) {
      toast.success("Login realizado com sucesso", {
        description: "Bem-vindo ao Full Cycle Gateway",
      })
    } else {
      setError("API Key inválida. Por favor, verifique e tente novamente.")
      toast.error("Falha na autenticação", {
        description: "API Key inválida. Por favor, verifique e tente novamente.",
      })
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <AnimatedContainer className="w-full max-w-md">
        <Card className="bg-stone-900 border-stone-800 card-hover">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Autenticação Gateway</CardTitle>
            <CardDescription className="text-center">Insira sua API Key para acessar o sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Digite sua API Key"
                            className="rounded-r-none bg-stone-800 border-stone-700 focus-visible:ring-primary"
                          />
                        </FormControl>
                        <Button type="submit" className="rounded-l-none hover-lift" disabled={isLoading}>
                          {isLoading ? <span className="animate-pulse">...</span> : <ArrowRight size={20} />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            {error && (
              <AnimatedContainer>
                <Alert variant="destructive">
                  <AlertTitle>Erro de autenticação</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </AnimatedContainer>
            )}

            <AnimatedContainer delay={0.3}>
              <Alert className="bg-stone-800/50 border-primary/30 text-stone-200">
                <Info className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">Como obter uma API Key?</AlertTitle>
                <AlertDescription className="text-stone-400">
                  Para obter sua API Key, você precisa criar uma conta de comerciante. Entre em contato com nosso
                  suporte para mais informações.
                </AlertDescription>
              </Alert>
            </AnimatedContainer>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  )
}
