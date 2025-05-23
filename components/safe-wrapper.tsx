"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  componentName?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class SafeWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`SafeWrapper 捕获错误 (${this.props.componentName}):`, error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-4 border border-red-200 rounded-md bg-red-50">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <h3 className="text-sm font-medium text-red-800">
              组件加载失败 {this.props.componentName && `(${this.props.componentName})`}
            </h3>
          </div>
          <p className="text-xs text-red-600 mb-3">{this.state.error?.message || "未知错误"}</p>
          <Button size="sm" variant="outline" onClick={() => this.setState({ hasError: false, error: null })}>
            <RefreshCw className="mr-1 h-3 w-3" />
            重试
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
