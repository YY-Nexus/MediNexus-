import { PreviewControls } from "@/components/preview/preview-controls"
import { PreviewProvider } from "@/contexts/preview-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientPreview } from "@/components/preview/patient-preview"
import { MedicalRecordPreview } from "@/components/preview/medical-record-preview"
import { DiagnosisPreview } from "@/components/preview/diagnosis-preview"
import { TreatmentPreview } from "@/components/preview/treatment-preview"

export default function PreviewPage() {
  return (
    <PreviewProvider>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">系统预览</h1>
          <PreviewControls />
        </div>

        <Tabs defaultValue="patient">
          <TabsList className="mb-4">
            <TabsTrigger value="patient">患者信息</TabsTrigger>
            <TabsTrigger value="medical-record">医疗记录</TabsTrigger>
            <TabsTrigger value="diagnosis">AI诊断</TabsTrigger>
            <TabsTrigger value="treatment">治疗方案</TabsTrigger>
          </TabsList>

          <TabsContent value="patient">
            <PatientPreview />
          </TabsContent>

          <TabsContent value="medical-record">
            <MedicalRecordPreview />
          </TabsContent>

          <TabsContent value="diagnosis">
            <DiagnosisPreview />
          </TabsContent>

          <TabsContent value="treatment">
            <TreatmentPreview />
          </TabsContent>
        </Tabs>
      </div>
    </PreviewProvider>
  )
}
