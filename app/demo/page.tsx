import { Suspense } from "react"
import { SystemDemo } from "@/components/demo/system-demo"
import { LoadingFallback } from "@/components/ui/loading-fallback"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "YanYu MediNexus³ - 系统演示",
  description: "医疗AI系统综合演示页面",
}

export default function DemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="系统功能演示" description="这个页面展示了YanYu MediNexus³系统的主要功能和特性" />

      <Suspense fallback={<LoadingFallback />}>
        <SystemDemo />
      </Suspense>
    </div>
  )
}
