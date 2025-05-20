"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { EHRIntegrationStatus } from "@/components/ehr-integration-status"

// 动态导入可能使用浏览器API的组件
const EHRDashboard = dynamic(
  () => import("@/components/ehr-dashboard").then((mod) => ({ default: mod.EHRDashboard })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

const EHRDataMapping = dynamic(
  () => import("@/components/ehr-data-mapping").then((mod) => ({ default: mod.EHRDataMapping })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

export default function EHRIntegrationClient() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4">集成状态</h2>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <EHRDashboard />
          </Suspense>
        </ErrorBoundary>

        <h2 className="text-xl font-semibold mt-8 mb-4">数据映射</h2>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <EHRDataMapping />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">系统连接</h2>
        <EHRIntegrationStatus />
      </div>
    </div>
  )
}
