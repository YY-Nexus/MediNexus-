"use client"

import { useState } from "react"
import { MedicalCard } from "@/components/ui/medical-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Video,
  FileText,
  CheckCircle,
  Clock,
  Users,
  Target,
  Edit,
  Download,
  Upload,
  Play,
} from "lucide-react"

export function ContentDevelopment() {
  const [selectedModule, setSelectedModule] = useState("clinician-basic")

  // 培训内容开发数据
  const contentModules = [
    {
      id: "clinician-basic",
      title: "临床医生基础培训",
      role: "临床医生",
      type: "基础培训",
      status: "completed",
      progress: 100,
      estimatedHours: 12,
      actualHours: 14,
      materials: {
        videos: 8,
        documents: 15,
        exercises: 12,
        assessments: 3,
      },
      lastUpdated: "2025-05-20",
      developer: "张医师团队",
      reviewer: "李教授",
      approver: "王主任",
    },
    {
      id: "nurse-advanced",
      title: "护理人员高级培训",
      role: "护理人员",
      type: "高级培训",
      status: "in-development",
      progress: 75,
      estimatedHours: 8,
      actualHours: 6,
      materials: {
        videos: 5,
        documents: 10,
        exercises: 8,
        assessments: 2,
      },
      lastUpdated: "2025-05-22",
      developer: "赵护士长团队",
      reviewer: "陈主任",
      approver: "待审批",
    },
    {
      id: "admin-security",
      title: "系统管理员安全培训",
      role: "系统管理员",
      type: "专项培训",
      status: "planning",
      progress: 25,
      estimatedHours: 16,
      actualHours: 4,
      materials: {
        videos: 2,
        documents: 5,
        exercises: 3,
        assessments: 1,
      },
      lastUpdated: "2025-05-18",
      developer: "刘工程师团队",
      reviewer: "待分配",
      approver: "待审批",
    },
  ]

  const selectedModuleData = contentModules.find((m) => m.id === selectedModule)

  return (
    <div className="space-y-6">
      <MedicalCard className="p-6">
        <h2 className="text-2xl font-bold mb-4">培训内容开发管理</h2>
        <p className="mb-6">
          系统化管理培训内容的开发流程，包括内容规划、制作、审核和发布。确保培训材料的质量和一致性，满足不同角色用户的学习需求。
        </p>

        <div className="grid gap-6 md:grid-cols-4">
          <MedicalCard className="bg-blue-50 border-blue-200">
            <div className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">内容模块</h3>
              <p className="text-2xl font-bold text-blue-900 mt-1">24</p>
              <p className="text-sm text-blue-600">总计开发中</p>
            </div>
          </MedicalCard>

          <MedicalCard className="bg-green-50 border-green-200">
            <div className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">已完成</h3>
              <p className="text-2xl font-bold text-green-900 mt-1">18</p>
              <p className="text-sm text-green-600">75% 完成率</p>
            </div>
          </MedicalCard>

          <MedicalCard className="bg-orange-50 border-orange-200">
            <div className="p-4 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-800">开发中</h3>
              <p className="text-2xl font-bold text-orange-900 mt-1">4</p>
              <p className="text-sm text-orange-600">预计2周完成</p>
            </div>
          </MedicalCard>

          <MedicalCard className="bg-purple-50 border-purple-200">
            <div className="p-4 text-center">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800">规划中</h3>
              <p className="text-2xl font-bold text-purple-900 mt-1">2</p>
              <p className="text-sm text-purple-600">待启动开发</p>
            </div>
          </MedicalCard>
        </div>
      </MedicalCard>

      <div className="grid gap-6 md:grid-cols-3">
        <MedicalCard className="md:col-span-1">
          <div className="p-4">
            <h3 className="text-lg font-bold mb-4">培训模块列表</h3>
            <div className="space-y-2">
              {contentModules.map((module) => (
                <div
                  key={module.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedModule === module.id ? "bg-blue-100 border-blue-300 border" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedModule(module.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{module.title}</h4>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        module.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : module.status === "in-development"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {module.status === "completed"
                        ? "已完成"
                        : module.status === "in-development"
                          ? "开发中"
                          : "规划中"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {module.role} • {module.type}
                  </div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>进度</span>
                    <span>{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-1" />
                </div>
              ))}
            </div>
          </div>
        </MedicalCard>

        <MedicalCard className="md:col-span-2">
          <div className="p-4">{selectedModuleData && <ContentModuleDetail module={selectedModuleData} />}</div>
        </MedicalCard>
      </div>

      <ContentDevelopmentWorkflow />
    </div>
  )
}

function ContentModuleDetail({ module }: { module: any }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{module.title}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span>角色: {module.role}</span>
            <span>类型: {module.type}</span>
            <span>更新: {module.lastUpdated}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4 mr-1" />
            编辑
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-1" />
            导出
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">开发进度</h4>
            <div className="flex justify-between text-sm mb-1">
              <span>整体完成度</span>
              <span>{module.progress}%</span>
            </div>
            <Progress value={module.progress} className="h-2" />
          </div>

          <div>
            <h4 className="font-semibold mb-2">时间统计</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>预估工时:</span>
                <span>{module.estimatedHours} 小时</span>
              </div>
              <div className="flex justify-between">
                <span>实际工时:</span>
                <span>{module.actualHours} 小时</span>
              </div>
              <div className="flex justify-between">
                <span>效率:</span>
                <span className={module.actualHours <= module.estimatedHours ? "text-green-600" : "text-red-600"}>
                  {((module.estimatedHours / module.actualHours) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">团队信息</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>开发团队:</span>
                <span>{module.developer}</span>
              </div>
              <div className="flex justify-between">
                <span>审核人员:</span>
                <span>{module.reviewer}</span>
              </div>
              <div className="flex justify-between">
                <span>审批人员:</span>
                <span>{module.approver}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">培训材料统计</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <Video className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                <p className="text-sm font-medium">视频教程</p>
                <p className="text-lg font-bold text-blue-800">{module.materials.videos}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <FileText className="h-5 w-5 text-green-600 mx-auto mb-1" />
                <p className="text-sm font-medium">文档资料</p>
                <p className="text-lg font-bold text-green-800">{module.materials.documents}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <Target className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                <p className="text-sm font-medium">练习题目</p>
                <p className="text-lg font-bold text-purple-800">{module.materials.exercises}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <CheckCircle className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                <p className="text-sm font-medium">评估测试</p>
                <p className="text-lg font-bold text-orange-800">{module.materials.assessments}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">快速操作</h4>
            <div className="space-y-2">
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                上传新材料
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Play className="h-4 w-4 mr-2" />
                预览内容
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                分配审核
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContentDevelopmentWorkflow() {
  return (
    <MedicalCard className="p-6">
      <h3 className="text-xl font-bold mb-4">内容开发工作流程</h3>
      <div className="grid gap-6 md:grid-cols-5">
        <div className="text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-blue-800 font-bold">1</span>
          </div>
          <h4 className="font-semibold mb-1">需求分析</h4>
          <p className="text-sm text-gray-600">分析培训需求，确定学习目标和内容范围</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-green-800 font-bold">2</span>
          </div>
          <h4 className="font-semibold mb-1">内容设计</h4>
          <p className="text-sm text-gray-600">设计课程结构，制定详细的内容大纲</p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-purple-800 font-bold">3</span>
          </div>
          <h4 className="font-semibold mb-1">材料制作</h4>
          <p className="text-sm text-gray-600">制作视频、文档、练习和评估材料</p>
        </div>
        <div className="text-center">
          <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-orange-800 font-bold">4</span>
          </div>
          <h4 className="font-semibold mb-1">质量审核</h4>
          <p className="text-sm text-gray-600">专家审核内容质量和准确性</p>
        </div>
        <div className="text-center">
          <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-red-800 font-bold">5</span>
          </div>
          <h4 className="font-semibold mb-1">发布上线</h4>
          <p className="text-sm text-gray-600">最终审批后发布到培训平台</p>
        </div>
      </div>
    </MedicalCard>
  )
}
