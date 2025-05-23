"use client"

import { useState } from "react"
import { MedicalCard } from "@/components/ui/medical-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Video, Download, BookOpen, Search, Filter, ExternalLink } from "lucide-react"

export function TrainingResources() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // 模拟培训资源数据
  const resources = [
    {
      id: 1,
      title: "言语医枢³系统用户手册",
      type: "document",
      format: "PDF",
      size: "8.5 MB",
      lastUpdated: "2025-05-10",
      description: "全面的系统用户手册，包含所有功能的详细说明和操作指南。",
      url: "#",
      forRoles: ["all"],
    },
    {
      id: 2,
      title: "AI辅助诊断功能视频教程",
      type: "video",
      format: "MP4",
      size: "256 MB",
      duration: "45分钟",
      lastUpdated: "2025-05-12",
      description: "详细演示AI辅助诊断功能的使用方法和结果解读。",
      url: "#",
      forRoles: ["clinician", "researcher"],
    },
    {
      id: 3,
      title: "患者管理模块操作指南",
      type: "document",
      format: "PDF",
      size: "5.2 MB",
      lastUpdated: "2025-05-08",
      description: "患者信息管理、分组和跟踪功能的详细操作指南。",
      url: "#",
      forRoles: ["clinician", "nurse"],
    },
    {
      id: 4,
      title: "系统管理员配置手册",
      type: "document",
      format: "PDF",
      size: "12.3 MB",
      lastUpdated: "2025-05-15",
      description: "系统配置、用户管理和权限设置的详细指南。",
      url: "#",
      forRoles: ["admin"],
    },
    {
      id: 5,
      title: "护理记录系统视频教程",
      type: "video",
      format: "MP4",
      size: "180 MB",
      duration: "30分钟",
      lastUpdated: "2025-05-11",
      description: "护理记录创建、更新和管理的详细视频演示。",
      url: "#",
      forRoles: ["nurse"],
    },
    {
      id: 6,
      title: "研究数据分析工具指南",
      type: "document",
      format: "PDF",
      size: "7.8 MB",
      lastUpdated: "2025-05-14",
      description: "研究数据收集、分析和可视化工具的使用指南。",
      url: "#",
      forRoles: ["researcher"],
    },
    {
      id: 7,
      title: "系统故障排除手册",
      type: "document",
      format: "PDF",
      size: "6.4 MB",
      lastUpdated: "2025-05-13",
      description: "常见系统问题的诊断和解决方法。",
      url: "#",
      forRoles: ["technician", "admin"],
    },
    {
      id: 8,
      title: "临床决策支持系统视频教程",
      type: "video",
      format: "MP4",
      size: "220 MB",
      duration: "40分钟",
      lastUpdated: "2025-05-09",
      description: "临床决策支持工具的使用方法和最佳实践。",
      url: "#",
      forRoles: ["clinician"],
    },
    {
      id: 9,
      title: "系统性能优化指南",
      type: "document",
      format: "PDF",
      size: "4.9 MB",
      lastUpdated: "2025-05-16",
      description: "系统性能监控和优化的技术指南。",
      url: "#",
      forRoles: ["technician"],
    },
    {
      id: 10,
      title: "远程会诊功能操作演示",
      type: "video",
      format: "MP4",
      size: "195 MB",
      duration: "35分钟",
      lastUpdated: "2025-05-17",
      description: "远程会诊功能的设置和使用方法演示。",
      url: "#",
      forRoles: ["clinician"],
    },
  ]

  // 根据搜索和标签筛选资源
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "document" && resource.type === "document") ||
      (activeTab === "video" && resource.type === "video") ||
      resource.forRoles.includes(activeTab)

    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-6">
      <MedicalCard className="p-6">
        <h2 className="text-2xl font-bold mb-4">培训资源中心</h2>
        <p className="mb-6">
          在这里您可以找到所有培训相关的文档、视频和其他资源。这些资源按照不同角色和类型进行了分类，您可以使用搜索和筛选功能快速找到所需内容。
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="搜索培训资源..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={18} />
            高级筛选
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-6">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="document">文档</TabsTrigger>
            <TabsTrigger value="video">视频</TabsTrigger>
            <TabsTrigger value="clinician">医生</TabsTrigger>
            <TabsTrigger value="nurse">护士</TabsTrigger>
            <TabsTrigger value="researcher">研究员</TabsTrigger>
            <TabsTrigger value="admin">管理员</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)
              ) : (
                <div className="md:col-span-2 text-center py-12 text-gray-500">没有找到符合条件的培训资源</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </MedicalCard>
    </div>
  )
}

function ResourceCard({ resource }: { resource: any }) {
  return (
    <MedicalCard className="overflow-hidden">
      <div className="p-4 border-b flex items-center gap-3">
        {resource.type === "document" ? (
          <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
            <FileText size={24} />
          </div>
        ) : (
          <div className="bg-purple-100 text-purple-700 p-2 rounded-lg">
            <Video size={24} />
          </div>
        )}
        <div className="flex-grow">
          <h3 className="font-semibold">{resource.title}</h3>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span className="mr-3">{resource.format}</span>
            <span className="mr-3">{resource.size}</span>
            {resource.duration && <span className="mr-3">{resource.duration}</span>}
            <span>更新于: {resource.lastUpdated}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {resource.forRoles.map((role: string) => (
              <span
                key={role}
                className={`text-xs px-2 py-0.5 rounded-full ${
                  role === "all"
                    ? "bg-gray-100 text-gray-800"
                    : role === "clinician"
                      ? "bg-blue-100 text-blue-800"
                      : role === "nurse"
                        ? "bg-green-100 text-green-800"
                        : role === "researcher"
                          ? "bg-purple-100 text-purple-800"
                          : role === "admin"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                }`}
              >
                {role === "all"
                  ? "所有角色"
                  : role === "clinician"
                    ? "医生"
                    : role === "nurse"
                      ? "护士"
                      : role === "researcher"
                        ? "研究员"
                        : role === "admin"
                          ? "管理员"
                          : role === "technician"
                            ? "技术员"
                            : role}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {resource.type === "document" ? (
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Download size={16} />
                下载
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <ExternalLink size={16} />
                观看
              </Button>
            )}
            <Button size="sm" className="flex items-center gap-1">
              <BookOpen size={16} />
              {resource.type === "document" ? "阅读" : "详情"}
            </Button>
          </div>
        </div>
      </div>
    </MedicalCard>
  )
}
