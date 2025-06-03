import type { Metadata } from "next"
import { PerformanceOptimizationClient } from "@/components/admin/performance-optimization/performance-optimization-client"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "性能优化建议 | 言语云³",
  description: "系统性能分析和优化建议",
}

export default function PerformanceOptimizationPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="性能优化建议" description="基于AI分析的系统性能优化建议和实施方案" />
      <PerformanceOptimizationClient />
    </div>
  )
}
