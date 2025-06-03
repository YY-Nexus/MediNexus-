import type React from "react"
import type { Metadata } from "next"
import { AuthGuard } from "@/components/auth/AuthGuard"

export const metadata: Metadata = {
  title: "系统管理 | 言语云³",
  description: "医疗系统管理平台",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRoles={["admin", "super_admin"]}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">{children}</div>
    </AuthGuard>
  )
}
