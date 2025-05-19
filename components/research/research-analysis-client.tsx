"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataAnalysisOverview } from "@/components/research/data-analysis-overview"
import { Filter, Download, FileSpreadsheet, BarChart2, PieChart } from "lucide-react"

export function ResearchAnalysisClient() {
  const [selectedDataset, setSelectedDataset] = useState("clinical-trial-a")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">研究数据分析</h1>
          <div className="flex items-center gap-2">
            <Select value={selectedDataset} onValueChange={setSelectedDataset}>
              <SelectTrigger className="w-[220px]">
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="选择数据集" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clinical-trial-a">临床试验A数据集</SelectItem>
                <SelectItem value="clinical-trial-b">临床试验B数据集</SelectItem>
                <SelectItem value="observational-study">观察性研究数据集</SelectItem>
                <SelectItem value="genomic-analysis">基因组分析数据集</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" title="导出数据">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">概览分析</TabsTrigger>
            <TabsTrigger value="statistical">统计分析</TabsTrigger>
            <TabsTrigger value="comparative">比较分析</TabsTrigger>
            <TabsTrigger value="predictive">预测分析</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <DataAnalysisOverview />
          </TabsContent>

          <TabsContent value="statistical" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>统计分析工具</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <BarChart2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">描述性统计</h3>
                        <p className="text-sm text-muted-foreground">计算均值、中位数、标准差等基本统计量</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-3 rounded-full">
                        <PieChart className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">假设检验</h3>
                        <p className="text-sm text-muted-foreground">t检验、卡方检验、ANOVA等统计检验方法</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <FileSpreadsheet className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">回归分析</h3>
                        <p className="text-sm text-muted-foreground">线性回归、逻辑回归、多元回归分析</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 p-3 rounded-full">
                        <BarChart2 className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">生存分析</h3>
                        <p className="text-sm text-muted-foreground">Kaplan-Meier曲线、Cox比例风险模型</p>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">统计分析说明</h4>
                  <p className="text-sm">
                    选择上方的分析工具开始进行统计分析。系统将根据所选数据集自动推荐适合的统计方法，
                    并提供详细的结果解释和可视化图表。所有分析结果可导出为Excel或PDF格式。
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparative" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>比较分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 text-center">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                    <BarChart2 className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">选择数据集进行比较</h3>
                  <p className="text-muted-foreground mb-4">
                    请从左侧选择两个或多个数据集进行对比分析，或上传自定义数据集
                  </p>
                  <Button>开始比较分析</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictive" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>预测分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 text-center">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                    <BarChart2 className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">构建预测模型</h3>
                  <p className="text-muted-foreground mb-4">
                    基于现有数据构建预测模型，用于预测患者转归、治疗反应或疾病风险
                  </p>
                  <Button>创建预测模型</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
