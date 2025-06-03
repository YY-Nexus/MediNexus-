"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Stethoscope,
  Activity,
  Users,
  FileText,
  Settings,
  Download,
  Save,
  Send,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  X,
} from "lucide-react"

export default function EnhancedButtonShowcase() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const handleButtonClick = (buttonId: string) => {
    setLoadingStates((prev) => ({ ...prev, [buttonId]: true }))
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [buttonId]: false }))
    }, 2000)
  }

  return (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">医疗系统立体按钮展示</h1>
        <p className="text-blue-600">蓝白双色方案 + 立体视觉效果增强</p>
      </div>

      {/* 主要按钮变体 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">主要按钮变体</CardTitle>
          <CardDescription>蓝色背景白字 vs 白色背景蓝字的立体效果对比</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 蓝色按钮 */}
            <div className="space-y-3">
              <Badge variant="outline" className="text-blue-600">
                蓝色系列
              </Badge>
              <div className="space-y-2">
                <Button
                  variant="medical-blue"
                  className="w-full btn-3d-medical btn-medical-blue"
                  onClick={() => handleButtonClick("blue-primary")}
                  disabled={loadingStates["blue-primary"]}
                >
                  <Heart className="w-4 h-4 mr-2 btn-icon-3d" />
                  {loadingStates["blue-primary"] ? "处理中..." : "主要操作"}
                </Button>

                <Button variant="medical-blue" size="sm" className="w-full btn-3d-medical btn-medical-blue btn-size-sm">
                  <Stethoscope className="w-3 h-3 mr-2 btn-icon-3d" />
                  小尺寸
                </Button>

                <Button variant="medical-blue" size="lg" className="w-full btn-3d-medical btn-medical-blue btn-size-lg">
                  <Activity className="w-5 h-5 mr-2 btn-icon-3d" />
                  大尺寸
                </Button>
              </div>
            </div>

            {/* 白色按钮 */}
            <div className="space-y-3">
              <Badge variant="outline" className="text-blue-600">
                白色系列
              </Badge>
              <div className="space-y-2">
                <Button
                  variant="medical-white"
                  className="w-full btn-3d-medical btn-medical-white"
                  onClick={() => handleButtonClick("white-primary")}
                  disabled={loadingStates["white-primary"]}
                >
                  <Users className="w-4 h-4 mr-2 btn-icon-3d" />
                  {loadingStates["white-primary"] ? "处理中..." : "次要操作"}
                </Button>

                <Button
                  variant="medical-white"
                  size="sm"
                  className="w-full btn-3d-medical btn-medical-white btn-size-sm"
                >
                  <FileText className="w-3 h-3 mr-2 btn-icon-3d" />
                  小尺寸
                </Button>

                <Button
                  variant="medical-white"
                  size="lg"
                  className="w-full btn-3d-medical btn-medical-white btn-size-lg"
                >
                  <Settings className="w-5 h-5 mr-2 btn-icon-3d" />
                  大尺寸
                </Button>
              </div>
            </div>

            {/* 轮廓按钮 */}
            <div className="space-y-3">
              <Badge variant="outline" className="text-blue-600">
                轮廓系列
              </Badge>
              <div className="space-y-2">
                <Button variant="medical-outline" className="w-full btn-3d-medical btn-medical-outline">
                  <Download className="w-4 h-4 mr-2 btn-icon-3d" />
                  下载
                </Button>

                <Button
                  variant="medical-outline"
                  size="sm"
                  className="w-full btn-3d-medical btn-medical-outline btn-size-sm"
                >
                  <Save className="w-3 h-3 mr-2 btn-icon-3d" />
                  保存
                </Button>

                <Button
                  variant="medical-outline"
                  size="lg"
                  className="w-full btn-3d-medical btn-medical-outline btn-size-lg"
                >
                  <Send className="w-5 h-5 mr-2 btn-icon-3d" />
                  发送
                </Button>
              </div>
            </div>

            {/* 渐变按钮 */}
            <div className="space-y-3">
              <Badge variant="outline" className="text-blue-600">
                渐变系列
              </Badge>
              <div className="space-y-2">
                <Button variant="medical-gradient" className="w-full btn-3d-medical btn-medical-gradient">
                  <Plus className="w-4 h-4 mr-2 btn-icon-3d" />
                  创建
                </Button>

                <Button
                  variant="medical-gradient"
                  size="sm"
                  className="w-full btn-3d-medical btn-medical-gradient btn-size-sm"
                >
                  <Edit className="w-3 h-3 mr-2 btn-icon-3d" />
                  编辑
                </Button>

                <Button
                  variant="medical-gradient"
                  size="lg"
                  className="w-full btn-3d-medical btn-medical-gradient btn-size-lg"
                >
                  <CheckCircle className="w-5 h-5 mr-2 btn-icon-3d" />
                  确认
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 功能按钮组 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">功能按钮组</CardTitle>
          <CardDescription>常用医疗系统功能的立体按钮展示</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <Button variant="medical-blue" className="btn-3d-medical btn-medical-blue">
              <Search className="w-4 h-4 mr-2 btn-icon-3d" />
              搜索
            </Button>

            <Button variant="medical-white" className="btn-3d-medical btn-medical-white">
              <Filter className="w-4 h-4 mr-2 btn-icon-3d" />
              筛选
            </Button>

            <Button variant="medical-outline" className="btn-3d-medical btn-medical-outline">
              <RefreshCw className="w-4 h-4 mr-2 btn-icon-3d" />
              刷新
            </Button>

            <Button variant="medical-gradient" className="btn-3d-medical btn-medical-gradient">
              <Plus className="w-4 h-4 mr-2 btn-icon-3d" />
              新增
            </Button>

            <Button variant="medical-blue" className="btn-3d-medical btn-medical-blue">
              <Edit className="w-4 h-4 mr-2 btn-icon-3d" />
              编辑
            </Button>

            <Button variant="destructive" className="btn-3d-medical">
              <Trash2 className="w-4 h-4 mr-2 btn-icon-3d" />
              删除
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 状态按钮 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">状态指示按钮</CardTitle>
          <CardDescription>不同状态的立体按钮效果</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="medical-blue" className="btn-3d-medical btn-medical-blue">
              <CheckCircle className="w-4 h-4 mr-2 btn-icon-3d text-green-200" />
              成功状态
            </Button>

            <Button variant="medical-white" className="btn-3d-medical btn-medical-white">
              <AlertCircle className="w-4 h-4 mr-2 btn-icon-3d text-yellow-500" />
              警告状态
            </Button>

            <Button variant="medical-outline" className="btn-3d-medical btn-medical-outline">
              <Info className="w-4 h-4 mr-2 btn-icon-3d" />
              信息状态
            </Button>

            <Button variant="destructive" className="btn-3d-medical">
              <X className="w-4 h-4 mr-2 btn-icon-3d" />
              错误状态
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 按钮组合 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">按钮组合效果</CardTitle>
          <CardDescription>多个按钮组合的立体视觉效果</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 水平按钮组 */}
            <div className="btn-group">
              <Button variant="medical-blue" className="btn-3d-medical btn-medical-blue">
                上一页
              </Button>
              <Button variant="medical-white" className="btn-3d-medical btn-medical-white">
                1
              </Button>
              <Button variant="medical-white" className="btn-3d-medical btn-medical-white">
                2
              </Button>
              <Button variant="medical-white" className="btn-3d-medical btn-medical-white">
                3
              </Button>
              <Button variant="medical-blue" className="btn-3d-medical btn-medical-blue">
                下一页
              </Button>
            </div>

            {/* 操作按钮组 */}
            <div className="flex flex-wrap gap-2">
              <Button variant="medical-gradient" className="btn-3d-medical btn-medical-gradient">
                <Save className="w-4 h-4 mr-2 btn-icon-3d" />
                保存并继续
              </Button>
              <Button variant="medical-white" className="btn-3d-medical btn-medical-white">
                <X className="w-4 h-4 mr-2 btn-icon-3d" />
                取消
              </Button>
              <Button variant="medical-outline" className="btn-3d-medical btn-medical-outline">
                <Download className="w-4 h-4 mr-2 btn-icon-3d" />
                导出
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">蓝色按钮 (medical-blue)</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• 主要操作按钮</li>
                <li>• 蓝色背景 + 白色文字</li>
                <li>• 立体阴影效果</li>
                <li>• 悬停时向上浮动</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">白色按钮 (medical-white)</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• 次要操作按钮</li>
                <li>• 白色背景 + 蓝色文字</li>
                <li>• 蓝色边框立体效果</li>
                <li>• 悬停时背景变浅蓝</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
