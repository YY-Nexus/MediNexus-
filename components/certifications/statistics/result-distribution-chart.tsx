"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface ResultDistributionData {
  result: string
  count: number
  percentage: number
  color: string
}

interface ResultDistributionChartProps {
  data?: ResultDistributionData[]
  title?: string
  description?: string
}

const defaultData: ResultDistributionData[] = [
  {
    result: "验证成功",
    count: 1245,
    percentage: 78.5,
    color: "#10b981",
  },
  {
    result: "验证失败",
    count: 186,
    percentage: 11.7,
    color: "#ef4444",
  },
  {
    result: "待审核",
    count: 98,
    percentage: 6.2,
    color: "#f59e0b",
  },
  {
    result: "已过期",
    count: 56,
    percentage: 3.6,
    color: "#6b7280",
  },
]

const chartConfig = {
  count: {
    label: "数量",
    color: "#2563eb",
  },
}

export function ResultDistributionChart({
  data = defaultData,
  title = "验证结果分布",
  description = "各类验证结果的统计分布",
}: ResultDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="result" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [`${value} 个`, name === "count" ? "数量" : name]}
                    labelFormatter={(label) => `结果类型: ${label}`}
                  />
                }
              />
              <Bar dataKey="count" fill={(entry) => entry.color || "#2563eb"} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* 统计摘要 */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }} />
              <div className="text-sm font-medium">{item.result}</div>
              <div className="text-xs text-muted-foreground">
                {item.count} ({item.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// 默认导出
export default ResultDistributionChart
