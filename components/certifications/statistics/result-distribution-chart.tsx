"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function ResultDistributionChart() {
  const [chartType, setChartType] = useState("pie")

  // 模拟数据
  const data = {
    verified: 68,
    rejected: 12,
    pending: 20,
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>认证结果分布</CardTitle>
        <Select value={chartType} onValueChange={setChartType}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="图表类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">饼图</SelectItem>
            <SelectItem value="donut">环形图</SelectItem>
            <SelectItem value="bar">柱状图</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full flex flex-col items-center justify-center">
          {/* 这里应该使用实际的图表库，如 recharts 或 Chart.js */}
          {/* 为了简化，我们使用模拟的图表展示 */}
          <div className="relative h-60 w-60 rounded-full bg-muted/20 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium">认证结果</p>
                <p className="text-sm text-muted-foreground">总计: 100%</p>
              </div>
            </div>

            {/* 模拟饼图扇区 */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-green-500 rounded-tr-full opacity-80"></div>
              <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-yellow-500 rounded-br-full opacity-80"></div>
              <div className="absolute top-0 right-1/2 w-1/2 h-full bg-red-500 rounded-l-full opacity-80"></div>

              {chartType === "donut" && (
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white rounded-full"></div>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">已验证 ({data.verified}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm">已拒绝 ({data.rejected}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm">待处理 ({data.pending}%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
