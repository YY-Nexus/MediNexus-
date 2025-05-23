import { ApiMonitor } from "@/components/api-docs/api-monitor"

export default function ApiMonitorPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">API 监控与性能分析</h1>
        <p className="text-muted-foreground">
          实时监控API性能指标，分析请求流量、响应时间、错误率等关键数据，帮助优化系统性能。
        </p>
      </div>

      <ApiMonitor />
    </div>
  )
}
