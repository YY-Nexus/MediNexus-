"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// 模拟API监控数据
const mockApiMonitorData = {
  overview: {
    totalRequests: 12458,
    averageResponseTime: 187,
    errorRate: 1.2,
    successRate: 98.8,
    p95ResponseTime: 320,
    p99ResponseTime: 450,
  },
  endpoints: [
    {
      path: "/auth/login",
      method: "POST",
      requests: 2345,
      averageResponseTime: 210,
      errorRate: 0.8,
      p95ResponseTime: 350,
    },
    {
      path: "/certification/applications",
      method: "GET",
      requests: 1876,
      averageResponseTime: 165,
      errorRate: 0.5,
      p95ResponseTime: 280,
    },
    {
      path: "/certification/applications",
      method: "POST",
      requests: 987,
      averageResponseTime: 230,
      errorRate: 1.5,
      p95ResponseTime: 380,
    },
    {
      path: "/training/courses",
      method: "GET",
      requests: 1543,
      averageResponseTime: 175,
      errorRate: 0.3,
      p95ResponseTime: 290,
    },
    {
      path: "/training/courses",
      method: "POST",
      requests: 654,
      averageResponseTime: 245,
      errorRate: 2.1,
      p95ResponseTime: 410,
    },
  ],
  timeSeriesData: [
    { time: "00:00", requests: 120, responseTime: 180, errors: 1 },
    { time: "01:00", requests: 85, responseTime: 175, errors: 0 },
    { time: "02:00", requests: 60, responseTime: 170, errors: 0 },
    { time: "03:00", requests: 45, responseTime: 165, errors: 0 },
    { time: "04:00", requests: 40, responseTime: 160, errors: 0 },
    { time: "05:00", requests: 55, responseTime: 165, errors: 0 },
    { time: "06:00", requests: 90, responseTime: 175, errors: 1 },
    { time: "07:00", requests: 150, responseTime: 185, errors: 1 },
    { time: "08:00", requests: 250, responseTime: 195, errors: 2 },
    { time: "09:00", requests: 380, responseTime: 210, errors: 3 },
    { time: "10:00", requests: 450, responseTime: 220, errors: 4 },
    { time: "11:00", requests: 520, responseTime: 230, errors: 5 },
    { time: "12:00", requests: 480, responseTime: 225, errors: 4 },
    { time: "13:00", requests: 520, responseTime: 230, errors: 5 },
    { time: "14:00", requests: 550, responseTime: 235, errors: 6 },
    { time: "15:00", requests: 580, responseTime: 240, errors: 7 },
    { time: "16:00", requests: 620, responseTime: 245, errors: 8 },
    { time: "17:00", requests: 550, responseTime: 235, errors: 6 },
    { time: "18:00", requests: 480, responseTime: 225, errors: 5 },
    { time: "19:00", requests: 420, responseTime: 215, errors: 4 },
    { time: "20:00", requests: 350, responseTime: 205, errors: 3 },
    { time: "21:00", requests: 280, responseTime: 195, errors: 2 },
    { time: "22:00", requests: 220, responseTime: 190, errors: 2 },
    { time: "23:00", requests: 180, responseTime: 185, errors: 1 },
  ],
  errorDistribution: [
    { status: "400", count: 45, percentage: 30 },
    { status: "401", count: 35, percentage: 23.3 },
    { status: "403", count: 25, percentage: 16.7 },
    { status: "404", count: 20, percentage: 13.3 },
    { status: "500", count: 15, percentage: 10 },
    { status: "503", count: 10, percentage: 6.7 },
  ],
}

// 饼图的颜色
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF6B6B"]

export function ApiMonitor() {
  const [data, setData] = useState(mockApiMonitorData)
  const [timeRange, setTimeRange] = useState("24h")

  // 模拟数据加载
  useEffect(() => {
    // 实际项目中，这里应该从API获取数据
    setData(mockApiMonitorData)
  }, [timeRange])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">API 监控与性能分析</h2>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">时间范围:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="1h">1小时</option>
              <option value="6h">6小时</option>
              <option value="12h">12小时</option>
              <option value="24h">24小时</option>
              <option value="7d">7天</option>
              <option value="30d">30天</option>
            </select>
          </div>

          <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">刷新</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">总请求数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">过去24小时</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均响应时间</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.averageResponseTime} ms</div>
            <p className="text-xs text-muted-foreground mt-1">P95: {data.overview.p95ResponseTime} ms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">成功率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.successRate}%</div>
            <Progress value={data.overview.successRate} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">错误率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.errorRate}%</div>
            <Progress value={data.overview.errorRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic">
        <TabsList className="mb-4">
          <TabsTrigger value="traffic">流量分析</TabsTrigger>
          <TabsTrigger value="performance">性能分析</TabsTrigger>
          <TabsTrigger value="errors">错误分析</TabsTrigger>
          <TabsTrigger value="endpoints">端点分析</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic">
          <Card>
            <CardHeader>
              <CardTitle>API 请求流量</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    requests: {
                      label: "请求数",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="requests"
                        stroke="var(--color-requests)"
                        name="请求数"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>响应时间分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    responseTime: {
                      label: "响应时间 (ms)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="responseTime"
                        stroke="var(--color-responseTime)"
                        name="响应时间 (ms)"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>错误率趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer
                    config={{
                      errors: {
                        label: "错误数",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.timeSeriesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="errors"
                          stroke="var(--color-errors)"
                          name="错误数"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>错误状态码分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.errorDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="status"
                        label={({ status, percentage }) => `${status}: ${percentage}%`}
                      >
                        {data.errorDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value} 次`, `状态码 ${name}`]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="endpoints">
          <Card>
            <CardHeader>
              <CardTitle>端点性能分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.endpoints}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="path"
                      tickFormatter={(value, index) => `${value} (${data.endpoints[index].method})`}
                    />
                    <Tooltip
                      formatter={(value, name, props) => {
                        if (name === "averageResponseTime") return [`${value} ms`, "平均响应时间"]
                        if (name === "requests") return [`${value} 次`, "请求数"]
                        if (name === "errorRate") return [`${value}%`, "错误率"]
                        return [value, name]
                      }}
                    />
                    <Legend />
                    <Bar dataKey="averageResponseTime" name="平均响应时间" fill="#8884d8" />
                    <Bar dataKey="requests" name="请求数" fill="#82ca9d" />
                    <Bar dataKey="errorRate" name="错误率" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">端点详情</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-2 text-left">端点</th>
                        <th className="px-4 py-2 text-left">方法</th>
                        <th className="px-4 py-2 text-right">请求数</th>
                        <th className="px-4 py-2 text-right">平均响应时间</th>
                        <th className="px-4 py-2 text-right">P95响应时间</th>
                        <th className="px-4 py-2 text-right">错误率</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.endpoints.map((endpoint, index) => (
                        <tr key={index} className="border-b border-muted">
                          <td className="px-4 py-2">{endpoint.path}</td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 text-xs rounded ${
                                endpoint.method === "GET"
                                  ? "bg-blue-100 text-blue-800"
                                  : endpoint.method === "POST"
                                    ? "bg-green-100 text-green-800"
                                    : endpoint.method === "PUT"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : endpoint.method === "DELETE"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {endpoint.method}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-right">{endpoint.requests.toLocaleString()}</td>
                          <td className="px-4 py-2 text-right">{endpoint.averageResponseTime} ms</td>
                          <td className="px-4 py-2 text-right">{endpoint.p95ResponseTime} ms</td>
                          <td className="px-4 py-2 text-right">{endpoint.errorRate}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
