"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Download, ZoomIn, ZoomOut, Filter } from "lucide-react"

export function ImplementationGantt() {
  const [zoomLevel, setZoomLevel] = useState("month")
  const [showCompleted, setShowCompleted] = useState(true)

  // 这里只是一个示例UI，实际的甘特图需要使用专门的库来实现
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">项目甘特图</h1>
          <p className="text-muted-foreground mt-1">导航结构优化项目的时间线视图</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>筛选</span>
          </Button>
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            <span>导出</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>项目甘特图</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setZoomLevel("week")}>
                <ZoomIn className="h-4 w-4 mr-1" />
                周视图
              </Button>
              <Button variant="outline" size="sm" onClick={() => setZoomLevel("month")}>
                <Calendar className="h-4 w-4 mr-1" />
                月视图
              </Button>
              <Button variant="outline" size="sm" onClick={() => setZoomLevel("quarter")}>
                <ZoomOut className="h-4 w-4 mr-1" />
                季度视图
              </Button>
            </div>
          </div>
          <CardDescription>从2025年11月至2026年3月的项目时间线</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] border rounded-lg p-4 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>甘特图视图将在下一版本中实现</p>
              <p className="text-sm mt-2">
                当前显示的是{zoomLevel === "week" ? "周" : zoomLevel === "month" ? "月" : "季度"}视图
              </p>
              <Button className="mt-4" onClick={() => setShowCompleted(!showCompleted)}>
                {showCompleted ? "隐藏已完成任务" : "显示已完成任务"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
