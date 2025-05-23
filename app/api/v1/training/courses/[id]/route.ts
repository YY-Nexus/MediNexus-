import { NextResponse } from "next/server"

// 模拟培训课程数据库
const courses = [
  {
    id: "course12345",
    title: "医学影像诊断基础",
    description: "学习医学影像诊断的基本原理和方法",
    category: "医学影像",
    level: "初级",
    duration: 40,
    objectives: ["掌握医学影像诊断的基本原理", "学会常见疾病的影像表现", "提高影像诊断的准确性"],
    prerequisites: ["医学基础知识", "解剖学基础"],
    modules: [
      {
        id: "module1",
        title: "影像诊断概述",
        description: "医学影像诊断的基本概念和发展历程",
        duration: 8,
        content: "详细的课程内容...",
      },
    ],
    materials: [
      {
        id: "material1",
        type: "PDF",
        title: "影像诊断教材",
        fileId: "file123",
        url: "https://api.yanyu.com/files/file123",
        createdAt: "2023-05-15T08:30:00Z",
      },
    ],
    status: "published",
    createdBy: "u12345",
    createdAt: "2023-05-15T08:30:00Z",
    updatedAt: "2023-05-15T08:30:00Z",
    publishedAt: "2023-05-16T09:00:00Z",
  },
]

// 获取培训课程详情
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // 查找课程
    const course = courses.find((c) => c.id === id)

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "COURSE_NOT_FOUND",
            message: "课程不存在",
          },
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: course,
    })
  } catch (error) {
    console.error("获取培训课程详情错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "获取培训课程详情时发生错误",
        },
      },
      { status: 500 },
    )
  }
}

// 更新培训课程
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // 查找课程
    const courseIndex = courses.findIndex((c) => c.id === id)

    if (courseIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "COURSE_NOT_FOUND",
            message: "课程不存在",
          },
        },
        { status: 404 },
      )
    }

    // 更新课程
    const updatedAt = new Date().toISOString()
    courses[courseIndex] = {
      ...courses[courseIndex],
      ...body,
      id, // 确保ID不被覆盖
      updatedAt,
    }

    return NextResponse.json({
      success: true,
      data: {
        id,
        updatedAt,
      },
    })
  } catch (error) {
    console.error("更新培训课程错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "更新培训课程时发生错误",
        },
      },
      { status: 500 },
    )
  }
}

// 删除培训课程
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // 查找课程
    const courseIndex = courses.findIndex((c) => c.id === id)

    if (courseIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "COURSE_NOT_FOUND",
            message: "课程不存在",
          },
        },
        { status: 404 },
      )
    }

    // 删除课程
    courses.splice(courseIndex, 1)

    return NextResponse.json({
      success: true,
      data: {
        id,
        deletedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("删除培训课程错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "删除培训课程时发生错误",
        },
      },
      { status: 500 },
    )
  }
}
