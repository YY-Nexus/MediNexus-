import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// 权限定义
export enum Permission {
  READ_PATIENTS = "read:patients",
  WRITE_PATIENTS = "write:patients",
  DELETE_PATIENTS = "delete:patients",
  READ_MEDICAL_RECORDS = "read:medical_records",
  WRITE_MEDICAL_RECORDS = "write:medical_records",
  DELETE_MEDICAL_RECORDS = "delete:medical_records",
  ADMIN_ACCESS = "admin:access",
  MANAGE_USERS = "manage:users",
  MANAGE_ROLES = "manage:roles",
  VIEW_ANALYTICS = "view:analytics",
  EXPORT_DATA = "export:data",
  IMPORT_DATA = "import:data",
}

// 角色权限映射
const rolePermissions: Record<string, Permission[]> = {
  admin: Object.values(Permission),
  doctor: [
    Permission.READ_PATIENTS,
    Permission.WRITE_PATIENTS,
    Permission.READ_MEDICAL_RECORDS,
    Permission.WRITE_MEDICAL_RECORDS,
    Permission.VIEW_ANALYTICS,
  ],
  nurse: [Permission.READ_PATIENTS, Permission.READ_MEDICAL_RECORDS, Permission.WRITE_MEDICAL_RECORDS],
  researcher: [
    Permission.READ_PATIENTS,
    Permission.READ_MEDICAL_RECORDS,
    Permission.VIEW_ANALYTICS,
    Permission.EXPORT_DATA,
  ],
  receptionist: [Permission.READ_PATIENTS, Permission.WRITE_PATIENTS],
}

// JWT密钥
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-must-be-at-least-32-characters-long",
)

// 检查用户是否有指定权限
export async function checkPermission(request: NextRequest, requiredPermission: Permission): Promise<boolean> {
  try {
    // 从请求头获取令牌
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return false
    }

    const token = authHeader.substring(7)

    // 验证令牌
    const { payload } = await jwtVerify(token, JWT_SECRET)

    // 获取用户角色
    const userRole = payload.role as string

    // 检查角色是否有所需权限
    if (!userRole || !rolePermissions[userRole]) {
      return false
    }

    return rolePermissions[userRole].includes(requiredPermission)
  } catch (error) {
    console.error("Permission check error:", error)
    return false
  }
}

// 创建需要权限的API路由处理器
export function withPermission(handler: Function, permission: Permission) {
  return async (request: NextRequest) => {
    const hasPermission = await checkPermission(request, permission)

    if (!hasPermission) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    return handler(request)
  }
}
