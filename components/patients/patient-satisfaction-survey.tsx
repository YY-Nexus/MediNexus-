"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MedicalButton } from "@/components/ui/medical-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { BarChart, LineChart } from "@/components/ui/chart"
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
  Star,
  MessageSquare,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  Plus,
  Send,
  Eye,
  Edit,
  Download,
  Filter,
} from "lucide-react"

// 调查问卷类型
interface SurveyTemplate {
  id: string
  title: string
  description: string
  category: "service" | "treatment" | "facility" | "overall"
  questions: SurveyQuestion[]
  status: "active" | "draft" | "archived"
  createdAt: string
  responseCount: number
}

// 调查问题类型
interface SurveyQuestion {
  id: string
  type: "rating" | "choice" | "text" | "yesno"
  question: string
  options?: string[]
  required: boolean
}

// 调查回复类型
interface SurveyResponse {
  id: string
  surveyId: string
  patientId: string
  patientName: string
  responses: Record<string, any>
  overallRating: number
  submittedAt: string
  department: string
}

// 满意度统计类型
interface SatisfactionStats {
  overall: {
    averageRating: number
    totalResponses: number
    responseRate: number
    trend: "up" | "down" | "stable"
  }
  byCategory: Array<{
    category: string
    rating: number
    count: number
  }>
  byDepartment: Array<{
    department: string
    rating: number
    count: number
  }>
  byTimeRange: Array<{
    period: string
    rating: number
    count: number
  }>
}

// 模拟数据
const mockSurveyTemplates: SurveyTemplate[] = [
  {
    id: "st001",
    title: "住院服务满意度调查",
    description: "评估患者对住院期间各项服务的满意度",
    category: "service",
    questions: [
      {
        id: "q001",
        type: "rating",
        question: "您对医护人员的服务态度满意吗？",
        required: true,
      },
      {
        id: "q002",
        type: "rating",
        question: "您对病房环境和设施满意吗？",
        required: true,
      },
      {
        id: "q003",
        type: "choice",
        question: "您认为最需要改进的方面是？",
        options: ["服务态度", "医疗技术", "环境设施", "流程效率", "费用透明度"],
        required: false,
      },
      {
        id: "q004",
        type: "text",
        question: "请提供您的建议和意见",
        required: false,
      },
    ],
    status: "active",
    createdAt: "2024-04-01",
    responseCount: 156,
  },
  {
    id: "st002",
    title: "门诊就医体验调查",
    description: "收集患者对门诊就医流程和服务的反馈",
    category: "service",
    questions: [
      {
        id: "q005",
        type: "rating",
        question: "您对挂号流程的便利性满意吗？",
        required: true,
      },
      {
        id: "q006",
        type: "rating",
        question: "您对医生诊疗服务满意吗？",
        required: true,
      },
      {
        id: "q007",
        type: "yesno",
        question: "您会推荐朋友来我院就诊吗？",
        required: true,
      },
    ],
    status: "active",
    createdAt: "2024-03-15",
    responseCount: 89,
  },
]

const mockSurveyResponses: SurveyResponse[] = [
  {
    id: "sr001",
    surveyId: "st001",
    patientId: "p001",
    patientName: "张伟",
    responses: {
      q001: 5,
      q002: 4,
      q003: "环境设施",
      q004: "总体很满意，希望能改善病房的网络信号",
    },
    overallRating: 4.5,
    submittedAt: "2024-04-28 14:30",
    department: "心内科",
  },
  {
    id: "sr002",
    surveyId: "st001",
    patientId: "p002",
    patientName: "李敏",
    responses: {
      q001: 5,
      q002: 5,
      q003: "服务态度",
      q004: "医护人员非常专业和耐心",
    },
    overallRating: 5.0,
    submittedAt: "2024-04-27 16:45",
    department: "内分泌科",
  },
]

const mockSatisfactionStats: SatisfactionStats = {
  overall: {
    averageRating: 4.3,
    totalResponses: 245,
    responseRate: 78,
    trend: "up",
  },
  byCategory: [
    { category: "服务质量", rating: 4.5, count: 156 },
    { category: "医疗技术", rating: 4.2, count: 134 },
    { category: "环境设施", rating: 4.0, count: 145 },
    { category: "流程效率", rating: 3.8, count: 123 },
  ],
  byDepartment: [
    { department: "心内科", rating: 4.6, count: 45 },
    { department: "内分泌科", rating: 4.4, count: 38 },
    { department: "神经内科", rating: 4.2, count: 32 },
    { department: "消化内科", rating: 4.1, count: 28 },
  ],
  byTimeRange: [
    { period: "2024-01", rating: 4.1, count: 52 },
    { period: "2024-02", rating: 4.2, count: 48 },
    { period: "2024-03", rating: 4.3, count: 56 },
    { period: "2024-04", rating: 4.3, count: 89 },
  ],
}

export function PatientSatisfactionSurvey({ patientId }: { patientId: string }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [newSurveyOpen, setNewSurveyOpen] = useState(false)

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-blue-600"
    if (rating >= 3.5) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-medical-600" />
            患者满意度调查系统
          </CardTitle>
          <CardDescription>收集和分析患者满意度反馈，持续改进医疗服务质量</CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">满意度概览</TabsTrigger>
          <TabsTrigger value="surveys">调查问卷</TabsTrigger>
          <TabsTrigger value="responses">回复分析</TabsTrigger>
          <TabsTrigger value="reports">统计报告</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* 总体满意度指标 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">平均满意度</p>
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-2xl font-bold ${getRatingColor(mockSatisfactionStats.overall.averageRating)}`}
                        >
                          {mockSatisfactionStats.overall.averageRating}
                        </p>
                        <div className="flex">{getRatingStars(mockSatisfactionStats.overall.averageRating)}</div>
                      </div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">总回复数</p>
                      <p className="text-2xl font-bold text-green-700">
                        {mockSatisfactionStats.overall.totalResponses}
                      </p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">回复率</p>
                      <p className="text-2xl font-bold text-purple-700">
                        {mockSatisfactionStats.overall.responseRate}%
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <Progress value={mockSatisfactionStats.overall.responseRate} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-amber-600 font-medium">趋势</p>
                      <p className="text-2xl font-bold text-amber-700">
                        {mockSatisfactionStats.overall.trend === "up"
                          ? "上升"
                          : mockSatisfactionStats.overall.trend === "down"
                            ? "下降"
                            : "稳定"}
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 分类满意度图表 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">各类别满意度</CardTitle>
                  <CardDescription>不同服务类别的满意度评分</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <BarChart
                    data={mockSatisfactionStats.byCategory}
                    categories={[
                      {
                        name: "满意度评分",
                        key: "rating",
                        color: "hsl(var(--chart-1))",
                      },
                    ]}
                    xAxisKey="category"
                    yAxisConfig={{
                      min: 0,
                      max: 5,
                      unit: "分",
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">科室满意度排名</CardTitle>
                  <CardDescription>各科室满意度评分对比</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <BarChart
                    data={mockSatisfactionStats.byDepartment}
                    categories={[
                      {
                        name: "满意度评分",
                        key: "rating",
                        color: "hsl(var(--chart-2))",
                      },
                    ]}
                    xAxisKey="department"
                    yAxisConfig={{
                      min: 0,
                      max: 5,
                      unit: "分",
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* 满意度趋势 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">满意度趋势分析</CardTitle>
                <CardDescription>近期满意度变化趋势</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart
                  data={mockSatisfactionStats.byTimeRange}
                  categories={[
                    {
                      name: "满意度评分",
                      key: "rating",
                      stroke: "#3b82f6",
                    },
                  ]}
                  xAxisKey="period"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="surveys">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">调查问卷管理</h3>
              <Dialog open={newSurveyOpen} onOpenChange={setNewSurveyOpen}>
                <DialogTrigger asChild>
                  <MedicalButton>
                    <Plus className="h-4 w-4 mr-2" />
                    创建问卷
                  </MedicalButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>创建新的满意度调查</DialogTitle>
                    <DialogDescription>设计新的患者满意度调查问卷</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">问卷标题</Label>
                      <Input id="title" placeholder="请输入问卷标题" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">问卷描述</Label>
                      <Textarea id="description" placeholder="请输入问卷描述" rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">问卷类别</Label>
                      <Select id="category">
                        <option value="service">服务质量</option>
                        <option value="treatment">治疗效果</option>
                        <option value="facility">设施环境</option>
                        <option value="overall">综合评价</option>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <MedicalButton variant="outline" onClick={() => setNewSurveyOpen(false)}>
                      取消
                    </MedicalButton>
                    <MedicalButton onClick={() => setNewSurveyOpen(false)}>创建问卷</MedicalButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockSurveyTemplates.map((survey) => (
                <Card key={survey.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{survey.title}</CardTitle>
                      <Badge variant={survey.status === "active" ? "default" : "secondary"}>
                        {survey.status === "active" ? "进行中" : survey.status === "draft" ? "草稿" : "已归档"}
                      </Badge>
                    </div>
                    <CardDescription>{survey.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">问题数量</span>
                      <span className="font-medium">{survey.questions.length} 个问题</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">回复数量</span>
                      <span className="font-medium">{survey.responseCount} 份回复</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">创建时间</span>
                      <span className="font-medium">{survey.createdAt}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">类别</span>
                      <Badge variant="outline">
                        {survey.category === "service" && "服务质量"}
                        {survey.category === "treatment" && "治疗效果"}
                        {survey.category === "facility" && "设施环境"}
                        {survey.category === "overall" && "综合评价"}
                      </Badge>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <MedicalButton size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        预览
                      </MedicalButton>
                      <MedicalButton size="sm" variant="outline" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        编辑
                      </MedicalButton>
                      <MedicalButton size="sm" variant="outline" className="flex-1">
                        <Send className="h-3 w-3 mr-1" />
                        发送
                      </MedicalButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="responses">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">回复分析</h3>
              <div className="flex gap-2">
                <MedicalButton variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  筛选
                </MedicalButton>
                <MedicalButton variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  导出
                </MedicalButton>
              </div>
            </div>

            <div className="space-y-3">
              {mockSurveyResponses.map((response) => (
                <Card key={response.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{response.patientName}</h4>
                          <Badge variant="outline">{response.department}</Badge>
                          <div className="flex items-center gap-1">
                            {getRatingStars(response.overallRating)}
                            <span className="text-sm font-medium ml-1">{response.overallRating}</span>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          {Object.entries(response.responses).map(([questionId, answer]) => (
                            <div key={questionId} className="flex items-start gap-2">
                              <span className="text-gray-600 min-w-[60px]">Q{questionId.slice(-1)}:</span>
                              <span className="flex-1">
                                {typeof answer === "number" ? (
                                  <div className="flex items-center gap-1">
                                    {getRatingStars(answer)}
                                    <span className="ml-1">({answer}分)</span>
                                  </div>
                                ) : (
                                  answer
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>{response.submittedAt}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">统计报告</h3>
              <div className="flex gap-2">
                <MedicalButton variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  时间范围
                </MedicalButton>
                <MedicalButton variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  导出报告
                </MedicalButton>
              </div>
            </div>

            {/* 详细统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">{getRatingStars(4.5)}</div>
                    <p className="text-2xl font-bold text-green-600">4.5</p>
                    <p className="text-sm text-gray-600">服务态度</p>
                    <p className="text-xs text-gray-500">156 份评价</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">{getRatingStars(4.2)}</div>
                    <p className="text-2xl font-bold text-blue-600">4.2</p>
                    <p className="text-sm text-gray-600">医疗技术</p>
                    <p className="text-xs text-gray-500">134 份评价</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">{getRatingStars(4.0)}</div>
                    <p className="text-2xl font-bold text-amber-600">4.0</p>
                    <p className="text-sm text-gray-600">环境设施</p>
                    <p className="text-xs text-gray-500">145 份评价</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">{getRatingStars(3.8)}</div>
                    <p className="text-2xl font-bold text-orange-600">3.8</p>
                    <p className="text-sm text-gray-600">流程效率</p>
                    <p className="text-xs text-gray-500">123 份评价</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 改进建议汇总 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">患者建议汇总</CardTitle>
                <CardDescription>基于患者反馈的改进建议分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">需要重点关注的问题</h4>
                    <ul className="space-y-1 text-sm text-red-700">
                      <li>• 病房网络信号不稳定 (提及次数: 23)</li>
                      <li>• 挂号排队时间过长 (提及次数: 18)</li>
                      <li>• 停车位不足 (提及次数: 15)</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">可以改进的方面</h4>
                    <ul className="space-y-1 text-sm text-yellow-700">
                      <li>• 增加自助服务设备 (提及次数: 12)</li>
                      <li>• 优化就诊流程 (提及次数: 10)</li>
                      <li>• 提供更多健康教育资料 (提及次数: 8)</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">患者满意的方面</h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• 医护人员专业且耐心 (提及次数: 45)</li>
                      <li>• 医疗技术先进 (提及次数: 32)</li>
                      <li>• 病房环境整洁 (提及次数: 28)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
