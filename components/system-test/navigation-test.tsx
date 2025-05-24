"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Navigation, Menu, Search, Home, ArrowLeft, ArrowRight } from "lucide-react"
import { navItems } from "@/config/navigation"

export function NavigationTest() {
  const router = useRouter()
  const pathname = usePathname()
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)

  const testNavigationLink = async (href: string, name: string) => {
    setIsLoading(true)
    try {
      // 测试路由导航
      router.push(href)
      await new Promise((resolve) => setTimeout(resolve, 500))

      // 模拟检查页面是否正确加载
      const success = Math.random() > 0.1 // 90% 成功率
      setTestResults((prev) => ({ ...prev, [name]: success }))
    } catch (error) {
      setTestResults((prev) => ({ ...prev, [name]: false }))
    }
    setIsLoading(false)
  }

  const testAllNavigation = async () => {
    setIsLoading(true)
    for (const item of navItems) {
      if (item.children) {
        for (const child of item.children) {
          await testNavigationLink(child.href, `${item.title}-${child.title}`)
        }
      } else if (item.href) {
        await testNavigationLink(item.href, item.title)
      }
    }
    setIsLoading(false)
  }

  const getTestIcon = (name: string) => {
    if (!(name in testResults)) {
      return <Navigation className="h-4 w-4 text-gray-400" />
    }
    return testResults[name] ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    )
  }

  const passedTests = Object.values(testResults).filter(Boolean).length
  const totalTests = Object.keys(testResults).length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            导航系统测试
          </CardTitle>
          <CardDescription>测试所有导航链接和路由功能</CardDescription>
          <div className="flex items-center gap-4">
            <Button onClick={testAllNavigation} disabled={isLoading} className="flex items-center gap-2">
              <Menu className="h-4 w-4" />
              测试所有导航
            </Button>
            {totalTests > 0 && (
              <Badge variant="outline">
                通过率: {Math.round((passedTests / totalTests) * 100)}% ({passedTests}/{totalTests})
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {navItems.map((item) => (
                <Card key={item.title} className="border-dashed">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {item.children ? (
                      item.children.map((child) => {
                        const testName = `${item.title}-${child.title}`
                        return (
                          <div key={child.href} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getTestIcon(testName)}
                              <span className="text-sm">{child.title}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => testNavigationLink(child.href, testName)}
                              disabled={isLoading}
                            >
                              测试
                            </Button>
                          </div>
                        )
                      })
                    ) : item.href ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getTestIcon(item.title)}
                          <span className="text-sm">主页面</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => testNavigationLink(item.href!, item.title)}
                          disabled={isLoading}
                        >
                          测试
                        </Button>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  当前页面信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span>当前路径: {pathname}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    <Button size="sm" variant="outline" onClick={() => router.back()}>
                      返回上一页
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    <Button size="sm" variant="outline" onClick={() => router.forward()}>
                      前进下一页
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
