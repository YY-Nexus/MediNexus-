import type { Metadata } from "next"
import UserTrainingClient from "@/components/training/user-training-client"

export const metadata: Metadata = {
  title: "用户培训方案 | 言语医枢³",
  description: "言语医枢³系统分角色用户培训方案，为不同角色的用户提供定制化培训内容",
}

export default function UserTrainingPage() {
  return <UserTrainingClient />
}
