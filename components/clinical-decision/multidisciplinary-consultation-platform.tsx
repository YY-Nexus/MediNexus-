"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  MessageSquare,
  Video,
  Clock,
  CheckCircle2,
  Send,
  Paperclip,
  UserPlus,
  FileText,
  Star,
  ThumbsUp,
  ThumbsDown,
  Search,
  Bell,
  Plus,
  Mic,
  Share2,
  Download,
  Brain,
  AlertTriangle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 专家信息
interface Expert {
  id: string
  name: string
  title: string
  department: string
  specialties: string[]
  avatar: string
  status: "online" | "offline" | "busy"
  rating: number
  experience: number
  languages: string[]
  availability: {
    nextAvailable: string
    timezone: string
  }
  aiAssistanceLevel: "基础" | "中级" | "高级"
  consultationHistory: {
    totalConsultations: number
    successRate: number
    averageResponseTime: number // 分钟
    patientSatisfaction: number // 0-5
  }
  expertise: {
    primarySpecialties: string[]
    subSpecialties: string[]
    researchAreas: string[]
    certifications: string[]
  }
  workload: {
    currentCases: number
    maxCapacity: number
    urgentCasesHandled: number
  }
  collaborationPreferences: {
    preferredTeamSize: number
    communicationStyle: "正式" | "非正式" | "混合"
    decisionMakingStyle: "独立" | "协作" | "共识"
  }
}

// 会诊类型
interface Consultation {
  id: string
  title: string
  patientCase: string
  initiator: Expert
  participants: Expert[]
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  type: "urgent" | "routine" | "second-opinion"
  priority: "high" | "medium" | "low"
  scheduledTime: string
  duration: number
  topics: string[]
  attachments: {
    id: string
    name: string
    type: string
    size: string
  }[]
  messages: ConsultationMessage[]
  decisions: {
    decision: string
    participants: string[]
    timestamp: string
    confidence: number
  }[]
  followUp?: {
    required: boolean
    scheduledDate?: string
    assignedTo?: string
  }
  aiModeration: {
    conflictDetection: boolean
    consensusTracking: number // 0-100
    recommendationSynthesis: string
    nextSteps: string[]
  }
  smartFeatures: {
    autoTranscription: boolean
    realTimeTranslation: boolean
    knowledgeBaseIntegration: boolean
    evidenceRecommendations: string[]
  }
  qualityMetrics: {
    participationRate: number // 0-100
    decisionQuality: number // 0-100
    timeEfficiency: number // 0-100
    patientCenteredness: number // 0-100
  }
  outcomeTracking: {
    implementationRate: number // 0-100
    patientAdherence: number // 0-100
    clinicalOutcomes: string[]
    followUpRequired: boolean
  }
}

// 会诊消息
interface ConsultationMessage {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
  type: "text" | "voice" | "image" | "file" | "decision"
  attachments?: {
    id: string
    name: string
    url: string
  }[]
  reactions?: {
    userId: string
    type: "like" | "agree" | "disagree"
  }[]
}

interface MultidisciplinaryConsultationPlatformProps {
  patientId: string
  caseId?: string
}

export function MultidisciplinaryConsultationPlatform({
  patientId,
  caseId,
}: MultidisciplinaryConsultationPlatformProps) {
  const [activeTab, setActiveTab] = useState("consultations")
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [experts, setExpert] = useState<Expert[]>([])
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [showNewConsultationDialog, setShowNewConsultationDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)

  // 初始化数据
  useEffect(() => {
    loadMockData()
  }, [patientId])

  const loadMockData = () => {
    // 模拟专家数据
    const mockExperts: Expert[] = [
      {
        id: "expert-1",
        name: "李心脏科教授",
        title: "主任医师",
        department: "心内科",
        specialties: ["冠心病", "心律失常", "心力衰竭"],
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        rating: 4.9,
        experience: 25,
        languages: ["中文", "英文"],
        availability: {
          nextAvailable: "今天 14:00",
          timezone: "GMT+8",
        },
        aiAssistanceLevel: "高级",
        consultationHistory: {
          totalConsultations: 500,
          successRate: 95,
          averageResponseTime: 5,
          patientSatisfaction: 4.8,
        },
        expertise: {
          primarySpecialties: ["冠心病介入治疗"],
          subSpecialties: ["心血管影像学", "心脏康复"],
          researchAreas: ["新型支架研发", "远程心电监护"],
          certifications: ["美国心脏协会认证", "欧洲心脏病学会会员"],
        },
        workload: {
          currentCases: 15,
          maxCapacity: 20,
          urgentCasesHandled: 5,
        },
        collaborationPreferences: {
          preferredTeamSize: 5,
          communicationStyle: "正式",
          decisionMakingStyle: "协作",
        },
      },
      {
        id: "expert-2",
        name: "王内分泌主任",
        title: "副主任医师",
        department: "内分泌科",
        specialties: ["糖尿病", "甲状腺疾病", "肥胖症"],
        avatar: "/placeholder.svg?height=40&width=40",
        status: "busy",
        rating: 4.8,
        experience: 18,
        languages: ["中文"],
        availability: {
          nextAvailable: "明天 09:00",
          timezone: "GMT+8",
        },
        aiAssistanceLevel: "中级",
        consultationHistory: {
          totalConsultations: 400,
          successRate: 92,
          averageResponseTime: 8,
          patientSatisfaction: 4.5,
        },
        expertise: {
          primarySpecialties: ["糖尿病管理"],
          subSpecialties: ["代谢综合征", "内分泌肿瘤"],
          researchAreas: ["新型降糖药物临床试验", "糖尿病视网膜病变早期筛查"],
          certifications: ["中华医学会内分泌学分会会员"],
        },
        workload: {
          currentCases: 18,
          maxCapacity: 25,
          urgentCasesHandled: 3,
        },
        collaborationPreferences: {
          preferredTeamSize: 4,
          communicationStyle: "混合",
          decisionMakingStyle: "共识",
        },
      },
      {
        id: "expert-3",
        name: "张神经科专家",
        title: "主任医师",
        department: "神经内科",
        specialties: ["脑血管病", "帕金森病", "癫痫"],
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
        rating: 4.7,
        experience: 22,
        languages: ["中文", "德文"],
        availability: {
          nextAvailable: "后天 10:00",
          timezone: "GMT+8",
        },
        aiAssistanceLevel: "基础",
        consultationHistory: {
          totalConsultations: 350,
          successRate: 90,
          averageResponseTime: 10,
          patientSatisfaction: 4.3,
        },
        expertise: {
          primarySpecialties: ["脑卒中康复"],
          subSpecialties: ["神经免疫疾病", "睡眠障碍"],
          researchAreas: ["脑卒中后认知功能障碍干预", "帕金森病运动障碍评估"],
          certifications: ["中国医师协会神经内科医师分会会员"],
        },
        workload: {
          currentCases: 12,
          maxCapacity: 15,
          urgentCasesHandled: 2,
        },
        collaborationPreferences: {
          preferredTeamSize: 3,
          communicationStyle: "非正式",
          decisionMakingStyle: "独立",
        },
      },
      {
        id: "expert-4",
        name: "赵影像科医生",
        title: "主治医师",
        department: "影像科",
        specialties: ["CT诊断", "MRI诊断", "超声诊断"],
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        rating: 4.6,
        experience: 12,
        languages: ["中文", "日文"],
        availability: {
          nextAvailable: "今天 16:30",
          timezone: "GMT+8",
        },
        aiAssistanceLevel: "中级",
        consultationHistory: {
          totalConsultations: 600,
          successRate: 98,
          averageResponseTime: 7,
          patientSatisfaction: 4.6,
        },
        expertise: {
          primarySpecialties: ["肿瘤影像诊断"],
          subSpecialties: ["心血管影像", "神经影像"],
          researchAreas: ["人工智能辅助影像诊断", "低剂量CT扫描技术"],
          certifications: ["北美放射学会会员"],
        },
        workload: {
          currentCases: 20,
          maxCapacity: 30,
          urgentCasesHandled: 8,
        },
        collaborationPreferences: {
          preferredTeamSize: 4,
          communicationStyle: "混合",
          decisionMakingStyle: "协作",
        },
      },
    ]

    // 模拟会诊数据
    const mockConsultations: Consultation[] = [
      {
        id: "consultation-1",
        title: "复杂冠心病合并糖尿病病例讨论",
        patientCase: "患者男性，65岁，冠心病合并2型糖尿病，症状复杂，需要多学科协作制定治疗方案",
        initiator: mockExperts[0],
        participants: [mockExperts[0], mockExperts[1], mockExperts[3]],
        status: "scheduled",
        type: "routine",
        priority: "high",
        scheduledTime: "2023-09-25 14:00",
        duration: 60,
        topics: ["手术指征评估", "术前风险评估", "药物调整方案"],
        attachments: [
          {
            id: "attach-1",
            name: "冠脉造影报告.pdf",
            type: "PDF",
            size: "2.1MB",
          },
          {
            id: "attach-2",
            name: "糖尿病病历.docx",
            type: "Word",
            size: "856KB",
          },
        ],
        messages: [
          {
            id: "msg-1",
            senderId: "expert-1",
            senderName: "李心脏科教授",
            senderAvatar: "/placeholder.svg?height=40&width=40",
            content: "各位同事好，这是一个比较复杂的病例，患者冠脉病变严重，同时合并糖尿病，需要综合评估治疗方案。",
            timestamp: "2023-09-24 16:30",
            type: "text",
            reactions: [
              { userId: "expert-1", type: "like" },
              { userId: "expert-3", type: "agree" },
            ],
          },
          {
            id: "msg-2",
            senderId: "expert-2",
            senderName: "王内分泌主任",
            senderAvatar: "/placeholder.svg?height=40&width=40",
            content: "我看了患者的糖尿病指标，糖化血红蛋白8.2%，控制不理想。建议术前先优化血糖控制。",
            timestamp: "2023-09-24 17:15",
            type: "text",
            reactions: [{ userId: "expert-1", type: "agree" }],
          },
        ],
        decisions: [],
        followUp: {
          required: true,
          scheduledDate: "2023-10-02",
          assignedTo: "expert-1",
        },
        aiModeration: {
          conflictDetection: true,
          consensusTracking: 75,
          recommendationSynthesis: "AI建议：综合考虑患者病情，建议优先控制血糖，再评估冠脉介入治疗的风险与收益。",
          nextSteps: ["优化血糖控制", "复查冠脉造影", "评估肾功能"],
        },
        smartFeatures: {
          autoTranscription: true,
          realTimeTranslation: false,
          knowledgeBaseIntegration: true,
          evidenceRecommendations: ["2023 ESC 冠心病管理指南", "ADA 糖尿病诊疗标准"],
        },
        qualityMetrics: {
          participationRate: 85,
          decisionQuality: 92,
          timeEfficiency: 78,
          patientCenteredness: 95,
        },
        outcomeTracking: {
          implementationRate: 90,
          patientAdherence: 88,
          clinicalOutcomes: ["血糖控制达标", "心绞痛症状缓解"],
          followUpRequired: true,
        },
      },
      {
        id: "consultation-2",
        title: "疑难神经系统疾病会诊",
        patientCase: "患者女性，42岁，反复头痛伴认知功能下降，影像学检查异常",
        initiator: mockExperts[2],
        participants: [mockExperts[2], mockExperts[3]],
        status: "in-progress",
        type: "urgent",
        priority: "high",
        scheduledTime: "2023-09-24 15:00",
        duration: 45,
        topics: ["影像学分析", "鉴别诊断", "进一步检查建议"],
        attachments: [
          {
            id: "attach-3",
            name: "头颅MRI.dicom",
            type: "DICOM",
            size: "15.6MB",
          },
        ],
        messages: [],
        decisions: [
          {
            decision: "建议行脑脊液检查排除炎症性疾病",
            participants: ["expert-2", "expert-3"],
            timestamp: "2023-09-24 15:30",
            confidence: 85,
          },
        ],
        aiModeration: {
          conflictDetection: false,
          consensusTracking: 90,
          recommendationSynthesis: "AI建议：结合影像学和临床表现，考虑自身免疫性脑炎可能性。",
          nextSteps: ["脑脊液检查", "自身抗体检测", "神经心理评估"],
        },
        smartFeatures: {
          autoTranscription: true,
          realTimeTranslation: true,
          knowledgeBaseIntegration: true,
          evidenceRecommendations: ["自身免疫性脑炎诊疗共识"],
        },
        qualityMetrics: {
          participationRate: 92,
          decisionQuality: 95,
          timeEfficiency: 85,
          patientCenteredness: 98,
        },
        outcomeTracking: {
          implementationRate: 95,
          patientAdherence: 92,
          clinicalOutcomes: ["炎症指标下降", "认知功能改善"],
          followUpRequired: true,
        },
      },
    ]

    setExpert(mockExperts)
    setConsultations(mockConsultations)
    setLoading(false)
  }

  // 发送消息
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConsultation) return

    const message: ConsultationMessage = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      senderName: "当前用户",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      content: newMessage,
      timestamp: new Date().toLocaleString(),
      type: "text",
    }

    setConsultations((prev) =>
      prev.map((consultation) =>
        consultation.id === selectedConsultation.id
          ? {
              ...consultation,
              messages: [...consultation.messages, message],
            }
          : consultation,
      ),
    )

    setNewMessage("")
  }

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取优先级颜色
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

  // 获取在线状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      case "busy":
        return <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
      case "offline":
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
    }
  }

  // 过滤会诊
  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch = consultation.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || consultation.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const findOptimalExpertTeam = (caseDetails: any, availableExperts: Expert[]) => {
    // 基于病例复杂度、专业需求、专家能力的智能匹配
    const requiredSpecialties = extractRequiredSpecialties(caseDetails)
    const caseComplexity = assessCaseComplexity(caseDetails)
    const urgencyLevel = determineUrgencyLevel(caseDetails)

    // 专家评分算法
    const scoreExpert = (expert: Expert) => {
      let score = 0

      // 专业匹配度 (40%)
      const specialtyMatch = calculateSpecialtyMatch(expert.expertise, requiredSpecialties)
      score += specialtyMatch * 0.4

      // 可用性 (25%)
      const availability = calculateAvailability(expert.workload, urgencyLevel)
      score += availability * 0.25

      // 历史表现 (20%)
      const performance = expert.consultationHistory.successRate / 100
      score += performance * 0.2

      // AI协作能力 (15%)
      const aiCompatibility = getAICompatibilityScore(expert.aiAssistanceLevel)
      score += aiCompatibility * 0.15

      return score
    }

    return availableExperts
      .map((expert) => ({ expert, score: scoreExpert(expert) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, getOptimalTeamSize(caseComplexity))
      .map((item) => item.expert)
  }

  const extractRequiredSpecialties = (caseDetails: any) => {
    return [""]
  }

  const assessCaseComplexity = (caseDetails: any) => {
    return 1
  }

  const determineUrgencyLevel = (caseDetails: any) => {
    return 1
  }

  const calculateSpecialtyMatch = (expertExpertise: any, requiredSpecialties: any) => {
    return 1
  }

  const calculateAvailability = (expertWorkload: any, urgencyLevel: any) => {
    return 1
  }

  const getAICompatibilityScore = (aiAssistanceLevel: any) => {
    return 1
  }

  const getOptimalTeamSize = (caseComplexity: any) => {
    return 1
  }

  if (loading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            多学科会诊平台
          </CardTitle>
          <CardDescription>正在加载会诊数据...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            多学科会诊平台
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-1" />
              通知
            </Button>
            <Dialog open={showNewConsultationDialog} onOpenChange={setShowNewConsultationDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  发起会诊
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>发起新会诊</DialogTitle>
                  <DialogDescription>创建多学科会诊讨论</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="title">会诊主题</Label>
                    <Input id="title" placeholder="输入会诊主题" />
                  </div>
                  <div>
                    <Label htmlFor="type">会诊类型</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择会诊类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">常规会诊</SelectItem>
                        <SelectItem value="urgent">紧急会诊</SelectItem>
                        <SelectItem value="second-opinion">二次意见</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">病例描述</Label>
                    <Textarea id="description" placeholder="详细描述病例情况" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewConsultationDialog(false)}>
                    取消
                  </Button>
                  <Button onClick={() => setShowNewConsultationDialog(false)}>创建会诊</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardTitle>
        <CardDescription>协作进行多学科专家会诊，提供全面的医疗决策支持</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="consultations">会诊列表</TabsTrigger>
              <TabsTrigger value="experts">专家团队</TabsTrigger>
              <TabsTrigger value="chat">实时讨论</TabsTrigger>
            </TabsList>
          </div>

          {/* 会诊列表选项卡 */}
          <TabsContent value="consultations" className="mt-4 px-6">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索会诊..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="scheduled">已安排</SelectItem>
                  <SelectItem value="in-progress">进行中</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {filteredConsultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedConsultation(consultation)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-lg mb-1">{consultation.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{consultation.patientCase}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(consultation.status)}>
                          {consultation.status === "scheduled" && "已安排"}
                          {consultation.status === "in-progress" && "进行中"}
                          {consultation.status === "completed" && "已完成"}
                          {consultation.status === "cancelled" && "已取消"}
                        </Badge>
                        <Badge className={getPriorityColor(consultation.priority)}>
                          {consultation.priority === "high" && "高优先级"}
                          {consultation.priority === "medium" && "中优先级"}
                          {consultation.priority === "low" && "低优先级"}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{consultation.scheduledTime}</span>
                        <span className="text-sm text-gray-500">({consultation.duration}分钟)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{consultation.participants.length}位专家</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {consultation.participants.slice(0, 3).map((participant) => (
                          <Avatar key={participant.id} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                            <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {consultation.participants.length > 3 && (
                          <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-background flex items-center justify-center text-xs">
                            +{consultation.participants.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {consultation.status === "scheduled" && (
                          <Button variant="outline" size="sm">
                            <Video className="h-4 w-4 mr-1" />
                            加入会诊
                          </Button>
                        )}
                        {consultation.status === "in-progress" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Video className="h-4 w-4 mr-1" />
                            正在进行
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          讨论({consultation.messages.length})
                        </Button>
                      </div>
                    </div>

                    {consultation.topics.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="text-xs text-gray-500 mb-1">讨论主题：</div>
                        <div className="flex flex-wrap gap-1">
                          {consultation.topics.map((topic, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {consultation.qualityMetrics && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="text-xs text-gray-500 mb-2">会诊质量指标</div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="text-center">
                            <div className="text-xs text-gray-500">参与度</div>
                            <div className="text-sm font-medium text-blue-600">
                              {consultation.qualityMetrics.participationRate}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">决策质量</div>
                            <div className="text-sm font-medium text-green-600">
                              {consultation.qualityMetrics.decisionQuality}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">时间效率</div>
                            <div className="text-sm font-medium text-orange-600">
                              {consultation.qualityMetrics.timeEfficiency}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">患者中心</div>
                            <div className="text-sm font-medium text-purple-600">
                              {consultation.qualityMetrics.patientCenteredness}%
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* 专家团队选项卡 */}
          <TabsContent value="experts" className="mt-4 px-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">可邀请专家</h3>
              <p className="text-sm text-gray-600">选择相关专业的专家参与会诊讨论</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experts.map((expert) => (
                <div key={expert.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={expert.avatar || "/placeholder.svg"} alt={expert.name} />
                        <AvatarFallback>{expert.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1">{getStatusIcon(expert.status)}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">{expert.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{expert.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {expert.title} · {expert.department}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">{expert.experience}年临床经验</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {expert.specialties.slice(0, 2).map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {expert.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{expert.specialties.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">下次可约：{expert.availability.nextAvailable}</div>
                        <Button size="sm" variant="outline">
                          <UserPlus className="h-4 w-4 mr-1" />
                          邀请
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* 实时讨论选项卡 */}
          <TabsContent value="chat" className="mt-4 px-6">
            {selectedConsultation ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{selectedConsultation.title}</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      分享屏幕
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4 mr-1" />
                      视频通话
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg">
                  <ScrollArea className="h-96 p-4">
                    <div className="space-y-4">
                      {selectedConsultation.messages.map((message) => (
                        <div key={message.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                            <AvatarFallback>{message.senderName.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{message.senderName}</span>
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-sm">{message.content}</p>
                            </div>
                            {message.reactions && message.reactions.length > 0 && (
                              <div className="flex gap-1 mt-2">
                                {message.reactions.map((reaction, idx) => (
                                  <Button key={idx} variant="outline" size="sm" className="h-6 px-2">
                                    {reaction.type === "like" && <ThumbsUp className="h-3 w-3" />}
                                    {reaction.type === "agree" && <CheckCircle2 className="h-3 w-3" />}
                                    {reaction.type === "disagree" && <ThumbsDown className="h-3 w-3" />}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <Separator />

                  <div className="p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="输入消息..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1"
                      />
                      <Button size="sm" variant="outline">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={sendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-blue-600" />
                    AI辅助决策
                  </h4>

                  {selectedConsultation.aiModeration && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">共识度</span>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedConsultation.aiModeration.consensusTracking} className="w-20 h-2" />
                          <span className="text-sm font-medium">
                            {selectedConsultation.aiModeration.consensusTracking}%
                          </span>
                        </div>
                      </div>

                      {selectedConsultation.aiModeration.conflictDetection && (
                        <Alert className="bg-yellow-50 border-yellow-200">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            检测到专家意见分歧，建议进行结构化讨论
                          </AlertDescription>
                        </Alert>
                      )}

                      {selectedConsultation.aiModeration.recommendationSynthesis && (
                        <div className="bg-white rounded-lg p-3 border">
                          <div className="text-sm font-medium mb-1">AI综合建议</div>
                          <p className="text-sm text-gray-700">
                            {selectedConsultation.aiModeration.recommendationSynthesis}
                          </p>
                        </div>
                      )}

                      {selectedConsultation.aiModeration.nextSteps.length > 0 && (
                        <div>
                          <div className="text-sm font-medium mb-2">建议下一步行动</div>
                          <div className="space-y-1">
                            {selectedConsultation.aiModeration.nextSteps.map((step, idx) => (
                              <div key={idx} className="flex items-center text-sm">
                                <CheckCircle2 className="h-3 w-3 text-green-500 mr-2" />
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {selectedConsultation.decisions.length > 0 && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">会诊决议</h4>
                    <div className="space-y-3">
                      {selectedConsultation.decisions.map((decision, idx) => (
                        <div key={idx} className="bg-blue-50 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-medium">{decision.decision}</p>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              {decision.confidence}% 一致性
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500">
                            参与决议：{decision.participants.join("、")} · {decision.timestamp}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedConsultation.attachments.length > 0 && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">相关资料</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedConsultation.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center gap-2 p-2 border rounded">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{attachment.name}</div>
                            <div className="text-xs text-gray-500">
                              {attachment.type} · {attachment.size}
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">选择会诊进行讨论</h3>
                <p className="text-gray-500 max-w-md">从会诊列表中选择一个会诊，开始与专家团队进行实时讨论</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
