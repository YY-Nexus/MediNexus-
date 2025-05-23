// 错误严重程度
export enum ErrorSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

// 错误类别
export enum ErrorCategory {
  UI = "ui",
  API = "api",
  AUTH = "auth",
  DATA = "data",
  PERFORMANCE = "performance",
  UNKNOWN = "unknown",
}

// 错误上下文
interface ErrorContext {
  componentName?: string
  userId?: string
  url?: string
  action?: string
  additionalData?: Record<string, any>
}

// 错误报告接口
interface ErrorReport {
  message: string
  stack?: string
  timestamp: number
  severity: ErrorSeverity
  category: ErrorCategory
  context: ErrorContext
  userAgent: string
  appVersion: string
}

// 错误报告服务
class ErrorReportingService {
  private endpoint: string
  private isEnabled: boolean
  private queue: ErrorReport[] = []
  private isSending = false
  private flushInterval = 10000 // 10秒
  private maxQueueSize = 50
  private intervalId: NodeJS.Timeout | null = null

  constructor(endpoint = "/api/errors", isEnabled = true) {
    this.endpoint = endpoint
    this.isEnabled = isEnabled
    this.startAutoFlush()
  }

  // 启用或禁用错误报告
  setEnabled(isEnabled: boolean): void {
    this.isEnabled = isEnabled
    if (isEnabled) {
      this.startAutoFlush()
    } else {
      this.stopAutoFlush()
    }
  }

  // 报告错误
  reportError(
    error: Error,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    category: ErrorCategory = ErrorCategory.UNKNOWN,
    context: ErrorContext = {},
  ): void {
    if (!this.isEnabled) return

    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      severity,
      category,
      context: {
        ...context,
        url: typeof window !== "undefined" ? window.location.href : undefined,
      },
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      appVersion: process.env.NEXT_PUBLIC_APP_VERSION || "unknown",
    }

    this.queue.push(errorReport)
    console.error(`[ErrorReporting] ${category}:${severity} - ${error.message}`, error)

    // 如果队列已满或错误严重性为高，立即发送
    if (this.queue.length >= this.maxQueueSize || severity === ErrorSeverity.CRITICAL) {
      this.flush()
    }
  }

  // 手动发送所有队列中的错误
  async flush(): Promise<void> {
    if (!this.isEnabled || this.queue.length === 0 || this.isSending) return

    this.isSending = true
    const reports = [...this.queue]
    this.queue = []

    try {
      if (typeof window !== "undefined" && navigator.onLine) {
        await fetch(this.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reports }),
        })
      } else {
        // 如果离线，将错误报告保存到本地存储
        this.saveToLocalStorage(reports)
      }
    } catch (error) {
      console.error("Failed to send error reports:", error)
      // 发送失败，将错误报告放回队列
      this.queue = [...reports, ...this.queue].slice(0, this.maxQueueSize)
    } finally {
      this.isSending = false
    }
  }

  // 保存到本地存储
  private saveToLocalStorage(reports: ErrorReport[]): void {
    try {
      if (typeof localStorage !== "undefined") {
        const storedReports = JSON.parse(localStorage.getItem("error-reports") || "[]")
        const updatedReports = [...storedReports, ...reports].slice(-100) // 限制存储数量
        localStorage.setItem("error-reports", JSON.stringify(updatedReports))
      }
    } catch (error) {
      console.error("Failed to save error reports to local storage:", error)
    }
  }

  // 从本地存储加载并发送
  async sendStoredReports(): Promise<void> {
    try {
      if (typeof localStorage !== "undefined" && navigator.onLine) {
        const storedReports = JSON.parse(localStorage.getItem("error-reports") || "[]")
        if (storedReports.length > 0) {
          await fetch(this.endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reports: storedReports }),
          })
          localStorage.removeItem("error-reports")
        }
      }
    } catch (error) {
      console.error("Failed to send stored error reports:", error)
    }
  }

  // 启动自动发送
  private startAutoFlush(): void {
    if (this.intervalId) return

    this.intervalId = setInterval(() => {
      this.flush()
    }, this.flushInterval)
  }

  // 停止自动发送
  private stopAutoFlush(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}

// 创建单例实例
export const errorReporter = new ErrorReportingService()

// 添加全局错误处理
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    errorReporter.reportError(event.error || new Error(event.message), ErrorSeverity.HIGH, ErrorCategory.UNKNOWN, {
      action: "global-error-handler",
    })
  })

  window.addEventListener("unhandledrejection", (event) => {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason))
    errorReporter.reportError(error, ErrorSeverity.HIGH, ErrorCategory.UNKNOWN, {
      action: "unhandled-promise-rejection",
    })
  })

  // 在页面加载完成后，尝试发送存储的错误报告
  window.addEventListener("load", () => {
    errorReporter.sendStoredReports()
  })

  // 在网络恢复在线状态时，尝试发送存储的错误报告
  window.addEventListener("online", () => {
    errorReporter.sendStoredReports()
  })
}
