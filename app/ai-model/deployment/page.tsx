import type { Metadata } from "next"
import { ModelDeployment } from "@/components"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "模型部署 - MediNexus³",
  description: "查看和管理 AI 模型的部署状态",
}

export default function ModelDeploymentPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader title="模型部署" description="查看和管理 AI 模型的部署状态和性能指标" icon="server" />
      <ModelDeployment />
    </div>
  )
}
