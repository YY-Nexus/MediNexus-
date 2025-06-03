"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MedicalButton } from "@/components/ui/medical-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  MessageSquare,
  Phone,
  Video,
  Mail,
  Calendar,
  Clock,
  Send,
  Plus,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

// 家属信息类型
interface FamilyMember {
  id: string
  name: string
  relationship: string
  phone: string
  email: string
  isEmergencyContact: boolean
  isPrimaryContact: boolean
  avatar?: string
  preferences: {
    communicationMethod: "phone" | "email" | "sms" | "app"
    frequency: "daily" | "weekly" | "monthly" | "asNeeded"
    language: string
  }
  permissions: {
    viewMedicalRecords: boolean
    receiveUpdates: boolean
    makeDecisions: boolean
  }
}

// 沟通记录类型
interface CommunicationRecord {
  id: string
  type: "call" | "email" | "sms" | "meeting" | "video"
  familyMemberId: string
  familyMemberName: string
  subject: string
  content: string
  timestamp: string
  status: "sent" | "delivered" | "read" | "replied"
  priority: "low" | "medium" | "high"
  attachments?: string[]
}

// 沟通计划类型
interface CommunicationPlan {
  id: string
  title: string
  description: string
  frequency: string
  nextScheduled: string
  participants: string[]
  type: "routine" | "emergency" | "education" | "support"
  status: "active" | "paused" | "completed"
}

// 模拟数据
const mockFamilyMembers: FamilyMember[] = [
  {
    id: "fm001",
    name: "张丽",
    relationship: "妻子",
    phone: "13987654321",
    email: "zhangli@example.com",
    isEmergencyContact: true,
    isPrimaryContact: true,
    preferences: {
      communicationMethod: "phone",
      frequency: "daily",
      language: "中文",
    },
    permissions: {
      viewMedicalRecords: true,
      receiveUpdates: true,
      makeDecisions: true,
    },
  },
  {
    id: "fm002",
    name: "张明",
    relationship: "儿子",
    phone: "13876543210",
    email: "zhangming@example.com",
    isEmergencyContact: false,
    isPrimaryContact: false,
    preferences: {
      communicationMethod: "app",
      frequency: "weekly",
      language: "中文",
    },
    permissions: {
      viewMedicalRecords: true,
      receiveUpdates: true,
      makeDecisions: false,
    },
  },
  {
    id: "fm003",
    name: "王芳",
    relationship: "女儿",
    phone: "13765432109",
    email: "wangfang@example.com",
    isEmergencyContact: false,
    isPrimaryContact: false,
    preferences: {
      communicationMethod: "email",
      frequency: "weekly",
      language: "中文",
    },
    permissions: {
      viewMedicalRecords: false,
      receiveUpdates: true,
      makeDecisions: false,
    },
  },
]

const mockCommunicationRecords: CommunicationRecord[] = [
  {
    id: "cr001",
    type: "call",
    familyMemberId: "fm001",
    familyMemberName: "张丽",
    subject: "手术前沟通",
    content: "详细说明了手术流程、风险和注意事项，家属表示理解并同意手术方案。",
    timestamp: "2024-04-28 14:30",
    status: "delivered",
    priority: "high",
  },
  {
    id: "cr002",
    type: "email",
    familyMemberId: "fm002",
    familyMemberName: "张明",
    subject: "康复进展报告",
    content: "患者康复情况良好，各项指标稳定，预计下周可以出院。",
    timestamp: "2024-04-27 09:15",
    status: "read",
    priority: "medium",
  },
  {
    id: "cr003",
    type: "sms",
    familyMemberId: "fm003",
    familyMemberName: "王芳",
    subject: "复诊提醒",
    content: "提醒患者明天上午10点心内科复诊，请准时到达。",
    timestamp: "2024-04-26 18:00",
    status: "delivered",
    priority: "medium",
  },
]

const mockCommunicationPlans: CommunicationPlan[] = [
  {
    id: "cp001",
    title: "术后康复沟通计划",
    description: "定期向家属汇报患者术后康复进展情况",
    frequency: "每日",
    nextScheduled: "2024-04-29 10:00",
    participants: ["fm001", "fm002"],
    type: "routine",
    status: "active",
  },
  {
    id: "cp002",
    title: "出院指导教育",
    description: "为家属提供出院后护理指导和注意事项",
    frequency: "一次性",
    nextScheduled: "2024-05-02 14:00",
    participants: ["fm001", "fm002", "fm003"],
    type: "education",
    status: "active",
  },
]

export function FamilyCommunicationManagement({ patientId }: { patientId: string }) {
  const [activeTab, setActiveTab] = useState("members")
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null)
  const [newMessageOpen, setNewMessageOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "read":
        return "bg-purple-100 text-purple-800"
      case "replied":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "meeting":
        return <Users className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-medical-600" />
            家属沟通管理
          </CardTitle>
          <CardDescription>管理患者家属信息，建立有效的沟通机制</CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">家属信息</TabsTrigger>
          <TabsTrigger value="communications">沟通记录</TabsTrigger>
          <TabsTrigger value="plans">沟通计划</TabsTrigger>
          <TabsTrigger value="templates">消息模板</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockFamilyMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{member.name}</h3>
                        {member.isPrimaryContact && (
                          <Badge variant="default" className="text-xs">
                            主要联系人
                          </Badge>
                        )}
                        {member.isEmergencyContact && (
                          <Badge variant="destructive" className="text-xs">
                            紧急联系人
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{member.relationship}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">沟通偏好</div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        {member.preferences.communicationMethod === "phone" && "电话"}
                        {member.preferences.communicationMethod === "email" && "邮件"}
                        {member.preferences.communicationMethod === "sms" && "短信"}
                        {member.preferences.communicationMethod === "app" && "应用"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {member.preferences.frequency === "daily" && "每日"}
                        {member.preferences.frequency === "weekly" && "每周"}
                        {member.preferences.frequency === "monthly" && "每月"}
                        {member.preferences.frequency === "asNeeded" && "按需"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">权限设置</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        {member.permissions.viewMedicalRecords ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-gray-400" />
                        )}
                        <span>查看病历</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {member.permissions.receiveUpdates ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-gray-400" />
                        )}
                        <span>接收更新</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {member.permissions.makeDecisions ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-gray-400" />
                        )}
                        <span>参与决策</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <MedicalButton size="sm" variant="outline" className="flex-1">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      发消息
                    </MedicalButton>
                    <MedicalButton size="sm" variant="outline" className="flex-1">
                      <Phone className="h-3 w-3 mr-1" />
                      拨打
                    </MedicalButton>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed border-2 border-gray-300 hover:border-medical-400 transition-colors">
              <CardContent className="flex items-center justify-center h-full min-h-[200px]">
                <div className="text-center">
                  <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">添加家属成员</p>
                  <MedicalButton size="sm" variant="outline">
                    添加成员
                  </MedicalButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communications">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">沟通记录</h3>
              <Dialog open={newMessageOpen} onOpenChange={setNewMessageOpen}>
                <DialogTrigger asChild>
                  <MedicalButton>
                    <Send className="h-4 w-4 mr-2" />
                    发送消息
                  </MedicalButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>发送新消息</DialogTitle>
                    <DialogDescription>向患者家属发送消息或通知</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">收件人</Label>
                      <Select id="recipient">
                        <option value="">选择家属成员</option>
                        {mockFamilyMembers.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name} ({member.relationship})
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">沟通方式</Label>
                      <Select id="type">
                        <option value="email">邮件</option>
                        <option value="sms">短信</option>
                        <option value="call">电话</option>
                        <option value="app">应用通知</option>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">主题</Label>
                      <Input id="subject" placeholder="请输入消息主题" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">内容</Label>
                      <Textarea id="content" placeholder="请输入消息内容" rows={4} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">优先级</Label>
                      <Select id="priority">
                        <option value="low">低</option>
                        <option value="medium">中</option>
                        <option value="high">高</option>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <MedicalButton variant="outline" onClick={() => setNewMessageOpen(false)}>
                      取消
                    </MedicalButton>
                    <MedicalButton onClick={() => setNewMessageOpen(false)}>发送</MedicalButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {mockCommunicationRecords.map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-medical-50 rounded-lg">{getTypeIcon(record.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{record.subject}</h4>
                            <Badge className={getPriorityColor(record.priority)}>
                              {record.priority === "high" ? "高" : record.priority === "medium" ? "中" : "低"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{record.content}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>收件人: {record.familyMemberName}</span>
                            <span>{record.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status === "sent" && "已发送"}
                        {record.status === "delivered" && "已送达"}
                        {record.status === "read" && "已读"}
                        {record.status === "replied" && "已回复"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="plans">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">沟通计划</h3>
              <MedicalButton>
                <Plus className="h-4 w-4 mr-2" />
                创建计划
              </MedicalButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockCommunicationPlans.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.title}</CardTitle>
                      <Badge variant={plan.status === "active" ? "default" : "secondary"}>
                        {plan.status === "active" ? "进行中" : plan.status === "paused" ? "暂停" : "已完成"}
                      </Badge>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>频率: {plan.frequency}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>下次执行: {plan.nextScheduled}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>参与人数: {plan.participants.length}人</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">
                        {plan.type === "routine" && "常规沟通"}
                        {plan.type === "emergency" && "紧急沟通"}
                        {plan.type === "education" && "健康教育"}
                        {plan.type === "support" && "心理支持"}
                      </Badge>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <MedicalButton size="sm" variant="outline" className="flex-1">
                        编辑
                      </MedicalButton>
                      <MedicalButton size="sm" variant="outline" className="flex-1">
                        执行
                      </MedicalButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">消息模板</h3>
              <MedicalButton>
                <Plus className="h-4 w-4 mr-2" />
                创建模板
              </MedicalButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">手术前通知</CardTitle>
                  <CardDescription>手术前向家属发送的标准通知模板</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    <p>尊敬的家属，您好！</p>
                    <p className="mt-2">
                      患者 [患者姓名] 将于 [手术日期] 进行 [手术名称]。请您在手术前1小时到达医院，配合完成相关准备工作。
                    </p>
                    <p className="mt-2">如有疑问，请及时联系我们。</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <MedicalButton size="sm" variant="outline">
                      编辑
                    </MedicalButton>
                    <MedicalButton size="sm" variant="outline">
                      使用
                    </MedicalButton>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">康复进展报告</CardTitle>
                  <CardDescription>定期向家属汇报患者康复情况的模板</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    <p>亲爱的家属，</p>
                    <p className="mt-2">
                      患者 [患者姓名] 目前康复情况良好，各项生命体征稳定。今日主要康复活动包括：[康复内容]。
                    </p>
                    <p className="mt-2">预计康复进度：[进度说明]</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <MedicalButton size="sm" variant="outline">
                      编辑
                    </MedicalButton>
                    <MedicalButton size="sm" variant="outline">
                      使用
                    </MedicalButton>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">出院指导</CardTitle>
                  <CardDescription>患者出院时的家属指导模板</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    <p>恭喜！患者 [患者姓名] 即将出院。</p>
                    <p className="mt-2">出院后请注意：</p>
                    <ul className="mt-1 ml-4 list-disc">
                      <li>按时服药</li>
                      <li>定期复诊</li>
                      <li>注意休息</li>
                      <li>合理饮食</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <MedicalButton size="sm" variant="outline">
                      编辑
                    </MedicalButton>
                    <MedicalButton size="sm" variant="outline">
                      使用
                    </MedicalButton>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">紧急情况通知</CardTitle>
                  <CardDescription>紧急情况下的家属通知模板</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-red-50 p-3 rounded-lg text-sm border border-red-200">
                    <p className="font-medium text-red-800">紧急通知</p>
                    <p className="mt-2">患者 [患者姓名] 出现紧急情况，请您立即前往医院 [科室] 。</p>
                    <p className="mt-2">联系电话：[联系电话]</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <MedicalButton size="sm" variant="outline">
                      编辑
                    </MedicalButton>
                    <MedicalButton size="sm" variant="outline">
                      使用
                    </MedicalButton>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
