"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { UpcomingConsultations } from "@/components/upcoming-consultations"

// 动态导入可能使用浏览器API的组件
const ConsultationRoom = dynamic(
  () => import("@/components/consultation-room").then((mod) => ({ default: mod.ConsultationRoom })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

const TeleconsultationDashboard = dynamic(
  () => import("@/components/teleconsultation-dashboard").then((mod) => ({ default: mod.TeleconsultationDashboard })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

export default function TeleconsultationClient() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4">会诊室</h2>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <ConsultationRoom />
          </Suspense>
        </ErrorBoundary>

        <h2 className="text-xl font-semibold mt-8 mb-4">会诊统计</h2>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <TeleconsultationDashboard />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">即将到来的会诊</h2>
        <UpcomingConsultations />
      </div>
    </div>
  )
}
