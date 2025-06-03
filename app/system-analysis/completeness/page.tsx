import { SystemCompletenessAnalyzer } from "@/components/system-analysis/system-completeness-analyzer"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "系统完整性分析 | MediNexus³",
  description: "全面分析医疗AI系统各模块的完整度、完成度和完善度",
}

export default function SystemCompletenessPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="系统完整性分析"
        description="全面评估医疗AI系统各功能模块的开发状态和质量水平"
        breadcrumbs={[
          { label: "首页", href: "/" },
          { label: "系统分析", href: "/system-analysis" },
          { label: "完整性分析", href: "/system-analysis/completeness" },
        ]}
      />

      <SystemCompletenessAnalyzer />
    </div>
  )
}
