"use client"

import { useState } from "react"
import { MedicalCard } from "@/components/ui/medical-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Star, Award, Calendar, BookOpen, Phone, Mail, MapPin, TrendingUp } from "lucide-react"

export function TrainerManagement() {
  const [selectedTrainer, setSelectedTrainer] = useState("trainer-001")

  // 培训师数据
  const trainers = [
    {
      id: "trainer-001",
      name: "张医师",
      title: "主任医师",
      department: "内科",
      specialties: ["临床诊断", "AI辅助诊断", "患者管理"],
      experience: 15,
      rating: 4.9,
      totalSessions: 45,
      totalStudents: 320,
      certifications: ["医师资格证", "培训师认证", "AI诊断专家"],
      availability: "全职",
      contact: {
        phone: "138-0000-1234",
        email: "zhang.doctor@hospital.com",
        location: "北京协和医院",
      },
      recentSessions: [
        { date: "2025-05-20", topic: "AI辅助诊断基础", participants: 25, rating: 4.8 },
        { date: "2025-05-18", topic: "患者管理系统", participants: 30, rating: 4.9 },
        { date: "2025-05-15", topic: "临床决策支持", participants: 28, rating: 4.7 },
      ],
      performance: {
        punctuality: 98,
        preparation: 96,
        interaction: 94,
        feedback: 95,
      },
    },
    {
      id: "trainer-002",
      name: "李教授",
      title: "教授",
      department: "医学信息学",
      specialties: ["医学AI", "数据分析", "研究方法"],
      experience: 20,
      rating: 4.8,
      totalSessions: 38,
      totalStudents: 280,
      certifications: ["教授资格", "AI专家认证", "数据科学认证"],
      availability: "兼职",
      contact: {
        phone: "139-0000-5678",
        email: "li.professor@university.edu",
        location: "清华大学医学院",
      },
      recentSessions: [
        { date: "2025-05-19", topic: "医学数据分析", participants: 22, rating: 4.9 },
        { date: "2025-05-16", topic: "AI模型训练", participants: 18, rating: 4.8 },
        { date: "2025-05-12", topic: "研究方法论", participants: 20, rating: 4.7 },
      ],
      performance: {
        punctuality: 95,
        preparation: 98,
        interaction: 92,
        feedback: 96,
      },
    },
    {
      id: "trainer-003",
      name: "王工程师",
      title: "高级工程师",
      department: "信息技术部",
      specialties: ["系统管理", "网络安全", "技术支持"],
      experience: 12,
      rating: 4.7,
      totalSessions: 32,
      totalStudents: 180,
      certifications: ["系统架构师", "网络安全专家", "项目管理认证"],
      availability: "全职",
      contact: {
        phone: "137-0000-9012",
        email: "wang.engineer@company.com",
        location: "技术中心",
      },
      recentSessions: [
        { date: "2025-05-21", topic: "系统安全配置", participants: 15, rating: 4.8 },
        { date: "2025-05-17", topic: "用户权限管理", participants: 20, rating: 4.6 },
        { date: "2025-05-14", topic: "系统监控", participants: 18, rating: 4.7 },
      ],
      performance: {
        punctuality: 97,
        preparation: 94,
        interaction: 89,
        feedback: 92,
      },
    },
  ]

  const selectedTrainerData = trainers.find((t) => t.id === selectedTrainer)

  return (
    <div className="space-y-6">
      <MedicalCard className="p-6">
        <h2 className="text-2xl font-bold mb-4">培训师团队管理</h2>
        <p className="mb-6">
          建立专业的培训师团队，包括培训师选拔、认证、培训和绩效管理。确保培训质量和一致性，提供优质的培训服务。
        </p>

        <div className="grid gap-6 md:grid-cols-4">
          <MedicalCard className="bg-blue-50 border-blue-200">
            <div className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">培训师总数</h3>
              <p className="text-2xl font-bold text-blue-900 mt-1">12</p>
              <p className="text-sm text-blue-600">活跃培训师</p>
            </div>
          </MedicalCard>

          <MedicalCard className="bg-green-50 border-green-200">
            <div className="p-4 text-center">
              <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">平均评分</h3>
              <p className="text-2xl font-bold text-green-900 mt-1">4.8</p>
              <p className="text-sm text-green-600">满分5.0</p>
            </div>
          </MedicalCard>

          <MedicalCard className="bg-purple-50 border-purple-200">
            <div className="p-4 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800">本月培训</h3>
              <p className="text-2xl font-bold text-purple-900 mt-1">28</p>
              <p className="text-sm text-purple-600">场次</p>
            </div>
          </MedicalCard>

          <MedicalCard className="bg-orange-50 border-orange-200">
            <div className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-800">培训学员</h3>
              <p className="text-2xl font-bold text-orange-900 mt-1">856</p>
              <p className="text-sm text-orange-600">累计人次</p>
            </div>
          </MedicalCard>
        </div>
      </MedicalCard>

      <div className="grid gap-6 md:grid-cols-3">
        <MedicalCard className="md:col-span-1">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">培训师列表</h3>
              <Button size="sm">添加培训师</Button>
            </div>
            <div className="space-y-2">
              {trainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedTrainer === trainer.id
                      ? "bg-blue-100 border-blue-300 border"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTrainer(trainer.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{trainer.name}</h4>
                      <p className="text-sm text-gray-600">{trainer.title}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{trainer.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {trainer.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    {trainer.totalSessions} 场培训 • {trainer.totalStudents} 学员
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MedicalCard>

        <MedicalCard className="md:col-span-2">
          <div className="p-4">{selectedTrainerData && <TrainerDetail trainer={selectedTrainerData} />}</div>
        </MedicalCard>
      </div>

      <TrainerDevelopmentProgram />
    </div>
  )
}

function TrainerDetail({ trainer }: { trainer: any }) {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">基本信息</TabsTrigger>
        <TabsTrigger value="performance">绩效表现</TabsTrigger>
        <TabsTrigger value="schedule">培训安排</TabsTrigger>
        <TabsTrigger value="feedback">学员反馈</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-4">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{trainer.name}</h3>
              <p className="text-gray-600">
                {trainer.title} • {trainer.department}
              </p>
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{trainer.rating}</span>
                <span className="text-gray-500 ml-2">({trainer.totalSessions} 场培训)</span>
              </div>
            </div>
            <Badge variant={trainer.availability === "全职" ? "default" : "secondary"}>{trainer.availability}</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">专业领域</h4>
              <div className="flex flex-wrap gap-2">
                {trainer.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">认证资质</h4>
              <div className="space-y-1">
                {trainer.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Award className="h-4 w-4 text-blue-500 mr-2" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">联系方式</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{trainer.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{trainer.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{trainer.contact.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">经验统计</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>从业经验:</span>
                  <span>{trainer.experience} 年</span>
                </div>
                <div className="flex justify-between">
                  <span>培训场次:</span>
                  <span>{trainer.totalSessions} 场</span>
                </div>
                <div className="flex justify-between">
                  <span>培训学员:</span>
                  <span>{trainer.totalStudents} 人</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="performance" className="mt-4">
        <div className="space-y-6">
          <h3 className="text-lg font-bold">绩效表现分析</h3>

          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(trainer.performance).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    {key === "punctuality"
                      ? "准时性"
                      : key === "preparation"
                        ? "准备充分度"
                        : key === "interaction"
                          ? "互动性"
                          : "反馈质量"}
                  </span>
                  <span>{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-semibold mb-3">近期培训记录</h4>
            <div className="space-y-2">
              {trainer.recentSessions.map((session, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{session.topic}</p>
                    <p className="text-sm text-gray-600">
                      {session.date} • {session.participants} 人参与
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{session.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="schedule" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">培训安排</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">培训日程管理功能正在开发中，敬请期待...</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="feedback" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">学员反馈</h3>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800">学员反馈收集和分析功能正在开发中，敬请期待...</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

function TrainerDevelopmentProgram() {
  return (
    <MedicalCard className="p-6">
      <h3 className="text-xl font-bold mb-4">培训师发展计划</h3>
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
            选拔标准
          </h4>
          <ul className="space-y-2 text-sm">
            <li>• 相关领域专业背景和丰富经验</li>
            <li>• 良好的沟通表达和教学能力</li>
            <li>• 熟悉言语医枢³系统功能</li>
            <li>• 具备培训师资质或相关认证</li>
            <li>• 积极的学习态度和责任心</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <Award className="h-5 w-5 text-green-600 mr-2" />
            培训认证
          </h4>
          <ul className="space-y-2 text-sm">
            <li>• 培训师基础技能培训</li>
            <li>• 系统功能深度培训</li>
            <li>• 教学方法和技巧培训</li>
            <li>• 培训师认证考试</li>
            <li>• 持续教育和更新培训</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
            绩效管理
          </h4>
          <ul className="space-y-2 text-sm">
            <li>• 培训质量评估和反馈</li>
            <li>• 学员满意度调查</li>
            <li>• 培训效果跟踪分析</li>
            <li>• 绩效改进计划制定</li>
            <li>• 优秀培训师激励机制</li>
          </ul>
        </div>
      </div>
    </MedicalCard>
  )
}
