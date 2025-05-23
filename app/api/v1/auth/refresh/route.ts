import { NextResponse } from "next/server"
import { jwtVerify, SignJWT } from "jose"
import { nanoid } from "nanoid"

// JWT密钥 - 实际项目中应从环境变量获取
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-must-be-at-least-32-characters-long",
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { refreshToken } = body

    // 验证请求数据
    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "刷新令牌不能为空",
          },
        },
        { status: 400 },
      )
    }

    try {
      // 验证刷新令牌
      const { payload } = await jwtVerify(refreshToken, JWT_SECRET)

      if (!payload.userId) {
        throw new Error("无效的令牌载荷")
      }

      // 模拟从数据库获取用户信息
      const userId = payload.userId as string
      const user = {
        id: userId,
        username: userId === "u12345" ? "doctor_zhang" : "admin_li",
        name: userId === "u12345" ? "张医生" : "李管理员",
        role: userId === "u12345" ? "trainer" : "admin",
        email: userId === "u12345" ? "zhang@hospital.com" : "li@hospital.com",
      }

      // 生成新的访问令牌
      const newToken = await new SignJWT({ ...user })
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(JWT_SECRET)

      // 返回新令牌
      return NextResponse.json({
        success: true,
        data: {
          token: newToken,
          expiresIn: 3600,
        },
      })
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REFRESH_TOKEN",
            message: "无效或已过期的刷新令牌",
          },
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("刷新令牌错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "刷新令牌过程中发生错误",
        },
      },
      { status: 500 },
    )
  }
}
