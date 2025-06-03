"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, BarChart3, ScatterChartIcon as ScatterIcon, Upload, Play, FileText } from "lucide-react"

interface AnalysisProject {
  id: string
  name: string
  description: string
  dataSource: string
  analysisType: string
  status: string
  createdDate: string
  lastModified: string
  results: AnalysisResult[]
}

interface AnalysisResult {
  id: string
  type: string
  title: string
  summary: string
  significance: number
  confidence: number
  chartData: any[]
  statisticalTests: StatisticalTest[]
  recommendations: string[]
}

interface StatisticalTest {
  name: string
  pValue: number
  statistic: number
  interpretation: string
}

interface DataSet {
  id: string
  name: string
  description: string
  variables: Variable[]
  sampleSize: number
  dataType: string
  uploadDate: string
}

interface Variable {
  name: string
  type: string
  description: string
  unit?: string
  range?: string
  missingValues: number
}

export default function AdvancedDataAnalysis() {
  const [projects, setProjects] = useState<AnalysisProject[]>([])
  const [dataSets, setDataSets] = useState<DataSet[]>([])
  const [selectedProject, setSelectedProject] = useState<AnalysisProject | null>(null)
  const [activeTab, setActiveTab] = useState("projects")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟数据加载
    const mockProjects: AnalysisProject[] = [
      {
        id: "AP001",
        name: "抗癌药物疗效分析",
        description: "分析新型抗癌药物在不同患者群体中的疗效差异",
        dataSource: "临床试验CT001",
        analysisType: "survival_analysis",
        status: "completed",
        createdDate: "2024-01-10",
        lastModified: "2024-01-20",
        results: [
          {
            id: "AR001",
            type: "survival_curve",
            title: "总生存期分析",
            summary: "治疗组相比对照组显示显著的生存获益",
            significance: 0.003,
            confidence: 95,
            chartData: [
              { time: 0, survival: 100, group: "治疗组" },
              { time: 6, survival: 95, group: "治疗组" },
              { time: 12, survival: 88, group: "治疗组" },
              { time: 18, survival: 82, group: "治疗组" },
              { time: 24, survival: 75, group: "治疗组" },
              { time: 0, survival: 100, group: "对照组" },
              { time: 6, survival: 88, group: "对照组" },
              { time: 12, survival: 75, group: "对照组" },
              { time: 18, survival: 62, group: "对照组" },
              { time: 24, survival: 48, group: "对照组" },
            ],
            statisticalTests: [
              {
                name: "Log-rank test",
                pValue: 0.003,
                statistic: 8.92,
                interpretation: "治疗组与对照组生存期存在显著差异",
              },
            ],
            recommendations: ["建议进一步扩大样本量验证结果", "考虑分层分析不同亚组的疗效", "监测长期安全性数据"],
          },
        ],
      },
      {
        id: "AP002",
        name: "生物标志物预测模型",
        description: "基于机器学习构建疾病预后预测模型",
        dataSource: "多中心队列研究",
        analysisType: "machine_learning",
        status: "in_progress",
        createdDate: "2024-01-15",
        lastModified: "2024-01-22",
        results: [],
      },
    ]

    const mockDataSets: DataSet[] = [
      {
        id: "DS001",
        name: "临床试验CT001数据",
        description: "抗癌药物III期临床试验完整数据集",
        variables: [
          { name: "patient_id", type: "categorical", description: "患者ID", missingValues: 0 },
          { name: "age", type: "continuous", description: "年龄", unit: "岁", range: "18-75", missingValues: 2 },
          { name: "gender", type: "categorical", description: "性别", missingValues: 0 },
          {
            name: "tumor_size",
            type: "continuous",
            description: "肿瘤大小",
            unit: "cm",
            range: "1.2-8.5",
            missingValues: 5,
          },
          {
            name: "survival_time",
            type: "continuous",
            description: "生存时间",
            unit: "月",
            range: "0.5-36",
            missingValues: 8,
          },
        ],
        sampleSize: 300,
        dataType: "clinical_trial",
        uploadDate: "2024-01-10",
      },
    ]

    setProjects(mockProjects)
    setDataSets(mockDataSets)
    setLoading(false)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAnalysisTypeLabel = (type: string) => {
    switch (type) {
      case "survival_analysis":
        return "生存分析"
      case "machine_learning":
        return "机器学习"
      case "descriptive":
        return "描述性分析"
      case "regression":
        return "回归分析"
      case "time_series":
        return "时间序列"
      default:
        return type
    }
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">高级数据分析</h2>
          <p className="text-gray-600">强大的统计分析和机器学习工具</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            导入数据
          </Button>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            新建分析
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">分析项目</TabsTrigger>
          <TabsTrigger value="datasets">数据集</TabsTrigger>
          <TabsTrigger value="models">模型库</TabsTrigger>
          <TabsTrigger value="reports">报告</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status === "completed"
                            ? "已完成"
                            : project.status === "in_progress"
                              ? "进行中"
                              : project.status === "failed"
                                ? "失败"
                                : "待处理"}
                        </Badge>
                        <Badge variant="outline">{getAnalysisTypeLabel(project.analysisType)}</Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                      <div className="text-sm text-gray-500">
                        数据源：{project.dataSource} | 创建：{project.createdDate}
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedProject(project)}>
                          查看结果
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{project.name}</DialogTitle>
                          <DialogDescription>分析结果和统计报告</DialogDescription>
                        </DialogHeader>

                        {project.results.length > 0 ? (
                          <div className="space-y-6">
                            {project.results.map((result) => (
                              <Card key={result.id}>
                                <CardHeader>
                                  <CardTitle className="text-lg">{result.title}</CardTitle>
                                  <CardDescription>{result.summary}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 gap-6">
                                    <div>
                                      <h4 className="font-semibold mb-2">统计检验结果</h4>
                                      <div className="space-y-2">
                                        {result.statisticalTests.map((test, index) => (
                                          <div key={index} className="p-3 bg-gray-50 rounded">
                                            <div className="flex justify-between items-center mb-1">
                                              <span className="font-medium">{test.name}</span>
                                              <Badge variant={test.pValue < 0.05 ? "default" : "secondary"}>
                                                p = {test.pValue.toFixed(3)}
                                              </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600">{test.interpretation}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">可视化图表</h4>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <LineChart data={result.chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="survival" stroke="#8884d8" strokeWidth={2} />
                                          </LineChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-4">
                                    <h4 className="font-semibold mb-2">建议和结论</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                      {result.recommendations.map((rec, index) => (
                                        <li key={index} className="text-sm">
                                          {rec}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">分析正在进行中，请稍后查看结果</p>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="datasets" className="space-y-4">
          <div className="grid gap-4">
            {dataSets.map((dataset) => (
              <Card key={dataset.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{dataset.name}</CardTitle>
                      <CardDescription>{dataset.description}</CardDescription>
                      <div className="text-sm text-gray-500 mt-2">
                        样本量：{dataset.sampleSize} | 变量数：{dataset.variables.length} | 上传：{dataset.uploadDate}
                      </div>
                    </div>
                    <Button variant="outline">查看详情</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold">变量概览</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>变量名</TableHead>
                          <TableHead>类型</TableHead>
                          <TableHead>描述</TableHead>
                          <TableHead>单位</TableHead>
                          <TableHead>缺失值</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dataset.variables.slice(0, 5).map((variable, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{variable.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{variable.type === "continuous" ? "连续型" : "分类型"}</Badge>
                            </TableCell>
                            <TableCell>{variable.description}</TableCell>
                            <TableCell>{variable.unit || "-"}</TableCell>
                            <TableCell>{variable.missingValues}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {dataset.variables.length > 5 && (
                      <p className="text-sm text-gray-500">还有 {dataset.variables.length - 5} 个变量...</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  生存分析
                </CardTitle>
                <CardDescription>Kaplan-Meier、Cox回归等生存分析方法</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">使用模型</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  回归分析
                </CardTitle>
                <CardDescription>线性回归、逻辑回归、多元回归分析</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">使用模型</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ScatterIcon className="h-5 w-5" />
                  机器学习
                </CardTitle>
                <CardDescription>随机森林、SVM、神经网络等算法</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">使用模型</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>分析报告生成器</CardTitle>
                    <CardDescription>自动生成专业的统计分析报告</CardDescription>
                  </div>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    生成报告
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>报告模板</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择报告模板" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clinical_trial">临床试验报告</SelectItem>
                        <SelectItem value="observational">观察性研究报告</SelectItem>
                        <SelectItem value="meta_analysis">Meta分析报告</SelectItem>
                        <SelectItem value="biomarker">生物标志物研究报告</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>输出格式</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择输出格式" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="word">Word文档</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="latex">LaTeX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
