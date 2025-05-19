"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  Microscope,
  Thermometer,
  VolumeIcon as Vial,
  Dna,
  RefreshCw,
  Clipboard,
  AlertCircle,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// 模拟样本数据
const sampleData = [
  {
    id: "SP-20240501-001",
    type: "血液",
    patientId: "P-10045",
    collectionDate: "2024-05-01",
    status: "已处理",
    storageLocation: "冰箱A-12",
    temperature: "-20°C",
    expiryDate: "2024-08-01",
    projectId: "PRJ-2024-05",
    tags: ["糖尿病研究", "长期跟踪"],
  },
  {
    id: "SP-20240502-015",
    type: "组织",
    patientId: "P-10078",
    collectionDate: "2024-05-02",
    status: "待处理",
    storageLocation: "冰箱B-05",
    temperature: "-80°C",
    expiryDate: "2024-06-15",
    projectId: "PRJ-2024-08",
    tags: ["肿瘤研究"],
  },
  {
    id: "SP-20240503-023",
    type: "尿液",
    patientId: "P-10103",
    collectionDate: "2024-05-03",
    status: "已处理",
    storageLocation: "冰箱C-08",
    temperature: "4°C",
    expiryDate: "2024-05-10",
    projectId: "PRJ-2024-07",
    tags: ["肾功能研究", "急诊"],
  },
  {
    id: "SP-20240504-037",
    type: "血清",
    patientId: "P-10056",
    collectionDate: "2024-05-04",
    status: "已处理",
    storageLocation: "冰箱A-15",
    temperature: "-20°C",
    expiryDate: "2024-09-04",
    projectId: "PRJ-2024-05",
    tags: ["免疫学研究"],
  },
  {
    id: "SP-20240505-042",
    type: "脑脊液",
    patientId: "P-10112",
    collectionDate: "2024-05-05",
    status: "待处理",
    storageLocation: "冰箱D-03",
    temperature: "-80°C",
    expiryDate: "2024-06-05",
    projectId: "PRJ-2024-09",
    tags: ["神经科学", "稀有样本"],
  },
]

// 样本类型选项
const sampleTypes = ["全部", "血液", "组织", "尿液", "血清", "脑脊液", "其他"]

// 样本状态选项
const statusOptions = ["全部", "待处理", "已处理", "已分析", "已归档", "已销毁"]

export function SampleManagementClient() {
  // 状态管理
  const [samples, setSamples] = useState(sampleData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("全部")
  const [selectedStatus, setSelectedStatus] = useState("全部")
  const [selectedSample, setSelectedSample] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // 处理搜索
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // 处理筛选
  const filteredSamples = samples.filter((sample) => {
    const matchesSearch =
      sample.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.projectId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "全部" || sample.type === selectedType
    const matchesStatus = selectedStatus === "全部" || sample.status === selectedStatus

    if (activeTab === "all") return matchesSearch && matchesType && matchesStatus
    if (activeTab === "pending") return sample.status === "待处理" && matchesSearch && matchesType
    if (activeTab === "processed") return sample.status === "已处理" && matchesSearch && matchesType
    if (activeTab === "expiring") {
      const today = new Date()
      const expiryDate = new Date(sample.expiryDate.split("-").join("/"))
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))
      return daysUntilExpiry <= 30 && matchesSearch && matchesType
    }

    return true
  })

  // 查看样本详情
  const viewSampleDetails = (sample) => {
    setSelectedSample(sample)
    setIsDetailOpen(true)
  }

  // 获取状态标签样式
  const getStatusBadge = (status) => {
    switch (status) {
      case "待处理":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            待处理
          </Badge>
        )
      case "已处理":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            已处理
          </Badge>
        )
      case "已分析":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            已分析
          </Badge>
        )
      case "已归档":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            已归档
          </Badge>
        )
      case "已销毁":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            已销毁
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // 获取样本类型图标
  const getSampleTypeIcon = (type) => {
    switch (type) {
      case "血液":
        return <Vial className="h-4 w-4 text-red-500" />
      case "组织":
        return <Microscope className="h-4 w-4 text-purple-500" />
      case "尿液":
        return <Vial className="h-4 w-4 text-yellow-500" />
      case "血清":
        return <Vial className="h-4 w-4 text-pink-500" />
      case "脑脊液":
        return <Vial className="h-4 w-4 text-blue-500" />
      default:
        return <Dna className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">生物样本管理系统</CardTitle>
              <CardDescription>管理、跟踪和分析实验室样本</CardDescription>
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
                添加样本
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">全部样本</TabsTrigger>
                <TabsTrigger value="pending">待处理</TabsTrigger>
                <TabsTrigger value="processed">已处理</TabsTrigger>
                <TabsTrigger value="expiring">即将过期</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="搜索样本ID、患者ID..."
                    className="pl-8 w-[250px]"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="样本类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleTypes.map((type) => (
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
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>样本ID</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>患者ID</TableHead>
                      <TableHead>采集日期</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>存储位置</TableHead>
                      <TableHead>项目</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSamples.length > 0 ? (
                      filteredSamples.map((sample) => (
                        <TableRow
                          key={sample.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => viewSampleDetails(sample)}
                        >
                          <TableCell className="font-medium">{sample.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSampleTypeIcon(sample.type)}
                              {sample.type}
                            </div>
                          </TableCell>
                          <TableCell>{sample.patientId}</TableCell>
                          <TableCell>{sample.collectionDate}</TableCell>
                          <TableCell>{getStatusBadge(sample.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-4 w-4 text-blue-500" />
                              {sample.storageLocation} ({sample.temperature})
                            </div>
                          </TableCell>
                          <TableCell>{sample.projectId}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Clipboard className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Microscope className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <AlertCircle className="h-8 w-8 mb-2" />
                            <p>未找到符合条件的样本</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* 其他标签页内容省略 */}
          </Tabs>
        </CardContent>
      </Card>

      {/* 样本详情对话框 */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>样本详情</DialogTitle>
            <DialogDescription>查看样本的详细信息和处理历史</DialogDescription>
          </DialogHeader>
          {selectedSample && <div className="grid gap-4 py-4">{/* 详情内容省略 */}</div>}
          <DialogFooter className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Clipboard className="h-4 w-4 mr-2" />
                复制ID
              </Button>
              <Button variant="outline" size="sm">
                <Microscope className="h-4 w-4 mr-2" />
                检测记录
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">编辑</Button>
              <Button>确定</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SampleManagementClient
