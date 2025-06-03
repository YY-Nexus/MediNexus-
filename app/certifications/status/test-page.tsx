"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Search, Filter, Download, Clock, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"

// 测试数据
const testCertifications = [
  {
    id: "cert-001",
    type: "doctor-license",
    licenseNumber: "1102023001001",
    name: "张三",
    institution: "北京协和医院",
    issueDate: "2023-01-15",
    expiryDate: "2028-01-14",
    status: "verified",
    verificationDate: "2023-01-20",
    verificationProvider: "医疗资质验证中心",
  },
  {
    id: "cert-002",
    type: "specialist-certificate",
    licenseNumber: "2202023002002",
    name: "李四",
    specialty: "心血管内科",
    institution: "卫生部",
    issueDate: "2022-09-15",
    expiryDate: "2027-09-14",
    status: "pending",
    verificationDate: null,
    verificationProvider: null,
  },
  {
    id: "cert-003",
    type: "doctor-license",
    licenseNumber: "1102023003003",
    name: "王五",
    institution: "上海交通大学医学院附属瑞金医院",
    issueDate: "2021-05-20",
    expiryDate: "2026-05-19",
    status: "rejected",
    verificationDate: "2021-05-25",
    verificationProvider: "医疗资质验证中心",
    rejectionReason: "证书信息与注册信息不符",
  },
]

export default function CertificationStatusTestPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filters, setFilters] = useState({
    type: "",
    institution: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
  })

  // 获取状态标签
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500">已验证</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">验证中</Badge>
      case "rejected":
        return <Badge className="bg-red-500">已拒绝</Badge>
      case "expired":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-500">
            已过期
          </Badge>
        )
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  // 根据状态过滤资质
  const filterByStatus = (certifications: any[]) => {
    if (activeTab === "all") return certifications
    return certifications.filter((cert) => cert.status === activeTab)
  }

  // 根据搜索词和筛选条件过滤资质
  const filteredCertifications = filterByStatus(
    testCertifications.filter((cert) => {
      // 搜索过滤
      const matchesSearch =
        searchQuery === "" ||
        cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.institution.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesSearch
    }),
  )

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* 页面标题 */}
      <div className="flex items-center space-x-4">
        <CheckCircle className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">验证状态</h1>
          <p className="text-muted-foreground">查看医疗专业人员资质验证状态</p>
        </div>
      </div>

      {/* 搜索和筛选区域 */}
      <Card>
        <CardHeader>
          <CardTitle>搜索资质</CardTitle>
          <CardDescription>按证书名称、编号或持有人姓名搜索</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex w-full md:w-1/2 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="搜索资质..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">搜索</Button>
            </div>

            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    筛选
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">筛选条件</h4>

                    <div className="space-y-2">
                      <Label htmlFor="filter-type">资质类型</Label>
                      <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                        <SelectTrigger id="filter-type">
                          <SelectValue placeholder="选择资质类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全部类型</SelectItem>
                          <SelectItem value="doctor-license">执业医师资格证</SelectItem>
                          <SelectItem value="specialist-certificate">专科医师资格证</SelectItem>
                          <SelectItem value="practice-permit">医疗机构执业许可证</SelectItem>
                          <SelectItem value="continuing-education">继续教育证书</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="filter-institution">发证机构</Label>
                      <Input
                        id="filter-institution"
                        placeholder="输入发证机构"
                        value={filters.institution}
                        onChange={(e) => setFilters({ ...filters, institution: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>发证日期范围</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="filter-start-date" className="text-xs">
                            开始日期
                          </Label>
                          <DatePicker
                            id="filter-start-date"
                            date={filters.startDate}
                            setDate={(date) => setFilters({ ...filters, startDate: date })}
                            placeholder="开始日期"
                          />
                        </div>
                        <div>
                          <Label htmlFor="filter-end-date" className="text-xs">
                            结束日期
                          </Label>
                          <DatePicker
                            id="filter-end-date"
                            date={filters.endDate}
                            setDate={(date) => setFilters({ ...filters, endDate: date })}
                            placeholder="结束日期"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilters({ type: "", institution: "", startDate: null, endDate: null })}
                      >
                        重置
                      </Button>
                      <Button size="sm">应用筛选</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                导出
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 标签页和数据表格 */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="verified">已验证</TabsTrigger>
          <TabsTrigger value="pending">验证中</TabsTrigger>
          <TabsTrigger value="rejected">已拒绝</TabsTrigger>
          <TabsTrigger value="expired">已过期</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "all" && "所有资质"}
                {activeTab === "verified" && "已验证资质"}
                {activeTab === "pending" && "验证中资质"}
                {activeTab === "rejected" && "已拒绝资质"}
                {activeTab === "expired" && "已过期资质"}
              </CardTitle>
              <CardDescription>找到 {filteredCertifications.length} 条资质记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>资质类型</TableHead>
                      <TableHead>证书编号</TableHead>
                      <TableHead>姓名</TableHead>
                      <TableHead>发证机构</TableHead>
                      <TableHead>发证日期</TableHead>
                      <TableHead>有效期至</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCertifications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          未找到匹配的资质记录
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCertifications.map((cert) => (
                        <TableRow key={cert.id}>
                          <TableCell>
                            {cert.type === "doctor-license" && "执业医师资格证"}
                            {cert.type === "specialist-certificate" && "专科医师资格证"}
                            {cert.type === "practice-permit" && "医疗机构执业许可证"}
                            {cert.type === "continuing-education" && "继续教育证书"}
                          </TableCell>
                          <TableCell className="font-mono">{cert.licenseNumber}</TableCell>
                          <TableCell className="font-medium">{cert.name}</TableCell>
                          <TableCell>{cert.institution}</TableCell>
                          <TableCell>{cert.issueDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {cert.expiryDate}
                              {new Date(cert.expiryDate) < new Date() && (
                                <AlertTriangle className="h-4 w-4 text-red-500 ml-1" />
                              )}
                              {new Date(cert.expiryDate) > new Date() &&
                                new Date(cert.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) && (
                                  <Clock className="h-4 w-4 text-yellow-500 ml-1" />
                                )}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(cert.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              查看详情
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 测试状态显示 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>组件测试状态</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500">✓</Badge>
              <span>DatePicker 组件</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500">✓</Badge>
              <span>Table 组件</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500">✓</Badge>
              <span>Select 组件</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500">✓</Badge>
              <span>Popover 组件</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
