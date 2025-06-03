"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Users, FileText, Pill, Target, MessageSquare } from "lucide-react"
import { RealTimeDecisionEngine } from "@/components/clinical-decision/real-time-decision-engine"

// 简化的临床决策仪表板组件
function SimpleClinicalDecisionDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">今日诊断</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">127</div>
          <p className="text-xs text-muted-foreground">+12% 较昨日</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">活跃患者</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">+5% 较上周</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">临床指南</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89</div>
          <p className="text-xs text-muted-foreground">已更新</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">药物交互</CardTitle>
          <Pill className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">23</div>
          <p className="text-xs text-muted-foreground">需要关注</p>
        </CardContent>
      </Card>
    </div>
  )
}

// 简化的个性化治疗推荐组件
function SimplePersonalizedTreatmentRecommendations({
  patientId,
  diagnosis,
  onRecommendationSelect,
}: {
  patientId: string
  diagnosis: string
  onRecommendationSelect: (recommendation: any) => void
}) {
  const recommendations = [
    {
      id: 1,
      title: "一线治疗方案",
      description: "基于患者病史和当前症状的标准治疗方案",
      confidence: 95,
      medications: ["二甲双胍", "格列美脲"],
      priority: "高",
    },
    {
      id: 2,
      title: "个性化方案",
      description: "考虑患者基因型和药物敏感性的定制方案",
      confidence: 88,
      medications: ["利拉鲁肽", "恩格列净"],
      priority: "中",
    },
    {
      id: 3,
      title: "联合治疗",
      description: "多药物联合治疗方案，适用于复杂病例",
      confidence: 82,
      medications: ["胰岛素", "阿卡波糖", "瑞格列奈"],
      priority: "中",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">个性化治疗推荐</h3>
        <Badge variant="outline">患者ID: {patientId}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            诊断: {diagnosis}
          </CardTitle>
          <CardDescription>基于AI分析的个性化治疗方案推荐</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{rec.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={rec.priority === "高" ? "destructive" : "secondary"}>{rec.priority}优先级</Badge>
                  <Badge variant="outline">{rec.confidence}% 置信度</Badge>
                </div>
              </div>
              <CardDescription>{rec.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">推荐药物: </span>
                  <span className="text-sm text-muted-foreground">{rec.medications.join(", ")}</span>
                </div>
                <Button size="sm" onClick={() => onRecommendationSelect(rec)} className="w-full">
                  选择此方案
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// 简化的多学科会诊平台组件
function SimpleMultidisciplinaryConsultationPlatform({
  patientId,
  caseId,
}: {
  patientId: string
  caseId: string
}) {
  const consultations = [
    {
      id: 1,
      specialty: "内分泌科",
      doctor: "张医生",
      status: "进行中",
      time: "14:30",
      opinion: "建议调整胰岛素剂量",
    },
    {
      id: 2,
      specialty: "心血管科",
      doctor: "李医生",
      status: "已完成",
      time: "13:45",
      opinion: "心电图正常，可继续当前治疗",
    },
    {
      id: 3,
      specialty: "肾内科",
      doctor: "王医生",
      status: "待开始",
      time: "15:00",
      opinion: "等待会诊",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">多学科会诊平台</h3>
        <div className="flex gap-2">
          <Badge variant="outline">病例ID: {caseId}</Badge>
          <Badge variant="outline">患者ID: {patientId}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            会诊进度
          </CardTitle>
          <CardDescription>多学科专家团队协作诊疗</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {consultations.map((consultation) => (
          <Card key={consultation.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{consultation.specialty}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      consultation.status === "进行中"
                        ? "default"
                        : consultation.status === "已完成"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {consultation.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{consultation.time}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">主治医生: </span>
                  <span className="text-sm text-muted-foreground">{consultation.doctor}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">会诊意见: </span>
                  <span className="text-sm text-muted-foreground">{consultation.opinion}</span>
                </div>
                {consultation.status === "待开始" && (
                  <Button size="sm" className="w-full">
                    开始会诊
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function ClinicalDecisionPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-5">临床决策支持系统</h1>

      <SimpleClinicalDecisionDashboard />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="guidelines">临床指南</TabsTrigger>
          <TabsTrigger value="pathways">临床路径</TabsTrigger>
          <TabsTrigger value="drugs">药物参考</TabsTrigger>
          <TabsTrigger value="personalized">个性化推荐</TabsTrigger>
          <TabsTrigger value="consultation">多学科会诊</TabsTrigger>
          <TabsTrigger value="realtime">实时决策</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>系统概览</CardTitle>
              <CardDescription>临床决策支持系统的整体状态和关键指标</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">这里显示系统的整体运行状态、关键性能指标和重要通知。</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>临床指南</CardTitle>
              <CardDescription>最新的临床诊疗指南和标准</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">这里显示最新的临床指南、诊疗标准和循证医学证据。</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pathways" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>临床路径</CardTitle>
              <CardDescription>标准化的诊疗流程和路径</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">这里显示标准化的临床路径、诊疗流程和质量控制标准。</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drugs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>药物参考</CardTitle>
              <CardDescription>药物信息、相互作用和用药指导</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">这里显示药物信息数据库、药物相互作用检查和个性化用药指导。</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personalized" className="mt-6">
          <SimplePersonalizedTreatmentRecommendations
            patientId="patient-001"
            diagnosis="2型糖尿病"
            onRecommendationSelect={(recommendation) => {
              console.log("选择的治疗方案:", recommendation)
            }}
          />
        </TabsContent>

        <TabsContent value="consultation" className="mt-6">
          <SimpleMultidisciplinaryConsultationPlatform patientId="patient-001" caseId="case-001" />
        </TabsContent>
        <TabsContent value="realtime" className="mt-6">
          <RealTimeDecisionEngine
            patientId="patient-001"
            isActive={true}
            onRecommendationGenerated={(recommendation) => {
              console.log("生成新建议:", recommendation)
              // 可以在这里添加通知逻辑
            }}
            onAlertTriggered={(alert) => {
              console.log("触发警报:", alert)
              // 可以在这里添加警报处理逻辑
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
