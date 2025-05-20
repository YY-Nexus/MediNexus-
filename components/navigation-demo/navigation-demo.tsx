"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RoleBasedSidebar } from "@/components/layout/role-based-sidebar"
import { Sidebar } from "@/components/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Info } from "lucide-react"

export function NavigationDemo() {
  const [isOriginalCollapsed, setIsOriginalCollapsed] = useState(false)
  const [isOptimizedCollapsed, setIsOptimizedCollapsed] = useState(false)

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">言语医枢³系统导航结构优化演示</h1>
        <p className="text-muted-foreground">对比优化前后的导航结构，体验基于角色的导航视图</p>
      </div>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">导航结构对比</TabsTrigger>
          <TabsTrigger value="role-based">基于角色的导航</TabsTrigger>
          <TabsTrigger value="new-features">新增功能模块</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>优化前的导航结构</CardTitle>
                <CardDescription>原始导航结构（13个一级导航）</CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[600px] overflow-hidden border-t">
                <div className="flex h-full">
                  <Sidebar isCollapsed={isOriginalCollapsed} setIsCollapsed={setIsOriginalCollapsed} />
                  <div className="flex-1 p-6 bg-gray-50">
                    <div className="text-center text-muted-foreground">
                      <p>原始导航结构预览</p>
                      <p className="text-sm mt-2">13个一级导航项，结构复杂</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>优化后的导航结构</CardTitle>
                <CardDescription>重组后的导航结构（8个一级导航）</CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[600px] overflow-hidden border-t">
                <div className="flex h-full">
                  <RoleBasedSidebar isCollapsed={isOptimizedCollapsed} setIsCollapsed={setIsOptimizedCollapsed} />
                  <div className="flex-1 p-6 bg-gray-50">
                    <div className="text-center text-muted-foreground">
                      <p>优化后导航结构预览</p>
                      <p className="text-sm mt-2">8个一级导航项，结构清晰</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">导航结构优化要点</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    导航项整合
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-medical-500 mt-0.5" />
                      <span>将13个一级导航整合为8个，减轻认知负担</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-medical-500 mt-0.5" />
                      <span>合并功能相似的导航项，如"智能诊断"和"临床决策"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-medical-500 mt-0.5" />
                      <span>将"远程会诊"和"移动应用"整合为"远程医疗"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-medical-500 mt-0.5" />
                      <span>将"药物管理"和"健康数据"整合为"医疗资源"</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    二级导航优化
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-medical-500 mt-0.5" />
                      <span>将"系统管理"下的功能分为四个子类别</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-medical-500 mt-0.5" />
                      <span>将"API配置"从"资质验证"移至"系统集成"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-medical-500 mt-0.5" />
                      <span>合并"智能诊断"和"临床决策"下的相似功能</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-medical-500 mt-0.5" />
                      <span>使二级导航命名更具体，提高可理解性</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    用户体验提升
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-medical-500 mt-0.5" />
                      <span>添加基于角色的导航视图，简化用户操作</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-medical-500 mt-0.5" />
                      <span>为新功能添加醒目标记，提高用户感知</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-medical-500 mt-0.5" />
                      <span>优化导航层级，减少用户查找成本</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-medical-500 mt-0.5" />
                      <span>改进导航分组，使相关功能更集中</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="role-based" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>基于角色的导航视图</CardTitle>
              <CardDescription>根据不同角色显示相关功能，简化用户操作</CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-[600px] overflow-hidden border-t">
              <div className="flex h-full">
                <RoleBasedSidebar isCollapsed={isOptimizedCollapsed} setIsCollapsed={setIsOptimizedCollapsed} />
                <div className="flex-1 p-6 bg-gray-50">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-lg font-medium mb-4">角色导航视图说明</h3>
                    <p className="mb-4">
                      基于角色的导航视图根据用户角色自动显示相关功能，简化用户操作体验。
                      请从左侧导航栏上方的下拉菜单中选择不同角色，体验导航项的变化。
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">医生视图</h4>
                        <p className="text-sm text-muted-foreground mb-2">突出临床工作站、患者管理、医疗资源等功能</p>
                        <Badge>临床工作站</Badge>
                        <Badge className="ml-2">患者管理</Badge>
                        <Badge className="ml-2">医疗资源</Badge>
                        <Badge className="ml-2">远程医疗</Badge>
                        <Badge className="ml-2">医学研究</Badge>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">研究人员视图</h4>
                        <p className="text-sm text-muted-foreground mb-2">突出医学研究、数据分析等功能</p>
                        <Badge>临床工作站</Badge>
                        <Badge className="ml-2">患者管理</Badge>
                        <Badge className="ml-2">医疗资源</Badge>
                        <Badge className="ml-2">医学研究</Badge>
                        <Badge className="ml-2">安全与合规</Badge>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">IT人员视图</h4>
                        <p className="text-sm text-muted-foreground mb-2">突出系统管理、安全与合规等功能</p>
                        <Badge>系统集成</Badge>
                        <Badge className="ml-2">安全与合规</Badge>
                        <Badge className="ml-2">系统管理</Badge>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">财务人员视图</h4>
                        <p className="text-sm text-muted-foreground mb-2">突出财务管理、患者管理等功能</p>
                        <Badge>患者管理</Badge>
                        <Badge className="ml-2">财务管理</Badge>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-700">角色导航的优势</h4>
                        <ul className="mt-2 space-y-1 text-sm text-blue-700">
                          <li>• 减少信息过载，提高用户效率</li>
                          <li>• 简化界面，降低用户学习成本</li>
                          <li>• 突出与用户角色相关的功能</li>
                          <li>• 提高系统使用体验和满意度</li>
                          <li>• 减少用户操作错误和支持请求</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-features" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>新增功能模块</CardTitle>
                <CardDescription>根据分析结果添加的新功能模块</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">财务管理模块</h3>
                    <div className="border rounded-lg p-4">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">医保结算</span>
                          <span className="text-sm text-muted-foreground ml-2">医保费用结算管理</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">费用管理</span>
                          <span className="text-sm text-muted-foreground ml-2">医疗费用管理</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">收费项目</span>
                          <span className="text-sm text-muted-foreground ml-2">医疗服务定价</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">财务报表</span>
                          <span className="text-sm text-muted-foreground ml-2">财务报表生成</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">发票管理</span>
                          <span className="text-sm text-muted-foreground ml-2">发票生成与管理</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">费用统计</span>
                          <span className="text-sm text-muted-foreground ml-2">费用统计分析</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">患者门户功能</h3>
                    <div className="border rounded-lg p-4">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">患者门户</span>
                          <span className="text-sm text-muted-foreground ml-2">患者自助服务管理</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">知情同意</span>
                          <span className="text-sm text-muted-foreground ml-2">患者知情同意管理</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">医院运营管理</h3>
                    <div className="border rounded-lg p-4">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">医疗设备</span>
                          <span className="text-sm text-muted-foreground ml-2">医疗设备管理</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">资源调度</span>
                          <span className="text-sm text-muted-foreground ml-2">医疗资源调度管理</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">床位管理</span>
                          <span className="text-sm text-muted-foreground ml-2">住院床位管理</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">手术排程</span>
                          <span className="text-sm text-muted-foreground ml-2">手术室排程管理</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>安全与合规增强</CardTitle>
                <CardDescription>增强数据安全和合规性功能</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">隐私保护功能</h3>
                    <div className="border rounded-lg p-4">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">隐私保护</span>
                          <span className="text-sm text-muted-foreground ml-2">数据隐私保护</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">数据脱敏</span>
                          <span className="text-sm text-muted-foreground ml-2">数据脱敏与匿名化</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline">新功能</Badge>
                          <span className="font-medium">监管报告</span>
                          <span className="text-sm text-muted-foreground ml-2">监管合规报告</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">系统管理优化</h3>
                    <div className="border rounded-lg p-4">
                      <ul className="space-y-4">
                        <li>
                          <div className="font-medium">系统配置</div>
                          <ul className="pl-4 mt-1 space-y-1 text-sm text-muted-foreground">
                            <li>• 基础设置</li>
                            <li>• 参数配置</li>
                            <li>• 界面定制</li>
                            <li>• 通知设置</li>
                          </ul>
                        </li>
                        <li>
                          <div className="font-medium">用户权限</div>
                          <ul className="pl-4 mt-1 space-y-1 text-sm text-muted-foreground">
                            <li>• 用户管理</li>
                            <li>• 角色管理</li>
                            <li>• 权限分配</li>
                            <li>• 部门管理</li>
                          </ul>
                        </li>
                        <li>
                          <div className="font-medium">运维管理</div>
                          <ul className="pl-4 mt-1 space-y-1 text-sm text-muted-foreground">
                            <li>• 系统监控</li>
                            <li>• 性能优化</li>
                            <li>• 日志管理</li>
                            <li>• 计划任务</li>
                            <li>• 部署检查</li>
                          </ul>
                        </li>
                        <li>
                          <div className="font-medium">数据管理</div>
                          <ul className="pl-4 mt-1 space-y-1 text-sm text-muted-foreground">
                            <li>• 数据备份</li>
                            <li>• 数据恢复</li>
                            <li>• 数据归档</li>
                            <li>• 数据清理</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full">查看完整功能列表</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
