"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MessageSquare, Bug, Lightbulb, ThumbsUp } from "lucide-react"
import { errorReporter, ErrorSeverity, ErrorCategory } from "@/services/error-reporting-service"

interface FeedbackDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type FeedbackType = "bug" | "suggestion" | "praise" | "other"

export function FeedbackDialog({ open, onOpenChange }: FeedbackDialogProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("bug")
  const [feedbackText, setFeedbackText] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!feedbackText.trim()) return

    setIsSubmitting(true)

    try {
      // 发送反馈
      await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: feedbackType,
          message: feedbackText,
          email: email || undefined,
          url: window.location.href,
          timestamp: new Date().toISOString(),
        }),
      })

      // 如果是bug报告，也通过错误报告系统发送
      if (feedbackType === "bug") {
        errorReporter.reportError(
          new Error(`用户报告的问题: ${feedbackText}`),
          ErrorSeverity.MEDIUM,
          ErrorCategory.UI,
          {
            action: "user-reported-bug",
            additionalData: {
              userEmail: email || undefined,
            },
          },
        )
      }

      setIsSubmitted(true)
      setTimeout(() => {
        onOpenChange(false)
        // 重置表单状态，但延迟到对话框关闭后
        setTimeout(() => {
          setFeedbackText("")
          setEmail("")
          setFeedbackType("bug")
          setIsSubmitted(false)
        }, 300)
      }, 2000)
    } catch (error) {
      console.error("提交反馈失败:", error)
      errorReporter.reportError(
        error instanceof Error ? error : new Error("提交反馈失败"),
        ErrorSeverity.MEDIUM,
        ErrorCategory.API,
        { action: "submit-feedback" },
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>发送反馈</DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <ThumbsUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">感谢您的反馈！</h3>
            <p className="text-sm text-gray-500">您的意见对我们非常重要。</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>反馈类型</Label>
                <RadioGroup
                  value={feedbackType}
                  onValueChange={(value) => setFeedbackType(value as FeedbackType)}
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="bug" id="bug" />
                    <Label htmlFor="bug" className="flex items-center">
                      <Bug className="h-4 w-4 mr-1" />
                      问题
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="suggestion" id="suggestion" />
                    <Label htmlFor="suggestion" className="flex items-center">
                      <Lightbulb className="h-4 w-4 mr-1" />
                      建议
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="praise" id="praise" />
                    <Label htmlFor="praise" className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      赞赏
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      其他
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">您的反馈</Label>
                <Textarea
                  id="feedback"
                  placeholder="请详细描述您的问题或建议..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">电子邮箱 (可选)</Label>
                <input
                  id="email"
                  type="email"
                  placeholder="您的邮箱，方便我们回复您"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500">如果您希望我们回复您，请留下您的电子邮箱。</p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                取消
              </Button>
              <Button onClick={handleSubmit} disabled={!feedbackText.trim() || isSubmitting}>
                {isSubmitting ? "提交中..." : "提交反馈"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
