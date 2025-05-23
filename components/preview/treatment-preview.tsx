"use client"
import { SafePreview } from "@/components/preview/safe-preview"
import { PreviewDataLoader } from "@/components/preview/preview-data-loader"
import { usePreview } from "@/contexts/preview-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Pill } from "lucide-react"

export function TreatmentPreview() {
  const { previewData, previewMode } = usePreview()

  return (
    <PreviewDataLoader dataSource="treatment-plan">
      <SafePreview previewName="TreatmentPlan">
        <Card>
          <CardHeader>
            <CardTitle>治疗方案</CardTitle>
          </CardHeader>
          <CardContent>
            {previewData ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{previewData.diagnosis}</h3>
                    <p className="text-gray-500">患者ID: {previewData.patientId}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {previewData.startDate} 至 {previewData.endDate}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Pill className="h-4 w-4 mr-1" />
                    药物治疗
                  </h4>
                  <div className="space-y-2">
                    {previewData.medications.map((med: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between">
                          <span className="font-medium">{med.name}</span>
                          <Badge variant="outline">{med.dosage}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {med.frequency}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">饮食建议</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {previewData.dietaryRecommendations.map((rec: string, index: number) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center text-sm bg-blue-50 p-3 rounded-md">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <span>
                    下次随访日期: <strong>{previewData.followUpDate}</strong>
                  </span>
                </div>

                {previewMode === "interactive" && (
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                      修改方案
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                      导出PDF
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center">
                <p className="text-gray-500">无治疗方案数据</p>
              </div>
            )}
          </CardContent>
        </Card>
      </SafePreview>
    </PreviewDataLoader>
  )
}
