"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEnhancedLanguage } from "@/contexts/enhanced-language-context"
import { EnhancedLanguageSwitcher } from "@/components/language-switcher/enhanced-language-switcher"
import { Globe, Calendar, DollarSign, Percent, Clock } from "lucide-react"

// 示例翻译键
const translationKeys = {
  welcome: "common.welcome",
  dashboard: "navigation.dashboard",
  patients: "navigation.patients",
  medicalRecords: "medical.records",
  settings: "system.settings",
  logout: "auth.logout",
}

// 示例参数
const translationParams = {
  userName: "李医生",
  hospital: "北京协和医院",
  department: "心胸外科",
  patientCount: 42,
  completedTasks: 8,
  totalTasks: 12,
}

export function InternationalizationDemo() {
  const { t, formatDate, formatNumber, locale } = useEnhancedLanguage()
  const [dateFormat, setDateFormat] = useState<"short" | "medium" | "long">("medium")
  const [numberFormat, setNumberFormat] = useState<"currency" | "percent">("currency")

  // 当前日期和示例数字
  const currentDate = new Date()
  const exampleNumber = 1299.99

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>语言切换</CardTitle>
          <CardDescription>切换系统语言以查看国际化效果</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-lg font-medium">当前语言</h3>
              <p className="text-sm text-muted-foreground">选择您偏好的语言</p>
            </div>
            <EnhancedLanguageSwitcher />
          </div>

          <div className="p-4 bg-muted/50 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">语言设置信息</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              当前语言代码: <span className="font-mono">{locale}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              文本方向: <span className="font-mono">从左到右 (LTR)</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>文本翻译</CardTitle>
          <CardDescription>展示不同语言的文本翻译</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">基本翻译</h3>
              <div className="space-y-1">
                {Object.entries(translationKeys).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-2 bg-muted/50 rounded-md">
                    <span className="font-medium">{key}:</span>
                    <span>{t(value as any)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">带参数的翻译</h3>
              <div className="p-4 bg-muted/50 rounded-md">
                <p className="mb-2">{t("common.greeting", { name: translationParams.userName })}</p>
                <p className="mb-2">
                  {t("common.hospital_info", {
                    hospital: translationParams.hospital,
                    department: translationParams.department,
                  })}
                </p>
                <p className="mb-2">{t("common.patient_count", { count: translationParams.patientCount })}</p>
                <p>
                  {t("common.task_progress", {
                    completed: translationParams.completedTasks,
                    total: translationParams.totalTasks,
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>日期和数字格式化</CardTitle>
          <CardDescription>根据语言区域设置格式化日期和数字</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">日期格式化</h3>
              </div>

              <RadioGroup
                value={dateFormat}
                onValueChange={(value) => setDateFormat(value as any)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="date-short" />
                  <Label htmlFor="date-short">短格式</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="date-medium" />
                  <Label htmlFor="date-medium">中等格式</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="date-long" />
                  <Label htmlFor="date-long">长格式</Label>
                </div>
              </RadioGroup>

              <div className="p-4 bg-muted/50 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">格式化结果:</span>
                </div>
                <p className="text-lg font-medium">{formatDate(currentDate, dateFormat)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">数字格式化</h3>
              </div>

              <RadioGroup
                value={numberFormat}
                onValueChange={(value) => setNumberFormat(value as any)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="currency" id="number-currency" />
                  <Label htmlFor="number-currency">货币格式</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percent" id="number-percent" />
                  <Label htmlFor="number-percent">百分比格式</Label>
                </div>
              </RadioGroup>

              <div className="p-4 bg-muted/50 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  {numberFormat === "currency" ? (
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Percent className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm text-muted-foreground">格式化结果:</span>
                </div>
                <p className="text-lg font-medium">
                  {formatNumber(numberFormat === "percent" ? 0.8599 : exampleNumber, numberFormat)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            系统支持多种语言和区域设置，自动根据用户偏好调整日期、时间和数字格式
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
