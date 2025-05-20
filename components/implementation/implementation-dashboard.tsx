"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  PieChart,
  LineChart,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUp,
  Download,
} from "lucide-react"

export function ImplementationDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">实施进度仪表板</h1>
          <p className="text-muted-foreground mt-1">导航结构优化项目的实时进度监控</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            <span>导出报告</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">总体进度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32%</div>
            <Progress value={32} className="mt-2" />
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
              <ArrowUp className="h-3 w-3" />
              <span>较上周提高5%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">已完成任务</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12/38</div>
            <Progress value={(12 / 38) * 100} className="mt-2" />
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
              <ArrowUp className="h-3 w-3" />
              <span>本周完成3项</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">里程碑状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5/16</div>
            <Progress value={(5 / 16) * 100} className="mt-2" />
            <div className="flex items-center gap-1 mt-2 text-muted-foreground text-sm">
              <Clock className="h-3 w-3" />
              <span>下一里程碑: 12月15日</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">风险状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">3</div>
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">高风险</Badge>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-xl font-medium">5</div>
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">中风险</Badge>
            </div>
            <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
              <ArrowUp className="h-3 w-3" />
              <span>新增1项高风险</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="progress">
            <BarChart className="h-4 w-4 mr-2" />
            进度分析
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Users className="h-4 w-4 mr-2" />
            资源利用率
          </TabsTrigger>
          <TabsTrigger value="timeline">
            <Calendar className="h-4 w-4 mr-2" />
            时间线预测
          </TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>各阶段进度</CardTitle>
                <CardDescription>按阶段划分的项目进度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <BarChart className="h-16 w-16 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>任务完成情况</CardTitle>
                <CardDescription>按状态划分的任务分布</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>资源利用率</CardTitle>
              <CardDescription>项目资源分配和使用情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <BarChart className="h-16 w-16 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>时间线预测</CardTitle>
              <CardDescription>基于当前进度的项目完成时间预测</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>近期活动</CardTitle>
            <CardDescription>项目最近的活动记录</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">角色导航视图组件开发完成</div>
                  <div className="text-sm text-muted-foreground">2025-12-05 14:30</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">导航权限控制实现开始</div>
                  <div className="text-sm text-muted-foreground">2025-12-06 09:15</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <div className="font-medium">识别到新的风险：组件复杂度超出预期</div>
                  <div className="text-sm text-muted-foreground">2025-12-07 11:20</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>即将到来的里程碑</CardTitle>
            <CardDescription>未来30天内的关键里程碑</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">导航组件开发完成</div>
                  <div className="text-sm text-muted-foreground">2025-12-15</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">8天后</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">财务管理模块完成</div>
                  <div className="text-sm text-muted-foreground">2025-12-20</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">13天后</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">患者门户功能完成</div>
                  <div className="text-sm text-muted-foreground">2025-12-25</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">18天后</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>风险监控</CardTitle>
            <CardDescription>当前活跃的项目风险</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <div className="font-medium">组件复杂度超出预期</div>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">高风险</Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1">采用渐进式开发，先实现核心功能</div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <div className="font-medium">与现有系统集成困难</div>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">高风险</Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1">提前进行技术评估和兼容性测试</div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <div className="font-medium">开发资源不足</div>
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">中风险</Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1">合理规划开发任务，必要时调整优先级</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
