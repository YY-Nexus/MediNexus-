"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ModelPerformanceMetrics } from "@/components/model-performance-metrics"
import { ModelSelectionPanel } from "@/components/model-selection-panel"
import { useTranslation } from "@/hooks/use-translation"

const DEMO_MODELS = [
  { id: "model1", name: "MediVision Pro", type: "医学影像分析", accuracy: 94.7, version: "2.3.1" },
  { id: "model2", name: "DiagnosticGPT", type: "诊断辅助", accuracy: 91.2, version: "3.0.0" },
  { id: "model3", name: "PathologyNet", type: "病理学分析", accuracy: 89.5, version: "1.7.2" },
  { id: "model4", name: "GenomicAnalyzer", type: "基因组分析", accuracy: 96.3, version: "2.1.0" },
]

export function AIModelDemo() {
  const { t } = useTranslation()
  const [selectedModel, setSelectedModel] = useState(DEMO_MODELS[0])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const handleModelSelect = (modelId: string) => {
    const model = DEMO_MODELS.find((m) => m.id === modelId)
    if (model) {
      setSelectedModel(model)
      setAnalysisComplete(false)
    }
  }

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setAnalysisComplete(false)

    // 模拟分析进度
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setAnalysisComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ModelSelectionPanel
            models={DEMO_MODELS}
            selectedModelId={selectedModel.id}
            onSelectModel={handleModelSelect}
          />
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{selectedModel.name}</h3>
                  <span className="text-sm text-muted-foreground">v{selectedModel.version}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t("demo.aiModel.type", "模型类型")}:</span>
                    <span>{selectedModel.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t("demo.aiModel.accuracy", "准确率")}:</span>
                    <span>{selectedModel.accuracy}%</span>
                  </div>
                </div>

                {isAnalyzing ? (
                  <div className="space-y-2 py-4">
                    <div className="flex justify-between text-sm">
                      <span>{t("demo.aiModel.analyzing", "分析中...")}</span>
                      <span>{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} className="h-2" />
                  </div>
                ) : (
                  <Button onClick={startAnalysis} className="w-full mt-4" disabled={isAnalyzing}>
                    {t("demo.aiModel.startAnalysis", "开始分析")}
                  </Button>
                )}

                {analysisComplete && (
                  <div className="mt-6 border-t pt-4">
                    <h4 className="font-medium mb-2">{t("demo.aiModel.results", "分析结果")}</h4>
                    <ModelPerformanceMetrics modelId={selectedModel.id} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
