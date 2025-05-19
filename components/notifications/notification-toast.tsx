"use client"

import { useEffect } from "react"
import { useNotifications } from "@/components/providers/notification-provider"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"

export function NotificationToast() {
  const { notifications } = useNotifications()
  const { toast } = useToast()

  // 获取通知图标
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5" />
      case "warning":
        return <AlertTriangle className="h-5 w-5" />
      case "error":
        return <AlertCircle className="h-5 w-5" />
      case "info":
      default:
        return <Info className="h-5 w-5" />
    }
  }

  // 监听新通知并显示toast
  useEffect(() => {
    const lastNotification = notifications[0]
    if (lastNotification && !lastNotification.read) {
      // 使用一个简单的方法来跟踪已显示的通知
      const shownNotificationIds = new Set<string>()

      if (!shownNotificationIds.has(lastNotification.id)) {
        shownNotificationIds.add(lastNotification.id)

        toast({
          title: lastNotification.title,
          description: lastNotification.message,
          variant: lastNotification.type === "error" ? "destructive" : "default",
          icon: getNotificationIcon(lastNotification.type),
        })
      }
    }
  }, [notifications, toast])

  return null // 这个组件不渲染任何UI，只负责显示toast
}
