"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  Users,
  FileText,
  BarChart,
  RefreshCw,
  Clipboard,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Hourglass,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

// 模拟试验数据
const trialsData = [
  {
    id: "TRL-2024-001",
    title: "糖尿病新药临床试验",
    status: "进行中",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    phase: "II期",
    participantsTarget: 120,
    participantsCurrent: 87,
    principalInvestigator: "张教授",
    department: "内分泌科",
    progress: 72,
    lastUpdated: "2024-05-01",
    tags: ["糖尿病", "药物试验", "多中心"],
  },
  {
    id: "TRL-2024-002",
    title: "高血压患者生活方式干预研究",
    status: "招募中",
    startDate: "2024-02-10",
    endDate: "2024-08-10",
    phase: "I期",
    participantsTarget: 200,
    participantsCurrent: 45,
    principalInvestigator: "李医师",
    department: "心血管科",
    progress: 22,
    lastUpdated: "2024-04-28",
    tags: ["高血压", "生活方式", "干预研究"],
  },
  {
    id: "TRL-2024-003",
    title: "肿瘤免疫治疗效果评估",
    status: "进行中",
    startDate: "2023-11-20",
    endDate: "2024-11-20",
    phase: "III期",
    participantsTarget: 150,
    participantsCurrent: 132,
    principalInvestigator: "王主任",
    department: "肿瘤科",
    progress: 88,
    lastUpdated: "2024-05-03",
    tags: ["肿瘤", "免疫治疗", "长期随访"],
  },
  {
    id: "TRL-2024-004",
    title: "儿童哮喘新型吸入剂研究",
    status: "已完成",
    startDate: "2023-08-05",
    endDate: "2024-02-05",
    phase: "II期",
    participantsTarget: 80,
    participantsCurrent: 80,
    principalInvestigator: "刘医师",
    department: "儿科",
    progress: 100,
    lastUpdated: "2024-02-10",
    tags: ["儿科", "哮喘", "吸入剂"],
  },
  {
    id: "TRL-2024-005",
    title: "老年认知障碍早期干预",
    status: "已暂停",
    startDate: "2024-03-01",
    endDate: "2025-03-01",
    phase: "I期",
    participantsTarget: 100,
    participantsCurrent: 12,
    principalInvestigator: "赵教授",
    department: "神经内科",
    progress: 12,
    lastUpdated: "2024-04-15",
    tags: ["老年医学", "认知障碍", "早期干预"],
  },
]

// 试验阶段选项
const phaseOptions = ["全部", "I期", "II期", "III期", "IV期"]

// 试验状态选项
const statusOptions = ["全部", "招募中", "进行中", "已完成", "已暂停", "已终止"]

export default function TrialsClient() {
  // 状态管理
  const [trials, setTrials] = useState(trialsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPhase, setSelectedPhase] = useState("全部")
  const [selectedStatus, setSelectedStatus] = useState("全部")
  const [selectedTrial, setSelectedTrial] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // 处理搜索
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // 处理筛选
  const filteredTrials = trials.filter((trial) => {
    const matchesSearch =
      trial.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trial.principalInvestigator.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPhase = selectedPhase === "全部" || trial.phase === selectedPhase
    const matchesStatus = selectedStatus === "全部" || trial.status === selectedStatus

    if (activeTab === "all") return matchesSearch && matchesPhase && matchesStatus
    if (activeTab === "recruiting") return trial.status === "招募中" && matchesSearch && matchesPhase
    if (activeTab === "ongoing") return trial.status === "进行中" && matchesSearch && matchesPhase
    if (activeTab === "completed") return trial.status === "已完成" && matchesSearch && matchesPhase

    return true
  })

  // 查看试验详情
  const viewTrialDetails = (trial) => {
    setSelectedTrial(trial)
    setIsDetailOpen(true)
  }

  // 获取状态标签样式
  const getStatusBadge = (status) => {
    switch (status) {
      case "招募中":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Users className="h-3 w-3 mr-1" />
            招募中
          </Badge>
        )
      case "进行中":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Clock className="h-3 w-3 mr-1" />
            进行中
          </Badge>
        )
      case "已完成":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            已完成
          </Badge>
        )
      case "已暂停":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Hourglass className="h-3 w-3 mr-1" />
            已暂停
          </Badge>
        )
      case "已终止":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            已终止
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">临床试验管理</CardTitle>
              <CardDescription>设计、管理和监控临床试验项目</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                导入
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                导出
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                新建试验
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">全部试验</TabsTrigger>
                <TabsTrigger value="recruiting">招募中</TabsTrigger>
                <TabsTrigger value="ongoing">进行中</TabsTrigger>
                <TabsTrigger value="completed">已完成</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="搜索试验ID、标题..."
                    className="pl-8 w-[250px]"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="试验阶段" />
                  </SelectTrigger>
                  <SelectContent>
                    {phaseOptions.map((phase) => (
                      <SelectItem key={phase} value={phase}>
                        {phase}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>试验ID</TableHead>
                      <TableHead>试验标题</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>阶段</TableHead>
                      <TableHead>主要研究者</TableHead>
                      <TableHead>参与者</TableHead>
                      <TableHead>进度</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrials.length > 0 ? (
                      filteredTrials.map((trial) => (
                        <TableRow
                          key={trial.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => viewTrialDetails(trial)}
                        >
                          <TableCell className="font-medium">{trial.id}</TableCell>
                          <TableCell>{trial.title}</TableCell>
                          <TableCell>{getStatusBadge(trial.status)}</TableCell>
                          <TableCell>{trial.phase}</TableCell>
                          <TableCell>{trial.principalInvestigator}</TableCell>
                          <TableCell>
                            {trial.participantsCurrent}/{trial.participantsTarget}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={trial.progress} className="h-2 w-[60px]" />
                              <span className="text-xs text-muted-foreground">{trial.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <BarChart className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <AlertCircle className="h-8 w-8 mb-2" />
                            <p>未找到符合条件的试验</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="recruiting" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>试验ID</TableHead>
                      <TableHead>试验标题</TableHead>
                      <TableHead>阶段</TableHead>
                      <TableHead>主要研究者</TableHead>
                      <TableHead>目标人数</TableHead>
                      <TableHead>当前人数</TableHead>
                      <TableHead>开始日期</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrials.length > 0 ? (
                      filteredTrials.map((trial) => (
                        <TableRow
                          key={trial.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => viewTrialDetails(trial)}
                        >
                          <TableCell className="font-medium">{trial.id}</TableCell>
                          <TableCell>{trial.title}</TableCell>
                          <TableCell>{trial.phase}</TableCell>
                          <TableCell>{trial.principalInvestigator}</TableCell>
                          <TableCell>{trial.participantsTarget}</TableCell>
                          <TableCell className="font-medium">{trial.participantsCurrent}</TableCell>
                          <TableCell>{trial.startDate}</TableCell>
                          <TableCell>
                            <Button size="sm">添加参与者</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <AlertCircle className="h-8 w-8 mb-2" />
                            <p>没有招募中的试验</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="ongoing" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>试验ID</TableHead>
                      <TableHead>试验标题</TableHead>
                      <TableHead>阶段</TableHead>
                      <TableHead>主要研究者</TableHead>
                      <TableHead>参与者</TableHead>
                      <TableHead>进度</TableHead>
                      <TableHead>结束日期</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrials.length > 0 ? (
                      filteredTrials.map((trial) => (
                        <TableRow
                          key={trial.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => viewTrialDetails(trial)}
                        >
                          <TableCell className="font-medium">{trial.id}</TableCell>
                          <TableCell>{trial.title}</TableCell>
                          <TableCell>{trial.phase}</TableCell>
                          <TableCell>{trial.principalInvestigator}</TableCell>
                          <TableCell>
                            {trial.participantsCurrent}/{trial.participantsTarget}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={trial.progress} className="h-2 w-[60px]" />
                              <span className="text-xs text-muted-foreground">{trial.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{trial.endDate}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              更新数据
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <AlertCircle className="h-8 w-8 mb-2" />
                            <p>没有进行中的试验</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>试验ID</TableHead>
                      <TableHead>试验标题</TableHead>
                      <TableHead>阶段</TableHead>
                      <TableHead>主要研究者</TableHead>
                      <TableHead>参与者</TableHead>
                      <TableHead>完成日期</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrials.length > 0 ? (
                      filteredTrials.map((trial) => (
                        <TableRow
                          key={trial.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => viewTrialDetails(trial)}
                        >
                          <TableCell className="font-medium">{trial.id}</TableCell>
                          <TableCell>{trial.title}</TableCell>
                          <TableCell>{trial.phase}</TableCell>
                          <TableCell>{trial.principalInvestigator}</TableCell>
                          <TableCell>
                            {trial.participantsCurrent}/{trial.participantsTarget}
                          </TableCell>
                          <TableCell>{trial.endDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-1" />
                                报告
                              </Button>
                              <Button variant="outline" size="sm">
                                <BarChart className="h-4 w-4 mr-1" />
                                分析
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <AlertCircle className="h-8 w-8 mb-2" />
                            <p>没有已完成的试验</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 试验详情对话框 */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>试验详情</DialogTitle>
            <DialogDescription>查看临床试验的详细信息和进度</DialogDescription>
          </DialogHeader>
          {selectedTrial && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="trial-id" className="text-muted-foreground text-sm">
                    试验ID
                  </Label>
                  <div id="trial-id" className="font-medium">
                    {selectedTrial.id}
                  </div>
                </div>
                <div>
                  <Label htmlFor="trial-status" className="text-muted-foreground text-sm">
                    状态
                  </Label>
                  <div id="trial-status" className="font-medium">
                    {getStatusBadge(selectedTrial.status)}
                  </div>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="trial-title" className="text-muted-foreground text-sm">
                    试验标题
                  </Label>
                  <div id="trial-title" className="font-medium">
                    {selectedTrial.title}
                  </div>
                </div>
                <div>
                  <Label htmlFor="trial-phase" className="text-muted-foreground text-sm">
                    试验阶段
                  </Label>
                  <div id="trial-phase" className="font-medium">
                    {selectedTrial.phase}
                  </div>
                </div>
                <div>
                  <Label htmlFor="trial-pi" className="text-muted-foreground text-sm">
                    主要研究者
                  </Label>
                  <div id="trial-pi" className="font-medium">
                    {selectedTrial.principalInvestigator}
                  </div>
                </div>
                <div>
                  <Label htmlFor="trial-department" className="text-muted-foreground text-sm">
                    所属部门
                  </Label>
                  <div id="trial-department" className="font-medium">
                    {selectedTrial.department}
                  </div>
                </div>
                <div>
                  <Label htmlFor="trial-participants" className="text-muted-foreground text-sm">
                    参与者
                  </Label>
                  <div id="trial-participants" className="font-medium">
                    {selectedTrial.participantsCurrent}/{selectedTrial.participantsTarget}
                  </div>
                </div>
                <div>
                  <Label htmlFor="trial-start" className="text-muted-foreground text-sm">
                    开始日期
                  </Label>
                  <div id="trial-start" className="font-medium">
                    {selectedTrial.startDate}
                  </div>
                </div>
                <div>
                  <Label htmlFor="trial-end" className="text-muted-foreground text-sm">
                    结束日期
                  </Label>
                  <div id="trial-end" className="font-medium">
                    {selectedTrial.endDate}
                  </div>
                </div>
                <div>
                  <Label htmlFor="trial-updated" className="text-muted-foreground text-sm">
                    最后更新
                  </Label>
                  <div id="trial-updated" className="font-medium">
                    {selectedTrial.lastUpdated}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="trial-progress" className="text-muted-foreground text-sm">
                  进度
                </Label>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={selectedTrial.progress} className="h-2 flex-1" />
                  <span className="text-sm font-medium">{selectedTrial.progress}%</span>
                </div>
              </div>

              <div>
                <Label htmlFor="trial-tags" className="text-muted-foreground text-sm">
                  标签
                </Label>
                <div id="trial-tags" className="flex flex-wrap gap-2 mt-1">
                  {selectedTrial.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Clipboard className="h-4 w-4 mr-2" />
                复制ID
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                参与者
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">编辑</Button>
              <Button>确定</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
