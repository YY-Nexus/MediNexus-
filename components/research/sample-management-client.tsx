"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  RefreshCw,
  Thermometer,
  Dna,
  Microscope,
  VolumeIcon as Vial,
  Droplet,
  FlaskRoundIcon as Flask,
} from "lucide-react"

export function SampleManagementClient() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sampleType, setSampleType] = useState("all")

  // 模拟样本数据
  const samples = [
    {
      id: "S-2023-0001",
      name: "血液样本A",
      type: "blood",
      status: "active",
      collection_date: "2023-05-15",
      storage: "冰箱A-12",
      project: "心血管疾病研究",
      quantity: "5ml",
      temperature: "-20°C",
    },
    {
      id: "S-2023-0002",
      name: "组织样本B",
      type: "tissue",
      status: "processing",
      collection_date: "2023-05-18",
      storage: "冷冻柜B-05",
      project: "肿瘤标志物研究",
      quantity: "2g",
      temperature: "-80°C",
    },
    {
      id: "S-2023-0003",
      name: "DNA样本C",
      type: "dna",
      status: "archived",
      collection_date: "2023-04-22",
      storage: "DNA库-C08",
      project: "基因组学研究",
      quantity: "50μg",
      temperature: "-20°C",
    },
    {
      id: "S-2023-0004",
      name: "尿液样本D",
      type: "urine",
      status: "active",
      collection_date: "2023-05-20",
      storage: "冰箱B-03",
      project: "肾功能研究",
      quantity: "30ml",
      temperature: "4°C",
    },
    {
      id: "S-2023-0005",
      name: "细胞样本E",
      type: "cell",
      status: "active",
      collection_date: "2023-05-10",
      storage: "细胞库-A15",
      project: "干细胞研究",
      quantity: "1×10^6 cells",
      temperature: "-196°C",
    },
  ]

  // 过滤样本
  const filteredSamples = samples.filter((sample) => {
    const matchesSearch =
      sample.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.project.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = sampleType === "all" || sample.type === sampleType

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && sample.status === "active") ||
      (activeTab === "processing" && sample.status === "processing") ||
      (activeTab === "archived" && sample.status === "archived")

    return matchesSearch && matchesType && matchesTab
  })

  // 获取样本类型图标
  const getSampleTypeIcon = (type: string) => {
    switch (type) {
      case "blood":
        return <Droplet className="h-4 w-4 text-red-500" />
      case "tissue":
        return <Microscope className="h-4 w-4 text-purple-500" />
      case "dna":
        return <Dna className="h-4 w-4 text-blue-500" />
      case "urine":
        return <Flask className="h-4 w-4 text-yellow-500" />
      case "cell":
        return <Vial className="h-4 w-4 text-green-500" />
      default:
        return <Vial className="h-4 w-4" />
    }
  }

  // 获取样本状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">活跃</Badge>
      case "processing":
        return <Badge className="bg-blue-500">处理中</Badge>
      case "archived":
        return <Badge className="bg-gray-500">已归档</Badge>
      default:
        return <Badge>未知</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="搜索样本ID、名称或项目..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={sampleType} onValueChange={setSampleType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="样本类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有类型</SelectItem>
              <SelectItem value="blood">血液</SelectItem>
              <SelectItem value="tissue">组织</SelectItem>
              <SelectItem value="dna">DNA</SelectItem>
              <SelectItem value="urine">尿液</SelectItem>
              <SelectItem value="cell">细胞</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Filter className="mr-2 h-4 w-4" />
            高级筛选
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Download className="mr-2 h-4 w-4" />
            导出
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Upload className="mr-2 h-4 w-4" />
            导入
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            新增样本
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">全部样本</TabsTrigger>
          <TabsTrigger value="active">活跃样本</TabsTrigger>
          <TabsTrigger value="processing">处理中</TabsTrigger>
          <TabsTrigger value="archived">已归档</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>样本列表</CardTitle>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  刷新
                </Button>
              </div>
              <CardDescription>共 {filteredSamples.length} 个样本</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>样本ID</TableHead>
                      <TableHead>名称</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>采集日期</TableHead>
                      <TableHead>存储位置</TableHead>
                      <TableHead>项目</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSamples.length > 0 ? (
                      filteredSamples.map((sample) => (
                        <TableRow key={sample.id}>
                          <TableCell className="font-medium">{sample.id}</TableCell>
                          <TableCell>{sample.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSampleTypeIcon(sample.type)}
                              <span>
                                {sample.type === "blood" && "血液"}
                                {sample.type === "tissue" && "组织"}
                                {sample.type === "dna" && "DNA"}
                                {sample.type === "urine" && "尿液"}
                                {sample.type === "cell" && "细胞"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{sample.collection_date}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-4 w-4 text-blue-500" />
                              <span>
                                {sample.storage} ({sample.temperature})
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{sample.project}</TableCell>
                          <TableCell>{getStatusBadge(sample.status)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          没有找到匹配的样本
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>活跃样本</CardTitle>
              <CardDescription>当前可用于研究的样本</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>样本ID</TableHead>
                      <TableHead>名称</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>采集日期</TableHead>
                      <TableHead>存储位置</TableHead>
                      <TableHead>项目</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSamples.length > 0 ? (
                      filteredSamples.map((sample) => (
                        <TableRow key={sample.id}>
                          <TableCell className="font-medium">{sample.id}</TableCell>
                          <TableCell>{sample.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSampleTypeIcon(sample.type)}
                              <span>
                                {sample.type === "blood" && "血液"}
                                {sample.type === "tissue" && "组织"}
                                {sample.type === "dna" && "DNA"}
                                {sample.type === "urine" && "尿液"}
                                {sample.type === "cell" && "细胞"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{sample.collection_date}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-4 w-4 text-blue-500" />
                              <span>
                                {sample.storage} ({sample.temperature})
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{sample.project}</TableCell>
                          <TableCell>{getStatusBadge(sample.status)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          没有找到匹配的样本
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>处理中样本</CardTitle>
              <CardDescription>正在处理或分析的样本</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>样本ID</TableHead>
                      <TableHead>名称</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>采集日期</TableHead>
                      <TableHead>存储位置</TableHead>
                      <TableHead>项目</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSamples.length > 0 ? (
                      filteredSamples.map((sample) => (
                        <TableRow key={sample.id}>
                          <TableCell className="font-medium">{sample.id}</TableCell>
                          <TableCell>{sample.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSampleTypeIcon(sample.type)}
                              <span>
                                {sample.type === "blood" && "血液"}
                                {sample.type === "tissue" && "组织"}
                                {sample.type === "dna" && "DNA"}
                                {sample.type === "urine" && "尿液"}
                                {sample.type === "cell" && "细胞"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{sample.collection_date}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-4 w-4 text-blue-500" />
                              <span>
                                {sample.storage} ({sample.temperature})
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{sample.project}</TableCell>
                          <TableCell>{getStatusBadge(sample.status)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          没有找到匹配的样本
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>已归档样本</CardTitle>
              <CardDescription>已完成研究或长期存储的样本</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>样本ID</TableHead>
                      <TableHead>名称</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>采集日期</TableHead>
                      <TableHead>存储位置</TableHead>
                      <TableHead>项目</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSamples.length > 0 ? (
                      filteredSamples.map((sample) => (
                        <TableRow key={sample.id}>
                          <TableCell className="font-medium">{sample.id}</TableCell>
                          <TableCell>{sample.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSampleTypeIcon(sample.type)}
                              <span>
                                {sample.type === "blood" && "血液"}
                                {sample.type === "tissue" && "组织"}
                                {sample.type === "dna" && "DNA"}
                                {sample.type === "urine" && "尿液"}
                                {sample.type === "cell" && "细胞"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{sample.collection_date}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-4 w-4 text-blue-500" />
                              <span>
                                {sample.storage} ({sample.temperature})
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{sample.project}</TableCell>
                          <TableCell>{getStatusBadge(sample.status)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          没有找到匹配的样本
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SampleManagementClient
