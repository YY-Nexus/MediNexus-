"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Upload,
  Brain,
  Zap,
  FileImage,
  Stethoscope,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Share,
  Eye,
  Microscope,
  Heart,
  Bone,
  Scan,
} from "lucide-react"

interface DiagnosisResult {
  id: string
  condition: string
  confidence: number
  severity: "low" | "medium" | "high" | "critical"
  description: string
  recommendations: string[]
  relatedConditions: string[]
  requiredTests: string[]
}

interface MedicalImage {
  id: string
  type: "xray" | "ct" | "mri" | "ultrasound" | "endoscopy"
  url: string
  uploadedAt: string
  processed: boolean
  findings?: string[]
}

export function EnhancedAIDiagnosis() {
  const [symptoms, setSymptoms] = useState("")
  const [patientAge, setPatientAge] = useState("")
  const [patientGender, setPatientGender] = useState("")
  const [medicalHistory, setMedicalHistory] = useState("")
  const [uploadedImages, setUploadedImages] = useState<MedicalImage[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisResult[]>([])
  const [selectedImageType, setSelectedImageType] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file, index) => {
        const imageUrl = URL.createObjectURL(file)
        const newImage: MedicalImage = {
          id: `img_${Date.now()}_${index}`,
          type: (selectedImageType as any) || "xray",
          url: imageUrl,
          uploadedAt: new Date().toISOString(),
          processed: false,
        }
        setUploadedImages((prev) => [...prev, newImage])

        // 模拟图像处理
        setTimeout(() => {
          setUploadedImages((prev) =>
            prev.map((img) =>
              img.id === newImage.id ? { ...img, processed: true, findings: ["疑似异常阴影", "需要进一步检查"] } : img,
            ),
          )
        }, 2000)
      })
    }
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // 模拟AI分析过程
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // 模拟分析结果
    setTimeout(() => {
      const mockResults: DiagnosisResult[] = [
        {
          id: "1",
          condition: "上呼吸道感染",
          confidence: 85,
          severity: "medium",
          description: "基于症状分析，患者可能患有上呼吸道感染。症状包括咳嗽、发热和咽痛。",
          recommendations: [
            "多休息，保持充足睡眠",
            "多饮水，保持喉咙湿润",
            "可服用对症药物缓解症状",
            "如症状持续或加重，请及时就医",
          ],
          relatedConditions: ["流感", "咽炎", "扁桃体炎"],
          requiredTests: ["血常规", "C反应蛋白", "咽拭子培养"],
        },
        {
          id: "2",
          condition: "过敏性鼻炎",
          confidence: 65,
          severity: "low",
          description: "患者症状也可能与过敏性鼻炎相关，特别是如果有季节性发作史。",
          recommendations: ["避免接触已知过敏原", "可使用抗组胺药物", "保持室内空气清洁", "考虑过敏原检测"],
          relatedConditions: ["哮喘", "湿疹", "食物过敏"],
          requiredTests: ["过敏原检测", "IgE检测"],
        },
      ]

      setDiagnosisResults(mockResults)
      setIsAnalyzing(false)
    }, 3000)
  }

  const getSeverityColor = (severity: DiagnosisResult["severity"]) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "high":
        return "text-orange-600 bg-orange-100"
      case "critical":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getImageTypeIcon = (type: MedicalImage["type"]) => {
    switch (type) {
      case "xray":
        return <Bone className="h-4 w-4" />
      case "ct":
        return <Scan className="h-4 w-4" />
      case "mri":
        return <Brain className="h-4 w-4" />
      case "ultrasound":
        return <Heart className="h-4 w-4" />
      case "endoscopy":
        return <Microscope className="h-4 w-4" />
      default:
        return <FileImage className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            AI智能诊断
          </h1>
          <p className="text-muted-foreground">基于人工智能的医疗诊断辅助系统</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            分享结果
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 输入区域 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 患者信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                患者信息
              </CardTitle>
              <CardDescription>请填写患者基本信息和症状描述</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">年龄</Label>
                  <Input
                    id="age"
                    placeholder="请输入年龄"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">性别</Label>
                  <Select value={patientGender} onValueChange={setPatientGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择性别" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">男</SelectItem>
                      <SelectItem value="female">女</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">症状描述</Label>
                <Textarea
                  id="symptoms"
                  placeholder="请详细描述患者的症状，包括发病时间、症状特点、严重程度等..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="history">既往病史</Label>
                <Textarea
                  id="history"
                  placeholder="请输入患者的既往病史、过敏史、用药史等..."
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* 医学影像上传 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileImage className="h-5 w-5" />
                医学影像
              </CardTitle>
              <CardDescription>上传X光、CT、MRI等医学影像进行AI分析</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Select value={selectedImageType} onValueChange={setSelectedImageType}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="选择影像类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xray">X光片</SelectItem>
                    <SelectItem value="ct">CT扫描</SelectItem>
                    <SelectItem value="mri">MRI</SelectItem>
                    <SelectItem value="ultrasound">超声</SelectItem>
                    <SelectItem value="endoscopy">内镜</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={!selectedImageType}>
                  <Upload className="mr-2 h-4 w-4" />
                  上传影像
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* 已上传的影像 */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getImageTypeIcon(image.type)}
                          <span className="text-sm font-medium capitalize">{image.type}</span>
                        </div>
                        <Badge variant={image.processed ? "default" : "secondary"}>
                          {image.processed ? "已处理" : "处理中"}
                        </Badge>
                      </div>

                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={`Medical ${image.type}`}
                        className="w-full h-24 object-cover rounded"
                      />

                      {image.findings && (
                        <div className="space-y-1">
                          <p className="text-xs font-medium">AI发现:</p>
                          {image.findings.map((finding, index) => (
                            <p key={index} className="text-xs text-muted-foreground">
                              • {finding}
                            </p>
                          ))}
                        </div>
                      )}

                      <Button variant="ghost" size="sm" className="w-full">
                        <Eye className="mr-2 h-3 w-3" />
                        查看详情
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 分析按钮 */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                {isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="h-5 w-5 text-blue-600 animate-pulse" />
                      <span className="text-lg font-medium">AI正在分析中...</span>
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground">正在处理症状描述和医学影像，请稍候...</p>
                  </div>
                ) : (
                  <Button size="lg" onClick={handleAnalyze} disabled={!symptoms.trim()} className="w-full max-w-md">
                    <Brain className="mr-2 h-5 w-5" />
                    开始AI诊断分析
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 结果区域 */}
        <div className="space-y-6">
          {/* 诊断结果 */}
          {diagnosisResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  诊断结果
                </CardTitle>
                <CardDescription>AI分析得出的可能诊断</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {diagnosisResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{result.condition}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getSeverityColor(result.severity)}>
                            {result.severity === "low" && "轻度"}
                            {result.severity === "medium" && "中度"}
                            {result.severity === "high" && "重度"}
                            {result.severity === "critical" && "危重"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">置信度: {result.confidence}%</span>
                        </div>
                      </div>
                      <Progress value={result.confidence} className="w-16" />
                    </div>

                    <p className="text-sm text-muted-foreground">{result.description}</p>

                    <Tabs defaultValue="recommendations" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="recommendations">建议</TabsTrigger>
                        <TabsTrigger value="related">相关</TabsTrigger>
                        <TabsTrigger value="tests">检查</TabsTrigger>
                      </TabsList>

                      <TabsContent value="recommendations" className="mt-3">
                        <div className="space-y-2">
                          {result.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="related" className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {result.relatedConditions.map((condition, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="tests" className="mt-3">
                        <div className="space-y-2">
                          {result.requiredTests.map((test, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <Microscope className="h-3 w-3 text-blue-600" />
                              <span>{test}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* 重要提醒 */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>重要提醒</AlertTitle>
            <AlertDescription className="text-sm">
              AI诊断结果仅供参考，不能替代专业医生的诊断。请务必咨询专业医生进行确诊和治疗。
            </AlertDescription>
          </Alert>

          {/* 快速操作 */}
          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                预约专科医生
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileImage className="mr-2 h-4 w-4" />
                申请进一步检查
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Heart className="mr-2 h-4 w-4" />
                查看治疗方案
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share className="mr-2 h-4 w-4" />
                分享给医生
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
