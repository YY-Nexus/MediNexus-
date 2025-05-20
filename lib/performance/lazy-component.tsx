import type React from "react"
import { Suspense, lazy, type ComponentType } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>
  props?: any
  fallback?: React.ReactNode
}

// 默认加载状态
const DefaultFallback = (
  <div className="flex items-center justify-center p-4 min-h-[200px]">
    <LoadingSpinner />
  </div>
)

// 组件级代码分割
export function LazyComponent({ component, props = {}, fallback = DefaultFallback }: LazyComponentProps) {
  const LazyLoadedComponent = lazy(component)

  return (
    <Suspense fallback={fallback}>
      <LazyLoadedComponent {...props} />
    </Suspense>
  )
}

// 创建预加载函数
export function createPreloadableComponent<T>(importFunc: () => Promise<{ default: ComponentType<T> }>) {
  const Component = lazy(importFunc)

  // 添加预加载方法
  const preload = () => {
    importFunc()
  }

  // 创建包装组件
  const PreloadableComponent = (props: T) => (
    <Suspense fallback={DefaultFallback}>
      <Component {...props} />
    </Suspense>
  )

  // 附加预加载方法
  PreloadableComponent.preload = preload

  return PreloadableComponent
}
