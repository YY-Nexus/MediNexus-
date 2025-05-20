"use client"

import { MobileAppPreview } from "@/components/mobile-app-preview"
import { MobileAppFeatures } from "@/components/mobile-app-features"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function MobileAppDemo() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("preview")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="preview">{t("demo.mobileApp.tabs.preview", "应用预览")}</TabsTrigger>
          <TabsTrigger value="features">{t("demo.mobileApp.tabs.features", "功能特性")}</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>{t("demo.mobileApp.preview", "移动应用预览")}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <MobileAppPreview />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>{t("demo.mobileApp.features", "移动应用功能")}</CardTitle>
            </CardHeader>
            <CardContent>
              <MobileAppFeatures />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
