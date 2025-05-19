"use client"

import * as React from "react"
import { DateRangePicker } from "@/components/ui/date-picker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addDays, addMonths, format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check } from "lucide-react"
import type { DateRange } from "react-day-picker"

export default function DateRangeValidationExample() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [validationError, setValidationError] = React.useState<string | null>(null)
  const [submittedRange, setSubmittedRange] = React.useState<string | null>(null)

  // 示例：最小日期为30天前，最大日期为30天后
  const minDate = addDays(new Date(), -30)
  const maxDate = addDays(new Date(), 30)

  // 示例：每周日禁用
  const disabledDates = (date: Date) => {
    return date.getDay() === 0 // 0 表示周日
  }

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!dateRange || !dateRange.from || !dateRange.to) {
      setValidationError("请选择有效的日期范围")
      return
    }

    if (!validationError) {
      setSubmittedRange(
        `${format(dateRange.from, "yyyy年MM月dd日", { locale: zhCN })} 至 ${format(dateRange.to, "yyyy年MM月dd日", { locale: zhCN })}`,
      )
    }
  }

  // 自定义预设
  const customPresets = [
    {
      label: "未来7天",
      value: {
        from: new Date(),
        to: addDays(new Date(), 6),
      },
    },
    {
      label: "未来30天",
      value: {
        from: new Date(),
        to: addDays(new Date(), 29),
      },
    },
    {
      label: "下个月",
      value: {
        from: addMonths(new Date(), 1),
        to: addDays(addMonths(new Date(), 2), -1),
      },
    },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>日期范围验证示例</CardTitle>
        <CardDescription>演示日期范围选择器的各种验证功能</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">基本验证</h3>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              placeholder="选择报告日期范围"
              minDate={minDate}
              maxDate={maxDate}
              maxRangeDays={14}
              disabledDates={disabledDates}
              onValidationError={setValidationError}
              required
              presets={customPresets}
            />
            <p className="text-xs text-muted-foreground">
              • 必须选择日期范围
              <br />• 开始日期不能早于 {format(minDate, "yyyy年MM月dd日", { locale: zhCN })}
              <br />• 结束日期不能晚于 {format(maxDate, "yyyy年MM月dd日", { locale: zhCN })}
              <br />• 日期范围不能超过14天
              <br />• 周日不可选
            </p>
          </div>

          <Button type="submit" className="w-full">
            提交日期范围
          </Button>

          {submittedRange && !validationError && (
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">提交成功</AlertTitle>
              <AlertDescription className="text-green-700">您选择的日期范围：{submittedRange}</AlertDescription>
            </Alert>
          )}

          {validationError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>验证错误</AlertTitle>
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
