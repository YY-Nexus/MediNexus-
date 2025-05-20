"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIModelDemo } from "./ai-model-demo"
import { PatientDataDemo } from "./patient-data-demo"
import { ClinicalDecisionDemo } from "./clinical-decision-demo"
import { SecurityDemo } from "./security-demo"
import { MobileAppDemo } from "./mobile-app-demo"
import { ResearchDemo } from "./research-demo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"

export function SystemDemo() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("ai-models")

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{t("demo.title", "系统功能演示")}</CardTitle>
          <CardDescription>{t("demo.description", "探索YanYu MediNexus³系统的核心功能和特性")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
              <TabsTrigger value="ai-models">{t("demo.tabs.aiModels", "AI模型")}</TabsTrigger>
              <TabsTrigger value="patient-data">{t("demo.tabs.patientData", "患者数据")}</TabsTrigger>
              <TabsTrigger value="clinical-decision">{t("demo.tabs.clinicalDecision", "临床决策")}</TabsTrigger>
              <TabsTrigger value="security">{t("demo.tabs.security", "安全性")}</TabsTrigger>
              <TabsTrigger value="mobile-app">{t("demo.tabs.mobileApp", "移动应用")}</TabsTrigger>
              <TabsTrigger value="research">{t("demo.tabs.research", "研究")}</TabsTrigger>
            </TabsList>

            <TabsContent value="ai-models" className="mt-4">
              <AIModelDemo />
            </TabsContent>

            <TabsContent value="patient-data" className="mt-4">
              <PatientDataDemo />
            </TabsContent>

            <TabsContent value="clinical-decision" className="mt-4">
              <ClinicalDecisionDemo />
            </TabsContent>

            <TabsContent value="security" className="mt-4">
              <SecurityDemo />
            </TabsContent>

            <TabsContent value="mobile-app" className="mt-4">
              <MobileAppDemo />
            </TabsContent>

            <TabsContent value="research" className="mt-4">
              <ResearchDemo />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
