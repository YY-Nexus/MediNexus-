import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const feedback = await request.json()

    // 在这里处理用户反馈
    // 例如，将其保存到数据库、发送电子邮件通知等
    console.log("收到用户反馈:", feedback)

    // 如果有电子邮件地址，可以发送确认邮件
    if (feedback.email) {
      // 发送确认邮件的逻辑
      console.log(`向 ${feedback.email} 发送确认邮件`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("处理用户反馈失败:", error)
    return NextResponse.json({ success: false, error: "处理用户反馈失败" }, { status: 500 })
  }
}
