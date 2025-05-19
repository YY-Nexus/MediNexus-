"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { DistributionAnalysis } from "@/components/analytics/distribution-analysis"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Filter, Share } from "lucide-react"

export default function DistributionAnalysisClient() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("demographics")
  const [chartType, setChartType] = useState("pie")

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
            <TabsTrigger value="demographics">人口统计</TabsTrigger>
            <TabsTrigger value="diagnoses">诊断分布</TabsTrigger>
            <TabsTrigger value="regions">地区分布</TabsTrigger>
            <TabsTrigger value="outcomes">结果分布</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="图表类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pie">饼图</SelectItem>
              <SelectItem value="bar">柱状图</SelectItem>
              <SelectItem value="donut">环形图</SelectItem>
              <SelectItem value="treemap">树形图</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>分布分析</CardTitle>
            <CardDescription>
              {activeTab === "demographics" && "患者年龄、性别和其他人口统计学特征分布"}
              {activeTab === "diagnoses" && "诊断类型和疾病分类分布"}
              {activeTab === "regions" && "患者地理分布和医疗资源覆盖"}
              {activeTab === "outcomes" && "治疗结果和效果分布"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DistributionAnalysis category={activeTab} chartType={chartType} />
        </CardContent>
      </Card>
    </div>
  )
}
