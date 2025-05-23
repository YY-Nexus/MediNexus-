"use client"

import type React from "react"

import { ComponentErrorBoundary } from "./component-error-boundary"
import { useState, useEffect } from "react"

interface SafeComponentProps {
  children: React.ReactNode
  componentName: string
  fallback?: React.ReactNode
  priority?: number // 优先级，数字越小优先级越高
  disabled?: boolean // 是否禁用组件
}

// 全局启用状态管理
const enabledComponents = new Set<string>()
const componentPriorities: Record<string, number> = {}

export function SafeComponent({
  children,
  componentName,
  fallback,
  priority = 100,
  disabled = false,
}: SafeComponentProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 注册组件优先级
    componentPriorities[componentName] = priority

    // 检查组件是否已启用
    const checkIfEnabled = () => {
      if (disabled) {
        setIsEnabled(false)
        setIsLoading(false)
        return
      }

      // 如果已经在启用列表中，直接启用
      if (enabledComponents.has(componentName)) {
        setIsEnabled(true)
        setIsLoading(false)
        return
      }

      // 根据优先级延迟启用
      const delay = priority * 100 // 优先级越高，延迟越短
      const timer = setTimeout(() => {
        enabledComponents.add(componentName)
        setIsEnabled(true)
        setIsLoading(false)
        console.log(`[SafeComponent] 组件已启用: ${componentName}`)
      }, delay)

      return () => clearTimeout(timer)
    }

    checkIfEnabled()
  }, [componentName, priority, disabled])

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="p-2 border border-gray-200 rounded-md bg-gray-50">
        <div className="animate-pulse flex space-x-2 items-center">
          <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
          <div className="h-2 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    )
  }

  // 如果组件被禁用
  if (!isEnabled) {
    return (
      <div className="p-2 border border-yellow-200 rounded-md bg-yellow-50">
        <p className="text-xs text-yellow-700">组件 "{componentName}" 已被禁用</p>
      </div>
    )
  }

  // 启用组件，并用错误边界包装
  return (
    <ComponentErrorBoundary componentName={componentName} fallback={fallback}>
      {children}
    </ComponentErrorBoundary>
  )
}

// 导出工具函数
export const ComponentManager = {
  // 启用指定组件
  enableComponent: (componentName: string) => {
    enabledComponents.add(componentName)
    return true
  },

  // 禁用指定组件
  disableComponent: (componentName: string) => {
    enabledComponents.delete(componentName)
    return true
  },

  // 检查组件是否启用
  isComponentEnabled: (componentName: string) => {
    return enabledComponents.has(componentName)
  },

  // 获取所有已启用的组件
  getEnabledComponents: () => {
    return Array.from(enabledComponents)
  },

  // 获取所有组件及其优先级
  getAllComponentsWithPriority: () => {
    return Object.entries(componentPriorities).map(([name, priority]) => ({
      name,
      priority,
      enabled: enabledComponents.has(name),
    }))
  },

  // 重置所有组件状态
  resetAllComponents: () => {
    enabledComponents.clear()
    return true
  },

  // 按优先级批量启用组件
  enableComponentsByPriority: (maxPriority: number) => {
    Object.entries(componentPriorities).forEach(([name, priority]) => {
      if (priority <= maxPriority) {
        enabledComponents.add(name)
      }
    })
    return true
  },
}
