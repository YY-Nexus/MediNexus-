"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Code, Play, CheckCircle, XCircle, Settings, FileText, Database, Copy, Download, Upload } from "lucide-react"

// 模拟标准化接口配置
const standardInterfaces = [
  {
    id: "fhir-r4",
    name: "FHIR R4",
    version: "4.0.1",
    description: "Fast Healthcare Interoperability Resources R4标准",
    status: "active",
    endpoints: [
      { path: "/Patient", method: "GET", description: "获取患者信息" },
      { path: "/Patient", method: "POST", description: "创建患者记录" },
      { path: "/Observation", method: "GET", description: "获取观察记录" },
      { path: "/DiagnosticReport", method: "GET", description: "获取诊断报告" },
      { path: "/Medication", method: "GET", description: "获取药物信息" },
    ],
    implementations: 3,
    testsPassed: 45,
    testsTotal: 50,
  },
  {
    id: "hl7-v25",
    name: "HL7 v2.5",
    version: "2.5.1",
    description: "Health Level Seven International v2.5消息标准",
    status: "active",
    endpoints: [
      { path: "/ADT", method: "POST", description: "患者入院/出院/转科消息" },
      { path: "/ORM", method: "POST", description: "医嘱消息" },
      { path: "/ORU", method: "POST", description: "观察结果消息" },
      { path: "/SIU", method: "POST", description: "预约调度消息" },
    ],
    implementations: 2,
    testsPassed: 32,
    testsTotal: 35,
  },
  {
    id: "dicom",
    name: "DICOM",
    version: "3.0",
    description: "Digital Imaging and Communications in Medicine标准",
    status: "active",
    endpoints: [
      { path: "/studies", method: "GET", description: "获取研究列表" },
      { path: "/series", method: "GET", description: "获取序列信息" },
      { path: "/instances", method: "GET", description: "获取实例数据" },
      { path: "/wado", method: "GET", description: "Web访问DICOM对象" },
    ],
    implementations: 1,
    testsPassed: 28,
    testsTotal: 30,
  },
  {
    id: "ihe-xds",
    name: "IHE XDS",
    version: "1.3",
    description: "Integrating the Healthcare Enterprise跨企业文档共享",
    status: "development",
    endpoints: [
      { path: "/registry", method: "POST", description: "文档注册" },
      { path: "/repository", method: "POST", description: "文档存储" },
      { path: "/query", method: "GET", description: "文档查询" },
      { path: "/retrieve", method: "GET", description: "文档检索" },
    ],
    implementations: 0,
    testsPassed: 0,
    testsTotal: 25,
  },
]

// 模拟API测试结果
const apiTestResults = [
  {
    id: "test-001",
    interfaceId: "fhir-r4",
    endpoint: "/Patient",
    method: "GET",
    status: "passed",
    responseTime: 145,
    statusCode: 200,
    timestamp: "2025-01-24 14:30:25",
  },
  {
    id: "test-002",
    interfaceId: "fhir-r4",
    endpoint: "/Patient",
    method: "POST",
    status: "failed",
    responseTime: 2500,
    statusCode: 400,
    errorMessage: "Invalid patient data format",
    timestamp: "2025-01-24 14:28:15",
  },
  {
    id: "test-003",
    interfaceId: "hl7-v25",
    endpoint: "/ADT",
    method: "POST",
    status: "passed",
    responseTime: 89,
    statusCode: 200,
    timestamp: "2025-01-24 14:25:10",
  },
]

export default function StandardizedInterfaces() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedInterface, setSelectedInterface] = useState(standardInterfaces[0])
  const [testEndpoint, setTestEndpoint] = useState("")
  const [testMethod, setTestMethod] = useState("GET")
  const [testPayload, setTestPayload] = useState("")
  const [testResults, setTestResults] = useState(apiTestResults)

  // 执行API测试
  const runApiTest = () => {
    const newTest = {
      id: `test-${Date.now()}`,
      interfaceId: selectedInterface.id,
      endpoint: testEndpoint,
      method: testMethod,
      status: Math.random() > 0.3 ? "passed" : "failed",
      responseTime: Math.floor(Math.random() * 1000) + 50,
      statusCode: Math.random() > 0.3 ? 200 : 400,
      errorMessage: Math.random() > 0.3 ? undefined : "测试错误消息",
      timestamp: new Date().toLocaleString("zh-CN"),
    }
    setTestResults([newTest, ...testResults])
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>标准化接口开发</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            导出配置
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">接口概览</TabsTrigger>
            <TabsTrigger value="development">接口开发</TabsTrigger>
            <TabsTrigger value="testing">接口测试</TabsTrigger>
            <TabsTrigger value="documentation">接口文档</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-blue-700">总接口数</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{standardInterfaces.length}</div>
                <div className="text-sm text-blue-600">标准化接口</div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium text-emerald-700">活跃接口</span>
                </div>
                <div className="text-2xl font-bold text-emerald-600">
                  {standardInterfaces.filter((i) => i.status === "active").length}
                </div>
                <div className="text-sm text-emerald-600">正在使用</div>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-amber-500" />
                  <span className="font-medium text-amber-700">开发中</span>
                </div>
                <div className="text-2xl font-bold text-amber-600">
                  {standardInterfaces.filter((i) => i.status === "development").length}
                </div>
                <div className="text-sm text-amber-600">正在开发</div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-purple-500" />
                  <span className="font-medium text-purple-700">总实现数</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {standardInterfaces.reduce((sum, i) => sum + i.implementations, 0)}
                </div>
                <div className="text-sm text-purple-600">系统集成</div>
              </div>
            </div>

            <div className="space-y-4">
              {standardInterfaces.map((interface_) => (
                <div key={interface_.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Code className="w-6 h-6 text-blue-500" />
                      <div>
                        <div className="font-medium text-lg">{interface_.name}</div>
                        <div className="text-sm text-muted-foreground">
                          版本 {interface_.version} • {interface_.description}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={interface_.status === "active" ? "default" : "outline"}
                      className={interface_.status === "active" ? "bg-emerald-500" : "text-amber-500 border-amber-500"}
                    >
                      {interface_.status === "active" ? "活跃" : "开发中"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">端点数量</div>
                      <div className="font-medium">{interface_.endpoints.length}</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">实现数量</div>
                      <div className="font-medium">{interface_.implementations}</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">测试通过率</div>
                      <div className="font-medium">
                        {((interface_.testsPassed / interface_.testsTotal) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <div className="text-sm text-muted-foreground">
                      {interface_.testsPassed}/{interface_.testsTotal} 测试通过
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        文档
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        测试
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        配置
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="development" className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">接口选择</h3>
                <Select
                  value={selectedInterface.id}
                  onValueChange={(value) =>
                    setSelectedInterface(standardInterfaces.find((i) => i.id === value) || standardInterfaces[0])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择接口标准" />
                  </SelectTrigger>
                  <SelectContent>
                    {standardInterfaces.map((interface_) => (
                      <SelectItem key={interface_.id} value={interface_.id}>
                        {interface_.name} v{interface_.version}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">{selectedInterface.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{selectedInterface.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">版本:</span> {selectedInterface.version}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">状态:</span>{" "}
                      <Badge
                        variant={selectedInterface.status === "active" ? "default" : "outline"}
                        className={
                          selectedInterface.status === "active" ? "bg-emerald-500" : "text-amber-500 border-amber-500"
                        }
                      >
                        {selectedInterface.status === "active" ? "活跃" : "开发中"}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">实现数:</span> {selectedInterface.implementations}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">端点列表</h3>
                <div className="space-y-2">
                  {selectedInterface.endpoints.map((endpoint, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm">{endpoint.path}</code>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{endpoint.description}</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">代码生成器</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">目标语言</label>
                  <Select defaultValue="typescript">
                    <SelectTrigger>
                      <SelectValue placeholder="选择编程语言" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">框架</label>
                  <Select defaultValue="nextjs">
                    <SelectTrigger>
                      <SelectValue placeholder="选择框架" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nextjs">Next.js</SelectItem>
                      <SelectItem value="express">Express.js</SelectItem>
                      <SelectItem value="fastapi">FastAPI</SelectItem>
                      <SelectItem value="spring">Spring Boot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-4">
                <Code className="w-4 h-4 mr-2" />
                生成接口代码
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="testing" className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">API测试工具</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">接口标准</label>
                    <Select
                      value={selectedInterface.id}
                      onValueChange={(value) =>
                        setSelectedInterface(standardInterfaces.find((i) => i.id === value) || standardInterfaces[0])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择接口标准" />
                      </SelectTrigger>
                      <SelectContent>
                        {standardInterfaces.map((interface_) => (
                          <SelectItem key={interface_.id} value={interface_.id}>
                            {interface_.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">端点路径</label>
                    <Input
                      value={testEndpoint}
                      onChange={(e) => setTestEndpoint(e.target.value)}
                      placeholder="/Patient"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">HTTP方法</label>
                    <Select value={testMethod} onValueChange={setTestMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择HTTP方法" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(testMethod === "POST" || testMethod === "PUT") && (
                    <div>
                      <label className="block text-sm font-medium mb-2">请求体</label>
                      <Textarea
                        value={testPayload}
                        onChange={(e) => setTestPayload(e.target.value)}
                        placeholder="输入JSON格式的请求体"
                        rows={6}
                      />
                    </div>
                  )}

                  <Button onClick={runApiTest} className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    执行测试
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">测试结果</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {testResults.map((result) => (
                    <div key={result.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {result.method}
                          </Badge>
                          <code className="text-sm">{result.endpoint}</code>
                        </div>
                        <div className="flex items-center gap-2">
                          {result.status === "passed" ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <Badge
                            variant={result.status === "passed" ? "default" : "outline"}
                            className={result.status === "passed" ? "bg-emerald-500" : "text-red-500 border-red-500"}
                          >
                            {result.status === "passed" ? "通过" : "失败"}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div>状态码: {result.statusCode}</div>
                        <div>响应时间: {result.responseTime}ms</div>
                        <div>时间: {result.timestamp}</div>
                        {result.errorMessage && <div className="text-red-600 mt-1">错误: {result.errorMessage}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="pt-4">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">接口文档</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    导入文档
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    导出文档
                  </Button>
                </div>
              </div>

              {standardInterfaces.map((interface_) => (
                <div key={interface_.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-blue-500" />
                    <div>
                      <div className="font-medium text-lg">{interface_.name} 文档</div>
                      <div className="text-sm text-muted-foreground">版本 {interface_.version}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">概述</h4>
                      <p className="text-sm text-muted-foreground">{interface_.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">端点列表</h4>
                      <div className="space-y-2">
                        {interface_.endpoints.map((endpoint, index) => (
                          <div key={index} className="p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {endpoint.method}
                              </Badge>
                              <code className="text-sm font-mono">{endpoint.path}</code>
                            </div>
                            <div className="text-sm text-muted-foreground">{endpoint.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        查看完整文档
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        下载PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
