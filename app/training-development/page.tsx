import type { Metadata } from "next"
import TrainingDevelopmentClient from "@/components/training/training-development-client"

export const metadata: Metadata = {
  title: "培训内容开发 | 言语医枢³",
  description: "言语医枢³系统培训内容开发、培训师管理、试点实施和效果评估",
}

export default function TrainingDevelopmentPage() {
  return <TrainingDevelopmentClient />
}
