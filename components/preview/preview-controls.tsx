"use client"

import { useState } from "react"
import { usePreview } from "@/contexts/preview-context"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, RefreshCw, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function PreviewControls() {
  const { isPreviewMode, previewMode, togglePreviewMode, setPreviewMode, resetPreview } = usePreview()
  const [isResetting, setIsResetting] = useState(false)

  const handleReset = () => {
    setIsResetting(true)
    resetPreview()
    setTimeout(() => setIsResetting(false), 1000)
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={isPreviewMode ? "default" : "outline"}
        size="sm"
        onClick={togglePreviewMode}
        className="flex items-center"
      >
        {isPreviewMode ? (
          <>
            <Eye className="h-4 w-4 mr-1" />
            预览已启用
          </>
        ) : (
          <>
            <EyeOff className="h-4 w-4 mr-1" />
            预览已禁用
          </>
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-1" />
            预览模式
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>选择预览模式</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={previewMode} onValueChange={(value) => setPreviewMode(value as any)}>
            <DropdownMenuRadioItem value="stable">稳定模式</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="interactive">交互模式</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="minimal">最小模式</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="disabled">禁用预览</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="sm" onClick={handleReset} disabled={isResetting}>
        <RefreshCw className={`h-4 w-4 mr-1 ${isResetting ? "animate-spin" : ""}`} />
        重置预览
      </Button>
    </div>
  )
}
