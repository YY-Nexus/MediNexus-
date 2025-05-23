import { NextResponse } from "next/server"
import { nanoid } from "nanoid"

// 模拟用户数据库
const users = [
  {
    id: "u12345",
    username: "zhangdoctor",
    name: "张医生",
    email: "zhang@hospital.com",
    phone: "13800138000",
    role: "trainer",
    status: "active",
    profile: {
      avatar: "https://api.yanyu.com/avatars/zhang.jpg",
      bio: "心内科主治医师，从事临床工作10年",
      organization: "北京协和医院",
      position: "主治医师",
      specialties: ["心内科", "心电图诊断"],
    },
    lastLoginAt: "2023-05-30T08:30:00Z",
    createdAt: "2023-01-15T08:30:00Z",
    updatedAt: "2023-05-30T08:30:00Z",
  },
  {
    id: "u23456",
    username: "liadmin",
    name: "李管理员",
    email: "li@yanyu.com",
    phone: "13900139000",
    role: "admin",
    status: "active",
    profile: {
      avatar: "https://api.yanyu.com/avatars/li.jpg",
      bio: "系统管理员",
      organization: "言语医枢³",
      position: "系统管理员",
      specialties: ["系统管理", "用户支持"],
    },
    lastLoginAt: "2023-05-30T09:00:00Z",
    createdAt: "2023-01-01T08:30:00Z",
    updatedAt: "2023-05-30T09:00:00Z",
  },
]

// 获取用户列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // 过滤用户
    let filteredUsers = [...users]
    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role === role)
    }
    if (status) {
      filteredUsers = filteredUsers.filter((user) => user.status === status)
    }
    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) => user.name.includes(search) || user.username.includes(search) || user.email.includes(search),
      )
    }

    // 分页
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    // 移除敏感信息
    const safeUsers = paginatedUsers.map((user) => {
      const { password, ...safeUser } = user as any
      return safeUser
    })

    return NextResponse.json({
      success: true,
      data: {
        total: filteredUsers.length,
        page,
        limit,
        items: safeUsers,
      },
    })
  } catch (error) {
    console.error("获取用户列表错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "获取用户列表时发生错误",
        },
      },
      { status: 500 },
    )
  }
}

// 创建新用户
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, name, email, phone, role } = body

    // 验证必要字段
    if (!username || !name || !email || !role) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "请求数据无效，缺少必要字段",
          },
        },
        { status: 400 },
      )
    }

    // 检查用户名是否已存在
    const existingUser = users.find((user) => user.username === username || user.email === email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_EXISTS",
            message: "用户名或邮箱已存在",
          },
        },
        { status: 409 },
      )
    }

    // 验证角色
    const validRoles = ["admin", "trainer", "student"]
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_ROLE",
            message: "无效的用户角色",
          },
        },
        { status: 400 },
      )
    }

    // 创建新用户
    const newUser = {
      id: `u${nanoid(8)}`,
      username,
      name,
      email,
      phone: phone || null,
      role,
      status: "active",
      profile: body.profile || {},
      lastLoginAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // 添加到数据库
    users.push(newUser)

    // 返回安全的用户信息（不包含密码）
    const { password, ...safeUser } = newUser as any

    return NextResponse.json({
      success: true,
      data: safeUser,
    })
  } catch (error) {
    console.error("创建用户错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "创建用户时发生错误",
        },
      },
      { status: 500 },
    )
  }
}
