"use client"
import { SafePreview } from "@/components/preview/safe-preview"
import { PreviewDataLoader } from "@/components/preview/preview-data-loader"
import { usePreview } from "@/contexts/preview-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MedicalRecordPreview() {
  const { previewData, previewMode } = usePreview()

  return (
    <PreviewDataLoader dataSource="medical-record">
      <SafePreview previewName="MedicalRecord">
        <Card>
          <CardHeader>
            <CardTitle>医疗记录</CardTitle>
          </CardHeader>
          <CardContent>
            {previewData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">记录ID</h4>
                    <p>{previewData.id}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">患者ID</h4>
                    <p>{previewData.patientId}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">日期</h4>
                    <p>{previewData.date}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">医生</h4>
                    <p>{previewData.doctor}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">诊断</h4>
                  <p className="font-medium">{previewData.diagnosis}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">治疗</h4>
                  <p>{previewData.treatment}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">备注</h4>
                  <p className="text-sm">{previewData.notes}</p>
                </div>

                {previewMode === "interactive" && (
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                      编辑记录
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                      打印记录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center">
                <p className="text-gray-500">无医疗记录数据</p>
              </div>
            )}
          </CardContent>
        </Card>
      </SafePreview>
    </PreviewDataLoader>
  )
}
