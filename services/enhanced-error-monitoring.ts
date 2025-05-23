// 错误类型
export enum ErrorSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum ErrorCategory {
  RENDER = "render",
  STATE = "state",
  NETWORK = "network",
  RESOURCE = "resource",
  UNKNOWN = "unknown",
}

interface ErrorMetadata {
  componentName?: string
  path?: string
  timestamp: number
  userAgent?: string
  severity: ErrorSeverity
  category: ErrorCategory
  [key: string]: any
}

// 错误监控服务
class EnhancedErrorMonitoring {
  private errors: Array<{ error: Error; metadata: ErrorMetadata }> = []
  private maxStoredErrors = 50
  private isReportingEnabled = true
  private consecutiveRenderErrors = 0
  private lastRenderErrorTime = 0

  // 记录错误
  captureError(error: Error, metadata: Partial<ErrorMetadata> = {}) {
    const fullMetadata: ErrorMetadata = {
      timestamp: Date.now(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      path: typeof window !== "undefined" ? window.location.pathname : undefined,
      severity: metadata.severity || ErrorSeverity.MEDIUM,
      category: metadata.category || ErrorCategory.UNKNOWN,
      ...metadata,
    }

    // 检测渲染错误
    if (
      error.message.includes("Maximum update depth exceeded") ||
      error.message.includes("Too many re-renders") ||
      error.message.includes("Rendered fewer hooks than expected")
    ) {
      fullMetadata.category = ErrorCategory.RENDER
      fullMetadata.severity = ErrorSeverity.HIGH

      const now = Date.now()
      if (now - this.lastRenderErrorTime < 5000) {
        this.consecutiveRenderErrors++

        if (this.consecutiveRenderErrors > 3) {
          fullMetadata.severity = ErrorSeverity.CRITICAL
          this.handleInfiniteRenderLoop()
        }
      } else {
        this.consecutiveRenderErrors = 1
      }

      this.lastRenderErrorTime = now
    }

    // 存储错误
    this.errors.push({ error, metadata: fullMetadata })

    // 保持错误数量在限制内
    if (this.errors.length > this.maxStoredErrors) {
      this.errors = this.errors.slice(-this.maxStoredErrors)
    }

    // 记录到控制台
    console.error(
      `[ErrorMonitor] ${fullMetadata.category.toUpperCase()} (${fullMetadata.severity}):`,
      error,
      fullMetadata,
    )

    // 如果启用了报告，发送到服务器
    if (this.isReportingEnabled) {
      this.reportToServer(error, fullMetadata)
    }

    return { error, metadata: fullMetadata }
  }

  // 处理无限渲染循环
  private handleInfiniteRenderLoop() {
    console.error("[ErrorMonitor] 检测到可能的无限渲染循环！")

    // 在本地存储中记录，以便在页面刷新后仍能检测到问题
    try {
      if (typeof localStorage !== "undefined") {
        const timestamp = Date.now()
        localStorage.setItem("lastRenderLoopError", timestamp.toString())

        const errorCount = Number.parseInt(localStorage.getItem("renderLoopErrorCount") || "0", 10)
        localStorage.setItem("renderLoopErrorCount", (errorCount + 1).toString())

        // 如果短时间内多次检测到循环渲染，可以考虑自动重定向到安全页面
        if (
          errorCount > 3 &&
          timestamp - Number.parseInt(localStorage.getItem("firstRenderLoopError") || "0", 10) < 60000
        ) {
          this.redirectToSafePage()
        } else if (errorCount === 1) {
          localStorage.setItem("firstRenderLoopError", timestamp.toString())
        }
      }
    } catch (e) {
      // 忽略localStorage错误
    }
  }

  // 重定向到安全页面
  private redirectToSafePage() {
    if (typeof window !== "undefined") {
      // 添加特殊查询参数，表明这是从错误恢复
      window.location.href = "/?recovery=render-loop"
    }
  }

  // 向服务器报告错误
  private async reportToServer(error: Error, metadata: ErrorMetadata) {
    // 实际实现中，这里会发送到错误跟踪服务
    try {
      if (typeof window !== "undefined" && navigator.onLine) {
        // 这里可以实现向服务器发送错误报告的逻辑
        // 例如使用fetch API发送到后端API
      }
    } catch (e) {
      console.error("Failed to report error to server:", e)
    }
  }

  // 获取所有记录的错误
  getErrors() {
    return [...this.errors]
  }

  // 清除错误记录
  clearErrors() {
    this.errors = []
  }

  // 启用/禁用错误报告
  setReportingEnabled(enabled: boolean) {
    this.isReportingEnabled = enabled
  }
}

// 创建单例实例
export const errorMonitor = new EnhancedErrorMonitoring()

// 导出用于React组件的错误处理钩子
export function useErrorHandler() {
  return {
    captureError: errorMonitor.captureError.bind(errorMonitor),
    getErrors: errorMonitor.getErrors.bind(errorMonitor),
    clearErrors: errorMonitor.clearErrors.bind(errorMonitor),
  }
}
