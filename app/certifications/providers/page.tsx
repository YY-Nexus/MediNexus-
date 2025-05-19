import { PageHeader } from "@/components/page-header"
import { Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VerificationProvidersList } from "@/components/certifications/verification-providers-list"
import { VerificationProcessGuide } from "@/components/certifications/verification-process-guide"
import { VerificationProviderSettings } from "@/components/certifications/verification-provider-settings"

export default function VerificationProvidersPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title="资质验证机构"
        description="了解支持的资质验证机构及验证流程"
        icon={<Shield className="h-6 w-6" />}
      />

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="providers">验证机构</TabsTrigger>
          <TabsTrigger value="process">验证流程</TabsTrigger>
          <TabsTrigger value="settings">验证设置</TabsTrigger>
        </TabsList>

        <TabsContent value="providers">
          <VerificationProvidersList />
        </TabsContent>

        <TabsContent value="process">
          <VerificationProcessGuide />
        </TabsContent>

        <TabsContent value="settings">
          <VerificationProviderSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
