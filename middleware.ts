import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import * as jwt from "jsonwebtoken"

// 需要认证的路径
const AUTH_PATHS = [
  "/patients",
  "/ai-diagnosis",
  "/clinical-decision",
  "/analytics",
  "/research",
  "/medical-records",
  "/health-data",
  "/ai-model",
  "/security",
  "/teleconsultation",
  "/ehr-integration",
]

// 公开路径
const PUBLIC_PATHS = ["/login", "/register", "/forgot-password", "/reset-password", "/unauthorized"]

// JWT密钥 - 实际项目中应从环境变量获取
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 检查是否是需要认证的路径
  const isAuthPath = AUTH_PATHS.some((path) => pathname.startsWith(path))
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname === path)
  const isApiPath = pathname.startsWith("/api")
  const isStaticPath = pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")

  // 如果是静态资源或API路径，直接放行
  if (isStaticPath || isApiPath) {
    return NextResponse.next()
  }

  // 如果是首页或公开路径，不需要认证
  if (pathname === "/" || isPublicPath) {
    return NextResponse.next()
  }

  // 如果是需要认证的路径，检查认证状态
  if (isAuthPath) {
    // 获取认证令牌
    const token = request.cookies.get("auth-token")?.value

    // 如果没有令牌，重定向到登录页
    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("returnUrl", pathname)
      return NextResponse.redirect(url)
    }

    try {
      // 验证令牌
      jwt.verify(token, JWT_SECRET)
      return NextResponse.next()
    } catch (error) {
      // 令牌无效或已过期，重定向到登录页
      const url = new URL("/login", request.url)
      url.searchParams.set("returnUrl", pathname)
      return NextResponse.redirect(url)
    }
  }

  // 其他路径放行
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
