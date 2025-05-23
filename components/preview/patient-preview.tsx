"use client"
import { SafePreview } from "@/components/preview/safe-preview"
import { PreviewDataLoader } from "@/components/preview/preview-data-loader"
import { usePreview } from "@/contexts/preview-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PatientPreview() {
  const { previewData, previewMode } = usePreview()

  return (
    <PreviewDataLoader dataSource="patient">
      <SafePreview previewName="PatientInfo">
        <Card>
          <CardHeader>
            <CardTitle>患者信息</CardTitle>
          </CardHeader>
          <CardContent>
            {previewData ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{previewData.name}</h3>
                    <p className="text-gray-500">
                      ID: {previewData.id} | {previewData.age}岁 | {previewData.gender}
                    </p>
                  </div>
                  <Badge>{previewData.bloodType}</Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">病史</h4>
                  <div className="flex flex-wrap gap-2">
                    {previewData.medicalHistory.map((item: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">最近就诊</h4>
                  <p>{previewData.lastVisit}</p>
                </div>

                {previewMode === "interactive" && (
                  <div className="mt-4 pt-4 border-t">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                      查看完整记录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center">
                <p className="text-gray-500">无患者数据</p>
              </div>
            )}
          </CardContent>
        </Card>
      </SafePreview>
    </PreviewDataLoader>
  )
}
