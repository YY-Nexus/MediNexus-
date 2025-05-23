import { NextResponse } from "next/server"

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

// 获取认证申请详情
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // 查找申请
    const application = applications.find((app) => app.id === id)

    if (!application) {
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

    return NextResponse.json({
      success: true,
      data: application,
    })
  } catch (error) {
    console.error("获取认证申请详情错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "获取认证申请详情时发生错误",
        },
      },
      { status: 500 },
    )
  }
}
