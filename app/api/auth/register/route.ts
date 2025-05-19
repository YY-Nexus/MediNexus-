import { NextResponse } from "next/server"
import * as jwt from "jsonwebtoken"

// 模拟用户数据库
// 实际项目中应连接到真实数据库
const users = [
  {
    id: "1",
    email: "doctor@medinexus.com",
    password: "password123", // 实际项目中应存储哈希值
    name: "张医生",
    role: "doctor",
    department: "内科",
    avatar: "/avatars/doctor.png",
  },
  // 其他用户...
]

// JWT密钥 - 实际项目中应从环境变量获取
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, role, department } = body

    // 验证请求数据
    if (!email || !password || !name || !role) {
      return NextResponse.json({ message: "请提供所有必填字段" }, { status: 400 })
    }

    // 检查邮箱是否已存在
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ message: "该邮箱已被注册" }, { status: 409 })
    }

    // 创建新用户
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password, // 实际项目中应哈希处理
      name,
      role,
      department,
      avatar: `/avatars/${role}.png`, // 默认头像
    }

    // 添加到用户数组（模拟数据库插入）
    users.push(newUser)

    // 创建用户对象（不包含密码）
    const userWithoutPassword = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      department: newUser.department,
      avatar: newUser.avatar,
    }

    // 生成JWT令牌
    const token = jwt.sign(
      {
        ...userWithoutPassword,
        // 添加令牌元数据
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24小时过期
      },
      JWT_SECRET,
    )

    // 返回用户信息和令牌
    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("注册错误:", error)
    return NextResponse.json({ message: "注册过程中发生错误" }, { status: 500 })
  }
}
