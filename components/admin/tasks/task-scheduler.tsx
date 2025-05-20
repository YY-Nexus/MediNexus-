"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Clock,
  Database,
  FileText,
  Filter,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Edit,
  Play,
  Pause,
} from "lucide-react"

export function TaskScheduler() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)

  // 模拟计划任务数据
  const scheduledTasks = [
    {
      id: "TASK-001",
      name: "数据库备份",
      type: "system",
      schedule: "每日 03:00",
      cronExpression: "0 0 3 * * ?",
      lastRun: "2023-05-20 03:00:00",
      nextRun: "2023-05-21 03:00:00",
      status: "active",
      description: "自动备份所有数据库到云存储",
    },
    {
      id: "TASK-002",
      name: "系统日志清理",
      type: "system",
      schedule: "每周日 01:00",
      cronExpression: "0 0 1 ? * SUN",
      lastRun: "2023-05-14 01:00:00",
      nextRun: "2023-05-21 01:00:00",
      status: "active",
      description: "清理超过30天的系统日志",
    },
    {
      id: "TASK-003",
      name: "用户数据同步",
      type: "data",
      schedule: "每4小时",
      cronExpression: "0 0 */4 * * ?",
      lastRun: "2023-05-20 08:00:00",
      nextRun: "2023-05-20 12:00:00",
      status: "active",
      description: "同步用户数据到备份服务器",
    },
    {
      id: "TASK-004",
      name: "性能报告生成",
      type: "report",
      schedule: "每日 23:00",
      cronExpression: "0 0 23 * * ?",
      lastRun: "2023-05-19 23:00:00",
      nextRun: "2023-05-20 23:00:00",
      status: "inactive",
      description: "生成系统性能日报表",
    },
    {
      id: "TASK-005",
      name: "安全漏洞扫描",
      type: "security",
      schedule: "每周一 10:00",
      cronExpression: "0 0 10 ? * MON",
      lastRun: "2023-05-15 10:00:00",
      nextRun: "2023-05-22 10:00:00",
      status: "active",
      description: "扫描系统安全漏洞并生成报告",
    },
    {
      id: "TASK-006",
      name: "临时文件清理",
      type: "system",
      schedule: "每日 02:00",
      cronExpression: "0 0 2 * * ?",
      lastRun: "2023-05-20 02:00:00",
      nextRun: "2023-05-21 02:00:00",
      status: "error",
      description: "清理系统临时文件",
    },
    {
      id: "TASK-007",
      name: "月度统计报告",
      type: "report",
      schedule: "每月1日 00:05",
      cronExpression: "0 5 0 1 * ?",
      lastRun: "2023-05-01 00:05:00",
      nextRun: "2023-06-01 00:05:00",
      status: "active",
      description: "生成上月系统使用统计报告",
    },
  ]

  // 过滤任务
  const filteredTasks = scheduledTasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && task.status === "active") ||
      (activeTab === "inactive" && task.status === "inactive") ||
      (activeTab === "error" && task.status === "error")

    return matchesSearch && matchesTab
  })

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> 活跃
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-gray-500 flex items-center gap-1">
            <Pause className="h-3 w-3" /> 已停用
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-500 flex items-center gap-1">
            <XCircle className="h-3 w-3" /> 错误
          </Badge>
        )
      default:
        return <Badge>未知</Badge>
    }
  }

  // 获取任务类型图标
  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "system":
        return <Settings className="h-4 w-4 text-blue-500" />
      case "data":
        return <Database className="h-4 w-4 text-green-500" />
      case "report":
        return <FileText className="h-4 w-4 text-purple-500" />
      case "security":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  // 编辑任务
  const handleEditTask = (task: any) => {
    setSelectedTask(task)
    setShowEditDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="搜索任务ID、名称或描述..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button variant="outline" size="icon" className="hidden md:flex">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            新建任务
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">全部任务</TabsTrigger>
          <TabsTrigger value="active">活跃任务</TabsTrigger>
          <TabsTrigger value="inactive">已停用</TabsTrigger>
          <TabsTrigger value="error">错误任务</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>计划任务列表</CardTitle>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  刷新
                </Button>
              </div>
              <CardDescription>共 {filteredTasks.length} 个计划任务</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>任务ID</TableHead>
                      <TableHead>任务名称</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>执行计划</TableHead>
                      <TableHead>上次执行</TableHead>
                      <TableHead>下次执行</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTaskTypeIcon(task.type)}
                              <span>{task.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {task.type === "system" && "系统"}
                            {task.type === "data" && "数据"}
                            {task.type === "report" && "报告"}
                            {task.type === "security" && "安全"}
                          </TableCell>
                          <TableCell>{task.schedule}</TableCell>
                          <TableCell>{task.lastRun}</TableCell>
                          <TableCell>{task.nextRun}</TableCell>
                          <TableCell>{getStatusBadge(task.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditTask(task)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          没有找到匹配的计划任务
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 其他标签页内容与 all 标签页类似 */}
      </Tabs>

      {/* 添加任务对话框 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>创建新计划任务</DialogTitle>
            <DialogDescription>设置新的计划任务详细信息</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-name" className="text-right">
                任务名称
              </Label>
              <Input id="task-name" placeholder="输入任务名称" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-type" className="text-right">
                任务类型
              </Label>
              <Select>
                <SelectTrigger id="task-type" className="col-span-3">
                  <SelectValue placeholder="选择任务类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">系统任务</SelectItem>
                  <SelectItem value="data">数据任务</SelectItem>
                  <SelectItem value="report">报告任务</SelectItem>
                  <SelectItem value="security">安全任务</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-schedule" className="text-right">
                执行计划
              </Label>
              <div className="col-span-3 flex gap-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="频率" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">每日</SelectItem>
                    <SelectItem value="weekly">每周</SelectItem>
                    <SelectItem value="monthly">每月</SelectItem>
                    <SelectItem value="custom">自定义</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="time" placeholder="时间" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cron-expression" className="text-right">
                Cron 表达式
              </Label>
              <Input id="cron-expression" placeholder="0 0 12 * * ?" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-description" className="text-right">
                任务描述
              </Label>
              <Textarea id="task-description" placeholder="描述任务的目的和功能" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-status" className="text-right">
                任务状态
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="task-status" defaultChecked />
                <Label htmlFor="task-status" className="font-normal">
                  启用任务
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              取消
            </Button>
            <Button onClick={() => setShowAddDialog(false)}>创建任务</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑任务对话框 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>编辑计划任务</DialogTitle>
            <DialogDescription>修改计划任务详细信息</DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-task-name" className="text-right">
                  任务名称
                </Label>
                <Input id="edit-task-name" defaultValue={selectedTask.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-task-type" className="text-right">
                  任务类型
                </Label>
                <Select defaultValue={selectedTask.type}>
                  <SelectTrigger id="edit-task-type" className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">系统任务</SelectItem>
                    <SelectItem value="data">数据任务</SelectItem>
                    <SelectItem value="report">报告任务</SelectItem>
                    <SelectItem value="security">安全任务</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-cron-expression" className="text-right">
                  Cron 表达式
                </Label>
                <Input id="edit-cron-expression" defaultValue={selectedTask.cronExpression} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-task-description" className="text-right">
                  任务描述
                </Label>
                <Textarea id="edit-task-description" defaultValue={selectedTask.description} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-task-status" className="text-right">
                  任务状态
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch id="edit-task-status" defaultChecked={selectedTask.status === "active"} />
                  <Label htmlFor="edit-task-status" className="font-normal">
                    启用任务
                  </Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              取消
            </Button>
            <Button onClick={() => setShowEditDialog(false)}>保存更改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TaskScheduler
