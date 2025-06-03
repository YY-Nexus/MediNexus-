"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Play,
  Pause,
  Download,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  FileText,
  Video,
  Mic,
  Share2,
  Star,
  Archive,
  Trash2,
  Eye,
  Edit,
  MoreVertical,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// 模拟会诊记录数据
const consultationRecords = [
  {
    id: "rec-001",
    title: "心脏病例远程会诊",
    patient: "张明",
    patientId: "P12345",
    date: "2025-04-27",
    time: "10:00-11:30",
    duration: "1小时30分钟",
    department: "心脏科",
    status: "completed",
    participants: [
      { name: "王医生", role: "主任医师", hospital: "中心医院" },
      { name: "李医生", role: "副主任医师", hospital: "中心医院" },
      { name: "张医生", role: "主治医师", hospital: "区域医院" },
    ],
    recordings: [
      { type: "video", size: "1.2GB", duration: "1:30:00", quality: "HD" },
      { type: "audio", size: "45MB", duration: "1:30:00", quality: "高质量" },
      { type: "screen", size: "800MB", duration: "45:00", quality: "HD" },
    ],
    documents: [
      { name: "会诊记录.pdf", size: "2.5MB", type: "pdf" },
      { name: "诊断报告.docx", size: "1.8MB", type: "docx" },
      { name: "影像资料.zip", size: "15MB", type: "zip" },
    ],
    summary: "患者张明，58岁，主诉胸痛、气短2周。经多方会诊，确诊为冠心病，建议介入治疗。",
    rating: 5,
    tags: ["心脏科", "冠心病", "介入治疗", "多科会诊"],
  },
  {
    id: "rec-002",
    title: "脑梗塞病例讨论",
    patient: "李华",
    patientId: "P12346",
    date: "2025-04-26",
    time: "14:30-15:45",
    duration: "1小时15分钟",
    department: "神经科",
    status: "completed",
    participants: [
      { name: "赵医生", role: "主任医师", hospital: "中心医院" },
      { name: "钱医生", role: "副主任医师", hospital: "专科医院" },
      { name: "孙医生", role: "主治医师", hospital: "区域医院" },
    ],
    recordings: [
      { type: "video", size: "950MB", duration: "1:15:00", quality: "HD" },
      { type: "audio", size: "38MB", duration: "1:15:00", quality: "高质量" },
    ],
    documents: [
      { name: "会诊记录.pdf", size: "1.9MB", type: "pdf" },
      { name: "CT影像.zip", size: "25MB", type: "zip" },
    ],
    summary: "患者李华，65岁，急性脑梗塞。经会诊确定溶栓治疗方案，预后良好。",
    rating: 4,
    tags: ["神经科", "脑梗塞", "溶栓治疗", "急诊会诊"],
  },
  {
    id: "rec-003",
    title: "骨折复杂病例讨论",
    patient: "刘强",
    patientId: "P12347",
    date: "2025-04-25",
    time: "09:00-10:30",
    duration: "1小时30分钟",
    department: "骨科",
    status: "archived",
    participants: [
      { name: "周医生", role: "主任医师", hospital: "中心医院" },
      { name: "吴医生", role: "主治医师", hospital: "社区医院" },
    ],
    recordings: [
      { type: "video", size: "1.1GB", duration: "1:30:00", quality: "HD" },
      { type: "screen", size: "600MB", duration: "30:00", quality: "HD" },
    ],
    documents: [
      { name: "手术方案.pdf", size: "3.2MB", type: "pdf" },
      { name: "X光片.zip", size: "12MB", type: "zip" },
    ],
    summary: "患者刘强，42岁，复杂性骨折。制定了详细的手术方案。",
    rating: 5,
    tags: ["骨科", "复杂骨折", "手术方案"],
  },
]

export default function ConsultationRecords() {
  const [records, setRecords] = useState(consultationRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState("00:00")
  const [totalTime, setTotalTime] = useState("00:00")

  // 过滤记录
  const filteredRecords = records.filter(
    (record) =>
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 播放/暂停录制
  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  // 下载录制文件
  const downloadRecording = (recordId: string, type: string) => {
    console.log(`下载录制文件: ${recordId} - ${type}`)
  }

  // 删除记录
  const deleteRecord = (recordId: string) => {
    setRecords(records.filter((r) => r.id !== recordId))
  }

  // 归档记录
  const archiveRecord = (recordId: string) => {
    setRecords(records.map((r) => (r.id === recordId ? { ...r, status: "archived" } : r)))
  }

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500"
      case "archived":
        return "bg-gray-500"
      case "processing":
        return "bg-amber-500"
      default:
        return "bg-blue-500"
    }
  }

  // 获取状态文本
  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "已完成"
      case "archived":
        return "已归档"
      case "processing":
        return "处理中"
      default:
        return "未知"
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            会诊记录管理
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索会诊记录..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              筛选
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">记录列表</TabsTrigger>
            <TabsTrigger value="player">播放器</TabsTrigger>
            <TabsTrigger value="analytics">统计分析</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="space-y-3">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{record.title}</h3>
                          <Badge variant="outline">{record.department}</Badge>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(record.status)}`}></div>
                          <span className="text-xs text-muted-foreground">{getStatusText(record.status)}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{record.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{record.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{record.participants.length} 位医生</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="text-sm font-medium mb-1">
                            患者: {record.patient} ({record.patientId})
                          </div>
                          <div className="text-sm text-muted-foreground">{record.summary}</div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex -space-x-2">
                            {record.participants.map((participant, index) => (
                              <Avatar key={index} className="border-2 border-white w-8 h-8">
                                <AvatarImage src="/compassionate-doctor-consultation.png" alt={participant.name} />
                                <AvatarFallback>{participant.name.slice(0, 1)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {record.participants.map((p) => p.name).join(", ")}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {record.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < record.rating ? "text-amber-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedRecord(record)}>
                              <Eye className="w-4 h-4 mr-1" />
                              查看
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{record.title}</DialogTitle>
                              <DialogDescription>
                                {record.date} {record.time} | {record.duration}
                              </DialogDescription>
                            </DialogHeader>

                            {selectedRecord && (
                              <div className="space-y-4">
                                {/* 录制文件 */}
                                <div>
                                  <h4 className="font-medium mb-2">录制文件</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {selectedRecord.recordings.map((recording, index) => (
                                      <Card key={index}>
                                        <CardContent className="p-3">
                                          <div className="flex items-center gap-2 mb-2">
                                            {recording.type === "video" && <Video className="w-4 h-4 text-blue-500" />}
                                            {recording.type === "audio" && <Mic className="w-4 h-4 text-emerald-500" />}
                                            {recording.type === "screen" && (
                                              <Share2 className="w-4 h-4 text-purple-500" />
                                            )}
                                            <span className="font-medium capitalize">{recording.type}</span>
                                          </div>
                                          <div className="text-sm text-muted-foreground mb-2">
                                            <div>大小: {recording.size}</div>
                                            <div>时长: {recording.duration}</div>
                                            <div>质量: {recording.quality}</div>
                                          </div>
                                          <div className="flex gap-2">
                                            <Button size="sm" variant="outline">
                                              <Play className="w-3 h-3 mr-1" />
                                              播放
                                            </Button>
                                            <Button size="sm" variant="outline">
                                              <Download className="w-3 h-3 mr-1" />
                                              下载
                                            </Button>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                </div>

                                {/* 相关文档 */}
                                <div>
                                  <h4 className="font-medium mb-2">相关文档</h4>
                                  <div className="space-y-2">
                                    {selectedRecord.documents.map((doc, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between p-2 border rounded-lg"
                                      >
                                        <div className="flex items-center gap-2">
                                          <FileText className="w-4 h-4 text-blue-500" />
                                          <div>
                                            <div className="font-medium">{doc.name}</div>
                                            <div className="text-xs text-muted-foreground">{doc.size}</div>
                                          </div>
                                        </div>
                                        <Button size="sm" variant="outline">
                                          <Download className="w-3 h-3 mr-1" />
                                          下载
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* 参与者信息 */}
                                <div>
                                  <h4 className="font-medium mb-2">参与者</h4>
                                  <div className="space-y-2">
                                    {selectedRecord.participants.map((participant, index) => (
                                      <div key={index} className="flex items-center gap-3 p-2 border rounded-lg">
                                        <Avatar>
                                          <AvatarImage
                                            src="/compassionate-doctor-consultation.png"
                                            alt={participant.name}
                                          />
                                          <AvatarFallback>{participant.name.slice(0, 1)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">{participant.name}</div>
                                          <div className="text-sm text-muted-foreground">
                                            {participant.role} · {participant.hospital}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>操作</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              编辑记录
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => archiveRecord(record.id)}>
                              <Archive className="w-4 h-4 mr-2" />
                              归档记录
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              导出记录
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => deleteRecord(record.id)}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              删除记录
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="player" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">会诊录制播放器</h3>
                  <p className="text-muted-foreground mb-6">选择一个会诊记录开始播放</p>

                  {/* 播放控制 */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      上一个
                    </Button>
                    <Button size="lg" onClick={togglePlayback}>
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      下一个
                    </Button>
                  </div>

                  {/* 进度条 */}
                  <div className="flex items-center gap-2 max-w-md mx-auto">
                    <span className="text-sm text-muted-foreground">{currentTime}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{totalTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">总记录数</div>
                  <div className="text-2xl font-bold text-blue-600">{records.length}</div>
                  <div className="text-xs text-muted-foreground">本月新增 12 条</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">总时长</div>
                  <div className="text-2xl font-bold text-emerald-600">45.5小时</div>
                  <div className="text-xs text-muted-foreground">平均 1.5 小时/次</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">存储空间</div>
                  <div className="text-2xl font-bold text-amber-600">125GB</div>
                  <div className="text-xs text-muted-foreground">剩余 875GB</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">平均评分</div>
                  <div className="text-2xl font-bold text-purple-600">4.7</div>
                  <div className="text-xs text-muted-foreground">满意度很高</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
