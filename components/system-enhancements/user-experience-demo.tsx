"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sparkles,
  History,
  Heart,
  Star,
  Clock,
  ArrowRight,
  ChevronRight,
  Zap,
  Bookmark,
  BarChart,
  PieChart,
  LineChart,
  TrendingUp,
} from "lucide-react"
import { microInteractionManager } from "@/lib/ui/micro-interactions"
import { recommendationService, type RecommendationItem } from "@/lib/personalization/recommendation-service"
import { motion } from "framer-motion"

// 模拟推荐项目
const mockRecommendations: RecommendationItem[] = [
  {
    id: "rec1",
    type: "article",
    title: "人工智能在医疗诊断中的应用",
    description: "探索AI如何改变医疗诊断流程和提高准确率",
    features: { ai: 0.9, diagnosis: 0.8, technology: 0.7 },
    url: "/articles/ai-in-diagnosis",
    imageUrl: "/placeholder.svg?key=zvkjx",
    tags: ["AI", "诊断", "技术"],
  },
  {
    id: "rec2",
    type: "tool",
    title: "患者数据分析工具",
    description: "强大的数据分析工具，帮助医生更好地理解患者健康趋势",
    features: { data: 0.9, analysis: 0.8, patient: 0.7 },
    url: "/tools/patient-data-analysis",
    imageUrl: "/placeholder.svg?key=mskqn",
    tags: ["数据", "分析", "患者"],
  },
  {
    id: "rec3",
    type: "dashboard",
    title: "临床决策支持仪表板",
    description: "整合患者数据和医学知识的决策支持系统",
    features: { clinical: 0.9, decision: 0.8, dashboard: 0.7 },
    url: "/dashboards/clinical-decision",
    imageUrl: "/placeholder.svg?key=6n5gk",
    tags: ["临床", "决策", "仪表板"],
  },
  {
    id: "rec4",
    type: "article",
    title: "远程医疗最佳实践",
    description: "提高远程医疗效果的实用指南和技巧",
    features: { telemedicine: 0.9, practice: 0.8, remote: 0.7 },
    url: "/articles/telemedicine-best-practices",
    imageUrl: "/placeholder-8wuu8.png",
    tags: ["远程医疗", "最佳实践"],
  },
  {
    id: "rec5",
    type: "tool",
    title: "医学图像分析器",
    description: "使用AI技术分析和解释医学图像",
    features: { imaging: 0.9, analysis: 0.8, ai: 0.7 },
    url: "/tools/medical-image-analyzer",
    imageUrl: "/medical-image.png",
    tags: ["医学图像", "AI", "分析"],
  },
]

// 模拟导航历史
const mockNavigationHistory = [
  {
    path: "/dashboard",
    title: "仪表板",
    timestamp: Date.now() - 1000 * 60 * 5,
  },
  {
    path: "/patients",
    title: "患者列表",
    timestamp: Date.now() - 1000 * 60 * 10,
  },
  {
    path: "/patients/123",
    title: "患者详情 - 张三",
    timestamp: Date.now() - 1000 * 60 * 15,
  },
  {
    path: "/medical-records/456",
    title: "医疗记录 #456",
    timestamp: Date.now() - 1000 * 60 * 20,
  },
  {
    path: "/analytics",
    title: "数据分析",
    timestamp: Date.now() - 1000 * 60 * 25,
  },
]

// 格式化日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function UserExperienceDemo() {
  const [activeTab, setActiveTab] = useState("micro-interactions")
  const [userPreferences, setUserPreferences] = useState({
    ai: 0.7,
    clinical: 0.8,
    research: 0.5,
    telemedicine: 0.6,
    imaging: 0.9,
  })
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([])
  const [navigationHistory, setNavigationHistory] = useState(mockNavigationHistory)

  // 微交互元素引用
  const buttonRef = useRef<HTMLButtonElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  // 初始化推荐服务
  useEffect(() => {
    recommendationService.setItems(mockRecommendations)

    // 获取推荐
    const userId = "user123" // 模拟用户ID
    const recs = recommendationService.getRecommendations(userId, 3)
    setRecommendations(recs)
  }, [])

  // 设置微交互
  useEffect(() => {
    if (buttonRef.current) {
      microInteractionManager.register({
        id: "button-pulse",
        type: "click",
        element: buttonRef.current,
        animation: (el) => {
          el.classList.add("animate-pulse")
        },
        cleanup: (el) => {
          setTimeout(() => {
            el.classList.remove("animate-pulse")
          }, 500)
        },
        options: {
          duration: 500,
        },
      })
    }

    if (cardRef.current) {
      microInteractionManager.register({
        id: "card-hover",
        type: "hover",
        element: cardRef.current,
        animation: (el) => {
          el.classList.add("scale-105")
          el.classList.add("shadow-lg")
          el.style.transition = "transform 0.3s ease, box-shadow 0.3s ease"
        },
        cleanup: (el) => {
          el.classList.remove("scale-105")
          el.classList.remove("shadow-lg")
        },
        options: {
          duration: 300,
        },
      })
    }

    if (badgeRef.current) {
      microInteractionManager.register({
        id: "badge-bounce",
        type: "click",
        element: badgeRef.current,
        animation: (el) => {
          el.classList.add("animate-bounce")
        },
        cleanup: (el) => {
          setTimeout(() => {
            el.classList.remove("animate-bounce")
          }, 1000)
        },
        options: {
          duration: 1000,
        },
      })
    }

    return () => {
      microInteractionManager.unregister("button-pulse")
      microInteractionManager.unregister("card-hover")
      microInteractionManager.unregister("badge-bounce")
    }
  }, [])

  // 处理推荐项点击
  const handleRecommendationClick = (item: RecommendationItem) => {
    // 记录用户行为
    recommendationService.recordUserAction("user123", item.id, "click", 1.5)

    // 更新推荐
    const updatedRecs = recommendationService.getRecommendations("user123", 3)
    setRecommendations(updatedRecs)
  }

  return (
    <div className="grid gap-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="micro-interactions">微交互</TabsTrigger>
          <TabsTrigger value="navigation-history">导航历史</TabsTrigger>
          <TabsTrigger value="personalization">个性化推荐</TabsTrigger>
        </TabsList>

        <TabsContent value="micro-interactions">
          <Card>
            <CardHeader>
              <CardTitle>微交互示例</CardTitle>
              <CardDescription>增强用户体验的细微交互效果</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">按钮交互</h3>
                <p className="text-sm text-muted-foreground">点击按钮查看脉冲效果</p>
                <Button ref={buttonRef} className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  点击查看效果
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">卡片悬停效果</h3>
                <p className="text-sm text-muted-foreground">将鼠标悬停在卡片上查看效果</p>
                <div ref={cardRef} className="p-4 border rounded-md bg-card cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">交互式卡片</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">这张卡片有悬停效果，将鼠标放在上面查看变化</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">徽章动画</h3>
                <p className="text-sm text-muted-foreground">点击徽章查看弹跳效果</p>
                <div ref={badgeRef} className="inline-block cursor-pointer">
                  <Badge className="bg-primary">点击我</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">动画过渡</h3>
                <p className="text-sm text-muted-foreground">查看元素的平滑过渡效果</p>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="p-4 border rounded-md flex items-center justify-center"
                      whileHover={{ scale: 1.05, backgroundColor: "var(--primary-50)" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      项目 {i}
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">微交互提供即时视觉反馈，增强用户体验和界面的交互性</p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="navigation-history">
          <Card>
            <CardHeader>
              <CardTitle>导航历史管理</CardTitle>
              <CardDescription>跟踪和管理用户导航历史</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <History className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">最近访问页面</h3>
              </div>

              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  {navigationHistory.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                      onClick={() => {
                        // 模拟导航
                        const newHistory = [...navigationHistory]
                        const item = newHistory.splice(index, 1)[0]
                        item.timestamp = Date.now()
                        newHistory.unshift(item)
                        setNavigationHistory(newHistory)
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{entry.title}</p>
                          <p className="text-xs text-muted-foreground">{entry.path}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex justify-between">
                <Button variant="outline" className="gap-2">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  后退
                </Button>
                <Button variant="outline" className="gap-2">
                  前进
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">导航历史管理允许用户轻松回到之前访问的页面，提高工作效率</p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="personalization">
          <Card>
            <CardHeader>
              <CardTitle>个性化推荐</CardTitle>
              <CardDescription>基于用户偏好的智能内容推荐</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">您的兴趣偏好</h3>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(userPreferences).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`pref-${key}`} className="capitalize">
                            {key}
                          </Label>
                          <span className="text-sm">{Math.round(value * 100)}%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${value * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">兴趣分布</h3>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <PieChart className="h-4 w-4" />
                      饼图
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <BarChart className="h-4 w-4" />
                      柱状图
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <LineChart className="h-4 w-4" />
                      折线图
                    </Button>
                  </div>

                  <div className="aspect-square bg-muted/50 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 text-primary/50 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">兴趣分布图表</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">为您推荐</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {recommendations.map((item) => (
                    <motion.div
                      key={item.id}
                      className="border rounded-md overflow-hidden cursor-pointer"
                      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      onClick={() => handleRecommendationClick(item)}
                    >
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-primary/90">{item.type}</Badge>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {item.tags?.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-2">
                <Bookmark className="h-4 w-4" />
                保存偏好
              </Button>
              <Button className="gap-2">
                <Heart className="h-4 w-4" />
                更多推荐
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
