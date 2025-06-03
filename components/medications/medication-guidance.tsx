"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Search, AlertTriangle, Info, Clock, Pill, Heart, Brain, Shield, Bell, Settings, Calendar } from "lucide-react"

interface MedicationGuidanceProps {
  patientId?: string
  medications?: Array<{
    id: string
    name: string
    dosage: string
    frequency: string
    startDate: string
    endDate?: string
    prescribedBy: string
    status: "active" | "completed" | "discontinued"
    sideEffects?: string[]
    interactions?: string[]
  }>
}

export function MedicationGuidance({ patientId, medications = [] }: MedicationGuidanceProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMedication, setSelectedMedication] = useState<string>("")
  const [dosageReminder, setDosageReminder] = useState("")
  const [notificationSettings, setNotificationSettings] = useState({
    dosageReminders: true,
    sideEffectAlerts: true,
    interactionWarnings: true,
    refillReminders: true,
    smsReminders: false,
    emailReminders: true,
  })

  // 模拟药物数据
  const medicationDatabase = [
    {
      id: "1",
      name: "阿司匹林",
      category: "心血管药物",
      description: "用于预防心血管疾病的抗血小板药物",
      dosage: "100mg",
      frequency: "每日一次",
      sideEffects: ["胃肠道不适", "出血风险增加", "过敏反应"],
      interactions: ["华法林", "氯吡格雷", "布洛芬"],
      contraindications: ["活动性出血", "严重肝功能不全", "对阿司匹林过敏"],
      guidance: "餐后服用，减少胃肠道刺激。定期监测凝血功能。",
    },
    {
      id: "2",
      name: "美托洛尔",
      category: "心血管药物",
      description: "β受体阻滞剂，用于治疗高血压和心律失常",
      dosage: "25-100mg",
      frequency: "每日1-2次",
      sideEffects: ["疲劳", "头晕", "心率减慢", "低血压"],
      interactions: ["胰岛素", "地高辛", "维拉帕米"],
      contraindications: ["严重心动过缓", "心源性休克", "严重哮喘"],
      guidance: "不可突然停药，需逐渐减量。监测心率和血压。",
    },
  ]

  const filteredMedications = medicationDatabase.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">药物指导</h1>
          <p className="text-muted-foreground">智能药物管理和用药指导系统</p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          设置
        </Button>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            药物搜索
          </CardTitle>
          <CardDescription>搜索药物信息，获取详细的用药指导</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="搜索药物名称或分类..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedMedication} onValueChange={setSelectedMedication}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="选择药物分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiovascular">心血管药物</SelectItem>
                <SelectItem value="neurological">神经系统药物</SelectItem>
                <SelectItem value="endocrine">内分泌药物</SelectItem>
                <SelectItem value="antibiotics">抗生素</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 药物列表 */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>药物信息</CardTitle>
              <CardDescription>找到 {filteredMedications.length} 种药物</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMedications.map((medication) => (
                  <div key={medication.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{medication.name}</h3>
                        <Badge variant="secondary" className="mt-1">
                          {medication.category}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        查看详情
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground">{medication.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">推荐剂量：</span>
                        <span className="ml-1">{medication.dosage}</span>
                      </div>
                      <div>
                        <span className="font-medium">服用频率：</span>
                        <span className="ml-1">{medication.frequency}</span>
                      </div>
                    </div>

                    <Tabs defaultValue="guidance" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="guidance">用药指导</TabsTrigger>
                        <TabsTrigger value="sideEffects">副作用</TabsTrigger>
                        <TabsTrigger value="interactions">相互作用</TabsTrigger>
                        <TabsTrigger value="contraindications">禁忌症</TabsTrigger>
                      </TabsList>

                      <TabsContent value="guidance" className="mt-4">
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertTitle>用药指导</AlertTitle>
                          <AlertDescription>{medication.guidance}</AlertDescription>
                        </Alert>
                      </TabsContent>

                      <TabsContent value="sideEffects" className="mt-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">常见副作用：</h4>
                          <div className="flex flex-wrap gap-2">
                            {medication.sideEffects.map((effect, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {effect}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="interactions" className="mt-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">药物相互作用：</h4>
                          <div className="flex flex-wrap gap-2">
                            {medication.interactions.map((interaction, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {interaction}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="contraindications" className="mt-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">禁忌症：</h4>
                          <div className="space-y-1">
                            {medication.contraindications.map((contraindication, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <AlertTriangle className="h-3 w-3 text-destructive" />
                                <span>{contraindication}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          {/* 用药提醒设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                提醒设置
              </CardTitle>
              <CardDescription>配置用药提醒和通知</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dosage-reminders">用药提醒</Label>
                  <Switch
                    id="dosage-reminders"
                    checked={notificationSettings.dosageReminders}
                    onCheckedChange={() => handleNotificationChange("dosageReminders")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="side-effect-alerts">副作用警告</Label>
                  <Switch
                    id="side-effect-alerts"
                    checked={notificationSettings.sideEffectAlerts}
                    onCheckedChange={() => handleNotificationChange("sideEffectAlerts")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="interaction-warnings">相互作用警告</Label>
                  <Switch
                    id="interaction-warnings"
                    checked={notificationSettings.interactionWarnings}
                    onCheckedChange={() => handleNotificationChange("interactionWarnings")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="refill-reminders">续药提醒</Label>
                  <Switch
                    id="refill-reminders"
                    checked={notificationSettings.refillReminders}
                    onCheckedChange={() => handleNotificationChange("refillReminders")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-reminders">短信提醒</Label>
                  <Switch
                    id="sms-reminders"
                    checked={notificationSettings.smsReminders}
                    onCheckedChange={() => handleNotificationChange("smsReminders")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="email-reminders">邮件提醒</Label>
                  <Switch
                    id="email-reminders"
                    checked={notificationSettings.emailReminders}
                    onCheckedChange={() => handleNotificationChange("emailReminders")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 快速添加提醒 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                添加提醒
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-medication">药物名称</Label>
                <Input
                  id="reminder-medication"
                  placeholder="输入药物名称"
                  value={dosageReminder}
                  onChange={(e) => setDosageReminder(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-time">提醒时间</Label>
                <Input id="reminder-time" type="time" defaultValue="08:00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-notes">备注</Label>
                <Textarea id="reminder-notes" placeholder="添加用药备注..." rows={3} />
              </div>

              <Button className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                设置提醒
              </Button>
            </CardContent>
          </Card>

          {/* 健康指标监测 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                健康监测
              </CardTitle>
              <CardDescription>用药期间的健康指标</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm">血压</span>
                  </div>
                  <span className="text-sm font-medium">120/80 mmHg</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">血糖</span>
                  </div>
                  <span className="text-sm font-medium">5.6 mmol/L</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">心率</span>
                  </div>
                  <span className="text-sm font-medium">72 bpm</span>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>监测提醒</AlertTitle>
                  <AlertDescription className="text-xs">
                    服用美托洛尔期间，请定期监测心率。如心率小于60次/分钟，请及时就医。
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
