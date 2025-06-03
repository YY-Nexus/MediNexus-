import type { Metadata } from "next"
import { ModelDeployment } from "@/components"
import { DeploymentTestPanel } from "@/components/model-deployment/deployment-test-panel"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "模型部署测试 - MediNexus³",
  description: "测试模型部署组件的功能",
}

export default function ModelDeploymentTestPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader title="模型部署测试" description="测试和验证模型部署组件的各项功能" icon="test-tube" />

      <DeploymentTestPanel />
      <ModelDeployment />
    </div>
  )
}
