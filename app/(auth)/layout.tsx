import { ShieldLogo } from "@/components/brand/shield-logo"
import Link from "next/link"
import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <Link href="/" className="flex items-center gap-2">
          <ShieldLogo size="sm" />
          <span className="text-xl font-semibold text-blue-800">言语云³</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">{children}</main>

      <footer className="container mx-auto py-4 px-4 text-center text-sm text-gray-500">
        <p>© 2025 言语云科技有限公司. 保留所有权利.</p>
      </footer>
    </div>
  )
}
