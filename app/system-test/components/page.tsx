import { AdvancedComponentTest } from "@/components/system-test/advanced-component-test"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "UI组件测试 - MediNexus³",
  description: "全面测试所有UI组件的功能和渲染",
}

export default function ComponentTestPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-medical-800">UI组件全面测试</h1>
        <p className="text-medical-600 mt-2">测试所有UI组件的渲染、交互和响应式功能，确保组件正常工作</p>
      </div>
      <AdvancedComponentTest />
    </div>
  )
}
