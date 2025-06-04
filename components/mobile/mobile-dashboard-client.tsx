"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Smartphone, Tablet, Monitor, Settings, Zap, ContactIcon as Touch, Accessibility } from "lucide-react"

// 动态导入移动端组件，避免SSR问题
const ComprehensiveMobileOptimization = dynamic(
  () => import("./comprehensive-mobile-optimization").then((mod) => ({ default: mod.ComprehensiveMobileOptimization })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

const MobileUIComponents = dynamic(
  () => import("./mobile-ui-components").then((mod) => ({ default: mod.MobileUIComponents })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

const MobileOptimization = dynamic(
  () => import("./mobile-optimization").then((mod) => ({ default: mod.MobileOptimization })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

const OfflineSupport = dynamic(() => import("./offline-support").then((mod) => ({ default: mod.OfflineSupport })), {
  loading: () => <LoadingSpinner />,
  ssr: false,
})

const NativeAppDevelopment = dynamic(
  () => import("./native-app-development").then((mod) => ({ default: mod.NativeAppDevelopment })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

const PushNotificationSystem = dynamic(
  () => import("./push-notification-system").then((mod) => ({ default: mod.PushNotificationSystem })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

export default function MobileDashboardClient() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)")
  const isDesktop = useMediaQuery("(min-width: 1025px)")

  const currentDevice = isMobile ? "mobile" : isTablet ? "tablet" : "desktop"

  return (
    <div className="space-y-6">
      {/* 设备状态概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isMobile && <Smartphone className="w-5 h-5 text-blue-500" />}
            {isTablet && <Tablet className="w-5 h-5 text-green-500" />}
            {isDesktop && <Monitor className="w-5 h-5 text-purple-500" />}
            移动端支持中心
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant={isMobile ? "default" : "outline"}>当前设备: {currentDevice}</Badge>
            <Badge variant="outline">
              {typeof window !== "undefined" && "ontouchstart" in window ? "支持触摸" : "不支持触摸"}
            </Badge>
            <Badge variant="outline">
              {typeof window !== "undefined" ? `${window.innerWidth}×${window.innerHeight}` : "未知分辨率"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 移动端功能选项卡 */}
      <Tabs defaultValue="optimization" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="optimization" className="flex items-center gap-1">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">全面优化</span>
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-1">
            <Touch className="w-4 h-4" />
            <span className="hidden sm:inline">UI组件</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">性能优化</span>
          </TabsTrigger>
          <TabsTrigger value="offline" className="flex items-center gap-1">
            <Accessibility className="w-4 h-4" />
            <span className="hidden sm:inline">离线支持</span>
          </TabsTrigger>
          <TabsTrigger value="native" className="flex items-center gap-1">
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">原生应用</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">推送通知</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="optimization" className="space-y-4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <ComprehensiveMobileOptimization />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <MobileUIComponents />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <MobileOptimization />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="offline" className="space-y-4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <OfflineSupport />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="native" className="space-y-4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <NativeAppDevelopment />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <PushNotificationSystem />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  )
}
