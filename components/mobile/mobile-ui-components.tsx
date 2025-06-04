"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import {
  ChevronRight,
  Search,
  X,
  Plus,
  Heart,
  User,
  Home,
  Calendar,
  FileText,
  MessageSquare,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react"

// 移动端优化的按钮组件
export const MobileButton = ({
  children,
  size = "default",
  variant = "default",
  fullWidth = false,
  haptic = true,
  ...props
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleClick = useCallback(
    (e) => {
      // 触觉反馈模拟
      if (haptic && navigator.vibrate) {
        navigator.vibrate(10)
      }

      props.onClick?.(e)
    },
    [haptic, props.onClick],
  )

  const mobileSize = isMobile ? (size === "sm" ? "default" : size === "default" ? "lg" : size) : size

  return (
    <Button
      {...props}
      size={mobileSize}
      variant={variant}
      className={`
        ${fullWidth ? "w-full" : ""}
        ${isMobile ? "min-h-[44px] min-w-[44px]" : ""}
        ${props.className || ""}
      `}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}

// 移动端优化的输入框组件
export const MobileInput = ({ label, error, icon, clearable = false, ...props }) => {
  const [value, setValue] = useState(props.value || "")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleClear = useCallback(() => {
    setValue("")
    props.onChange?.({ target: { value: "" } })
  }, [props])

  return (
    <div className="space-y-2">
      {label && <Label className={`${isMobile ? "text-base" : "text-sm"}`}>{label}</Label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">{icon}</div>}
        <Input
          {...props}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            props.onChange?.(e)
          }}
          className={`
            ${icon ? "pl-10" : ""}
            ${clearable && value ? "pr-10" : ""}
            ${isMobile ? "h-12 text-base" : ""}
            ${error ? "border-red-500" : ""}
            ${props.className || ""}
          `}
        />
        {clearable && value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            onClick={handleClear}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  )
}

// 移动端优化的卡片组件
export const MobileCard = ({ children, interactive = false, padding = "default", ...props }) => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  const paddingClass = {
    none: "p-0",
    sm: isMobile ? "p-3" : "p-2",
    default: isMobile ? "p-4" : "p-4",
    lg: isMobile ? "p-6" : "p-6",
  }[padding]

  return (
    <Card
      {...props}
      className={`
        ${interactive ? "cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]" : ""}
        ${isMobile ? "rounded-lg" : ""}
        ${props.className || ""}
      `}
    >
      <CardContent className={paddingClass}>{children}</CardContent>
    </Card>
  )
}

// 移动端底部导航栏
export const MobileBottomNavigation = ({ items, activeItem, onItemChange }) => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  if (!isMobile) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemChange(item.id)}
            className={`
              flex flex-col items-center justify-center p-2 min-w-[60px]
              ${activeItem === item.id ? "text-blue-600" : "text-gray-600"}
              active:scale-95 transition-all
            `}
          >
            <div className="w-6 h-6 mb-1">{item.icon}</div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// 移动端滑动操作组件
export const MobileSwipeAction = ({ children, leftActions = [], rightActions = [], onSwipe }) => {
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isSwipping, setIsSwipping] = useState(false)
  const startX = useRef(0)
  const currentX = useRef(0)

  const handleTouchStart = useCallback((e) => {
    startX.current = e.touches[0].clientX
    setIsSwipping(true)
  }, [])

  const handleTouchMove = useCallback(
    (e) => {
      if (!isSwipping) return

      currentX.current = e.touches[0].clientX
      const diff = currentX.current - startX.current
      setSwipeOffset(Math.max(-100, Math.min(100, diff)))
    },
    [isSwipping],
  )

  const handleTouchEnd = useCallback(() => {
    setIsSwipping(false)

    if (Math.abs(swipeOffset) > 50) {
      const direction = swipeOffset > 0 ? "right" : "left"
      onSwipe?.(direction)
    }

    setSwipeOffset(0)
  }, [swipeOffset, onSwipe])

  return (
    <div className="relative overflow-hidden">
      {/* 左侧操作 */}
      {leftActions.length > 0 && (
        <div
          className="absolute left-0 top-0 bottom-0 flex items-center bg-green-500"
          style={{ width: Math.max(0, swipeOffset) }}
        >
          {leftActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-green-600"
              onClick={action.onClick}
            >
              {action.icon}
            </Button>
          ))}
        </div>
      )}

      {/* 右侧操作 */}
      {rightActions.length > 0 && (
        <div
          className="absolute right-0 top-0 bottom-0 flex items-center bg-red-500"
          style={{ width: Math.max(0, -swipeOffset) }}
        >
          {rightActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-600"
              onClick={action.onClick}
            >
              {action.icon}
            </Button>
          ))}
        </div>
      )}

      {/* 主内容 */}
      <div
        className="relative bg-white transition-transform"
        style={{ transform: `translateX(${swipeOffset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  )
}

// 移动端模态框组件
export const MobileModal = ({ isOpen, onClose, title, children, fullScreen = false }) => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* 模态框内容 */}
      <div
        className={`
        relative bg-white w-full max-w-lg mx-4
        ${
          isMobile && fullScreen
            ? "h-full rounded-t-lg"
            : isMobile
              ? "max-h-[80vh] rounded-t-lg"
              : "rounded-lg max-h-[90vh]"
        }
        ${isMobile ? "animate-slide-up" : "animate-fade-in"}
        overflow-hidden flex flex-col
      `}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* 内容 */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  )
}

// 移动端优化组件展示
export function MobileUIComponents() {
  const [activeNav, setActiveNav] = useState("home")
  const [modalOpen, setModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const navItems = [
    { id: "home", label: "首页", icon: <Home className="w-6 h-6" /> },
    { id: "calendar", label: "预约", icon: <Calendar className="w-6 h-6" /> },
    { id: "records", label: "记录", icon: <FileText className="w-6 h-6" /> },
    { id: "chat", label: "咨询", icon: <MessageSquare className="w-6 h-6" /> },
    { id: "profile", label: "我的", icon: <User className="w-6 h-6" /> },
  ]

  const leftActions = [{ icon: <CheckCircle className="w-4 h-4" />, onClick: () => console.log("标记完成") }]

  const rightActions = [{ icon: <X className="w-4 h-4" />, onClick: () => console.log("删除") }]

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">移动端UI组件</h2>
          <p className="text-muted-foreground">专为移动端优化的用户界面组件库</p>
        </div>
      </div>

      {/* 按钮组件展示 */}
      <Card>
        <CardHeader>
          <CardTitle>移动端优化按钮</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MobileButton size="sm">小按钮</MobileButton>
            <MobileButton>默认按钮</MobileButton>
            <MobileButton size="lg">大按钮</MobileButton>
            <MobileButton variant="outline">轮廓按钮</MobileButton>
          </div>
          <MobileButton fullWidth>
            <Plus className="w-4 h-4 mr-2" />
            全宽按钮
          </MobileButton>
        </CardContent>
      </Card>

      {/* 输入框组件展示 */}
      <Card>
        <CardHeader>
          <CardTitle>移动端优化输入框</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <MobileInput
            label="搜索"
            placeholder="输入关键词搜索..."
            icon={<Search className="w-4 h-4" />}
            clearable
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <MobileInput label="邮箱" placeholder="请输入邮箱地址" type="email" icon={<Mail className="w-4 h-4" />} />
          <MobileInput
            label="密码"
            placeholder="请输入密码"
            type="password"
            icon={<Lock className="w-4 h-4" />}
            error="密码长度至少8位"
          />
        </CardContent>
      </Card>

      {/* 卡片组件展示 */}
      <Card>
        <CardHeader>
          <CardTitle>移动端优化卡片</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <MobileCard interactive padding="sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">健康检查提醒</div>
                <div className="text-sm text-muted-foreground">您有一个预约即将到期</div>
              </div>
            </div>
          </MobileCard>

          <MobileCard interactive>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">体检报告已出</div>
                  <div className="text-sm text-muted-foreground">点击查看详细报告</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </MobileCard>
        </CardContent>
      </Card>

      {/* 滑动操作展示 */}
      <Card>
        <CardHeader>
          <CardTitle>滑动操作</CardTitle>
        </CardHeader>
        <CardContent>
          <MobileSwipeAction
            leftActions={leftActions}
            rightActions={rightActions}
            onSwipe={(direction) => console.log(`滑动方向: ${direction}`)}
          >
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="font-medium">用药提醒</div>
                  <div className="text-sm text-muted-foreground">左滑标记完成，右滑删除</div>
                </div>
              </div>
            </div>
          </MobileSwipeAction>
        </CardContent>
      </Card>

      {/* 模态框展示 */}
      <Card>
        <CardHeader>
          <CardTitle>移动端模态框</CardTitle>
        </CardHeader>
        <CardContent>
          <MobileButton onClick={() => setModalOpen(true)}>打开模态框</MobileButton>
        </CardContent>
      </Card>

      {/* 底部导航栏 */}
      <MobileBottomNavigation items={navItems} activeItem={activeNav} onItemChange={setActiveNav} />

      {/* 模态框 */}
      <MobileModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="示例模态框">
        <div className="space-y-4">
          <p>这是一个专为移动端优化的模态框组件。</p>
          <MobileInput label="姓名" placeholder="请输入您的姓名" />
          <MobileInput label="电话" placeholder="请输入手机号码" type="tel" />
          <div className="flex gap-2">
            <MobileButton variant="outline" fullWidth onClick={() => setModalOpen(false)}>
              取消
            </MobileButton>
            <MobileButton fullWidth onClick={() => setModalOpen(false)}>
              确认
            </MobileButton>
          </div>
        </div>
      </MobileModal>
    </div>
  )
}
