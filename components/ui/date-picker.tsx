"use client"

import * as React from "react"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Locale } from "date-fns"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  locale?: Locale
  dateFormat?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "选择日期",
  className,
  locale = zhCN,
  dateFormat = "yyyy-MM-dd",
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal h-8", !value && "text-muted-foreground", className)}
        >
          <CalendarIcon className="mr-2 h-3 w-3" />
          {value ? format(value, dateFormat, { locale }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus locale={locale} />
      </PopoverContent>
    </Popover>
  )
}

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  className?: string
  locale?: Locale
  dateFormat?: string
  presets?: {
    label: string
    value: DateRange
  }[]
  // 新增验证相关属性
  minDate?: Date
  maxDate?: Date
  maxRangeDays?: number
  disabledDates?: Date[] | ((date: Date) => boolean)
  errorMessage?: string
  onValidationError?: (error: string) => void
  required?: boolean
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "选择日期范围",
  className,
  locale = zhCN,
  dateFormat = "yyyy-MM-dd",
  presets,
  // 新增验证相关属性
  minDate,
  maxDate,
  maxRangeDays,
  disabledDates,
  errorMessage: customErrorMessage,
  onValidationError,
  required = false,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value)
  const [error, setError] = React.useState<string | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  // 默认预设选项
  const defaultPresets = [
    {
      label: "今天",
      value: {
        from: new Date(),
        to: new Date(),
      },
    },
    {
      label: "昨天",
      value: {
        from: addDays(new Date(), -1),
        to: addDays(new Date(), -1),
      },
    },
    {
      label: "最近7天",
      value: {
        from: addDays(new Date(), -6),
        to: new Date(),
      },
    },
    {
      label: "最近30天",
      value: {
        from: addDays(new Date(), -29),
        to: new Date(),
      },
    },
    {
      label: "本月",
      value: {
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
      },
    },
  ]

  const rangePresets = presets || defaultPresets

  // 验证日期范围
  const validateDateRange = React.useCallback(
    (range?: DateRange): string | null => {
      if (required && (!range || !range.from)) {
        return "请选择日期范围"
      }

      if (!range || !range.from || !range.to) {
        return null
      }

      // 验证开始日期不能晚于结束日期
      if (range.from > range.to) {
        return "开始日期不能晚于结束日期"
      }

      // 验证最小日期
      if (minDate && range.from < minDate) {
        return `开始日期不能早于 ${format(minDate, dateFormat, { locale })}`
      }

      // 验证最大日期
      if (maxDate && range.to > maxDate) {
        return `结束日期不能晚于 ${format(maxDate, dateFormat, { locale })}`
      }

      // 验证日期范围的最大跨度
      if (maxRangeDays && range.from && range.to) {
        const diffDays = Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))
        if (diffDays > maxRangeDays) {
          return `日期范围不能超过 ${maxRangeDays} 天`
        }
      }

      return null
    },
    [required, minDate, maxDate, maxRangeDays, dateFormat, locale],
  )

  // 处理日期变更
  const handleDateChange = React.useCallback(
    (newDate: DateRange | undefined) => {
      setDate(newDate)

      if (newDate) {
        const validationError = validateDateRange(newDate)
        setError(validationError)

        if (validationError) {
          onValidationError?.(validationError)
        } else if (onChange) {
          onChange(newDate)
        }
      } else {
        setError(required ? "请选择日期范围" : null)
        if (!required && onChange) {
          onChange(undefined)
        }
      }
    },
    [validateDateRange, onChange, required, onValidationError],
  )

  // 处理预设选择
  const handlePresetSelect = React.useCallback(
    (preset: DateRange) => {
      const validationError = validateDateRange(preset)
      if (validationError) {
        setError(validationError)
        onValidationError?.(validationError)
      } else {
        setDate(preset)
        setError(null)
        if (onChange) {
          onChange(preset)
        }
        setIsOpen(false)
      }
    },
    [validateDateRange, onChange, onValidationError],
  )

  // 同步外部值
  React.useEffect(() => {
    if (value) {
      setDate(value)
      setError(validateDateRange(value))
    }
  }, [value, validateDateRange])

  // 创建禁用日期函数
  const isDateDisabled = React.useCallback(
    (date: Date) => {
      if (minDate && date < minDate) return true
      if (maxDate && date > maxDate) return true

      if (typeof disabledDates === "function") {
        return disabledDates(date)
      }

      if (Array.isArray(disabledDates)) {
        return disabledDates.some(
          (disabledDate) =>
            date.getFullYear() === disabledDate.getFullYear() &&
            date.getMonth() === disabledDate.getMonth() &&
            date.getDate() === disabledDate.getDate(),
        )
      }

      return false
    },
    [minDate, maxDate, disabledDates],
  )

  const errorMsg = customErrorMessage || error

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              errorMsg && "border-red-500 focus-visible:ring-red-500",
            )}
          >
            <CalendarIcon className={cn("mr-2 h-4 w-4", errorMsg && "text-red-500")} />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, dateFormat, { locale })}-{format(date.to, dateFormat, { locale })}
                </>
              ) : (
                format(date.from, dateFormat, { locale })
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col sm:flex-row">
            {rangePresets.length > 0 && (
              <div className="border-r p-3">
                <div className="flex flex-col space-y-1">
                  {rangePresets.map((preset, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      className="justify-start font-normal"
                      onClick={() => handlePresetSelect(preset.value)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
              locale={locale}
              disabled={isDateDisabled}
              fromDate={minDate}
              toDate={maxDate}
            />
          </div>
        </PopoverContent>
      </Popover>
      {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
    </div>
  )
}
