"use client"

import type React from "react"
import { ErrorBoundary } from "react-error-boundary"
import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ComponentErrorBoundaryProps {
  children: React.ReactNode
  componentName: string
  fallback?: React.ReactNode
  onError?: (error: Error, info: { componentStack: string }) => void
}

function DefaultFallback({
  componentName,
  resetErrorBoundary,
}: { componentName: string; resetErrorBoundary: () => void }) {
  return (
    <Card className="w-full border-error-200 bg-error-50">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-error-500" />
          <CardTitle className="text-sm font-medium text-error-700">组件错误</CardTitle>
        </div>
        <CardDescription className="text-error-600">{`"${componentName}" 组件加载失败`}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={resetErrorBoundary}
          variant="outline"
          size="sm"
          className="border-error-200 text-error-700 hover:bg-error-100"
        >
          重试加载
        </Button>
      </CardContent>
    </Card>
  )
}

export function ComponentErrorBoundary({ children, componentName, fallback, onError }: ComponentErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) =>
        fallback || <DefaultFallback componentName={componentName} resetErrorBoundary={resetErrorBoundary} />
      }
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  )
}
