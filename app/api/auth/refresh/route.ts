import { NextResponse } from "next/server"
import * as jwt from "jsonwebtoken"

// JWT密钥 - 实际项目中应从环境变量获取
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    // 从请求头获取令牌
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "未提供授权令牌" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    try {
      // 验证令牌
      const decoded = jwt.verify(token, JWT_SECRET) as any

      // 创建新令牌（不包含密码）
      const userWithoutPassword = {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        department: decoded.department,
        avatar: decoded.avatar,
      }

      // 生成新的JWT令牌
      const newToken = jwt.sign(
        {
          ...userWithoutPassword,
          // 添加令牌元数据
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24小时过期
        },
        JWT_SECRET,
      )

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
