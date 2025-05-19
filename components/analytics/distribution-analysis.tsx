"use client"

import { useState } from "react"
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Treemap,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 模拟数据
const demographicsData = [
  { name: "0-18岁", value: 1200, fill: "#8884d8" },
  { name: "19-35岁", value: 2300, fill: "#83a6ed" },
  { name: "36-50岁", value: 1800, fill: "#8dd1e1" },
  { name: "51-65岁", value: 1500, fill: "#82ca9d" },
  { name: "66岁以上", value: 950, fill: "#a4de6c" },
]

const genderData = [
  { name: "男性", value: 4200, fill: "#8884d8" },
  { name: "女性", value: 3800, fill: "#83a6ed" },
  { name: "其他", value: 120, fill: "#8dd1e1" },
]

const diagnosesData = [
  { name: "心血管疾病", value: 1800, fill: "#8884d8" },
  { name: "呼吸系统疾病", value: 1400, fill: "#83a6ed" },
  { name: "消化系统疾病", value: 1200, fill: "#8dd1e1" },
  { name: "神经系统疾病", value: 950, fill: "#82ca9d" },
  { name: "内分泌疾病", value: 850, fill: "#a4de6c" },
  { name: "其他", value: 1300, fill: "#ffc658" },
]

const regionsData = [
  { name: "华东", value: 2500, fill: "#8884d8" },
  { name: "华北", value: 1800, fill: "#83a6ed" },
  { name: "华南", value: 1600, fill: "#8dd1e1" },
  { name: "西南", value: 1200, fill: "#82ca9d" },
  { name: "西北", value: 950, fill: "#a4de6c" },
  { name: "东北", value: 1100, fill: "#ffc658" },
]

const outcomesData = [
  { name: "完全恢复", value: 3200, fill: "#82ca9d" },
  { name: "显著改善", value: 2100, fill: "#8dd1e1" },
  { name: "轻微改善", value: 1400, fill: "#83a6ed" },
  { name: "无变化", value: 850, fill: "#8884d8" },
  { name: "恶化", value: 450, fill: "#ffc658" },
]

const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#ffc658"]

interface DistributionAnalysisProps {
  category: string
  chartType: string
}

export function DistributionAnalysis({ category, chartType }: DistributionAnalysisProps) {
  const [activeSubTab, setActiveSubTab] = useState("age")

  // 根据类别选择数据
  const getDataByCategory = () => {
    switch (category) {
      case "demographics":
        return activeSubTab === "age" ? demographicsData : genderData
      case "diagnoses":
        return diagnosesData
      case "regions":
        return regionsData
      case "outcomes":
        return outcomesData
      default:
        return demographicsData
    }
  }

  const data = getDataByCategory()

  // 渲染图表
  const renderChart = () => {
    switch (chartType) {
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}人`, "数量"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}人`, "数量"]} />
              <Legend />
              <Bar dataKey="value" name="数量">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )
      case "donut":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={140}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}人`, "数量"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      case "treemap":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <Treemap
              data={data}
              dataKey="value"
              ratio={4 / 3}
              stroke="#fff"
              fill="#8884d8"
              content={({ root, depth, x, y, width, height, index, payload, colors, rank, name }) => {
                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      style={{
                        fill: COLORS[index % COLORS.length],
                        stroke: "#fff",
                        strokeWidth: 2 / (depth + 1e-10),
                        strokeOpacity: 1 / (depth + 1e-10),
                      }}
                    />
                    {width > 30 && height > 30 && (
                      <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
                        {name}
                      </text>
                    )}
                    {width > 30 && height > 30 && (
                      <text x={x + width / 2} y={y + height / 2 - 7} textAnchor="middle" fill="#fff" fontSize={14}>
                        {data[index].value}
                      </text>
                    )}
                  </g>
                )
              }}
            />
          </ResponsiveContainer>
        )
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}人`, "数量"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
    }
  }

  // 人口统计学有子选项卡
  if (category === "demographics") {
    return (
      <div className="space-y-4">
        <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="age">年龄分布</TabsTrigger>
            <TabsTrigger value="gender">性别分布</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="h-[400px]">{renderChart()}</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{data.length}</div>
              <p className="text-sm text-muted-foreground">数据分类数量</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {data.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">总样本数</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{data[0].name}</div>
              <p className="text-sm text-muted-foreground">最大分类</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="h-[400px]">{renderChart()}</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{data.length}</div>
            <p className="text-sm text-muted-foreground">数据分类数量</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{data.reduce((sum, item) => sum + item.value, 0).toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">总样本数</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{data[0].name}</div>
            <p className="text-sm text-muted-foreground">最大分类</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
