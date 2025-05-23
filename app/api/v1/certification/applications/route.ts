import { NextResponse } from "next/server"
import { nanoid } from "nanoid"

// 模拟认证申请数据库
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

// 获取认证申请列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // 过滤申请
    let filteredApplications = [...applications]
    if (status) {
      filteredApplications = filteredApplications.filter((app) => app.status === status)
    }

    // 分页
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedApplications = filteredApplications.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        total: filteredApplications.length,
        page,
        limit,
        items: paginatedApplications,
      },
    })
  } catch (error) {
    console.error("获取认证申请列表错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "获取认证申请列表时发生错误",
        },
      },
      { status: 500 },
    )
  }
}

// 提交新的认证申请
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { certificationType, specialties, qualifications } = body

    // 验证必要字段
    if (!certificationType || !specialties || !qualifications) {
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

    // 检查是否已有未完成的申请
    const existingApplication = applications.find(
      (app) => app.applicantId === "u12345" && ["pending", "reviewing"].includes(app.status),
    )

    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "APPLICATION_EXISTS",
            message: "已存在未完成的申请",
          },
        },
        { status: 409 },
      )
    }

    // 创建新申请
    const newApplication = {
      id: `app${nanoid(8)}`,
      applicantId: "u12345", // 假设当前用户ID
      applicantName: "张医生", // 假设当前用户姓名
      certificationType,
      specialties,
      qualifications,
      experience: body.experience || [],
      documents: body.documents || [],
      status: "pending",
      reviewComments: null,
      reviewerId: null,
      reviewerName: null,
      reviewedAt: null,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // 添加到数据库
    applications.push(newApplication)

    return NextResponse.json({
      success: true,
      data: {
        id: newApplication.id,
        status: newApplication.status,
        submittedAt: newApplication.submittedAt,
      },
    })
  } catch (error) {
    console.error("提交认证申请错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "提交认证申请时发生错误",
        },
      },
      { status: 500 },
    )
  }
}
