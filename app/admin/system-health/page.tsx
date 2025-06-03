import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, XCircle, Database, Server, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "系统健康检查 | 言语云³",
  description: "系统技术债务清理和健康状态监控",
}

export default function SystemHealthPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-blue-800">系统健康检查</h1>
        <p className="text-blue-600">技术债务清理状态和系统稳定性监控</p>
      </div>

      {/* 技术债务清理状态 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              已清理项目
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700 mb-2">15</div>
            <ul className="text-sm text-green-600 space-y-1">
              <li>✓ 删除冗余组件</li>
              <li>✓ 修复导入错误</li>
              <li>✓ 统一代码规范</li>
              <li>✓ 优化依赖关系</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              待处理项目
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-700 mb-2">3</div>
            <ul className="text-sm text-yellow-600 space-y-1">
              <li>⚠ 性能优化待完成</li>
              <li>⚠ 测试覆盖率提升</li>
              <li>⚠ 文档更新</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <XCircle className="h-5 w-5" />
              风险项目
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700 mb-2">0</div>
            <p className="text-sm text-red-600">🎉 当前无高风险技术债务</p>
          </CardContent>
        </Card>
      </div>

      {/* 系统组件健康状态 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">系统组件健康状态</CardTitle>
          <CardDescription>各核心组件运行状态和稳定性评估</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">数据库连接</span>
              </div>
              <Badge className="bg-green-100 text-green-800">正常</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">API服务</span>
              </div>
              <Badge className="bg-green-100 text-green-800">正常</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">安全模块</span>
              </div>
              <Badge className="bg-green-100 text-green-800">正常</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
