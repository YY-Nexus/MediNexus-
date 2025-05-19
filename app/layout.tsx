import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { AppShell } from "@/components/layout/app-shell"
import RootLayoutClient from "./RootLayoutClient"

export const metadata: Metadata = {
  title: "言语「 医枢³」智能诊疗系统",
  description: "YanYu MediNexus³ AI Diagnostic System (YY³-MNDS)",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AppShell>{children}</AppShell>
          <RootLayoutClient />
        </ThemeProvider>
      </body>
    </html>
  )
}
