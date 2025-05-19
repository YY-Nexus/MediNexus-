"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/ui/date-picker"
import { Search, Download, RefreshCw, Eye, AlertCircle, CheckCircle, Clock, XCircle, RotateCcw } from "lucide-react"

export function TaskHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  // 模拟任务历史数据
  const taskHistory = [
    {
      id: "TASK-2023-001",
      name: "数据库备份",
      type: "backup",
      status: "success",
      startTime: "2023-05-20 03:00:00",
      endTime: "2023-05-20 03:15:22",
      duration: "15分22秒",
      executor: "系统",
    },
    {
      id: "TASK-2023-002",
      name: "用户数据同步",
      type: "sync",
      status: "failed",
      startTime: "2023-05-20 04:30:00",
      endTime: "2023-05-20 04:32:15",
      duration: "2分15秒",
      executor: "系统",
    },
    {
      id: "TASK-2023-003",
      name: "系统日志清理",
      type: "cleanup",
      status: "success",
      startTime: "2023-05-19 01:00:00",
      endTime: "2023-05-19 01:05:33",
      duration: "5分33秒",
      executor: "系统",
    },
    {
      id: "TASK-2023-004",
      name: "性能报告生成",
      type: "report",
      status: "success",
      startTime: "2023-05-18 23:00:00",
      endTime: "2023-05-18 23:12:45",
      duration: "12分45秒",
      executor: "admin",
    },
    {
      id: "TASK-2023-005",
      name: "安全漏洞扫描",
      type: "security",
      status: "running",
      startTime: "2023-05-20 10:00:00",
      endTime: "-",
      duration: "-",
      executor: "admin",
    },
    {
      id: "TASK-2023-006",
      name: "临时数据清理",
      type: "cleanup",
      status: "pending",
      startTime: "-",
      endTime: "-",
      duration: "-",
      executor: "系统",
    },
    {
      id: "TASK-2023-007",
      name: "用户活动分析",
      type: "analysis",
      status: "canceled",
      startTime: "2023-05-17 14:00:00",
      endTime: "2023-05-17 14:01:12",
      duration: "1分12秒",
      executor: "admin",
    },
  ]

  // 过滤任务历史
  const filteredTasks = taskHistory.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || task.status === statusFilter

    // 日期过滤逻辑
    let matchesDate = true
    if (dateRange.from && dateRange.to) {
      const taskDate = new Date(task.startTime)
      matchesDate = taskDate >= dateRange.from && taskDate <= dateRange.to
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> 成功
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-500 flex items-center gap-1">
            <XCircle className="h-3 w-3" /> 失败
          </Badge>
        )
      case "running":
        return (
          <Badge className="bg-blue-500 flex items-center gap-1">
            <RefreshCw className="h-3 w-3 animate-spin" /> 运行中
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500 flex items-center gap-1">
            <Clock className="h-3 w-3" /> 等待中
          </Badge>
        )
      case "canceled":
        return (
          <Badge className="bg-gray-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> 已取消
          </Badge>
        )
      default:
        return <Badge>未知</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>任务执行历史</CardTitle>
            <CardDescription>查看所有计划任务的执行历史记录</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出记录
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="搜索任务ID或名称..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有状态</SelectItem>
                <SelectItem value="success">成功</SelectItem>
                <SelectItem value="failed">失败</SelectItem>
                <SelectItem value="running">运行中</SelectItem>
                <SelectItem value="pending">等待中</SelectItem>
                <SelectItem value="canceled">已取消</SelectItem>
              </SelectContent>
            </Select>

            <DateRangePicker
              from={dateRange.from}
              to={dateRange.to}
              onSelect={setDateRange}
              className="w-full md:w-auto"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>任务ID</TableHead>
                  <TableHead>任务名称</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>开始时间</TableHead>
                  <TableHead>结束时间</TableHead>
                  <TableHead>执行时长</TableHead>
                  <TableHead>执行者</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.id}</TableCell>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>{task.startTime}</TableCell>
                      <TableCell>{task.endTime}</TableCell>
                      <TableCell>{task.duration}</TableCell>
                      <TableCell>{task.executor}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {task.status === "failed" && (
                            <Button variant="ghost" size="icon">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      没有找到匹配的任务记录
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskHistory
