import { LoginForm } from "@/components/auth/LoginForm"
import { TermsFooter } from "@/components/auth/TermsFooter"
import { ShieldLogo } from "@/components/brand/shield-logo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "登录 - MediNexus³",
  description: "登录到 MediNexus³ 智能诊疗系统",
  keywords: "医疗系统, 登录, 智能诊疗, MediNexus",
}

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-6 mt-4">
        <ShieldLogo size="lg" showText={true} />
      </div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">欢迎使用 MediNexus³</h1>
        <p className="text-gray-600">智能医疗系统 · 提升诊疗效率</p>
      </div>
      <div className="w-full max-w-md">
        <LoginForm />
        <TermsFooter />
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          需要帮助? 请联系{" "}
          <a href="mailto:support@medinexus.com" className="text-blue-600 hover:underline">
            技术支持
          </a>
        </p>
      </div>
    </div>
  )
}
