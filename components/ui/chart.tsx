"use client"

import type * as React from "react"
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart as RechartsAreaChart,
  Area,
} from "recharts"
import { cn } from "@/lib/utils"

// 图表容器组件
interface ChartContainerProps {
  children: React.ReactNode
  className?: string
  config?: Record<string, { label: string; color: string }>
}

export function ChartContainer({ children, className, config }: ChartContainerProps) {
  return (
    <div className={cn("w-full h-[350px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

// 图表工具提示组件
interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  config?: Record<string, { label: string; color: string }>
}

export function ChartTooltip({ active, payload, label, config }: ChartTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
          </div>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-sm font-medium">
                {config?.[entry.dataKey]?.label || entry.dataKey}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function ChartTooltipContent({ active, payload, label }: ChartTooltipProps) {
  return <ChartTooltip active={active} payload={payload} label={label} />
}

// 柱状图组件
interface BarChartProps {
  data: any[]
  dataKey: string
  xAxisKey: string
  className?: string
  color?: string
  config?: Record<string, { label: string; color: string }>
}

export function BarChart({ data, dataKey, xAxisKey, className, color = "#3b82f6", config }: BarChartProps) {
  return (
    <ChartContainer className={className} config={config}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip content={<ChartTooltip config={config} />} />
        <Legend />
        <Bar dataKey={dataKey} fill={color} />
      </RechartsBarChart>
    </ChartContainer>
  )
}

// 折线图组件
interface LineChartProps {
  data: any[]
  dataKey: string
  xAxisKey: string
  className?: string
  color?: string
  config?: Record<string, { label: string; color: string }>
}

export function LineChart({ data, dataKey, xAxisKey, className, color = "#3b82f6", config }: LineChartProps) {
  return (
    <ChartContainer className={className} config={config}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip content={<ChartTooltip config={config} />} />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ fill: color }} />
      </RechartsLineChart>
    </ChartContainer>
  )
}

// 饼图组件
interface PieChartProps {
  data: any[]
  dataKey: string
  nameKey: string
  className?: string
  colors?: string[]
  config?: Record<string, { label: string; color: string }>
}

export function PieChart({
  data,
  dataKey,
  nameKey,
  className,
  colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"],
  config,
}: PieChartProps) {
  return (
    <ChartContainer className={className} config={config}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip config={config} />} />
        <Legend />
      </RechartsPieChart>
    </ChartContainer>
  )
}

// 面积图组件
interface AreaChartProps {
  data: any[]
  dataKey: string
  xAxisKey: string
  className?: string
  color?: string
  config?: Record<string, { label: string; color: string }>
}

export function AreaChart({ data, dataKey, xAxisKey, className, color = "#3b82f6", config }: AreaChartProps) {
  return (
    <ChartContainer className={className} config={config}>
      <RechartsAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip content={<ChartTooltip config={config} />} />
        <Area type="monotone" dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.3} />
      </RechartsAreaChart>
    </ChartContainer>
  )
}

// 多数据系列图表组件
interface MultiSeriesChartProps {
  data: any[]
  series: Array<{
    dataKey: string
    color: string
    label: string
  }>
  xAxisKey: string
  type: "bar" | "line" | "area"
  className?: string
  config?: Record<string, { label: string; color: string }>
}

export function MultiSeriesChart({ data, series, xAxisKey, type, className, config }: MultiSeriesChartProps) {
  const ChartComponent = type === "bar" ? RechartsBarChart : type === "line" ? RechartsLineChart : RechartsAreaChart

  return (
    <ChartContainer className={className} config={config}>
      <ChartComponent data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip content={<ChartTooltip config={config} />} />
        <Legend />
        {series.map((item, index) => {
          if (type === "bar") {
            return <Bar key={index} dataKey={item.dataKey} fill={item.color} />
          } else if (type === "line") {
            return (
              <Line
                key={index}
                type="monotone"
                dataKey={item.dataKey}
                stroke={item.color}
                strokeWidth={2}
                dot={{ fill: item.color }}
              />
            )
          } else {
            return (
              <Area
                key={index}
                type="monotone"
                dataKey={item.dataKey}
                stroke={item.color}
                fill={item.color}
                fillOpacity={0.3}
              />
            )
          }
        })}
      </ChartComponent>
    </ChartContainer>
  )
}

// 医疗专用图表样式
export const medicalChartColors = {
  primary: "#0ea5e9",
  secondary: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#6366f1",
  success: "#22c55e",
  muted: "#64748b",
}

// 医疗数据图表配置
export const medicalChartConfig = {
  patients: { label: "患者数量", color: medicalChartColors.primary },
  diagnoses: { label: "诊断数量", color: medicalChartColors.secondary },
  treatments: { label: "治疗数量", color: medicalChartColors.info },
  appointments: { label: "预约数量", color: medicalChartColors.warning },
  revenue: { label: "收入", color: medicalChartColors.success },
  costs: { label: "成本", color: medicalChartColors.danger },
}
