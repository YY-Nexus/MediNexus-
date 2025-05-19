import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import EHRIntegrationClient from "@/components/ehr/ehr-integration-client"
// 导入AI集成面板组件
import AiIntegrationPanel from "@/components/ehr/ai-integration-panel"

export default function EHRIntegrationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">电子病历系统集成</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <EHRIntegrationClient />
        </Suspense>
      </ErrorBoundary>
      {/* 在页面适当位置添加该组件 */}
      {/* 例如，在EHR集成客户端组件下方添加： */}
      <div className="mt-6">
        <AiIntegrationPanel />
      </div>
    </div>
  )
}
