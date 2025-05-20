"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { ProjectsDashboard } from "@/components/research/projects-dashboard"
import { DataAnalysisOverview } from "@/components/research/data-analysis-overview"
import { ActiveProjects } from "@/components/research/active-projects"

export function ResearchDemo() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("demo.research.activeProjects", "活跃研究项目")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ActiveProjects />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("demo.research.projectsDashboard", "项目仪表盘")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectsDashboard />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("demo.research.dataAnalysis", "数据分析")}</CardTitle>
          </CardHeader>
          <CardContent>
            <DataAnalysisOverview />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
