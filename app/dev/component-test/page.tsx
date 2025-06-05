import type { Metadata } from "next"
import { GlobalComponentTester } from "@/components/dev/global-component-tester"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "全局组件测试 - MediNexus³",
  description: "测试所有组件的渲染状态和完整性",
}

export default function ComponentTestPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader title="全局组件测试" description="检测系统中所有组件的状态，识别缺失和错误的组件" icon="bug" />

      <GlobalComponentTester />
    </div>
  )
}
