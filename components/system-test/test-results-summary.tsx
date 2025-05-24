"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertTriangle, Clock, Zap } from "lucide-react"

interface TestResult {
  status: "pending" | "running" | "passed" | "failed" | "warning"
  message?: string
  duration?: number
}

interface TestResultsSummaryProps {
  testResults: Record<string, TestResult>
  isRunningAll: boolean
  testProgress: number
}

export function TestResultsSummary({ testResults, isRunningAll, testProgress }: TestResultsSummaryProps) {
  const results = Object.entries(testResults)
  const stats = {
    total: results.length,
    passed: results.filter(([, r]) => r.status === "passed").length,
    failed: results.filter(([, r]) => r.status === "failed").length,
    warning: results.filter(([, r]) => r.status === "warning").length,
    running: results.filter(([, r]) => r.status === "running").length,
  }

  const successRate = stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0
  const avgDuration =
    results.filter(([, r]) => r.duration).reduce((acc, [, r]) => acc + (r.duration || 0), 0) /
    results.filter(([, r]) => r.duration).length

  const isComplete = stats.total > 0 && stats.running === 0 && !isRunningAll

  return (
    <div className="space-y-4">
      {/* 实时测试进度 */}
      {isRunningAll && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="font-medium text-blue-800">正在运行测试...</span>
              </div>
              <Progress value={testProgress} className="w-full" />
              <div className="text-sm text-blue-600">
                进度: {Math.round(testProgress)}% ({stats.passed + stats.failed + stats.warning}/{13})
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 测试完成总结 */}
      {isComplete && (
        <Card
          className={`border-2 ${
            successRate === 100
              ? "border-green-200 bg-green-50"
              : successRate >= 80
                ? "border-yellow-200 bg-yellow-50"
                : "border-red-200 bg-red-50"
          }`}
        >
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              {successRate === 100 ? (
                <CheckCircle className="h-12 w-12 text-green-500" />
              ) : successRate >= 80 ? (
                <AlertTriangle className="h-12 w-12 text-yellow-500" />
              ) : (
                <XCircle className="h-12 w-12 text-red-500" />
              )}
              <div>
                <CardTitle className="text-2xl">
                  {successRate === 100
                    ? "🎉 测试全部通过！"
                    : successRate >= 80
                      ? "⚠️ 大部分测试通过"
                      : "❌ 发现多个问题"}
                </CardTitle>
                <CardDescription className="text-lg mt-1">
                  成功率: {successRate}% ({stats.passed}/{stats.total})
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.passed}</div>
                <div className="text-sm text-muted-foreground">通过</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                <div className="text-sm text-muted-foreground">失败</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.warning}</div>
                <div className="text-sm text-muted-foreground">警告</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{avgDuration ? Math.round(avgDuration) : 0}ms</div>
                <div className="text-sm text-muted-foreground">平均耗时</div>
              </div>
            </div>

            {/* 详细结果 */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Zap className="h-4 w-4" />
                测试结果详情
              </h4>
              <div className="grid gap-2">
                {results.map(([componentId, result]) => (
                  <div key={componentId} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div className="flex items-center gap-3">
                      {result.status === "passed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {result.status === "failed" && <XCircle className="h-4 w-4 text-red-500" />}
                      {result.status === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      <span className="font-medium">{componentId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.duration && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {result.duration}ms
                        </span>
                      )}
                      <Badge
                        variant={
                          result.status === "passed"
                            ? "default"
                            : result.status === "warning"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {result.status === "passed" ? "通过" : result.status === "warning" ? "警告" : "失败"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 建议和下一步 */}
            <div className="mt-6 p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">📋 测试总结与建议</h4>
              {successRate === 100 && (
                <div className="space-y-2 text-green-800">
                  <p>
                    ✅ <strong>系统状态：优秀</strong>
                  </p>
                  <p>• 所有UI组件都正常工作</p>
                  <p>• 品牌元素显示一致</p>
                  <p>• 交互功能响应正常</p>
                  <p>• 响应式设计适配良好</p>
                  <p>🎊 系统已完全恢复，可以安全投入使用！</p>
                </div>
              )}
              {successRate >= 80 && successRate < 100 && (
                <div className="space-y-2 text-yellow-800">
                  <p>
                    ⚠️ <strong>系统状态：良好</strong>
                  </p>
                  <p>• 大部分组件工作正常</p>
                  <p>• 建议检查警告项目</p>
                  <p>• 优化用户体验细节</p>
                  <p>💡 建议：修复警告项目以获得最佳体验</p>
                </div>
              )}
              {successRate < 80 && (
                <div className="space-y-2 text-red-800">
                  <p>
                    ❌ <strong>系统状态：需要修复</strong>
                  </p>
                  <p>• 发现多个组件问题</p>
                  <p>• 需要立即修复失败项目</p>
                  <p>• 检查组件依赖关系</p>
                  <p>🔧 建议：优先修复失败的组件</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
