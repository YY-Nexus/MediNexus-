"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccessibilityDemo } from "./accessibility-demo"
import { PerformanceDemo } from "./performance-demo"
import { InternationalizationDemo } from "./internationalization-demo"
import { SecurityDemo } from "./security-demo"
import { UserExperienceDemo } from "./user-experience-demo"
import { useA11y } from "@/hooks/use-a11y"
import { EnhancedLanguageProvider } from "@/contexts/enhanced-language-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export function SystemEnhancementsDemo() {
  const [isLoading, setIsLoading] = useState(true)
  const { announce } = useA11y()

  useEffect(() => {
    // 模拟加载
    const timer = setTimeout(() => {
      setIsLoading(false)
      announce("系统增强功能演示页面已加载完成", { politeness: "polite" })
    }, 1000)

    return () => clearTimeout(timer)
  }, [announce])

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <EnhancedLanguageProvider>
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">系统增强功能演示</h1>
          <p className="text-muted-foreground">展示系统的无障碍性、性能优化、国际化、安全和用户体验增强功能</p>
        </div>

        <Tabs defaultValue="accessibility" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="accessibility">无障碍性</TabsTrigger>
            <TabsTrigger value="performance">性能优化</TabsTrigger>
            <TabsTrigger value="internationalization">国际化</TabsTrigger>
            <TabsTrigger value="security">安全增强</TabsTrigger>
            <TabsTrigger value="user-experience">用户体验</TabsTrigger>
          </TabsList>
          <TabsContent value="accessibility">
            <AccessibilityDemo />
          </TabsContent>
          <TabsContent value="performance">
            <PerformanceDemo />
          </TabsContent>
          <TabsContent value="internationalization">
            <InternationalizationDemo />
          </TabsContent>
          <TabsContent value="security">
            <SecurityDemo />
          </TabsContent>
          <TabsContent value="user-experience">
            <UserExperienceDemo />
          </TabsContent>
        </Tabs>
      </div>
    </EnhancedLanguageProvider>
  )
}
