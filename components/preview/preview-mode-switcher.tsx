"use client"
import { usePreview } from "@/contexts/preview-context"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Layers, Monitor, Minimize } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function PreviewModeSwitcher() {
  const { isPreviewMode, previewMode, togglePreviewMode, setPreviewMode } = usePreview()

  return (
    <TooltipProvider>
      <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isPreviewMode ? "default" : "outline"}
              size="icon"
              onClick={togglePreviewMode}
              className="bg-white shadow-md"
            >
              {isPreviewMode ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">{isPreviewMode ? "禁用预览" : "启用预览"}</TooltipContent>
        </Tooltip>

        {isPreviewMode && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={previewMode === "stable" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPreviewMode("stable")}
                  className="bg-white shadow-md"
                >
                  <Layers className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">稳定模式</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={previewMode === "interactive" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPreviewMode("interactive")}
                  className="bg-white shadow-md"
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">交互模式</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={previewMode === "minimal" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPreviewMode("minimal")}
                  className="bg-white shadow-md"
                >
                  <Minimize className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">最小模式</TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
    </TooltipProvider>
  )
}
