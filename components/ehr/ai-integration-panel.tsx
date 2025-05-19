"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BrainCircuit,
  LinkIcon,
  Settings,
  Shield,
  FileText,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react"

export default function AiIntegrationPanel() {
  const [integrationStatus, setIntegrationStatus] = useState({
    patientData: true,
    labResults: true,
    medicalImages: true,
    medications: false,
    clinicalNotes: false,
  })

  const [syncStatus, setSyncStatus] = useState({
    lastSync: "2024-05-05 14:30",
    status: "已同步",
    pendingChanges: 0,
  })

  const toggleIntegration = (key) => {
    setIntegrationStatus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "已同步":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            已同步
          </Badge>
        )
      case "同步中":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            同步中
          </Badge>
        )
      case "同步失败":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            同步失败
          </Badge>
        )
      case "待同步":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            待同步
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleSync = () => {
    setSyncStatus({
      ...syncStatus,
      status: "同步中",
    })

    // 模拟同步过程
    setTimeout(() => {
      setSyncStatus({
        lastSync: new Date()
          .toLocaleString("zh-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", ""),
        status: "已同步",
        pendingChanges: 0,
      })
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <LinkIcon className="h-5 w-5 mr-2 text-blue-500" />
          电子病历与AI模型集成
        </CardTitle>
        <CardDescription>管理电子病历系统与AI诊断模型之间的数据共享和集成</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="data-mapping">
          <TabsList className="mb-4">
            <TabsTrigger value="data-mapping">数据映射</TabsTrigger>
            <TabsTrigger value="sync-status">同步状态</TabsTrigger>
            <TabsTrigger value="security">安全设置</TabsTrigger>
          </TabsList>

          <TabsContent value="data-mapping">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  <Label htmlFor="patient-data" className="font-medium">
                    患者基本信息
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    双向同步
                  </Badge>
                  <Switch
                    id="patient-data"
                    checked={integrationStatus.patientData}
                    onCheckedChange={() => toggleIntegration("patientData")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-green-500" />
                  <Label htmlFor="lab-results" className="font-medium">
                    实验室检查结果
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    双向同步
                  </Badge>
                  <Switch
                    id="lab-results"
                    checked={integrationStatus.labResults}
                    onCheckedChange={() => toggleIntegration("labResults")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-purple-500" />
                  <Label htmlFor="medical-images" className="font-medium">
                    医学影像数据
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    双向同步
                  </Badge>
                  <Switch
                    id="medical-images"
                    checked={integrationStatus.medicalImages}
                    onCheckedChange={() => toggleIntegration("medicalImages")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-red-500" />
                  <Label htmlFor="medications" className="font-medium">
                    药物处方信息
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    仅读取
                  </Badge>
                  <Switch
                    id="medications"
                    checked={integrationStatus.medications}
                    onCheckedChange={() => toggleIntegration("medications")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-yellow-500" />
                  <Label htmlFor="clinical-notes" className="font-medium">
                    临床记录与病历
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    仅读取
                  </Badge>
                  <Switch
                    id="clinical-notes"
                    checked={integrationStatus.clinicalNotes}
                    onCheckedChange={() => toggleIntegration("clinicalNotes")}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sync-status">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">同步状态</h3>
                  <p className="text-sm text-muted-foreground">上次同步时间: {syncStatus.lastSync}</p>
                </div>
                {getStatusBadge(syncStatus.status)}
              </div>

              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">数据同步统计</h4>
                  <Badge variant="outline">{syncStatus.pendingChanges} 个待同步项</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>患者基本信息</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      已同步
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>实验室检查结果</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      已同步
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>医学影像数据</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      已同步
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>药物处方信息</span>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      未启用
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>临床记录与病历</span>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      未启用
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2" disabled={syncStatus.status === "同步中"}>
                  查看日志
                </Button>
                <Button onClick={handleSync} disabled={syncStatus.status === "同步中"}>
                  {syncStatus.status === "同步中" ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      同步中...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      立即同步
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">数据安全设置</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-500" />
                      <Label htmlFor="data-encryption" className="text-sm">
                        数据传输加密
                      </Label>
                    </div>
                    <Switch id="data-encryption" checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-500" />
                      <Label htmlFor="anonymization" className="text-sm">
                        患者数据匿名化
                      </Label>
                    </div>
                    <Switch id="anonymization" checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-500" />
                      <Label htmlFor="audit-logging" className="text-sm">
                        访问审计日志
                      </Label>
                    </div>
                    <Switch id="audit-logging" checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-500" />
                      <Label htmlFor="auto-logout" className="text-sm">
                        自动注销
                      </Label>
                    </div>
                    <Switch id="auto-logout" checked={false} />
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">访问控制</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-green-500" />
                      <Label htmlFor="role-based-access" className="text-sm">
                        基于角色的访问控制
                      </Label>
                    </div>
                    <Switch id="role-based-access" checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-green-500" />
                      <Label htmlFor="two-factor" className="text-sm">
                        双因素认证
                      </Label>
                    </div>
                    <Switch id="two-factor" checked={false} />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          <BrainCircuit className="h-4 w-4 inline-block mr-1" />
          AI模型与电子病历集成状态:
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ml-2">
            正常运行中
          </Badge>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          高级设置
        </Button>
      </CardFooter>
    </Card>
  )
}
