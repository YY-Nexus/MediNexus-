"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"
import { MedicalCard } from "@/components/ui/medical-card"
import { RoleBasedTraining } from "./role-based-training"
import { TrainingSchedule } from "./training-schedule"
import { TrainingResources } from "./training-resources"
import { TrainingCertification } from "./training-certification"
import { TrainingFeedback } from "./training-feedback"

export default function UserTrainingClient() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="用户培训方案"
        description="为不同角色的用户提供定制化培训内容，确保所有用户能够高效使用言语医枢³系统"
      />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="overview">培训概述</TabsTrigger>
          <TabsTrigger value="roles">角色培训</TabsTrigger>
          <TabsTrigger value="schedule">培训日程</TabsTrigger>
          <TabsTrigger value="resources">培训资源</TabsTrigger>
          <TabsTrigger value="certification">认证评估</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <TrainingOverview />
        </TabsContent>

        <TabsContent value="roles">
          <RoleBasedTraining />
        </TabsContent>

        <TabsContent value="schedule">
          <TrainingSchedule />
        </TabsContent>

        <TabsContent value="resources">
          <TrainingResources />
        </TabsContent>

        <TabsContent value="certification">
          <TrainingCertification />
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <TrainingFeedback />
      </div>
    </div>
  )
}

function TrainingOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <MedicalCard className="md:col-span-2">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">言语医枢³用户培训体系</h2>
          <p className="mb-4">
            为确保所有用户能够充分利用言语医枢³系统的功能，我们设计了全面的分角色培训方案。该方案基于用户在医疗机构中的不同角色和职责，提供有针对性的培训内容和资源。
          </p>
          <p className="mb-4">
            我们的培训体系采用"混合学习"模式，结合线上自学、线下实操和专家指导，确保用户在理论和实践层面都能熟练掌握系统操作。
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">培训目标</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>使所有用户熟悉言语医枢³系统的核心功能和操作流程</li>
            <li>提高用户在日常工作中使用系统的效率和准确性</li>
            <li>确保用户了解系统中的数据安全和患者隐私保护要求</li>
            <li>培养用户解决常见问题的能力，减少技术支持需求</li>
            <li>建立持续学习机制，帮助用户适应系统更新和新功能</li>
          </ul>
        </div>
      </MedicalCard>

      <MedicalCard>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">培训方法</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                1
              </span>
              <div>
                <p className="font-medium">线上自学课程</p>
                <p className="text-gray-600 text-sm">包含视频教程、操作指南和知识测验</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                2
              </span>
              <div>
                <p className="font-medium">线下实操培训</p>
                <p className="text-gray-600 text-sm">由专业培训师指导的实际操作练习</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                3
              </span>
              <div>
                <p className="font-medium">角色扮演模拟</p>
                <p className="text-gray-600 text-sm">模拟真实工作场景中的系统使用情况</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                4
              </span>
              <div>
                <p className="font-medium">专家指导会议</p>
                <p className="text-gray-600 text-sm">解答疑问并分享高级使用技巧</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                5
              </span>
              <div>
                <p className="font-medium">持续支持与更新</p>
                <p className="text-gray-600 text-sm">定期更新培训内容并提供持续支持</p>
              </div>
            </li>
          </ul>
        </div>
      </MedicalCard>

      <MedicalCard>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">培训流程</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <h4 className="font-semibold">第一阶段：基础培训</h4>
              <p className="text-sm text-gray-600">所有用户完成系统基础功能培训</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <h4 className="font-semibold">第二阶段：角色专项培训</h4>
              <p className="text-sm text-gray-600">根据用户角色进行专项功能培训</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-1">
              <h4 className="font-semibold">第三阶段：实操演练</h4>
              <p className="text-sm text-gray-600">在模拟环境中进行实际操作练习</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4 py-1">
              <h4 className="font-semibold">第四阶段：认证评估</h4>
              <p className="text-sm text-gray-600">完成系统使用能力评估并获取认证</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-1">
              <h4 className="font-semibold">第五阶段：持续学习</h4>
              <p className="text-sm text-gray-600">定期参与更新培训和高级功能学习</p>
            </div>
          </div>
        </div>
      </MedicalCard>
    </div>
  )
}
