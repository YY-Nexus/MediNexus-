import { NextResponse } from "next/server"
import { nanoid } from "nanoid"

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
      {
        id: "module2",
        title: "X线诊断",
        description: "X线影像的基本原理和诊断方法",
        duration: 12,
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

// 获取培训课程列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const level = searchParams.get("level")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // 过滤课程
    let filteredCourses = [...courses]
    if (category) {
      filteredCourses = filteredCourses.filter((course) => course.category === category)
    }
    if (level) {
      filteredCourses = filteredCourses.filter((course) => course.level === level)
    }
    if (status) {
      filteredCourses = filteredCourses.filter((course) => course.status === status)
    }

    // 分页
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        total: filteredCourses.length,
        page,
        limit,
        items: paginatedCourses,
      },
    })
  } catch (error) {
    console.error("获取培训课程列表错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "获取培训课程列表时发生错误",
        },
      },
      { status: 500 },
    )
  }
}

// 创建新的培训课程
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, category, level, duration, objectives, prerequisites, modules } = body

    // 验证必要字段
    if (!title || !description || !category || !level || !duration) {
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

    // 创建新课程
    const newCourse = {
      id: `course${nanoid(8)}`,
      title,
      description,
      category,
      level,
      duration,
      objectives: objectives || [],
      prerequisites: prerequisites || [],
      modules: modules || [],
      materials: body.materials || [],
      status: "draft",
      createdBy: "u12345", // 假设当前用户ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: null,
    }

    // 添加到数据库
    courses.push(newCourse)

    return NextResponse.json({
      success: true,
      data: {
        id: newCourse.id,
        title: newCourse.title,
        status: newCourse.status,
        createdAt: newCourse.createdAt,
      },
    })
  } catch (error) {
    console.error("创建培训课程错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "创建培训课程时发生错误",
        },
      },
      { status: 500 },
    )
  }
}
