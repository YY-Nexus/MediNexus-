"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  UserPlus,
  Crown,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Hand,
  MessageSquare,
  Settings,
  Shield,
  Volume2,
  PhoneOff,
  AlertCircle,
  CheckCircle,
  XCircle,
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

// 模拟大规模会诊参与者数据
const participants = [
  {
    id: 1,
    name: "王医生",
    role: "心脏科主任",
    hospital: "中心医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "online",
    permission: "host",
    videoEnabled: true,
    audioEnabled: true,
    isRaiseHand: false,
    isSpeaking: true,
    joinTime: "10:00",
    location: "北京",
  },
  {
    id: 2,
    name: "李医生",
    role: "心脏外科医生",
    hospital: "中心医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "online",
    permission: "moderator",
    videoEnabled: true,
    audioEnabled: true,
    isRaiseHand: false,
    isSpeaking: false,
    joinTime: "10:02",
    location: "北京",
  },
  {
    id: 3,
    name: "张医生",
    role: "放射科医生",
    hospital: "区域医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "online",
    permission: "participant",
    videoEnabled: true,
    audioEnabled: false,
    isRaiseHand: true,
    isSpeaking: false,
    joinTime: "10:05",
    location: "上海",
  },
  {
    id: 4,
    name: "赵医生",
    role: "内科医生",
    hospital: "社区医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "online",
    permission: "participant",
    videoEnabled: false,
    audioEnabled: true,
    isRaiseHand: false,
    isSpeaking: false,
    joinTime: "10:08",
    location: "广州",
  },
  {
    id: 5,
    name: "钱医生",
    role: "神经科医生",
    hospital: "专科医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "online",
    permission: "participant",
    videoEnabled: true,
    audioEnabled: true,
    isRaiseHand: false,
    isSpeaking: false,
    joinTime: "10:10",
    location: "深圳",
  },
  {
    id: 6,
    name: "孙医生",
    role: "儿科医生",
    hospital: "儿童医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "waiting",
    permission: "participant",
    videoEnabled: true,
    audioEnabled: true,
    isRaiseHand: false,
    isSpeaking: false,
    joinTime: "10:12",
    location: "杭州",
  },
  {
    id: 7,
    name: "周医生",
    role: "骨科医生",
    hospital: "骨科医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "offline",
    permission: "participant",
    videoEnabled: false,
    audioEnabled: false,
    isRaiseHand: false,
    isSpeaking: false,
    joinTime: "10:15",
    location: "成都",
  },
  {
    id: 8,
    name: "吴医生",
    role: "急诊科医生",
    hospital: "急救中心",
    avatar: "/compassionate-doctor-consultation.png",
    status: "online",
    permission: "participant",
    videoEnabled: true,
    audioEnabled: true,
    isRaiseHand: false,
    isSpeaking: false,
    joinTime: "10:18",
    location: "武汉",
  },
]

export default function MultiPartyConsultation() {
  const [participantList, setParticipantList] = useState(participants)
  const [currentSpeaker, setCurrentSpeaker] = useState<number | null>(1)
  const [waitingRoom, setWaitingRoom] = useState(participants.filter((p) => p.status === "waiting"))
  const [inviteEmail, setInviteEmail] = useState("")
  const [meetingSettings, setMeetingSettings] = useState({
    allowParticipantVideo: true,
    allowParticipantAudio: true,
    requireApproval: true,
    recordMeeting: true,
    maxParticipants: 50,
  })

  // 模拟实时更新
  useEffect(() => {
    const interval = setInterval(() => {
      // 随机更新说话状态
      setParticipantList((prev) =>
        prev.map((p) => ({
          ...p,
          isSpeaking: Math.random() > 0.9 && p.audioEnabled && p.status === "online",
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // 获取在线参与者
  const onlineParticipants = participantList.filter((p) => p.status === "online")
  const waitingParticipants = participantList.filter((p) => p.status === "waiting")

  // 邀请参与者
  const inviteParticipant = () => {
    if (inviteEmail) {
      console.log(`邀请参与者: ${inviteEmail}`)
      setInviteEmail("")
    }
  }

  // 批准参与者加入
  const approveParticipant = (participantId: number) => {
    setParticipantList((prev) => prev.map((p) => (p.id === participantId ? { ...p, status: "online" } : p)))
  }

  // 拒绝参与者加入
  const rejectParticipant = (participantId: number) => {
    setParticipantList((prev) => prev.filter((p) => p.id !== participantId))
  }

  // 静音参与者
  const muteParticipant = (participantId: number) => {
    setParticipantList((prev) => prev.map((p) => (p.id === participantId ? { ...p, audioEnabled: false } : p)))
  }

  // 移除参与者
  const removeParticipant = (participantId: number) => {
    setParticipantList((prev) => prev.filter((p) => p.id !== participantId))
  }

  // 设置发言人
  const setSpeaker = (participantId: number) => {
    setCurrentSpeaker(participantId)
    setParticipantList((prev) =>
      prev.map((p) => ({
        ...p,
        isSpeaking: p.id === participantId,
      })),
    )
  }

  // 处理举手
  const handleRaiseHand = (participantId: number) => {
    setParticipantList((prev) => prev.map((p) => (p.id === participantId ? { ...p, isRaiseHand: !p.isRaiseHand } : p)))
  }

  // 获取权限图标
  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case "host":
        return <Crown className="w-4 h-4 text-amber-500" />
      case "moderator":
        return <Shield className="w-4 h-4 text-blue-500" />
      default:
        return <Users className="w-4 h-4 text-gray-500" />
    }
  }

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500"
      case "waiting":
        return "bg-amber-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            多方会诊管理
            <Badge variant="outline" className="ml-2">
              {onlineParticipants.length} 人在线
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <UserPlus className="w-4 h-4 mr-1" />
                  邀请参与者
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>邀请参与者</DialogTitle>
                  <DialogDescription>输入医生的邮箱地址来邀请他们加入会诊</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="输入邮箱地址"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">取消</Button>
                    <Button onClick={inviteParticipant}>发送邀请</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-1" />
                  会议设置
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>会议设置</DialogTitle>
                  <DialogDescription>配置多方会诊的权限和功能设置</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">允许参与者开启视频</div>
                      <div className="text-sm text-muted-foreground">参与者可以自主控制视频</div>
                    </div>
                    <Button
                      variant={meetingSettings.allowParticipantVideo ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setMeetingSettings((prev) => ({
                          ...prev,
                          allowParticipantVideo: !prev.allowParticipantVideo,
                        }))
                      }
                    >
                      {meetingSettings.allowParticipantVideo ? "已启用" : "已禁用"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">允许参与者开启音频</div>
                      <div className="text-sm text-muted-foreground">参与者可以自主控制音频</div>
                    </div>
                    <Button
                      variant={meetingSettings.allowParticipantAudio ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setMeetingSettings((prev) => ({
                          ...prev,
                          allowParticipantAudio: !prev.allowParticipantAudio,
                        }))
                      }
                    >
                      {meetingSettings.allowParticipantAudio ? "已启用" : "已禁用"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">需要主持人批准</div>
                      <div className="text-sm text-muted-foreground">新参与者需要等待批准</div>
                    </div>
                    <Button
                      variant={meetingSettings.requireApproval ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setMeetingSettings((prev) => ({
                          ...prev,
                          requireApproval: !prev.requireApproval,
                        }))
                      }
                    >
                      {meetingSettings.requireApproval ? "已启用" : "已禁用"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">自动录制会议</div>
                      <div className="text-sm text-muted-foreground">自动录制整个会诊过程</div>
                    </div>
                    <Button
                      variant={meetingSettings.recordMeeting ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setMeetingSettings((prev) => ({
                          ...prev,
                          recordMeeting: !prev.recordMeeting,
                        }))
                      }
                    >
                      {meetingSettings.recordMeeting ? "已启用" : "已禁用"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="participants" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="participants">参与者管理</TabsTrigger>
            <TabsTrigger value="waiting">等待室 ({waitingParticipants.length})</TabsTrigger>
            <TabsTrigger value="layout">布局控制</TabsTrigger>
            <TabsTrigger value="analytics">会诊统计</TabsTrigger>
          </TabsList>

          <TabsContent value="participants" className="space-y-4">
            {/* 当前发言人 */}
            {currentSpeaker && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={participantList.find((p) => p.id === currentSpeaker)?.avatar || "/placeholder.svg"}
                          alt="当前发言人"
                        />
                        <AvatarFallback>
                          {participantList.find((p) => p.id === currentSpeaker)?.name.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Mic className="w-2 h-2 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {participantList.find((p) => p.id === currentSpeaker)?.name} (当前发言人)
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {participantList.find((p) => p.id === currentSpeaker)?.role} ·
                        {participantList.find((p) => p.id === currentSpeaker)?.hospital}
                      </div>
                    </div>
                    <Badge variant="default">正在发言</Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 参与者列表 */}
            <div className="space-y-2">
              {onlineParticipants.map((participant) => (
                <Card
                  key={participant.id}
                  className={`transition-all ${participant.isSpeaking ? "ring-2 ring-blue-500" : ""}`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                            <AvatarFallback>{participant.name.slice(0, 1)}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(participant.status)}`}
                          ></div>
                          {participant.isSpeaking && (
                            <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <Volume2 className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{participant.name}</span>
                            {getPermissionIcon(participant.permission)}
                            {participant.isRaiseHand && <Hand className="w-4 h-4 text-amber-500" />}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {participant.role} · {participant.hospital} · {participant.location}
                          </div>
                          <div className="text-xs text-muted-foreground">加入时间: {participant.joinTime}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* 状态指示器 */}
                        <div className="flex gap-1">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              participant.videoEnabled ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
                            }`}
                          >
                            {participant.videoEnabled ? (
                              <Video className="w-3 h-3" />
                            ) : (
                              <VideoOff className="w-3 h-3" />
                            )}
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              participant.audioEnabled ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                            }`}
                          >
                            {participant.audioEnabled ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
                          </div>
                        </div>

                        {/* 操作按钮 */}
                        <div className="flex gap-1">
                          {participant.isRaiseHand && (
                            <Button size="sm" variant="outline" onClick={() => setSpeaker(participant.id)}>
                              <Mic className="w-3 h-3 mr-1" />
                              允许发言
                            </Button>
                          )}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                操作
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>参与者操作</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => setSpeaker(participant.id)}>
                                <Mic className="w-4 h-4 mr-2" />
                                设为发言人
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => muteParticipant(participant.id)}>
                                <MicOff className="w-4 h-4 mr-2" />
                                静音
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                私聊
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => removeParticipant(participant.id)}
                              >
                                <PhoneOff className="w-4 h-4 mr-2" />
                                移除参与者
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="waiting" className="space-y-4">
            <div className="text-center py-4">
              <AlertCircle className="w-12 h-12 mx-auto mb-2 text-amber-500" />
              <h3 className="font-medium mb-1">等待室</h3>
              <p className="text-sm text-muted-foreground">{waitingParticipants.length} 位参与者正在等待批准加入会诊</p>
            </div>

            {waitingParticipants.length > 0 && (
              <div className="space-y-3">
                {waitingParticipants.map((participant) => (
                  <Card key={participant.id} className="border-amber-200">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                            <AvatarFallback>{participant.name.slice(0, 1)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{participant.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {participant.role} · {participant.hospital}
                            </div>
                            <div className="text-xs text-muted-foreground">等待时间: {participant.joinTime}</div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="default" onClick={() => approveParticipant(participant.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            批准
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => rejectParticipant(participant.id)}>
                            <XCircle className="w-4 h-4 mr-1" />
                            拒绝
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 text-center">
                  <div className="w-full h-20 bg-muted rounded mb-3 flex items-center justify-center">
                    <div className="text-xs text-muted-foreground">网格布局</div>
                  </div>
                  <div className="font-medium">网格视图</div>
                  <div className="text-sm text-muted-foreground">所有参与者平等显示</div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-muted/50 transition-colors border-blue-200 bg-blue-50">
                <CardContent className="p-4 text-center">
                  <div className="w-full h-20 bg-muted rounded mb-3 flex items-center justify-center">
                    <div className="text-xs text-muted-foreground">发言人布局</div>
                  </div>
                  <div className="font-medium">发言人视图</div>
                  <div className="text-sm text-muted-foreground">突出显示当前发言人</div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 text-center">
                  <div className="w-full h-20 bg-muted rounded mb-3 flex items-center justify-center">
                    <div className="text-xs text-muted-foreground">演示布局</div>
                  </div>
                  <div className="font-medium">演示视图</div>
                  <div className="text-sm text-muted-foreground">专注于屏幕共享内容</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">自动切换发言人</div>
                  <div className="text-sm text-muted-foreground">根据音频活动自动切换主视图</div>
                </div>
                <Button variant="outline" size="sm">
                  已启用
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">显示参与者姓名</div>
                  <div className="text-sm text-muted-foreground">在视频窗口显示参与者信息</div>
                </div>
                <Button variant="default" size="sm">
                  已启用
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">隐藏非活跃参与者</div>
                  <div className="text-sm text-muted-foreground">自动隐藏长时间未发言的参与者</div>
                </div>
                <Button variant="outline" size="sm">
                  已禁用
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">总参与者</div>
                  <div className="text-2xl font-bold text-blue-600">{participantList.length}</div>
                  <div className="text-xs text-muted-foreground">
                    在线: {onlineParticipants.length} | 等待: {waitingParticipants.length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">会诊时长</div>
                  <div className="text-2xl font-bold text-emerald-600">45分钟</div>
                  <div className="text-xs text-muted-foreground">预计还需 30 分钟</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">发言次数</div>
                  <div className="text-2xl font-bold text-amber-600">12次</div>
                  <div className="text-xs text-muted-foreground">平均 3.8 分钟/次</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">网络质量</div>
                  <div className="text-2xl font-bold text-purple-600">优秀</div>
                  <div className="text-xs text-muted-foreground">平均延迟 45ms</div>
                </CardContent>
              </Card>
            </div>

            {/* 参与者活跃度统计 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">参与者活跃度</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {onlineParticipants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                          <AvatarFallback>{participant.name.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{participant.name}</div>
                          <div className="text-xs text-muted-foreground">{participant.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div>发言: 3次</div>
                        <div>时长: 8分钟</div>
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
