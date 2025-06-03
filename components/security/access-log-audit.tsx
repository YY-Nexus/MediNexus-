"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Search,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Activity,
  Shield,
  FileText,
  TrendingUp,
  MapPin,
} from "lucide-react"

interface AccessLog {
  id: string
  userId: string
  userName: string
  userRole: string
  action: string
  resource: string
  timestamp: string
  ipAddress: string
  userAgent: string
  location: string
  status: "success" | "failed" | "suspicious"
  riskLevel: "low" | "medium" | "high"
  sessionId: string
  details: string
}

interface AuditStats {
  totalLogs: number
  successfulAccess: number
  failedAttempts: number
  suspiciousActivity: number
  uniqueUsers: number
  topRiskEvents: number
}

export function AccessLogAudit() {
  const [activeTab, setActiveTab] = useState("logs")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterRisk, setFilterRisk] = useState("all")
  const [dateRange, setDateRange] = useState({ from: null, to: null })

  const [auditStats, setAuditStats] = useState<AuditStats>({
    totalLogs: 15847,
    successfulAccess: 14923,
    failedAttempts: 724,
    suspiciousActivity: 200,
    uniqueUsers: 1247,
    topRiskEvents: 23,
  })

  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([
    {
      id: "log-001",
      userId: "user-123",
      userName: "张医生",
      userRole: "主治医师",
      action: "查看患者病历",
      resource: "/patients/12345/records",
      timestamp: "2024-12-25 14:30:25",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome/120.0.0.0",
      location: "北京市朝阳区",
      status: "success",
      riskLevel: "low",
      sessionId: "sess-abc123",
      details: "正常访问患者病历记录",
    },
    {
      id: "log-002",
      userId: "user-456",
      userName: "李护士",
      userRole: "护士",
      action: "尝试访问管理员功能",
      resource: "/admin/users",
      timestamp: "2024-12-25 14:25:10",
      ipAddress: "192.168.1.105",
      userAgent: "Firefox/121.0.0.0",
      location: "北京市海淀区",
      status: "failed",
      riskLevel: "high",
      sessionId: "sess-def456",
      details: "权限不足，访问被拒绝",
    },
    {
      id: "log-003",
      userId: "user-789",
      userName: "王主任",
      userRole: "科室主任",
      action: "批量导出患者数据",
      resource: "/export/patient-data",
      timestamp: "2024-12-25 14:20:45",
      ipAddress: "192.168.1.110",
      userAgent: "Chrome/120.0.0.0",
      location: "北京市西城区",
      status: "success",
      riskLevel: "medium",
      sessionId: "sess-ghi789",
      details: "导出100条患者记录",
    },
    {
      id: "log-004",
      userId: "unknown",
      userName: "未知用户",
      userRole: "未知",
      action: "多次登录失败",
      resource: "/auth/login",
      timestamp: "2024-12-25 14:15:30",
      ipAddress: "203.0.113.45",
      userAgent: "curl/7.68.0",
      location: "未知地区",
      status: "failed",
      riskLevel: "high",
      sessionId: "sess-jkl012",
      details: "5分钟内尝试登录15次",
    },
    {
      id: "log-005",
      userId: "user-321",
      userName: "赵技师",
      userRole: "医技人员",
      action: "上传医学影像",
      resource: "/imaging/upload",
      timestamp: "2024-12-25 14:10:15",
      ipAddress: "192.168.1.120",
      userAgent: "Chrome/120.0.0.0",
      location: "北京市东城区",
      status: "success",
      riskLevel: "low",
      sessionId: "sess-mno345",
      details: "上传CT扫描图像",
    },
  ])

  // 过滤日志
  const filteredLogs = accessLogs.filter((log) => {
    const matchesSearch =
      searchTerm === "" ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || log.status === filterStatus
    const matchesRisk = filterRisk === "all" || log.riskLevel === filterRisk

    return matchesSearch && matchesStatus && matchesRisk
  })

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500"
      case "failed":
        return "bg-red-500"
      case "suspicious":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  // 获取风险等级颜色
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  // 导出审计报告
  const exportAuditReport = () => {
    console.log("导出审计报告...")
    // 实际实现中会生成并下载报告文件
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">访问日志审计</h2>
          <p className="text-muted-foreground">监控和审计系统访问活动</p>
        </div>
        <Button onClick={exportAuditReport}>
          <Download className="h-4 w-4 mr-2" />
          导出报告
        </Button>
      </div>

      {/* 统计概览 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总访问次数</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditStats.totalLogs.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              较昨日 +12%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">成功访问</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditStats.successfulAccess.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              成功率 {((auditStats.successfulAccess / auditStats.totalLogs) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">失败尝试</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditStats.failedAttempts}</div>
            <p className="text-xs text-muted-foreground">需要关注</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">可疑活动</CardTitle>
            <Shield className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditStats.suspiciousActivity}</div>
            <p className="text-xs text-muted-foreground">待调查</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
            <User className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditStats.uniqueUsers}</div>
            <p className="text-xs text-muted-foreground">今日活跃</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">高风险事件</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditStats.topRiskEvents}</div>
            <p className="text-xs text-muted-foreground">需立即处理</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logs">访问日志</TabsTrigger>
          <TabsTrigger value="analysis">行为分析</TabsTrigger>
          <TabsTrigger value="reports">审计报告</TabsTrigger>
          <TabsTrigger value="settings">审计设置</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4">
          {/* 搜索和过滤 */}
          <Card>
            <CardHeader>
              <CardTitle>日志搜索与过滤</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
                <div className="space-y-2">
                  <Label htmlFor="search">搜索</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="搜索用户、操作或资源..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>状态</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部状态</SelectItem>
                      <SelectItem value="success">成功</SelectItem>
                      <SelectItem value="failed">失败</SelectItem>
                      <SelectItem value="suspicious">可疑</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>风险等级</Label>
                  <Select value={filterRisk} onValueChange={setFilterRisk}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部等级</SelectItem>
                      <SelectItem value="low">低风险</SelectItem>
                      <SelectItem value="medium">中风险</SelectItem>
                      <SelectItem value="high">高风险</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>开始日期</Label>
                  <DatePicker />
                </div>
                <div className="space-y-2">
                  <Label>结束日期</Label>
                  <DatePicker />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 日志列表 */}
          <Card>
            <CardHeader>
              <CardTitle>访问日志记录</CardTitle>
              <CardDescription>显示 {filteredLogs.length} 条记录</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>时间</TableHead>
                      <TableHead>用户</TableHead>
                      <TableHead>操作</TableHead>
                      <TableHead>资源</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>风险</TableHead>
                      <TableHead>位置</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {log.timestamp}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{log.userName}</div>
                            <div className="text-sm text-muted-foreground">{log.userRole}</div>
                          </div>
                        </TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell className="font-mono text-sm">{log.resource}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(log.status)}>
                            {log.status === "success" ? "成功" : log.status === "failed" ? "失败" : "可疑"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${getRiskColor(log.riskLevel)}`}>
                            {log.riskLevel === "low" ? "低" : log.riskLevel === "medium" ? "中" : "高"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="text-sm">{log.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>用户行为分析</CardTitle>
                <CardDescription>分析用户访问模式和异常行为</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <strong>异常登录时间:</strong> 检测到3个用户在非工作时间频繁访问
                  </div>
                  <div className="text-sm">
                    <strong>权限越界尝试:</strong> 发现5次尝试访问超出权限范围的资源
                  </div>
                  <div className="text-sm">
                    <strong>批量操作异常:</strong> 2个用户进行了大量数据导出操作
                  </div>
                  <div className="text-sm">
                    <strong>地理位置异常:</strong> 1个用户从异常地理位置登录
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>访问趋势分析</CardTitle>
                <CardDescription>系统访问量和模式趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <strong>峰值时间:</strong> 上午9-11点，下午2-4点访问量最高
                  </div>
                  <div className="text-sm">
                    <strong>周期性模式:</strong> 工作日访问量是周末的3.2倍
                  </div>
                  <div className="text-sm">
                    <strong>功能使用:</strong> 患者查询占总访问量的45%
                  </div>
                  <div className="text-sm">
                    <strong>设备分布:</strong> 78%来自PC端，22%来自移动设备
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>审计报告</CardTitle>
              <CardDescription>生成和管理审计报告</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    日报告
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    周报告
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    月报告
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  报告将包含访问统计、异常行为分析、安全事件汇总等内容
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>审计设置</CardTitle>
              <CardDescription>配置审计规则和参数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">审计设置功能正在开发中...</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
