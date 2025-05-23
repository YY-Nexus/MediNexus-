"use client"

import { useState } from "react"
import { MedicalCard } from "@/components/ui/medical-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Award,
  BookOpen,
  CheckCircle,
  ClipboardCheck,
  FileText,
  GraduationCap,
  BarChart,
  Users,
  Calendar,
  Star,
  Zap,
  Shield,
  RefreshCw,
} from "lucide-react"

export function TrainerCertificationStandards() {
  return (
    <div className="space-y-6">
      <MedicalCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">培训师选拔与认证标准</h2>
            <p className="text-gray-600 mt-1">建立专业、系统的培训师选拔与认证体系，确保培训质量和一致性</p>
          </div>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300">V1.2 标准版</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <CertificationOverviewCard
            title="认证等级"
            icon={<Award className="h-8 w-8 text-blue-600" />}
            description="分级认证体系"
            items={["初级培训师", "中级培训师", "高级培训师", "培训导师"]}
            color="blue"
          />

          <CertificationOverviewCard
            title="认证周期"
            icon={<RefreshCw className="h-8 w-8 text-green-600" />}
            description="定期更新认证"
            items={["初级：1年", "中级：2年", "高级：3年", "导师：3年"]}
            color="green"
          />

          <CertificationOverviewCard
            title="认证方向"
            icon={<Zap className="h-8 w-8 text-purple-600" />}
            description="专业领域认证"
            items={["临床应用", "技术支持", "管理培训", "研究应用"]}
            color="purple"
          />
        </div>

        <Tabs defaultValue="selection" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="selection">选拔标准</TabsTrigger>
            <TabsTrigger value="certification">认证流程</TabsTrigger>
            <TabsTrigger value="evaluation">评估方法</TabsTrigger>
            <TabsTrigger value="maintenance">认证维护</TabsTrigger>
          </TabsList>

          <TabsContent value="selection" className="mt-6">
            <SelectionStandards />
          </TabsContent>

          <TabsContent value="certification" className="mt-6">
            <CertificationProcess />
          </TabsContent>

          <TabsContent value="evaluation" className="mt-6">
            <EvaluationMethods />
          </TabsContent>

          <TabsContent value="maintenance" className="mt-6">
            <CertificationMaintenance />
          </TabsContent>
        </Tabs>
      </MedicalCard>

      <CertificationLevels />

      <CertificationStatistics />
    </div>
  )
}

function CertificationOverviewCard({ title, icon, description, items, color }) {
  const bgColor = `bg-${color}-50`
  const borderColor = `border-${color}-200`
  const textColor = `text-${color}-800`

  return (
    <MedicalCard className={`${bgColor} ${borderColor} p-4`}>
      <div className="flex items-start">
        <div className="mr-4 mt-1">{icon}</div>
        <div>
          <h3 className={`font-bold ${textColor} text-lg`}>{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li key={index} className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MedicalCard>
  )
}

function SelectionStandards() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MedicalCard className="p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
            基本资格要求
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 shrink-0" />
              <span>相关专业学历背景（医学、信息技术、管理等）</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 shrink-0" />
              <span>至少3年相关领域工作经验（临床、技术、管理等）</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 shrink-0" />
              <span>熟练掌握言语医枢³系统相关模块功能</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 shrink-0" />
              <span>具备基本教学能力和表达能力</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 shrink-0" />
              <span>无不良职业记录，品行端正</span>
            </li>
          </ul>
        </MedicalCard>

        <MedicalCard className="p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <Users className="h-5 w-5 text-purple-600 mr-2" />
            核心能力要求
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 shrink-0" />
              <span>专业知识：深入理解所教授领域的专业知识</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 shrink-0" />
              <span>系统操作：熟练操作系统功能，能够解决常见问题</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 shrink-0" />
              <span>教学能力：具备课程设计、内容讲解和互动引导能力</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 shrink-0" />
              <span>沟通技巧：良好的语言表达和人际沟通能力</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 shrink-0" />
              <span>问题解决：能够应对培训中的各种问题和挑战</span>
            </li>
          </ul>
        </MedicalCard>
      </div>

      <MedicalCard className="p-4">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <ClipboardCheck className="h-5 w-5 text-green-600 mr-2" />
          选拔评估维度
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">专业知识水平</span>
                <span className="text-sm text-gray-500">权重：25%</span>
              </div>
              <Progress value={25} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">评估对专业领域知识的掌握程度和深度</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">系统操作熟练度</span>
                <span className="text-sm text-gray-500">权重：20%</span>
              </div>
              <Progress value={20} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">评估对系统功能的熟悉程度和操作技能</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">教学能力</span>
                <span className="text-sm text-gray-500">权重：20%</span>
              </div>
              <Progress value={20} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">评估课程设计、内容讲解和教学方法运用能力</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">沟通表达能力</span>
                <span className="text-sm text-gray-500">权重：15%</span>
              </div>
              <Progress value={15} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">评估语言表达清晰度、逻辑性和感染力</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">问题解决能力</span>
                <span className="text-sm text-gray-500">权重：10%</span>
              </div>
              <Progress value={10} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">评估应对培训中各种问题和挑战的能力</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">团队协作精神</span>
                <span className="text-sm text-gray-500">权重：10%</span>
              </div>
              <Progress value={10} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">评估与其他培训师和团队成员的协作能力</p>
            </div>
          </div>
        </div>
      </MedicalCard>

      <MedicalCard className="p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center">
          <Shield className="h-5 w-5 text-orange-600 mr-2" />
          选拔方法与流程
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2">第一阶段：资格审核</h4>
            <ul className="text-sm space-y-1">
              <li>• 提交申请材料</li>
              <li>• 资历和经验审核</li>
              <li>• 专业背景评估</li>
              <li>• 推荐信审核</li>
            </ul>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
            <h4 className="font-medium text-green-800 mb-2">第二阶段：能力测试</h4>
            <ul className="text-sm space-y-1">
              <li>• 专业知识笔试</li>
              <li>• 系统操作实操测试</li>
              <li>• 教学能力评估</li>
              <li>• 模拟授课演示</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
            <h4 className="font-medium text-purple-800 mb-2">第三阶段：面试评估</h4>
            <ul className="text-sm space-y-1">
              <li>• 专家小组面试</li>
              <li>• 情景模拟测试</li>
              <li>• 教学理念阐述</li>
              <li>• 综合能力评估</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <h4 className="font-medium mb-2">选拔决策流程</h4>
          <p className="text-sm text-gray-600 mb-2">
            选拔委员会由资深培训师、专业领域专家和培训管理人员组成，基于综合评分进行决策：
          </p>
          <ul className="text-sm space-y-1">
            <li>• 90分以上：直接录用为相应级别培训师</li>
            <li>• 80-89分：有条件录用，需完成指定培训后再次评估</li>
            <li>• 70-79分：列入培训师储备人才库，提供培训和发展机会</li>
            <li>• 70分以下：不予录用，可在6个月后重新申请</li>
          </ul>
        </div>
      </MedicalCard>
    </div>
  )
}

function CertificationProcess() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    {
      title: "申请与资格审核",
      description: "提交申请材料并进行初步资格审核",
      details: [
        "填写培训师认证申请表",
        "提交个人简历和专业资质证明",
        "提供工作经验和相关项目经历证明",
        "提交推荐信（至少2封）",
        "系统使用经验证明",
      ],
    },
    {
      title: "培训师培训",
      description: "参加专业培训师培训课程",
      details: [
        "完成基础培训师技能培训（24学时）",
        "完成言语医枢³系统功能深度培训（16学时）",
        "完成教学方法与技巧培训（8学时）",
        "完成培训案例分析与实践（8学时）",
        "培训期间表现评估",
      ],
    },
    {
      title: "认证考核",
      description: "参加综合认证考核评估",
      details: [
        "理论知识考试（专业知识+教学方法）",
        "系统操作技能测试",
        "模拟教学展示（30分钟）",
        "教案设计与评审",
        "问题解决能力测试",
      ],
    },
    {
      title: "实习与反馈",
      description: "在资深培训师指导下进行实习",
      details: [
        "协助资深培训师完成至少3次培训",
        "独立完成至少2次培训（有监督）",
        "收集学员反馈并分析",
        "培训效果评估",
        "指导培训师评价",
      ],
    },
    {
      title: "认证评审",
      description: "认证委员会最终评审",
      details: [
        "综合评分计算（各环节权重评分）",
        "认证委员会审核评估结果",
        "确定认证等级（初级/中级/高级）",
        "制定个人发展计划",
        "颁发培训师认证证书",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center relative z-10 ${
                currentStep > index + 1
                  ? "text-green-600"
                  : currentStep === index + 1
                    ? "text-blue-600"
                    : "text-gray-400"
              }`}
              onClick={() => setCurrentStep(index + 1)}
              style={{ cursor: "pointer" }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep > index + 1
                    ? "bg-green-100 border-2 border-green-500"
                    : currentStep === index + 1
                      ? "bg-blue-100 border-2 border-blue-500"
                      : "bg-gray-100 border-2 border-gray-300"
                }`}
              >
                {currentStep > index + 1 ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              <div className="text-xs text-center w-20">{step.title}</div>
            </div>
          ))}
        </div>

        {/* 连接线 */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" style={{ zIndex: 0 }}>
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${(currentStep - 1) * 25}%` }}
          ></div>
        </div>
      </div>

      <MedicalCard className="p-5">
        <div className="flex items-center mb-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-blue-100 border-2 border-blue-500`}
          >
            <span className="text-sm font-bold text-blue-600">{currentStep}</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">{steps[currentStep - 1].title}</h3>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        <div className="pl-13 ml-5 border-l-2 border-blue-200 py-2">
          <h4 className="font-medium mb-3">详细要求：</h4>
          <ul className="space-y-2">
            {steps[currentStep - 1].details.map((detail, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
          >
            上一步
          </Button>
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length))}
            disabled={currentStep === steps.length}
          >
            下一步
          </Button>
        </div>
      </MedicalCard>

      <MedicalCard className="p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center">
          <FileText className="h-5 w-5 text-blue-600 mr-2" />
          认证申请材料清单
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">基本申请材料</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>培训师认证申请表（完整填写并签名）</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>个人简历（详细教育背景和工作经历）</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>身份证明和学历证书复印件</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>专业资质证书复印件</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>工作经验证明（单位出具）</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">补充申请材料</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>推荐信（至少2封，包括直接主管）</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>系统使用经验自述（500字以内）</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>教学或培训经历证明（如有）</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>培训作品样例（如有）</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>个人培训理念陈述（300字以内）</span>
              </li>
            </ul>
          </div>
        </div>
      </MedicalCard>

      <MedicalCard className="p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center">
          <Calendar className="h-5 w-5 text-purple-600 mr-2" />
          认证时间安排
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  认证阶段
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  时间安排
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  持续时间
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  负责部门
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">申请与资格审核</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">每季度首月</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2周</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">人力资源部</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">培训师培训</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">每季度第二月</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4周</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">培训部</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">认证考核</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">培训结束后1周内</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2天</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">认证委员会</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">实习与反馈</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">考核通过后</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4-8周</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">培训部</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">认证评审</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">实习结束后2周内</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1周</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">认证委员会</td>
              </tr>
            </tbody>
          </table>
        </div>
      </MedicalCard>
    </div>
  )
}

function EvaluationMethods() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MedicalCard className="p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <BarChart className="h-5 w-5 text-blue-600 mr-2" />
            评估维度与权重
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">专业知识掌握</span>
                <span className="text-sm text-gray-500">20%</span>
              </div>
              <Progress value={20} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">通过笔试和口试评估专业领域知识的掌握程度</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">系统操作技能</span>
                <span className="text-sm text-gray-500">20%</span>
              </div>
              <Progress value={20} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">通过实操测试评估系统功能操作熟练度</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">教学能力</span>
                <span className="text-sm text-gray-500">25%</span>
              </div>
              <Progress value={25} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">通过模拟教学和教案设计评估教学能力</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">沟通表达能力</span>
                <span className="text-sm text-gray-500">15%</span>
              </div>
              <Progress value={15} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">评估语言表达清晰度、逻辑性和感染力</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">问题解决能力</span>
                <span className="text-sm text-gray-500">10%</span>
              </div>
              <Progress value={10} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">通过情景模拟评估解决培训中问题的能力</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">学员反馈评价</span>
                <span className="text-sm text-gray-500">10%</span>
              </div>
              <Progress value={10} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">实习期间学员对培训效果的评价</p>
            </div>
          </div>
        </MedicalCard>

        <MedicalCard className="p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <ClipboardCheck className="h-5 w-5 text-green-600 mr-2" />
            评估方法与工具
          </h3>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>理论知识考试</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 text-sm">
                  <li>• 闭卷笔试，满分100分，及格分数70分</li>
                  <li>• 内容包括：专业知识、系统功能、教学方法</li>
                  <li>• 题型：选择题、判断题、简答题、案例分析</li>
                  <li>• 时长：120分钟</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>系统操作实测</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 text-sm">
                  <li>• 实操测试，满分100分，及格分数75分</li>
                  <li>• 内容：系统各模块功能操作和问题解决</li>
                  <li>• 评分标准：操作准确性、速度、问题解决能力</li>
                  <li>• 时长：90分钟</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>模拟教学展示</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 text-sm">
                  <li>• 选定主题进行30分钟模拟教学</li>
                  <li>• 评分标准：内容组织、表达清晰度、互动技巧、时间控制</li>
                  <li>• 由3名评委现场评分，取平均分</li>
                  <li>• 满分100分，及格分数80分</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>教案设计评审</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 text-sm">
                  <li>• 提前一周布置教案设计任务</li>
                  <li>• 评分标准：内容完整性、逻辑性、教学方法设计、教学资源准备</li>
                  <li>• 由专家组评审打分</li>
                  <li>• 满分100分，及格分数75分</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>情景模拟测试</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 text-sm">
                  <li>• 模拟培训中可能遇到的各种问题情景</li>
                  <li>• 评估应对能力、解决方案和沟通技巧</li>
                  <li>• 3-5个情景，每个情景5-10分钟</li>
                  <li>• 满分100分，及格分数70分</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>学员反馈评价</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 text-sm">
                  <li>• 实习期间收集学员反馈</li>
                  <li>• 标准化评价表，包括内容质量、表达清晰度、互动性、解答问题能力等</li>
                  <li>• 5分制评分，计算平均分</li>
                  <li>• 及格标准：平均分不低于4.0</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </MedicalCard>
      </div>

      <MedicalCard className="p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center">
          <Users className="h-5 w-5 text-purple-600 mr-2" />
          评估主体与流程
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2">评估主体构成</h4>
            <ul className="text-sm space-y-1">
              <li>• 认证委员会（5-7人）</li>
              <li>• 专业领域专家（2-3人）</li>
              <li>• 资深培训师（2-3人）</li>
              <li>• 培训管理人员（1-2人）</li>
              <li>• 学员代表（反馈评价）</li>
            </ul>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
            <h4 className="font-medium text-green-800 mb-2">评估流程</h4>
            <ul className="text-sm space-y-1">
              <li>• 各项评估独立进行</li>
              <li>• 评分标准化，使用统一评分表</li>
              <li>• 多人评分取平均值</li>
              <li>• 综合评分计算（加权平均）</li>
              <li>• 认证委员会最终审核</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
            <h4 className="font-medium text-purple-800 mb-2">评估结果应用</h4>
            <ul className="text-sm space-y-1">
              <li>• 确定认证等级</li>
              <li>• 制定个人发展计划</li>
              <li>• 确定培训授课范围</li>
              <li>• 确定培训师薪酬标准</li>
              <li>• 建立培训师档案</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <h4 className="font-medium mb-2">评分标准与等级划分</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    综合得分
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    认证等级
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    授课范围
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    备注
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">90-100分</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">高级培训师</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">全部培训内容</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">可担任培训导师</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">80-89分</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">中级培训师</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">大部分培训内容</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">可独立开展培训</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">70-79分</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">初级培训师</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">基础培训内容</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">需在指导下开展培训</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">60-69分</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">培训助理</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">协助培训工作</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">需进一步培训提升</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">60分以下</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">未通过认证</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">不可开展培训</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">可在6个月后重新申请</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </MedicalCard>
    </div>
  )
}

function CertificationMaintenance() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MedicalCard className="p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <RefreshCw className="h-5 w-5 text-blue-600 mr-2" />
            认证有效期与更新
          </h3>

          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2">认证有效期</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>初级培训师：1年</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>中级培训师：2年</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>高级培训师：3年</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>培训导师：3年</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800 mb-2">更新条件</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>完成规定的继续教育学时</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>达到最低培训场次要求</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>学员评价达到要求标准</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>通过更新考核评估</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
              <h4 className="font-medium text-purple-800 mb-2">更新流程</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>提交更新申请（有效期到期前3个月）</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>提交继续教育证明和培训记录</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>参加更新考核（笔试+实操）</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>认证委员会审核</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>颁发新的认证证书</span>
                </li>
              </ul>
            </div>
          </div>
        </MedicalCard>

        <MedicalCard className="p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <BookOpen className="h-5 w-5 text-green-600 mr-2" />
            继续教育要求
          </h3>

          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      认证等级
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      年度学时要求
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      最低培训场次
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      学员评价要求
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">初级培训师</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">20学时/年</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">8场/年</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">平均≥4.0分</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">中级培训师</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">30学时/年</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">12场/年</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">平均≥4.2分</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">高级培训师</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">40学时/年</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">15场/年</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">平均≥4.5分</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">培训导师</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">50学时/年</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">10场/年</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">平均≥4.7分</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2">继续教育内容要求</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>专业知识更新（至少40%学时）</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>系统功能更新培训（至少30%学时）</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>教学方法提升（至少20%学时）</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>其他相关培训（不超过10%学时）</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800 mb-2">继续教育形式</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>参加正式培训课程（线上或线下）</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>参加专业会议或研讨会</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>发表相关论文或文章</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>参与培训材料开发</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span>参与系统功能测试和改进</span>
                </li>
              </ul>
            </div>
          </div>
        </MedicalCard>
      </div>

      <MedicalCard className="p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center">
          <Shield className="h-5 w-5 text-red-600 mr-2" />
          认证暂停与撤销
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">认证暂停条件</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 shrink-0" />
                <span>未按要求完成继续教育学时</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 shrink-0" />
                <span>未达到最低培训场次要求</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 shrink-0" />
                <span>学员评价连续两次低于标准</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 shrink-0" />
                <span>培训过程中出现重大失误</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 shrink-0" />
                <span>违反培训师行为规范</span>
              </li>
            </ul>

            <h4 className="font-medium mb-3 mt-4">暂停期间限制</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 shrink-0" />
                <span>不得开展任何培训活动</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 shrink-0" />
                <span>不得使用培训师认证身份</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 shrink-0" />
                <span>需完成指定的改进计划</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">认证撤销条件</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 shrink-0" />
                <span>暂停期满未完成改进计划</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 shrink-0" />
                <span>培训中出现严重错误导致不良后果</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 shrink-0" />
                <span>严重违反职业道德和行为规范</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 shrink-0" />
                <span>提供虚假材料或信息</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 shrink-0" />
                <span>连续两次更新认证未通过</span>
              </li>
            </ul>

            <h4 className="font-medium mb-3 mt-4">撤销后处理</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 shrink-0" />
                <span>收回认证证书</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 shrink-0" />
                <span>从培训师名录中删除</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 shrink-0" />
                <span>一年内不得重新申请认证</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mt-4">
          <h4 className="font-medium mb-2">申诉与复议机制</h4>
          <p className="text-sm text-gray-600 mb-2">
            对认证暂停或撤销决定不服的培训师，可在收到通知后15个工作日内提出申诉：
          </p>
          <ul className="text-sm space-y-1">
            <li>• 提交书面申诉材料，说明理由并提供证据</li>
            <li>• 申诉委员会（与原认证委员会成员不重叠）进行审核</li>
            <li>• 必要时进行听证</li>
            <li>• 30个工作日内做出复议决定</li>
            <li>• 复议决定为最终决定</li>
          </ul>
        </div>
      </MedicalCard>

      <MedicalCard className="p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center">
          <Star className="h-5 w-5 text-yellow-600 mr-2" />
          认证升级路径
        </h3>

        <div className="relative py-8">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>

          <div className="relative flex justify-between">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 border-4 border-blue-500 flex items-center justify-center z-10 mb-2">
                <span className="text-blue-700 font-bold">初级</span>
              </div>
              <span className="text-sm font-medium">初级培训师</span>
              <span className="text-xs text-gray-500">1年有效期</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center z-10 mb-2">
                <span className="text-green-700 font-bold">中级</span>
              </div>
              <span className="text-sm font-medium">中级培训师</span>
              <span className="text-xs text-gray-500">2年有效期</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 border-4 border-purple-500 flex items-center justify-center z-10 mb-2">
                <span className="text-purple-700 font-bold">高级</span>
              </div>
              <span className="text-sm font-medium">高级培训师</span>
              <span className="text-xs text-gray-500">3年有效期</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 border-4 border-orange-500 flex items-center justify-center z-10 mb-2">
                <span className="text-orange-700 font-bold">导师</span>
              </div>
              <span className="text-sm font-medium">培训导师</span>
              <span className="text-xs text-gray-500">3年有效期</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2">初级→中级</h4>
            <ul className="text-sm space-y-1">
              <li>• 初级认证满1年</li>
              <li>• 完成至少15场培训</li>
              <li>• 学员评价平均≥4.3分</li>
              <li>• 完成40学时继续教育</li>
              <li>• 通过中级认证考核</li>
            </ul>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
            <h4 className="font-medium text-green-800 mb-2">中级→高级</h4>
            <ul className="text-sm space-y-1">
              <li>• 中级认证满2年</li>
              <li>• 完成至少30场培训</li>
              <li>• 学员评价平均≥4.5分</li>
              <li>• 完成60学时继续教育</li>
              <li>• 参与培训材料开发</li>
              <li>• 通过高级认证考核</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
            <h4 className="font-medium text-purple-800 mb-2">高级→导师</h4>
            <ul className="text-sm space-y-1">
              <li>• 高级认证满2年</li>
              <li>• 完成至少50场培训</li>
              <li>• 学员评价平均≥4.7分</li>
              <li>• 完成80学时继续教育</li>
              <li>• 主导开发培训课程</li>
              <li>• 培养至少3名培训师</li>
              <li>• 通过导师认证考核</li>
            </ul>
          </div>
        </div>
      </MedicalCard>
    </div>
  )
}

function CertificationLevels() {
  return (
    <MedicalCard className="p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Award className="h-6 w-6 text-blue-600 mr-2" />
        培训师认证等级体系
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-bold text-blue-800">初级培训师</h4>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300">Level 1</Badge>
          </div>

          <div className="space-y-3">
            <div>
              <h5 className="text-sm font-medium mb-1">资格要求</h5>
              <ul className="text-sm space-y-1">
                <li>• 相关领域3年工作经验</li>
                <li>• 通过初级认证考核</li>
                <li>• 完成培训师基础培训</li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-1">授课范围</h5>
              <ul className="text-sm space-y-1">
                <li>• 系统基础功能培训</li>
                <li>• 标准化培训内容</li>
                <li>• 基础操作指导</li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-1">工作方式</h5>
              <ul className="text-sm space-y-1">
                <li>• 在资深培训师指导下工作</li>
                <li>• 使用标准化培训材料</li>
                <li>• 定期接受指导和反馈</li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-1">有效期</h5>
              <p className="text-sm">1年，需按要求更新</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-bold text-green-800">中级培训师</h4>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300">Level 2</Badge>
          </div>

          <div className="space-y-3">
            <div>
              <h5 className="text-sm font-medium mb-1">资格要求</h5>
              <ul className="text-sm space-y-1">
                <li>• 初级培训师满1年</li>
                <li>• 完成15场以上培训</li>
                <li>• 通过中级认证考核</li>
                <li>• 学员评价≥4.3分</li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-1">授课范围</h5>
              <ul className="text-sm space-y-1">
                <li>• 系统全部功能培训</li>
                <li>• 专业应用场景培训</li>
                <li>• 常见问题解决培训</li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-1">工作方式</h5>
              <ul className="text-sm space-y-1">
                <li>• 可独立开展培训</li>
                <li>• 可调整培训内容</li>
                <li>• 参与培训材料改进</li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-1">有效期</h5>
              <p className="text-sm">2年，需按要求更新</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-bold text-purple-800">高级培训师</h4>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-300">Level 3</Badge>
          </div>

          <div className="space-y-3">
            <div>
              <h5 className="text-sm font-medium mb-1">资格要求</h5>
              <ul className="text-sm space-y-1">
                <li>• 中级培训师满2年</li>
                <li>• 完成30场以上培训</li>
                <li>• 通过高级认证考核</li>
                <li>• 学员评价≥4.5分</li>
                <li>• 参与培训材料开发</li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-1">授课范围</h5>
              <ul className="text-sm space-y-1">
                <li>• 全部培训内容</li>
                <li>• 高级应用培训</li>
                <li>• 定制化培训</li>
                <li>• 培训师培训</li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-1">工作方式</h5>
              <ul className="text-sm space-y-1">
                <li>• 完全独立开展培训</li>
                <li>• 开发培训材料</li>
                <li>• 指导初级培训师</li>
                <li>• 解决复杂问题</li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-1">有效期</h5>
              <p className="text-sm">3年，需按要求更新</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-bold text-orange-800">培训导师</h4>
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-300">Level 4</Badge>
          </div>

          <div className="space-y-3">
            <div>
              <h5 className="text-sm font-medium mb-1">资格要求</h5>
              <ul className="text-sm space-y-1">
                <li>• 高级培训师满2年</li>
                <li>• 完成50场以上培训</li>
                <li>• 通过导师认证考核</li>
                <li>• 学员评价≥4.7分</li>
                <li>• 主导开发培训课程</li>
                <li>• 培养3名以上培训师</li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-1">授课范围</h5>
              <ul className="text-sm space-y-1">
                <li>• 全部培训内容</li>
                <li>• 培训师培训</li>
                <li>• 培训体系建设</li>
                <li>• 高级定制培训</li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-1">工作方式</h5>
              <ul className="text-sm space-y-1">
                <li>• 领导培训团队</li>
                <li>• 设计培训体系</li>
                <li>• 评估培训质量</li>
                <li>• 培训师发展指导</li>
                <li>• 参与认证决策</li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-1">有效期</h5>
              <p className="text-sm">3年，需按要求更新</p>
            </div>
          </div>
        </div>
      </div>
    </MedicalCard>
  )
}

function CertificationStatistics() {
  return (
    <MedicalCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <BarChart className="h-6 w-6 text-blue-600 mr-2" />
          认证统计与分析
        </h3>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            导出报告
          </Button>
          <Button size="sm">刷新数据</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-blue-600">认证培训师总数</p>
              <h4 className="text-2xl font-bold text-blue-900 mt-1">86</h4>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-blue-800">
              <span>较上季度</span>
              <span className="text-green-600">+12%</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-green-600">本季度新增认证</p>
              <h4 className="text-2xl font-bold text-green-900 mt-1">14</h4>
            </div>
            <Award className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-green-800">
              <span>通过率</span>
              <span>78%</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-purple-600">认证更新数量</p>
              <h4 className="text-2xl font-bold text-purple-900 mt-1">23</h4>
            </div>
            <RefreshCw className="h-8 w-8 text-purple-500" />
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-purple-800">
              <span>更新成功率</span>
              <span>92%</span>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-orange-600">平均学员评分</p>
              <h4 className="text-2xl font-bold text-orange-900 mt-1">4.6</h4>
            </div>
            <Star className="h-8 w-8 text-orange-500" />
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-orange-800">
              <span>较上季度</span>
              <span className="text-green-600">+0.2</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium mb-4">认证等级分布</h4>
          <div className="h-60 flex items-end justify-around">
            <div className="flex flex-col items-center">
              <div className="w-16 bg-blue-500 rounded-t-md" style={{ height: "120px" }}></div>
              <div className="mt-2 text-sm">初级</div>
              <div className="text-xs text-gray-500">42人</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 bg-green-500 rounded-t-md" style={{ height: "80px" }}></div>
              <div className="mt-2 text-sm">中级</div>
              <div className="text-xs text-gray-500">28人</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 bg-purple-500 rounded-t-md" style={{ height: "40px" }}></div>
              <div className="mt-2 text-sm">高级</div>
              <div className="text-xs text-gray-500">12人</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 bg-orange-500 rounded-t-md" style={{ height: "15px" }}></div>
              <div className="mt-2 text-sm">导师</div>
              <div className="text-xs text-gray-500">4人</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium mb-4">认证方向分布</h4>
          <div className="h-60 flex items-center justify-center">
            <div className="w-full max-w-xs">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>临床应用</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>技术支持</span>
                  <span>30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>管理培训</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>研究应用</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MedicalCard>
  )
}
