"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Video, FileText, Download, Search, Star, Clock, CheckCircle, Play, Eye, Share } from "lucide-react"

interface EducationMaterial {
  id: string
  title: string
  type: "document" | "video" | "interactive" | "quiz"
  category: string
  description: string
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  rating: number
  completionRate: number
  isAssigned: boolean
  isCompleted: boolean
  lastAccessed?: Date
  tags: string[]
}

interface PatientEducationMaterialsProps {
  patientId: string
}

export default function PatientEducationMaterials({ patientId }: PatientEducationMaterialsProps) {
  const [materials, setMaterials] = useState<EducationMaterial[]>([])
  const [filteredMaterials, setFilteredMaterials] = useState<EducationMaterial[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  // 模拟教育材料数据
  useEffect(() => {
    const mockMaterials: EducationMaterial[] = [
      {
        id: "1",
        title: "高血压患者日常管理指南",
        type: "document",
        category: "心血管疾病",
        description: "详细介绍高血压患者的日常生活管理要点，包括饮食、运动、用药等方面的指导。",
        duration: "15分钟",
        difficulty: "beginner",
        rating: 4.8,
        completionRate: 85,
        isAssigned: true,
        isCompleted: true,
        lastAccessed: new Date("2024-01-15"),
        tags: ["高血压", "日常管理", "生活方式"],
      },
      {
        id: "2",
        title: "糖尿病饮食控制视频教程",
        type: "video",
        category: "内分泌疾病",
        description: "专业营养师讲解糖尿病患者的饮食原则和实用技巧。",
        duration: "25分钟",
        difficulty: "intermediate",
        rating: 4.6,
        completionRate: 60,
        isAssigned: true,
        isCompleted: false,
        lastAccessed: new Date("2024-01-10"),
        tags: ["糖尿病", "饮食控制", "营养"],
      },
      {
        id: "3",
        title: "心脏康复运动计划",
        type: "interactive",
        category: "康复训练",
        description: "个性化的心脏康复运动指导，包括运动强度和频率建议。",
        duration: "30分钟",
        difficulty: "intermediate",
        rating: 4.9,
        completionRate: 40,
        isAssigned: false,
        isCompleted: false,
        tags: ["心脏康复", "运动", "康复训练"],
      },
      {
        id: "4",
        title: "用药安全知识测验",
        type: "quiz",
        category: "用药指导",
        description: "测试患者对用药安全知识的掌握程度。",
        duration: "10分钟",
        difficulty: "beginner",
        rating: 4.5,
        completionRate: 90,
        isAssigned: true,
        isCompleted: false,
        tags: ["用药安全", "测验", "知识检测"],
      },
      {
        id: "5",
        title: "慢性病自我监测指南",
        type: "document",
        category: "自我管理",
        description: "教授患者如何进行日常健康监测和记录。",
        duration: "20分钟",
        difficulty: "beginner",
        rating: 4.7,
        completionRate: 75,
        isAssigned: false,
        isCompleted: false,
        tags: ["自我监测", "慢性病", "健康记录"],
      },
    ]

    setTimeout(() => {
      setMaterials(mockMaterials)
      setFilteredMaterials(mockMaterials)
      setLoading(false)
    }, 1000)
  }, [patientId])

  // 搜索和筛选
  useEffect(() => {
    let filtered = materials

    if (searchTerm) {
      filtered = filtered.filter(
        (material) =>
          material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          material.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((material) => material.category === selectedCategory)
    }

    setFilteredMaterials(filtered)
  }, [materials, searchTerm, selectedCategory])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "interactive":
        return <Play className="h-4 w-4" />
      case "quiz":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "document":
        return "文档"
      case "video":
        return "视频"
      case "interactive":
        return "互动"
      case "quiz":
        return "测验"
      default:
        return "未知"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "初级"
      case "intermediate":
        return "中级"
      case "advanced":
        return "高级"
      default:
        return "未知"
    }
  }

  const categories = ["all", ...Array.from(new Set(materials.map((m) => m.category)))]
  const assignedMaterials = materials.filter((m) => m.isAssigned)
  const completedMaterials = materials.filter((m) => m.isCompleted)
  const overallProgress =
    assignedMaterials.length > 0 ? (completedMaterials.length / assignedMaterials.length) * 100 : 0

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            患者教育材料
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* 学习进度概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            患者教育材料管理
          </CardTitle>
          <CardDescription>为患者提供个性化的健康教育内容和学习跟踪</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{assignedMaterials.length}</p>
              <p className="text-sm text-gray-500">已分配材料</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{completedMaterials.length}</p>
              <p className="text-sm text-gray-500">已完成学习</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {assignedMaterials.length - completedMaterials.length}
              </p>
              <p className="text-sm text-gray-500">待学习</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{Math.round(overallProgress)}%</p>
              <p className="text-sm text-gray-500">完成率</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>总体学习进度</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索教育材料..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "全部" : category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 教育材料列表 */}
      <Tabs defaultValue="assigned" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assigned">已分配材料</TabsTrigger>
          <TabsTrigger value="available">可用材料</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
        </TabsList>

        <TabsContent value="assigned" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMaterials
              .filter((m) => m.isAssigned && !m.isCompleted)
              .map((material) => (
                <Card key={material.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(material.type)}
                        <Badge variant="outline">{getTypeText(material.type)}</Badge>
                      </div>
                      <Badge className={getDifficultyColor(material.difficulty)}>
                        {getDifficultyText(material.difficulty)}
                      </Badge>
                    </div>

                    <h3 className="font-semibold mb-2">{material.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{material.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {material.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {material.rating}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>完成进度</span>
                        <span>{material.completionRate}%</span>
                      </div>
                      <Progress value={material.completionRate} className="h-1" />
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Play className="h-3 w-3 mr-1" />
                        继续学习
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMaterials
              .filter((m) => !m.isAssigned)
              .map((material) => (
                <Card key={material.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(material.type)}
                        <Badge variant="outline">{getTypeText(material.type)}</Badge>
                      </div>
                      <Badge className={getDifficultyColor(material.difficulty)}>
                        {getDifficultyText(material.difficulty)}
                      </Badge>
                    </div>

                    <h3 className="font-semibold mb-2">{material.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{material.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {material.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {material.rating}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {material.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        分配给患者
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMaterials
              .filter((m) => m.isCompleted)
              .map((material) => (
                <Card key={material.id} className="hover:shadow-md transition-shadow border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(material.type)}
                        <Badge variant="outline">{getTypeText(material.type)}</Badge>
                        <Badge className="bg-green-100 text-green-800">已完成</Badge>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>

                    <h3 className="font-semibold mb-2">{material.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{material.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {material.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {material.rating}
                      </div>
                    </div>

                    {material.lastAccessed && (
                      <p className="text-xs text-gray-500 mb-4">
                        最后访问：{material.lastAccessed.toLocaleDateString("zh-CN")}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        重新学习
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
