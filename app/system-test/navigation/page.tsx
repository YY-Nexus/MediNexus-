import { NavigationTest } from "@/components/system-test/navigation-test"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "导航测试 - MediNexus³",
  description: "测试导航系统和路由功能",
}

export default function NavigationTestPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-medical-800">导航系统测试</h1>
        <p className="text-medical-600 mt-2">测试所有导航链接和路由功能</p>
      </div>
      <NavigationTest />
    </div>
  )
}
