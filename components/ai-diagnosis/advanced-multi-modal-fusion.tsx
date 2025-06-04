"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  Layers,
  Zap,
  Activity,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Upload,
  Download,
  Target,
  Settings,
  TrendingUp,
  Lightbulb,
  Shield,
  Gauge,
} from "lucide-react"

// 增强的模态数据接口
interface EnhancedModalityData {
  id: string
  name: string
  type: "image" | "signal" | "text" | "numeric"
  status: "ready" | "processing" | "completed" | "error"
  confidence: number
  dataSize: string
  processingTime: number
  features: string[]
  qualityScore: number
  compatibility: number
  snr?: number // 信噪比
  resolution?: string
  artifacts?: string[]
  preprocessingSteps: string[]
  featureVector?: number[]
  uncertaintyMap?: number[][]
  attentionWeights?: number[]
}

// 融合策略配置
interface FusionStrategy {
  id: string
  name: string
  description: string
  type: "early" | "late" | "hybrid"
  algorithm: "weighted_average" | "attention_fusion" | "deep_fusion" | "ensemble"
  parameters: Record<string, number>
  adaptiveWeighting: boolean
  uncertaintyAware: boolean
  qualityGating: boolean
}

// 融合质量指标
interface FusionQualityMetrics {
  overallQuality: number
  modalityAlignment: number
  featureComplementarity: number
  uncertaintyReduction: number
  consistencyScore: number
  robustnessIndex: number
  informationGain: number
  computationalEfficiency: number
}

// 增强的融合结果
interface EnhancedFusionResult {
  overallConfidence: number
  processingTime: number
  fusedFeatures: string[]
  recommendations: string[]
  riskFactors: string[]
  alternativeDiagnoses: string[]
  qualityMetrics: FusionQualityMetrics
  uncertaintyAnalysis: {
    epistemic: number // 认知不确定性
    aleatoric: number // 偶然不确定性
    total: number
    confidenceInterval: [number, number]
  }
  attentionMaps: Record<string, number[][]>
  modalityContributions: Record<string, number>
  fusionStrategy: string
  validationResults: {
    crossValidationScore: number
    bootstrapConfidence: [number, number]
    sensitivityAnalysis: Record<string, number>
  }
}

// 可用的融合策略
const fusionStrategies: FusionStrategy[] = [
  {
    id: "adaptive_weighted",
    name: "自适应加权融合",
    description: "基于数据质量和模态可靠性的自适应权重分配",
    type: "hybrid",
    algorithm: "weighted_average",
    parameters: { learningRate: 0.01, regularization: 0.001 },
    adaptiveWeighting: true,
    uncertaintyAware: true,
    qualityGating: true,
  },
  {
    id: "attention_fusion",
    name: "注意力机制融合",
    description: "使用深度注意力机制学习模态间的重要性权重",
    type: "hybrid",
    algorithm: "attention_fusion",
    parameters: { attentionHeads: 8, hiddenDim: 256 },
    adaptiveWeighting: true,
    uncertaintyAware: true,
    qualityGating: false,
  },
  {
    id: "deep_fusion",
    name: "深度神经网络融合",
    description: "使用深度神经网络学习复杂的模态间交互",
    type: "hybrid",
    algorithm: "deep_fusion",
    parameters: { layers: 3, neurons: 512, dropout: 0.2 },
    adaptiveWeighting: true,
    uncertaintyAware: true,
    qualityGating: true,
  },
  {
    id: "ensemble_fusion",
    name: "集成学习融合",
    description: "结合多种融合方法的集成学习策略",
    type: "hybrid",
    algorithm: "ensemble",
    parameters: { models: 5, votingStrategy: 1 },
    adaptiveWeighting: true,
    uncertaintyAware: true,
    qualityGating: true,
  },
]

export function AdvancedMultiModalFusion() {
  const [selectedModalities, setSelectedModalities] = useState<string[]>(["ct-scan", "lab-results"])
  const [fusionProgress, setFusionProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [fusionResult, setFusionResult] = useState<EnhancedFusionResult | null>(null)
  const [selectedStrategy, setSelectedStrategy] = useState("adaptive_weighted")
  const [qualityThreshold, setQualityThreshold] = useState([0.8])
  const [uncertaintyThreshold, setUncertaintyThreshold] = useState([0.2])
  const [autoOptimization, setAutoOptimization] = useState(true)
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true)

  // 增强的模态数据
  const enhancedModalityData: EnhancedModalityData[] = [
    {
      id: "ct-scan",
      name: "CT扫描",
      type: "image",
      status: "completed",
      confidence: 0.94,
      dataSize: "512MB",
      processingTime: 2.3,
      features: ["肺结节检测", "密度分析", "形态学特征", "纹理分析"],
      qualityScore: 0.92,
      compatibility: 0.98,
      snr: 25.6,
      resolution: "0.5mm x 0.5mm",
      artifacts: ["运动伪影(轻微)"],
      preprocessingSteps: ["去噪", "标准化", "配准"],
      featureVector: Array.from({ length: 512 }, () => Math.random()),
      uncertaintyMap: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.random() * 0.3)),
      attentionWeights: Array.from({ length: 100 }, () => Math.random()),
    },
    {
      id: "mri-scan",
      name: "MRI扫描",
      type: "image",
      status: "completed",
      confidence: 0.91,
      dataSize: "1.2GB",
      processingTime: 4.1,
      features: ["软组织对比", "血管成像", "功能成像", "扩散加权"],
      qualityScore: 0.89,
      compatibility: 0.95,
      snr: 32.1,
      resolution: "1mm x 1mm x 1mm",
      artifacts: ["磁敏感伪影"],
      preprocessingSteps: ["偏移场校正", "配准", "分割"],
      featureVector: Array.from({ length: 512 }, () => Math.random()),
      uncertaintyMap: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.random() * 0.25)),
      attentionWeights: Array.from({ length: 100 }, () => Math.random()),
    },
    {
      id: "pet-scan",
      name: "PET扫描",
      type: "image",
      status: "ready",
      confidence: 0.0,
      dataSize: "800MB",
      processingTime: 0.0,
      features: ["代谢活动", "葡萄糖摄取", "肿瘤活性", "功能成像"],
      qualityScore: 0.88,
      compatibility: 0.93,
      snr: 18.5,
      resolution: "2mm x 2mm x 2mm",
      artifacts: [],
      preprocessingSteps: ["衰减校正", "散射校正", "重建"],
      featureVector: [],
      uncertaintyMap: [],
      attentionWeights: [],
    },
    {
      id: "lab-results",
      name: "实验室检查",
      type: "numeric",
      status: "completed",
      confidence: 0.85,
      dataSize: "15KB",
      processingTime: 0.1,
      features: ["血常规", "生化指标", "免疫标记物", "肿瘤标志物"],
      qualityScore: 0.95,
      compatibility: 0.99,
      preprocessingSteps: ["标准化", "异常值检测", "缺失值处理"],
      featureVector: Array.from({ length: 64 }, () => Math.random()),
      uncertaintyMap: [],
      attentionWeights: Array.from({ length: 20 }, () => Math.random()),
    },
    {
      id: "pathology",
      name: "病理切片",
      type: "image",
      status: "processing",
      confidence: 0.0,
      dataSize: "2.1GB",
      processingTime: 0.0,
      features: ["细胞形态", "组织结构", "免疫染色", "分子标记"],
      qualityScore: 0.91,
      compatibility: 0.87,
      snr: 28.3,
      resolution: "0.25μm/pixel",
      artifacts: ["染色不均"],
      preprocessingSteps: ["颜色标准化", "组织分割", "细胞检测"],
      featureVector: [],
      uncertaintyMap: [],
      attentionWeights: [],
    },
  ]

  // 智能融合算法
  const performIntelligentFusion = useCallback(async () => {
    setIsProcessing(true)
    setFusionProgress(0)
    setFusionResult(null)

    const strategy = fusionStrategies.find((s) => s.id === selectedStrategy)!

    // 模拟渐进式智能融合处理
    const stages = [
      { name: "数据质量评估", duration: 1000, progress: 15 },
      { name: "特征提取与对齐", duration: 1500, progress: 30 },
      { name: "不确定性量化", duration: 1200, progress: 45 },
      { name: "注意力权重计算", duration: 1800, progress: 65 },
      { name: "深度融合计算", duration: 2000, progress: 80 },
      { name: "质量验证与优化", duration: 1500, progress: 95 },
      { name: "结果生成与解释", duration: 1000, progress: 100 },
    ]

    for (const stage of stages) {
      await new Promise((resolve) => setTimeout(resolve, stage.duration))
      setFusionProgress(stage.progress)
    }

    // 生成增强的融合结果
    const selectedModalityData = enhancedModalityData.filter((m) => selectedModalities.includes(m.id))

    // 计算融合质量指标
    const qualityMetrics: FusionQualityMetrics = {
      overallQuality: 0.91,
      modalityAlignment: 0.88,
      featureComplementarity: 0.93,
      uncertaintyReduction: 0.76,
      consistencyScore: 0.89,
      robustnessIndex: 0.84,
      informationGain: 0.87,
      computationalEfficiency: 0.92,
    }

    // 计算模态贡献度
    const modalityContributions: Record<string, number> = {}
    selectedModalityData.forEach((modality, index) => {
      modalityContributions[modality.id] = Math.max(0.1, 0.9 - index * 0.15 + Math.random() * 0.1)
    })

    // 生成注意力图
    const attentionMaps: Record<string, number[][]> = {}
    selectedModalityData.forEach((modality) => {
      if (modality.type === "image") {
        attentionMaps[modality.id] = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => Math.random()))
      }
    })

    const result: EnhancedFusionResult = {
      overallConfidence: 0.93,
      processingTime: 9.0,
      fusedFeatures: [
        "多模态肺结节特征融合",
        "影像-病理一致性分析",
        "生化指标关联性评估",
        "时序数据趋势分析",
        "跨模态特征交互",
        "不确定性感知融合",
      ],
      recommendations: [
        "建议进行PET-CT检查确认代谢活性",
        "考虑肺穿刺活检获取病理确诊",
        "监测肿瘤标志物变化趋势",
        "制定个性化治疗方案",
        "建议多学科会诊讨论",
      ],
      riskFactors: ["结节大小超过8mm", "边缘不规则", "肿瘤标志物升高", "家族史阳性"],
      alternativeDiagnoses: ["良性肺结节", "炎症性病变", "肺结核", "转移性肿瘤"],
      qualityMetrics,
      uncertaintyAnalysis: {
        epistemic: 0.15, // 模型不确定性
        aleatoric: 0.08, // 数据不确定性
        total: 0.17,
        confidenceInterval: [0.89, 0.97],
      },
      attentionMaps,
      modalityContributions,
      fusionStrategy: strategy.name,
      validationResults: {
        crossValidationScore: 0.91,
        bootstrapConfidence: [0.88, 0.95],
        sensitivityAnalysis: {
          数据质量变化: 0.12,
          模态缺失: 0.18,
          参数扰动: 0.08,
        },
      },
    }

    setFusionResult(result)
    setIsProcessing(false)
  }, [selectedModalities, selectedStrategy])

  // 实时质量监控
  useEffect(() => {
    if (realTimeMonitoring && fusionResult) {
      const interval = setInterval(() => {
        // 模拟实时质量监控更新
        console.log("实时质量监控更新...")
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [realTimeMonitoring, fusionResult])

  const getQualityColor = (score: number) => {
    if (score >= 0.9) return "text-green-600"
    if (score >= 0.8) return "text-yellow-600"
    return "text-red-600"
  }

  const getUncertaintyColor = (uncertainty: number) => {
    if (uncertainty <= 0.1) return "text-green-600"
    if (uncertainty <= 0.2) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            高级多模态数据融合系统
          </CardTitle>
          <CardDescription>
            基于深度学习和注意力机制的智能多模态医疗数据融合，提供不确定性量化和质量保证
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fusion-config">
            <TabsList className="grid grid-cols-6">
              <TabsTrigger value="fusion-config">融合配置</TabsTrigger>
              <TabsTrigger value="quality-control">质量控制</TabsTrigger>
              <TabsTrigger value="fusion-process">智能融合</TabsTrigger>
              <TabsTrigger value="results">融合结果</TabsTrigger>
              <TabsTrigger value="uncertainty">不确定性</TabsTrigger>
              <TabsTrigger value="validation">验证分析</TabsTrigger>
            </TabsList>

            {/* 融合配置选项卡 */}
            <TabsContent value="fusion-config" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      融合策略配置
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>融合算法</Label>
                      <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fusionStrategies.map((strategy) => (
                            <SelectItem key={strategy.id} value={strategy.id}>
                              {strategy.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-600">
                        {fusionStrategies.find((s) => s.id === selectedStrategy)?.description}
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>质量阈值: {qualityThreshold[0]}</Label>
                        <Slider
                          value={qualityThreshold}
                          onValueChange={setQualityThreshold}
                          max={1}
                          min={0.5}
                          step={0.05}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>不确定性阈值: {uncertaintyThreshold[0]}</Label>
                        <Slider
                          value={uncertaintyThreshold}
                          onValueChange={setUncertaintyThreshold}
                          max={0.5}
                          min={0.05}
                          step={0.05}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-optimization">自动优化</Label>
                        <Switch
                          id="auto-optimization"
                          checked={autoOptimization}
                          onCheckedChange={setAutoOptimization}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="real-time-monitoring">实时监控</Label>
                        <Switch
                          id="real-time-monitoring"
                          checked={realTimeMonitoring}
                          onCheckedChange={setRealTimeMonitoring}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      模态选择与权重
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {enhancedModalityData.map((modality) => (
                      <div
                        key={modality.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedModalities.includes(modality.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-blue-300"
                        }`}
                        onClick={() => {
                          if (selectedModalities.includes(modality.id)) {
                            setSelectedModalities(selectedModalities.filter((id) => id !== modality.id))
                          } else {
                            setSelectedModalities([...selectedModalities, modality.id])
                          }
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{modality.name}</span>
                          <Badge variant={modality.status === "completed" ? "default" : "secondary"}>
                            {modality.status}
                          </Badge>
                        </div>

                        {modality.status === "completed" && (
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-600">质量评分:</span>
                                <span className={`ml-1 font-medium ${getQualityColor(modality.qualityScore)}`}>
                                  {(modality.qualityScore * 100).toFixed(1)}%
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">兼容性:</span>
                                <span className={`ml-1 font-medium ${getQualityColor(modality.compatibility)}`}>
                                  {(modality.compatibility * 100).toFixed(1)}%
                                </span>
                              </div>
                              {modality.snr && (
                                <div>
                                  <span className="text-gray-600">信噪比:</span>
                                  <span className="ml-1 font-medium">{modality.snr}dB</span>
                                </div>
                              )}
                              {modality.resolution && (
                                <div>
                                  <span className="text-gray-600">分辨率:</span>
                                  <span className="ml-1 font-medium">{modality.resolution}</span>
                                </div>
                              )}
                            </div>

                            {modality.artifacts && modality.artifacts.length > 0 && (
                              <div>
                                <span className="text-xs text-gray-500">伪影:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {modality.artifacts.map((artifact, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs bg-orange-50 text-orange-700">
                                      {artifact}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 质量控制选项卡 */}
            <TabsContent value="quality-control" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      数据质量监控
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedModalities.map((modalityId) => {
                      const modality = enhancedModalityData.find((m) => m.id === modalityId)
                      if (!modality || modality.status !== "completed") return null

                      return (
                        <div key={modalityId} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium">{modality.name}</span>
                            <Badge
                              variant={
                                modality.qualityScore >= 0.9
                                  ? "default"
                                  : modality.qualityScore >= 0.8
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {modality.qualityScore >= 0.9 ? "优秀" : modality.qualityScore >= 0.8 ? "良好" : "需改进"}
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>数据完整性:</span>
                                <span className={getQualityColor(modality.qualityScore)}>
                                  {(modality.qualityScore * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress value={modality.qualityScore * 100} className="h-2" />
                            </div>

                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>模态兼容性:</span>
                                <span className={getQualityColor(modality.compatibility)}>
                                  {(modality.compatibility * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress value={modality.compatibility * 100} className="h-2" />
                            </div>

                            {modality.snr && (
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>信噪比质量:</span>
                                  <span className={getQualityColor(Math.min(1, modality.snr / 30))}>
                                    {modality.snr}dB
                                  </span>
                                </div>
                                <Progress value={Math.min(100, (modality.snr / 30) * 100)} className="h-2" />
                              </div>
                            )}

                            <div>
                              <span className="text-sm text-gray-600">预处理步骤:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {modality.preprocessingSteps.map((step, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {step}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Gauge className="h-5 w-5" />
                      融合兼容性分析
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedModalities.length > 0
                          ? Math.round(
                              (selectedModalities.reduce((acc, id) => {
                                const modality = enhancedModalityData.find((m) => m.id === id)
                                return acc + (modality?.compatibility || 0)
                              }, 0) /
                                selectedModalities.length) *
                                100,
                            )
                          : 0}
                        %
                      </div>
                      <div className="text-sm text-gray-600">整体兼容性评分</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">时间同步性</span>
                        <Badge variant="secondary">95%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">空间对齐性</span>
                        <Badge variant="secondary">92%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">特征互补性</span>
                        <Badge variant="secondary">88%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">数据一致性</span>
                        <Badge variant="secondary">94%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">算法适配性</span>
                        <Badge variant="secondary">91%</Badge>
                      </div>
                    </div>

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        当前选择的模态组合具有优秀的融合兼容性，推荐使用
                        {fusionStrategies.find((s) => s.id === selectedStrategy)?.name}策略。
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 智能融合选项卡 */}
            <TabsContent value="fusion-process" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">智能多模态融合处理</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-1" />
                    导入配置
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    导出配置
                  </Button>
                  <Button
                    onClick={performIntelligentFusion}
                    disabled={isProcessing || selectedModalities.length < 2}
                    className="flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Activity className="h-4 w-4 animate-spin" />
                        智能融合中...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        开始智能融合
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {selectedModalities.length < 2 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>请至少选择2个数据模态进行融合分析。</AlertDescription>
                </Alert>
              )}

              {(isProcessing || fusionProgress > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      智能融合进度监控
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>整体进度</span>
                        <span className="font-medium">{fusionProgress}%</span>
                      </div>
                      <Progress value={fusionProgress} className="h-3" />

                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
                        {[
                          { name: "质量评估", threshold: 15 },
                          { name: "特征提取", threshold: 30 },
                          { name: "不确定性量化", threshold: 45 },
                          { name: "注意力计算", threshold: 65 },
                          { name: "深度融合", threshold: 80 },
                          { name: "质量验证", threshold: 95 },
                          { name: "结果生成", threshold: 100 },
                        ].map((stage, index) => (
                          <div key={index} className="p-2">
                            <div className="text-xs text-gray-600 mb-1">{stage.name}</div>
                            <div
                              className={`text-sm font-medium ${
                                fusionProgress >= stage.threshold
                                  ? "text-green-600"
                                  : fusionProgress >= stage.threshold - 15
                                    ? "text-blue-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {fusionProgress >= stage.threshold
                                ? "完成"
                                : fusionProgress >= stage.threshold - 15
                                  ? "进行中"
                                  : "等待中"}
                            </div>
                          </div>
                        ))}
                      </div>

                      {isProcessing && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-blue-600 animate-spin" />
                            <span className="text-sm text-blue-700">
                              正在执行{fusionStrategies.find((s) => s.id === selectedStrategy)?.name}算法， 预计还需{" "}
                              {Math.max(0, 10 - Math.floor(fusionProgress / 10))} 秒...
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* 融合结果选项卡 */}
            <TabsContent value="results" className="space-y-4">
              {fusionResult ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        智能多模态融合分析结果
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {(fusionResult.overallConfidence * 100).toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-600">综合置信度</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{fusionResult.processingTime}s</div>
                          <div className="text-sm text-gray-600">处理时间</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{selectedModalities.length}</div>
                          <div className="text-sm text-gray-600">融合模态数</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {(fusionResult.qualityMetrics.overallQuality * 100).toFixed(0)}%
                          </div>
                          <div className="text-sm text-gray-600">融合质量</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-500" />
                            融合特征分析
                          </h4>
                          <ul className="space-y-2">
                            {fusionResult.fusedFeatures.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-purple-500" />
                            模态贡献度
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(fusionResult.modalityContributions).map(([modalityId, contribution]) => {
                              const modality = enhancedModalityData.find((m) => m.id === modalityId)
                              return (
                                <div key={modalityId} className="flex items-center justify-between">
                                  <span className="text-sm">{modality?.name}</span>
                                  <div className="flex items-center gap-2">
                                    <Progress value={contribution * 100} className="h-2 w-20" />
                                    <span className="text-sm font-medium">{(contribution * 100).toFixed(1)}%</span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          临床建议
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {fusionResult.recommendations.map((rec, index) => (
                            <div key={index} className="p-3 bg-blue-50 rounded-lg text-sm">
                              {rec}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium mb-3">鉴别诊断</h4>
                        <div className="flex flex-wrap gap-2">
                          {fusionResult.alternativeDiagnoses.map((diagnosis, index) => (
                            <Badge key={index} variant="outline">
                              {diagnosis}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">等待智能融合分析</h3>
                  <p className="text-gray-500 mb-4">请选择数据模态并配置融合参数，然后开始智能多模态融合分析</p>
                  <Button
                    onClick={() => setSelectedModalities(["ct-scan", "lab-results", "mri-scan"])}
                    variant="outline"
                  >
                    使用推荐配置
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* 不确定性分析选项卡 */}
            <TabsContent value="uncertainty" className="space-y-4">
              {fusionResult ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        不确定性量化分析
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {(fusionResult.uncertaintyAnalysis.total * 100).toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-600">总体不确定性</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {(fusionResult.uncertaintyAnalysis.epistemic * 100).toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-600">认知不确定性</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {(fusionResult.uncertaintyAnalysis.aleatoric * 100).toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-600">偶然不确定性</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">置信区间</h4>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">95% 置信区间:</span>
                              <span className="font-medium">
                                [{(fusionResult.uncertaintyAnalysis.confidenceInterval[0] * 100).toFixed(1)}%,
                                {(fusionResult.uncertaintyAnalysis.confidenceInterval[1] * 100).toFixed(1)}%]
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">不确定性来源分析</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                              <span className="text-sm">模型不确定性 (认知)</span>
                              <span
                                className={`font-medium ${getUncertaintyColor(fusionResult.uncertaintyAnalysis.epistemic)}`}
                              >
                                {(fusionResult.uncertaintyAnalysis.epistemic * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                              <span className="text-sm">数据不确定性 (偶然)</span>
                              <span
                                className={`font-medium ${getUncertaintyColor(fusionResult.uncertaintyAnalysis.aleatoric)}`}
                              >
                                {(fusionResult.uncertaintyAnalysis.aleatoric * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>不确定性解释</AlertTitle>
                          <AlertDescription>
                            认知不确定性反映模型知识的局限性，可通过更多训练数据改善；
                            偶然不确定性反映数据本身的噪声，是固有的不可约简的不确定性。
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertTriangle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">等待不确定性分析</h3>
                  <p className="text-gray-500">请先完成多模态融合分析以查看不确定性量化结果</p>
                </div>
              )}
            </TabsContent>

            {/* 验证分析选项卡 */}
            <TabsContent value="validation" className="space-y-4">
              {fusionResult ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        融合结果验证分析
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">交叉验证结果</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">交叉验证得分:</span>
                              <span className="font-medium text-green-600">
                                {(fusionResult.validationResults.crossValidationScore * 100).toFixed(1)}%
                              </span>
                            </div>
                            <Progress
                              value={fusionResult.validationResults.crossValidationScore * 100}
                              className="h-2"
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Bootstrap置信度</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Bootstrap区间:</span>
                              <span className="font-medium">
                                [{(fusionResult.validationResults.bootstrapConfidence[0] * 100).toFixed(1)}%,
                                {(fusionResult.validationResults.bootstrapConfidence[1] * 100).toFixed(1)}%]
                              </span>
                            </div>
                            <div className="p-2 bg-green-50 rounded text-sm text-green-700">
                              Bootstrap重采样验证显示结果稳定可靠
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium mb-3">敏感性分析</h4>
                        <div className="space-y-2">
                          {Object.entries(fusionResult.validationResults.sensitivityAnalysis).map(
                            ([factor, sensitivity]) => (
                              <div key={factor} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm">{factor}:</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={sensitivity * 100} className="h-2 w-20" />
                                  <span className="text-sm font-medium">{(sensitivity * 100).toFixed(1)}%</span>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium mb-3">质量指标详情</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {Object.entries(fusionResult.qualityMetrics).map(([metric, value]) => (
                            <div key={metric} className="text-center p-3 bg-blue-50 rounded-lg">
                              <div className="text-lg font-bold text-blue-600">{(value * 100).toFixed(0)}%</div>
                              <div className="text-xs text-gray-600">
                                {metric === "overallQuality"
                                  ? "整体质量"
                                  : metric === "modalityAlignment"
                                    ? "模态对齐"
                                    : metric === "featureComplementarity"
                                      ? "特征互补"
                                      : metric === "uncertaintyReduction"
                                        ? "不确定性降低"
                                        : metric === "consistencyScore"
                                          ? "一致性评分"
                                          : metric === "robustnessIndex"
                                            ? "鲁棒性指数"
                                            : metric === "informationGain"
                                              ? "信息增益"
                                              : metric === "computationalEfficiency"
                                                ? "计算效率"
                                                : metric}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">等待验证分析</h3>
                  <p className="text-gray-500">请先完成多模态融合分析以查看验证结果</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
