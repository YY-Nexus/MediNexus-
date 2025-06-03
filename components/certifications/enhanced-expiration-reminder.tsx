"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  AlertTriangle,
  Calendar,
  Bell,
  Mail,
  MessageSquare,
  Settings,
  Clock,
  CheckCircle,
  Globe,
  RefreshCw,
} from "lucide-react"
import { certificationVerificationService } from "@/services/certification-verification-service"
import { useToast } from "@/hooks/use-toast"

interface ReminderSettings {
  enabled: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  reminderIntervals: number[]
  autoRenewal: boolean
  renewalBuffer: number
}

export function EnhancedExpirationReminder() {
  const { toast } = useToast()
  const [expiringCertifications, setExpiringCertifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
    enabled: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    reminderIntervals: [90, 60, 30, 14, 7, 1],
    autoRenewal: false,
    renewalBuffer: 30,
  })

  useEffect(() => {
    loadExpiringCertifications()
  }, [])

  const loadExpiringCertifications = async () => {
    try {
      setLoading(true)
      const certifications = await certificationVerificationService.getExpiringCertifications("current-user", 120)
      setExpiringCertifications(certifications)
    } catch (error) {
      console.error("加载即将到期资质失败:", error)
      toast({
        title: "加载失败",
        description: "无法加载即将到期的资质信息",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateReminderSettings = (key: keyof ReminderSettings, value: any) => {
    setReminderSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const saveSettings = () => {
    // 这里应该调用API保存设置
    toast({
      title: "设置已保存",
      description: "续期提醒设置已成功更新",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCertificationTypeName = (type: string) => {
    const typeMap: { [key: string]: string } = {
      "doctor-license": "执业医师资格证",
      "specialist-certificate": "专科医师资格证",
      "practice-permit": "医疗机构执业许可证",
      "continuing-education": "继续教育证书",
      "international-medical-license": "国际医疗执业许可证",
      "who-certification": "WHO认证证书",
      "usmle-certification": "USMLE认证",
      "gmc-registration": "英国GMC注册",
    }
    return typeMap[type] || type
  }

  const triggerRenewalProcess = (certificationId: string) => {
    toast({
      title: "续期流程已启动",
      description: "系统将引导您完成资质续期流程",
    })
    // 这里应该跳转到续期页面或启动续期流程
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>加载中...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* 即将到期的资质列表 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                即将到期的资质
              </CardTitle>
              <CardDescription>以下资质即将到期，请及时办理续期手续</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={loadExpiringCertifications}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {expiringCertifications.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium">所有资质都在有效期内</p>
              <p className="text-muted-foreground">暂无即将到期的资质需要处理</p>
            </div>
          ) : (
            <div className="space-y-4">
              {expiringCertifications.map((cert) => (
                <div key={cert.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{getCertificationTypeName(cert.type)}</h4>
                        {cert.type.includes("international") && <Globe className="h-4 w-4 text-blue-500" />}
                        <Badge className={getPriorityColor(cert.priority)}>
                          {cert.priority === "high" && "紧急"}
                          {cert.priority === "medium" && "重要"}
                          {cert.priority === "low" && "一般"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">证书编号</p>
                          <p>{cert.licenseNumber}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">持有人</p>
                          <p>{cert.name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">到期日期</p>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <p>{cert.expiryDate}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">剩余天数</p>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <p className={cert.daysRemaining <= 30 ? "text-red-500 font-medium" : ""}>
                              {cert.daysRemaining} 天
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm" onClick={() => triggerRenewalProcess(cert.id)}>
                        开始续期
                      </Button>
                      <Button variant="outline" size="sm">
                        查看详情
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 提醒设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            续期提醒设置
          </CardTitle>
          <CardDescription>配置自动续期提醒的方式和时间</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 基本设置 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reminder-enabled">启用续期提醒</Label>
                <p className="text-sm text-muted-foreground">自动监控资质到期时间并发送提醒</p>
              </div>
              <Switch
                id="reminder-enabled"
                checked={reminderSettings.enabled}
                onCheckedChange={(checked) => updateReminderSettings("enabled", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-renewal">启用自动续期</Label>
                <p className="text-sm text-muted-foreground">在到期前自动启动续期流程</p>
              </div>
              <Switch
                id="auto-renewal"
                checked={reminderSettings.autoRenewal}
                onCheckedChange={(checked) => updateReminderSettings("autoRenewal", checked)}
              />
            </div>

            {reminderSettings.autoRenewal && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="renewal-buffer">提前续期天数</Label>
                <Select
                  value={reminderSettings.renewalBuffer.toString()}
                  onValueChange={(value) => updateReminderSettings("renewalBuffer", Number.parseInt(value))}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15天</SelectItem>
                    <SelectItem value="30">30天</SelectItem>
                    <SelectItem value="45">45天</SelectItem>
                    <SelectItem value="60">60天</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Separator />

          {/* 通知方式 */}
          <div className="space-y-4">
            <h4 className="font-medium">通知方式</h4>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <div>
                  <Label htmlFor="email-notifications">邮件通知</Label>
                  <p className="text-sm text-muted-foreground">通过邮件发送续期提醒</p>
                </div>
              </div>
              <Switch
                id="email-notifications"
                checked={reminderSettings.emailNotifications}
                onCheckedChange={(checked) => updateReminderSettings("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <div>
                  <Label htmlFor="sms-notifications">短信通知</Label>
                  <p className="text-sm text-muted-foreground">通过短信发送紧急提醒</p>
                </div>
              </div>
              <Switch
                id="sms-notifications"
                checked={reminderSettings.smsNotifications}
                onCheckedChange={(checked) => updateReminderSettings("smsNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <div>
                  <Label htmlFor="push-notifications">推送通知</Label>
                  <p className="text-sm text-muted-foreground">通过应用推送发送提醒</p>
                </div>
              </div>
              <Switch
                id="push-notifications"
                checked={reminderSettings.pushNotifications}
                onCheckedChange={(checked) => updateReminderSettings("pushNotifications", checked)}
              />
            </div>
          </div>

          <Separator />

          {/* 提醒时间设置 */}
          <div className="space-y-4">
            <h4 className="font-medium">提醒时间设置</h4>
            <p className="text-sm text-muted-foreground">
              设置在资质到期前多少天发送提醒（当前设置：{reminderSettings.reminderIntervals.join("、")}天前）
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[1, 3, 7, 14, 30, 60, 90, 120].map((days) => (
                <div key={days} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`reminder-${days}`}
                    checked={reminderSettings.reminderIntervals.includes(days)}
                    onChange={(e) => {
                      const intervals = e.target.checked
                        ? [...reminderSettings.reminderIntervals, days].sort((a, b) => b - a)
                        : reminderSettings.reminderIntervals.filter((d) => d !== days)
                      updateReminderSettings("reminderIntervals", intervals)
                    }}
                    className="rounded"
                  />
                  <Label htmlFor={`reminder-${days}`} className="text-sm">
                    {days}天前
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={saveSettings}>保存设置</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
