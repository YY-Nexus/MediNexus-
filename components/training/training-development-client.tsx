"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"
import { ContentDevelopment } from "./content-development"
import { TrainerManagement } from "./trainer-management"
import { PilotImplementation } from "./pilot-implementation"
import { EffectivenessEvaluation } from "./effectiveness-evaluation"

export default function TrainingDevelopmentClient() {
  const [activeTab, setActiveTab] = useState("content")

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="培训内容开发与实施管理"
        description="全面管理培训内容开发、培训师团队建设、试点实施和效果评估的完整流程"
      />

      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="content">培训内容开发</TabsTrigger>
          <TabsTrigger value="trainer">培训师管理</TabsTrigger>
          <TabsTrigger value="pilot">试点实施</TabsTrigger>
          <TabsTrigger value="evaluation">效果评估</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <ContentDevelopment />
        </TabsContent>

        <TabsContent value="trainer">
          <TrainerManagement />
        </TabsContent>

        <TabsContent value="pilot">
          <PilotImplementation />
        </TabsContent>

        <TabsContent value="evaluation">
          <EffectivenessEvaluation />
        </TabsContent>
      </Tabs>
    </div>
  )
}
