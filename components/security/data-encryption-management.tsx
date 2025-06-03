"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Shield, Key, RefreshCw, AlertTriangle, CheckCircle, Settings, Activity, TrendingUp } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface EncryptionKey {
  id: string
  name: string
  algorithm: string
  keySize: number
  status: "active" | "rotating" | "expired"
  createdAt: string
  lastRotated: string
  nextRotation: string
  usage: number
}

interface EncryptionPolicy {
  id: string
  name: string
  dataTypes: string[]
  algorithm: string
  keyRotationDays: number
  enabled: boolean
}

export function DataEncryptionManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [encryptionKeys, setEncryptionKeys] = useState<EncryptionKey[]>([
    {
      id: "key-001",
      name: "患者数据主密钥",
      algorithm: "AES-256-GCM",
      keySize: 256,
      status: "active",
      createdAt: "2024-01-15",
      lastRotated: "2024-11-01",
      nextRotation: "2025-02-01",
      usage: 85,
    },
    {
      id: "key-002",
      name: "医疗记录加密密钥",
      algorithm: "ChaCha20-Poly1305",
      keySize: 256,
      status: "active",
      createdAt: "2024-02-01",
      lastRotated: "2024-11-15",
      nextRotation: "2025-02-15",
      usage: 72,
    },
    {
      id: "key-003",
      name: "备份数据密钥",
      algorithm: "AES-256-CBC",
      keySize: 256,
      status: "rotating",
      createdAt: "2024-01-01",
      lastRotated: "2024-10-01",
      nextRotation: "2025-01-01",
      usage: 45,
    },
  ])

  const [encryptionPolicies, setEncryptionPolicies] = useState<EncryptionPolicy[]>([
    {
      id: "policy-001",
      name: "患者敏感数据",
      dataTypes: ["个人信息", "病历记录", "检查结果"],
      algorithm: "AES-256-GCM",
      keyRotationDays: 90,
      enabled: true,
    },
    {
      id: "policy-002",
      name: "系统日志数据",
      dataTypes: ["访问日志", "操作记录", "审计信息"],
      algorithm: "ChaCha20-Poly1305",
      keyRotationDays: 180,
      enabled: true,
    },
  ])

  const [encryptionStats, setEncryptionStats] = useState({
    totalDataEncrypted: 95.8,
    activeKeys: 12,
    pendingRotations: 3,
    encryptionThroughput: "2.3 GB/s",
  })

  // 密钥轮换
  const rotateKey = async (keyId: string) => {
    setEncryptionKeys((keys) => keys.map((key) => (key.id === keyId ? { ...key, status: "rotating" as const } : key)))

    // 模拟轮换过程
    setTimeout(() => {
      setEncryptionKeys((keys) =>
        keys.map((key) =>
          key.id === keyId
            ? {
                ...key,
                status: "active" as const,
                lastRotated: new Date().toISOString().split("T")[0],
                nextRotation: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              }
            : key,
        ),
      )
    }, 3000)
  }

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "rotating":
        return "bg-yellow-500"
      case "expired":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // 获取算法安全等级
  const getAlgorithmLevel = (algorithm: string) => {
    switch (algorithm) {
      case "AES-256-GCM":
      case "ChaCha20-Poly1305":
        return { level: "高", color: "text-green-600" }
      case "AES-256-CBC":
        return { level: "中", color: "text-yellow-600" }
      default:
        return { level: "低", color: "text-red-600" }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">数据加密管理</h2>
          <p className="text-muted-foreground">管理数据加密策略、密钥和安全配置</p>
        </div>
        <Button>
          <Key className="h-4 w-4 mr-2" />
          生成新密钥
        </Button>
      </div>

      {/* 概览统计 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">数据加密覆盖率</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{encryptionStats.totalDataEncrypted}%</div>
            <Progress value={encryptionStats.totalDataEncrypted} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃密钥</CardTitle>
            <Key className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{encryptionStats.activeKeys}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              较上月 +2
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待轮换密钥</CardTitle>
            <RefreshCw className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{encryptionStats.pendingRotations}</div>
            <p className="text-xs text-muted-foreground">30天内到期</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">加密吞吐量</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{encryptionStats.encryptionThroughput}</div>
            <p className="text-xs text-muted-foreground">实时处理速度</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="keys">密钥管理</TabsTrigger>
          <TabsTrigger value="policies">加密策略</TabsTrigger>
          <TabsTrigger value="settings">安全设置</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>加密状态概览</CardTitle>
                <CardDescription>当前系统加密状态和健康度</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">患者数据</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={98} className="w-20" />
                    <span className="text-sm font-medium">98%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">医疗记录</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={95} className="w-20" />
                    <span className="text-sm font-medium">95%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">系统日志</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={92} className="w-20" />
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">备份数据</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={100} className="w-20" />
                    <span className="text-sm font-medium">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>安全警报</CardTitle>
                <CardDescription>需要关注的安全事项</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>密钥即将到期</AlertTitle>
                  <AlertDescription>3个密钥将在30天内到期，建议提前进行轮换</AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>加密性能正常</AlertTitle>
                  <AlertDescription>所有加密服务运行正常，性能指标良好</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>密钥管理</CardTitle>
              <CardDescription>管理系统中的所有加密密钥</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {encryptionKeys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{key.name}</h4>
                        <Badge className={getStatusColor(key.status)}>
                          {key.status === "active" ? "活跃" : key.status === "rotating" ? "轮换中" : "已过期"}
                        </Badge>
                        <Badge variant="outline">{key.algorithm}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        密钥大小: {key.keySize}位 | 创建时间: {key.createdAt} | 上次轮换: {key.lastRotated}
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span>使用率: {key.usage}%</span>
                        <span>下次轮换: {key.nextRotation}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => rotateKey(key.id)}
                        disabled={key.status === "rotating"}
                      >
                        {key.status === "rotating" ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                        轮换
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                        配置
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>加密策略</CardTitle>
              <CardDescription>配置不同数据类型的加密策略</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {encryptionPolicies.map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{policy.name}</h4>
                        <Badge variant={policy.enabled ? "default" : "secondary"}>
                          {policy.enabled ? "启用" : "禁用"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">数据类型: {policy.dataTypes.join(", ")}</div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span>算法: {policy.algorithm}</span>
                        <span>轮换周期: {policy.keyRotationDays}天</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={policy.enabled}
                        onCheckedChange={(checked) => {
                          setEncryptionPolicies((policies) =>
                            policies.map((p) => (p.id === policy.id ? { ...p, enabled: checked } : p)),
                          )
                        }}
                      />
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                        编辑
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>全局加密设置</CardTitle>
                <CardDescription>系统级别的加密配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-algorithm">默认加密算法</Label>
                  <Select defaultValue="aes-256-gcm">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aes-256-gcm">AES-256-GCM</SelectItem>
                      <SelectItem value="chacha20-poly1305">ChaCha20-Poly1305</SelectItem>
                      <SelectItem value="aes-256-cbc">AES-256-CBC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="key-rotation">默认密钥轮换周期（天）</Label>
                  <Input id="key-rotation" type="number" defaultValue="90" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-rotation" defaultChecked />
                  <Label htmlFor="auto-rotation">启用自动密钥轮换</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="encryption-monitoring" defaultChecked />
                  <Label htmlFor="encryption-monitoring">启用加密性能监控</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>安全增强</CardTitle>
                <CardDescription>高级安全功能配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="hsm-integration" />
                  <Label htmlFor="hsm-integration">硬件安全模块(HSM)集成</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="key-escrow" />
                  <Label htmlFor="key-escrow">密钥托管服务</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="quantum-resistant" />
                  <Label htmlFor="quantum-resistant">抗量子加密算法</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="zero-knowledge" defaultChecked />
                  <Label htmlFor="zero-knowledge">零知识加密验证</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
