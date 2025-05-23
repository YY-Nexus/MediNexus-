import { SearchAnalytics } from "@/components/search-analytics"
import { PageHeader } from "@/components/page-header"

export default function SearchAnalyticsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        title="搜索分析"
        description="查看搜索历史、趋势和使用统计"
        breadcrumbs={[
          { title: "首页", href: "/" },
          { title: "搜索分析", href: "/search-analytics" },
        ]}
      />

      <div className="grid gap-6">
        <SearchAnalytics />
      </div>
    </div>
  )
}
