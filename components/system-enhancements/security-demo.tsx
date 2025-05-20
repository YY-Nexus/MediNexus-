"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Key,
  FileText,
  AlertTriangle,
  CheckCircle,
  Info,
  User,
  Clock,
  Activity,
  Database,
  Server,
} from "lucide-react"
import { AuditLogAction, AuditLogStatus, AuditLogSeverity } from "@/lib/security/audit-log-service"

// 模拟审计日志条目
const mockAuditLogs = [
  {
    id: "audit:1621234567890",
    timestamp: Date.now() - 1000 * 60 * 5,
    userId: "user123",
    userName: "李医生",
    userRole: "doctor",
    action: AuditLogAction.LOGIN,
    resource: "system",
    details: "用户登录成功",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: AuditLogStatus.SUCCESS,
    severity: AuditLogSeverity.LOW,
  },
  {
    id: "audit:1621234567891",
    timestamp: Date.now() - 1000 * 60 * 10,
    userId: "user456",
    userName: "张护士",
    userRole: "nurse",
    action: AuditLogAction.READ,
    resource: "medical_record",
    resourceId: "record123",
    details: "查看患者病历",
    ipAddress: "192.168.1.2",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    status: AuditLogStatus.SUCCESS,
    severity: AuditLogSeverity.LOW,
  },
  {
    id: "audit:1621234567892",
    timestamp: Date.now() - 1000 * 60 * 15,
    userId: "user789",
    userName: "王管理员",
    userRole: "admin",
    action: AuditLogAction.UPDATE,
    resource: "user",
    resourceId: "user123",
    details: "更新用户权限",
    ipAddress: "192.168.1.3",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
    status: AuditLogStatus.SUCCESS,
    severity: AuditLogSeverity.MEDIUM,
  },
  {
    id: "audit:1621234567893",
    timestamp: Date.now() - 1000 * 60 * 20,
    userId: "user123",
    userName: "李医生",
    userRole: "doctor",
    action: AuditLogAction.EXPORT,
    resource: "patient_data",
    details: "导出患者数据",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: AuditLogStatus.SUCCESS,
    severity: AuditLogSeverity.MEDIUM,
  },
  {
    id: "audit:1621234567894",
    timestamp: Date.now() - 1000 * 60 * 25,
    userId: "user999",
    userName: "未知用户",
    userRole: "unknown",
    action: AuditLogAction.LOGIN,
    resource: "system",
    details: "登录尝试失败：密码错误",
    ipAddress: "203.0.113.1",
    userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    status: AuditLogStatus.FAILURE,
    severity: AuditLogSeverity.HIGH,
  },
]

// 模拟CSP违规
const mockCspViolations = [
  {
    id: "csp:1621234567890",
    timestamp: Date.now() - 1000 * 60 * 30,
    documentUri: "https://medinexus.com/dashboard",
    violatedDirective: "script-src",
    blockedUri: "https://malicious-site.com/script.js",
    sourceFile: "https://medinexus.com/js/main.js",
    lineNumber: 42,
    columnNumber: 13,
  },
  {
    id: "csp:1621234567891",
    timestamp: Date.now() - 1000 * 60 * 45,
    documentUri: "https://medinexus.com/patients",
    violatedDirective: "img-src",
    blockedUri: "https://tracking-pixel.com/track.gif",
    sourceFile: "https://medinexus.com/js/analytics.js",
    lineNumber: 17,
    columnNumber: 8,
  },
]

// 获取状态徽章
const getStatusBadge = (status: AuditLogStatus) => {
  switch (status) {
    case AuditLogStatus.SUCCESS:
      return <Badge className="bg-green-500">{status}</Badge>
    case AuditLogStatus.FAILURE:
      return <Badge className="bg-red-500">{status}</Badge>
    case AuditLogStatus.WARNING:
      return <Badge className="bg-yellow-500">{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

// 获取严重性徽章
const getSeverityBadge = (severity: AuditLogSeverity) => {
  switch (severity) {
    case AuditLogSeverity.LOW:
      return (
        <Badge variant="outline" className="border-green-500 text-green-500">
          {severity}
        </Badge>
      )
    case AuditLogSeverity.MEDIUM:
      return (
        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
          {severity}
        </Badge>
      )
    case AuditLogSeverity.HIGH:
      return (
        <Badge variant="outline" className="border-red-500 text-red-500">
          {severity}
        </Badge>
      )
    case AuditLogSeverity.CRITICAL:
      return (
        <Badge variant="outline" className="border-red-700 text-red-700 font-bold">
          {severity}
        </Badge>
      )
    default:
      return <Badge variant="outline">{severity}</Badge>
  }
}

// 格式化日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

export function SecurityDemo() {
  const [selectedAction, setSelectedAction] = useState<string>("all")
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")

  // 过滤审计日志
  const filteredLogs = mockAuditLogs.filter((log) => {
    if (selectedAction !== "all" && log.action !== selectedAction) {
      return false
    }
    if (selectedSeverity !== "all" && log.severity !== selectedSeverity) {
      return false
    }
    return true
  })

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>安全状态</CardTitle>
            <CardDescription>系统安全状态和保护措施概览</CardDescription>
          </div>
          <ShieldCheck className="h-6 w-6 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col space-y-1.5 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">内容安全策略</h3>
              </div>
              <p className="text-sm text-muted-foreground">已启用</p>
              <Badge className="w-fit mt-2 bg-green-500">活跃</Badge>
            </div>
            <div className="flex flex-col space-y-1.5 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">API权限检查</h3>
              </div>
              <p className="text-sm text-muted-foreground">已启用</p>
              <Badge className="w-fit mt-2 bg-green-500">活跃</Badge>
            </div>
            <div className="flex flex-col space-y-1.5 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">安全审计日志</h3>
              </div>
              <p className="text-sm text-muted-foreground">已启用</p>
              <Badge className="w-fit mt-2 bg-green-500">活跃</Badge>
            </div>
            <div className="flex flex-col space-y-1.5 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">加密传输</h3>
              </div>
              <p className="text-sm text-muted-foreground">TLS 1.3</p>
              <Badge className="w-fit mt-2 bg-green-500">活跃</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="audit-logs">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="audit-logs">安全审计日志</TabsTrigger>
          <TabsTrigger value="csp-violations">CSP违规</TabsTrigger>
        </TabsList>

        <TabsContent value="audit-logs">
          <Card>
            <CardHeader>
              <CardTitle>安全审计日志</CardTitle>
              <CardDescription>系统安全相关操作的详细日志记录</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="action-filter">按操作筛选</Label>
                  <Select value={selectedAction} onValueChange={setSelectedAction}>
                    <SelectTrigger id="action-filter">
                      <SelectValue placeholder="选择操作" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有操作</SelectItem>
                      {Object.values(AuditLogAction).map((action) => (
                        <SelectItem key={action} value={action}>
                          {action}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 space-y-2">
                  <Label htmlFor="severity-filter">按严重性筛选</Label>
                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger id="severity-filter">
                      <SelectValue placeholder="选择严重性" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有严重性</SelectItem>
                      {Object.values(AuditLogSeverity).map((severity) => (
                        <SelectItem key={severity} value={severity}>
                          {severity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">时间</TableHead>
                      <TableHead>用户</TableHead>
                      <TableHead>操作</TableHead>
                      <TableHead>资源</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>严重性</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-xs">{formatDate(log.timestamp)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{log.userName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.resource}</TableCell>
                          <TableCell>{getStatusBadge(log.status)}</TableCell>
                          <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          没有找到匹配的日志记录
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">导出日志</Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>上次更新: {formatDate(Date.now())}</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="csp-violations">
          <Card>
            <CardHeader>
              <CardTitle>内容安全策略违规</CardTitle>
              <CardDescription>记录的CSP违规事件</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCspViolations.length > 0 ? (
                <div className="space-y-4">
                  {mockCspViolations.map((violation) => (
                    <div key={violation.id} className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldAlert className="h-5 w-5 text-red-500" />
                        <h3 className="font-semibold">违反 {violation.violatedDirective} 指令</h3>
                      </div>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">时间:</span>
                          <span>{formatDate(violation.timestamp)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">页面:</span>
                          <span className="font-mono">{violation.documentUri}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">被阻止的URI:</span>
                          <span className="font-mono">{violation.blockedUri}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">源文件:</span>
                          <span className="font-mono">{violation.sourceFile}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">位置:</span>
                          <span className="font-mono">
                            行 {violation.lineNumber}, 列 {violation.columnNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h3 className="text-lg font-medium">没有CSP违规</h3>
                    <p className="text-sm text-muted-foreground">内容安全策略正常运行，没有检测到违规</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>关于内容安全策略</AlertTitle>
                <AlertDescription>
                  内容安全策略(CSP)通过限制可以加载的资源来防止跨站脚本攻击(XSS)和数据注入攻击。
                  系统会自动记录所有违规并采取相应措施。
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>API权限检查</CardTitle>
          <CardDescription>API访问权限控制和检查机制</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">资源权限</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>患者数据:</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    已保护
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>医疗记录:</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    已保护
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>用户管理:</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    已保护
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>系统设置:</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    已保护
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">操作权限</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>读取:</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    已保护
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>写入:</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    已保护
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>删除:</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    已保护
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>导出:</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    已保护
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Server className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">API端点</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>/api/patients:</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    已保护
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>/api/medical-records:</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    已保护
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>/api/users:</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    已保护
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>/api/analytics:</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    已保护
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Alert className="w-full">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>权限检查机制</AlertTitle>
            <AlertDescription>
              系统使用基于角色的访问控制(RBAC)和细粒度权限检查，确保用户只能访问其角色允许的资源和操作。
              所有API请求都经过权限验证，未授权的请求将被拒绝并记录。
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  )
}
