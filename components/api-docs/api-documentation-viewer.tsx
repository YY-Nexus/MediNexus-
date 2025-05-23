"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  Book,
  Shield,
  Users,
  GraduationCap,
  ClipboardCheck,
  FileText,
  Globe,
} from "lucide-react"
import { apiDocumentation } from "../../data/api-documentation"
import type { ApiEndpoint, ApiSection } from "../../types/api-docs"

const methodColors = {
  GET: "bg-green-100 text-green-800 border-green-200",
  POST: "bg-blue-100 text-blue-800 border-blue-200",
  PUT: "bg-yellow-100 text-yellow-800 border-yellow-200",
  DELETE: "bg-red-100 text-red-800 border-red-200",
  PATCH: "bg-purple-100 text-purple-800 border-purple-200",
}

const sectionIcons = {
  认证与授权: Shield,
  培训师认证申请: FileText,
  培训管理: GraduationCap,
  考核管理: ClipboardCheck,
  用户管理: Users,
}

interface CodeBlockProps {
  code: string
  language?: string
}

function CodeBlock({ code, language = "json" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("复制失败:", err)
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" className="absolute top-2 right-2 z-10" onClick={copyToClipboard}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}

interface EndpointCardProps {
  endpoint: ApiEndpoint
}

function EndpointCard({ endpoint }: EndpointCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className={`${methodColors[endpoint.method]} font-mono text-xs`}>
                  {endpoint.method}
                </Badge>
                <div>
                  <CardTitle className="text-lg font-mono">{endpoint.path}</CardTitle>
                  <CardDescription className="mt-1">{endpoint.description}</CardDescription>
                </div>
              </div>
              {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="request">请求</TabsTrigger>
                <TabsTrigger value="response">响应</TabsTrigger>
                <TabsTrigger value="examples">示例</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">基本信息</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">路径:</span>{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
                      </div>
                      <div>
                        <span className="font-medium">方法:</span>{" "}
                        <Badge className={methodColors[endpoint.method]}>{endpoint.method}</Badge>
                      </div>
                      <div>
                        <span className="font-medium">认证:</span> {endpoint.authentication ? "✅ 需要" : "❌ 不需要"}
                      </div>
                      {endpoint.rateLimit && (
                        <div>
                          <span className="font-medium">限流:</span> {endpoint.rateLimit}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">描述</h4>
                    <p className="text-sm text-gray-600">{endpoint.description}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="request" className="space-y-4">
                {endpoint.requestParams && endpoint.requestParams.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">请求参数</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-200 text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-200 px-3 py-2 text-left">参数名</th>
                            <th className="border border-gray-200 px-3 py-2 text-left">类型</th>
                            <th className="border border-gray-200 px-3 py-2 text-left">必需</th>
                            <th className="border border-gray-200 px-3 py-2 text-left">描述</th>
                            <th className="border border-gray-200 px-3 py-2 text-left">示例</th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoint.requestParams.map((param, index) => (
                            <tr key={index}>
                              <td className="border border-gray-200 px-3 py-2 font-mono">{param.name}</td>
                              <td className="border border-gray-200 px-3 py-2">{param.type}</td>
                              <td className="border border-gray-200 px-3 py-2">{param.required ? "✅" : "❌"}</td>
                              <td className="border border-gray-200 px-3 py-2">{param.description}</td>
                              <td className="border border-gray-200 px-3 py-2 font-mono text-xs">{param.example}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {endpoint.requestBody && (
                  <div>
                    <h4 className="font-semibold mb-3">请求体</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium">Content-Type:</span>
                        <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm">
                          {endpoint.requestBody.contentType}
                        </code>
                      </div>
                      {endpoint.requestBody.example && (
                        <div>
                          <span className="font-medium mb-2 block">示例:</span>
                          <CodeBlock code={endpoint.requestBody.example} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="response" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">成功响应</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Content-Type:</span>
                      <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm">
                        {endpoint.responseBody.contentType}
                      </code>
                    </div>
                    {endpoint.responseBody.example && (
                      <div>
                        <span className="font-medium mb-2 block">示例:</span>
                        <CodeBlock code={endpoint.responseBody.example} />
                      </div>
                    )}
                  </div>
                </div>

                {endpoint.errorResponses && endpoint.errorResponses.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">错误响应</h4>
                    <div className="space-y-3">
                      {endpoint.errorResponses.map((error, index) => (
                        <Card key={index} className="border-red-200">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="destructive">{error.status}</Badge>
                              <code className="bg-red-50 text-red-800 px-2 py-1 rounded text-sm">{error.code}</code>
                            </div>
                            <p className="font-medium text-red-800 mb-1">{error.message}</p>
                            {error.description && <p className="text-sm text-red-600">{error.description}</p>}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="examples" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">完整示例</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-2">cURL 请求示例</h5>
                      <CodeBlock code={generateCurlExample(endpoint)} language="bash" />
                    </div>

                    {endpoint.responseBody.example && (
                      <div>
                        <h5 className="font-medium mb-2">响应示例</h5>
                        <CodeBlock code={endpoint.responseBody.example} />
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

function generateCurlExample(endpoint: ApiEndpoint): string {
  const baseUrl = apiDocumentation.baseUrl
  let curl = `curl -X ${endpoint.method} "${baseUrl}${endpoint.path}"`

  if (endpoint.authentication) {
    curl += ` \\\n  -H "Authorization: Bearer YOUR_TOKEN"`
  }

  if (endpoint.requestBody) {
    curl += ` \\\n  -H "Content-Type: ${endpoint.requestBody.contentType}"`
    if (endpoint.requestBody.example) {
      curl += ` \\\n  -d '${endpoint.requestBody.example.replace(/\n\s*/g, " ")}'`
    }
  }

  return curl
}

interface SectionNavigationProps {
  sections: ApiSection[]
  activeSection: string
  onSectionChange: (sectionName: string) => void
}

function SectionNavigation({ sections, activeSection, onSectionChange }: SectionNavigationProps) {
  return (
    <div className="w-64 border-r bg-gray-50 p-4">
      <h3 className="font-semibold mb-4 flex items-center">
        <Book className="h-5 w-5 mr-2" />
        API 模块
      </h3>
      <nav className="space-y-2">
        {sections.map((section) => {
          const Icon = sectionIcons[section.name as keyof typeof sectionIcons] || FileText
          return (
            <button
              key={section.name}
              onClick={() => onSectionChange(section.name)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === section.name
                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{section.name}</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                {section.endpoints.length}
              </Badge>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default function ApiDocumentationViewer() {
  const [activeSection, setActiveSection] = useState(apiDocumentation.sections[0]?.name || "")

  const currentSection = apiDocumentation.sections.find((section) => section.name === activeSection)

  return (
    <div className="min-h-screen bg-white">
      {/* 头部 */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{apiDocumentation.title}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="outline">版本 {apiDocumentation.version}</Badge>
                <span className="text-sm text-gray-600">
                  基础URL: <code className="bg-gray-100 px-2 py-1 rounded">{apiDocumentation.baseUrl}</code>
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl">{apiDocumentation.description}</p>
        </div>
      </div>

      <div className="flex">
        {/* 侧边导航 */}
        <SectionNavigation
          sections={apiDocumentation.sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* 主内容区 */}
        <div className="flex-1">
          <ScrollArea className="h-[calc(100vh-140px)]">
            <div className="p-6">
              {currentSection && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentSection.name}</h2>
                    <p className="text-gray-600">{currentSection.description}</p>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-6">
                    {currentSection.endpoints.map((endpoint, index) => (
                      <EndpointCard key={index} endpoint={endpoint} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* 认证说明 */}
      <div className="border-t bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-semibold mb-3 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            认证说明
          </h3>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-600 mb-2">
              <strong>认证类型:</strong> {apiDocumentation.authentication.type}
            </p>
            <p className="text-sm text-gray-600">{apiDocumentation.authentication.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
