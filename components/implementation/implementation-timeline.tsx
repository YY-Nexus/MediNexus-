"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Users,
  BarChart4,
  ChevronDown,
  ChevronUp,
  Info,
  Download,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ImplementationTimeline() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>("phase1")
  const [activeTab, setActiveTab] = useState("timeline")

  // 实施阶段数据
  const phases = [
    {
      id: "phase1",
      name: "阶段一：准备与规划",
      status: "completed",
      progress: 100,
      startDate: "2025-11-01",
      endDate: "2025-11-15",
      description: "完成需求分析、资源规划和实施方案制定",
      tasks: [
        { name: "导航结构需求分析", status: "completed", owner: "产品经理", dueDate: "2025-11-05" },
        { name: "用户角色与权限梳理", status: "completed", owner: "产品经理", dueDate: "2025-11-08" },
        { name: "导航优化方案设计", status: "completed", owner: "UI设计师", dueDate: "2025-11-10" },
        { name: "实施计划制定", status: "completed", owner: "项目经理", dueDate: "2025-11-12" },
        { name: "资源分配与团队组建", status: "completed", owner: "项目经理", dueDate: "2025-11-15" },
      ],
      milestones: [
        { name: "需求分析报告完成", date: "2025-11-05", status: "completed" },
        { name: "导航优化方案确认", date: "2025-11-10", status: "completed" },
        { name: "实施计划批准", date: "2025-11-15", status: "completed" },
      ],
      risks: [
        { name: "需求理解不一致", impact: "中", mitigation: "多次与利益相关方确认需求" },
        { name: "资源分配不足", impact: "高", mitigation: "提前规划资源需求并获得管理层支持" },
      ],
    },
    {
      id: "phase2",
      name: "阶段二：导航结构开发",
      status: "in-progress",
      progress: 65,
      startDate: "2025-11-16",
      endDate: "2025-12-15",
      description: "开发优化后的导航结构和角色导航视图",
      tasks: [
        { name: "导航配置文件开发", status: "completed", owner: "前端开发", dueDate: "2025-11-25" },
        { name: "角色导航视图组件开发", status: "completed", owner: "前端开发", dueDate: "2025-12-05" },
        { name: "导航权限控制实现", status: "in-progress", owner: "前端开发", dueDate: "2025-12-10" },
        { name: "导航状态管理优化", status: "in-progress", owner: "前端开发", dueDate: "2025-12-12" },
        { name: "导航组件单元测试", status: "not-started", owner: "测试工程师", dueDate: "2025-12-15" },
      ],
      milestones: [
        { name: "导航配置文件完成", date: "2025-11-25", status: "completed" },
        { name: "角色导航视图完成", date: "2025-12-05", status: "completed" },
        { name: "导航组件开发完成", date: "2025-12-15", status: "pending" },
      ],
      risks: [
        { name: "组件复杂度超出预期", impact: "中", mitigation: "采用渐进式开发，先实现核心功能" },
        { name: "与现有系统集成困难", impact: "高", mitigation: "提前进行技术评估和兼容性测试" },
      ],
    },
    {
      id: "phase3",
      name: "阶段三：新功能模块开发",
      status: "not-started",
      progress: 0,
      startDate: "2025-12-01",
      endDate: "2026-01-15",
      description: "开发医保结算、患者门户等新功能模块",
      tasks: [
        { name: "财务管理模块开发", status: "not-started", owner: "全栈开发", dueDate: "2025-12-20" },
        { name: "患者门户功能开发", status: "not-started", owner: "全栈开发", dueDate: "2025-12-25" },
        { name: "医院运营管理功能开发", status: "not-started", owner: "全栈开发", dueDate: "2026-01-05" },
        { name: "数据隐私保护功能开发", status: "not-started", owner: "后端开发", dueDate: "2026-01-10" },
        { name: "新功能单元测试", status: "not-started", owner: "测试工程师", dueDate: "2026-01-15" },
      ],
      milestones: [
        { name: "财务管理模块完成", date: "2025-12-20", status: "pending" },
        { name: "患者门户功能完成", date: "2025-12-25", status: "pending" },
        { name: "所有新功能开发完成", date: "2026-01-15", status: "pending" },
      ],
      risks: [
        { name: "功能需求变更", impact: "高", mitigation: "采用敏捷开发方法，定期与利益相关方确认" },
        { name: "开发资源不足", impact: "中", mitigation: "合理规划开发任务，必要时调整优先级" },
        { name: "第三方集成延迟", impact: "高", mitigation: "提前启动第三方系统集成评估和测试" },
      ],
    },
    {
      id: "phase4",
      name: "阶段四：集成与测试",
      status: "not-started",
      progress: 0,
      startDate: "2026-01-16",
      endDate: "2026-02-15",
      description: "系统集成、功能测试和用户验收测试",
      tasks: [
        { name: "导航与新功能集成", status: "not-started", owner: "系统架构师", dueDate: "2026-01-25" },
        { name: "系统集成测试", status: "not-started", owner: "测试工程师", dueDate: "2026-02-01" },
        { name: "用户验收测试准备", status: "not-started", owner: "测试经理", dueDate: "2026-02-05" },
        { name: "用户验收测试执行", status: "not-started", owner: "测试团队", dueDate: "2026-02-10" },
        { name: "缺陷修复与回归测试", status: "not-started", owner: "开发团队", dueDate: "2026-02-15" },
      ],
      milestones: [
        { name: "系统集成完成", date: "2026-01-25", status: "pending" },
        { name: "系统测试通过", date: "2026-02-01", status: "pending" },
        { name: "用户验收测试通过", date: "2026-02-15", status: "pending" },
      ],
      risks: [
        { name: "集成问题导致延迟", impact: "高", mitigation: "提前进行集成测试，建立问题快速响应机制" },
        { name: "用户验收测试发现重大问题", impact: "高", mitigation: "在正式UAT前进行内部预验收" },
        { name: "性能问题", impact: "中", mitigation: "进行性能测试并优化系统性能" },
      ],
    },
    {
      id: "phase5",
      name: "阶段五：部署与上线",
      status: "not-started",
      progress: 0,
      startDate: "2026-02-16",
      endDate: "2026-03-15",
      description: "系统部署、用户培训和正式上线",
      tasks: [
        { name: "部署计划制定", status: "not-started", owner: "运维经理", dueDate: "2026-02-20" },
        { name: "用户培训材料准备", status: "not-started", owner: "培训专员", dueDate: "2026-02-25" },
        { name: "系统部署与配置", status: "not-started", owner: "运维团队", dueDate: "2026-03-01" },
        { name: "用户培训执行", status: "not-started", owner: "培训团队", dueDate: "2026-03-05" },
        { name: "系统正式上线", status: "not-started", owner: "项目团队", dueDate: "2026-03-10" },
        { name: "上线后支持与监控", status: "not-started", owner: "运维团队", dueDate: "2026-03-15" },
      ],
      milestones: [
        { name: "部署计划批准", date: "2026-02-20", status: "pending" },
        { name: "系统部署完成", date: "2026-03-01", status: "pending" },
        { name: "用户培训完成", date: "2026-03-05", status: "pending" },
        { name: "系统正式上线", date: "2026-03-10", status: "pending" },
      ],
      risks: [
        { name: "部署环境问题", impact: "高", mitigation: "提前准备部署环境并进行测试" },
        { name: "用户抵制变更", impact: "中", mitigation: "加强变更管理和用户沟通" },
        { name: "上线后性能问题", impact: "高", mitigation: "制定回滚计划和应急响应机制" },
      ],
    },
  ]

  // 资源需求数据
  const resources = [
    { role: "项目经理", count: 1, allocation: "全职", phase: "全程" },
    { role: "产品经理", count: 1, allocation: "全职", phase: "阶段一至阶段三" },
    { role: "UI设计师", count: 1, allocation: "全职", phase: "阶段一至阶段二" },
    { role: "前端开发工程师", count: 2, allocation: "全职", phase: "阶段二至阶段四" },
    { role: "后端开发工程师", count: 2, allocation: "全职", phase: "阶段三至阶段四" },
    { role: "测试工程师", count: 2, allocation: "全职", phase: "阶段二至阶段四" },
    { role: "系统架构师", count: 1, allocation: "兼职", phase: "关键节点参与" },
    { role: "运维工程师", count: 1, allocation: "兼职", phase: "阶段四至阶段五" },
    { role: "培训专员", count: 1, allocation: "兼职", phase: "阶段五" },
    { role: "业务专家", count: 2, allocation: "兼职", phase: "关键节点参与" },
  ]

  // 优先级任务数据
  const priorityTasks = [
    {
      name: "导航配置文件开发",
      priority: "高",
      reason: "是其他导航功能的基础，影响后续所有开发工作",
      dependencies: "导航优化方案设计",
      phase: "阶段二",
    },
    {
      name: "角色导航视图组件开发",
      priority: "高",
      reason: "核心用户体验改进点，影响系统整体可用性",
      dependencies: "导航配置文件开发",
      phase: "阶段二",
    },
    {
      name: "财务管理模块开发",
      priority: "高",
      reason: "业务部门高优先级需求，影响医院收入管理",
      dependencies: "无",
      phase: "阶段三",
    },
    {
      name: "导航权限控制实现",
      priority: "中",
      reason: "确保不同角色看到适合的导航项，影响系统安全性",
      dependencies: "角色导航视图组件开发",
      phase: "阶段二",
    },
    {
      name: "患者门户功能开发",
      priority: "中",
      reason: "提升患者体验，但可以在核心功能后实施",
      dependencies: "无",
      phase: "阶段三",
    },
    {
      name: "数据隐私保护功能开发",
      priority: "中",
      reason: "合规要求，但可以与其他功能并行开发",
      dependencies: "无",
      phase: "阶段三",
    },
    {
      name: "医院运营管理功能开发",
      priority: "低",
      reason: "辅助功能，可以在核心功能完成后实施",
      dependencies: "无",
      phase: "阶段三",
    },
    {
      name: "导航状态管理优化",
      priority: "低",
      reason: "性能优化项，可以在基本功能实现后进行",
      dependencies: "导航权限控制实现",
      phase: "阶段二",
    },
  ]

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>已完成</span>
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>进行中</span>
          </Badge>
        )
      case "not-started":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>未开始</span>
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>待定</span>
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // 获取优先级徽章
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "高":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{priority}</Badge>
      case "中":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{priority}</Badge>
      case "低":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{priority}</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  // 获取风险影响徽章
  const getRiskImpactBadge = (impact: string) => {
    switch (impact) {
      case "高":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{impact}</Badge>
      case "中":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{impact}</Badge>
      case "低":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{impact}</Badge>
      default:
        return <Badge variant="outline">{impact}</Badge>
    }
  }

  // 切换展开的阶段
  const togglePhase = (phaseId: string) => {
    if (expandedPhase === phaseId) {
      setExpandedPhase(null)
    } else {
      setExpandedPhase(phaseId)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">导航结构优化实施进度</h1>
          <p className="text-muted-foreground mt-1">项目计划从2025年11月至2026年3月，共分五个阶段实施</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            <span>导出计划</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">总体进度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32%</div>
            <Progress value={32} className="mt-2" />
            <p className="text-sm text-muted-foreground mt-2">预计完成时间: 2026年3月15日</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">阶段状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {phases.map((phase) => (
                <div key={phase.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-medical-500"></div>
                    <span className="text-sm">{phase.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={phase.progress} className="w-24" />
                    <span className="text-sm font-medium">{phase.progress}%</span>
                    {getStatusBadge(phase.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">关键里程碑</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">需求分析报告完成</span>
                </div>
                <div className="text-sm">2025-11-05</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">导航优化方案确认</span>
                </div>
                <div className="text-sm">2025-11-10</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">实施计划批准</span>
                </div>
                <div className="text-sm">2025-11-15</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">导航配置文件完成</span>
                </div>
                <div className="text-sm">2025-11-25</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">角色导航视图完成</span>
                </div>
                <div className="text-sm">2025-12-05</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">导航组件开发完成</span>
                </div>
                <div className="text-sm">2025-12-15</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="timeline">
            <Calendar className="h-4 w-4 mr-2" />
            实施时间线
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Users className="h-4 w-4 mr-2" />
            资源需求
          </TabsTrigger>
          <TabsTrigger value="priorities">
            <BarChart4 className="h-4 w-4 mr-2" />
            优先级任务
          </TabsTrigger>
          <TabsTrigger value="risks">
            <AlertTriangle className="h-4 w-4 mr-2" />
            风险管理
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>实施时间线</CardTitle>
              <CardDescription>导航结构优化项目的详细实施计划</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {phases.map((phase) => (
                  <Card key={phase.id} className="border-l-4 border-l-medical-500">
                    <CardHeader className="pb-2">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => togglePhase(phase.id)}
                      >
                        <div className="flex items-center gap-3">
                          <CardTitle>{phase.name}</CardTitle>
                          {getStatusBadge(phase.status)}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-muted-foreground">
                            {phase.startDate} 至 {phase.endDate}
                          </div>
                          <div>
                            {expandedPhase === phase.id ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </div>
                        </div>
                      </div>
                      <CardDescription>{phase.description}</CardDescription>
                    </CardHeader>
                    {expandedPhase === phase.id && (
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-2">任务列表</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>任务名称</TableHead>
                                  <TableHead>负责人</TableHead>
                                  <TableHead>截止日期</TableHead>
                                  <TableHead>状态</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {phase.tasks.map((task) => (
                                  <TableRow key={task.name}>
                                    <TableCell>{task.name}</TableCell>
                                    <TableCell>{task.owner}</TableCell>
                                    <TableCell>{task.dueDate}</TableCell>
                                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">里程碑</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>里程碑名称</TableHead>
                                  <TableHead>计划日期</TableHead>
                                  <TableHead>状态</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {phase.milestones.map((milestone) => (
                                  <TableRow key={milestone.name}>
                                    <TableCell>{milestone.name}</TableCell>
                                    <TableCell>{milestone.date}</TableCell>
                                    <TableCell>{getStatusBadge(milestone.status)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">风险管理</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>风险描述</TableHead>
                                  <TableHead>影响程度</TableHead>
                                  <TableHead>缓解措施</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {phase.risks.map((risk) => (
                                  <TableRow key={risk.name}>
                                    <TableCell>{risk.name}</TableCell>
                                    <TableCell>{getRiskImpactBadge(risk.impact)}</TableCell>
                                    <TableCell>{risk.mitigation}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>资源需求</CardTitle>
              <CardDescription>项目实施所需的人力资源配置</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>角色</TableHead>
                    <TableHead>人数</TableHead>
                    <TableHead>分配方式</TableHead>
                    <TableHead>参与阶段</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource) => (
                    <TableRow key={resource.role}>
                      <TableCell className="font-medium">{resource.role}</TableCell>
                      <TableCell>{resource.count}</TableCell>
                      <TableCell>{resource.allocation}</TableCell>
                      <TableCell>{resource.phase}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700">资源配置说明</h4>
                  <ul className="mt-2 space-y-1 text-sm text-blue-700">
                    <li>• 全职资源将100%时间投入到项目中</li>
                    <li>• 兼职资源根据项目需要参与，通常为30%-50%时间</li>
                    <li>• 关键节点参与的资源仅在特定里程碑或决策点参与</li>
                    <li>• 资源需求可能根据项目进展进行调整</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="priorities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>优先级任务</CardTitle>
              <CardDescription>按优先级排序的关键任务</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>任务名称</TableHead>
                    <TableHead>优先级</TableHead>
                    <TableHead>原因</TableHead>
                    <TableHead>依赖项</TableHead>
                    <TableHead>所属阶段</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {priorityTasks.map((task) => (
                    <TableRow key={task.name}>
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell>{task.reason}</TableCell>
                      <TableCell>{task.dependencies}</TableCell>
                      <TableCell>{task.phase}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6">
                <h4 className="font-medium mb-2">优先级说明</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      {getPriorityBadge("高")}
                      <span className="font-medium">高优先级</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      关键路径上的任务，直接影响项目进度和成功，必须优先完成
                    </p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      {getPriorityBadge("中")}
                      <span className="font-medium">中优先级</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      重要但不在关键路径上的任务，可以与高优先级任务并行进行
                    </p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      {getPriorityBadge("低")}
                      <span className="font-medium">低优先级</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      辅助性任务，在资源有限时可以推迟，不会直接影响项目关键目标
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>风险管理</CardTitle>
              <CardDescription>项目实施过程中的风险识别与应对策略</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {phases.map((phase) => (
                  <AccordionItem key={phase.id} value={phase.id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                        <span>{phase.name}</span>
                        <Badge variant="outline">{phase.risks.length}个风险</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>风险描述</TableHead>
                            <TableHead>影响程度</TableHead>
                            <TableHead>缓解措施</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {phase.risks.map((risk) => (
                            <TableRow key={risk.name}>
                              <TableCell>{risk.name}</TableCell>
                              <TableCell>{getRiskImpactBadge(risk.impact)}</TableCell>
                              <TableCell>{risk.mitigation}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-6">
                <h4 className="font-medium mb-3">风险管理流程</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">1. 风险识别</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>定期识别可能影响项目的风险因素</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">2. 风险评估</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>评估风险发生的可能性和潜在影响</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">3. 风险应对</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>制定风险缓解和应对策略</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">4. 风险监控</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>持续监控风险状态并调整应对措施</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
