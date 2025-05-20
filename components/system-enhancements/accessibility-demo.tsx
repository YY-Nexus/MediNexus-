"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useA11y } from "@/hooks/use-a11y"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, CheckCircle, AlertTriangle } from "lucide-react"

export function AccessibilityDemo() {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [screenReaderMessage, setScreenReaderMessage] = useState("")
  const { announce, createButtonProps } = useA11y()
  const customButtonRef = useRef<HTMLDivElement>(null)

  // 处理高对比度切换
  const handleHighContrastChange = (checked: boolean) => {
    setHighContrast(checked)
    document.documentElement.classList.toggle("high-contrast", checked)
    announce(checked ? "已启用高对比度模式" : "已禁用高对比度模式", { politeness: "assertive" })
  }

  // 处理大文本切换
  const handleLargeTextChange = (checked: boolean) => {
    setLargeText(checked)
    document.documentElement.classList.toggle("large-text", checked)
    announce(checked ? "已启用大文本模式" : "已禁用大文本模式", { politeness: "assertive" })
  }

  // 发送屏幕阅读器消息
  const handleSendMessage = () => {
    if (screenReaderMessage.trim()) {
      announce(screenReaderMessage, { politeness: "polite" })
      setScreenReaderMessage("")
    }
  }

  // 为自定义按钮添加无障碍支持
  useEffect(() => {
    if (customButtonRef.current) {
      const props = createButtonProps("自定义无障碍按钮")

      // 添加ARIA属性
      Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith("aria-") || key === "role" || key === "tabIndex") {
          customButtonRef.current?.setAttribute(key, String(value))
        }
      })

      // 添加键盘事件
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          customButtonRef.current?.click()
        }
      }

      customButtonRef.current.addEventListener("keydown", handleKeyDown)

      return () => {
        customButtonRef.current?.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [createButtonProps])

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>无障碍性设置</CardTitle>
          <CardDescription>调整系统的无障碍性设置以提高可用性</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">高对比度模式</Label>
              <p className="text-sm text-muted-foreground">增强文本和背景的对比度</p>
            </div>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={handleHighContrastChange}
              aria-label="高对比度模式"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="large-text">大文本模式</Label>
              <p className="text-sm text-muted-foreground">增大文本尺寸以提高可读性</p>
            </div>
            <Switch
              id="large-text"
              checked={largeText}
              onCheckedChange={handleLargeTextChange}
              aria-label="大文本模式"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>屏幕阅读器支持</CardTitle>
          <CardDescription>测试屏幕阅读器公告功能</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="screen-reader-message">屏幕阅读器消息</Label>
            <Input
              id="screen-reader-message"
              placeholder="输入要发送到屏幕阅读器的消息"
              value={screenReaderMessage}
              onChange={(e) => setScreenReaderMessage(e.target.value)}
            />
          </div>
          <Button onClick={handleSendMessage} disabled={!screenReaderMessage.trim()}>
            发送到屏幕阅读器
          </Button>

          <Alert className="mt-4">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>
              如果您启用了屏幕阅读器，将会听到您发送的消息。这个功能用于向视障用户提供重要信息。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>无障碍组件示例</CardTitle>
          <CardDescription>展示具有增强无障碍性的组件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">标准按钮（带有适当的ARIA标签）</h3>
            <div className="flex gap-2">
              <Button aria-label="保存文档">保存</Button>
              <Button variant="outline" aria-label="取消操作">
                取消
              </Button>
              <Button variant="destructive" aria-label="删除文档">
                删除
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">自定义无障碍元素</h3>
            <div
              ref={customButtonRef}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              onClick={() => announce("自定义按钮已点击", { politeness: "assertive" })}
            >
              自定义无障碍按钮
            </div>
            <p className="text-sm text-muted-foreground">
              这个自定义元素使用了useA11y钩子添加了完整的键盘导航和屏幕阅读器支持
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">状态通知</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => announce("操作已成功完成", { politeness: "polite" })}
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
                成功状态
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => announce("警告：操作可能未完全完成", { politeness: "assertive" })}
              >
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                警告状态
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">所有组件都遵循WCAG AA级标准，确保对所有用户的可访问性</p>
        </CardFooter>
      </Card>
    </div>
  )
}
