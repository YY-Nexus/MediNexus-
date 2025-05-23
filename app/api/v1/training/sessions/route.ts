import { NextResponse } from "next/server"
import { nanoid } from "nanoid"

// 模拟培训活动数据库
const sessions = [
  {
    id: "session12345",
    courseId: "course12345",
    title: "医学影像诊断基础培训班",
    description: "为期一周的医学影像诊断基础培训",
    startDate: "2023-06-01T09:00:00Z",
    endDate: "2023-06-05T17:00:00Z",
    location: "北京协和医院培训中心",
    capacity: 30,
    enrolled: 25,
    trainerId: "u23456",
    assistants: ["u34567", "u45678"],
    materials: [
      {
        id: "material1",
        type: "PDF",
        title: "培训手册",
        fileId: "file456",
        url: "https://api.yanyu.com/files/file456",
        createdAt: "2023-05-20T10:00:00Z",
      },
    ],
    registrationDeadline: "2023-05-25T23:59:59Z",
    status: "scheduled",
    createdAt: "2023-05-15T08:30:00Z",
    updatedAt: "2023-05-15T08:30:00Z",
  },
]

// 获取培训活动列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("courseId")
    const status = searchParams.get("status")
    const trainerId = searchParams.get("trainerId")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // 过滤活动
    let filteredSessions = [...sessions]
    if (courseId) {
      filteredSessions = filteredSessions.filter((session) => session.courseId === courseId)
    }
    if (status) {
      filteredSessions = filteredSessions.filter((session) => session.status === status)
    }
    if (trainerId) {
      filteredSessions = filteredSessions.filter((session) => session.trainerId === trainerId)
    }

    // 分页
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedSessions = filteredSessions.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        total: filteredSessions.length,
        page,
        limit,
        items: paginatedSessions,
      },
    })
  } catch (error) {
    console.error("获取培训活动列表错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "获取培训活动列表时发生错误",
        },
      },
      { status: 500 },
    )
  }
}

// 创建新的培训活动
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { courseId, title, description, startDate, endDate, location, capacity, trainerId } = body

    // 验证必要字段
    if (!courseId || !title || !startDate || !endDate || !location || !capacity || !trainerId) {
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

    // 验证日期
    if (new Date(startDate) >= new Date(endDate)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_DATE_RANGE",
            message: "开始时间必须早于结束时间",
          },
        },
        { status: 400 },
      )
    }

    // 创建新活动
    const newSession = {
      id: `session${nanoid(8)}`,
      courseId,
      title,
      description: description || "",
      startDate,
      endDate,
      location,
      capacity,
      enrolled: 0,
      trainerId,
      assistants: body.assistants || [],
      materials: body.materials || [],
      registrationDeadline: body.registrationDeadline || null,
      status: "scheduled",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // 添加到数据库
    sessions.push(newSession)

    return NextResponse.json({
      success: true,
      data: {
        id: newSession.id,
        title: newSession.title,
        status: newSession.status,
        createdAt: newSession.createdAt,
      },
    })
  } catch (error) {
    console.error("创建培训活动错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "创建培训活动时发生错误",
        },
      },
      { status: 500 },
    )
  }
}
