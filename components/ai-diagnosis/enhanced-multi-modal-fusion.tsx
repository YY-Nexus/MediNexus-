"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Brain,
  Layers,
  Zap,
  Activity,
  Eye,
  FileImage,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Upload,
  Download,
  RefreshCw,
  Clock,
  Target,
} from "lucide-react"

interface ModalityData {
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
}

interface FusionResult {
  overallConfidence: number
  processingTime: number
  fusedFeatures: string[]
  recommendations: string[]
  riskFactors: string[]
  alternativeDiagnoses: string[]
}

export function EnhancedMultiModalFusion() {
  const [selectedModalities, setSelectedModalities] = useState<string[]>(["ct-scan", "lab-results"])
  const [fusionProgress, setFusionProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [fusionResult, setFusionResult] = useState<FusionResult | null>(null)
  const [optimizationLevel, setOptimizationLevel] = useState("balanced")
  const [autoSync, setAutoSync] = useState(true)

  // 增强的模态数据
  const modalityData: ModalityData[] = [
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
    },
    {
      id: "ecg-signal",
      name: "心电图",
      type: "signal",
      status: "completed",
      confidence: 0.88,
      dataSize: "2.5MB",
      processingTime: 0.8,
      features: ["心律分析", "ST段变化", "QRS波形", "心率变异性"],
      qualityScore: 0.85,
      compatibility: 0.9,
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
    },
  ]

  // 模拟融合处理
  const startFusion = async () => {
    setIsProcessing(true)
    setFusionProgress(0)
    setFusionResult(null)

    // 模拟渐进式处理
    const stages = [
      { name: "数据预处理", duration: 1000, progress: 20 },
      { name: "特征提取", duration: 1500, progress: 40 },
      { name: "模态对齐", duration: 2000, progress: 60 },
      { name: "融合计算", duration: 1500, progress: 80 },
      { name: "结果生成", duration: 1000, progress: 100 },
    ]

    for (const stage of stages) {
      await new Promise((resolve) => setTimeout(resolve, stage.duration))
      setFusionProgress(stage.progress)
    }

    // 生成融合结果
    const result: FusionResult = {
      overallConfidence: 0.93,
      processingTime: 7.0,
      fusedFeatures: ["多模态肺结节特征融合", "影像-病理一致性分析", "生化指标关联性评估", "时序数据趋势分析"],
      recommendations: [
        "建议进行PET-CT检查确认代谢活性",
        "考虑肺穿刺活检获取病理确诊",
        "监测肿瘤标志物变化趋势",
        "制定个性化治疗方案",
      ],
      riskFactors: ["结节大小超过8mm", "边缘不规则", "肿瘤标志物升高", "家族史阳性"],
      alternativeDiagnoses: ["良性肺结节", "炎症性病变", "肺结核", "转移性肿瘤"],
    }

    setFusionResult(result)
    setIsProcessing(false)
  }

  // 自动同步功能
  useEffect(() => {
    if (autoSync) {
      const interval = setInterval(() => {
        // 模拟数据同步
        console.log("自动同步多模态数据...")
      }, 30000) // 每30秒同步一次

      return () => clearInterval(interval)
    }
  }, [autoSync])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing":
        return <Activity className="h-4 w-4 text-blue-500 animate-spin" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getModalityIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage className="h-5 w-5 text-blue-500" />
      case "signal":
        return <Activity className="h-5 w-5 text-green-500" />
      case "text":
        return <Eye className="h-5 w-5 text-purple-500" />
      case "numeric":
        return <BarChart3 className="h-5 w-5 text-orange-500" />
      default:
        return <Layers className="h-5 w-5 text-gray-500" />
    }
  }

  const getQualityColor = (score: number) => {
    if (score >= 0.9) return "text-green-600"
    if (score >= 0.8) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            增强型多模态数据融合系统
          </CardTitle>
          <CardDescription>智能整合多种医疗数据模态，提供更准确、更全面的诊断分析</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="data-overview">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="data-overview">数据概览</TabsTrigger>
              <TabsTrigger value="fusion-config">融合配置</TabsTrigger>
              <TabsTrigger value="quality-control">质量控制</TabsTrigger>
              <TabsTrigger value="fusion-process">融合处理</TabsTrigger>
              <TabsTrigger value="results">融合结果</TabsTrigger>
            </TabsList>

            <TabsContent value="data-overview" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">可用数据模态</h3>
                <div className="flex items-center gap-2">
                  <Switch id="auto-sync" checked={autoSync} onCheckedChange={setAutoSync} />
                  <Label htmlFor="auto-sync" className="text-sm">
                    自动同步
                  </Label>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    刷新
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modalityData.map((modality) => (
                  <Card
                    key={modality.id}
                    className={`border-l-4 cursor-pointer transition-all ${
                      selectedModalities.includes(modality.id)
                        ? "border-l-blue-500 bg-blue-50"
                        : "border-l-gray-300 hover:border-l-blue-300"
                    }`}
                    onClick={() => {
                      if (selectedModalities.includes(modality.id)) {
                        setSelectedModalities(selectedModalities.filter((id) => id !== modality.id))
                      } else {
                        setSelectedModalities([...selectedModalities, modality.id])
                      }
                    }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getModalityIcon(modality.type)}
                          <h3 className="font-medium">{modality.name}</h3>
                        </div>
                        {getStatusIcon(modality.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">数据大小:</span>
                          <div className="font-medium">{modality.dataSize}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">处理时间:</span>
                          <div className="font-medium">{modality.processingTime}s</div>
                        </div>
                      </div>

                      {modality.status === "completed" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">置信度:</span>
                            <Badge variant="secondary">{(modality.confidence * 100).toFixed(1)}%</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">质量评分:</span>
                            <span className={`font-medium ${getQualityColor(modality.qualityScore)}`}>
                              {(modality.qualityScore * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">兼容性:</span>
                            <span className={`font-medium ${getQualityColor(modality.compatibility)}`}>
                              {(modality.compatibility * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-1">
                        <span className="text-sm text-gray-600">特征提取:</span>
                        <div className="flex flex-wrap gap-1">
                          {modality.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {modality.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{modality.features.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedModalities.length > 0 && (
                <Alert>
                  <Target className="h-4 w-4" />
                  <AlertDescription>
                    已选择 {selectedModalities.length} 个数据模态进行融合分析。
                    建议选择至少2个不同类型的模态以获得最佳融合效果。
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="fusion-config" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">融合算法配置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>优化策略</Label>
                      <Select value={optimizationLevel} onValueChange={setOptimizationLevel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="speed">速度优先</SelectItem>
                          <SelectItem value="balanced">平衡模式</SelectItem>
                          <SelectItem value="accuracy">准确率优先</SelectItem>
                          <SelectItem value="comprehensive">全面分析</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="early-fusion">早期融合</Label>
                        <Switch id="early-fusion" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="late-fusion">后期融合</Label>
                        <Switch id="late-fusion" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="attention-mechanism">注意力机制</Label>
                        <Switch id="attention-mechanism" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="cross-modal-learning">跨模态学习</Label>
                        <Switch id="cross-modal-learning" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="uncertainty-estimation">不确定性估计</Label>
                        <Switch id="uncertainty-estimation" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">权重分配策略</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {selectedModalities.map((modalityId) => {
                        const modality = modalityData.find((m) => m.id === modalityId)
                        if (!modality) return null

                        return (
                          <div key={modalityId} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{modality.name}</span>
                              <span className="text-sm text-gray-600">
                                {Math.round((modality.confidence * 100) / selectedModalities.length)}%
                              </span>
                            </div>
                            <Progress value={(modality.confidence * 100) / selectedModalities.length} className="h-2" />
                          </div>
                        )
                      })}
                    </div>

                    <div className="space-y-2">
                      <Label>权重计算方法</Label>
                      <Select defaultValue="adaptive">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equal">等权重分配</SelectItem>
                          <SelectItem value="adaptive">自适应权重</SelectItem>
                          <SelectItem value="confidence-based">基于置信度</SelectItem>
                          <SelectItem value="quality-based">基于质量评分</SelectItem>
                          <SelectItem value="custom">自定义权重</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="quality-control" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">数据质量监控</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedModalities.map((modalityId) => {
                      const modality = modalityData.find((m) => m.id === modalityId)
                      if (!modality) return null

                      return (
                        <div key={modalityId} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
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
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>数据完整性:</span>
                              <span className={getQualityColor(modality.qualityScore)}>
                                {(modality.qualityScore * 100).toFixed(1)}%
                              </span>
                            </div>
                            <Progress value={modality.qualityScore * 100} className="h-2" />
                            <div className="flex justify-between text-sm">
                              <span>模态兼容性:</span>
                              <span className={getQualityColor(modality.compatibility)}>
                                {(modality.compatibility * 100).toFixed(1)}%
                              </span>
                            </div>
                            <Progress value={modality.compatibility * 100} className="h-2" />
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">融合兼容性分析</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedModalities.length > 0
                          ? Math.round(
                              (selectedModalities.reduce((acc, id) => {
                                const modality = modalityData.find((m) => m.id === id)
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
                    </div>

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        当前选择的模态组合具有良好的融合兼容性，建议继续进行融合分析。
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="fusion-process" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">多模态融合处理</h3>
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
                    onClick={startFusion}
                    disabled={isProcessing || selectedModalities.length < 2}
                    className="flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Activity className="h-4 w-4 animate-spin" />
                        融合中...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        开始融合
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
                    <CardTitle className="text-lg">融合进度监控</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>整体进度</span>
                        <span className="font-medium">{fusionProgress}%</span>
                      </div>
                      <Progress value={fusionProgress} className="h-3" />

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        {[
                          { name: "数据预处理", threshold: 20 },
                          { name: "特征提取", threshold: 40 },
                          { name: "模态对齐", threshold: 60 },
                          { name: "融合计算", threshold: 80 },
                          { name: "结果生成", threshold: 100 },
                        ].map((stage, index) => (
                          <div key={index}>
                            <div className="text-sm text-gray-600">{stage.name}</div>
                            <div
                              className={`font-medium ${
                                fusionProgress >= stage.threshold
                                  ? "text-green-600"
                                  : fusionProgress >= stage.threshold - 20
                                    ? "text-blue-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {fusionProgress >= stage.threshold
                                ? "完成"
                                : fusionProgress >= stage.threshold - 20
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
                              正在执行深度学习融合算法，预计还需 {Math.max(0, 8 - Math.floor(fusionProgress / 12.5))}{" "}
                              秒...
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {fusionResult ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        多模态融合分析结果
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            风险因素识别
                          </h4>
                          <ul className="space-y-2">
                            {fusionResult.riskFactors.map((risk, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <AlertTriangle className="h-3 w-3 text-orange-500" />
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium mb-3">临床建议</h4>
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

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFusionResult(null)
                        setFusionProgress(0)
                      }}
                    >
                      重新分析
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        导出报告
                      </Button>
                      <Button>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        确认结果
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">等待融合分析</h3>
                  <p className="text-gray-500 mb-4">请选择数据模态并配置融合参数，然后开始多模态融合分析</p>
                  <Button
                    onClick={() => setSelectedModalities(["ct-scan", "lab-results", "ecg-signal"])}
                    variant="outline"
                  >
                    使用推荐配置
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
