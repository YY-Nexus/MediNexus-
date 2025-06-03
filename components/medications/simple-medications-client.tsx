"use client"

import { useState } from "react"
import { Pill, Search, Plus, Filter, Download, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// 模拟药物数据
const medications = [
  {
    id: "med-001",
    name: "阿司匹林",
    genericName: "乙酰水杨酸",
    category: "解热镇痛药",
    dosage: "100mg",
    form: "片剂",
    manufacturer: "拜耳",
    stock: 500,
    minStock: 100,
    price: 0.5,
    status: "正常",
    expiryDate: "2024-12-31",
  },
  {
    id: "med-002",
    name: "二甲双胍",
    genericName: "盐酸二甲双胍",
    category: "降糖药",
    dosage: "500mg",
    form: "片剂",
    manufacturer: "华润双鹤",
    stock: 80,
    minStock: 100,
    price: 1.2,
    status: "库存不足",
    expiryDate: "2024-10-15",
  },
  {
    id: "med-003",
    name: "阿托伐他汀",
    genericName: "阿托伐他汀钙",
    category: "调脂药",
    dosage: "20mg",
    form: "片剂",
    manufacturer: "辉瑞",
    stock: 200,
    minStock: 50,
    price: 2.8,
    status: "正常",
    expiryDate: "2025-03-20",
  },
]

export function SimpleMedicationsClient() {
  const [activeTab, setActiveTab] = useState("catalog")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("全部")

  // 过滤药物
  const filteredMedications = medications.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "全部" || med.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // 获取分类列表
  const categories = ["全部", ...Array.from(new Set(medications.map((med) => med.category)))]

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "正常":
        return "bg-green-100 text-green-800"
      case "库存不足":
        return "bg-yellow-100 text-yellow-800"
      case "缺货":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">药物管理</h1>
          <p className="text-muted-foreground">管理药物目录、库存和处方信息</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            导入药物
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            添加药物
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">药物总数</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medications.length}</div>
            <p className="text-xs text-muted-foreground">已录入药物种类</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">库存不足</CardTitle>
            <Pill className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medications.filter((med) => med.status === "库存不足").length}</div>
            <p className="text-xs text-muted-foreground">需要补充库存</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">即将过期</CardTitle>
            <Pill className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">30天内过期</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总价值</CardTitle>
            <Pill className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥12,580</div>
            <p className="text-xs text-muted-foreground">当前库存总价值</p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="catalog">药物目录</TabsTrigger>
          <TabsTrigger value="inventory">库存管理</TabsTrigger>
          <TabsTrigger value="prescriptions">处方管理</TabsTrigger>
          <TabsTrigger value="guidance">用药指导</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          {/* 搜索和过滤 */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索药物名称或通用名..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
          </div>

          {/* 药物列表 */}
          <Card>
            <CardHeader>
              <CardTitle>药物目录</CardTitle>
              <CardDescription>共找到 {filteredMedications.length} 种药物</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>药物名称</TableHead>
                    <TableHead>通用名</TableHead>
                    <TableHead>分类</TableHead>
                    <TableHead>规格</TableHead>
                    <TableHead>库存</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedications.map((medication) => (
                    <TableRow key={medication.id}>
                      <TableCell className="font-medium">{medication.name}</TableCell>
                      <TableCell>{medication.genericName}</TableCell>
                      <TableCell>{medication.category}</TableCell>
                      <TableCell>
                        {medication.dosage} {medication.form}
                      </TableCell>
                      <TableCell>
                        <span className={medication.stock < medication.minStock ? "text-red-600" : ""}>
                          {medication.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(medication.status)}>{medication.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            查看
                          </Button>
                          <Button variant="outline" size="sm">
                            编辑
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>库存管理</CardTitle>
              <CardDescription>管理药物库存和补货提醒</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">库存管理功能</h3>
                <p className="text-muted-foreground mb-4">这里将显示详细的库存管理功能，包括入库、出库、盘点等操作。</p>
                <Button>开始库存管理</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>处方管理</CardTitle>
              <CardDescription>管理电子处方和用药记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">处方管理功能</h3>
                <p className="text-muted-foreground mb-4">这里将显示处方开具、审核、发药等完整的处方管理流程。</p>
                <Button>开始处方管理</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>用药指导</CardTitle>
              <CardDescription>提供专业的用药指导和安全提醒</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">用药指导功能</h3>
                <p className="text-muted-foreground mb-4">
                  这里将显示详细的用药指导信息，包括用法用量、注意事项、不良反应等。
                </p>
                <Button>查看用药指导</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
