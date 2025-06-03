"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PatientProfileAnalysis } from "@/components/patients/patient-profile-analysis"
import { FamilyCommunicationManagement } from "@/components/patients/family-communication-management"
import { PatientSatisfactionSurvey } from "@/components/patients/patient-satisfaction-survey"
import { MultiModalFusionOptimizer } from "@/components/ai-diagnosis/multi-modal-fusion-optimizer"
import { RealTimeExplainabilityEnhancer } from "@/components/ai-diagnosis/real-time-explainability-enhancer"
import { EdgeComputingDeployment } from "@/components/ai-diagnosis/edge-computing-deployment"
import { PersonalizedTreatmentRecommendations } from "@/components/clinical-decision/personalized-treatment-recommendations"
import { MultidisciplinaryConsultationPlatform } from "@/components/clinical-decision/multidisciplinary-consultation-platform"
import { moduleGapsAnalysis } from "@/analysis/module-gaps-analysis"
import { Users, Brain, Target, TrendingUp, CheckCircle, AlertTriangle, Lightbulb, Zap, Star, Clock } from "lucide-react"

export default function EnhancedModulesPage() {
  const [activeModule, setActiveModule] = useState("patient-management")
  const [selectedImprovement, setSelectedImprovement] = useState<string | null>(null)

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case "patient-management":
        return <Users className="h-5 w-5" />
      case "ai-diagnosis":
        return <Brain className="h-5 w-5" />
      case "clinical-decision":
        return <Target className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "high":
        return "bg-purple-100 text-purple-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">核心模块增强预览</h1>
            <p className="text-muted-foreground">患者管理、AI诊断、临床决策支持模块的功能完善和优化</p>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            功能增强版
          </Badge>
        </div>

        {/* 模块完成度概览 */}
        <div className="grid gap-4 md:grid-cols-3">
          {moduleGapsAnalysis.map((module, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getModuleIcon(
                      module.module.includes("患者管理")
                        ? "patient-management"
                        : module.module.includes("AI诊断")
                          ? "ai-diagnosis"
                          : "clinical-decision",
                    )}
                    {module.module.split(" ")[0]}
                  </CardTitle>
                  <Badge variant="secondary">{module.currentCompletion}%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={module.currentCompletion} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{module.gaps.length} 个改进点</span>
                    <span>{module.priorityImprovements.length} 个优先项</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 详细分析和预览 */}
        <Tabs value={activeModule} onValueChange={setActiveModule} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patient-management">患者管理增强</TabsTrigger>
            <TabsTrigger value="ai-diagnosis">AI诊断优化</TabsTrigger>
            <TabsTrigger value="clinical-decision">临床决策完善</TabsTrigger>
          </TabsList>

          {/* 患者管理增强 */}
          <TabsContent value="patient-management" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  患者管理系统增强 (95% → 100%)
                </CardTitle>
                <CardDescription>通过AI驱动的患者画像分析和家属沟通管理提升系统完整性</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {moduleGapsAnalysis[0].gaps.map((gap) => (
                    <Alert key={gap.id} className="border-l-4 border-l-blue-500">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <div className="font-medium">{gap.title}</div>
                          <div className="text-sm text-muted-foreground">{gap.description}</div>
                          <div className="flex gap-2">
                            <Badge className={getImpactColor(gap.impact)}>影响: {gap.impact}</Badge>
                            <Badge className={getEffortColor(gap.effort)}>工作量: {gap.effort}</Badge>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    优先改进项目
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {moduleGapsAnalysis[0].priorityImprovements.map((improvement) => (
                      <Card key={improvement.id} className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{improvement.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">优先级 {improvement.priority}</Badge>
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {improvement.estimatedTime}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{improvement.description}</p>
                          <Button
                            size="sm"
                            onClick={() =>
                              setSelectedImprovement(selectedImprovement === improvement.id ? null : improvement.id)
                            }
                            className="w-full"
                          >
                            {selectedImprovement === improvement.id ? "收起预览" : "查看预览"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 患者管理增强功能预览 */}
            {selectedImprovement === "pm-pri-1" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    患者画像深度分析 - 功能预览
                  </CardTitle>
                  <CardDescription>基于AI算法的患者全方位健康画像分析系统</CardDescription>
                </CardHeader>
                <CardContent>
                  <PatientProfileAnalysis patientId="demo-patient-001" />
                </CardContent>
              </Card>
            )}

            {selectedImprovement === "pm-pri-2" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    家属沟通管理 - 功能预览
                  </CardTitle>
                  <CardDescription>完整的家属沟通和信息管理平台</CardDescription>
                </CardHeader>
                <CardContent>
                  <FamilyCommunicationManagement patientId="demo-patient-001" />
                </CardContent>
              </Card>
            )}

            {/* 患者满意度调查预览 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  患者满意度调查系统 - 附加功能
                </CardTitle>
                <CardDescription>收集和分析患者满意度反馈，持续改进医疗服务质量</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientSatisfactionSurvey patientId="demo-patient-001" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI诊断系统优化 */}
          <TabsContent value="ai-diagnosis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI诊断系统优化 (90% → 100%)
                </CardTitle>
                <CardDescription>通过多模态融合和解释性增强提升AI诊断能力</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {moduleGapsAnalysis[1].gaps.map((gap) => (
                    <Alert key={gap.id} className="border-l-4 border-l-purple-500">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <div className="font-medium">{gap.title}</div>
                          <div className="text-sm text-muted-foreground">{gap.description}</div>
                          <div className="flex gap-2">
                            <Badge className={getImpactColor(gap.impact)}>影响: {gap.impact}</Badge>
                            <Badge className={getEffortColor(gap.effort)}>工作量: {gap.effort}</Badge>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    优先改进项目
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {moduleGapsAnalysis[1].priorityImprovements.map((improvement) => (
                      <Card key={improvement.id} className="border-l-4 border-l-purple-500">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{improvement.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">优先级 {improvement.priority}</Badge>
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {improvement.estimatedTime}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{improvement.description}</p>
                          <Button
                            size="sm"
                            onClick={() =>
                              setSelectedImprovement(selectedImprovement === improvement.id ? null : improvement.id)
                            }
                            className="w-full"
                          >
                            {selectedImprovement === improvement.id ? "收起预览" : "查看预览"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI诊断增强功能预览 */}
            {selectedImprovement === "ai-pri-1" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    多模态数据融合深度优化 - 功能预览
                  </CardTitle>
                  <CardDescription>智能整合多种医疗数据模态的高级融合系统</CardDescription>
                </CardHeader>
                <CardContent>
                  <MultiModalFusionOptimizer />
                </CardContent>
              </Card>
            )}

            {selectedImprovement === "ai-pri-2" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    实时诊断结果解释性增强 - 功能预览
                  </CardTitle>
                  <CardDescription>为不同用户群体提供个性化的AI诊断解释系统</CardDescription>
                </CardHeader>
                <CardContent>
                  <RealTimeExplainabilityEnhancer />
                </CardContent>
              </Card>
            )}

            {/* 边缘计算部署预览 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-600" />
                  边缘计算部署支持 - 附加功能
                </CardTitle>
                <CardDescription>在各种边缘设备上部署AI诊断模型，支持离线诊断</CardDescription>
              </CardHeader>
              <CardContent>
                <EdgeComputingDeployment />
              </CardContent>
            </Card>
          </TabsContent>

          {/* 临床决策支持完善 */}
          <TabsContent value="clinical-decision" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  临床决策支持完善 (90% → 100%)
                </CardTitle>
                <CardDescription>通过个性化推荐和多学科会诊提升决策支持能力</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {moduleGapsAnalysis[2].gaps.map((gap) => (
                    <Alert key={gap.id} className="border-l-4 border-l-green-500">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <div className="font-medium">{gap.title}</div>
                          <div className="text-sm text-muted-foreground">{gap.description}</div>
                          <div className="flex gap-2">
                            <Badge className={getImpactColor(gap.impact)}>影响: {gap.impact}</Badge>
                            <Badge className={getEffortColor(gap.effort)}>工作量: {gap.effort}</Badge>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    优先改进项目
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {moduleGapsAnalysis[2].priorityImprovements.map((improvement) => (
                      <Card key={improvement.id} className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{improvement.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">优先级 {improvement.priority}</Badge>
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {improvement.estimatedTime}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{improvement.description}</p>
                          <Button
                            size="sm"
                            onClick={() =>
                              setSelectedImprovement(selectedImprovement === improvement.id ? null : improvement.id)
                            }
                            className="w-full"
                          >
                            {selectedImprovement === improvement.id ? "收起预览" : "查看预览"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 临床决策增强功能预览 */}
            {selectedImprovement === "cds-pri-1" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    个性化治疗推荐系统 - 功能预览
                  </CardTitle>
                  <CardDescription>基于AI算法的患者个性化治疗方案推荐引擎</CardDescription>
                </CardHeader>
                <CardContent>
                  <PersonalizedTreatmentRecommendations
                    patientId="demo-patient-001"
                    diagnosis="2型糖尿病合并高血压"
                    onRecommendationSelect={(recommendation) => {
                      console.log("选择的治疗方案:", recommendation)
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {selectedImprovement === "cds-pri-2" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    多学科会诊协作平台 - 功能预览
                  </CardTitle>
                  <CardDescription>支持多专科医生实时协作的综合会诊系统</CardDescription>
                </CardHeader>
                <CardContent>
                  <MultidisciplinaryConsultationPlatform patientId="demo-patient-001" caseId="case-001" />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* 总体改进建议 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              系统完善总结与建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">患者管理增强</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 实施AI驱动的患者画像分析</li>
                  <li>• 建立完善的家属沟通管理</li>
                  <li>• 集成患者满意度调查系统</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">AI诊断优化</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• 开发多模态数据融合技术</li>
                  <li>• 增强诊断结果解释性</li>
                  <li>• 支持边缘计算部署</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">临床决策完善</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 构建个性化治疗推荐引擎</li>
                  <li>• 建立多学科会诊平台</li>
                  <li>• 实现实时决策支持</li>
                </ul>
              </div>
            </div>

            <Alert className="mt-4 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>实施建议：</strong>
                按照优先级顺序实施改进项目，预计4-6周内可将三个核心模块的完成度提升至100%，
                显著增强系统的智能化水平和用户体验。
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
