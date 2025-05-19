"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, Volume2, VolumeX } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// 创建一个简单的本地存储工具，避免直接依赖外部模块
const localStorageUtil = {
  setItem: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  },

  getItem: (key: string, defaultValue: any) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error)
      return defaultValue
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  },
}

// 触觉反馈工具
const hapticFeedback = {
  // 检查设备是否支持振动
  isSupported: () => {
    return typeof window !== "undefined" && "vibrate" in navigator
  },

  // 短振动 - 用于普通操作反馈
  light: () => {
    if (hapticFeedback.isSupported()) {
      navigator.vibrate(15)
    }
  },

  // 中等振动 - 用于完成操作
  medium: () => {
    if (hapticFeedback.isSupported()) {
      navigator.vibrate(30)
    }
  },

  // 强振动 - 用于错误或警告
  strong: () => {
    if (hapticFeedback.isSupported()) {
      navigator.vibrate([30, 50, 60])
    }
  },

  // 成功模式振动 - 用于验证成功
  success: () => {
    if (hapticFeedback.isSupported()) {
      navigator.vibrate([15, 50, 15, 50, 30])
    }
  },

  // 错误模式振动 - 用于验证失败
  error: () => {
    if (hapticFeedback.isSupported()) {
      navigator.vibrate([60, 50, 60])
    }
  },

  // 取消所有振动
  cancel: () => {
    if (hapticFeedback.isSupported()) {
      navigator.vibrate(0)
    }
  },
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captcha, setCaptcha] = useState(["", "", "", "", "", ""])
  const [generatedCaptcha, setGeneratedCaptcha] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [hapticEnabled, setHapticEnabled] = useState(true)
  const { login, isLoading, error, clearError } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get("returnUrl") || "/"
  const isMobile = useMobile()
  const isHapticSupported = useRef(false)

  // 创建验证码输入框的引用
  const captchaRefs = useRef<(HTMLInputElement | null)[]>([])

  // 检查振动支持
  useEffect(() => {
    isHapticSupported.current = hapticFeedback.isSupported()

    // 从本地存储加载振动设置
    const savedHapticSetting = localStorageUtil.getItem("hapticFeedbackEnabled", true)
    setHapticEnabled(savedHapticSetting)

    // 组件卸载时取消所有振动
    return () => {
      hapticFeedback.cancel()
    }
  }, [])

  // 保存振动设置
  useEffect(() => {
    localStorageUtil.setItem("hapticFeedbackEnabled", hapticEnabled)
  }, [hapticEnabled])

  // 触发触觉反馈（如果启用）
  const triggerHaptic = (type: "light" | "medium" | "strong" | "success" | "error") => {
    if (hapticEnabled && isMobile) {
      hapticFeedback[type]()
    }
  }

  // 生成验证码
  const generateCaptcha = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000) // 生成6位数字
    setGeneratedCaptcha(randomNum.toString())
    if (isMobile) {
      triggerHaptic("medium")
    }
    return randomNum.toString()
  }

  // 初始化：检查本地存储的凭据和生成验证码
  useEffect(() => {
    // 生成初始验证码
    generateCaptcha()

    // 检查是否有保存的凭据
    const savedCredentials = localStorageUtil.getItem("rememberedCredentials", null)
    if (savedCredentials) {
      setEmail(savedCredentials.email || "")
      setPassword(savedCredentials.password || "")
      setRememberMe(true)
    }
  }, [])

  // 自动登录逻辑
  useEffect(() => {
    const autoLogin = async () => {
      const captchaValue = captcha.join("")
      // 检查所有字段是否填写且验证码正确
      if (email && password && captchaValue.length === 6 && captchaValue === generatedCaptcha && !isLoading && !error) {
        triggerHaptic("success")
        await handleSubmit(null, true)
      }
    }

    autoLogin()
  }, [email, password, captcha, generatedCaptcha])

  const handleSubmit = async (e: React.FormEvent | null, isAuto = false) => {
    if (e) e.preventDefault()
    clearError()

    try {
      const captchaValue = captcha.join("")
      // 验证码检查
      if (captchaValue !== generatedCaptcha) {
        triggerHaptic("error")
        throw new Error("验证码不正确")
      }

      // 保存凭据（如果选择了"记住我"）
      if (rememberMe) {
        localStorageUtil.setItem("rememberedCredentials", { email, password })
      } else {
        localStorageUtil.removeItem("rememberedCredentials")
      }

      // 登录前触发成功振动
      if (!isAuto) {
        triggerHaptic("success")
      }

      // 登录
      await login(email, password)
      router.push(returnUrl)
    } catch (err: any) {
      // 如果是自动登录模式，不显示错误
      if (!isAuto) {
        // 刷新验证码
        refreshCaptcha()
      }
    }
  }

  // 刷新验证码
  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha()
    setCaptcha(["", "", "", "", "", ""])
    // 聚焦第一个输入框
    if (captchaRefs.current[0]) {
      captchaRefs.current[0].focus()
    }
  }

  // 处理验证码输入
  const handleCaptchaChange = (index: number, value: string) => {
    // 只允许输入数字
    if (!/^\d*$/.test(value)) return

    const newCaptcha = [...captcha]
    newCaptcha[index] = value.slice(0, 1) // 只取第一个字符

    setCaptcha(newCaptcha)

    // 触发轻微振动反馈
    triggerHaptic("light")

    // 自动聚焦下一个输入框
    if (value && index < 5 && captchaRefs.current[index + 1]) {
      captchaRefs.current[index + 1].focus()
    }

    // 如果是最后一个数字且所有数字都已填写，触发中等振动
    if (index === 5 && value && !newCaptcha.includes("")) {
      triggerHaptic("medium")
    }
  }

  // 处理验证码键盘事件
  const handleCaptchaKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // 处理删除键
    if (e.key === "Backspace" && !captcha[index]) {
      // 如果当前输入框为空且按下删除键，聚焦上一个输入框
      if (index > 0 && captchaRefs.current[index - 1]) {
        captchaRefs.current[index - 1].focus()
        triggerHaptic("light")
      }
    }
  }

  // 处理验证码粘贴
  const handleCaptchaPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    const digits = pastedData.replace(/\D/g, "").slice(0, 6).split("")

    const newCaptcha = [...captcha]
    digits.forEach((digit, index) => {
      if (index < 6) {
        newCaptcha[index] = digit
      }
    })

    setCaptcha(newCaptcha)

    // 粘贴完成触发中等振动
    triggerHaptic("medium")

    // 聚焦到最后一个填充的输入框的下一个，或者最后一个
    const focusIndex = Math.min(digits.length, 5)
    if (captchaRefs.current[focusIndex]) {
      captchaRefs.current[focusIndex].focus()
    }
  }

  // 切换触觉反馈
  const toggleHaptic = () => {
    setHapticEnabled(!hapticEnabled)
    // 提供切换反馈
    if (!hapticEnabled) {
      // 如果当前是关闭状态，切换到开启时提供反馈
      hapticFeedback.medium()
    }
  }

  return (
    <div className="w-full max-w-md p-4 sm:p-8 space-y-6 sm:space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold">登录到 MediNexus³</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">请输入您的凭据继续</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            disabled={isLoading}
            className="h-12 text-base px-4"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">密码</Label>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              忘记密码?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={isLoading}
            className="h-12 text-base px-4"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="captcha-0">验证码</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={refreshCaptcha}
              className="h-8 px-2 text-blue-600"
              onMouseDown={() => triggerHaptic("medium")}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              <span className="text-xs">刷新</span>
            </Button>
          </div>

          {isMobile ? (
            // 移动端分离式验证码输入
            <div className="flex justify-between space-x-1 sm:space-x-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="w-full">
                  <Input
                    id={`captcha-${index}`}
                    ref={(el) => (captchaRefs.current[index] = el)}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={captcha[index]}
                    onChange={(e) => handleCaptchaChange(index, e.target.value)}
                    onKeyDown={(e) => handleCaptchaKeyDown(index, e)}
                    onPaste={index === 0 ? handleCaptchaPaste : undefined}
                    required
                    disabled={isLoading}
                    className="h-14 text-xl text-center px-0 font-mono"
                  />
                </div>
              ))}
            </div>
          ) : (
            // 桌面端验证码显示和输入
            <div className="flex items-center space-x-3">
              <Input
                id="captcha-full"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={captcha.join("")}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                  setCaptcha(value.split("").concat(Array(6 - value.length).fill("")))
                }}
                placeholder="请输入验证码"
                required
                disabled={isLoading}
                className="flex-1 h-12 text-base px-4"
              />
              <div
                className="px-4 py-3 bg-gray-100 border rounded-md cursor-pointer select-none font-mono text-lg tracking-widest min-w-[120px] text-center"
                onClick={refreshCaptcha}
                title="点击刷新验证码"
              >
                {generatedCaptcha}
              </div>
            </div>
          )}

          {/* 验证码提示 */}
          {isMobile && (
            <div className="mt-2 p-3 bg-gray-50 border rounded-md">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-500">验证码:</p>

                {isHapticSupported.current && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1">
                          <Switch id="haptic-toggle" checked={hapticEnabled} onCheckedChange={toggleHaptic} size="sm" />
                          <Label htmlFor="haptic-toggle" className="text-xs text-gray-500 cursor-pointer">
                            {hapticEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                          </Label>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{hapticEnabled ? "关闭触觉反馈" : "开启触觉反馈"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <p className="font-mono text-lg tracking-widest text-center">{generatedCaptcha}</p>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 py-1">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => {
              setRememberMe(checked === true)
              if (isMobile) triggerHaptic("light")
            }}
          />
          <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
            记住我
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base"
          disabled={isLoading}
          onMouseDown={() => triggerHaptic("medium")}
        >
          {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
          {isLoading ? "登录中..." : "登录"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-600">还没有账号? </span>
        <a href="/register" className="text-blue-600 hover:underline" onMouseDown={() => triggerHaptic("light")}>
          注册
        </a>
      </div>
    </div>
  )
}
