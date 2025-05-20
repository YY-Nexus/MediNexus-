"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/hooks/use-translation"
import { AlertCircle, CheckCircle2, Lock, Shield, User } from "lucide-react"
import { AccessControlPanel } from "@/components/access-control-panel"

export function SecurityDemo() {
  const { t } = useTranslation()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [twoFactorCode, setTwoFactorCode] = useState("")
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [loginStatus, setLoginStatus] = useState<"idle" | "error" | "success">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // 重置状态
    setLoginStatus("idle")
    setErrorMessage("")

    // 简单的验证
    if (!username || !password) {
      setLoginStatus("error")
      setErrorMessage(t("demo.security.emptyFields", "用户名和密码不能为空"))
      return
    }

    // 模拟登录过程
    setTimeout(() => {
      if (username === "admin" && password === "password123") {
        setShowTwoFactor(true)
      } else {
        setLoginStatus("error")
        setErrorMessage(t("demo.security.invalidCredentials", "用户名或密码不正确"))
      }
    }, 1000)
  }

  const handleTwoFactorSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 简单的验证
    if (!twoFactorCode) {
      setLoginStatus("error")
      setErrorMessage(t("demo.security.emptyTwoFactor", "请输入双因素验证码"))
      return
    }

    // 模拟验证过程
    setTimeout(() => {
      if (twoFactorCode === "123456") {
        setLoginStatus("success")
      } else {
        setLoginStatus("error")
        setErrorMessage(t("demo.security.invalidTwoFactor", "验证码不正确"))
      }
    }, 1000)
  }

  const resetForm = () => {
    setUsername("")
    setPassword("")
    setTwoFactorCode("")
    setShowTwoFactor(false)
    setLoginStatus("idle")
    setErrorMessage("")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            {t("demo.security.secureLogin", "安全登录演示")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loginStatus === "success" ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">{t("demo.security.loginSuccess", "登录成功")}</h3>
              <p className="text-muted-foreground mb-6">{t("demo.security.welcomeBack", "欢迎回来，管理员")}</p>
              <Button onClick={resetForm}>{t("demo.security.logout", "退出登录")}</Button>
            </div>
          ) : showTwoFactor ? (
            <form onSubmit={handleTwoFactorSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twoFactorCode">{t("demo.security.twoFactorCode", "双因素验证码")}</Label>
                <Input
                  id="twoFactorCode"
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="123456"
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  {t("demo.security.twoFactorHint", "演示提示：使用代码 123456")}
                </p>
              </div>

              {loginStatus === "error" && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button type="submit" className="flex-1">
                  {t("demo.security.verify", "验证")}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  {t("demo.security.cancel", "取消")}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{t("demo.security.username", "用户名")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    placeholder="admin"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("demo.security.usernameHint", "演示提示：使用 admin")}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("demo.security.password", "密码")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    placeholder="••••••••"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("demo.security.passwordHint", "演示提示：使用 password123")}
                </p>
              </div>

              {loginStatus === "error" && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}

              <Button type="submit" className="w-full">
                {t("demo.security.login", "登录")}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("demo.security.accessControl", "访问控制")}</CardTitle>
        </CardHeader>
        <CardContent>
          <AccessControlPanel />
        </CardContent>
      </Card>
    </div>
  )
}
