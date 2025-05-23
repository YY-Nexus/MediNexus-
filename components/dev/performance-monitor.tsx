"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Activity, ChevronUp, ChevronDown, BarChart2, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface RenderInfo {
  componentName: string
  renderCount: number
  lastRenderTime: number
  renderDuration: number
  averageDuration: number
  totalDuration: number
}

// 全局渲染信息存储
const renderInfoMap = new Map<string, RenderInfo>()

// 高阶组件，用于跟踪组件渲染
export function withRenderTracking<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string,
): React.FC<P> {
  return function TrackedComponent(props: P) {
    const startTime = performance.now()

    // 更新渲染信息
    useEffect(() => {
      const endTime = performance.now()
      const duration = endTime - startTime

      const existingInfo = renderInfoMap.get(componentName) || {
        componentName,
        renderCount: 0,
        lastRenderTime: 0,
        renderDuration: 0,
        averageDuration: 0,
        totalDuration: 0,
      }

      const newInfo = {
        ...existingInfo,
        renderCount: existingInfo.renderCount + 1,
        lastRenderTime: Date.now(),
        renderDuration: duration,
        totalDuration: existingInfo.totalDuration + duration,
      }

      newInfo.averageDuration = newInfo.totalDuration / newInfo.renderCount

      renderInfoMap.set(componentName, newInfo)

      // 输出到控制台
      console.log(`[渲染] ${componentName} - 第${newInfo.renderCount}次渲染 - 耗时: ${duration.toFixed(2)}ms`)
    })

    return <Component {...props} />
  }
}

// 渲染跟踪钩子
export function useRenderTracking(componentName: string) {
  useEffect(() => {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime

      const existingInfo = renderInfoMap.get(componentName) || {
        componentName,
        renderCount: 0,
        lastRenderTime: 0,
        renderDuration: 0,
        averageDuration: 0,
        totalDuration: 0,
      }

      const newInfo = {
        ...existingInfo,
        renderCount: existingInfo.renderCount + 1,
        lastRenderTime: Date.now(),
        renderDuration: duration,
        totalDuration: existingInfo.totalDuration + duration,
      }

      newInfo.averageDuration = newInfo.totalDuration / newInfo.renderCount

      renderInfoMap.set(componentName, newInfo)
    }
  })
}

// 性能监控面板组件
export function PerformanceMonitor() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [renderInfo, setRenderInfo] = useState<RenderInfo[]>([])
  const [sortBy, setSortBy] = useState<keyof RenderInfo>("renderCount")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filter, setFilter] = useState("")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 更新渲染信息
  useEffect(() => {
    const updateRenderInfo = () => {
      const info = Array.from(renderInfoMap.values())
      setRenderInfo(info)
    }

    // 初始更新
    updateRenderInfo()

    // 定期更新
    intervalRef.current = setInterval(updateRenderInfo, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // 排序和过滤
  const sortedAndFilteredInfo = [...renderInfo]
    .filter((info) => info.componentName.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      const valueA = a[sortBy]
      const valueB = b[sortBy]

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }

      return 0
    })

  // 切换排序
  const toggleSort = (key: keyof RenderInfo) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(key)
      setSortDirection("desc")
    }
  }

  // 清除所有渲染信息
  const clearRenderInfo = () => {
    renderInfoMap.clear()
    setRenderInfo([])
  }

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-50 bg-white shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <Activity className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 transition-all ${
        isExpanded ? "w-[600px] max-h-[80vh]" : "w-auto"
      }`}
    >
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <BarChart2 className="h-4 w-4 mr-2" />
          <h3 className="font-medium text-sm">性能监控</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="p-3 border-b flex items-center justify-between">
            <div className="text-xs">
              <span className="font-medium">总组件数:</span> {renderInfo.length}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={clearRenderInfo} className="text-xs">
                <RefreshCw className="mr-1 h-3 w-3" />
                重置统计
              </Button>
            </div>
          </div>

          <div className="p-3 border-b">
            <Input
              placeholder="搜索组件..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="overflow-y-auto max-h-[400px]">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th
                    className="p-2 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort("componentName")}
                  >
                    组件名称
                    {sortBy === "componentName" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th
                    className="p-2 text-right cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort("renderCount")}
                  >
                    渲染次数
                    {sortBy === "renderCount" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th
                    className="p-2 text-right cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort("renderDuration")}
                  >
                    最近耗时(ms)
                    {sortBy === "renderDuration" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th
                    className="p-2 text-right cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort("averageDuration")}
                  >
                    平均耗时(ms)
                    {sortBy === "averageDuration" && (
                      <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredInfo.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      暂无渲染数据
                    </td>
                  </tr>
                ) : (
                  sortedAndFilteredInfo.map((info) => (
                    <tr
                      key={info.componentName}
                      className={`hover:bg-gray-50 ${
                        info.renderCount > 10 ? "bg-yellow-50" : ""
                      } ${info.renderCount > 20 ? "bg-red-50" : ""}`}
                    >
                      <td className="p-2 truncate max-w-[200px]" title={info.componentName}>
                        {info.componentName}
                      </td>
                      <td className="p-2 text-right">{info.renderCount}</td>
                      <td className="p-2 text-right">{info.renderDuration.toFixed(2)}</td>
                      <td className="p-2 text-right">{info.averageDuration.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
