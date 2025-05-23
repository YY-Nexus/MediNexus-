"use client"

import { useEffect, useState, useRef } from "react"
import { AlertTriangle, X } from "lucide-react"

// 渲染错误检测器 - 开发环境使用
export function RenderErrorDetector() {
  const [isVisible, setIsVisible] = useState(false)
  const [errorCount, setErrorCount] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const renderCount = useRef(0)
  const componentName = useRef("")
  const lastRenderTime = useRef(Date.now())

  // 监听控制台错误
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return

    const originalConsoleError = console.error

    console.error = (...args) => {
      originalConsoleError(...args)

      // 检查是否是React渲染错误
      const errorString = args.join(" ")
      if (
        errorString.includes("Maximum update depth exceeded") ||
        errorString.includes("Too many re-renders") ||
        errorString.includes("Rendered fewer hooks than expected")
      ) {
        // 提取组件名称
        const match = errorString.match(/in (\w+)( \(at|$)/)
        if (match && match[1]) {
          componentName.current = match[1]
        }

        setErrorCount((prev) => prev + 1)
        setErrorMessage(errorString.split("\n")[0])
        setIsVisible(true)
      }
    }

    return () => {
      console.error = originalConsoleError
    }
  }, [])

  // 检测快速渲染
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return

    renderCount.current++
    const now = Date.now()
    const timeSinceLastRender = now - lastRenderTime.current

    // 如果1秒内渲染超过50次，可能存在问题
    if (renderCount.current > 50 && timeSinceLastRender < 1000) {
      setErrorMessage("检测到可能的快速重渲染问题")
      setIsVisible(true)
    }

    // 每5秒重置计数器
    const interval = setInterval(() => {
      renderCount.current = 0
      lastRenderTime.current = Date.now()
    }, 5000)

    lastRenderTime.current = now

    return () => clearInterval(interval)
  }, [])

  if (!isVisible || process.env.NODE_ENV !== "development") return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md bg-red-50 border border-red-200 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-sm font-medium text-red-800">检测到渲染错误</h3>
        </div>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-500">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-2 text-xs text-red-700">
        <p className="font-medium">错误信息:</p>
        <p className="mt-1">{errorMessage}</p>

        {componentName.current && (
          <p className="mt-2">
            <span className="font-medium">可能的问题组件:</span> {componentName.current}
          </p>
        )}

        <p className="mt-2">
          <span className="font-medium">错误次数:</span> {errorCount}
        </p>

        <div className="mt-3 text-xs text-red-800">
          <p className="font-medium">可能的解决方案:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>检查useEffect依赖数组</li>
            <li>检查状态更新逻辑</li>
            <li>使用React DevTools分析组件重渲染</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
