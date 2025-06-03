import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Server,
  Activity,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Monitor,
  Cpu,
  HardDrive,
} from "lucide-react"

export default function AIModelDeploymentPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI模型部署管理</h1>
            <p className="text-gray-600 mt-2">管理和监控AI模型的部署状态</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              配置
            </Button>
            <Button>
              <Play className="h-4 w-4 mr-2" />
              部署新模型
            </Button>
          </div>
        </div>

        {/* 系统状态概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">运行中模型</CardTitle>
              <Brain className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <p className="text-xs text-muted-foreground">总计 12 个模型</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU使用率</CardTitle>
              <Cpu className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">67%</div>
              <Progress value={67} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">内存使用</CardTitle>
              <HardDrive className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">12.4GB</div>
              <p className="text-xs text-muted-foreground">总计 32GB</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日请求</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">24,567</div>
              <p className="text-xs text-muted-foreground">平均响应 2.3s</p>
            </CardContent>
          </Card>
        </div>

        {/* 模型列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2" />
              部署的AI模型
            </CardTitle>
            <CardDescription>当前部署的所有AI模型及其运行状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 模型1 */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-semibold">胸部X光诊断模型</h3>
                      <p className="text-sm text-gray-600">版本 v2.1.3 • 部署于 2024-01-15</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="default">运行中</Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">准确率: 94.2%</p>
                    <p className="text-xs text-gray-600">今日请求: 1,234</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Pause className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* 模型2 */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-semibold">CT影像分析模型</h3>
                      <p className="text-sm text-gray-600">版本 v1.8.2 • 部署于 2024-01-10</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="default">运行中</Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">准确率: 91.8%</p>
                    <p className="text-xs text-gray-600">今日请求: 856</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Pause className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* 模型3 */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <h3 className="font-semibold">心电图分析模型</h3>
                      <p className="text-sm text-gray-600">版本 v3.0.1 • 部署于 2024-01-12</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">更新中</Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">准确率: 96.5%</p>
                    <p className="text-xs text-gray-600">今日请求: 567</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 性能监控 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>实时性能监控</CardTitle>
              <CardDescription>系统资源使用情况</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>CPU使用率</span>
                  <span>67%</span>
                </div>
                <Progress value={67} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>内存使用率</span>
                  <span>38%</span>
                </div>
                <Progress value={38} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>GPU使用率</span>
                  <span>82%</span>
                </div>
                <Progress value={82} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>网络带宽</span>
                  <span>45%</span>
                </div>
                <Progress value={45} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>部署统计</CardTitle>
              <CardDescription>模型部署和使用统计</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">总部署模型</span>
                <Badge variant="outline">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">运行中模型</span>
                <Badge variant="default">8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">暂停模型</span>
                <Badge variant="secondary">3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">更新中模型</span>
                <Badge variant="destructive">1</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">今日总请求</span>
                <Badge variant="outline">24,567</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">平均响应时间</span>
                <Badge variant="outline">2.3s</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
