import type { Metadata } from "next"
import { Suspense } from "react"
import { SimpleMedicationsClient } from "@/components/medications/simple-medications-client"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export const metadata: Metadata = {
  title: "药物管理 | 言语医枢³智能诊疗系统",
  description: "言语医枢³全面的药物管理系统，包括药物目录、库存管理、处方管理、药物相互作用检查和用药指导",
}

export default function MedicationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <SimpleMedicationsClient />
      </Suspense>
    </div>
  )
}
