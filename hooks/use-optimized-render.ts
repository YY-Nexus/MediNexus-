"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { performanceMonitor } from "@/lib/performance/performance-monitor"

export function useOptimizedRender<T>(
  data: T,
  options: {
    name: string
    debounceMs?: number
    enabled?: boolean
  },
) {
  const { name, debounceMs = 0, enabled = true } = options
  const [optimizedData, setOptimizedData] = useState<T>(data)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const renderCountRef = useRef(0)

  // 清理函数
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // 当数据变化时，使用防抖更新优化后的数据
  useEffect(() => {
    if (!enabled) {
      setOptimizedData(data)
      return
    }

    renderCountRef.current += 1
    performanceMonitor.mark(`${name}_render_start_${renderCountRef.current}`)

    cleanup()

    if (debounceMs > 0) {
      timeoutRef.current = setTimeout(() => {
        setOptimizedData(data)
        performanceMonitor.mark(`${name}_render_end_${renderCountRef.current}`)
        performanceMonitor.measure(
          `${name}_render_time`,
          `${name}_render_start_${renderCountRef.current}`,
          `${name}_render_end_${renderCountRef.current}`,
        )
      }, debounceMs)
    } else {
      setOptimizedData(data)
      performanceMonitor.mark(`${name}_render_end_${renderCountRef.current}`)
      performanceMonitor.measure(
        `${name}_render_time`,
        `${name}_render_start_${renderCountRef.current}`,
        `${name}_render_end_${renderCountRef.current}`,
      )
    }

    return cleanup
  }, [data, name, debounceMs, enabled, cleanup])

  return optimizedData
}
