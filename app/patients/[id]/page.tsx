import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PatientRiskAssessment from "@/components/patients/patient-risk-assessment"
import PatientEducationMaterials from "@/components/patients/patient-education-materials"

interface Props {
  params: { id: string }
}

const PatientDetailPage = ({ params }: Props) => {
  return (
    <div>
      <Tabs defaultValue="overview" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="records">病历</TabsTrigger>
          <TabsTrigger value="risk">风险评估</TabsTrigger>
          <TabsTrigger value="education">教育材料</TabsTrigger>
          <TabsTrigger value="treatment">治疗</TabsTrigger>
          <TabsTrigger value="history">历史</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          概览内容
        </TabsContent>
        <TabsContent value="records" className="space-y-6">
          病历内容
        </TabsContent>
        <TabsContent value="risk" className="space-y-6">
          <PatientRiskAssessment patientId={params.id} />
        </TabsContent>
        <TabsContent value="education" className="space-y-6">
          <PatientEducationMaterials patientId={params.id} />
        </TabsContent>
        <TabsContent value="treatment" className="space-y-6">
          治疗内容
        </TabsContent>
        <TabsContent value="history" className="space-y-6">
          历史内容
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PatientDetailPage
