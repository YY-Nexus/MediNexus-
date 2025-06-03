"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageSquare, Calendar, Video, Plus, Search } from "lucide-react"

interface CollaborationProject {
  id: string
  title: string
  description: string
  status: string
  type: string
  startDate: string
  endDate: string
  leader: Researcher
  members: Researcher[]
  institutions: Institution[]
  documents: Document[]
  meetings: Meeting[]
  discussions: Discussion[]
  milestones: Milestone[]
  lastActivity: string
}

interface Researcher {
  id: string
  name: string
  title: string
  institution: string
  email: string
  avatar?: string
  expertise: string[]
  role: string
  status: string
}

interface Institution {
  id: string
  name: string
  type: string
  country: string
  contact: string
  logo?: string
}

interface Document {
  id: string
  title: string
  type: string
  version: string
  author: string
  uploadDate: string
  size: string
  status: string
  permissions: string[]
}

interface Meeting {
  id: string
  title: string
  type: string
  date: string
  time: string
  duration: number
  attendees: string[]
  agenda: string[]
  recording?: string
  notes?: string
  status: string
}

interface Discussion {
  id: string
  title: string
  author: string
  content: string
  replies: Reply[]
  tags: string[]
  createdDate: string
  lastReply: string
  status: string
}

interface Reply {
  id: string
  author: string
  content: string
  date: string
  attachments?: string[]
}

interface Milestone {
  id: string
  title: string
  description: string
  dueDate: string
  status: string
  assignee: string
  progress: number
  dependencies: string[]
}

export default function EnhancedCollaborationPlatform() {
  const [projects, setProjects] = useState<CollaborationProject[]>([])
  const [selectedProject, setSelectedProject] = useState<CollaborationProject | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟数据加载
    const mockProjects: CollaborationProject[] = [
      {
        id: "CP001",
        title: "多中心抗癌药物研究",
        description: "联合多个医疗中心开展新型抗癌药物的III期临床试验",
        status: "active",
        type: "clinical_trial",
        startDate: "2024-01-01",
        endDate: "2025-12-31",
        leader: {
          id: "R001",
          name: "张教授",
          title: "主任医师",
          institution: "北京协和医院",
          email: "zhang@hospital.com",
          expertise: ["肿瘤学", "临床试验"],
          role: "principal_investigator",
          status: "active",
        },
        members: [
          {
            id: "R002",
            name: "李医生",
            title: "副主任医师",
            institution: "上海华山医院",
            email: "li@hospital.com",
            expertise: ["肿瘤学", "统计学"],
            role: "co_investigator",
            status: "active",
          },
          {
            id: "R003",
            name: "王研究员",
            title: "研究员",
            institution: "广州中山医院",
            email: "wang@hospital.com",
            expertise: ["生物统计", "数据分析"],
            role: "statistician",
            status: "active",
          },
        ],
        institutions: [
          {
            id: "I001",
            name: "北京协和医院",
            type: "三甲医院",
            country: "中国",
            contact: "contact@pumch.cn",
          },
          {
            id: "I002",
            name: "上海华山医院",
            type: "三甲医院",
            country: "中国",
            contact: "contact@huashan.org.cn",
          },
        ],
        documents: [
          {
            id: "D001",
            title: "研究方案v2.1",
            type: "protocol",
            version: "2.1",
            author: "张教授",
            uploadDate: "2024-01-15",
            size: "2.5MB",
            status: "approved",
            permissions: ["read", "comment"],
          },
          {
            id: "D002",
            title: "统计分析计划",
            type: "sap",
            version: "1.0",
            author: "王研究员",
            uploadDate: "2024-01-20",
            size: "1.8MB",
            status: "draft",
            permissions: ["read", "edit"],
          },
        ],
        meetings: [
          {
            id: "M001",
            title: "项目启动会议",
            type: "kickoff",
            date: "2024-01-25",
            time: "14:00",
            duration: 120,
            attendees: ["R001", "R002", "R003"],
            agenda: ["项目介绍", "角色分工", "时间安排", "质量控制"],
            status: "scheduled",
          },
        ],
        discussions: [
          {
            id: "DIS001",
            title: "入选标准讨论",
            author: "李医生",
            content: "关于患者入选标准的年龄范围，建议从18-70岁调整为18-75岁...",
            replies: [
              {
                id: "R001",
                author: "张教授",
                content: "同意这个建议，75岁以下的患者通常能够耐受治疗",
                date: "2024-01-16",
              },
            ],
            tags: ["入选标准", "年龄"],
            createdDate: "2024-01-15",
            lastReply: "2024-01-16",
            status: "resolved",
          },
        ],
        milestones: [
          {
            id: "MS001",
            title: "伦理委员会批准",
            description: "获得各中心伦理委员会批准",
            dueDate: "2024-02-15",
            status: "in_progress",
            assignee: "张教授",
            progress: 60,
            dependencies: [],
          },
          {
            id: "MS002",
            title: "首例患者入组",
            description: "完成首例患者的筛选和入组",
            dueDate: "2024-03-01",
            status: "pending",
            assignee: "李医生",
            progress: 0,
            dependencies: ["MS001"],
          },
        ],
        lastActivity: "2024-01-22",
      },
    ]

    setProjects(mockProjects)
    setLoading(false)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "planning":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "principal_investigator":
        return "bg-purple-100 text-purple-800"
      case "co_investigator":
        return "bg-blue-100 text-blue-800"
      case "statistician":
        return "bg-green-100 text-green-800"
      case "coordinator":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "principal_investigator":
        return "主要研究者"
      case "co_investigator":
        return "协作研究者"
      case "statistician":
        return "统计学家"
      case "coordinator":
        return "协调员"
      default:
        return role
    }
  }

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
          <h2 className="text-2xl font-bold text-gray-900">研究协作平台</h2>
          <p className="text-gray-600">多中心研究协作和项目管理</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            搜索项目
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            创建项目
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status === "active"
                        ? "进行中"
                        : project.status === "planning"
                          ? "规划中"
                          : project.status === "completed"
                            ? "已完成"
                            : project.status === "suspended"
                              ? "暂停"
                              : "已取消"}
                    </Badge>
                    <Badge variant="outline">{project.type === "clinical_trial" ? "临床试验" : project.type}</Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>负责人：{project.leader.name}</span>
                    <span>成员：{project.members.length + 1}人</span>
                    <span>机构：{project.institutions.length}个</span>
                    <span>最后活动：{project.lastActivity}</span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedProject(project)}>
                      进入项目
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{project.title}</DialogTitle>
                      <DialogDescription>项目协作工作空间</DialogDescription>
                    </DialogHeader>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="overview">概览</TabsTrigger>
                        <TabsTrigger value="team">团队</TabsTrigger>
                        <TabsTrigger value="documents">文档</TabsTrigger>
                        <TabsTrigger value="meetings">会议</TabsTrigger>
                        <TabsTrigger value="discussions">讨论</TabsTrigger>
                        <TabsTrigger value="milestones">里程碑</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">项目信息</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">项目类型：</span>
                                <span>临床试验</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">开始日期：</span>
                                <span>{project.startDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">预计结束：</span>
                                <span>{project.endDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">项目状态：</span>
                                <Badge className={getStatusColor(project.status)}>进行中</Badge>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">团队概览</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>{project.leader.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <p className="font-medium">{project.leader.name}</p>
                                    <p className="text-sm text-gray-500">{project.leader.title}</p>
                                  </div>
                                  <Badge className={getRoleColor(project.leader.role)}>
                                    {getRoleLabel(project.leader.role)}
                                  </Badge>
                                </div>
                                {project.members.slice(0, 2).map((member) => (
                                  <div key={member.id} className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <p className="font-medium">{member.name}</p>
                                      <p className="text-sm text-gray-500">{member.title}</p>
                                    </div>
                                    <Badge className={getRoleColor(member.role)}>{getRoleLabel(member.role)}</Badge>
                                  </div>
                                ))}
                                {project.members.length > 2 && (
                                  <p className="text-sm text-gray-500">还有 {project.members.length - 2} 名成员...</p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">最近活动</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium">统计分析计划已上传</p>
                                  <p className="text-sm text-gray-500">王研究员 · 2小时前</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium">入选标准讨论已解决</p>
                                  <p className="text-sm text-gray-500">张教授 · 1天前</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium">项目启动会议已安排</p>
                                  <p className="text-sm text-gray-500">李医生 · 2天前</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="team" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">团队成员</h3>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            邀请成员
                          </Button>
                        </div>

                        <div className="grid gap-4">
                          <Card>
                            <CardContent className="pt-6">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback>{project.leader.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold">{project.leader.name}</h4>
                                    <Badge className={getRoleColor(project.leader.role)}>
                                      {getRoleLabel(project.leader.role)}
                                    </Badge>
                                  </div>
                                  <p className="text-gray-600">{project.leader.title}</p>
                                  <p className="text-sm text-gray-500">{project.leader.institution}</p>
                                  <div className="flex gap-1 mt-2">
                                    {project.leader.expertise.map((skill, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Video className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {project.members.map((member) => (
                            <Card key={member.id}>
                              <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-semibold">{member.name}</h4>
                                      <Badge className={getRoleColor(member.role)}>{getRoleLabel(member.role)}</Badge>
                                    </div>
                                    <p className="text-gray-600">{member.title}</p>
                                    <p className="text-sm text-gray-500">{member.institution}</p>
                                    <div className="flex gap-1 mt-2">
                                      {member.expertise.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      <MessageSquare className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Video className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">参与机构</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-3">
                              {project.institutions.map((institution) => (
                                <div key={institution.id} className="flex items-center gap-3 p-3 border rounded">
                                  <div className="flex-1">
                                    <h4 className="font-semibold">{institution.name}</h4>
                                    <p className="text-sm text-gray-500">
                                      {institution.type} · {institution.country}
                                    </p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    联系
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="documents" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">项目文档</h3>
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
                              <TableHead>作者</TableHead>
                              <TableHead>上传日期</TableHead>
                              <TableHead>状态</TableHead>
                              <TableHead>操作</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {project.documents.map((doc) => (
                              <TableRow key={doc.id}>
                                <TableCell className="font-medium">{doc.title}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {doc.type === "protocol"
                                      ? "研究方案"
                                      : doc.type === "sap"
                                        ? "统计分析计划"
                                        : doc.type}
                                  </Badge>
                                </TableCell>
                                <TableCell>{doc.version}</TableCell>
                                <TableCell>{doc.author}</TableCell>
                                <TableCell>{doc.uploadDate}</TableCell>
                                <TableCell>
                                  <Badge
                                    className={
                                      doc.status === "approved"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }
                                  >
                                    {doc.status === "approved" ? "已批准" : "草稿"}
                                  </Badge>
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

                      <TabsContent value="meetings" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">会议管理</h3>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            安排会议
                          </Button>
                        </div>

                        <div className="grid gap-4">
                          {project.meetings.map((meeting) => (
                            <Card key={meeting.id}>
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle className="text-base">{meeting.title}</CardTitle>
                                    <CardDescription>
                                      {meeting.date} {meeting.time} · {meeting.duration}分钟
                                    </CardDescription>
                                  </div>
                                  <Badge
                                    className={
                                      meeting.status === "scheduled"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-green-100 text-green-800"
                                    }
                                  >
                                    {meeting.status === "scheduled" ? "已安排" : "已完成"}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div>
                                    <Label className="font-semibold">会议议程</Label>
                                    <ul className="list-disc list-inside mt-1 text-sm">
                                      {meeting.agenda.map((item, index) => (
                                        <li key={index}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">参会人员</Label>
                                    <p className="text-sm mt-1">{meeting.attendees.length}人参加</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      <Video className="h-4 w-4 mr-2" />
                                      加入会议
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Calendar className="h-4 w-4 mr-2" />
                                      添加到日历
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="discussions" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">讨论区</h3>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            发起讨论
                          </Button>
                        </div>

                        <div className="grid gap-4">
                          {project.discussions.map((discussion) => (
                            <Card key={discussion.id}>
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle className="text-base">{discussion.title}</CardTitle>
                                    <CardDescription>
                                      {discussion.author} · {discussion.createdDate}
                                    </CardDescription>
                                  </div>
                                  <Badge
                                    className={
                                      discussion.status === "resolved"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-blue-100 text-blue-800"
                                    }
                                  >
                                    {discussion.status === "resolved" ? "已解决" : "讨论中"}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm mb-3">{discussion.content}</p>
                                <div className="flex items-center gap-2 mb-3">
                                  {discussion.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                  <span>{discussion.replies.length} 回复</span>
                                  <span>最后回复：{discussion.lastReply}</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="milestones" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">项目里程碑</h3>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            添加里程碑
                          </Button>
                        </div>

                        <div className="grid gap-4">
                          {project.milestones.map((milestone) => (
                            <Card key={milestone.id}>
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle className="text-base">{milestone.title}</CardTitle>
                                    <CardDescription>{milestone.description}</CardDescription>
                                  </div>
                                  <Badge
                                    className={
                                      milestone.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : milestone.status === "in_progress"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-gray-100 text-gray-800"
                                    }
                                  >
                                    {milestone.status === "completed"
                                      ? "已完成"
                                      : milestone.status === "in_progress"
                                        ? "进行中"
                                        : "待开始"}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div className="flex justify-between text-sm">
                                    <span>截止日期：{milestone.dueDate}</span>
                                    <span>负责人：{milestone.assignee}</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                      <span>进度</span>
                                      <span>{milestone.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: `${milestone.progress}%` }}
                                      ></div>
                                    </div>
                                  </div>
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
          </Card>
        ))}
      </div>
    </div>
  )
}
