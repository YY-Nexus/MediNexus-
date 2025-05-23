"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MedicalCard } from "@/components/ui/medical-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, BookOpen } from "lucide-react"

export function RoleBasedTraining() {
  const [selectedRole, setSelectedRole] = useState("clinician")

  return (
    <div className="space-y-6">
      <MedicalCard className="p-6">
        <h2 className="text-2xl font-bold mb-4">角色专项培训</h2>
        <p className="mb-6">
          言语医枢³系统为不同角色的用户提供定制化培训内容，确保每位用户都能掌握与其工作职责相关的系统功能。
          请选择您的角色查看相应的培训计划。
        </p>

        <Tabs value={selectedRole} onValueChange={setSelectedRole} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="clinician">临床医生</TabsTrigger>
            <TabsTrigger value="nurse">护理人员</TabsTrigger>
            <TabsTrigger value="researcher">研究人员</TabsTrigger>
            <TabsTrigger value="admin">系统管理员</TabsTrigger>
            <TabsTrigger value="technician">技术人员</TabsTrigger>
          </TabsList>

          <TabsContent value="clinician">
            <RoleTrainingContent
              role="临床医生"
              description="针对临床医生的培训专注于患者管理、临床决策支持和AI辅助诊断等核心功能，帮助医生提高诊疗效率和准确性。"
              modules={[
                {
                  title: "患者管理与电子病历",
                  description: "学习如何管理患者信息、查看和更新电子病历",
                  duration: "3小时",
                  format: "视频教程 + 实操练习",
                  topics: ["患者档案创建与管理", "电子病历查看与更新", "医疗影像与检验结果查看", "病历模板使用与定制"],
                },
                {
                  title: "AI辅助诊断系统",
                  description: "掌握AI辅助诊断工具的使用方法和结果解读",
                  duration: "4小时",
                  format: "视频教程 + 专家指导 + 案例分析",
                  topics: [
                    "AI诊断模型原理简介",
                    "诊断请求提交与参数设置",
                    "诊断结果解读与验证",
                    "多模态分析结果整合",
                    "AI建议的临床应用",
                  ],
                },
                {
                  title: "临床决策支持系统",
                  description: "学习如何利用系统提供的临床指南和决策支持工具",
                  duration: "3小时",
                  format: "视频教程 + 案例分析",
                  topics: ["临床路径与指南查询", "药物相互作用检查", "治疗方案推荐", "基于证据的决策支持"],
                },
                {
                  title: "远程会诊系统",
                  description: "掌握远程会诊功能的使用方法",
                  duration: "2小时",
                  format: "视频教程 + 模拟演练",
                  topics: ["远程会诊发起与参与", "病例共享与讨论", "远程影像分析", "会诊记录与跟踪"],
                },
              ]}
            />
          </TabsContent>

          <TabsContent value="nurse">
            <RoleTrainingContent
              role="护理人员"
              description="护理人员培训重点关注患者监测、护理记录和医嘱执行等日常护理工作相关功能，提高护理工作效率和质量。"
              modules={[
                {
                  title: "患者基础信息管理",
                  description: "学习如何查看和更新患者基本信息",
                  duration: "2小时",
                  format: "视频教程 + 实操练习",
                  topics: ["患者信息查询与筛选", "生命体征记录与监测", "患者分组与标记", "患者状态更新"],
                },
                {
                  title: "护理记录系统",
                  description: "掌握电子护理记录的创建和管理",
                  duration: "3小时",
                  format: "视频教程 + 实操练习",
                  topics: ["护理评估记录", "护理计划制定", "护理措施执行记录", "护理记录模板使用", "护理质量监控"],
                },
                {
                  title: "医嘱执行管理",
                  description: "学习医嘱接收、执行和记录流程",
                  duration: "2.5小时",
                  format: "视频教程 + 案例分析",
                  topics: ["医嘱接收与确认", "医嘱执行记录", "医嘱变更提醒", "医嘱执行异常处理"],
                },
                {
                  title: "患者健康教育",
                  description: "了解如何使用系统进行患者健康教育",
                  duration: "2小时",
                  format: "视频教程 + 角色扮演",
                  topics: ["健康教育资料查询", "个性化教育计划制定", "患者教育记录", "教育效果评估"],
                },
              ]}
            />
          </TabsContent>

          <TabsContent value="researcher">
            <RoleTrainingContent
              role="研究人员"
              description="研究人员培训聚焦于数据分析、研究项目管理和AI模型训练等功能，支持医学研究和创新。"
              modules={[
                {
                  title: "研究数据管理",
                  description: "学习研究数据的收集、组织和管理",
                  duration: "3小时",
                  format: "视频教程 + 实操练习",
                  topics: [
                    "研究数据集创建与管理",
                    "数据导入与导出",
                    "数据质量控制",
                    "数据版本管理",
                    "数据共享与权限设置",
                  ],
                },
                {
                  title: "高级数据分析",
                  description: "掌握系统提供的数据分析工具和方法",
                  duration: "4小时",
                  format: "视频教程 + 案例分析 + 实操练习",
                  topics: [
                    "统计分析工具使用",
                    "数据可视化与图表生成",
                    "趋势分析与预测",
                    "多维数据分析",
                    "分析结果导出与共享",
                  ],
                },
                {
                  title: "AI模型训练与评估",
                  description: "学习如何训练和评估AI诊断模型",
                  duration: "5小时",
                  format: "视频教程 + 专家指导 + 实操练习",
                  topics: [
                    "模型训练数据准备",
                    "模型参数配置",
                    "训练过程监控",
                    "模型性能评估",
                    "模型迭代与优化",
                    "模型部署与应用",
                  ],
                },
                {
                  title: "研究项目管理",
                  description: "了解研究项目的创建和管理流程",
                  duration: "3小时",
                  format: "视频教程 + 实操练习",
                  topics: [
                    "研究项目创建与设置",
                    "研究协作与团队管理",
                    "研究进度跟踪",
                    "研究成果记录与发布",
                    "伦理审查申请管理",
                  ],
                },
              ]}
            />
          </TabsContent>

          <TabsContent value="admin">
            <RoleTrainingContent
              role="系统管理员"
              description="系统管理员培训涵盖用户管理、系统配置、安全审计和权限控制等管理功能，确保系统安全稳定运行。"
              modules={[
                {
                  title: "用户与权限管理",
                  description: "学习用户账户创建、角色分配和权限管理",
                  duration: "3小时",
                  format: "视频教程 + 实操练习",
                  topics: ["用户账户创建与管理", "角色定义与分配", "权限矩阵配置", "用户组管理", "访问控制策略设置"],
                },
                {
                  title: "系统配置与维护",
                  description: "掌握系统配置、监控和维护方法",
                  duration: "4小时",
                  format: "视频教程 + 实操练习",
                  topics: ["系统参数配置", "系统性能监控", "系统日志管理", "系统备份与恢复", "系统更新管理"],
                },
                {
                  title: "安全审计与合规",
                  description: "学习安全审计、风险管理和合规性维护",
                  duration: "3小时",
                  format: "视频教程 + 案例分析",
                  topics: [
                    "安全审计日志分析",
                    "安全事件处理",
                    "合规性检查与报告",
                    "数据访问审计",
                    "安全策略制定与实施",
                  ],
                },
                {
                  title: "集成与接口管理",
                  description: "了解系统集成和接口配置管理",
                  duration: "3小时",
                  format: "视频教程 + 实操练习",
                  topics: ["外部系统集成配置", "API管理与监控", "数据交换规则设置", "接口性能优化", "集成故障排除"],
                },
              ]}
            />
          </TabsContent>

          <TabsContent value="technician">
            <RoleTrainingContent
              role="技术人员"
              description="技术人员培训专注于系统维护、故障排除、性能优化和技术支持等方面，保障系统的技术稳定性。"
              modules={[
                {
                  title: "系统架构与组件",
                  description: "了解系统整体架构和核心组件",
                  duration: "3小时",
                  format: "视频教程 + 技术文档",
                  topics: [
                    "系统架构概述",
                    "核心组件功能与关系",
                    "数据流与处理流程",
                    "技术栈与依赖关系",
                    "部署架构与环境要求",
                  ],
                },
                {
                  title: "系统监控与故障排除",
                  description: "掌握系统监控工具和故障诊断方法",
                  duration: "4小时",
                  format: "视频教程 + 实操练习 + 案例分析",
                  topics: [
                    "监控工具配置与使用",
                    "性能指标监测与分析",
                    "常见故障诊断流程",
                    "日志分析与问题定位",
                    "应急响应与处理",
                    "系统恢复与验证",
                  ],
                },
                {
                  title: "系统优化与扩展",
                  description: "学习系统性能优化和扩展方法",
                  duration: "3.5小时",
                  format: "视频教程 + 实操练习",
                  topics: [
                    "性能瓶颈识别与分析",
                    "数据库优化技术",
                    "缓存策略配置",
                    "负载均衡设置",
                    "系统扩容规划与实施",
                  ],
                },
                {
                  title: "安全加固与防护",
                  description: "掌握系统安全加固和防护措施",
                  duration: "3小时",
                  format: "视频教程 + 实操练习",
                  topics: ["安全漏洞扫描与修复", "访问控制加固", "数据加密实施", "安全防护配置", "安全事件响应流程"],
                },
              ]}
            />
          </TabsContent>
        </Tabs>
      </MedicalCard>
    </div>
  )
}

interface TrainingModule {
  title: string
  description: string
  duration: string
  format: string
  topics: string[]
}

interface RoleTrainingContentProps {
  role: string
  description: string
  modules: TrainingModule[]
}

function RoleTrainingContent({ role, description, modules }: RoleTrainingContentProps) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-xl font-bold text-blue-800">{role}培训计划</h3>
        <p className="mt-2 text-blue-700">{description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {modules.map((module, index) => (
          <MedicalCard key={index} className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
              <h4 className="text-lg font-bold text-white">{module.title}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">{module.duration}</span>
                <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">{module.format}</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4">{module.description}</p>
              <h5 className="font-semibold mb-2 flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                培训内容
              </h5>
              <ul className="space-y-1 mb-4">
                {module.topics.map((topic, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{topic}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>完成进度</span>
                  <span>0%</span>
                </div>
                <Progress value={0} className="h-2" />
                <Button className="w-full mt-4" size="sm">
                  开始学习
                </Button>
              </div>
            </div>
          </MedicalCard>
        ))}
      </div>
    </div>
  )
}
