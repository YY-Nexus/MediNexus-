"use client"

import { useEffect, useState } from "react"
import { usePreview } from "@/contexts/preview-context"
import { AlertTriangle } from "lucide-react"

export function PreviewModeDetector() {
  const { isPreviewMode, previewMode } = usePreview()
  const [showWarning, setShowWarning] = useState(false)
  const [renderCount, setRenderCount] = useState(0)

  // 检测渲染次数
  useEffect(() => {
    setRenderCount((prev) => prev + 1)

    // 如果短时间内渲染次数过多，显示警告
    if (renderCount > 5) {
      setShowWarning(true)
    }

    // 5秒后重置渲染计数
    const timer = setTimeout(() => {
      setRenderCount(0)
      setShowWarning(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [isPreviewMode, previewMode])

  if (!showWarning) return null

  return (
    <div className="fixed top-4 right-4 z-50 bg-yellow-50 border border-yellow-200 rounded-md p-3 shadow-md max-w-xs">
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
        <div>
          <h4 className="font-medium text-yellow-800 text-sm">预览模式频繁切换</h4>
          <p className="text-xs text-yellow-700 mt-1">
            检测到预览模式频繁切换，这可能导致性能问题或渲染循环。请减少切换频率。
          </p>
        </div>
      </div>
    </div>
  )
}
