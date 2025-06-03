"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Calendar, MessageSquare, Plus, Search } from "lucide-react"

interface EthicsApplication {
  id: string
  title: string
  applicant: string
  institution: string
  submissionDate: string
  reviewType: string
  status: string
  priority: string
  currentStage: string
  progress: number
  reviewers: Reviewer[]
  documents: EthicsDocument[]
  timeline: TimelineEvent[]
  comments: Comment[]
  decision?: Decision
  nextMeeting?: string
}

interface Reviewer {
  id: string
  name: string
  title: string
  expertise: string[]
  role: string
  status: string
  reviewDate?: string
  recommendation?: string
}

interface EthicsDocument {
  id: string
  name: string
  type: string
  version: string
  uploadDate: string
  status: string
  required: boolean
}

interface TimelineEvent {
  id: string
  date: string
  event: string
  description: string
  status: string
  actor: string
}

interface Comment {
  id: string
  reviewer: string
  date: string
  type: string
  content: string
  response?: string
  resolved: boolean
}

interface Decision {
  result: string
  date: string
  conditions?: string[]
  validUntil?: string
  reviewPeriod?: number
}

export default function EthicsReviewWorkflow() {
  const [applications, setApplications] = useState<EthicsApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<EthicsApplication | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟数据加载
    const mockApplications: EthicsApplication[] = [
      {
        id: "EA001",
        title: "新型抗癌药物III期临床试验伦理审查",
        applicant: "张教授",
        institution: "北京协和医院",
        submissionDate: "2024-01-15",
        reviewType: "full_review",
        status: "under_review",
        priority: "high",
        currentStage: "expert_review",
        progress: 65,
        reviewers: [
          {
            id: "R001",
            name: "李伦理专家",
            title: "伦理委员会主任",
            expertise: ["医学伦理", "临床试验"],
            role: "primary_reviewer",
            status: "completed",
            reviewDate: "2024-01-20",
            recommendation: "approve_with_conditions",
          },
          {
            id: "R002",
            name: "王法律专家",
            title: "法律顾问",
            expertise: ["医疗法律", "患者权益"],
            role: "secondary_reviewer",
            status: "in_progress",
            reviewDate: undefined,
            recommendation: undefined,
          },
        ],
        documents: [
          {
            id: "D001",
            name: "研究方案",
            type: "protocol",
            version: "2.1",
            uploadDate: "2024-01-15",
            status: "approved",
            required: true,
          },
          {
            id: "D002",
            name: "知情同意书",
            type: "informed_consent",
            version: "1.0",
            uploadDate: "2024-01-15",
            status: "needs_revision",
            required: true,
          },
          {
            id: "D003",
            name: "研究者简历",
            type: "cv",
            version: "1.0",
            uploadDate: "2024-01-15",
            status: "approved",
            required: true,
          },
        ],
        timeline: [
          {
            id: "T001",
            date: "2024-01-15",
            event: "申请提交",
            description: "申请人提交完整的伦理审查申请",
            status: "completed",
            actor: "张教授",
          },
          {
            id: "T002",
            date: "2024-01-16",
            event: "初步审查",
            description: "秘书处完成材料完整性检查",
            status: "completed",
            actor: "伦理委员会秘书",
          },
          {
            id: "T003",
            date: "2024-01-17",
            event: "分配审查员",
            description: "指定主要和次要审查员",
            status: "completed",
            actor: "伦理委员会主任",
          },
          {
            id: "T004",
            date: "2024-01-20",
            event: "专家审查",
            description: "主要审查员完成审查",
            status: "completed",
            actor: "李伦理专家",
          },
          {
            id: "T005",
            date: "2024-01-25",
            event: "委员会会议",
            description: "伦理委员会会议讨论",
            status: "scheduled",
            actor: "伦理委员会",
          },
        ],
        comments: [
          {
            id: "C001",
            reviewer: "李伦理专家",
            date: "2024-01-20",
            type: "major",
            content: "知情同意书中关于风险的描述需要更加详细和通俗易懂",
            response: undefined,
            resolved: false,
          },
          {
            id: "C002",
            reviewer: "李伦理专家",
            date: "2024-01-20",
            type: "minor",
            content: "建议在研究方案中增加数据安全保护措施的描述",
            response: undefined,
            resolved: false,
          },
        ],
        nextMeeting: "2024-01-25",
      },
      {
        id: "EA002",
        title: "糖尿病患者生活质量调查研究",
        applicant: "李医生",
        institution: "上海华山医院",
        submissionDate: "2024-01-18",
        reviewType: "expedited_review",
        status: "approved",
        priority: "medium",
        currentStage: "completed",
        progress: 100,
        reviewers: [
          {
            id: "R003",
            name: "陈伦理专家",
            title: "伦理委员会委员",
            expertise: ["社会科学", "调查研究"],
            role: "expedited_reviewer",
            status: "completed",
            reviewDate: "2024-01-22",
            recommendation: "approve",
          },
        ],
        documents: [
          {
            id: "D004",
            name: "研究方案",
            type: "protocol",
            version: "1.0",
            uploadDate: "2024-01-18",
            status: "approved",
            required: true,
          },
          {
            id: "D005",
            name: "调查问卷",
            type: "questionnaire",
            version: "1.0",
            uploadDate: "2024-01-18",
            status: "approved",
            required: true,
          },
        ],
        timeline: [
          {
            id: "T006",
            date: "2024-01-18",
            event: "申请提交",
            description: "申请人提交快速审查申请",
            status: "completed",
            actor: "李医生",
          },
          {
            id: "T007",
            date: "2024-01-22",
            event: "快速审查完成",
            description: "审查员完成快速审查并批准",
            status: "completed",
            actor: "陈伦理专家",
          },
        ],
        comments: [],
        decision: {
          result: "approved",
          date: "2024-01-22",
          validUntil: "2025-01-22",
          reviewPeriod: 12,
        },
      },
    ]

    setApplications(mockApplications)
    setLoading(false)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "needs_revision":
        return "bg-orange-100 text-orange-800"
      case "withdrawn":
        return "bg-gray-100 text-gray-800"
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "submitted":
        return "已提交"
      case "under_review":
        return "审查中"
      case "approved":
        return "已批准"
      case "rejected":
        return "已拒绝"
      case "needs_revision":
        return "需修改"
      case "withdrawn":
        return "已撤回"
      default:
        return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "高"
      case "medium":
        return "中"
      case "low":
        return "低"
      default:
        return priority
    }
  }

  const getReviewTypeLabel = (type: string) => {
    switch (type) {
      case "full_review":
        return "全面审查"
      case "expedited_review":
        return "快速审查"
      case "exempt":
        return "豁免审查"
      default:
        return type
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesPriority = priorityFilter === "all" || app.priority === priorityFilter
    return matchesStatus && matchesPriority
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">伦理审查流程</h2>
          <p className="text-gray-600">研究伦理审查申请和流程管理</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            搜索申请
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新建申请
          </Button>
        </div>
      </div>

      {/* 筛选器 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>状态筛选</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="submitted">已提交</SelectItem>
                  <SelectItem value="under_review">审查中</SelectItem>
                  <SelectItem value="approved">已批准</SelectItem>
                  <SelectItem value="rejected">已拒绝</SelectItem>
                  <SelectItem value="needs_revision">需修改</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>优先级筛选</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="选择优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部优先级</SelectItem>
                  <SelectItem value="high">高</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="low">低</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 申请列表 */}
      <div className="grid gap-6">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{application.title}</CardTitle>
                    <Badge className={getStatusColor(application.status)}>{getStatusLabel(application.status)}</Badge>
                    <Badge className={getPriorityColor(application.priority)}>
                      优先级：{getPriorityLabel(application.priority)}
                    </Badge>
                    <Badge variant="outline">{getReviewTypeLabel(application.reviewType)}</Badge>
                  </div>
                  <CardDescription>
                    申请人：{application.applicant} | 机构：{application.institution}
                  </CardDescription>
                  <div className="text-sm text-gray-500">
                    提交日期：{application.submissionDate} | 当前阶段：{application.currentStage}
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedApplication(application)}>
                      查看详情
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{application.title}</DialogTitle>
                      <DialogDescription>申请编号：{application.id}</DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="overview">概览</TabsTrigger>
                        <TabsTrigger value="documents">文档</TabsTrigger>
                        <TabsTrigger value="reviewers">审查员</TabsTrigger>
                        <TabsTrigger value="timeline">时间线</TabsTrigger>
                        <TabsTrigger value="comments">意见</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">申请信息</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">申请人：</span>
                                <span>{application.applicant}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">机构：</span>
                                <span>{application.institution}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">提交日期：</span>
                                <span>{application.submissionDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">审查类型：</span>
                                <span>{getReviewTypeLabel(application.reviewType)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">当前状态：</span>
                                <Badge className={getStatusColor(application.status)}>
                                  {getStatusLabel(application.status)}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">审查进度</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span>整体进度</span>
                                  <span>{application.progress}%</span>
                                </div>
                                <Progress value={application.progress} className="h-2" />
                                <div className="text-sm text-gray-600">当前阶段：{application.currentStage}</div>
                                {application.nextMeeting && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4" />
                                    <span>下次会议：{application.nextMeeting}</span>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {application.decision && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                审查决定
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-semibold">决定结果</Label>
                                  <p className="text-green-600 font-medium">
                                    {application.decision.result === "approved" ? "批准" : application.decision.result}
                                  </p>
                                </div>
                                <div>
                                  <Label className="font-semibold">决定日期</Label>
                                  <p>{application.decision.date}</p>
                                </div>
                                {application.decision.validUntil && (
                                  <div>
                                    <Label className="font-semibold">有效期至</Label>
                                    <p>{application.decision.validUntil}</p>
                                  </div>
                                )}
                                {application.decision.reviewPeriod && (
                                  <div>
                                    <Label className="font-semibold">复审周期</Label>
                                    <p>{application.decision.reviewPeriod}个月</p>
                                  </div>
                                )}
                              </div>
                              {application.decision.conditions && (
                                <div className="mt-4">
                                  <Label className="font-semibold">批准条件</Label>
                                  <ul className="list-disc list-inside mt-1 text-sm">
                                    {application.decision.conditions.map((condition, index) => (
                                      <li key={index}>{condition}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>

                      <TabsContent value="documents" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">申请文档</h3>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            上传文档
                          </Button>
                        </div>

                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>文档名称</TableHead>
                              <TableHead>类型</TableHead>
                              <TableHead>版本</TableHead>
                              <TableHead>上传日期</TableHead>
                              <TableHead>状态</TableHead>
                              <TableHead>必需</TableHead>
                              <TableHead>操作</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {application.documents.map((doc) => (
                              <TableRow key={doc.id}>
                                <TableCell className="font-medium">{doc.name}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {doc.type === "protocol"
                                      ? "研究方案"
                                      : doc.type === "informed_consent"
                                        ? "知情同意书"
                                        : doc.type === "cv"
                                          ? "简历"
                                          : doc.type === "questionnaire"
                                            ? "问卷"
                                            : doc.type}
                                  </Badge>
                                </TableCell>
                                <TableCell>{doc.version}</TableCell>
                                <TableCell>{doc.uploadDate}</TableCell>
                                <TableCell>
                                  <Badge
                                    className={
                                      doc.status === "approved"
                                        ? "bg-green-100 text-green-800"
                                        : doc.status === "needs_revision"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-yellow-100 text-yellow-800"
                                    }
                                  >
                                    {doc.status === "approved"
                                      ? "已批准"
                                      : doc.status === "needs_revision"
                                        ? "需修改"
                                        : "审查中"}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {doc.required ? (
                                    <Badge variant="destructive">必需</Badge>
                                  ) : (
                                    <Badge variant="secondary">可选</Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      查看
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      下载
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TabsContent>

                      <TabsContent value="reviewers" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">审查员</h3>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            指定审查员
                          </Button>
                        </div>

                        <div className="grid gap-4">
                          {application.reviewers.map((reviewer) => (
                            <Card key={reviewer.id}>
                              <CardContent className="pt-6">
                                <div className="flex justify-between items-start">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-semibold">{reviewer.name}</h4>
                                      <Badge
                                        className={
                                          reviewer.role === "primary_reviewer"
                                            ? "bg-purple-100 text-purple-800"
                                            : reviewer.role === "secondary_reviewer"
                                              ? "bg-blue-100 text-blue-800"
                                              : "bg-green-100 text-green-800"
                                        }
                                      >
                                        {reviewer.role === "primary_reviewer"
                                          ? "主要审查员"
                                          : reviewer.role === "secondary_reviewer"
                                            ? "次要审查员"
                                            : "快速审查员"}
                                      </Badge>
                                    </div>
                                    <p className="text-gray-600">{reviewer.title}</p>
                                    <div className="flex gap-1">
                                      {reviewer.expertise.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <Badge
                                      className={
                                        reviewer.status === "completed"
                                          ? "bg-green-100 text-green-800"
                                          : reviewer.status === "in_progress"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                      }
                                    >
                                      {reviewer.status === "completed"
                                        ? "已完成"
                                        : reviewer.status === "in_progress"
                                          ? "进行中"
                                          : "待开始"}
                                    </Badge>
                                    {reviewer.reviewDate && (
                                      <p className="text-sm text-gray-500 mt-1">审查日期：{reviewer.reviewDate}</p>
                                    )}
                                    {reviewer.recommendation && (
                                      <p className="text-sm mt-1">
                                        建议：
                                        <span
                                          className={
                                            reviewer.recommendation === "approve"
                                              ? "text-green-600"
                                              : reviewer.recommendation === "approve_with_conditions"
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                          }
                                        >
                                          {reviewer.recommendation === "approve"
                                            ? "批准"
                                            : reviewer.recommendation === "approve_with_conditions"
                                              ? "有条件批准"
                                              : reviewer.recommendation === "reject"
                                                ? "拒绝"
                                                : "需修改"}
                                        </span>
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="timeline" className="space-y-4">
                        <h3 className="text-lg font-semibold">审查时间线</h3>

                        <div className="space-y-4">
                          {application.timeline.map((event, index) => (
                            <div key={event.id} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    event.status === "completed"
                                      ? "bg-green-600"
                                      : event.status === "in_progress"
                                        ? "bg-blue-600"
                                        : event.status === "scheduled"
                                          ? "bg-yellow-600"
                                          : "bg-gray-400"
                                  }`}
                                ></div>
                                {index < application.timeline.length - 1 && (
                                  <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                                )}
                              </div>
                              <div className="flex-1 pb-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold">{event.event}</h4>
                                    <p className="text-sm text-gray-600">{event.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {event.actor} · {event.date}
                                    </p>
                                  </div>
                                  <Badge
                                    className={
                                      event.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : event.status === "in_progress"
                                          ? "bg-blue-100 text-blue-800"
                                          : event.status === "scheduled"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-gray-100 text-gray-800"
                                    }
                                  >
                                    {event.status === "completed"
                                      ? "已完成"
                                      : event.status === "in_progress"
                                        ? "进行中"
                                        : event.status === "scheduled"
                                          ? "已安排"
                                          : "待处理"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="comments" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">审查意见</h3>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            添加意见
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {application.comments.map((comment) => (
                            <Card key={comment.id}>
                              <CardContent className="pt-6">
                                <div className="space-y-3">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-semibold">{comment.reviewer}</h4>
                                        <Badge
                                          className={
                                            comment.type === "major"
                                              ? "bg-red-100 text-red-800"
                                              : comment.type === "minor"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-blue-100 text-blue-800"
                                          }
                                        >
                                          {comment.type === "major"
                                            ? "重要意见"
                                            : comment.type === "minor"
                                              ? "一般意见"
                                              : "建议"}
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-gray-500">{comment.date}</p>
                                    </div>
                                    <Badge
                                      className={
                                        comment.resolved
                                          ? "bg-green-100 text-green-800"
                                          : "bg-orange-100 text-orange-800"
                                      }
                                    >
                                      {comment.resolved ? "已解决" : "待解决"}
                                    </Badge>
                                  </div>
                                  <p className="text-sm">{comment.content}</p>
                                  {comment.response && (
                                    <div className="bg-gray-50 p-3 rounded">
                                      <p className="text-sm font-medium">申请人回复：</p>
                                      <p className="text-sm mt-1">{comment.response}</p>
                                    </div>
                                  )}
                                  {!comment.resolved && (
                                    <Button variant="outline" size="sm">
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      回复
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>审查进度</span>
                  <span>{application.progress}%</span>
                </div>
                <Progress value={application.progress} className="h-2" />
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>审查员：{application.reviewers.length}人</span>
                  <span>文档：{application.documents.length}个</span>
                  {application.nextMeeting && <span>下次会议：{application.nextMeeting}</span>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
