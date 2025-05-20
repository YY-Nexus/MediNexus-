export enum AuditLogAction {
  LOGIN = "login",
  LOGOUT = "logout",
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
  EXPORT = "export",
  IMPORT = "import",
  SHARE = "share",
  PRINT = "print",
  DOWNLOAD = "download",
  UPLOAD = "upload",
  SEARCH = "search",
  FILTER = "filter",
  SORT = "sort",
  NAVIGATE = "navigate",
  CHANGE_SETTING = "change_setting",
  CHANGE_PERMISSION = "change_permission",
  CHANGE_ROLE = "change_role",
  CHANGE_PASSWORD = "change_password",
  RESET_PASSWORD = "reset_password",
  ENABLE_2FA = "enable_2fa",
  DISABLE_2FA = "disable_2fa",
  GENERATE_API_KEY = "generate_api_key",
  REVOKE_API_KEY = "revoke_api_key",
}

export enum AuditLogStatus {
  SUCCESS = "success",
  FAILURE = "failure",
  WARNING = "warning",
  INFO = "info",
}

export enum AuditLogSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export interface AuditLogEntry {
  id: string
  timestamp: number
  userId: string
  userName: string
  userRole: string
  action: AuditLogAction
  resource: string
  resourceId?: string
  details: string
  ipAddress: string
  userAgent: string
  status: AuditLogStatus
  severity: AuditLogSeverity
  sessionId?: string
  metadata?: Record<string, any>
}

export class AuditLogService {
  private static instance: AuditLogService
  private logs: AuditLogEntry[] = []

  private constructor() {}

  // 单例模式
  public static getInstance(): AuditLogService {
    if (!AuditLogService.instance) {
      AuditLogService.instance = new AuditLogService()
    }
    return AuditLogService.instance
  }

  // 记录审计日志
  public async log(entry: Omit<AuditLogEntry, "id" | "timestamp">): Promise<string> {
    try {
      const id = `audit:${Date.now()}:${Math.random().toString(36).substring(2, 15)}`
      const timestamp = Date.now()

      const fullEntry: AuditLogEntry = {
        ...entry,
        id,
        timestamp,
      }

      // 在演示环境中，只存储在内存中
      this.logs.push(fullEntry)

      // 如果是高严重性或关键严重性，发送警报
      if (entry.severity === AuditLogSeverity.HIGH || entry.severity === AuditLogSeverity.CRITICAL) {
        await this.sendAlert(fullEntry)
      }

      return id
    } catch (error) {
      console.error("Error logging audit entry:", error)
      throw error
    }
  }

  // 获取审计日志
  public async getLog(id: string): Promise<AuditLogEntry | null> {
    try {
      return this.logs.find((log) => log.id === id) || null
    } catch (error) {
      console.error("Error getting audit log:", error)
      throw error
    }
  }

  // 查询审计日志
  public async queryLogs(options: {
    userId?: string
    action?: AuditLogAction
    resource?: string
    severity?: AuditLogSeverity
    startTime?: number
    endTime?: number
    limit?: number
    offset?: number
  }): Promise<AuditLogEntry[]> {
    try {
      const {
        userId,
        action,
        resource,
        severity,
        startTime = 0,
        endTime = Date.now(),
        limit = 100,
        offset = 0,
      } = options

      // 过滤日志
      const filteredLogs = this.logs.filter((log) => {
        if (userId && log.userId !== userId) return false
        if (action && log.action !== action) return false
        if (resource && log.resource !== resource) return false
        if (severity && log.severity !== severity) return false
        if (log.timestamp < startTime || log.timestamp > endTime) return false
        return true
      })

      // 按时间戳降序排序
      filteredLogs.sort((a, b) => b.timestamp - a.timestamp)

      // 应用分页
      return filteredLogs.slice(offset, offset + limit)
    } catch (error) {
      console.error("Error querying audit logs:", error)
      throw error
    }
  }

  // 发送警报
  private async sendAlert(entry: AuditLogEntry): Promise<void> {
    // 实际实现中，这里可以发送电子邮件、短信或推送通知
    console.warn("SECURITY ALERT:", entry)
  }
}

// 创建审计日志服务实例
export const auditLogService = AuditLogService.getInstance()
