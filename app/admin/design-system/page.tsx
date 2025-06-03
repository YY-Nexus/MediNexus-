import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Palette, Eye, Layout } from "lucide-react"

export const metadata: Metadata = {
  title: "设计系统 | 言语云³",
  description: "统一的视觉设计语言和组件规范",
}

export default function DesignSystemPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-blue-800">设计系统</h1>
        <p className="text-blue-600">统一的视觉设计语言和用户体验规范</p>
      </div>

      {/* 色彩系统 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Palette className="h-5 w-5" />
            色彩系统
          </CardTitle>
          <CardDescription>统一的蓝色主题色彩规范</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-lg mx-auto mb-2 border"></div>
              <p className="text-xs font-medium text-blue-800">蓝色-50</p>
              <p className="text-xs text-blue-600">#eff6ff</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-2"></div>
              <p className="text-xs font-medium text-blue-800">蓝色-100</p>
              <p className="text-xs text-blue-600">#dbeafe</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-200 rounded-lg mx-auto mb-2"></div>
              <p className="text-xs font-medium text-blue-800">蓝色-200</p>
              <p className="text-xs text-blue-600">#bfdbfe</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-2"></div>
              <p className="text-xs font-medium text-white">蓝色-600</p>
              <p className="text-xs text-blue-600">#2563eb</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-700 rounded-lg mx-auto mb-2"></div>
              <p className="text-xs font-medium text-white">蓝色-700</p>
              <p className="text-xs text-blue-600">#1d4ed8</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-800 rounded-lg mx-auto mb-2"></div>
              <p className="text-xs font-medium text-white">蓝色-800</p>
              <p className="text-xs text-blue-600">#1e40af</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 组件规范 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Layout className="h-5 w-5" />
            组件规范
          </CardTitle>
          <CardDescription>统一的UI组件设计标准</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-blue-800">按钮样式</h4>
              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">主要按钮</Button>
                <Button variant="outline" className="w-full">
                  次要按钮
                </Button>
                <Button variant="ghost" className="w-full">
                  文本按钮
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-blue-800">徽章样式</h4>
              <div className="space-y-2">
                <Badge className="bg-blue-100 text-blue-800">默认徽章</Badge>
                <Badge className="bg-green-100 text-green-800">成功状态</Badge>
                <Badge className="bg-yellow-100 text-yellow-800">警告状态</Badge>
                <Badge className="bg-red-100 text-red-800">错误状态</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-blue-800">卡片样式</h4>
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-blue-800">标准卡片</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-blue-600">统一的卡片设计规范</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 设计原则 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Eye className="h-5 w-5" />
            设计原则
          </CardTitle>
          <CardDescription>医疗系统设计的核心理念</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">专业可信</h4>
                <p className="text-sm text-blue-600">采用医疗行业标准的蓝色主题，传达专业性和可信度</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">清晰易读</h4>
                <p className="text-sm text-blue-600">高对比度设计，确保在各种环境下都能清晰阅读</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">一致性</h4>
                <p className="text-sm text-blue-600">统一的视觉语言，减少用户学习成本</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">响应式</h4>
                <p className="text-sm text-blue-600">适配各种设备和屏幕尺寸，确保最佳体验</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
