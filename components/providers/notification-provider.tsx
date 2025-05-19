"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// 通知类型定义
export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  date: string
  read: boolean
}

// 通知上下文类型
interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "date" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAll: () => void
}

// 创建上下文
const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// 模拟通知数据
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "系统更新",
    message: "系统将于今晚22:00-23:00进行例行维护，期间部分功能可能暂时不可用。",
    type: "info",
    date: "2023-11-15T10:30:00",
    read: false,
  },
  {
    id: "2",
    title: "安全提醒",
    message: "您的账号刚刚在新设备上登录，如非本人操作，请立即修改密码。",
    type: "warning",
    date: "2023-11-14T16:45:00",
    read: false,
  },
  {
    id: "3",
    title: "资质验证成功",
    message: "您上传的医师资格证已通过验证，有效期至2030年12月31日。",
    type: "success",
    date: "2023-11-13T09:15:00",
    read: true,
  },
]

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  // 添加新通知
  const addNotification = (notification: Omit<Notification, "id" | "date" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  // 标记通知为已读
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // 标记所有通知为已读
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // 删除通知
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // 清空所有通知
  const clearAll = () => {
    setNotifications([])
  }

  // 模拟接收新通知
  useEffect(() => {
    // 每隔一段时间随机添加一条通知（仅用于演示）
    const demoTypes = ["info", "success", "warning", "error"] as const
    const demoTitles = ["患者预约", "检查结果", "系统通知", "安全提醒", "数据同步"]

    const interval = setInterval(() => {
      // 随机决定是否添加通知（20%概率）
      if (Math.random() > 0.8) {
        const randomType = demoTypes[Math.floor(Math.random() * demoTypes.length)]
        const randomTitle = demoTitles[Math.floor(Math.random() * demoTitles.length)]

        addNotification({
          title: randomTitle,
          message: `这是一条自动生成的${randomTitle}测试通知，时间：${new Date().toLocaleTimeString()}`,
          type: randomType,
        })
      }
    }, 60000) // 每分钟检查一次

    return () => clearInterval(interval)
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

// 自定义Hook，用于访问通知上下文
export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
