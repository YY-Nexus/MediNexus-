"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Info, AlertTriangle, X } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "warning" | "success" | "error"
  category: "system" | "patient" | "certification" | "security"
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  // 初始化通知数据
  useEffect(() => {
    const initialNotifications: Notification[] = [
      {
        id: "1",
        title: "资质验证完成",
        description: "张医生的《医师资格证》已通过验证",
        time: "10分钟前",
        read: false,
        type: "success",
        category: "certification",
      },
      {
        id: "2",
        title: "系统更新",
        description: "MediNexus³ 已更新至 3.5.2 版本",
        time: "1小时前",
        read: false,
        type: "info",
        category: "system",
      },
      {
        id: "3",
        title: "API使用量警告",
        description: "医证通API使用量已达到月度配额的85%",
        time: "昨天",
        read: true,
        type: "warning",
        category: "system",
      },
      {
        id: "4",
        title: "新患者预约",
        description: "患者王五已预约明天上午10:30的诊疗",
        time: "2天前",
        read: true,
        type: "info",
        category: "patient",
      },
      {
        id: "5",
        title: "安全警告",
        description: "检测到异常登录尝试，请检查账户安全",
        time: "3天前",
        read: true,
        type: "error",
        category: "security",
      },
    ]

    setNotifications(initialNotifications)
    updateUnreadCount(initialNotifications)
  }, [])

  // 模拟WebSocket连接，接收实时通知
  useEffect(() => {
    // 在实际应用中，这里会使用WebSocket或SSE建立实时连接
    const simulateRealTimeNotifications = () => {
      // 模拟新通知的到达
      const interval = setInterval(() => {
        // 随机决定是否发送新通知（20%的概率）
        if (Math.random() < 0.2) {
          const newNotificationTypes = [
            {
              title: "新患者记录已添加",
              description: "患者赵六的电子病历已成功创建",
              type: "info" as const,
              category: "patient" as const,
            },
            {
              title: "系统维护通知",
              description: "系统将于今晚22:00-23:00进行例行维护",
              type: "warning" as const,
              category: "system" as const,
            },
            {
              title: "资质即将过期",
              description: "李医生的《执业医师证》将在30天后过期",
              type: "warning" as const,
              category: "certification" as const,
            },
            {
              title: "安全策略更新",
              description: "系统安全策略已更新，请查看最新变更",
              type: "info" as const,
              category: "security" as const,
            },
          ]

          const randomType = newNotificationTypes[Math.floor(Math.random() * newNotificationTypes.length)]

          const newNotification: Notification = {
            id: Date.now().toString(),
            title: randomType.title,
            description: randomType.description,
            time: "刚刚",
            read: false,
            type: randomType.type,
            category: randomType.category,
          }

          setNotifications((prev) => [newNotification, ...prev])
          updateUnreadCount([newNotification, ...notifications])

          // 显示toast通知
          if (!open) {
            toast({
              title: newNotification.title,
              description: newNotification.description,
              variant: newNotification.type === "error" ? "destructive" : "default",
            })
          }
        }
      }, 30000) // 每30秒检查一次

      return () => clearInterval(interval)
    }

    const cleanup = simulateRealTimeNotifications()
    return cleanup
  }, [notifications, open, toast])

  const updateUnreadCount = (notifs: Notification[]) => {
    const count = notifs.filter((n) => !n.read).length
    setUnreadCount(count)

    // 更新浏览器标题，显示未读数量
    if (count > 0) {
      document.title = `(${count}) 医枢³ - 管理平台`
    } else {
      document.title = "医枢³ - 管理平台"
    }
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((n) => ({ ...n, read: true }))
    setNotifications(updatedNotifications)
    updateUnreadCount(updatedNotifications)
  }

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    setNotifications(updatedNotifications)
    updateUnreadCount(updatedNotifications)
  }

  const deleteNotification = (id: string) => {
    const updatedNotifications = notifications.filter((n) => n.id !== id)
    setNotifications(updatedNotifications)
    updateUnreadCount(updatedNotifications)
  }

  const getFilteredNotifications = () => {
    if (activeTab === "all") return notifications
    return notifications.filter((n) => n.category === activeTab)
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "success":
        return <Check className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <MedicalButton variant="ghost" size="icon" aria-label="通知" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="default"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-medical-500"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </MedicalButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[380px] max-w-[90vw]" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="text-base">通知中心</span>
          {unreadCount > 0 && (
            <MedicalButton variant="ghost" size="sm" className="h-8 text-xs" onClick={markAllAsRead}>
              全部标为已读
            </MedicalButton>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-2">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="system">系统</TabsTrigger>
            <TabsTrigger value="patient">患者</TabsTrigger>
            <TabsTrigger value="certification">资质</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="max-h-[300px]">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "px-3 py-2 hover:bg-muted/50 cursor-pointer relative group",
                      !notification.read && "bg-muted/30",
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(notification.type)}
                        <p className={cn("font-medium text-sm", !notification.read && "font-semibold")}>
                          {notification.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                        <button
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                        >
                          <X className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm mt-1 text-muted-foreground pl-6">{notification.description}</p>
                    {!notification.read && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-medical-500 rounded-full" />
                    )}
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <Bell className="h-8 w-8 mx-auto text-muted-foreground opacity-50" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {activeTab === "all" ? "没有通知" : `没有${getCategoryLabel(activeTab)}类通知`}
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-center cursor-pointer">查看全部通知</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function getCategoryLabel(category: string): string {
  const categoryMap: Record<string, string> = {
    system: "系统",
    patient: "患者",
    certification: "资质",
    security: "安全",
  }

  return categoryMap[category] || category
}
