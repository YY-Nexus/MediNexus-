import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SafeWrapper } from "@/components/safe-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "言语「医枢」智能诊疗系统 - YanYu MediCore",
  description: "基于人工智能的医疗诊断和健康管理系统 - YanYu MediCore Intelligent Diagnostic System",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SafeWrapper>
            <div className="min-h-screen bg-background">{children}</div>
          </SafeWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
