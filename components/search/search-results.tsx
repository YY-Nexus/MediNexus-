"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  User,
  FileText,
  Activity,
  Calendar,
  Pill,
  BookOpen,
  SlidersHorizontal,
  Clock,
  TrendingUp,
} from "lucide-react"
import { MedicalCard } from "@/components/ui/medical-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDebounce } from "@/hooks/useDebounce"

interface SearchResult {
  id: string
  title: string
  description: string
  type: string
  date: string
  relevance: number
  category: string
  icon: React.ReactNode
}

export function SearchResults({
  query,
  type = "all",
  sort = "relevance",
}: {
  query: string
  type?: string
  sort?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(query)
  const [searchType, setSearchType] = useState(type)
  const [sortOrder, setSortOrder] = useState(sort)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])

  const debouncedQuery = useDebounce(searchQuery, 300)

  // 模拟搜索结果数据
  const mockResults: SearchResult[] = [
    {
      id: "1",
      title: "张三",
      description: "患者ID: P12345 • 男 • 45岁 • 最近就诊: 2023-05-15",
      type: "patient",
      date: "2023-05-15",
      relevance: 95,
      category: "患者",
      icon: <User className="h-4 w-4 text-blue-500" />,
    },
    {
      id: "2",
      title: "李四的心电图报告",
      description: "患者: 李四 • 检查日期: 2023-06-10 • 医生: 王医生",
      type: "document",
      date: "2023-06-10",
      relevance: 88,
      category: "文档",
      icon: <FileText className="h-4 w-4 text-green-500" />,
    },
    {
      id: "3",
      title: "心肌梗塞诊断指南",
      description: "最后更新: 2023-04-20 • 版本: 3.2 • 参考文献: 15",
      type: "guideline",
      date: "2023-04-20",
      relevance: 75,
      category: "指南",
      icon: <BookOpen className="h-4 w-4 text-purple-500" />,
    },
    {
      id: "4",
      title: "高血压治疗方案",
      description: "适用范围: 成人高血压 • 推荐级别: A • 更新日期: 2023-03-10",
      type: "treatment",
      date: "2023-03-10",
      relevance: 70,
      category: "治疗",
      icon: <Activity className="h-4 w-4 text-red-500" />,
    },
    {
      id: "5",
      title: "王五的预约",
      description: "患者: 王五 • 预约时间: 2023-07-20 10:30 • 科室: 心内科",
      type: "appointment",
      date: "2023-07-20",
      relevance: 65,
      category: "预约",
      icon: <Calendar className="h-4 w-4 text-orange-500" />,
    },
    {
      id: "6",
      title: "阿司匹林用药指导",
      description: "药品类别: 抗血小板药物 • 常见副作用: 胃部不适 • 禁忌症: 胃溃疡",
      type: "medication",
      date: "2023-02-15",
      relevance: 60,
      category: "药物",
      icon: <Pill className="h-4 w-4 text-cyan-500" />,
    },
  ]

  // 模拟搜索API调用
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([])
      return
    }

    const fetchResults = async () => {
      setIsLoading(true)

      // 模拟API延迟
      await new Promise((resolve) => setTimeout(resolve, 800))

      // 过滤结果
      let filteredResults = [...mockResults]

      if (searchType !== "all") {
        filteredResults = filteredResults.filter((result) => result.type === searchType)
      }

      // 排序结果
      if (sortOrder === "relevance") {
        filteredResults.sort((a, b) => b.relevance - a.relevance)
      } else if (sortOrder === "date") {
        filteredResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }

      setResults(filteredResults)
      setIsLoading(false)
    }

    fetchResults()
  }, [debouncedQuery, searchType, sortOrder])

  // 更新URL参数
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (searchQuery) {
      params.set("q", searchQuery)
    } else {
      params.delete("q")
    }

    if (searchType !== "all") {
      params.set("type", searchType)
    } else {
      params.delete("type")
    }

    if (sortOrder !== "relevance") {
      params.set("sort", sortOrder)
    } else {
      params.delete("sort")
    }

    router.push(`/search?${params.toString()}`)
  }, [debouncedQuery, searchType, sortOrder, router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 搜索已经通过useEffect和debounce处理
  }

  const handleTypeChange = (value: string) => {
    setSearchType(value)
  }

  const handleSortChange = (value: string) => {
    setSortOrder(value)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索患者、文档、诊断..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit">搜索</Button>
      </form>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs defaultValue={searchType} onValueChange={handleTypeChange} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="patient">患者</TabsTrigger>
            <TabsTrigger value="document">文档</TabsTrigger>
            <TabsTrigger value="guideline">指南</TabsTrigger>
            <TabsTrigger value="medication">药物</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <Select value={sortOrder} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>相关性</span>
                </div>
              </SelectItem>
              <SelectItem value="date">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>日期</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          // 加载状态
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-2">
                <Skeleton className="h-6 w-2/5" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex gap-2 mt-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
              </div>
            ))
        ) : results.length > 0 ? (
          // 搜索结果
          results.map((result) => (
            <MedicalCard key={result.id} className="p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {result.icon}
                  <h3 className="text-lg font-medium">{result.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{result.description}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="outline" className="flex items-center gap-1">
                    {result.category}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {result.date}
                  </Badge>
                </div>
              </div>
            </MedicalCard>
          ))
        ) : debouncedQuery ? (
          // 无结果
          <div className="text-center py-8">
            <Search className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">未找到结果</h3>
            <p className="text-muted-foreground">
              没有找到与 "{debouncedQuery}" 相关的{searchType !== "all" ? ` ${getTypeLabel(searchType)}` : ""}结果
            </p>
          </div>
        ) : (
          // 初始状态
          <div className="text-center py-8">
            <Search className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">输入关键词开始搜索</h3>
            <p className="text-muted-foreground">搜索患者、文档、诊断、药物等信息</p>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button variant="outline">加载更多结果</Button>
        </div>
      )}
    </div>
  )
}

function getTypeLabel(type: string): string {
  const typeMap: Record<string, string> = {
    patient: "患者",
    document: "文档",
    guideline: "指南",
    treatment: "治疗",
    appointment: "预约",
    medication: "药物",
  }

  return typeMap[type] || type
}
