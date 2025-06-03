"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Bug, Info, AlertTriangle } from "lucide-react"

interface DebugInfo {
  timestamp: string
  level: "info" | "warning" | "error"
  message: string
  details?: any
}

export function DeploymentDebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [debugLogs, setDebugLogs] = useState<DebugInfo[]>([])

  useEffect(() => {
    // 模拟调试信息
    const logs: DebugInfo[] = [
      {
        timestamp: new Date().toISOString(),
        level: "info",
        message: "ModelDeployment组件已挂载",
        details: { component: "ModelDeployment", props: {} },
      },
      {
        timestamp: new Date().toISOString(),
        level: "info",
        message: "模拟数据加载完成",
        details: { modelsCount: 3, status: "success" },
      },
      {
        timestamp: new Date().toISOString(),
        level: "warning",
        message: "某些模型正在部署中",
        details: { deployingModels: ["model-003"] },
      },
    ]
    setDebugLogs(logs)
  }, [])

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Bug className="h-4 w-4" />
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-2">
            <Bug className="h-4 w-4" />
            调试面板
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card className="mt-2">
          <CardHeader>
            <CardTitle>调试信息</CardTitle>
            <CardDescription>实时显示组件状态和调试信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {debugLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-3 p-2 border rounded text-sm">
                  {getLevelIcon(log.level)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{log.message}</span>
                      <Badge variant="outline" className="text-xs">
                        {log.level}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                    {log.details && (
                      <pre className="text-xs bg-gray-50 p-2 rounded mt-2 overflow-x-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  )
}
