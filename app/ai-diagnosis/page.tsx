"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Upload, FileText, BarChart3, Settings, Zap } from "lucide-react"

export default function AIDiagnosisPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI智能诊断中心</h1>
            <p className="text-muted-foreground">基于深度学习的医疗影像分析和智能诊断系统</p>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <Zap className="w-4 h-4 mr-1" />
            AI引擎运行中
          </Badge>
        </div>

        {/* 快速统计 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日诊断</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">+12% 较昨日</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">诊断准确率</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96.8%</div>
              <p className="text-xs text-muted-foreground">+0.3% 较上周</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">处理时间</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2s</div>
              <p className="text-xs text-muted-foreground">平均响应时间</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待处理</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">影像文件</p>
            </CardContent>
          </Card>
        </div>

        {/* 主要功能区域 */}
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">影像上传</TabsTrigger>
            <TabsTrigger value="diagnosis">智能诊断</TabsTrigger>
            <TabsTrigger value="results">诊断结果</TabsTrigger>
            <TabsTrigger value="history">历史记录</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  医疗影像上传
                </CardTitle>
                <CardDescription>支持DICOM、JPG、PNG等格式的医疗影像文件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <p className="text-lg font-medium">拖拽文件到此处或点击上传</p>
                    <p className="text-sm text-muted-foreground mt-2">支持多文件批量上传，最大单文件100MB</p>
                  </div>
                  <Button className="mt-4">选择文件</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diagnosis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI诊断引擎</CardTitle>
                <CardDescription>基于深度学习的智能诊断分析</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">选择上传的影像文件开始AI诊断分析...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>诊断结果</CardTitle>
                <CardDescription>AI分析结果和诊断建议</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">暂无诊断结果，请先上传影像文件进行分析...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>诊断历史</CardTitle>
                <CardDescription>历史诊断记录和分析结果</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">暂无历史记录...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
