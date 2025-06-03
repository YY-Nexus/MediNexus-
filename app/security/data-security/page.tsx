import type { Metadata } from "next"
import { DataSecurityClient } from "@/components/security/data-security-client"

export const metadata: Metadata = {
  title: "数据安全管理 | 言语云³",
  description: "全面的数据安全管理和监控系统",
}

export default function DataSecurityPage() {
  return <DataSecurityClient />
}
