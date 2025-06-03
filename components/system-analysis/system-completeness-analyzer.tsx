"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Brain,
  Users,
  Stethoscope,
  Pill,
  BarChart3,
  FileText,
  Shield,
  Smartphone,
  Video,
  Code,
  Settings,
  Activity,
} from "lucide-react"

interface ModuleStatus {
  name: string
  icon: any
  completeness: number
  completion: number
  sophistication: number
  subModules: {
    name: string
    status: "completed" | "partial" | "missing" | "in-progress"
    completeness: number
    description: string
  }[]
  overallScore: number
  priority: "high" | "medium" | "low"
  technicalDebt: number
}

const systemModules: ModuleStatus[] = [
  {
    name: "智能诊断",
    icon: Brain,
    completeness: 95,
    completion: 92,
    sophistication: 98,
    overallScore: 95,
    priority: "high",
    technicalDebt: 5,
    subModules: [
      { name: "诊断中心", status: "completed", completeness: 95, description: "AI诊断核心功能完整" },
      { name: "模型管理", status: "completed", completeness: 90, description: "模型版本管理完善" },
      { name: "诊断记录", status: "completed", completeness: 88, description: "历史记录管理完整" },
      { name: "模型训练", status: "completed", completeness: 92, description: "训练流程完善" },
      { name: "性能分析", status: "completed", completeness: 94, description: "性能监控完整" },
      { name: "模型部署", status: "completed", completeness: 96, description: "部署管理完善" },
      { name: "多模态融合", status: "completed", completeness: 98, description: "最新完善功能" },
      { name: "解释性增强", status: "completed", completeness: 97, description: "AI可解释性完善" },
      { name: "边缘计算", status: "completed", completeness: 95, description: "边缘部署支持完整" },
    ],
  },
  {
    name: "患者管理",
    icon: Users,
    completeness: 88,
    completion: 85,
    sophistication: 90,
    overallScore: 88,
    priority: "high",
    technicalDebt: 12,
    subModules: [
      { name: "患者列表", status: "completed", completeness: 92, description: "虚拟化列表，性能优化完善" },
      { name: "病历管理", status: "completed", completeness: 90, description: "电子病历管理完整" },
      { name: "随访计划", status: "completed", completeness: 85, description: "随访管理基本完整" },
      { name: "患者分组", status: "partial", completeness: 75, description: "分组功能需要完善" },
      { name: "患者画像", status: "completed", completeness: 88, description: "AI画像分析完整" },
      { name: "家属沟通", status: "completed", completeness: 82, description: "沟通管理基本完整" },
      { name: "满意度调查", status: "completed", completeness: 80, description: "调查系统基本完整" },
    ],
  },
  {
    name: "临床决策",
    icon: Stethoscope,
    completeness: 75,
    completion: 70,
    sophistication: 80,
    overallScore: 75,
    priority: "high",
    technicalDebt: 25,
    subModules: [
      { name: "决策支持", status: "partial", completeness: 70, description: "基础决策支持功能" },
      { name: "临床路径", status: "partial", completeness: 65, description: "路径管理需要完善" },
      { name: "诊断工具", status: "partial", completeness: 75, description: "工具集成基本完整" },
      { name: "临床指南", status: "partial", completeness: 70, description: "指南库需要扩充" },
      { name: "药物参考", status: "partial", completeness: 80, description: "药物信息基本完整" },
      { name: "个性化治疗", status: "completed", completeness: 85, description: "个性化推荐完善" },
      { name: "多学科会诊", status: "completed", completeness: 82, description: "会诊平台基本完整" },
    ],
  },
  {
    name: "药物管理",
    icon: Pill,
    completeness: 70,
    completion: 65,
    sophistication: 75,
    overallScore: 70,
    priority: "medium",
    technicalDebt: 30,
    subModules: [
      { name: "药品目录", status: "partial", completeness: 70, description: "基础药品目录" },
      { name: "药物相互作用", status: "completed", completeness: 85, description: "相互作用检查完善" },
      { name: "用药指导", status: "completed", completeness: 80, description: "智能用药指导" },
      { name: "处方管理", status: "missing", completeness: 30, description: "处方系统需要开发" },
      { name: "库存管理", status: "missing", completeness: 25, description: "库存系统需要开发" },
      { name: "药物监测", status: "partial", completeness: 60, description: "监测功能基础版本" },
    ],
  },
  {
    name: "健康数据",
    icon: BarChart3,
    completeness: 80,
    completion: 75,
    sophistication: 85,
    overallScore: 80,
    priority: "high",
    technicalDebt: 20,
    subModules: [
      { name: "数据概览", status: "partial", completeness: 75, description: "基础数据展示" },
      { name: "生命体征", status: "completed", completeness: 90, description: "生命体征监控完善" },
      { name: "趋势分析", status: "completed", completeness: 85, description: "数据趋势分析完整" },
      { name: "健康预警", status: "completed", completeness: 88, description: "智能预警系统完善" },
      { name: "可穿戴设备", status: "completed", completeness: 82, description: "设备集成基本完整" },
      { name: "数据导入", status: "partial", completeness: 70, description: "导入功能需要完善" },
    ],
  },
  {
    name: "医学研究",
    icon: FileText,
    completeness: 85,
    completion: 80,
    sophistication: 90,
    overallScore: 85,
    priority: "medium",
    technicalDebt: 15,
    subModules: [
      { name: "研究项目", status: "partial", completeness: 75, description: "项目管理基础功能" },
      { name: "临床试验", status: "completed", completeness: 88, description: "试验管理完善" },
      { name: "数据分析", status: "completed", completeness: 92, description: "高级分析工具完整" },
      { name: "协作平台", status: "completed", completeness: 85, description: "研究协作功能完善" },
      { name: "伦理审查", status: "completed", completeness: 80, description: "伦理流程管理完整" },
    ],
  },
  {
    name: "资质验证",
    icon: Shield,
    completeness: 90,
    completion: 88,
    sophistication: 85,
    overallScore: 88,
    priority: "high",
    technicalDebt: 10,
    subModules: [
      { name: "资质概览", status: "completed", completeness: 90, description: "概览功能完整" },
      { name: "资质上传", status: "completed", completeness: 92, description: "上传系统完善" },
      { name: "验证状态", status: "completed", completeness: 88, description: "状态管理完整" },
      { name: "资质管理", status: "completed", completeness: 85, description: "管理功能完善" },
      { name: "验证机构", status: "completed", completeness: 90, description: "机构管理完整" },
      { name: "统计分析", status: "completed", completeness: 95, description: "统计功能完善" },
      { name: "国际认证", status: "completed", completeness: 88, description: "国际认证支持" },
      { name: "到期提醒", status: "completed", completeness: 92, description: "智能提醒完善" },
    ],
  },
  {
    name: "数据安全",
    icon: Shield,
    completeness: 85,
    completion: 82,
    sophistication: 88,
    overallScore: 85,
    priority: "high",
    technicalDebt: 15,
    subModules: [
      { name: "安全概览", status: "partial", completeness: 80, description: "安全监控基础功能" },
      { name: "账户安全", status: "completed", completeness: 90, description: "账户安全管理完善" },
      { name: "数据加密", status: "completed", completeness: 92, description: "加密管理完善" },
      { name: "访问审计", status: "completed", completeness: 85, description: "审计日志完整" },
      { name: "威胁检测", status: "completed", completeness: 88, description: "威胁检测系统完善" },
      { name: "合规检查", status: "completed", completeness: 80, description: "合规管理基本完整" },
    ],
  },
  {
    name: "移动应用",
    icon: Smartphone,
    completeness: 75,
    completion: 70,
    sophistication: 80,
    overallScore: 75,
    priority: "medium",
    technicalDebt: 25,
    subModules: [
      { name: "应用概览", status: "partial", completeness: 70, description: "移动端基础功能" },
      { name: "原生开发", status: "completed", completeness: 85, description: "原生应用开发完善" },
      { name: "离线支持", status: "completed", completeness: 80, description: "离线功能基本完整" },
      { name: "推送通知", status: "completed", completeness: 88, description: "通知系统完善" },
      { name: "移动优化", status: "completed", completeness: 82, description: "移动端优化完整" },
    ],
  },
  {
    name: "电子病历",
    icon: FileText,
    completeness: 80,
    completion: 75,
    sophistication: 85,
    overallScore: 80,
    priority: "high",
    technicalDebt: 20,
    subModules: [
      { name: "集成概览", status: "partial", completeness: 75, description: "EHR集成基础功能" },
      { name: "多系统同步", status: "completed", completeness: 88, description: "系统同步完善" },
      { name: "标准化接口", status: "completed", completeness: 85, description: "接口标准化完整" },
      { name: "数据映射", status: "completed", completeness: 82, description: "数据映射工具完善" },
      { name: "实时同步", status: "completed", completeness: 90, description: "实时同步功能完整" },
    ],
  },
  {
    name: "远程会诊",
    icon: Video,
    completeness: 78,
    completion: 75,
    sophistication: 82,
    overallScore: 78,
    priority: "medium",
    technicalDebt: 22,
    subModules: [
      { name: "会诊中心", status: "partial", completeness: 75, description: "会诊平台基础功能" },
      { name: "高清视频", status: "completed", completeness: 88, description: "视频通话功能完善" },
      { name: "屏幕共享", status: "completed", completeness: 85, description: "屏幕共享完整" },
      { name: "会诊记录", status: "completed", completeness: 80, description: "记录管理基本完整" },
      { name: "多方会诊", status: "completed", completeness: 82, description: "多方协作功能完善" },
    ],
  },
  {
    name: "统计分析",
    icon: BarChart3,
    completeness: 85,
    completion: 80,
    sophistication: 90,
    overallScore: 85,
    priority: "medium",
    technicalDebt: 15,
    subModules: [
      { name: "数据概览", status: "completed", completeness: 85, description: "数据分析完整" },
      { name: "搜索分析", status: "partial", completeness: 75, description: "搜索统计基础功能" },
      { name: "预测分析", status: "completed", completeness: 92, description: "预测模型完善" },
      { name: "自定义报告", status: "completed", completeness: 88, description: "报告生成完整" },
      { name: "实时流", status: "completed", completeness: 90, description: "实时数据流完善" },
      { name: "机器学习", status: "completed", completeness: 95, description: "ML洞察完整" },
    ],
  },
  {
    name: "API文档",
    icon: Code,
    completeness: 88,
    completion: 85,
    sophistication: 85,
    overallScore: 86,
    priority: "medium",
    technicalDebt: 12,
    subModules: [
      { name: "API概览", status: "completed", completeness: 90, description: "API文档完整" },
      { name: "在线测试", status: "completed", completeness: 88, description: "测试工具完善" },
      { name: "使用示例", status: "completed", completeness: 85, description: "示例代码完整" },
      { name: "性能监控", status: "completed", completeness: 92, description: "监控功能完善" },
      { name: "更新日志", status: "completed", completeness: 80, description: "版本管理完整" },
    ],
  },
  {
    name: "系统管理",
    icon: Settings,
    completeness: 92,
    completion: 90,
    sophistication: 88,
    overallScore: 90,
    priority: "high",
    technicalDebt: 8,
    subModules: [
      { name: "管理概览", status: "completed", completeness: 95, description: "管理仪表板完善" },
      { name: "用户管理", status: "completed", completeness: 92, description: "用户管理完整" },
      { name: "角色权限", status: "completed", completeness: 90, description: "权限管理完善" },
      { name: "系统设置", status: "completed", completeness: 88, description: "设置管理完整" },
      { name: "系统日志", status: "completed", completeness: 95, description: "日志管理完善" },
      { name: "数据备份", status: "completed", completeness: 92, description: "备份系统完整" },
      { name: "通知管理", status: "completed", completeness: 90, description: "通知系统完善" },
      { name: "部署检查", status: "completed", completeness: 95, description: "部署验证完整" },
      { name: "API配置", status: "completed", completeness: 88, description: "API管理完善" },
      { name: "API使用", status: "completed", completeness: 90, description: "使用监控完整" },
      { name: "认证管理", status: "completed", completeness: 92, description: "认证系统完善" },
      { name: "自动化", status: "completed", completeness: 85, description: "自动化流程完整" },
      { name: "性能优化", status: "completed", completeness: 88, description: "性能优化完善" },
    ],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500"
    case "partial":
      return "bg-yellow-500"
    case "in-progress":
      return "bg-blue-500"
    case "missing":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4" />
    case "partial":
      return <AlertCircle className="h-4 w-4" />
    case "in-progress":
      return <Clock className="h-4 w-4" />
    case "missing":
      return <XCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600"
  if (score >= 80) return "text-blue-600"
  if (score >= 70) return "text-yellow-600"
  return "text-red-600"
}

export function SystemCompletenessAnalyzer() {
  const [selectedModule, setSelectedModule] = useState<ModuleStatus | null>(null)

  const overallStats = {
    totalModules: systemModules.length,
    completedModules: systemModules.filter((m) => m.overallScore >= 90).length,
    partialModules: systemModules.filter((m) => m.overallScore >= 70 && m.overallScore < 90).length,
    incompleteModules: systemModules.filter((m) => m.overallScore < 70).length,
    averageCompleteness: Math.round(systemModules.reduce((sum, m) => sum + m.completeness, 0) / systemModules.length),
    averageCompletion: Math.round(systemModules.reduce((sum, m) => sum + m.completion, 0) / systemModules.length),
    averageSophistication: Math.round(
      systemModules.reduce((sum, m) => sum + m.sophistication, 0) / systemModules.length,
    ),
    overallScore: Math.round(systemModules.reduce((sum, m) => sum + m.overallScore, 0) / systemModules.length),
    totalTechnicalDebt: systemModules.reduce((sum, m) => sum + m.technicalDebt, 0),
  }

  return (
    <div className="space-y-6">
      {/* 系统整体概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6" />
            医疗AI系统完整性分析报告
          </CardTitle>
          <CardDescription>全面分析系统各模块的完整度、完成度和完善度</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{overallStats.completedModules}</div>
              <div className="text-sm text-muted-foreground">完成模块</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{overallStats.partialModules}</div>
              <div className="text-sm text-muted-foreground">部分完成</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{overallStats.incompleteModules}</div>
              <div className="text-sm text-muted-foreground">待完善</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(overallStats.overallScore)}`}>
                {overallStats.overallScore}%
              </div>
              <div className="text-sm text-muted-foreground">整体评分</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">完整度</span>
                <span className="text-sm">{overallStats.averageCompleteness}%</span>
              </div>
              <Progress value={overallStats.averageCompleteness} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">完成度</span>
                <span className="text-sm">{overallStats.averageCompletion}%</span>
              </div>
              <Progress value={overallStats.averageCompletion} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">完善度</span>
                <span className="text-sm">{overallStats.averageSophistication}%</span>
              </div>
              <Progress value={overallStats.averageSophistication} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">模块概览</TabsTrigger>
          <TabsTrigger value="detailed">详细分析</TabsTrigger>
          <TabsTrigger value="recommendations">改进建议</TabsTrigger>
          <TabsTrigger value="roadmap">发展路线图</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemModules.map((module) => {
              const Icon = module.icon
              return (
                <Card
                  key={module.name}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedModule(module)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        <CardTitle className="text-lg">{module.name}</CardTitle>
                      </div>
                      <Badge
                        variant={
                          module.priority === "high"
                            ? "destructive"
                            : module.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {module.priority === "high"
                          ? "高优先级"
                          : module.priority === "medium"
                            ? "中优先级"
                            : "低优先级"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">整体评分</span>
                        <span className={`text-lg font-bold ${getScoreColor(module.overallScore)}`}>
                          {module.overallScore}%
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>完整度</span>
                          <span>{module.completeness}%</span>
                        </div>
                        <Progress value={module.completeness} className="h-1" />

                        <div className="flex justify-between text-xs">
                          <span>完成度</span>
                          <span>{module.completion}%</span>
                        </div>
                        <Progress value={module.completion} className="h-1" />

                        <div className="flex justify-between text-xs">
                          <span>完善度</span>
                          <span>{module.sophistication}%</span>
                        </div>
                        <Progress value={module.sophistication} className="h-1" />
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span>技术债务</span>
                        <span
                          className={
                            module.technicalDebt > 20
                              ? "text-red-600"
                              : module.technicalDebt > 10
                                ? "text-yellow-600"
                                : "text-green-600"
                          }
                        >
                          {module.technicalDebt}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          {selectedModule ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <selectedModule.icon className="h-6 w-6" />
                  {selectedModule.name} - 详细分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedModule.subModules.map((subModule) => (
                    <div key={subModule.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(subModule.status)}`} />
                        {getStatusIcon(subModule.status)}
                        <div>
                          <div className="font-medium">{subModule.name}</div>
                          <div className="text-sm text-muted-foreground">{subModule.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${getScoreColor(subModule.completeness)}`}>
                          {subModule.completeness}%
                        </div>
                        <Progress value={subModule.completeness} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">请选择一个模块查看详细分析</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">高优先级改进项</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>药物管理 - 处方管理系统开发</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <span>临床决策 - 决策支持算法优化</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <span>患者管理 - 患者分组功能完善</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">技术债务清理</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <span>药物管理模块重构 (30%债务)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <span>临床决策算法优化 (25%债务)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <span>移动应用性能优化 (25%债务)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>系统发展路线图</CardTitle>
              <CardDescription>基于当前分析结果的改进计划</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">第一阶段 (1-2个月) - 关键缺失功能补全</h4>
                  <ul className="space-y-1 text-sm ml-4">
                    <li>• 完善药物管理的处方系统和库存管理</li>
                    <li>• 优化临床决策支持算法</li>
                    <li>• 完善患者分组和健康数据导入功能</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">第二阶段 (3-4个月) - 系统集成优化</h4>
                  <ul className="space-y-1 text-sm ml-4">
                    <li>• 加强各模块间的数据流转和集成</li>
                    <li>• 优化移动应用性能和用户体验</li>
                    <li>• 完善远程会诊和电子病历集成</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-600 mb-2">第三阶段 (5-6个月) - 智能化升级</h4>
                  <ul className="space-y-1 text-sm ml-4">
                    <li>• 引入更多AI功能和自动化流程</li>
                    <li>• 完善预测分析和个性化推荐</li>
                    <li>• 加强系统安全性和合规性</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
