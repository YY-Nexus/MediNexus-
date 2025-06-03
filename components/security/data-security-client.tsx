"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"
import { DataEncryptionManagement } from "./data-encryption-management"
import { AccessLogAudit } from "./access-log-audit"
import { ThreatDetectionSystem } from "./threat-detection-system"
import { ComplianceChecker } from "./compliance-checker"
import { Shield } from "lucide-react"

export function DataSecurityClient() {
  const [activeTab, setActiveTab] = useState("encryption")

  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title="数据安全管理"
        description="全面的数据安全管理、监控和合规检查系统"
        icon={<Shield className="h-6 w-6" />}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="encryption">数据加密</TabsTrigger>
          <TabsTrigger value="audit">访问审计</TabsTrigger>
          <TabsTrigger value="threat">威胁检测</TabsTrigger>
          <TabsTrigger value="compliance">合规检查</TabsTrigger>
        </TabsList>

        <TabsContent value="encryption">
          <DataEncryptionManagement />
        </TabsContent>

        <TabsContent value="audit">
          <AccessLogAudit />
        </TabsContent>

        <TabsContent value="threat">
          <ThreatDetectionSystem />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceChecker />
        </TabsContent>
      </Tabs>
    </div>
  )
}
