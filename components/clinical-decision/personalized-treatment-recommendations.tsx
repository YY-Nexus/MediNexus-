"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Heart,
  Target,
  TrendingUp,
  CheckCircle2,
  Clock,
  Pill,
  Activity,
  Calendar,
  BarChart3,
  Star,
  ArrowRight,
  Home,
  Video,
} from "lucide-react"

// 治疗方案类型
interface TreatmentOption {
  id: string
  name: string
  type: "药物治疗" | "手术治疗" | "物理治疗" | "心理治疗" | "生活方式干预" | "联合治疗"
  description: string
  suitabilityScore: number // 0-100 适用性评分
  efficacyRate: number // 0-100 疗效率
  riskLevel: "低" | "中" | "高"
  duration: string
  cost: "低" | "中" | "高"
  sideEffects: string[]
  contraindications: string[]
  requirements: string[]
  evidenceLevel: string
  patientFactors: {
    age: boolean
    gender: boolean
    comorbidities: boolean
    severity: boolean
    previousTreatments: boolean
  }
  outcomes: {
    shortTerm: string[]
    longTerm: string[]
  }
  monitoring: {
    frequency: string
    parameters: string[]
  }
  personalizedFactors: {
    geneticCompatibility: number // 0-100
    lifestyleAlignment: number // 0-100
    psychosocialFit: number // 0-100
    economicFeasibility: number // 0-100
    culturalAcceptability: number // 0-100
  }
  adaptiveFeatures: {
    dosageFlexibility: boolean
    scheduleAdaptability: boolean
    homeBasedOptions: boolean
    telemedicineSupport: boolean
  }
  outcomesPrediction: {
    successProbability: number // 0-100
    timeToImprovement: string
    qualityOfLifeImpact: number // 0-100
    longTermPrognosis: string
  }
}

// 患者个性化因子
interface PatientProfile {
  patientId: string
  age: number
  gender: "男" | "女"
  weight: number
  height: number
  bmi: number
  allergies: string[]
  comorbidities: string[]
  currentMedications: string[]
  previousTreatments: string[]
  lifestyle: {
    smoking: boolean
    alcohol: boolean
    exercise: string
    diet: string
  }
  preferences: {
    treatmentGoals: string[]
    riskTolerance: "保守" | "中等" | "积极"
    costSensitivity: "低" | "中" | "高"
  }
  labResults: Record<string, string>
  geneticFactors?: string[]
  socialFactors: {
    education: string
    occupation: string
    insurance: string
    familySupport: string
  }
  psychologicalProfile: {
    anxietyLevel: "低" | "中" | "高"
    depressionRisk: "低" | "中" | "高"
    copingStyle: string
    motivationLevel: number // 1-10
  }
  economicFactors: {
    incomeLevel: "低" | "中" | "高"
    employmentStatus: string
    travelDistance: number
  }
  culturalFactors: {
    language: string
    religiousBeliefs: string[]
    culturalPreferences: string[]
  }
}

interface PersonalizedTreatmentRecommendationsProps {
  patientId: string
  diagnosis: string
  onRecommendationSelect?: (recommendation: TreatmentOption) => void
}

export function PersonalizedTreatmentRecommendations({
  patientId,
  diagnosis,
  onRecommendationSelect,
}: PersonalizedTreatmentRecommendationsProps) {
  const [activeTab, setActiveTab] = useState("recommendations")
  const [selectedOption, setSelectedOption] = useState<TreatmentOption | null>(null)
  const [filterType, setFilterType] = useState<string>("all")
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null)
  const [treatmentOptions, setTreatmentOptions] = useState<TreatmentOption[]>([])
  const [loading, setLoading] = useState(true)

  // 模拟患者资料
  useEffect(() => {
    const mockPatientProfile: PatientProfile = {
      patientId,
      age: 45,
      gender: "男",
      weight: 70,
      height: 175,
      bmi: 22.9,
      allergies: ["青霉素"],
      comorbidities: ["高血压", "糖尿病"],
      currentMedications: ["二甲双胍", "氨氯地平"],
      previousTreatments: ["生活方式干预"],
      lifestyle: {
        smoking: true,
        alcohol: false,
        exercise: "轻度",
        diet: "普通饮食",
      },
      preferences: {
        treatmentGoals: ["控制症状", "提高生活质量", "预防并发症"],
        riskTolerance: "中等",
        costSensitivity: "中",
      },
      labResults: {
        血糖: "7.8 mmol/L",
        糖化血红蛋白: "8.2%",
        血压: "145/90 mmHg",
        胆固醇: "5.8 mmol/L",
      },
      geneticFactors: ["CYP2D6*1/*1", "SLCO1B1*1/*1"],
      socialFactors: {
        education: "本科",
        occupation: "软件工程师",
        insurance: "医保",
        familySupport: "配偶支持",
      },
      psychologicalProfile: {
        anxietyLevel: "中",
        depressionRisk: "低",
        copingStyle: "积极应对",
        motivationLevel: 7,
      },
      economicFactors: {
        incomeLevel: "中",
        employmentStatus: "全职",
        travelDistance: 50,
      },
      culturalFactors: {
        language: "中文",
        religiousBeliefs: ["无"],
        culturalPreferences: ["中医", "食疗"],
      },
    }

    setPatientProfile(mockPatientProfile)
    generatePersonalizedRecommendations(mockPatientProfile)
    setLoading(false)
  }, [patientId, diagnosis])

  // 生成个性化治疗推荐
  const generatePersonalizedRecommendations = (profile: PatientProfile) => {
    const recommendations: TreatmentOption[] = [
      {
        id: "treatment-1",
        name: "个性化药物治疗方案",
        type: "药物治疗",
        description: "根据患者基因型和代谢特征定制的药物治疗方案，优化药物选择和剂量。",
        suitabilityScore: 92,
        efficacyRate: 85,
        riskLevel: "中",
        duration: "3-6个月",
        cost: "中",
        sideEffects: ["轻微胃肠道反应", "可能的低血糖"],
        contraindications: ["严重肝肾功能不全"],
        requirements: ["定期血糖监测", "肝肾功能检查"],
        evidenceLevel: "IA级证据",
        patientFactors: {
          age: true,
          gender: false,
          comorbidities: true,
          severity: true,
          previousTreatments: true,
        },
        outcomes: {
          shortTerm: ["血糖控制改善", "症状缓解"],
          longTerm: ["减少并发症风险", "提高生活质量"],
        },
        monitoring: {
          frequency: "每2周",
          parameters: ["血糖", "肝功能", "肾功能"],
        },
        personalizedFactors: {
          geneticCompatibility: 90,
          lifestyleAlignment: 85,
          psychosocialFit: 80,
          economicFeasibility: 95,
          culturalAcceptability: 92,
        },
        adaptiveFeatures: {
          dosageFlexibility: true,
          scheduleAdaptability: false,
          homeBasedOptions: false,
          telemedicineSupport: true,
        },
        outcomesPrediction: {
          successProbability: 88,
          timeToImprovement: "4-8周",
          qualityOfLifeImpact: 75,
          longTermPrognosis: "良好",
        },
      },
      {
        id: "treatment-2",
        name: "综合生活方式干预计划",
        type: "生活方式干预",
        description: "结合患者生活习惯和偏好的个性化生活方式干预计划，包括饮食、运动和行为管理。",
        suitabilityScore: 88,
        efficacyRate: 78,
        riskLevel: "低",
        duration: "持续",
        cost: "低",
        sideEffects: [],
        contraindications: ["严重心肺功能不全"],
        requirements: ["患者依从性", "定期随访"],
        evidenceLevel: "IA级证据",
        patientFactors: {
          age: true,
          gender: false,
          comorbidities: true,
          severity: false,
          previousTreatments: false,
        },
        outcomes: {
          shortTerm: ["体重减轻", "血压改善"],
          longTerm: ["心血管风险降低", "整体健康改善"],
        },
        monitoring: {
          frequency: "每月",
          parameters: ["体重", "血压", "血脂", "运动量"],
        },
        personalizedFactors: {
          geneticCompatibility: 75,
          lifestyleAlignment: 95,
          psychosocialFit: 85,
          economicFeasibility: 100,
          culturalAcceptability: 98,
        },
        adaptiveFeatures: {
          dosageFlexibility: false,
          scheduleAdaptability: true,
          homeBasedOptions: true,
          telemedicineSupport: true,
        },
        outcomesPrediction: {
          successProbability: 92,
          timeToImprovement: "2-4周",
          qualityOfLifeImpact: 85,
          longTermPrognosis: "优秀",
        },
      },
      {
        id: "treatment-3",
        name: "智能胰岛素治疗方案",
        type: "药物治疗",
        description: "基于连续血糖监测和人工智能算法的精准胰岛素治疗方案。",
        suitabilityScore: 85,
        efficacyRate: 90,
        riskLevel: "中",
        duration: "长期",
        cost: "高",
        sideEffects: ["低血糖风险", "注射部位反应"],
        contraindications: ["严重低血糖史"],
        requirements: ["血糖监测设备", "患者教育"],
        evidenceLevel: "IB级证据",
        patientFactors: {
          age: false,
          gender: false,
          comorbidities: true,
          severity: true,
          previousTreatments: true,
        },
        outcomes: {
          shortTerm: ["血糖稳定", "糖化血红蛋白改善"],
          longTerm: ["减少急慢性并发症", "提高生活质量"],
        },
        monitoring: {
          frequency: "连续监测",
          parameters: ["血糖", "胰岛素用量", "低血糖事件"],
        },
        personalizedFactors: {
          geneticCompatibility: 80,
          lifestyleAlignment: 70,
          psychosocialFit: 75,
          economicFeasibility: 80,
          culturalAcceptability: 70,
        },
        adaptiveFeatures: {
          dosageFlexibility: true,
          scheduleAdaptability: true,
          homeBasedOptions: false,
          telemedicineSupport: true,
        },
        outcomesPrediction: {
          successProbability: 85,
          timeToImprovement: "1-2周",
          qualityOfLifeImpact: 90,
          longTermPrognosis: "良好",
        },
      },
      {
        id: "treatment-4",
        name: "心理支持治疗",
        type: "心理治疗",
        description: "针对慢性疾病相关心理问题的专业心理支持和认知行为治疗。",
        suitabilityScore: 75,
        efficacyRate: 70,
        riskLevel: "低",
        duration: "3-6个月",
        cost: "中",
        sideEffects: [],
        contraindications: ["严重精神疾病"],
        requirements: ["患者配合意愿", "专业心理师"],
        evidenceLevel: "IIA级证据",
        patientFactors: {
          age: false,
          gender: false,
          comorbidities: false,
          severity: false,
          previousTreatments: false,
        },
        outcomes: {
          shortTerm: ["情绪改善", "治疗依从性提高"],
          longTerm: ["心理健康改善", "自我管理能力增强"],
        },
        monitoring: {
          frequency: "每2周",
          parameters: ["心理评估", "依从性评分", "生活质量"],
        },
        personalizedFactors: {
          geneticCompatibility: 60,
          lifestyleAlignment: 65,
          psychosocialFit: 95,
          economicFeasibility: 90,
          culturalAcceptability: 85,
        },
        adaptiveFeatures: {
          dosageFlexibility: false,
          scheduleAdaptability: true,
          homeBasedOptions: true,
          telemedicineSupport: true,
        },
        outcomesPrediction: {
          successProbability: 70,
          timeToImprovement: "2-4周",
          qualityOfLifeImpact: 80,
          longTermPrognosis: "稳定",
        },
      },
    ]

    // 基于多维度因素的智能评分算法
    const calculatePersonalizedScore = (option: TreatmentOption) => {
      let score = option.suitabilityScore

      // 基因兼容性调整
      if (profile.geneticFactors) {
        score *= option.personalizedFactors.geneticCompatibility / 100
      }

      // 生活方式匹配度调整
      score *= option.personalizedFactors.lifestyleAlignment / 100

      // 心理社会适应性调整
      score *= option.personalizedFactors.psychosocialFit / 100

      // 经济可行性调整
      score *= option.personalizedFactors.economicFeasibility / 100

      // 文化接受度调整
      score *= option.personalizedFactors.culturalAcceptability / 100

      return Math.round(score)
    }

    // 应用个性化评分
    const enhancedRecommendations = recommendations.map((option) => ({
      ...option,
      suitabilityScore: calculatePersonalizedScore(option),
    }))

    const adjustedRecommendations = recommendations.map((option) => {
      let adjustedScore = option.suitabilityScore

      // 年龄因素调整
      if (option.patientFactors.age && profile.age > 65) {
        adjustedScore *= 0.9
      }

      // 合并症因素调整
      if (option.patientFactors.comorbidities && profile.comorbidities.length > 2) {
        adjustedScore *= 0.85
      }

      // 既往治疗因素调整
      if (option.patientFactors.previousTreatments && profile.previousTreatments.length > 0) {
        adjustedScore *= 1.1
      }

      // 风险偏好调整
      if (profile.preferences.riskTolerance === "保守" && option.riskLevel === "高") {
        adjustedScore *= 0.7
      } else if (profile.preferences.riskTolerance === "积极" && option.riskLevel === "低") {
        adjustedScore *= 1.1
      }

      // 成本敏感性调整
      if (profile.preferences.costSensitivity === "高" && option.cost === "高") {
        adjustedScore *= 0.8
      }

      return {
        ...option,
        suitabilityScore: Math.round(adjustedScore),
      }
    })

    // 按适用性评分排序
    const sortedRecommendations = enhancedRecommendations.sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    setTreatmentOptions(sortedRecommendations)
  }

  // 过滤治疗选项
  const filteredOptions = treatmentOptions.filter((option) => {
    if (filterType === "all") return true
    return option.type === filterType
  })

  // 获取风险级别颜色
  const getRiskLevelColor = (level: "低" | "中" | "高") => {
    switch (level) {
      case "低":
        return "bg-green-100 text-green-800"
      case "中":
        return "bg-yellow-100 text-yellow-800"
      case "高":
        return "bg-red-100 text-red-800"
    }
  }

  // 获取成本级别颜色
  const getCostLevelColor = (cost: "低" | "中" | "高") => {
    switch (cost) {
      case "低":
        return "bg-green-100 text-green-800"
      case "中":
        return "bg-blue-100 text-blue-800"
      case "高":
        return "bg-purple-100 text-purple-800"
    }
  }

  if (loading || !patientProfile) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            个性化治疗推荐
          </CardTitle>
          <CardDescription>正在分析患者数据并生成个性化治疗方案...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2 text-blue-600" />
          个性化治疗推荐
        </CardTitle>
        <CardDescription>基于患者个体特征和偏好的精准治疗方案推荐</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recommendations">治疗推荐</TabsTrigger>
              <TabsTrigger value="comparison">方案对比</TabsTrigger>
              <TabsTrigger value="profile">患者档案</TabsTrigger>
            </TabsList>
          </div>

          {/* 治疗推荐选项卡 */}
          <TabsContent value="recommendations" className="mt-4 px-6">
            <div className="mb-4">
              <Alert className="bg-blue-50 border-blue-200">
                <Target className="h-4 w-4" />
                <AlertTitle>个性化推荐</AlertTitle>
                <AlertDescription>
                  基于您的年龄({patientProfile.age}岁)、合并症({patientProfile.comorbidities.join("、")})
                  和治疗偏好为您推荐最适合的治疗方案。
                </AlertDescription>
              </Alert>
            </div>

            <div className="flex gap-2 mb-4">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
              >
                全部
              </Button>
              <Button
                variant={filterType === "药物治疗" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("药物治疗")}
              >
                <Pill className="h-4 w-4 mr-1" />
                药物治疗
              </Button>
              <Button
                variant={filterType === "生活方式干预" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("生活方式干预")}
              >
                <Activity className="h-4 w-4 mr-1" />
                生活方式
              </Button>
              <Button
                variant={filterType === "心理治疗" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("心理治疗")}
              >
                <Heart className="h-4 w-4 mr-1" />
                心理治疗
              </Button>
            </div>

            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {filteredOptions.map((option, index) => (
                  <div
                    key={option.id}
                    className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                      selectedOption?.id === option.id ? "border-blue-500 bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        {index === 0 && <Star className="h-5 w-5 text-yellow-500" />}
                        <h3 className="font-medium text-lg">{option.name}</h3>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          {option.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{option.suitabilityScore}%</div>
                        <div className="text-xs text-gray-500">适用性</div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{option.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">疗效率</div>
                        <div className="flex items-center">
                          <Progress value={option.efficacyRate} className="h-2 flex-1 mr-2" />
                          <span className="text-sm font-medium">{option.efficacyRate}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">风险等级</div>
                        <Badge className={getRiskLevelColor(option.riskLevel)}>{option.riskLevel}</Badge>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">治疗时长</div>
                        <div className="text-sm flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {option.duration}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">费用水平</div>
                        <Badge className={getCostLevelColor(option.cost)}>{option.cost}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2 mb-3">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">基因匹配</div>
                        <Progress value={option.personalizedFactors.geneticCompatibility} className="h-1" />
                        <span className="text-xs">{option.personalizedFactors.geneticCompatibility}%</span>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">生活方式</div>
                        <Progress value={option.personalizedFactors.lifestyleAlignment} className="h-1" />
                        <span className="text-xs">{option.personalizedFactors.lifestyleAlignment}%</span>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">心理适应</div>
                        <Progress value={option.personalizedFactors.psychosocialFit} className="h-1" />
                        <span className="text-xs">{option.personalizedFactors.psychosocialFit}%</span>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">经济可行</div>
                        <Progress value={option.personalizedFactors.economicFeasibility} className="h-1" />
                        <span className="text-xs">{option.personalizedFactors.economicFeasibility}%</span>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">文化接受</div>
                        <Progress value={option.personalizedFactors.culturalAcceptability} className="h-1" />
                        <span className="text-xs">{option.personalizedFactors.culturalAcceptability}%</span>
                      </div>
                    </div>

                    {option.evidenceLevel && (
                      <div className="mb-3">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {option.evidenceLevel}
                        </Badge>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOption(selectedOption?.id === option.id ? null : option)}
                        >
                          {selectedOption?.id === option.id ? "收起详情" : "查看详情"}
                        </Button>
                        {index === 0 && (
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            <Star className="h-3 w-3 mr-1" />
                            推荐首选
                          </Badge>
                        )}
                      </div>
                      <Button size="sm" onClick={() => onRecommendationSelect?.(option)} className="flex items-center">
                        选择此方案
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>

                    {selectedOption?.id === option.id && (
                      <div className="mt-4 pt-4 border-t space-y-3">
                        <div>
                          <h4 className="text-sm font-medium mb-2">预期结果</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">短期效果</div>
                              <ul className="text-sm space-y-1">
                                {option.outcomes.shortTerm.map((outcome, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                                    {outcome}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">长期效果</div>
                              <ul className="text-sm space-y-1">
                                {option.outcomes.longTerm.map((outcome, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <TrendingUp className="h-3 w-3 text-blue-500 mr-1" />
                                    {outcome}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {option.sideEffects.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">可能的副作用</h4>
                            <div className="flex flex-wrap gap-1">
                              {option.sideEffects.map((effect, idx) => (
                                <Badge key={idx} variant="outline" className="bg-orange-50 text-orange-700">
                                  {effect}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="text-sm font-medium mb-2">监测计划</h4>
                          <div className="text-sm">
                            <div className="flex items-center mb-1">
                              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                              监测频率：{option.monitoring.frequency}
                            </div>
                            <div className="flex items-center">
                              <BarChart3 className="h-3 w-3 mr-1 text-gray-500" />
                              监测指标：{option.monitoring.parameters.join("、")}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">个性化预测</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-blue-50 rounded-lg p-3">
                              <div className="text-sm font-medium text-blue-800">成功概率</div>
                              <div className="text-2xl font-bold text-blue-600">
                                {option.outcomesPrediction.successProbability}%
                              </div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3">
                              <div className="text-sm font-medium text-green-800">生活质量改善</div>
                              <div className="text-2xl font-bold text-green-600">
                                +{option.outcomesPrediction.qualityOfLifeImpact}%
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            预计改善时间：{option.outcomesPrediction.timeToImprovement}
                          </div>
                        </div>

                        {option.adaptiveFeatures && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">适应性特征</h4>
                            <div className="flex flex-wrap gap-2">
                              {option.adaptiveFeatures.dosageFlexibility && (
                                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                  <Pill className="h-3 w-3 mr-1" />
                                  剂量可调
                                </Badge>
                              )}
                              {option.adaptiveFeatures.scheduleAdaptability && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  时间灵活
                                </Badge>
                              )}
                              {option.adaptiveFeatures.homeBasedOptions && (
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  <Home className="h-3 w-3 mr-1" />
                                  居家治疗
                                </Badge>
                              )}
                              {option.adaptiveFeatures.telemedicineSupport && (
                                <Badge variant="outline" className="bg-orange-50 text-orange-700">
                                  <Video className="h-3 w-3 mr-1" />
                                  远程支持
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* 方案对比选项卡 */}
          <TabsContent value="comparison" className="mt-4 px-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">治疗方案对比分析</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium">方案</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">适用性</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">疗效率</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">风险</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">费用</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">时长</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatmentOptions.slice(0, 3).map((option) => (
                      <tr key={option.id} className="border-t">
                        <td className="px-4 py-2">
                          <div className="font-medium">{option.name}</div>
                          <div className="text-sm text-gray-500">{option.type}</div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center">
                            <Progress value={option.suitabilityScore} className="h-2 w-16 mr-2" />
                            <span className="text-sm">{option.suitabilityScore}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center">
                            <Progress value={option.efficacyRate} className="h-2 w-16 mr-2" />
                            <span className="text-sm">{option.efficacyRate}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <Badge className={getRiskLevelColor(option.riskLevel)}>{option.riskLevel}</Badge>
                        </td>
                        <td className="px-4 py-2">
                          <Badge className={getCostLevelColor(option.cost)}>{option.cost}</Badge>
                        </td>
                        <td className="px-4 py-2 text-sm">{option.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* 患者档案选项卡 */}
          <TabsContent value="profile" className="mt-4 px-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">患者个性化档案</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">基本信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">年龄：</span>
                        <span>{patientProfile.age}岁</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">性别：</span>
                        <span>{patientProfile.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">BMI：</span>
                        <span>{patientProfile.bmi}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">合并症</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {patientProfile.comorbidities.map((condition, idx) => (
                        <Badge key={idx} variant="outline" className="bg-red-50 text-red-700">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">治疗偏好</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">风险承受：</span>
                        <Badge variant="outline">{patientProfile.preferences.riskTolerance}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">费用敏感：</span>
                        <Badge variant="outline">{patientProfile.preferences.costSensitivity}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">最新检查结果</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {Object.entries(patientProfile.labResults).map(([test, result]) => (
                        <div key={test} className="flex justify-between">
                          <span className="text-gray-500">{test}：</span>
                          <span>{result}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">社会因素</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">教育程度：</span>
                        <span>{patientProfile.socialFactors.education}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">职业：</span>
                        <span>{patientProfile.socialFactors.occupation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">医保类型：</span>
                        <span>{patientProfile.socialFactors.insurance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">家庭支持：</span>
                        <span>{patientProfile.socialFactors.familySupport}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">心理状态</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">焦虑程度：</span>
                        <span>{patientProfile.psychologicalProfile.anxietyLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">抑郁风险：</span>
                        <span>{patientProfile.psychologicalProfile.depressionRisk}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">应对方式：</span>
                        <span>{patientProfile.psychologicalProfile.copingStyle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">动机水平：</span>
                        <span>{patientProfile.psychologicalProfile.motivationLevel}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">经济状况</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">收入水平：</span>
                        <span>{patientProfile.economicFactors.incomeLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">就业状态：</span>
                        <span>{patientProfile.economicFactors.employmentStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">就医距离：</span>
                        <span>{patientProfile.economicFactors.travelDistance}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">文化背景</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">语言：</span>
                        <span>{patientProfile.culturalFactors.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">宗教信仰：</span>
                        <span>{patientProfile.culturalFactors.religiousBeliefs.join("、")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">文化偏好：</span>
                        <span>{patientProfile.culturalFactors.culturalPreferences.join("、")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
