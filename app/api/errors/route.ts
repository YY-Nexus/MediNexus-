import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { reports } = await request.json()

    // 在这里处理错误报告
    // 例如，将其保存到数据库、发送到错误跟踪服务等
    console.log(`收到 ${reports.length} 个错误报告`)

    // 记录到日志文件或发送到监控系统
    if (process.env.LOG_LEVEL === "debug" || process.env.LOG_LEVEL === "verbose") {
      console.log("错误报告详情:", JSON.stringify(reports, null, 2))
    }

    return NextResponse.json({ success: true, count: reports.length })
  } catch (error) {
    console.error("处理错误报告失败:", error)
    return NextResponse.json({ success: false, error: "处理错误报告失败" }, { status: 500 })
  }
}
