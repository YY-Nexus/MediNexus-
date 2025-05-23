"use client"

import { useState } from "react"
import { MedicalCard } from "@/components/ui/medical-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Calendar, CheckCircle, TrendingUp, MessageSquare, BarChart3 } from "lucide-react"

export function PilotImplementation() {
  const [selectedPilot, setSelectedPilot] = useState("pilot-001")

  // 试点项目数据
  const pilotProjects = [
    {
      id: "pilot-001",
      name: "北京协和医院试点",
      location: "北京协和医院",
      startDate: "2025-05-01",
      endDate: "2025-06-30",
      status: "active",
      progress: 65,
      participants: {
        total: 45,
        clinicians: 20,
        nurses: 15,
        admins: 5,
        researchers: 5,
      },
      modules: [
        { name: "系统基础培训", status: "completed", participants: 45, satisfaction: 4.6 },
        { name: "临床医生专项培训", status: "active", participants: 20, satisfaction: 4.4 },
        { name: "护理人员专项培训", status: "active", participants: 15, satisfaction: 4.5 },
        { name: "管理员培训", status: "pending", participants: 5, satisfaction: null },
      ],
      feedback: {
        positive: 78,
        neutral: 18,
        negative: 4,
      },
      issues: [
        { type: "technical", description: "系统响应速度偏慢", priority: "high", status: "resolved" },
        { type: "content", description: "部分培训内容过于复杂", priority: "medium", status: "in-progress" },
        { type: "schedule", description: "培训时间安排冲突", priority: "low", status: "resolved" },
      ],
    },
    {
      id: "pilot-002",
      name: "上海华山医院试点",
      location: "上海华山医院",
      startDate: "2025-05-15",
      endDate: "2025-07-15",
      status: "planning",
      progress: 25,
      participants: {
        total: 38,
        clinicians: 18,
        nurses: 12,
        admins: 4,
        researchers: 4,
      },
      modules: [
        { name: "系统基础培训", status: "scheduled", participants: 38, satisfaction: null },
        { name: "临床医生专项培训", status: "scheduled", participants: 18, satisfaction: null },
        { name: "护理人员专项培训", status: "scheduled", participants: 12, satisfaction: null },
        { name: "管理员培训", status: "scheduled", participants: 4, satisfaction: null },
      ],
      feedback: {
        positive: 0,
        neutral: 0,
        negative: 0,
      },
      issues: [],
    },
  ]

  const selectedPilotData = pilotProjects.find((p) => p.id === selectedPilot)

  return (
    <div className="space-y-6">
      <MedicalCard className="p-6">
        <h2 className="text-2xl font-bold mb-4">试点实施管理</h2>
        <p className="mb-6">
          在小范围内试行培训计划，收集反馈并持续优化。通过试点项目验证培训方案的有效性，为大规模推广做好准备。
        </p>

        <div className="grid gap-6 md:grid-cols-4">
          <MedicalCard className="bg-blue-50 border-blue-200">
            <div className="p-4 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">试点项目</h3>
              <p className="text-2xl font-bold text-blue-900 mt-1">3</p>
              <p className="text-sm text-blue-600">进行中</p>
            </div>
          </MedicalCard>

          <MedicalCard className="bg-green-50 border-green-200">
            <div className="p-4 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">参与人员</h3>
              <p className="text-2xl font-bold text-green-900 mt-1">128</p>
              <p className="text-sm text-green-600">累计参与</p>
            </div>
          </MedicalCard>

          <MedicalCard className="bg-purple-50 border-purple-200">
            <div className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800">完成率</h3>
              <p className="text-2xl font-bold text-purple-900 mt-1">85%</p>
              <p className="text-sm text-purple-600">平均完成率</p>
            </div>
          </MedicalCard>

          <MedicalCard className="bg-orange-50 border-orange-200">
            <div className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-800">满意度</h3>
              <p className="text-2xl font-bold text-orange-900 mt-1">4.5</p>
              <p className="text-sm text-orange-600">平均评分</p>
            </div>
          </MedicalCard>
        </div>
      </MedicalCard>

      <div className="grid gap-6 md:grid-cols-3">
        <MedicalCard className="md:col-span-1">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">试点项目</h3>
              <Button size="sm">新建试点</Button>
            </div>
            <div className="space-y-2">
              {pilotProjects.map((pilot) => (
                <div
                  key={pilot.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedPilot === pilot.id ? "bg-blue-100 border-blue-300 border" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedPilot(pilot.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{pilot.name}</h4>
                    <Badge
                      variant={
                        pilot.status === "active" ? "default" : pilot.status === "completed" ? "secondary" : "outline"
                      }
                    >
                      {pilot.status === "active" ? "进行中" : pilot.status === "completed" ? "已完成" : "规划中"}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">{pilot.location}</div>
                  <div className="text-xs text-gray-500 mb-2">
                    {pilot.startDate} - {pilot.endDate}
                  </div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>进度</span>
                    <span>{pilot.progress}%</span>
                  </div>
                  <Progress value={pilot.progress} className="h-1" />
                  <div className="text-xs text-gray-500 mt-1">{pilot.participants.total} 人参与</div>
                </div>
              ))}
            </div>
          </div>
        </MedicalCard>

        <MedicalCard className="md:col-span-2">
          <div className="p-4">{selectedPilotData && <PilotProjectDetail pilot={selectedPilotData} />}</div>
        </MedicalCard>
      </div>

      <PilotBestPractices />
    </div>
  )
}

function PilotProjectDetail({ pilot }: { pilot: any }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">项目概览</TabsTrigger>
        <TabsTrigger value="progress">培训进度</TabsTrigger>
        <TabsTrigger value="feedback">反馈收集</TabsTrigger>
        <TabsTrigger value="issues">问题跟踪</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-4">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{pilot.name}</h3>
              <p className="text-gray-600">{pilot.location}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {pilot.startDate} - {pilot.endDate}
                </span>
              </div>
            </div>
            <Badge
              variant={pilot.status === "active" ? "default" : pilot.status === "completed" ? "secondary" : "outline"}
            >
              {pilot.status === "active" ? "进行中" : pilot.status === "completed" ? "已完成" : "规划中"}
            </Badge>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>项目进度</span>
              <span>{pilot.progress}%</span>
            </div>
            <Progress value={pilot.progress} className="h-3" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-3">参与人员分布</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">临床医生</span>
                  <span className="font-medium">{pilot.participants.clinicians} 人</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">护理人员</span>
                  <span className="font-medium">{pilot.participants.nurses} 人</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">管理员</span>
                  <span className="font-medium">{pilot.participants.admins} 人</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">研究人员</span>
                  <span className="font-medium">{pilot.participants.researchers} 人</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center font-semibold">
                  <span>总计</span>
                  <span>{pilot.participants.total} 人</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">反馈分布</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-600">积极反馈</span>
                  <span className="font-medium">{pilot.feedback.positive}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">中性反馈</span>
                  <span className="font-medium">{pilot.feedback.neutral}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-600">消极反馈</span>
                  <span className="font-medium">{pilot.feedback.negative}%</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-l-full"
                    style={{ width: `${pilot.feedback.positive}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="progress" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">培训模块进度</h3>
          <div className="space-y-3">
            {pilot.modules.map((module, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{module.name}</h4>
                  <Badge
                    variant={
                      module.status === "completed" ? "default" : module.status === "active" ? "secondary" : "outline"
                    }
                  >
                    {module.status === "completed"
                      ? "已完成"
                      : module.status === "active"
                        ? "进行中"
                        : module.status === "pending"
                          ? "待开始"
                          : "已安排"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{module.participants} 人参与</span>
                  {module.satisfaction && <span>满意度: {module.satisfaction}/5.0</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="feedback" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">反馈收集</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">详细的反馈收集和分析功能正在开发中，敬请期待...</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="issues" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">问题跟踪</h3>
          {pilot.issues.length > 0 ? (
            <div className="space-y-3">
              {pilot.issues.map((issue, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{issue.description}</h4>
                      <p className="text-sm text-gray-600">
                        类型:{" "}
                        {issue.type === "technical" ? "技术问题" : issue.type === "content" ? "内容问题" : "时间安排"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          issue.priority === "high"
                            ? "destructive"
                            : issue.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {issue.priority === "high" ? "高优先级" : issue.priority === "medium" ? "中优先级" : "低优先级"}
                      </Badge>
                      <Badge
                        variant={
                          issue.status === "resolved"
                            ? "default"
                            : issue.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {issue.status === "resolved" ? "已解决" : issue.status === "in-progress" ? "处理中" : "待处理"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">暂无问题记录</div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}

function PilotBestPractices() {
  return (
    <MedicalCard className="p-6">
      <h3 className="text-xl font-bold mb-4">试点实施最佳实践</h3>
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <Target className="h-5 w-5 text-blue-600 mr-2" />
            试点规划
          </h4>
          <ul className="space-y-2 text-sm">
            <li>• 明确试点目标和成功标准</li>
            <li>• 选择代表性的试点机构</li>
            <li>• 制定详细的实施计划</li>
            <li>• 确保充足的资源投入</li>
            <li>• 建立有效的沟通机制</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <MessageSquare className="h-5 w-5 text-green-600 mr-2" />
            反馈收集
          </h4>
          <ul className="space-y-2 text-sm">
            <li>• 多渠道收集用户反馈</li>
            <li>• 定期进行满意度调查</li>
            <li>• 记录和分析问题反馈</li>
            <li>• 及时响应用户需求</li>
            <li>• 建立反馈闭环机制</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
            持续改进
          </h4>
          <ul className="space-y-2 text-sm">
            <li>• 定期评估试点效果</li>
            <li>• 快速迭代优化方案</li>
            <li>• 总结经验和教训</li>
            <li>• 制定改进措施</li>
            <li>• 为推广做好准备</li>
          </ul>
        </div>
      </div>
    </MedicalCard>
  )
}
