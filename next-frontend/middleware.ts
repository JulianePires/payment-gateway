import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("account")?.value
  const isAuthPage = request.nextUrl.pathname === "/auth"

  // Se o usuário não estiver autenticado e não estiver na página de autenticação,
  // redirecione para a página de autenticação
  if (!currentUser && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  // Se o usuário estiver autenticado e estiver na página de autenticação,
  // redirecione para a página de faturas
  if (currentUser && isAuthPage) {
    return NextResponse.redirect(new URL("/faturas", request.url))
  }

  return NextResponse.next()
}

// Configurar quais caminhos o middleware deve ser executado
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
