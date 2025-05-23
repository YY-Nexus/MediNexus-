"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ApiTester } from "@/components/api-docs/api-tester"
import { Badge } from "@/components/ui/badge"
import { apiDocumentation } from "../../../data/api-documentation"

export default function ApiTesterPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(null)
  const [selectedSection, setSelectedSection] = useState(apiDocumentation.sections[0]?.name || "")

  const currentSection = apiDocumentation.sections.find((section) => section.name === selectedSection)

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">API 测试工具</h1>
        <p className="text-muted-foreground">在线测试API接口，支持自定义请求参数、请求头和请求体，实时查看响应结果。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：API选择器 */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>选择API接口</CardTitle>
              <CardDescription>选择要测试的API接口</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">API模块</label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择API模块" />
                  </SelectTrigger>
                  <SelectContent>
                    {apiDocumentation.sections.map((section) => (
                      <SelectItem key={section.name} value={section.name}>
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentSection && (
                <div>
                  <label className="text-sm font-medium mb-2 block">API接口</label>
                  <div className="space-y-2">
                    {currentSection.endpoints.map((endpoint, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedEndpoint(endpoint)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedEndpoint === endpoint ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{endpoint.path}</span>
                          <Badge
                            variant={
                              endpoint.method === "GET"
                                ? "secondary"
                                : endpoint.method === "POST"
                                  ? "default"
                                  : endpoint.method === "PUT"
                                    ? "outline"
                                    : endpoint.method === "DELETE"
                                      ? "destructive"
                                      : "default"
                            }
                            className="text-xs"
                          >
                            {endpoint.method}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{endpoint.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 右侧：API测试器 */}
        <div className="lg:col-span-2">
          {selectedEndpoint ? (
            <ApiTester
              endpoint={selectedEndpoint.path}
              method={selectedEndpoint.method}
              description={selectedEndpoint.description}
              requestBody={
                selectedEndpoint.requestBody?.example ? JSON.parse(selectedEndpoint.requestBody.example) : undefined
              }
              headers={selectedEndpoint.authentication ? { Authorization: "Bearer YOUR_TOKEN" } : {}}
            />
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">请选择要测试的API接口</p>
                  <p className="text-sm text-muted-foreground">从左侧列表中选择一个API接口开始测试</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
