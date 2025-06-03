"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, AlertCircle, CheckCircle, Clock, Users } from "lucide-react"

interface DiagnosisRecommendation {
  condition: string
  confidence: number
  evidence: string[]
  riskFactors: string[]
  recommendedTests: string[]
  treatmentOptions: string[]
}

interface TreatmentPlan {
  id: string
  name: string
  description: string
  effectiveness: number
  sideEffects: string[]
  contraindications: string[]
  cost: string
  duration: string
}

export function EnhancedDecisionEngine() {
  const [patientData, setPatientData] = useState({
    symptoms: ["胸痛", "呼吸困难", "疲劳"],
    vitalSigns: { bp: "140/90", hr: "95", temp: "37.2" },
    labResults: { troponin: "0.15", bnp: "450", creatinine: "1.2" },
    history: ["高血压", "糖尿病"],
    medications: ["二甲双胍", "氯沙坦"],
  })

  const [diagnosisRecommendations, setDiagnosisRecommendations] = useState<DiagnosisRecommendation[]>([
    {
      condition: "急性冠脉综合征",
      confidence: 85,
      evidence: ["胸痛症状", "肌钙蛋白轻度升高", "心电图ST段改变"],
      riskFactors: ["高血压病史", "糖尿病病史", "年龄>50岁"],
      recommendedTests: ["冠脉造影", "心脏超声", "24小时心电图"],
      treatmentOptions: ["抗血小板治疗", "他汀类药物", "ACE抑制剂"],
    },
    {
      condition: "心力衰竭",
      confidence: 72,
      evidence: ["BNP升高", "呼吸困难", "疲劳症状"],
      riskFactors: ["高血压病史", "糖尿病病史"],
      recommendedTests: ["心脏超声", "胸部X线", "肾功能检查"],
      treatmentOptions: ["利尿剂", "ACE抑制剂", "β受体阻滞剂"],
    },
    {
      condition: "肺栓塞",
      confidence: 45,
      evidence: ["呼吸困难", "胸痛"],
      riskFactors: ["长期卧床", "手术史"],
      recommendedTests: ["CT肺动脉造影", "D-二聚体", "下肢血管超声"],
      treatmentOptions: ["抗凝治疗", "溶栓治疗"],
    },
  ])

  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([
    {
      id: "plan1",
      name: "标准抗血小板治疗方案",
      description: "双联抗血小板治疗联合他汀类药物",
      effectiveness: 88,
      sideEffects: ["出血风险", "胃肠道不适"],
      contraindications: ["活动性出血", "严重肝功能不全"],
      cost: "中等",
      duration: "12个月",
    },
    {
      id: "plan2",
      name: "保守治疗方案",
      description: "药物治疗联合生活方式干预",
      effectiveness: 65,
      sideEffects: ["较少"],
      contraindications: ["无明显禁忌"],
      cost: "较低",
      duration: "长期",
    },
  ])

  const [selectedDiagnosis, setSelectedDiagnosis] = useState<DiagnosisRecommendation | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // 模拟AI分析过程
  const runAIAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      // 更新诊断建议的置信度
      setDiagnosisRecommendations((prev) =>
        prev.map((diag) => ({
          ...diag,
          confidence: Math.min(95, diag.confidence + Math.random() * 10),
        })),
      )
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* AI分析控制面板 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            智能临床决策引擎
          </CardTitle>
          <CardDescription>基于深度学习的临床决策支持系统，整合患者数据提供个性化诊疗建议</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">分析状态</p>
              <p className="text-sm text-muted-foreground">
                {isAnalyzing ? "正在分析患者数据..." : "分析完成，建议已更新"}
              </p>
            </div>
            <Button onClick={runAIAnalysis} disabled={isAnalyzing} className="gap-2">
              {isAnalyzing ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  分析中...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4" />
                  重新分析
                </>
              )}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="mt-4">
              <Progress value={66} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">正在处理实验室结果和影像数据...</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="diagnosis" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="diagnosis">诊断建议</TabsTrigger>
          <TabsTrigger value="treatment">治疗方案</TabsTrigger>
          <TabsTrigger value="monitoring">监测计划</TabsTrigger>
        </TabsList>

        <TabsContent value="diagnosis" className="space-y-4">
          <div className="grid gap-4">
            {diagnosisRecommendations.map((diagnosis, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all ${
                  selectedDiagnosis?.condition === diagnosis.condition
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedDiagnosis(diagnosis)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{diagnosis.condition}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          diagnosis.confidence > 80 ? "default" : diagnosis.confidence > 60 ? "secondary" : "outline"
                        }
                      >
                        {diagnosis.confidence}% 置信度
                      </Badge>
                      {diagnosis.confidence > 80 && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {diagnosis.confidence <= 60 && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                    </div>
                  </div>
                  <Progress value={diagnosis.confidence} className="h-2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">支持证据</h4>
                    <div className="flex flex-wrap gap-1">
                      {diagnosis.evidence.map((evidence, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {evidence}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">风险因素</h4>
                    <div className="flex flex-wrap gap-1">
                      {diagnosis.riskFactors.map((factor, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">建议检查</h4>
                    <div className="flex flex-wrap gap-1">
                      {diagnosis.recommendedTests.map((test, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-blue-50">
                          {test}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="treatment" className="space-y-4">
          <div className="grid gap-4">
            {treatmentPlans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <Badge variant="outline">{plan.effectiveness}% 有效性</Badge>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">治疗周期</h4>
                      <p className="text-sm">{plan.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">治疗成本</h4>
                      <p className="text-sm">{plan.cost}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">可能副作用</h4>
                    <div className="flex flex-wrap gap-1">
                      {plan.sideEffects.map((effect, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs text-orange-600">
                          {effect}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">禁忌症</h4>
                    <div className="flex flex-wrap gap-1">
                      {plan.contraindications.map((contra, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs text-red-600">
                          {contra}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      选择此方案
                    </Button>
                    <Button size="sm" variant="outline">
                      查看详情
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                个性化监测计划
              </CardTitle>
              <CardDescription>基于患者风险评估的智能监测方案</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">短期监测（1-2周）</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• 每日血压监测</li>
                    <li>• 心电图复查（3天后）</li>
                    <li>• 肌钙蛋白复查（24小时后）</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">中期监测（1-3个月）</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• 心脏超声检查</li>
                    <li>• 肝肾功能检查</li>
                    <li>• 血脂谱复查</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">长期监测（3-6个月）</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• 冠脉造影评估</li>
                    <li>• 糖化血红蛋白检查</li>
                    <li>• 生活质量评估</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">生成监测计划</Button>
                <Button variant="outline">导出PDF</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
