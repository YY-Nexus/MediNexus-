"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Calendar, Users, FileText, CheckCircle, Clock, Plus, Search } from "lucide-react"

interface ClinicalTrial {
  id: string
  title: string
  phase: string
  status: string
  startDate: string
  endDate: string
  principalInvestigator: string
  participants: number
  targetParticipants: number
  progress: number
  sponsor: string
  indication: string
  primaryEndpoint: string
  secondaryEndpoints: string[]
  inclusionCriteria: string[]
  exclusionCriteria: string[]
  sites: string[]
  regulatoryStatus: string
  ethicsApproval: string
  lastUpdate: string
}

interface Participant {
  id: string
  trialId: string
  patientId: string
  enrollmentDate: string
  status: string
  visitSchedule: Visit[]
  adverseEvents: AdverseEvent[]
  concomitantMeds: string[]
  demographics: {
    age: number
    gender: string
    ethnicity: string
    weight: number
    height: number
  }
}

interface Visit {
  id: string
  visitNumber: number
  scheduledDate: string
  actualDate?: string
  status: string
  procedures: string[]
  assessments: Assessment[]
  notes: string
}

interface Assessment {
  id: string
  type: string
  result: string
  unit: string
  normalRange: string
  status: string
}

interface AdverseEvent {
  id: string
  description: string
  severity: string
  relationship: string
  outcome: string
  reportDate: string
  resolved: boolean
}

export default function ClinicalTrialManagement() {
  const [trials, setTrials] = useState<ClinicalTrial[]>([])
  const [participants, setParticipants] = useState<Participant[]>([])
  const [selectedTrial, setSelectedTrial] = useState<ClinicalTrial | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [phaseFilter, setPhaseFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟数据加载
    const mockTrials: ClinicalTrial[] = [
      {
        id: "CT001",
        title: "新型抗癌药物III期临床试验",
        phase: "Phase III",
        status: "recruiting",
        startDate: "2024-01-15",
        endDate: "2025-12-31",
        principalInvestigator: "张教授",
        participants: 156,
        targetParticipants: 300,
        progress: 52,
        sponsor: "制药公司A",
        indication: "非小细胞肺癌",
        primaryEndpoint: "总生存期",
        secondaryEndpoints: ["无进展生存期", "客观缓解率", "安全性"],
        inclusionCriteria: ["18-75岁", "确诊非小细胞肺癌", "ECOG评分0-2"],
        exclusionCriteria: ["严重心脏病", "肝肾功能不全", "妊娠期"],
        sites: ["北京协和医院", "上海华山医院", "广州中山医院"],
        regulatoryStatus: "approved",
        ethicsApproval: "approved",
        lastUpdate: "2024-01-20",
      },
      {
        id: "CT002",
        title: "糖尿病新药II期临床试验",
        phase: "Phase II",
        status: "active",
        startDate: "2023-09-01",
        endDate: "2024-08-31",
        principalInvestigator: "李医生",
        participants: 89,
        targetParticipants: 120,
        progress: 74,
        sponsor: "制药公司B",
        indication: "2型糖尿病",
        primaryEndpoint: "HbA1c变化",
        secondaryEndpoints: ["空腹血糖", "餐后血糖", "体重变化"],
        inclusionCriteria: ["18-65岁", "确诊2型糖尿病", "HbA1c 7-10%"],
        exclusionCriteria: ["1型糖尿病", "严重并发症", "妊娠期"],
        sites: ["北京大学第一医院", "复旦大学附属医院"],
        regulatoryStatus: "approved",
        ethicsApproval: "approved",
        lastUpdate: "2024-01-18",
      },
    ]

    const mockParticipants: Participant[] = [
      {
        id: "P001",
        trialId: "CT001",
        patientId: "PAT001",
        enrollmentDate: "2024-01-16",
        status: "active",
        visitSchedule: [
          {
            id: "V001",
            visitNumber: 1,
            scheduledDate: "2024-01-16",
            actualDate: "2024-01-16",
            status: "completed",
            procedures: ["体格检查", "实验室检查", "影像学检查"],
            assessments: [
              { id: "A001", type: "血常规", result: "正常", unit: "", normalRange: "正常范围", status: "normal" },
              { id: "A002", type: "CT扫描", result: "肿瘤缩小20%", unit: "", normalRange: "", status: "improved" },
            ],
            notes: "患者状态良好，无不良反应",
          },
        ],
        adverseEvents: [],
        concomitantMeds: ["阿司匹林", "降压药"],
        demographics: {
          age: 58,
          gender: "男",
          ethnicity: "汉族",
          weight: 70,
          height: 175,
        },
      },
    ]

    setTrials(mockTrials)
    setParticipants(mockParticipants)
    setLoading(false)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recruiting":
        return "bg-blue-100 text-blue-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-yellow-100 text-yellow-800"
      case "terminated":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Phase I":
        return "bg-purple-100 text-purple-800"
      case "Phase II":
        return "bg-blue-100 text-blue-800"
      case "Phase III":
        return "bg-green-100 text-green-800"
      case "Phase IV":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTrials = trials.filter((trial) => {
    const matchesSearch =
      trial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trial.indication.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || trial.status === statusFilter
    const matchesPhase = phaseFilter === "all" || trial.phase === phaseFilter
    return matchesSearch && matchesStatus && matchesPhase
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
          <h2 className="text-2xl font-bold text-gray-900">临床试验管理</h2>
          <p className="text-gray-600">管理和监控临床试验的全生命周期</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新建试验
        </Button>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索试验名称或适应症..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="recruiting">招募中</SelectItem>
                <SelectItem value="active">进行中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="suspended">暂停</SelectItem>
                <SelectItem value="terminated">终止</SelectItem>
              </SelectContent>
            </Select>
            <Select value={phaseFilter} onValueChange={setPhaseFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="期别筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部期别</SelectItem>
                <SelectItem value="Phase I">I期</SelectItem>
                <SelectItem value="Phase II">II期</SelectItem>
                <SelectItem value="Phase III">III期</SelectItem>
                <SelectItem value="Phase IV">IV期</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 试验列表 */}
      <div className="grid gap-6">
        {filteredTrials.map((trial) => (
          <Card key={trial.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{trial.title}</CardTitle>
                    <Badge className={getPhaseColor(trial.phase)}>{trial.phase}</Badge>
                    <Badge className={getStatusColor(trial.status)}>
                      {trial.status === "recruiting"
                        ? "招募中"
                        : trial.status === "active"
                          ? "进行中"
                          : trial.status === "completed"
                            ? "已完成"
                            : trial.status === "suspended"
                              ? "暂停"
                              : "终止"}
                    </Badge>
                  </div>
                  <CardDescription>
                    适应症：{trial.indication} | 主要研究者：{trial.principalInvestigator}
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedTrial(trial)}>
                      查看详情
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{trial.title}</DialogTitle>
                      <DialogDescription>试验编号：{trial.id}</DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="overview">概览</TabsTrigger>
                        <TabsTrigger value="participants">受试者</TabsTrigger>
                        <TabsTrigger value="schedule">访问计划</TabsTrigger>
                        <TabsTrigger value="safety">安全性</TabsTrigger>
                        <TabsTrigger value="regulatory">法规</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="font-semibold">试验期别</Label>
                            <p>{trial.phase}</p>
                          </div>
                          <div>
                            <Label className="font-semibold">试验状态</Label>
                            <p>{trial.status}</p>
                          </div>
                          <div>
                            <Label className="font-semibold">开始日期</Label>
                            <p>{trial.startDate}</p>
                          </div>
                          <div>
                            <Label className="font-semibold">预计结束日期</Label>
                            <p>{trial.endDate}</p>
                          </div>
                          <div>
                            <Label className="font-semibold">主要终点</Label>
                            <p>{trial.primaryEndpoint}</p>
                          </div>
                          <div>
                            <Label className="font-semibold">申办方</Label>
                            <p>{trial.sponsor}</p>
                          </div>
                        </div>
                        <div>
                          <Label className="font-semibold">次要终点</Label>
                          <ul className="list-disc list-inside mt-1">
                            {trial.secondaryEndpoints.map((endpoint, index) => (
                              <li key={index}>{endpoint}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <Label className="font-semibold">入选标准</Label>
                          <ul className="list-disc list-inside mt-1">
                            {trial.inclusionCriteria.map((criteria, index) => (
                              <li key={index}>{criteria}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <Label className="font-semibold">排除标准</Label>
                          <ul className="list-disc list-inside mt-1">
                            {trial.exclusionCriteria.map((criteria, index) => (
                              <li key={index}>{criteria}</li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>
                      <TabsContent value="participants">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">受试者管理</h3>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              入组受试者
                            </Button>
                          </div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>受试者ID</TableHead>
                                <TableHead>入组日期</TableHead>
                                <TableHead>状态</TableHead>
                                <TableHead>年龄</TableHead>
                                <TableHead>性别</TableHead>
                                <TableHead>操作</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {participants
                                .filter((p) => p.trialId === trial.id)
                                .map((participant) => (
                                  <TableRow key={participant.id}>
                                    <TableCell>{participant.patientId}</TableCell>
                                    <TableCell>{participant.enrollmentDate}</TableCell>
                                    <TableCell>
                                      <Badge className={getStatusColor(participant.status)}>
                                        {participant.status === "active" ? "活跃" : participant.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{participant.demographics.age}</TableCell>
                                    <TableCell>{participant.demographics.gender}</TableCell>
                                    <TableCell>
                                      <Button variant="outline" size="sm">
                                        查看
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>
                      <TabsContent value="schedule">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">访问计划</h3>
                          <p className="text-gray-600">访问计划和时间表管理</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="safety">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">安全性监测</h3>
                          <p className="text-gray-600">不良事件和安全性数据</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="regulatory">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">法规合规</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="font-semibold">监管审批状态</Label>
                              <div className="flex items-center gap-2 mt-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>已批准</span>
                              </div>
                            </div>
                            <div>
                              <Label className="font-semibold">伦理委员会批准</Label>
                              <div className="flex items-center gap-2 mt-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>已批准</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    {trial.participants}/{trial.targetParticipants} 受试者
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{trial.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{trial.sponsor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">更新：{trial.lastUpdate}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>招募进度</span>
                  <span>{trial.progress}%</span>
                </div>
                <Progress value={trial.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
