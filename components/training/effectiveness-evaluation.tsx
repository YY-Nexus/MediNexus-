"use client"

import { useState } from "react"
import { MedicalCard } from "@/components/ui/medical-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  Target,
  Users,
  Award,
  CheckCircle,
  AlertTriangle,
  Calendar,
  FileText,
  Download,
} from "lucide-react"

export function EffectivenessEvaluation() {
  const [timeRange, setTimeRange] = useState("last-3-months")
  const [evaluationType, setEvaluationType] = useState("overall")

  // 评估数据
  const evaluationData = {
    overall: {
      totalTrainees: 856,
      completionRate: 87,
      averageScore: 4.6,
      certificationRate: 82,
      satisfactionScore: 4.5,
      knowledgeRetention: 78,
      skillImprovement: 85,
      systemUsageIncrease: 92,
    },
    byRole: [
      {
        role: "临床医生",
        trainees: 320,
        completion: 89,
        score: 4.7,
        certification: 85,
        satisfaction: 4.6,
        retention: 82,
        improvement: 88,
      },
      {
        role: "护理人员",
        trainees: 280,
        completion: 91,
        score: 4.5,
        certification: 87,
        satisfaction: 4.4,
        retention: 75,
        improvement: 83,
      },
      {
        role: "系统管理员",
        trainees: 128,
        completion: 85,
        score: 4.8,
        certification: 78,
        satisfaction: 4.7,
        retention: 85,
        improvement: 90,
      },
      {
        role: "研究人员",
        trainees: 98,
        completion: 88,
        score: 4.6,
        certification: 80,
        satisfaction: 4.5,
        retention: 80,
        improvement: 87,
      },
      {
        role: "技术人员",
        trainees: 30,
        completion: 83,
        score: 4.4,
        certification: 75,
        satisfaction: 4.3,
        retention: 72,
        improvement: 82,
      },
    ],
    trends: [
      { month: "2025-01", completion: 78, satisfaction: 4.2, retention: 70 },
      { month: "2025-02", completion: 82, satisfaction: 4.3, retention: 74 },
      { month: "2025-03", completion: 85, satisfaction: 4.4, retention: 76 },
      { month: "2025-04", completion: 87, satisfaction: 4.5, retention: 78 },
      { month: "2025-05", completion: 87, satisfaction: 4.6, retention: 78 },
    ],
    improvements: [
      {
        area: "培训内容质量",
        before: 4.2,
        after: 4.6,
        improvement: 9.5,
        actions: ["更新过时内容", "增加实际案例", "优化视频质量"],
      },
      {
        area: "培训师表现",
        before: 4.3,
        after: 4.7,
        improvement: 9.3,
        actions: ["培训师再培训", "建立反馈机制", "优化培训方法"],
      },
      {
        area: "学习体验",
        before: 4.1,
        after: 4.5,
        improvement: 9.8,
        actions: ["改进界面设计", "增加互动元素", "优化学习路径"],
      },
    ],
  }

  return (
    <div className="space-y-6">
      <MedicalCard className="p-6">
        <h2 className="text-2xl font-bold mb-4">培训效果评估</h2>
        <p className="mb-6">通过多维度的数据分析和评估，持续监控培训效果，识别改进机会，确保培训质量的持续提升。</p>

        <div className="flex gap-4 mb-6">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">最近1个月</SelectItem>
              <SelectItem value="last-3-months">最近3个月</SelectItem>
              <SelectItem value="last-6-months">最近6个月</SelectItem>
              <SelectItem value="last-year">最近1年</SelectItem>
            </SelectContent>
          </Select>

          <Select value={evaluationType} onValueChange={setEvaluationType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="选择评估类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overall">整体评估</SelectItem>
              <SelectItem value="by-role">分角色评估</SelectItem>
              <SelectItem value="by-module">分模块评估</SelectItem>
              <SelectItem value="trends">趋势分析</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="ml-auto">
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <MedicalCard className="bg-blue-50 border-blue-200">
            <div className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">培训人数</h3>
              <p className="text-2xl font-bold text-blue-900 mt-1">{evaluationData.overall.totalTrainees}</p>
              <p className="text-sm text-blue-600">累计培训</p>
            </div>
          </MedicalCard>

          <MedicalCard className="bg-green-50 border-green-200">
            <div className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">完成率</h3>
              <p className="text-2xl font-bold text-green-900 mt-1">{evaluationData.overall.completionRate}%</p>
              <p className="text-sm text-green-600">平均完成率</p>
            </div>
          </MedicalCard>

          <MedicalCard className="bg-purple-50 border-purple-200">
            <div className="p-4 text-center">
              <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800">认证率</h3>
              <p className="text-2xl font-bold text-purple-900 mt-1">{evaluationData.overall.certificationRate}%</p>
              <p className="text-sm text-purple-600">通过认证</p>
            </div>
          </MedicalCard>

          <MedicalCard className="bg-orange-50 border-orange-200">
            <div className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-800">满意度</h3>
              <p className="text-2xl font-bold text-orange-900 mt-1">{evaluationData.overall.satisfactionScore}</p>
              <p className="text-sm text-orange-600">平均评分</p>
            </div>
          </MedicalCard>
        </div>
      </MedicalCard>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metrics">关键指标</TabsTrigger>
          <TabsTrigger value="roles">角色分析</TabsTrigger>
          <TabsTrigger value="trends">趋势分析</TabsTrigger>
          <TabsTrigger value="improvements">改进措施</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <MedicalCard className="p-6">
              <h3 className="text-lg font-bold mb-4">核心评估指标</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>知识掌握度</span>
                    <span>{evaluationData.overall.knowledgeRetention}%</span>
                  </div>
                  <Progress value={evaluationData.overall.knowledgeRetention} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>技能提升度</span>
                    <span>{evaluationData.overall.skillImprovement}%</span>
                  </div>
                  <Progress value={evaluationData.overall.skillImprovement} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>系统使用率提升</span>
                    <span>{evaluationData.overall.systemUsageIncrease}%</span>
                  </div>
                  <Progress value={evaluationData.overall.systemUsageIncrease} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>培训完成率</span>
                    <span>{evaluationData.overall.completionRate}%</span>
                  </div>
                  <Progress value={evaluationData.overall.completionRate} className="h-2" />
                </div>
              </div>
            </MedicalCard>

            <MedicalCard className="p-6">
              <h3 className="text-lg font-bold mb-4">评估方法说明</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-semibold text-sm">知识掌握度评估</h4>
                  <p className="text-xs text-gray-600">通过培训前后测试对比，评估知识掌握程度</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-semibold text-sm">技能提升度评估</h4>
                  <p className="text-xs text-gray-600">通过实操演练和工作表现评估技能提升</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-3">
                  <h4 className="font-semibold text-sm">系统使用率评估</h4>
                  <p className="text-xs text-gray-600">监控培训后系统功能使用频率变化</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-3">
                  <h4 className="font-semibold text-sm">满意度评估</h4>
                  <p className="text-xs text-gray-600">收集学员对培训内容和方式的反馈评价</p>
                </div>
              </div>
            </MedicalCard>
          </div>
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <MedicalCard className="p-6">
            <h3 className="text-lg font-bold mb-4">分角色效果分析</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">角色</th>
                    <th className="text-center py-2">培训人数</th>
                    <th className="text-center py-2">完成率</th>
                    <th className="text-center py-2">平均分</th>
                    <th className="text-center py-2">认证率</th>
                    <th className="text-center py-2">满意度</th>
                    <th className="text-center py-2">知识保持</th>
                    <th className="text-center py-2">技能提升</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluationData.byRole.map((role, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 font-medium">{role.role}</td>
                      <td className="text-center py-3">{role.trainees}</td>
                      <td className="text-center py-3">{role.completion}%</td>
                      <td className="text-center py-3">{role.score}</td>
                      <td className="text-center py-3">{role.certification}%</td>
                      <td className="text-center py-3">{role.satisfaction}</td>
                      <td className="text-center py-3">{role.retention}%</td>
                      <td className="text-center py-3">{role.improvement}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <MedicalCard className="p-6">
            <h3 className="text-lg font-bold mb-4">效果趋势分析</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">月度趋势数据</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  {evaluationData.trends.map((trend, index) => (
                    <div key={index} className="bg-white p-3 rounded">
                      <h5 className="font-medium text-sm">{trend.month}</h5>
                      <div className="text-xs space-y-1 mt-2">
                        <div className="flex justify-between">
                          <span>完成率:</span>
                          <span>{trend.completion}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>满意度:</span>
                          <span>{trend.satisfaction}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>知识保持:</span>
                          <span>{trend.retention}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="improvements" className="mt-6">
          <MedicalCard className="p-6">
            <h3 className="text-lg font-bold mb-4">改进措施与效果</h3>
            <div className="space-y-4">
              {evaluationData.improvements.map((improvement, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold">{improvement.area}</h4>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">改进幅度</div>
                      <div className="text-lg font-bold text-green-600">+{improvement.improvement}%</div>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">改进前后对比</div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">改进前</div>
                          <div className="text-lg font-medium">{improvement.before}</div>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">改进后</div>
                          <div className="text-lg font-medium text-green-600">{improvement.after}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">主要改进措施</div>
                      <ul className="text-sm space-y-1">
                        {improvement.actions.map((action, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MedicalCard>
        </TabsContent>
      </Tabs>

      <EvaluationRecommendations />
    </div>
  )
}

function EvaluationRecommendations() {
  return (
    <MedicalCard className="p-6">
      <h3 className="text-xl font-bold mb-4">评估建议与下一步行动</h3>
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <Target className="h-5 w-5 text-blue-600 mr-2" />
            优化重点
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5" />
              <span>提高技术人员培训完成率</span>
            </li>
            <li className="flex items-start">
              <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5" />
              <span>改进护理人员知识保持率</span>
            </li>
            <li className="flex items-start">
              <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5" />
              <span>优化系统管理员认证流程</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
            成功经验
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              <span>临床医生培训模式可复制推广</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              <span>混合学习方式效果显著</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              <span>实时反馈机制运行良好</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <Calendar className="h-5 w-5 text-purple-600 mr-2" />
            下一步计划
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <FileText className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
              <span>制定个性化改进方案</span>
            </li>
            <li className="flex items-start">
              <FileText className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
              <span>扩大试点范围</span>
            </li>
            <li className="flex items-start">
              <FileText className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
              <span>建立长期跟踪机制</span>
            </li>
          </ul>
        </div>
      </div>
    </MedicalCard>
  )
}
