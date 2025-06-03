"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Eye,
  Brain,
  Target,
  AlertCircle,
  CheckCircle,
  Info,
  Lightbulb,
  BarChart3,
  Clock,
  Users,
} from "lucide-react"

interface ExplanationLevel {
  id: string
  name: string
  description: string
  targetAudience: string
  complexity: "basic" | "intermediate" | "advanced"
}

interface DiagnosisStep {
  id: string
  step: number
  title: string
  description: string
  confidence: number
  evidence: string[]
  reasoning: string
  alternatives: string[]
}

interface VisualizationData {
  type: "heatmap" | "attention" | "feature" | "pathway"
  title: string
  description: string
  importance: number
  coordinates?: { x: number; y: number; intensity: number }[]
}

export function RealTimeExplainabilityEnhancer() {
  const [selectedLevel, setSelectedLevel] = useState("physician")
  const [isGenerating, setIsGenerating] = useState(false)
  const [explanationProgress, setExplanationProgress] = useState(0)
  const [selectedVisualization, setSelectedVisualization] = useState("heatmap")

  // 解释级别配置
  const explanationLevels: ExplanationLevel[] = [
    {
      id: "patient",
      name: "患者级别",
      description: "简单易懂的解释，适合患者和家属理解",
      targetAudience: "患者和家属",
      complexity: "basic",
    },
    {
      id: "nurse",
      name: "护理级别",
      description: "包含基本医学术语的解释，适合护理人员",
      targetAudience: "护理人员",
      complexity: "intermediate",
    },
    {
      id: "physician",
      name: "医生级别",
      description: "详细的医学解释，包含专业术语和临床推理",
      targetAudience: "医生和专家",
      complexity: "advanced",
    },
    {
      id: "researcher",
      name: "研究级别",
      description: "深度技术解释，包含算法细节和统计分析",
      targetAudience: "研究人员",
      complexity: "advanced",
    },
  ]

  // 诊断步骤
  const diagnosisSteps: DiagnosisStep[] = [
    {
      id: "step1",
      step: 1,
      title: "影像特征识别",
      description: "AI模型首先分析CT扫描图像，识别关键的影像学特征",
      confidence: 0.94,
      evidence: ["肺结节形态", "密度特征", "边缘特征", "周围组织变化"],
      reasoning: "基于深度学习模型对超过100万例CT图像的训练，识别出与肺癌相关的典型影像学特征",
      alternatives: ["良性结节", "炎症性病变", "肺结核"],
    },
    {
      id: "step2",
      step: 2,
      title: "临床数据整合",
      description: "结合患者的临床症状、病史和实验室检查结果",
      confidence: 0.89,
      evidence: ["咳嗽症状", "吸烟史", "肿瘤标志物升高", "年龄因素"],
      reasoning: "临床数据与影像学发现高度一致，支持恶性病变的诊断",
      alternatives: ["慢性阻塞性肺病", "肺部感染", "间质性肺病"],
    },
    {
      id: "step3",
      step: 3,
      title: "风险评估计算",
      description: "基于多因素模型计算恶性风险概率",
      confidence: 0.92,
      evidence: ["结节大小", "生长速度", "PET代谢", "分子标志物"],
      reasoning: "综合评估模型显示高风险特征，建议进一步确诊检查",
      alternatives: ["中等风险", "低风险", "需要更多数据"],
    },
  ]

  // 可视化数据
  const visualizationData: VisualizationData[] = [
    {
      type: "heatmap",
      title: "注意力热力图",
      description: "显示AI模型关注的图像区域",
      importance: 0.95,
    },
    {
      type: "attention",
      title: "特征重要性",
      description: "各个特征对诊断结果的贡献度",
      importance: 0.88,
    },
    {
      type: "feature",
      title: "特征激活图",
      description: "神经网络中间层的特征激活情况",
      importance: 0.82,
    },
    {
      type: "pathway",
      title: "决策路径",
      description: "AI模型的决策推理路径",
      importance: 0.9,
    },
  ]

  // 生成解释
  const generateExplanation = () => {
    setIsGenerating(true)
    setExplanationProgress(0)

    const interval = setInterval(() => {
      setExplanationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          return 100
        }
        return prev + 15
      })
    }, 300)
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "basic":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStepIcon = (step: number) => {
    const icons = [Eye, Brain, Target]
    const Icon = icons[step - 1] || Info
    return <Icon className="h-5 w-5" />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            实时诊断结果解释性增强
          </CardTitle>
          <CardDescription>为不同用户群体提供个性化的AI诊断解释，增强诊断透明度和可信度</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="explanation-config">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="explanation-config">解释配置</TabsTrigger>
              <TabsTrigger value="step-by-step">逐步解释</TabsTrigger>
              <TabsTrigger value="visualization">可视化解释</TabsTrigger>
              <TabsTrigger value="interactive">交互式问答</TabsTrigger>
            </TabsList>

            <TabsContent value="explanation-config" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">解释级别选择</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择解释级别" />
                      </SelectTrigger>
                      <SelectContent>
                        {explanationLevels.map((level) => (
                          <SelectItem key={level.id} value={level.id}>
                            {level.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {explanationLevels
                      .filter((level) => level.id === selectedLevel)
                      .map((level) => (
                        <div key={level.id} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{level.name}</span>
                            <Badge className={getComplexityColor(level.complexity)}>
                              {level.complexity === "basic"
                                ? "基础"
                                : level.complexity === "intermediate"
                                  ? "中级"
                                  : "高级"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{level.description}</p>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">目标用户: {level.targetAudience}</span>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">解释设置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="include-confidence">包含置信度</Label>
                        <Switch id="include-confidence" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-alternatives">显示替代诊断</Label>
                        <Switch id="show-alternatives" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="include-evidence">包含证据链</Label>
                        <Switch id="include-evidence" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="visual-aids">可视化辅助</Label>
                        <Switch id="visual-aids" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="real-time-update">实时更新</Label>
                        <Switch id="real-time-update" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>解释详细程度</Label>
                      <Select defaultValue="detailed">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brief">简要</SelectItem>
                          <SelectItem value="standard">标准</SelectItem>
                          <SelectItem value="detailed">详细</SelectItem>
                          <SelectItem value="comprehensive">全面</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={generateExplanation}
                      disabled={isGenerating}
                      className="w-full flex items-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <Clock className="h-4 w-4 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <Lightbulb className="h-4 w-4" />
                          生成解释
                        </>
                      )}
                    </Button>

                    {isGenerating && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>生成进度</span>
                          <span>{explanationProgress}%</span>
                        </div>
                        <Progress value={explanationProgress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="step-by-step" className="space-y-4">
              <div className="space-y-4">
                {diagnosisSteps.map((step, index) => (
                  <Card key={step.id} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          {getStepIcon(step.step)}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            步骤 {step.step}: {step.title}
                          </CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </div>
                        <Badge variant="secondary">置信度: {(step.confidence * 100).toFixed(1)}%</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            关键证据
                          </h4>
                          <ul className="space-y-1">
                            {step.evidence.map((evidence, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                {evidence}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                            替代可能
                          </h4>
                          <ul className="space-y-1">
                            {step.alternatives.map((alt, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                {alt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2">
                          <Brain className="h-4 w-4 text-blue-600" />
                          AI推理过程
                        </h4>
                        <p className="text-sm text-gray-700">{step.reasoning}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="visualization" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">可视化类型</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select value={selectedVisualization} onValueChange={setSelectedVisualization}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择可视化类型" />
                      </SelectTrigger>
                      <SelectContent>
                        {visualizationData.map((viz) => (
                          <SelectItem key={viz.type} value={viz.type}>
                            {viz.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {visualizationData
                      .filter((viz) => viz.type === selectedVisualization)
                      .map((viz) => (
                        <div key={viz.type} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium">{viz.title}</h3>
                          <p className="text-sm text-gray-600">{viz.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">重要性:</span>
                            <Progress value={viz.importance * 100} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{(viz.importance * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">可视化预览</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          {visualizationData.find((v) => v.type === selectedVisualization)?.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">可视化内容将在此处显示</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">解释性指标</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">94.2%</div>
                      <div className="text-sm text-gray-600">解释准确性</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">0.8s</div>
                      <div className="text-sm text-gray-600">生成时间</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">87%</div>
                      <div className="text-sm text-gray-600">用户理解度</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">92%</div>
                      <div className="text-sm text-gray-600">信任度评分</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interactive" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">智能问答</CardTitle>
                    <CardDescription>针对诊断结果提出问题，获得详细解答</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                            Q
                          </div>
                          <p className="text-sm">为什么AI认为这是肺癌而不是良性结节？</p>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <div className="h-6 w-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">
                            A
                          </div>
                          <p className="text-sm">
                            AI模型基于以下关键特征做出判断：1) 结节边缘不规则，呈毛刺状； 2)
                            密度不均匀，存在坏死区域；3) 周围血管征象明显； 4)
                            结合患者吸烟史和年龄因素，恶性概率显著增高。
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user-question">您的问题</Label>
                      <Textarea id="user-question" placeholder="请输入您想了解的问题..." className="min-h-[80px]" />
                      <Button className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        提交问题
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">常见问题</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "这个诊断的准确率有多高？",
                      "还需要做哪些检查来确认？",
                      "如果是误诊会有什么后果？",
                      "AI是如何分析影像的？",
                      "为什么置信度不是100%？",
                      "其他医生会同意这个诊断吗？",
                    ].map((question, index) => (
                      <Button key={index} variant="outline" className="w-full justify-start text-left h-auto p-3">
                        <Info className="h-4 w-4 mr-2 shrink-0" />
                        <span className="text-sm">{question}</span>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">解释反馈</CardTitle>
                  <CardDescription>您的反馈将帮助我们改进解释质量</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-medium mb-2">解释清晰度</div>
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button key={star} variant="ghost" size="sm" className="p-1">
                            ⭐
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium mb-2">信息完整性</div>
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button key={star} variant="ghost" size="sm" className="p-1">
                            ⭐
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium mb-2">整体满意度</div>
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button key={star} variant="ghost" size="sm" className="p-1">
                            ⭐
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
