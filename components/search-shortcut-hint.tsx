"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchShortcutHintProps {
  className?: string
}

export function SearchShortcutHint({ className }: SearchShortcutHintProps) {
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    // 检测操作系统
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 bg-white rounded-full shadow-lg px-3 py-2 flex items-center gap-2 text-sm border border-gray-200 z-50 animate-pulse",
        className,
      )}
    >
      <Search className="h-4 w-4 text-blue-500" />
      <span>
        按下{" "}
        <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 font-mono text-xs">
          {isMac ? "⌘" : "Ctrl"}
        </kbd>{" "}
        + <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 font-mono text-xs">K</kbd> 搜索
      </span>
    </div>
  )
}
