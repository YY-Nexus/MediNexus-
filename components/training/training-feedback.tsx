"use client"

import type React from "react"

import { useState } from "react"
import { MedicalCard } from "@/components/ui/medical-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MessageSquare, ThumbsUp, Send } from "lucide-react"

export function TrainingFeedback() {
  const [rating, setRating] = useState<string>("")
  const [feedback, setFeedback] = useState<string>("")
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里可以添加提交反馈的逻辑
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setRating("")
      setFeedback("")
    }, 3000)
  }

  return (
    <MedicalCard className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-purple-100 p-2 rounded-full">
          <MessageSquare className="h-5 w-5 text-purple-700" />
        </div>
        <h3 className="text-lg font-semibold">培训反馈</h3>
      </div>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <ThumbsUp className="h-12 w-12 text-green-500 mx-auto mb-2" />
          <h4 className="text-lg font-semibold text-green-800">感谢您的反馈！</h4>
          <p className="text-green-700 mt-1">您的反馈对我们改进培训计划非常重要。我们将认真考虑您的建议。</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h4 className="font-medium mb-2">您对培训计划的总体评价</h4>
            <RadioGroup value={rating} onValueChange={setRating} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excellent" id="excellent" />
                <Label htmlFor="excellent">非常满意</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="good" />
                <Label htmlFor="good">满意</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="average" id="average" />
                <Label htmlFor="average">一般</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="poor" id="poor" />
                <Label htmlFor="poor">不满意</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mb-4">
            <Label htmlFor="feedback" className="font-medium block mb-2">
              您对培训计划有什么建议或意见？
            </Label>
            <Textarea
              id="feedback"
              placeholder="请分享您的想法，帮助我们改进培训计划..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              提交反馈
            </Button>
          </div>
        </form>
      )}
    </MedicalCard>
  )
}
