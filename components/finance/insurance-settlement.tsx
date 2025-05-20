"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Search, FileText, Download, Filter, Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react"

export function InsuranceSettlement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [insuranceType, setInsuranceType] = useState("all")

  // 模拟医保结算数据
  const settlements = [
    {
      id: "INS-2023-0001",
      patientName: "张三",
      patientId: "P20230001",
      insuranceType: "城镇职工医保",
      totalAmount: 1280.5,
      insuranceCoverage: 1024.4,
      selfPayment: 256.1,
      status: "completed",
      date: "2023-11-15",
    },
    {
      id: "INS-2023-0002",
      patientName: "李四",
      patientId: "P20230015",
      insuranceType: "城乡居民医保",
      totalAmount: 3560.75,
      insuranceCoverage: 2848.6,
      selfPayment: 712.15,
      status: "pending",
      date: "2023-11-16",
    },
    {
      id: "INS-2023-0003",
      patientName: "王五",
      patientId: "P20230022",
      insuranceType: "城镇职工医保",
      totalAmount: 5680.0,
      insuranceCoverage: 4544.0,
      selfPayment: 1136.0,
      status: "completed",
      date: "2023-11-14",
    },
    {
      id: "INS-2023-0004",
      patientName: "赵六",
      patientId: "P20230035",
      insuranceType: "商业医疗保险",
      totalAmount: 8920.25,
      insuranceCoverage: 8028.23,
      selfPayment: 892.02,
      status: "rejected",
      date: "2023-11-13",
    },
    {
      id: "INS-2023-0005",
      patientName: "钱七",
      patientId: "P20230042",
      insuranceType: "城乡居民医保",
      totalAmount: 1560.0,
      insuranceCoverage: 1248.0,
      selfPayment: 312.0,
      status: "pending",
      date: "2023-11-16",
    },
  ]

  // 过滤结算记录
  const filteredSettlements = settlements.filter((settlement) => {
    // 搜索过滤
    const matchesSearch =
      settlement.patientName.includes(searchQuery) ||
      settlement.id.includes(searchQuery) ||
      settlement.patientId.includes(searchQuery)

    // 状态过滤
    const matchesStatus = statusFilter === "all" || settlement.status === statusFilter

    // 保险类型过滤
    const matchesType = insuranceType === "all" || settlement.insuranceType === insuranceType

    return matchesSearch && matchesStatus && matchesType
  })

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
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>处理中</span>
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>已拒绝</span>
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索患者姓名、结算ID或患者ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有状态</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="pending">处理中</SelectItem>
                <SelectItem value="rejected">已拒绝</SelectItem>
              </SelectContent>
            </Select>

            <Select value={insuranceType} onValueChange={setInsuranceType}>
              <SelectTrigger className="w-[160px]">
                <CreditCard className="h-4 w-4 mr-2" />
                <SelectValue placeholder="医保类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有类型</SelectItem>
                <SelectItem value="城镇职工医保">城镇职工医保</SelectItem>
                <SelectItem value="城乡居民医保">城乡居民医保</SelectItem>
                <SelectItem value="商业医疗保险">商业医疗保险</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            <span>导出</span>
          </Button>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            <span>新建结算</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>医保结算记录</CardTitle>
          <CardDescription>管理患者医保结算和报销记录</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>结算ID</TableHead>
                <TableHead>患者信息</TableHead>
                <TableHead>医保类型</TableHead>
                <TableHead className="text-right">总金额</TableHead>
                <TableHead className="text-right">医保报销</TableHead>
                <TableHead className="text-right">自付金额</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>日期</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSettlements.map((settlement) => (
                <TableRow key={settlement.id}>
                  <TableCell className="font-medium">{settlement.id}</TableCell>
                  <TableCell>
                    <div>
                      <div>{settlement.patientName}</div>
                      <div className="text-xs text-muted-foreground">{settlement.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{settlement.insuranceType}</TableCell>
                  <TableCell className="text-right">¥{settlement.totalAmount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">¥{settlement.insuranceCoverage.toFixed(2)}</TableCell>
                  <TableCell className="text-right">¥{settlement.selfPayment.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(settlement.status)}</TableCell>
                  <TableCell>{settlement.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">查看详情</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredSettlements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    未找到符合条件的结算记录
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">今日结算</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">¥12,560.75</div>
            <p className="text-sm text-muted-foreground mt-1">共15笔交易</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">医保报销比例</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78.6%</div>
            <p className="text-sm text-muted-foreground mt-1">较上月提高2.3%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">待处理结算</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-sm text-muted-foreground mt-1">最早提交于2天前</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
