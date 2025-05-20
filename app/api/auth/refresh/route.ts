import { NextResponse } from "next/server"
import { jwtVerify, SignJWT } from "jose"
import { nanoid } from "nanoid"

// JWT密钥 - 实际项目中应从环境变量获取
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-must-be-at-least-32-characters-long",
)

export async function POST(request: Request) {
  try {
    // 从请求头获取令牌
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "未提供授权令牌" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    try {
      // 验证令牌 - 使用jose库替代jsonwebtoken
      const { payload } = await jwtVerify(token, JWT_SECRET)

      // 创建新令牌（不包含密码）
      const userWithoutPassword = {
        id: payload.id as string,
        email: payload.email as string,
        name: payload.name as string,
        role: payload.role as string,
        department: payload.department as string,
        avatar: payload.avatar as string,
      }

      // 生成新的JWT令牌
      const newToken = await new SignJWT({ ...userWithoutPassword })
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(JWT_SECRET)

      // 返回新令牌
      return NextResponse.json({
        token: newToken,
      })
    } catch (error) {
      return NextResponse.json({ message: "无效或已过期的令牌" }, { status: 401 })
    }
  } catch (error) {
    console.error("刷新令牌错误:", error)
    return NextResponse.json({ message: "刷新令牌时发生错误" }, { status: 500 })
  }
}
