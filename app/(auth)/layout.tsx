import { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Logo } from "@/components/brand/logo"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center space-x-2">
          <Logo variant="icon" className="h-10 w-10" />
          <span className="text-xl font-bold text-blue-600">MediNexus³</span>
        </Link>
      </div>
      
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Image
            src="/blue-gradient-medical-cross.png"
            alt="Medical Logo"
            width={80}
            height={80}
            className="rounded-full bg-white p-2 shadow-md"
          />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            欢迎使用 MediNexus³
          </h1>
          <p className="text-sm text-gray-500">
            智能医疗系统 · 提升诊疗效率 · 改善患者体验
          </p>
        </div>
        
        <div className="rounded-lg bg-white p-6 shadow-lg">
          {children}
        </div>
      </div>
      
      <div className="absolute bottom-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} YanYu MediNexus³. 保留所有权利。
      </div>
    </div>
  )
}
