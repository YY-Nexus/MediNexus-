import type { Metadata } from "next"
import { AutomationClient } from "@/components/admin/automation/automation-client"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "自动化运维工具 | 言语云³",
  description: "系统自动化运维管理和监控工具",
}

export default function AutomationPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="自动化运维工具" description="系统自动化运维管理和监控工具，提升运维效率和系统稳定性" />
      <AutomationClient />
    </div>
  )
}
