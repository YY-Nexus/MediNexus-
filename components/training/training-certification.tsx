"use client"

import { MedicalCard } from "@/components/ui/medical-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Award, CheckCircle, Clock, AlertCircle, BookOpen, FileCheck } from "lucide-react"

export function TrainingCertification() {
  // 模拟认证数据
  const certifications = [
    {
      id: 1,
      title: "言语医枢³系统基础认证",
      description: "验证用户对系统基础功能的掌握程度",
      requiredModules: ["系统概述", "用户界面导航", "基本功能操作"],
      progress: 100,
      status: "completed",
      completedDate: "2025-05-15",
      score: 92,
      certificateId: "YY-BASE-2025051501",
    },
    {
      id: 2,
      title: "临床医生专业认证",
      description: "验证临床医生对专业功能的掌握程度",
      requiredModules: ["患者管理", "AI辅助诊断", "临床决策支持", "远程会诊"],
      progress: 75,
      status: "in-progress",
      completedModules: ["患者管理", "AI辅助诊断", "临床决策支持"],
      remainingModules: ["远程会诊"],
    },
    {
      id: 3,
      title: "系统管理员认证",
      description: "验证系统管理员对管理功能的掌握程度",
      requiredModules: ["用户管理", "权限配置", "系统监控", "安全审计"],
      progress: 0,
      status: "not-started",
    },
  ]

  return (
    <div className="space-y-6">
      <MedicalCard className="p-6">
        <h2 className="text-2xl font-bold mb-4">培训认证与评估</h2>
        <p className="mb-6">
          完成培训后，您需要通过相应的认证评估来验证您对系统的掌握程度。认证评估包括理论知识测试和实操技能评估，通过后将获得相应的系统使用认证。
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <MedicalCard className="md:col-span-2 bg-blue-50 border-blue-200">
            <div className="p-4 flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">认证体系说明</h3>
                <p className="mt-2 text-blue-700">
                  言语医枢³系统采用分级认证体系，包括基础认证和专业认证。所有用户必须完成基础认证，不同角色的用户还需完成相应的专业认证。认证有效期为一年，到期需要重新认证。
                </p>
              </div>
            </div>
          </MedicalCard>

          {certifications.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <MedicalCard>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">认证评估方式</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>在线理论知识测试（选择题、判断题）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>实操技能评估（模拟环境中完成任务）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>案例分析（针对专业认证）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>综合应用能力评估（针对高级认证）</span>
                </li>
              </ul>
            </div>
          </MedicalCard>

          <MedicalCard>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">认证等级与要求</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>基础认证：所有用户必须完成，分数≥80分</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>专业认证：特定角色用户，分数≥85分</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>高级认证：资深用户，分数≥90分</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>专家认证：系统专家，分数≥95分</span>
                </li>
              </ul>
            </div>
          </MedicalCard>

          <MedicalCard>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">认证有效期与更新</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>认证有效期为一年</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>系统重大更新后需重新认证</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>更新认证可获得简化流程</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>认证到期前30天系统自动提醒</span>
                </li>
              </ul>
            </div>
          </MedicalCard>
        </div>
      </MedicalCard>
    </div>
  )
}

function CertificationCard({ certification }: { certification: any }) {
  return (
    <MedicalCard className="overflow-hidden">
      <div
        className={`p-4 ${
          certification.status === "completed"
            ? "bg-green-50"
            : certification.status === "in-progress"
              ? "bg-blue-50"
              : "bg-gray-50"
        }`}
      >
        <div className="flex justify-between items-start">
          <h3 className="font-semibold">{certification.title}</h3>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              certification.status === "completed"
                ? "bg-green-100 text-green-800"
                : certification.status === "in-progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {certification.status === "completed"
              ? "已完成"
              : certification.status === "in-progress"
                ? "进行中"
                : "未开始"}
          </div>
        </div>
        <p className="text-sm mt-2 text-gray-600">{certification.description}</p>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>完成进度</span>
            <span>{certification.progress}%</span>
          </div>
          <Progress value={certification.progress} className="h-2" />
        </div>

        {certification.status === "completed" ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>完成日期: {certification.completedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>认证分数: {certification.score}/100</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>认证编号: {certification.certificateId}</span>
            </div>
            <div className="mt-4 flex justify-between">
              <Button size="sm" variant="outline">
                查看证书
              </Button>
              <Button size="sm">下载证书</Button>
            </div>
          </div>
        ) : certification.status === "in-progress" ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              已完成模块
            </h4>
            <ul className="space-y-1 pl-6 text-sm">
              {certification.completedModules.map((module: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  <span>{module}</span>
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-medium flex items-center gap-2 mt-2">
              <Clock className="h-4 w-4 text-orange-500" />
              待完成模块
            </h4>
            <ul className="space-y-1 pl-6 text-sm">
              {certification.remainingModules.map((module: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <AlertCircle className="h-3.5 w-3.5 text-orange-500" />
                  <span>{module}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button size="sm" className="w-full">
                继续培训
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              需要完成的模块
            </h4>
            <ul className="space-y-1 pl-6 text-sm">
              {certification.requiredModules.map((module: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <AlertCircle className="h-3.5 w-3.5 text-gray-500" />
                  <span>{module}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button size="sm" className="w-full">
                开始培训
              </Button>
            </div>
          </div>
        )}
      </div>
    </MedicalCard>
  )
}
