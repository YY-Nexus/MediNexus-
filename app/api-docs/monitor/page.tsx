import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// 简化的API监控组件，避免复杂的图表依赖
function SimpleApiMonitor() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">API 监控与性能分析</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">总请求数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,458</div>
            <p className="text-xs text-muted-foreground mt-1">过去24小时</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均响应时间</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187 ms</div>
            <p className="text-xs text-muted-foreground mt-1">P95: 320 ms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">成功率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.8%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: "98.8%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">错误率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: "1.2%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API 端点状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <span className="font-medium">/auth/login</span>
                <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">POST</span>
              </div>
              <div className="text-sm text-muted-foreground">响应时间: 210ms | 错误率: 0.8%</div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <span className="font-medium">/certification/applications</span>
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">GET</span>
              </div>
              <div className="text-sm text-muted-foreground">响应时间: 165ms | 错误率: 0.5%</div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <span className="font-medium">/training/courses</span>
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">GET</span>
              </div>
              <div className="text-sm text-muted-foreground">响应时间: 175ms | 错误率: 0.3%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ApiMonitorPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">API 监控与性能分析</h1>
        <p className="text-muted-foreground">
          实时监控API性能指标，分析请求流量、响应时间、错误率等关键数据，帮助优化系统性能。
        </p>
      </div>

      <Suspense fallback={<div>加载中...</div>}>
        <SimpleApiMonitor />
      </Suspense>
    </div>
  )
}
