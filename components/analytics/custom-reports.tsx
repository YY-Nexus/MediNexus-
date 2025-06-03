"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Plus,
  Download,
  Save,
  Eye,
  Settings,
  Trash2,
  Copy,
  FileText,
  BarChart3,
  PieChartIcon,
  TrendingUp,
  Calendar,
} from "lucide-react"

// 可用的数据源
const dataSources = [
  { id: "patients", name: "患者数据", fields: ["姓名", "年龄", "性别", "诊断", "入院日期", "出院日期"] },
  { id: "treatments", name: "治疗数据", fields: ["治疗类型", "费用", "时长", "效果", "医生", "科室"] },
  { id: "medications", name: "药物数据", fields: ["药物名称", "剂量", "频次", "费用", "供应商", "库存"] },
  { id: "appointments", name: "预约数据", fields: ["预约时间", "患者", "医生", "科室", "状态", "类型"] },
  { id: "finance", name: "财务数据", fields: ["收入", "支出", "利润", "科室", "时间", "类型"] },
]

// 图表类型
const chartTypes = [
  { id: "bar", name: "柱状图", icon: BarChart3, description: "适合比较不同类别的数据" },
  { id: "line", name: "折线图", icon: TrendingUp, description: "适合显示趋势变化" },
  { id: "pie", name: "饼图", icon: PieChartIcon, description: "适合显示比例分布" },
  { id: "table", name: "表格", icon: FileText, description: "适合详细数据展示" },
]

// 预设报表模板
const reportTemplates = [
  {
    id: "patient-summary",
    name: "患者统计报表",
    description: "患者基本信息和就诊统计",
    category: "患者管理",
    charts: ["患者年龄分布", "科室就诊量", "月度趋势"],
    lastUsed: "2024-01-15",
  },
  {
    id: "financial-report",
    name: "财务分析报表",
    description: "收入支出分析和盈利情况",
    category: "财务管理",
    charts: ["收入趋势", "科室盈利", "成本分析"],
    lastUsed: "2024-01-14",
  },
  {
    id: "treatment-analysis",
    name: "治疗效果分析",
    description: "治疗方案效果和成功率统计",
    category: "医疗质量",
    charts: ["治疗成功率", "平均住院时间", "复发率"],
    lastUsed: "2024-01-13",
  },
  {
    id: "resource-utilization",
    name: "资源利用率报表",
    description: "医疗资源使用情况和效率分析",
    category: "运营管理",
    charts: ["设备使用率", "人员工作量", "床位周转率"],
    lastUsed: "2024-01-12",
  },
]

// 报表组件
interface ReportComponent {
  id: string
  type: string
  title: string
  dataSource: string
  fields: string[]
  chartType: string
  position: { x: number; y: number }
  size: { width: number; height: number }
}

// 模拟图表数据
const sampleData = [
  { name: "内科", value: 120, patients: 450 },
  { name: "外科", value: 98, patients: 320 },
  { name: "儿科", value: 86, patients: 280 },
  { name: "妇产科", value: 75, patients: 250 },
  { name: "急诊科", value: 110, patients: 380 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

interface CustomReportsProps {
  onBack?: () => void
}

export default function CustomReports({ onBack }: CustomReportsProps) {
  const [activeTab, setActiveTab] = useState("builder")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [reportComponents, setReportComponents] = useState<ReportComponent[]>([])
  const [reportName, setReportName] = useState("")
  const [selectedDataSource, setSelectedDataSource] = useState("")
  const [selectedChartType, setSelectedChartType] = useState("")
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  // 拖拽处理
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(reportComponents)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setReportComponents(items)
  }

  // 添加图表组件
  const addChartComponent = () => {
    if (!selectedDataSource || !selectedChartType) return

    const newComponent: ReportComponent = {
      id: `component-${Date.now()}`,
      type: "chart",
      title: `新图表 ${reportComponents.length + 1}`,
      dataSource: selectedDataSource,
      fields: [],
      chartType: selectedChartType,
      position: { x: 0, y: reportComponents.length * 300 },
      size: { width: 400, height: 300 },
    }

    setReportComponents([...reportComponents, newComponent])
  }

  // 删除组件
  const removeComponent = (id: string) => {
    setReportComponents(reportComponents.filter((comp) => comp.id !== id))
  }

  // 渲染图表
  const renderChart = (component: ReportComponent) => {
    switch (component.chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={sampleData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                {sampleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      default:
        return <div className="h-[250px] bg-gray-100 rounded flex items-center justify-center">选择图表类型</div>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-medical-800">自定义报表</h2>
          <p className="text-gray-600">创建和管理个性化的数据报表</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
            <Eye className="mr-2 h-4 w-4" />
            {isPreviewMode ? "编辑模式" : "预览模式"}
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            保存报表
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">报表模板</TabsTrigger>
          <TabsTrigger value="builder">报表构建器</TabsTrigger>
          <TabsTrigger value="preview">预览和导出</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all ${
                  selectedTemplate === template.id ? "ring-2 ring-medical-500 bg-medical-50" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">包含图表</span>
                      <div className="flex flex-wrap gap-1">
                        {template.charts.map((chart, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {chart}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">最后使用</span>
                      <span className="text-sm">{template.lastUsed}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        预览
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Copy className="mr-1 h-3 w-3" />
                        使用模板
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：组件库 */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">添加组件</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="report-name">报表名称</Label>
                    <Input
                      id="report-name"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      placeholder="输入报表名称"
                    />
                  </div>

                  <div>
                    <Label>数据源</Label>
                    <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择数据源" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataSources.map((source) => (
                          <SelectItem key={source.id} value={source.id}>
                            {source.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>图表类型</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {chartTypes.map((type) => (
                        <Button
                          key={type.id}
                          variant={selectedChartType === type.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedChartType(type.id)}
                          className="h-auto p-3 flex flex-col items-center gap-1"
                        >
                          <type.icon className="h-4 w-4" />
                          <span className="text-xs">{type.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={addChartComponent}
                    className="w-full"
                    disabled={!selectedDataSource || !selectedChartType}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    添加图表
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* 右侧：报表画布 */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>报表画布</span>
                    <span className="text-sm text-gray-500">{reportComponents.length} 个组件</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {reportComponents.length === 0 ? (
                    <div className="h-[400px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">从左侧添加组件开始构建报表</p>
                      </div>
                    </div>
                  ) : (
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="report-canvas">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                            {reportComponents.map((component, index) => (
                              <Draggable key={component.id} draggableId={component.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                          <CardTitle className="text-base">{component.title}</CardTitle>
                                          <div className="flex items-center gap-1">
                                            <Button size="sm" variant="ghost">
                                              <Settings className="h-3 w-3" />
                                            </Button>
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              onClick={() => removeComponent(component.id)}
                                            >
                                              <Trash2 className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </div>
                                      </CardHeader>
                                      <CardContent>{renderChart(component)}</CardContent>
                                    </Card>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{reportName || "未命名报表"}</CardTitle>
                  <CardDescription>报表预览和导出选项</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    导出PDF
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    导出Excel
                  </Button>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    定时发送
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {reportComponents.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">报表为空，请先添加组件</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reportComponents.map((component) => (
                    <Card key={component.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{component.title}</CardTitle>
                      </CardHeader>
                      <CardContent>{renderChart(component)}</CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
