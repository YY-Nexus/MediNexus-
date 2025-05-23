import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import { nanoid } from "nanoid"

// 模拟用户数据库
const users = [
  {
    id: "u12345",
    username: "doctor_zhang",
    password: "secure_password", // 实际项目中应存储哈希值
    name: "张医生",
    role: "trainer",
    email: "zhang@hospital.com",
    phone: "13800138000",
  },
  {
    id: "u23456",
    username: "admin_li",
    password: "admin_password",
    name: "李管理员",
    role: "admin",
    email: "li@hospital.com",
    phone: "13900139000",
  },
]

// JWT密钥 - 实际项目中应从环境变量获取
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-must-be-at-least-32-characters-long",
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    // 验证请求数据
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "用户名和密码不能为空",
          },
        },
        { status: 400 },
      )
    }

    // 查找用户
    const user = users.find((u) => u.username === username)

    // 验证用户存在和密码正确
    if (!user || user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: "用户名或密码错误",
          },
        },
        { status: 401 },
      )
    }

    // 创建用户对象（不包含密码）
    const userWithoutPassword = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      email: user.email,
      phone: user.phone,
    }

    // 生成JWT令牌
    const token = await new SignJWT({ ...userWithoutPassword })
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET)

    // 生成刷新令牌
    const refreshToken = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET)

    // 返回用户信息和令牌
    return NextResponse.json({
      success: true,
      data: {
        token,
        refreshToken,
        expiresIn: 3600,
        user: userWithoutPassword,
      },
    })
  } catch (error) {
    console.error("登录错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "登录过程中发生错误",
        },
      },
      { status: 500 },
    )
  }
}
