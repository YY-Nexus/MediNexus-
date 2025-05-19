import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import DistributionAnalysisClient from "@/components/analytics/distribution-analysis-client"
import { PageHeader } from "@/components/page-header"

export default function DistributionPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <PageHeader title="分布分析" description="查看数据分布情况和统计特征" />

      <Suspense fallback={<LoadingSpinner />}>
        <DistributionAnalysisClient />
      </Suspense>
    </div>
  )
}
