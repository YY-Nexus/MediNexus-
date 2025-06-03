"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, Users, Clock, BarChart3 } from "lucide-react"

export default function SearchAnalyticsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">搜索分析中心</h1>
            <p className="text-muted-foreground">分析用户搜索行为和系统使用模式</p>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            实时分析
          </Badge>
        </div>

        {/* 搜索统计 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日搜索</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+18% 较昨日</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+5% 较上周</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均响应时间</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.8s</div>
              <p className="text-xs text-muted-foreground">-0.2s 较上月</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">搜索成功率</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">+1.5% 较上周</p>
            </CardContent>
          </Card>
        </div>

        {/* 搜索分析功能 */}
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends">搜索趋势</TabsTrigger>
            <TabsTrigger value="keywords">热门关键词</TabsTrigger>
            <TabsTrigger value="users">用户行为</TabsTrigger>
            <TabsTrigger value="performance">性能分析</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>搜索趋势分析</CardTitle>
                <CardDescription>分析搜索量变化趋势和热点话题</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">搜索趋势图表和分析...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>热门关键词</CardTitle>
                <CardDescription>最受欢迎的搜索关键词统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { keyword: "糖尿病", count: 1247, trend: "+12%" },
                    { keyword: "高血压", count: 986, trend: "+8%" },
                    { keyword: "心脏病", count: 743, trend: "+15%" },
                    { keyword: "肺炎", count: 652, trend: "+5%" },
                    { keyword: "癌症", count: 589, trend: "+22%" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <span className="font-medium">{item.keyword}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{item.count} 次</span>
                        <Badge variant="outline">{item.trend}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>用户行为分析</CardTitle>
                <CardDescription>分析用户搜索模式和使用习惯</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">用户行为分析报告...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>搜索性能分析</CardTitle>
                <CardDescription>搜索系统性能指标和优化建议</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">性能分析和优化建议...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
