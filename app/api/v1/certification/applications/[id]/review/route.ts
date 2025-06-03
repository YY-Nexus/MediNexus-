import { type NextRequest, NextResponse } from "next/server"

// 模拟认证申请数据库 - 实际项目中应从数据库获取
const applications = [
  {
    id: "app12345",
    applicantId: "u12345",
    applicantName: "张医生",
    certificationType: "高级培训师",
    specialties: ["内科", "心脏病学"],
    qualifications: [
      {
        type: "医师资格证",
        number: "1234567890",
        issueDate: "2015-01-15",
        expiryDate: "2025-01-14",
        issuingAuthority: "国家卫生健康委员会",
        verificationStatus: "verified",
      },
    ],
    experience: [
      {
        organization: "北京协和医院",
        position: "主治医师",
        startDate: "2018-03-01",
        endDate: "2023-04-30",
        description: "负责心内科临床工作和医学教育",
      },
    ],
    documents: [
      {
        type: "资格证书",
        fileId: "file12345",
        filename: "医师资格证.pdf",
        uploadedAt: "2023-05-15T08:25:00Z",
        url: "https://api.yanyu.com/files/file12345",
      },
    ],
    status: "pending",
    reviewComments: null,
    reviewerId: null,
    reviewerName: null,
    reviewedAt: null,
    submittedAt: "2023-05-15T08:30:00Z",
    updatedAt: "2023-05-15T08:30:00Z",
  },
]

// 审核认证申请 - 修复 Next.js 15 的类型错误
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, comments } = body

    // 验证请求数据
    if (!status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_STATUS",
            message: "状态值无效",
          },
        },
        { status: 400 },
      )
    }

    // 查找申请
    const applicationIndex = applications.findIndex((app) => app.id === id)

    if (applicationIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "APPLICATION_NOT_FOUND",
            message: "申请不存在",
          },
        },
        { status: 404 },
      )
    }

    // 模拟权限检查
    const currentUserRole = "admin" // 假设当前用户是管理员
    if (currentUserRole !== "admin") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "PERMISSION_DENIED",
            message: "权限不足",
          },
        },
        { status: 403 },
      )
    }

    // 更新申请状态
    const reviewedAt = new Date().toISOString()
    applications[applicationIndex] = {
      ...applications[applicationIndex],
      status,
      reviewComments: comments || null,
      reviewerId: "u23456", // 假设当前审核员ID
      reviewerName: "李管理员", // 假设当前审核员姓名
      reviewedAt,
      updatedAt: reviewedAt,
    }

    return NextResponse.json({
      success: true,
      data: {
        id,
        status,
        reviewedAt,
      },
    })
  } catch (error) {
    console.error("审核认证申请错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "审核认证申请时发生错误",
        },
      },
      { status: 500 },
    )
  }
}
