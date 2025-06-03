"use client"

import { memo, useMemo, useCallback, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"
import { Heart, Activity, Clock, Zap, Smartphone, Wifi, Battery, CheckCircle } from "lucide-react"

// 性能优化的患者卡片组件
const OptimizedPatientCard = memo(({ patient, onSelect }) => {
  const isMobile = useIsMobile()

  const cardStyle = useMemo(
    () => ({
      padding: isMobile ? "12px" : "16px",
      fontSize: isMobile ? "14px" : "16px",
    }),
    [isMobile],
  )

  const handleSelect = useCallback(() => {
    onSelect(patient.id)
  }, [patient.id, onSelect])

  return (
    <Card className="hover:shadow-md transition-shadow duration-200" style={cardStyle}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg">{patient.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
          </div>
          <Badge variant={patient.status === "critical" ? "destructive" : "default"}>{patient.status}</Badge>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <Heart className="w-4 h-4 mx-auto mb-1 text-red-500" />
            <div className="text-sm font-medium">{patient.heartRate}</div>
            <div className="text-xs text-muted-foreground">心率</div>
          </div>
          <div className="text-center">
            <Activity className="w-4 h-4 mx-auto mb-1 text-blue-500" />
            <div className="text-sm font-medium">{patient.bloodPressure}</div>
            <div className="text-xs text-muted-foreground">血压</div>
          </div>
          <div className="text-center">
            <Clock className="w-4 h-4 mx-auto mb-1 text-green-500" />
            <div className="text-sm font-medium">{patient.lastVisit}</div>
            <div className="text-xs text-muted-foreground">最近就诊</div>
          </div>
        </div>

        <Button onClick={handleSelect} className="w-full" size={isMobile ? "sm" : "default"}>
          查看详情
        </Button>
      </CardContent>
    </Card>
  )
})

OptimizedPatientCard.displayName = "OptimizedPatientCard"

// 移动端性能监控组件
export const MobilePerformanceMonitor = memo(() => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    memoryUsage: 0,
    batteryLevel: 100,
    networkSpeed: 0,
    renderTime: 0,
  })

  useEffect(() => {
    // 模拟性能数据收集
    const collectMetrics = () => {
      const startTime = performance.now()

      // 模拟性能指标
      setMetrics({
        loadTime: Math.round(Math.random() * 2000 + 500), // 500-2500ms
        memoryUsage: Math.round(Math.random() * 50 + 100), // 100-150MB
        batteryLevel: Math.round(Math.random() * 30 + 70), // 70-100%
        networkSpeed: Math.round(Math.random() * 50 + 10), // 10-60 Mbps
        renderTime: Math.round(performance.now() - startTime),
      })
    }

    collectMetrics()
    const interval = setInterval(collectMetrics, 5000)

    return () => clearInterval(interval)
  }, [])

  const getPerformanceStatus = (value, thresholds) => {
    if (value <= thresholds.good) return { status: "excellent", color: "text-green-600" }
    if (value <= thresholds.ok) return { status: "good", color: "text-blue-600" }
    return { status: "needs-improvement", color: "text-orange-600" }
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="w-5 h-5" />
          移动端性能监控
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-lg font-bold">{metrics.loadTime}ms</div>
            <div className="text-xs text-muted-foreground">加载时间</div>
          </div>

          <div className="text-center">
            <Activity className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-lg font-bold">{metrics.memoryUsage}MB</div>
            <div className="text-xs text-muted-foreground">内存使用</div>
          </div>

          <div className="text-center">
            <Battery className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-lg font-bold">{metrics.batteryLevel}%</div>
            <div className="text-xs text-muted-foreground">电池电量</div>
          </div>

          <div className="text-center">
            <Wifi className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <div className="text-lg font-bold">{metrics.networkSpeed}Mbps</div>
            <div className="text-xs text-muted-foreground">网络速度</div>
          </div>

          <div className="text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <div className="text-lg font-bold">{metrics.renderTime}ms</div>
            <div className="text-xs text-muted-foreground">渲染时间</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

MobilePerformanceMonitor.displayName = "MobilePerformanceMonitor"

// 移动端优化的诊断界面
export const MobileDiagnosisInterface = memo(() => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const isMobile = useIsMobile()

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true)

    // 模拟AI分析过程
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setResults({
      primaryDiagnosis: "急性心肌梗死",
      confidence: 94.2,
      riskFactors: ["高血压", "糖尿病", "吸烟史"],
      recommendations: ["立即心电图检查", "血清心肌酶检测", "紧急介入治疗"],
    })

    setIsAnalyzing(false)
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${isMobile ? "text-lg" : "text-xl"}`}>
          <Activity className="w-5 h-5" />
          AI智能诊断
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!results ? (
          <div className="text-center py-8">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              size={isMobile ? "sm" : "default"}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  AI分析中...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  开始AI诊断分析
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">主要诊断</h3>
                <Badge className="bg-blue-500">置信度: {results.confidence}%</Badge>
              </div>
              <p className="text-lg font-medium text-blue-800">{results.primaryDiagnosis}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">风险因素</h4>
              <div className="flex flex-wrap gap-2">
                {results.riskFactors.map((factor, index) => (
                  <Badge key={index} variant="outline" className="text-orange-600">
                    {factor}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">治疗建议</h4>
              <div className="space-y-2">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
})

MobileDiagnosisInterface.displayName = "MobileDiagnosisInterface"
