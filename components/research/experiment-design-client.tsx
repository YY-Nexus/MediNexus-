"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Plus, Download, Upload, FileText, ClipboardList } from "lucide-react"

// 模拟实验设计数据
const experimentData = [
  {
    id: "EXP-2024-001",
    title: "糖尿病患者血糖监测方案对比研究",
    type: "临床试验",
    status: "进行中",
    statusColor: "bg-green-500",
    startDate: "2024-03-15",
    endDate: "2024-09-15",
    participants: 120,
    lead: "张教授",
    department: "内分泌科",
  },
  {
    id: "EXP-2024-002",
    title: "新型抗生素在肺炎治疗中的应用研究",
    type: "药物试验",
    status: "计划中",
    statusColor: "bg-blue-500",
    startDate: "2024-06-01",
    endDate: "2025-01-31",
    participants: 200,
    lead: "李博士",
    department: "呼吸科",
  },
  {
    id: "EXP-2024-003",
    title: "心脏病患者康复训练方案效果评估",
    type: "临床试验",
    status: "已完成",
    statusColor: "bg-gray-500",
    startDate: "2023-10-10",
    endDate: "2024-04-10",
    participants: 85,
    lead: "王主任",
    department: "心脏科",
  },
  {
    id: "EXP-2024-004",
    title: "脑卒中早期干预新方法研究",
    type: "临床试验",
    status: "进行中",
    statusColor: "bg-green-500",
    startDate: "2024-02-20",
    endDate: "2024-11-20",
    participants: 150,
    lead: "赵教授",
    department: "神经科",
  },
  {
    id: "EXP-2024-005",
    title: "肿瘤标志物筛查新技术评估",
    type: "实验室研究",
    status: "暂停",
    statusColor: "bg-yellow-500",
    startDate: "2024-01-05",
    endDate: "2024-07-05",
    participants: 300,
    lead: "陈研究员",
    department: "肿瘤科",
  },
]

// 实验类型选项
const experimentTypes = ["全部", "临床试验", "药物试验", "实验室研究", "观察性研究"]

// 实验状态选项
const statusOptions = ["全部", "计划中", "进行中", "已完成", "暂停", "取消"]

export function ExperimentDesignClient() {
  // 状态管理
  const [experiments, setExperiments] = useState(experimentData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("全部")
  const [selectedStatus, setSelectedStatus] = useState("全部")
  const [activeTab, setActiveTab] = useState("all")

  // 处理搜索
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // 处理筛选
  const filteredExperiments = experiments.filter((experiment) => {
    const matchesSearch =
      experiment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experiment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experiment.lead.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "全部" || experiment.type === selectedType
    const matchesStatus = selectedStatus === "全部" || experiment.status === selectedStatus

    if (activeTab === "all") return matchesSearch && matchesType && matchesStatus
    if (activeTab === "active") return experiment.status === "进行中" && matchesSearch && matchesType
    if (activeTab === "planned") return experiment.status === "计划中" && matchesSearch && matchesType
    if (activeTab === "completed") return experiment.status === "已完成" && matchesSearch && matchesType

    return true
  })

  // 获取状态标签样式
  const getStatusBadge = (status) => {
    switch (status) {
      case "计划中":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            计划中
          </Badge>
        )
      case "进行中":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            进行中
          </Badge>
        )
      case "已完成":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            已完成
          </Badge>
        )
      case "暂停":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            暂停
          </Badge>
        )
      case "取消":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            取消
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">实验设计管理</CardTitle>
              <CardDescription>管理和跟踪研究实验设计</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                导入
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                导出
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                新建实验
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">全部实验</TabsTrigger>
                <TabsTrigger value="active">进行中</TabsTrigger>
                <TabsTrigger value="planned">计划中</TabsTrigger>
                <TabsTrigger value="completed">已完成</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="搜索实验ID、标题..."
                    className="pl-8 w-[250px]"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="实验类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {experimentTypes.map((type) => (
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
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>实验ID</TableHead>
                      <TableHead>实验标题</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>开始日期</TableHead>
                      <TableHead>结束日期</TableHead>
                      <TableHead>参与人数</TableHead>
                      <TableHead>负责人</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExperiments.map((experiment) => (
                      <TableRow key={experiment.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{experiment.id}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{experiment.title}</TableCell>
                        <TableCell>{experiment.type}</TableCell>
                        <TableCell>{getStatusBadge(experiment.status)}</TableCell>
                        <TableCell>{experiment.startDate}</TableCell>
                        <TableCell>{experiment.endDate}</TableCell>
                        <TableCell>{experiment.participants}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {experiment.lead}
                            <span className="text-muted-foreground text-xs">({experiment.department})</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ClipboardList className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* 其他标签页内容省略 */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default ExperimentDesignClient
