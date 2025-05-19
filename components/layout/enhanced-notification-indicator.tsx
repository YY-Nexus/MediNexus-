"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bell, BellOff, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/components/providers/notification-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"

export function EnhancedNotificationIndicator() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications()
  const [open, setOpen] = useState(false)
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false)
  const [lastUnreadCount, setLastUnreadCount] = useState(unreadCount)

  // 监听未读通知数量变化，触发动画
  useEffect(() => {
    if (unreadCount > lastUnreadCount) {
      setShowBadgeAnimation(true)
      const timer = setTimeout(() => {
        setShowBadgeAnimation(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
    setLastUnreadCount(unreadCount)
  }, [unreadCount, lastUnreadCount])

  // 获取通知类型图标样式
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
      case "warning":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
      case "error":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
      case "info":
      default:
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
    }
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.round(diffMs / 60000)
    const diffHours = Math.round(diffMs / 3600000)
    const diffDays = Math.round(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins}分钟前`
    } else if (diffHours < 24) {
      return `${diffHours}小时前`
    } else if (diffDays < 7) {
      return `${diffDays}天前`
    } else {
      return date.toLocaleDateString("zh-CN")
    }
  }

  // 处理通知点击
  const handleNotificationClick = (id: string) => {
    markAsRead(id)
  }

  // 处理删除通知
  const handleDeleteNotification = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    deleteNotification(id)
  }

  // 处理标记已读
  const handleMarkAsRead = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    markAsRead(id)
  }

  return (
    <TooltipProvider>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                {unreadCount > 0 ? (
                  <Bell className="h-5 w-5 text-primary" />
                ) : (
                  <BellOff className="h-5 w-5 text-muted-foreground" />
                )}
                <AnimatePresence>
                  {unreadCount > 0 && (
                    <motion.div
                      initial={{ scale: showBadgeAnimation ? 0.5 : 1 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge
                        className={cn(
                          "px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center bg-red-500 text-white border-none",
                          showBadgeAnimation && "ring-2 ring-red-300 dark:ring-red-800",
                        )}
                        variant="outline"
                      >
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{unreadCount > 0 ? `${unreadCount}条未读通知` : "通知中心"}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-80" align="end">
          <DropdownMenuLabel className="flex justify-between items-center">
            <span>通知中心</span>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={markAllAsRead}>
                全部标为已读
              </Button>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="h-[400px]">
            <DropdownMenuGroup>
              {notifications.length === 0 ? (
                <div className="py-10 px-2 text-center text-muted-foreground">
                  <BellOff className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>暂无通知</p>
                </div>
              ) : (
                notifications.slice(0, 10).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      "flex flex-col items-start p-3 cursor-pointer relative group",
                      !notification.read && "bg-muted/50",
                    )}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getTypeStyles(notification.type)}>
                          {notification.type === "info" && "信息"}
                          {notification.type === "success" && "成功"}
                          {notification.type === "warning" && "警告"}
                          {notification.type === "error" && "错误"}
                        </Badge>
                        <span className="font-medium">{notification.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                    </div>
                    <p className="text-sm mt-1 text-muted-foreground line-clamp-2">{notification.message}</p>

                    {/* 操作按钮 */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      {!notification.read && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => handleMarkAsRead(e, notification.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left" align="center">
                            <p>标记为已读</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-500 hover:text-red-600"
                            onClick={(e) => handleDeleteNotification(e, notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left" align="center">
                          <p>删除通知</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuGroup>
          </ScrollArea>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="justify-center font-medium">
            <Link href="/notifications">查看全部通知</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}
