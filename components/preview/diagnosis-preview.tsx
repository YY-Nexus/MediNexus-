"use client"
import { SafePreview } from "@/components/preview/safe-preview"
import { PreviewDataLoader } from "@/components/preview/preview-data-loader"
import { usePreview } from "@/contexts/preview-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function DiagnosisPreview() {
  const { previewData, previewMode } = usePreview()

  return (
    <PreviewDataLoader dataSource="ai-diagnosis">
      <SafePreview previewName="AIDiagnosis">
        <Card>
          <CardHeader>
            <CardTitle>AI辅助诊断</CardTitle>
          </CardHeader>
          <CardContent>
            {previewData ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">患者症状</h4>
                  <div className="flex flex-wrap gap-2">
                    {previewData.symptoms.map((symptom: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">可能的诊断</h4>
                  <div className="space-y-3">
                    {previewData.possibleDiagnoses.map((diagnosis: any, index: number) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{diagnosis.name}</span>
                          <Badge variant={index === 0 ? "default" : "outline"}>{diagnosis.confidence}</Badge>
                        </div>
                        <Progress value={diagnosis.probability * 100} className="h-2" />
                        <p className="text-xs text-right text-gray-500">{(diagnosis.probability * 100).toFixed(0)}%</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">建议检查</h4>
                  <div className="flex flex-wrap gap-2">
                    {previewData.recommendedTests.map((test: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {test}
                      </Badge>
                    ))}
                  </div>
                </div>

                {previewMode === "interactive" && (
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                      接受诊断
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                      请求更多分析
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center">
                <p className="text-gray-500">无诊断数据</p>
              </div>
            )}
          </CardContent>
        </Card>
      </SafePreview>
    </PreviewDataLoader>
  )
}
