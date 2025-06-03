import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Activity, Database, Shield, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "数据分析 | 言语云³",
  description: "系统信息密度优化和数据可视化",
}

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-blue-800">数据分析中心</h1>
        <p className="text-blue-600">高密度信息展示和智能数据分析</p>
      </div>

      {/* 核心指标概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-full opacity-50"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
              <Users className="h-4 w-4" />
              用户活跃度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 mb-1">87.3%</div>
            <div className="flex items-center gap-2 text-xs">
              <Progress value={87.3} className="flex-1 h-1" />
              <span className="text-green-600">+5.2%</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">较上周提升</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-100 rounded-bl-full opacity-50"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              API性能
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 mb-1">99.2%</div>
            <div className="flex items-center gap-2 text-xs">
              <Progress value={99.2} className="flex-1 h-1" />
              <span className="text-green-600">稳定</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">成功率</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 rounded-bl-full opacity-50"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
              <Database className="h-4 w-4" />
              存储使用
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 mb-1">68.4%</div>
            <div className="flex items-center gap-2 text-xs">
              <Progress value={68.4} className="flex-1 h-1" />
              <span className="text-blue-600">2.1TB</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">剩余空间</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-bl-full opacity-50"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              安全评分
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 mb-1">94.7</div>
            <div className="flex items-center gap-2 text-xs">
              <Progress value={94.7} className="flex-1 h-1" />
              <span className="text-green-600">优秀</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">安全等级</p>
          </CardContent>
        </Card>
      </div>

      {/* 详细数据表格 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              系统资源使用
            </CardTitle>
            <CardDescription>实时资源监控和使用情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">CPU使用率</span>
                <div className="flex items-center gap-2">
                  <Progress value={45} className="w-20 h-2" />
                  <span className="text-sm text-blue-800 font-medium">45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">内存使用</span>
                <div className="flex items-center gap-2">
                  <Progress value={62} className="w-20 h-2" />
                  <span className="text-sm text-blue-800 font-medium">62%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">网络带宽</span>
                <div className="flex items-center gap-2">
                  <Progress value={28} className="w-20 h-2" />
                  <span className="text-sm text-blue-800 font-medium">28%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">磁盘I/O</span>
                <div className="flex items-center gap-2">
                  <Progress value={35} className="w-20 h-2" />
                  <span className="text-sm text-blue-800 font-medium">35%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              关键指标趋势
            </CardTitle>
            <CardDescription>重要系统指标的变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">响应时间</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-800">145ms</div>
                  <div className="text-xs text-green-600">-12ms ↓</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">并发用户</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-blue-800">1,247</div>
                  <div className="text-xs text-blue-600">+156 ↑</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">数据处理</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-purple-800">2.3TB</div>
                  <div className="text-xs text-purple-600">+0.2TB ↑</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
