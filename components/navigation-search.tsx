"use client"

import type React from "react"
import { useState, useEffect, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Search,
  Star,
  ArrowRight,
  FileText,
  Keyboard,
  Clock,
  X,
  Filter,
  Zap,
  Trash2,
  RotateCcw,
  Settings,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { navItems } from "@/config/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { medicalStorage } from "@/lib/storage/localStorage"

// 扁平化导航项，方便搜索
type FlatNavItem = {
  title: string
  href: string
  icon: any
  parent?: string
  description?: string
  keywords?: string[]
  category?: string
  lastUpdated?: number
  frequency?: number
}

// 最近访问的页面
type RecentItem = {
  title: string
  href: string
  timestamp: number
  icon: any
  parent?: string
}

// 收藏的页面
type FavoriteItem = {
  title: string
  href: string
  icon: any
  parent?: string
}

// 搜索历史记录
type SearchHistoryItem = {
  query: string
  timestamp: number
  resultCount: number
}

// 搜索建议
type SearchSuggestion = {
  query: string
  type: "history" | "popular" | "trending" | "ai" | "correction"
  icon?: any
}

// 过滤选项
type FilterOptions = {
  categories: string[]
  timeRange: "all" | "today" | "week" | "month"
  sortBy: "relevance" | "alphabetical" | "recent" | "frequency"
  onlyFavorites: boolean
}

interface NavigationSearchProps {
  recentLimit?: number
  favoriteLimit?: number
  historyLimit?: number
  suggestionsLimit?: number
}

export function NavigationSearch({
  recentLimit = 5,
  favoriteLimit = 5,
  historyLimit = 10,
  suggestionsLimit = 5,
}: NavigationSearchProps) {
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<FlatNavItem[]>([])
  const [recentItems, setRecentItems] = useState<RecentItem[]>([])
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([])
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([])
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [flatNavItems, setFlatNavItems] = useState<FlatNavItem[]>([])
  const [inputValue, setInputValue] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    timeRange: "all",
    sortBy: "relevance",
    onlyFavorites: false,
  })
  const [availableCategories, setAvailableCategories] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [showHistory, setShowHistory] = useState(true)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  // 从本地存储加载数据
  useEffect(() => {
    // 使用medicalStorage命名空间存储
    const storedRecent = medicalStorage.getItem<RecentItem[]>("recentNavItems", [])
    const storedFavorites = medicalStorage.getItem<FavoriteItem[]>("favoriteNavItems", [])
    const storedHistory = medicalStorage.getItem<SearchHistoryItem[]>("searchHistory", [])
    const storedFilterPrefs = medicalStorage.getItem<FilterOptions>("searchFilterPrefs", filterOptions)
    const showSuggestionsPref = medicalStorage.getItem<boolean>("showSearchSuggestions", true)
    const showHistoryPref = medicalStorage.getItem<boolean>("showSearchHistory", true)

    setRecentItems(storedRecent)
    setFavoriteItems(storedFavorites)
    setSearchHistory(storedHistory)
    setFilterOptions(storedFilterPrefs)
    setShowSuggestions(showSuggestionsPref)
    setShowHistory(showHistoryPref)
  }, [])

  // 扁平化导航项并提取类别
  useEffect(() => {
    const items: FlatNavItem[] = []
    const categories = new Set<string>()

    navItems.forEach((item) => {
      // 添加主类别
      if (item.category) {
        categories.add(item.category)
      }

      if (item.href) {
        items.push({
          title: item.title,
          href: item.href,
          icon: item.icon,
          keywords: [item.title.toLowerCase()],
          category: item.category,
          lastUpdated: item.lastUpdated || Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000, // 模拟最近30天内的更新
          frequency: Math.floor(Math.random() * 100), // 模拟使用频率
        })
      }

      if (item.children) {
        item.children.forEach((child) => {
          items.push({
            title: child.title,
            href: child.href,
            icon: child.icon,
            parent: item.title,
            keywords: [child.title.toLowerCase(), item.title.toLowerCase()],
            category: item.category,
            lastUpdated: child.lastUpdated || Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
            frequency: Math.floor(Math.random() * 100),
          })
        })
      }
    })

    setFlatNavItems(items)
    setAvailableCategories(Array.from(categories))
  }, [])

  // 监听键盘快捷键
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // 生成搜索建议
  useEffect(() => {
    if (!inputValue.trim() || !showSuggestions) {
      setSuggestions([])
      return
    }

    const query = inputValue.toLowerCase()
    const newSuggestions: SearchSuggestion[] = []

    // 从历史记录中添加建议
    const historyMatches = searchHistory
      .filter((item) => item.query.toLowerCase().includes(query))
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 2)
      .map((item) => ({
        query: item.query,
        type: "history" as const,
        icon: Clock,
      }))

    newSuggestions.push(...historyMatches)

    // 热门搜索建议
    const popularSearches = [
      "患者记录",
      "临床决策",
      "医学影像",
      "AI诊断",
      "药物交互",
      "实验室结果",
      "治疗方案",
      "医疗报告",
    ]

    const popularMatches = popularSearches
      .filter((item) => item.toLowerCase().includes(query) && !historyMatches.some((h) => h.query === item))
      .slice(0, 2)
      .map((item) => ({
        query: item,
        type: "popular" as const,
        icon: Zap,
      }))

    newSuggestions.push(...popularMatches)

    // 趋势搜索建议
    const trendingSearches = ["COVID-19 协议", "远程医疗", "AI 辅助诊断", "患者随访", "医疗保险"]

    const trendingMatches = trendingSearches
      .filter(
        (item) =>
          item.toLowerCase().includes(query) &&
          !historyMatches.some((h) => h.query === item) &&
          !popularMatches.some((p) => p.query === item),
      )
      .slice(0, 1)
      .map((item) => ({
        query: item,
        type: "trending" as const,
        icon: Sparkles,
      }))

    newSuggestions.push(...trendingMatches)

    // 拼写纠正/自动完成建议
    if (query.length > 2) {
      const allTerms = [
        ...flatNavItems.map((item) => item.title),
        ...flatNavItems.filter((item) => item.parent).map((item) => item.parent as string),
        ...availableCategories,
      ]

      // 简单的模糊匹配算法
      const possibleCorrections = allTerms
        .filter((term) => {
          // 如果查询是术语的子字符串，或者术语是查询的子字符串
          if (term.toLowerCase().includes(query) || query.includes(term.toLowerCase())) {
            return true
          }

          // 计算编辑距离 (简化版)
          let distance = 0
          const termLower = term.toLowerCase()
          for (let i = 0; i < query.length; i++) {
            if (i >= termLower.length || query[i] !== termLower[i]) {
              distance++
            }
          }
          return distance <= 2 && Math.abs(query.length - termLower.length) <= 3
        })
        .filter(
          (term) =>
            !newSuggestions.some((s) => s.query.toLowerCase() === term.toLowerCase()) && term.toLowerCase() !== query,
        )
        .slice(0, 2)

      const correctionSuggestions = possibleCorrections.map((term) => ({
        query: term,
        type: "correction" as const,
        icon: RotateCcw,
      }))

      newSuggestions.push(...correctionSuggestions)
    }

    // AI 智能建议 (基于用户角色和上下文)
    // 这里是模拟的AI建议，实际应用中可以接入更复杂的推荐算法
    if (query.length > 1 && newSuggestions.length < suggestionsLimit) {
      const aiSuggestions = [
        {
          query: `${query} 分析报告`,
          type: "ai" as const,
          icon: Sparkles,
        },
        {
          query: `${query} 患者记录`,
          type: "ai" as const,
          icon: Sparkles,
        },
      ]
        .filter((item) => !newSuggestions.some((s) => s.query.toLowerCase() === item.query.toLowerCase()))
        .slice(0, suggestionsLimit - newSuggestions.length)

      newSuggestions.push(...aiSuggestions)
    }

    setSuggestions(newSuggestions.slice(0, suggestionsLimit))
  }, [inputValue, searchHistory, flatNavItems, availableCategories, showSuggestions, suggestionsLimit])

  // 应用过滤器的搜索结果
  const filteredResults = useMemo(() => {
    if (!searchResults.length) return []

    let filtered = [...searchResults]

    // 应用类别过滤
    if (filterOptions.categories.length > 0) {
      filtered = filtered.filter((item) => item.category && filterOptions.categories.includes(item.category))
    }

    // 应用时间范围过滤
    if (filterOptions.timeRange !== "all" && filtered.some((item) => item.lastUpdated)) {
      const now = Date.now()
      const timeRanges = {
        today: 24 * 60 * 60 * 1000, // 1天
        week: 7 * 24 * 60 * 60 * 1000, // 7天
        month: 30 * 24 * 60 * 60 * 1000, // 30天
      }
      const timeLimit = now - timeRanges[filterOptions.timeRange]

      filtered = filtered.filter((item) => (item.lastUpdated || 0) >= timeLimit)
    }

    // 应用收藏过滤
    if (filterOptions.onlyFavorites) {
      const favoriteHrefs = favoriteItems.map((item) => item.href)
      filtered = filtered.filter((item) => favoriteHrefs.includes(item.href))
    }

    // 应用排序
    switch (filterOptions.sortBy) {
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "recent":
        filtered.sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0))
        break
      case "frequency":
        filtered.sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
        break
      // relevance是默认排序，已经在搜索时应用
    }

    return filtered
  }, [searchResults, filterOptions, favoriteItems])

  // 搜索逻辑
  useEffect(() => {
    if (!inputValue.trim()) {
      setSearchResults([])
      return
    }

    const query = inputValue.toLowerCase()
    const results = flatNavItems.filter((item) => {
      // 标题匹配
      if (item.title.toLowerCase().includes(query)) return true

      // 父级匹配
      if (item.parent?.toLowerCase().includes(query)) return true

      // 关键词匹配
      if (item.keywords?.some((keyword) => keyword.includes(query))) return true

      // 类别匹配
      if (item.category?.toLowerCase().includes(query)) return true

      return false
    })

    // 按匹配度排序
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase()
      const bTitle = b.title.toLowerCase()

      // 标题开头匹配的优先级最高
      if (aTitle.startsWith(query) && !bTitle.startsWith(query)) return -1
      if (!aTitle.startsWith(query) && bTitle.startsWith(query)) return 1

      // 标题包含匹配的优先级次之
      if (aTitle.includes(query) && !bTitle.includes(query)) return -1
      if (!aTitle.includes(query) && bTitle.includes(query)) return 1

      // 按字母顺序排序
      return aTitle.localeCompare(bTitle)
    })

    setSearchResults(results)
  }, [inputValue, flatNavItems])

  // 处理导航
  const handleNavigation = (item: FlatNavItem) => {
    // 更新最近访问
    const newRecentItems = [
      {
        title: item.title,
        href: item.href,
        timestamp: Date.now(),
        icon: item.icon,
        parent: item.parent,
      },
      ...recentItems.filter((recent) => recent.href !== item.href),
    ].slice(0, recentLimit)

    setRecentItems(newRecentItems)
    medicalStorage.setItem("recentNavItems", newRecentItems)

    // 关闭搜索对话框
    setOpen(false)

    // 导航到选中页面
    router.push(item.href)
  }

  // 处理搜索历史
  const handleSearch = (query: string) => {
    if (!query.trim()) return

    // 更新搜索历史
    const resultCount = searchResults.length
    const existingIndex = searchHistory.findIndex((item) => item.query.toLowerCase() === query.toLowerCase())

    let newHistory: SearchHistoryItem[]

    if (existingIndex >= 0) {
      // 更新现有记录
      newHistory = [...searchHistory]
      newHistory[existingIndex] = {
        ...newHistory[existingIndex],
        timestamp: Date.now(),
        resultCount,
      }
    } else {
      // 添加新记录
      newHistory = [
        {
          query,
          timestamp: Date.now(),
          resultCount,
        },
        ...searchHistory,
      ].slice(0, historyLimit)
    }

    setSearchHistory(newHistory)
    medicalStorage.setItem("searchHistory", newHistory)
  }

  // 应用搜索建议
  const applySuggestion = (suggestion: SearchSuggestion) => {
    setInputValue(suggestion.query)
    inputRef.current?.focus()
  }

  // 清除搜索历史
  const clearSearchHistory = () => {
    setSearchHistory([])
    medicalStorage.setItem("searchHistory", [])
  }

  // 切换收藏状态
  const toggleFavorite = (item: FlatNavItem, e: React.MouseEvent) => {
    e.stopPropagation()

    const isFavorite = favoriteItems.some((fav) => fav.href === item.href)

    let newFavorites: FavoriteItem[]

    if (isFavorite) {
      newFavorites = favoriteItems.filter((fav) => fav.href !== item.href)
    } else {
      newFavorites = [
        ...favoriteItems,
        {
          title: item.title,
          href: item.href,
          icon: item.icon,
          parent: item.parent,
        },
      ].slice(0, favoriteLimit)
    }

    setFavoriteItems(newFavorites)
    medicalStorage.setItem("favoriteNavItems", newFavorites)
  }

  // 更新过滤器选项
  const updateFilterOption = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    const newOptions = { ...filterOptions, [key]: value }
    setFilterOptions(newOptions)
    medicalStorage.setItem("searchFilterPrefs", newOptions)
  }

  // 切换类别过滤器
  const toggleCategoryFilter = (category: string) => {
    const currentCategories = [...filterOptions.categories]
    const index = currentCategories.indexOf(category)

    if (index >= 0) {
      currentCategories.splice(index, 1)
    } else {
      currentCategories.push(category)
    }

    updateFilterOption("categories", currentCategories)
  }

  // 重置过滤器
  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      categories: [],
      timeRange: "all",
      sortBy: "relevance",
      onlyFavorites: false,
    }
    setFilterOptions(defaultFilters)
    medicalStorage.setItem("searchFilterPrefs", defaultFilters)
  }

  // 切换显示搜索建议
  const toggleShowSuggestions = () => {
    const newValue = !showSuggestions
    setShowSuggestions(newValue)
    medicalStorage.setItem("showSearchSuggestions", newValue)
  }

  // 切换显示搜索历史
  const toggleShowHistory = () => {
    const newValue = !showHistory
    setShowHistory(newValue)
    medicalStorage.setItem("showSearchHistory", newValue)
  }

  // 检查项目是否已收藏
  const isFavorite = (href: string) => {
    return favoriteItems.some((item) => item.href === href)
  }

  // 获取图标组件
  const getIconComponent = (icon: any) => {
    const IconComponent = icon || FileText
    return <IconComponent className="h-4 w-4 mr-2 text-blue-500" />
  }

  // 渲染导航项
  const renderNavItem = (item: FlatNavItem, index: number) => {
    return (
      <CommandItem
        key={`${item.href}-${index}`}
        onSelect={() => handleNavigation(item)}
        className="flex items-center justify-between py-2 px-2 cursor-pointer group"
      >
        <div className="flex items-center">
          {getIconComponent(item.icon)}
          <span>{item.title}</span>
          {item.parent && (
            <Badge variant="outline" className="ml-2 text-xs py-0">
              {item.parent}
            </Badge>
          )}
          {item.category && (
            <Badge variant="secondary" className="ml-2 text-xs py-0">
              {item.category}
            </Badge>
          )}
        </div>
        <div className="flex items-center">
          <button
            onClick={(e) => toggleFavorite(item, e)}
            className={cn(
              "p-1 rounded-md transition-colors",
              "opacity-0 group-hover:opacity-100 focus:opacity-100",
              isFavorite(item.href) ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500",
            )}
            aria-label={isFavorite(item.href) ? "从收藏中移除" : "添加到收藏"}
          >
            <Star className="h-3.5 w-3.5" fill={isFavorite(item.href) ? "currentColor" : "none"} />
          </button>
          <ArrowRight className="h-3.5 w-3.5 ml-1 text-gray-400 opacity-0 group-hover:opacity-100" />
        </div>
      </CommandItem>
    )
  }

  // 渲染搜索历史项
  const renderHistoryItem = (item: SearchHistoryItem, index: number) => {
    return (
      <CommandItem
        key={`history-${index}`}
        onSelect={() => {
          setInputValue(item.query)
          inputRef.current?.focus()
        }}
        className="flex items-center justify-between py-2 px-2 cursor-pointer"
      >
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-gray-500" />
          <span>{item.query}</span>
          <Badge variant="outline" className="ml-2 text-xs py-0">
            {item.resultCount} 结果
          </Badge>
        </div>
        <div className="flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              const newHistory = searchHistory.filter((_, i) => i !== index)
              setSearchHistory(newHistory)
              medicalStorage.setItem("searchHistory", newHistory)
            }}
            className="p-1 rounded-md text-gray-400 hover:text-red-500 transition-colors"
            aria-label="删除此搜索记录"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </CommandItem>
    )
  }

  // 渲染搜索建议项
  const renderSuggestionItem = (suggestion: SearchSuggestion, index: number) => {
    const IconComponent = suggestion.icon || Search

    return (
      <CommandItem
        key={`suggestion-${index}`}
        onSelect={() => applySuggestion(suggestion)}
        className="flex items-center justify-between py-2 px-2 cursor-pointer"
      >
        <div className="flex items-center">
          <IconComponent className="h-4 w-4 mr-2 text-blue-500" />
          <span>{suggestion.query}</span>
          <Badge
            variant="outline"
            className={cn("ml-2 text-xs py-0", {
              "bg-blue-50": suggestion.type === "history",
              "bg-green-50": suggestion.type === "popular",
              "bg-purple-50": suggestion.type === "trending",
              "bg-yellow-50": suggestion.type === "correction",
              "bg-indigo-50": suggestion.type === "ai",
            })}
          >
            {suggestion.type === "history" && "历史"}
            {suggestion.type === "popular" && "热门"}
            {suggestion.type === "trending" && "趋势"}
            {suggestion.type === "correction" && "建议"}
            {suggestion.type === "ai" && "AI推荐"}
          </Badge>
        </div>
      </CommandItem>
    )
  }

  // 渲染过滤器
  const renderFilters = () => {
    return (
      <div className="p-2 border-t">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">高级过滤</h3>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 px-2">
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            重置
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <h4 className="text-xs font-medium mb-1">时间范围</h4>
            <select
              value={filterOptions.timeRange}
              onChange={(e) => updateFilterOption("timeRange", e.target.value as any)}
              className="w-full text-xs p-1 border rounded"
            >
              <option value="all">所有时间</option>
              <option value="today">今天</option>
              <option value="week">本周</option>
              <option value="month">本月</option>
            </select>
          </div>

          <div>
            <h4 className="text-xs font-medium mb-1">排序方式</h4>
            <select
              value={filterOptions.sortBy}
              onChange={(e) => updateFilterOption("sortBy", e.target.value as any)}
              className="w-full text-xs p-1 border rounded"
            >
              <option value="relevance">相关度</option>
              <option value="alphabetical">字母顺序</option>
              <option value="recent">最近更新</option>
              <option value="frequency">使用频率</option>
            </select>
          </div>
        </div>

        <div className="mb-2">
          <h4 className="text-xs font-medium mb-1">类别</h4>
          <div className="flex flex-wrap gap-1">
            {availableCategories.map((category) => (
              <Badge
                key={category}
                variant={filterOptions.categories.includes(category) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCategoryFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <label className="flex items-center text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={filterOptions.onlyFavorites}
              onChange={(e) => updateFilterOption("onlyFavorites", e.target.checked)}
              className="mr-1 h-3 w-3"
            />
            仅显示收藏项
          </label>
        </div>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      >
        <Search className="h-4 w-4" />
        <span>搜索导航...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col h-[80vh] max-h-[600px]">
          <Command className="rounded-lg border shadow-md">
            <div className="flex items-center border-b px-3">
              <Search className="h-4 w-4 mr-2 text-muted-foreground" />
              <CommandInput
                ref={inputRef}
                placeholder="搜索导航项..."
                value={inputValue}
                onValueChange={(value) => {
                  setInputValue(value)
                  if (value.trim() && value.trim() !== inputValue.trim()) {
                    handleSearch(value)
                  }
                }}
                className="flex-1 outline-none border-0 focus:ring-0 h-11"
              />

              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                          "p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors",
                          showFilters && "bg-gray-100 text-gray-700",
                        )}
                      >
                        <Filter className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>高级过滤</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                            <Settings className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>搜索设置</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked={showSuggestions} onCheckedChange={toggleShowSuggestions}>
                            显示搜索建议
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem checked={showHistory} onCheckedChange={toggleShowHistory}>
                            显示搜索历史
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={clearSearchHistory} className="text-red-500 focus:text-red-500">
                            <Trash2 className="h-4 w-4 mr-2" />
                            清除搜索历史
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>搜索设置</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Keyboard className="h-3 w-3" />
                  <span>Esc</span>
                </div>
              </div>
            </div>

            {showFilters && renderFilters()}

            <CommandList className="max-h-[400px] overflow-y-auto">
              <CommandEmpty>未找到匹配的导航项</CommandEmpty>

              {/* 搜索建议 */}
              {suggestions.length > 0 && showSuggestions && (
                <CommandGroup heading="搜索建议">
                  {suggestions.map((suggestion, index) => renderSuggestionItem(suggestion, index))}
                </CommandGroup>
              )}

              {/* 搜索结果 */}
              {filteredResults.length > 0 && (
                <CommandGroup heading={`搜索结果 (${filteredResults.length})`}>
                  <ScrollArea className="h-[200px]">
                    {filteredResults.map((item, index) => renderNavItem(item, index))}
                  </ScrollArea>
                </CommandGroup>
              )}

              {/* 搜索历史 */}
              {searchHistory.length > 0 && inputValue === "" && showHistory && (
                <>
                  <CommandGroup heading="搜索历史">
                    <div className="flex items-center justify-between px-2 py-1">
                      <span className="text-xs text-gray-500">最近的搜索</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSearchHistory}
                        className="h-6 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        清除
                      </Button>
                    </div>
                    {searchHistory.slice(0, 5).map((item, index) => renderHistoryItem(item, index))}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              {/* 收藏项 */}
              {favoriteItems.length > 0 && inputValue === "" && (
                <>
                  <CommandGroup heading="收藏">
                    {favoriteItems.map((item, index) => renderNavItem(item as FlatNavItem, index))}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              {/* 最近访问 */}
              {recentItems.length > 0 && inputValue === "" && (
                <>
                  <CommandGroup heading="最近访问">
                    {recentItems.map((item, index) => renderNavItem(item as FlatNavItem, index))}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              {/* 所有导航项 */}
              {inputValue === "" && !showFilters && (
                <CommandGroup heading="所有导航项">
                  <ScrollArea className="h-[200px]">
                    {flatNavItems.map((item, index) => renderNavItem(item, index))}
                  </ScrollArea>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      </CommandDialog>
    </>
  )
}
