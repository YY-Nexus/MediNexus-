import { NextResponse } from "next/server"
import { nanoid } from "nanoid"

// 模拟考试数据库
const exams = [
  {
    id: "exam12345",
    title: "医学影像诊断基础考试",
    description: "测试学员对医学影像诊断基础知识的掌握程度",
    courseId: "course12345",
    sessionId: "session12345",
    type: "综合考试",
    duration: 120,
    totalPoints: 100,
    passingScore: 60,
    startTime: "2023-06-06T09:00:00Z",
    endTime: "2023-06-06T11:00:00Z",
    instructions: "请仔细阅读题目，选择最佳答案。考试时间为120分钟。",
    sections: [
      {
        id: "section1",
        title: "选择题",
        description: "单选题和多选题",
        points: 60,
        questions: [
          {
            id: "q1",
            type: "single",
            content: "X线的发现者是？",
            points: 2,
            options: [
              { label: "A", content: "伦琴", isCorrect: true },
              { label: "B", content: "居里夫人", isCorrect: false },
              { label: "C", content: "爱因斯坦", isCorrect: false },
              { label: "D", content: "牛顿", isCorrect: false },
            ],
            answer: "A",
            explanation: "X线是由德国物理学家伦琴在1895年发现的。",
          },
        ],
      },
      {
        id: "section2",
        title: "简答题",
        description: "简答题和论述题",
        points: 40,
        questions: [
          {
            id: "q2",
            type: "essay",
            content: "请简述CT和MRI的主要区别。",
            points: 20,
            answer: "",
            explanation: "CT使用X线，MRI使用磁场和射频脉冲...",
          },
        ],
      },
    ],
    status: "published",
    createdBy: "u12345",
    createdAt: "2023-05-20T08:30:00Z",
    updatedAt: "2023-05-20T08:30:00Z",
    publishedAt: "2023-05-25T09:00:00Z",
  },
]

// 获取考试列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("courseId")
    const sessionId = searchParams.get("sessionId")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // 过滤考试
    let filteredExams = [...exams]
    if (courseId) {
      filteredExams = filteredExams.filter((exam) => exam.courseId === courseId)
    }
    if (sessionId) {
      filteredExams = filteredExams.filter((exam) => exam.sessionId === sessionId)
    }
    if (status) {
      filteredExams = filteredExams.filter((exam) => exam.status === status)
    }

    // 分页
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedExams = filteredExams.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        total: filteredExams.length,
        page,
        limit,
        items: paginatedExams,
      },
    })
  } catch (error) {
    console.error("获取考试列表错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "获取考试列表时发生错误",
        },
      },
      { status: 500 },
    )
  }
}

// 创建新考试
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, courseId, type, duration, totalPoints, passingScore, sections } = body

    // 验证必要字段
    if (!title || !courseId || !type || !duration || !totalPoints || !passingScore || !sections) {
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

    // 验证及格分数
    if (passingScore > totalPoints) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_PASSING_SCORE",
            message: "及格分数不能超过总分",
          },
        },
        { status: 400 },
      )
    }

    // 创建新考试
    const newExam = {
      id: `exam${nanoid(8)}`,
      title,
      description: description || "",
      courseId,
      sessionId: body.sessionId || null,
      type,
      duration,
      totalPoints,
      passingScore,
      startTime: body.startTime || null,
      endTime: body.endTime || null,
      instructions: body.instructions || "",
      sections,
      status: "draft",
      createdBy: "u12345", // 假设当前用户ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: null,
    }

    // 添加到数据库
    exams.push(newExam)

    return NextResponse.json({
      success: true,
      data: {
        id: newExam.id,
        title: newExam.title,
        status: newExam.status,
        createdAt: newExam.createdAt,
      },
    })
  } catch (error) {
    console.error("创建考试错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "创建考试时发生错误",
        },
      },
      { status: 500 },
    )
  }
}
