"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { DateRangePicker } from "@/components/ui/date-range-picker"

// 模拟任务历史数据
const taskHistoryData = [
  {
    id: "TASK-2024-001",
    name: "系统数据备份",
    type: "系统维护",
    status: "成功",
    startTime: "2024-05-01 02:00:00",
    endTime: "2024-05-01 02:15:23",
    duration: "15分23秒",
    executor: "系统",
    details: "完成全部数据库备份，大小: 2.3GB",
  },
  {
    id: "TASK-2024-002",
    name: "患者数据导入",
    type: "数据处理",
    status: "成功",
    startTime: "2024-05-01 09:15:00",
    endTime: "2024-05-01 09:16:45",
    duration: "1分45秒",
    executor: "张医生",
    details: "导入120条新患者记录",
  },
  {
    id: "TASK-2024-003",
    name: "AI模型训练",
    type: "AI处理",
    status: "失败",
    startTime: "2024-05-01 14:30:00",
    endTime: "2024-05-01 14:35:12",
    duration: "5分12秒",
    executor: "AI系统",
    details: "训练失败: 内存不足",
  },
  {
    id: "TASK-2024-004",
    name: "月度报告生成",
    type: "报告",
    status: "成功",
    startTime: "2024-05-02 00:01:00",
    endTime: "2024-05-02 00:03:45",
    duration: "2分45秒",
    executor: "系统",
    details: "生成4月份月度报告",
  },
  {
    id: "TASK-2024-005",
    name: "系统更新",
    type: "系统维护",
    status: "警告",
    startTime: "2024-05-02 03:00:00",
    endTime: "2024-05-02 03:25:18",
    duration: "25分18秒",
    executor: "系统",
    details: "更新完成，但有2个模块需要手动配置",
  },
]

// 任务类型选项
const taskTypes = ["全部", "系统维护", "数据处理", "AI处理", "报告", "其他"]

// 任务状态选项
const statusOptions = ["全部", "成功", "失败", "警告", "进行中"]

export function TaskHistory() {
  // 状态管理
  const [tasks, setTasks] = useState(taskHistoryData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("全部")
  const [selectedStatus, setSelectedStatus] = useState("全部")
  const [dateRange, setDateRange] = useState(null)

  // 处理搜索
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // 处理筛选
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.executor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "全部" || task.type === selectedType
    const matchesStatus = selectedStatus === "全部" || task.status === selectedStatus

    // 日期范围筛选
    let matchesDateRange = true
    if (dateRange && dateRange.from && dateRange.to) {
      const taskDate = new Date(task.startTime)
      const fromDate = new Date(dateRange.from)
      const toDate = new Date(dateRange.to)
      toDate.setHours(23, 59, 59, 999) // 设置为当天结束时间
      matchesDateRange = taskDate >= fromDate && taskDate <= toDate
    }

    return matchesSearch && matchesType && matchesStatus && matchesDateRange
  })

  // 获取状态标签样式
  const getStatusBadge = (status) => {
    switch (status) {
      case "成功":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            成功
          </Badge>
        )
      case "失败":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            失败
          </Badge>
        )
      case "警告":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            警告
          </Badge>
        )
      case "进行中":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3 mr-1 animate-spin" />
            进行中
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>任务历史记录</CardTitle>
            <CardDescription>查看系统执行的任务历史</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出记录
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索任务ID、名称..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="任务类型" />
            </SelectTrigger>
            <SelectContent>
              {taskTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="状态" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DateRangePicker value={dateRange} onChange={setDateRange} placeholder="选择日期范围" className="w-[250px]" />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>任务ID</TableHead>
                <TableHead>任务名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>开始时间</TableHead>
                <TableHead>持续时间</TableHead>
                <TableHead>执行者</TableHead>
                <TableHead>详情</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.type}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {task.startTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {task.executor}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{task.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskHistory
