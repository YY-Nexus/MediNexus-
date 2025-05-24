import { SystemTestClient } from "@/components/system-test/system-test-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "系统功能测试 - MediNexus³",
  description: "全面测试系统功能，确保所有组件正常工作",
}

export default function SystemTestPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-medical-800">系统功能测试</h1>
        <p className="text-medical-600 mt-2">全面测试系统各个模块的功能和性能</p>
      </div>
      <SystemTestClient />
    </div>
  )
}
