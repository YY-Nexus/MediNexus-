import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Activity, Database, Shield, Clock, TrendingUp, AlertCircle, CheckCircle, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "管理仪表板 | 言语云³",
  description: "实用的系统管理控制面板",
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-blue-800">管理仪表板</h1>
        <p className="text-blue-600">实用的系统管理和监控中心</p>
      </div>

      {/* 快速操作面板 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-blue-800">快速操作</CardTitle>
          <CardDescription>常用管理功能一键访问</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col bg-blue-600 hover:bg-blue-700">
              <Users className="h-6 w-6 mb-2" />
              用户管理
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              安全设置
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Database className="h-6 w-6 mb-2" />
              数据备份
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              性能监控
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 实时监控指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">系统负载</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">23%</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              性能良好
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">响应时间</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">145ms</div>
            <p className="text-xs text-green-600 flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              响应正常
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">错误率</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">0.02%</div>
            <p className="text-xs text-green-600 flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              稳定运行
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">可用性</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">99.9%</div>
            <p className="text-xs text-green-600 flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              高可用
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 管理任务列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">待处理任务</CardTitle>
          <CardDescription>需要管理员关注的重要事项</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">系统更新可用</p>
                  <p className="text-xs text-yellow-600">建议在维护窗口期间更新</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                查看详情
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-800">新用户审核</p>
                  <p className="text-xs text-blue-600">5个新用户等待审核</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                立即处理
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">备份完成</p>
                  <p className="text-xs text-green-600">昨日23:00自动备份成功</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">已完成</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
