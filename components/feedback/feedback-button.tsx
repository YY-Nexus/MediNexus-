"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { FeedbackDialog } from "./feedback-dialog"

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-20 z-50 bg-white shadow-md"
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        反馈
      </Button>
      <FeedbackDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
