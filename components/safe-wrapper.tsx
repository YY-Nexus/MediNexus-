"use client"

import { Component, type ReactNode } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SafeWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

interface SafeWrapperState {
  hasError: boolean
  error?: Error
}

export class SafeWrapper extends Component<SafeWrapperProps, SafeWrapperState> {
  constructor(props: SafeWrapperProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): SafeWrapperState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("SafeWrapper 捕获到错误:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center p-6 border border-red-200 rounded-lg bg-red-50">
          <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">组件加载失败</h3>
          <p className="text-sm text-red-600 mb-4 text-center">此组件遇到了错误，请尝试刷新页面</p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            刷新页面
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
