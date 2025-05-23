"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, TrendingUp, Clock, Search, Tag } from "lucide-react"
import { medicalStorage } from "@/lib/storage/localStorage"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"

type SearchHistoryItem = {
  query: string
  timestamp: number
  resultCount: number
}

type SearchAnalytics = {
  topQueries: { query: string; count: number }[]
  topCategories: { category: string; count: number }[]
  recentTrends: { query: string; growth: number }[]
}

export function SearchAnalytics() {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([])
  const [analytics, setAnalytics] = useState<SearchAnalytics>({
    topQueries: [],
    topCategories: [],
    recentTrends: [],
  })
  const router = useRouter()

  useEffect(() => {
    // 从本地存储加载搜索历史
    const storedHistory = medicalStorage.getItem<SearchHistoryItem[]>("searchHistory", [])
    setSearchHistory(storedHistory)

    // 生成分析数据（在实际应用中，这些数据可能来自后端API）
    generateAnalytics(storedHistory)
  }, [])

  // 生成分析数据
  const generateAnalytics = (history: SearchHistoryItem[]) => {
    // 计算查询频率
    const queryCounts: Record<string, number> = {}
    history.forEach((item) => {
      const query = item.query.toLowerCase()
      queryCounts[query] = (queryCounts[query] || 0) + 1
    })

    // 提取前5个最常搜索的查询
    const topQueries = Object.entries(queryCounts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // 模拟类别数据
    const categories = ["患者管理", "临床决策", "医学影像", "AI诊断", "药物管理", "实验室结果", "医疗报告"]
    const topCategories = categories
      .map((category) => ({
        category,
        count: Math.floor(Math.random() * 100) + 1,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // 模拟趋势数据
    const trendQueries = [
      "COVID-19 协议",
      "远程医疗",
      "AI 辅助诊断",
      "患者随访",
      "医疗保险",
      "电子处方",
      "医疗影像分析",
    ]
    const recentTrends = trendQueries
      .map((query) => ({
        query,
        growth: Math.floor(Math.random() * 200) - 50, // -50% 到 +150% 的增长率
      }))
      .sort((a, b) => b.growth - a.growth)
      .slice(0, 5)

    setAnalytics({
      topQueries,
      topCategories,
      recentTrends,
    })
  }

  // 清除搜索历史
  const clearSearchHistory = () => {
    setSearchHistory([])
    medicalStorage.setItem("searchHistory", [])
    // 重新生成分析数据
    generateAnalytics([])
  }

  // 执行搜索
  const executeSearch = (query: string) => {
    // 在实际应用中，这里可能会导航到搜索结果页面
    console.log(`Searching for: ${query}`)
    // 模拟导航到搜索页面
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  // 格式化时间戳
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>搜索分析</CardTitle>
        <CardDescription>查看搜索历史和趋势</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="history">
          <TabsList className="mb-4">
            <TabsTrigger value="history" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              搜索历史
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              搜索趋势
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              热门类别
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">最近的搜索</h3>
              {searchHistory.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearSearchHistory} className="h-7 text-xs">
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  清除历史
                </Button>
              )}
            </div>

            {searchHistory.length > 0 ? (
              <ScrollArea className="h-[300px] border rounded-md p-2">
                <div className="space-y-2">
                  {searchHistory.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      onClick={() => executeSearch(item.query)}
                    >
                      <div className="flex items-center">
                        <Search className="h-4 w-4 mr-2 text-gray-500" />
                        <div>
                          <div className="font-medium">{item.query}</div>
                          <div className="text-xs text-gray-500">
                            {formatTimestamp(item.timestamp)} · {item.resultCount} 结果
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>暂无搜索历史</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trends">
            <h3 className="text-sm font-medium mb-2">搜索趋势</h3>
            <div className="space-y-2">
              {analytics.recentTrends.map((trend, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => executeSearch(trend.query)}
                >
                  <div className="flex items-center">
                    <TrendingUp className={`h-4 w-4 mr-2 ${trend.growth > 0 ? "text-green-500" : "text-red-500"}`} />
                    <span>{trend.query}</span>
                  </div>
                  <Badge
                    variant={trend.growth > 0 ? "default" : "destructive"}
                    className={trend.growth > 0 ? "bg-green-100 text-green-800" : ""}
                  >
                    {trend.growth > 0 ? "+" : ""}
                    {trend.growth}%
                  </Badge>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-medium mt-4 mb-2">热门搜索</h3>
            <div className="space-y-2">
              {analytics.topQueries.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => executeSearch(item.query)}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-2 text-xs font-medium">
                      {index + 1}
                    </div>
                    <span>{item.query}</span>
                  </div>
                  <Badge variant="outline">{item.count} 次</Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <h3 className="text-sm font-medium mb-2">热门类别</h3>
            <div className="space-y-2">
              {analytics.topCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => executeSearch(category.category)}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mr-2 text-xs font-medium">
                      {index + 1}
                    </div>
                    <span>{category.category}</span>
                  </div>
                  <Badge variant="outline">{category.count} 次</Badge>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
