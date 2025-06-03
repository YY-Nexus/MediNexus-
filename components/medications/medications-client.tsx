import { TabsContent } from "@/components/ui/tabs"
import MedicationGuidance from "./medication-guidance"
// 或者使用命名导入
// import { MedicationGuidance } from "./medication-guidance"

const MedicationsClient = () => {
  return (
    <>
      <TabsContent value="guidance" className="space-y-4">
        <MedicationGuidance />
      </TabsContent>
    </>
  )
}

export default MedicationsClient
