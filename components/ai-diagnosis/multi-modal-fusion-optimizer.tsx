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
import {
  Brain,
  Layers,
  Zap,
  Settings,
  TrendingUp,
  Activity,
  Eye,
  FileImage,
  BarChart3,
  CheckCircle,
  AlertTriangle,
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
}

interface FusionModel {
  id: string
  name: string
  architecture: string
  accuracy: number
  latency: number
  memoryUsage: string
  supportedModalities: string[]
  isActive: boolean
}

export function MultiModalFusionOptimizer() {
  const [selectedModel, setSelectedModel] = useState("advanced-fusion-v3")
  const [fusionProgress, setFusionProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [optimizationLevel, setOptimizationLevel] = useState("balanced")

  // 模拟多模态数据
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
    },
    {
      id: "clinical-notes",
      name: "临床记录",
      type: "text",
      status: "processing",
      confidence: 0.0,
      dataSize: "45KB",
      processingTime: 0.0,
      features: ["症状描述", "病史信息", "体格检查", "医生观察"],
    },
  ]

  // 融合模型配置
  const fusionModels: FusionModel[] = [
    {
      id: "advanced-fusion-v3",
      name: "高级融合模型 v3.0",
      architecture: "Transformer + CNN",
      accuracy: 0.96,
      latency: 1.2,
      memoryUsage: "8GB",
      supportedModalities: ["image", "signal", "text", "numeric"],
      isActive: true,
    },
    {
      id: "lightweight-fusion",
      name: "轻量级融合模型",
      architecture: "MobileNet + LSTM",
      accuracy: 0.89,
      latency: 0.3,
      memoryUsage: "2GB",
      supportedModalities: ["image", "signal", "numeric"],
      isActive: false,
    },
    {
      id: "specialized-cardiac",
      name: "心脏专科融合模型",
      architecture: "ResNet + Attention",
      accuracy: 0.94,
      latency: 0.8,
      memoryUsage: "4GB",
      supportedModalities: ["image", "signal", "numeric"],
      isActive: false,
    },
  ]

  // 模拟融合处理
  const startFusion = () => {
    setIsProcessing(true)
    setFusionProgress(0)

    const interval = setInterval(() => {
      setFusionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing":
        return <Activity className="h-4 w-4 text-blue-500 animate-spin" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            多模态数据融合深度优化
          </CardTitle>
          <CardDescription>智能整合多种医疗数据模态，提供更准确的诊断结果</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="data-overview">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="data-overview">数据概览</TabsTrigger>
              <TabsTrigger value="fusion-config">融合配置</TabsTrigger>
              <TabsTrigger value="optimization">优化设置</TabsTrigger>
              <TabsTrigger value="results">融合结果</TabsTrigger>
            </TabsList>

            <TabsContent value="data-overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modalityData.map((modality) => (
                  <Card key={modality.id} className="border-l-4 border-l-blue-500">
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
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">数据大小:</span>
                        <span className="font-medium">{modality.dataSize}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">处理时间:</span>
                        <span className="font-medium">{modality.processingTime}s</span>
                      </div>
                      {modality.status === "completed" && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">置信度:</span>
                          <Badge variant="secondary">{(modality.confidence * 100).toFixed(1)}%</Badge>
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
            </TabsContent>

            <TabsContent value="fusion-config" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">融合模型选择</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择融合模型" />
                      </SelectTrigger>
                      <SelectContent>
                        {fusionModels.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fusionModels
                      .filter((model) => model.id === selectedModel)
                      .map((model) => (
                        <div key={model.id} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">架构:</span>
                            <span className="text-sm font-medium">{model.architecture}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">准确率:</span>
                            <Badge variant="secondary">{(model.accuracy * 100).toFixed(1)}%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">延迟:</span>
                            <span className="text-sm font-medium">{model.latency}s</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">内存使用:</span>
                            <span className="text-sm font-medium">{model.memoryUsage}</span>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">融合策略配置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                    </div>

                    <div className="space-y-2">
                      <Label>权重分配策略</Label>
                      <Select defaultValue="adaptive">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equal">等权重</SelectItem>
                          <SelectItem value="adaptive">自适应权重</SelectItem>
                          <SelectItem value="confidence-based">基于置信度</SelectItem>
                          <SelectItem value="custom">自定义权重</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="optimization" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      性能优化设置
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>优化级别</Label>
                      <Select value={optimizationLevel} onValueChange={setOptimizationLevel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="speed">速度优先</SelectItem>
                          <SelectItem value="balanced">平衡模式</SelectItem>
                          <SelectItem value="accuracy">准确率优先</SelectItem>
                          <SelectItem value="memory">内存优化</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="gpu-acceleration">GPU加速</Label>
                        <Switch id="gpu-acceleration" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="model-quantization">模型量化</Label>
                        <Switch id="model-quantization" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dynamic-batching">动态批处理</Label>
                        <Switch id="dynamic-batching" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="cache-optimization">缓存优化</Label>
                        <Switch id="cache-optimization" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      实时性能监控
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">CPU使用率</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">GPU使用率</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">内存使用</span>
                        <span className="text-sm font-medium">6.2GB / 16GB</span>
                      </div>
                      <Progress value={38.75} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">1.2s</div>
                        <div className="text-xs text-gray-600">平均延迟</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">96.3%</div>
                        <div className="text-xs text-gray-600">融合准确率</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">融合处理控制</h3>
                <Button onClick={startFusion} disabled={isProcessing} className="flex items-center gap-2">
                  {isProcessing ? (
                    <>
                      <Activity className="h-4 w-4 animate-spin" />
                      处理中...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      开始融合
                    </>
                  )}
                </Button>
              </div>

              {(isProcessing || fusionProgress > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">融合进度</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>整体进度</span>
                        <span className="font-medium">{fusionProgress}%</span>
                      </div>
                      <Progress value={fusionProgress} className="h-3" />

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-sm text-gray-600">特征提取</div>
                          <div className="font-medium text-green-600">完成</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">数据对齐</div>
                          <div className="font-medium text-green-600">完成</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">模态融合</div>
                          <div className="font-medium text-blue-600">{fusionProgress >= 70 ? "完成" : "进行中"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">结果生成</div>
                          <div className="font-medium text-gray-600">{fusionProgress >= 100 ? "完成" : "等待中"}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {fusionProgress >= 100 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      融合结果
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">96.8%</div>
                        <div className="text-sm text-gray-600">综合置信度</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">1.1s</div>
                        <div className="text-sm text-gray-600">处理时间</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">5</div>
                        <div className="text-sm text-gray-600">融合模态数</div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">诊断建议</h4>
                      <p className="text-sm text-gray-700">
                        基于多模态数据融合分析，建议进一步进行PET-CT检查以确认诊断。
                        患者的影像学表现与实验室指标高度一致，支持当前诊断假设。
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
