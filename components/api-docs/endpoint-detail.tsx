"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, Copy, Play } from "lucide-react"
import { ApiTester } from "./api-tester"
import { ScrollArea } from "@/components/ui/scroll-area"

interface EndpointDetailProps {
  path: string
  method: string
  description: string
  requestParams?: {
    name: string
    type: string
    required: boolean
    description: string
    example: string
  }[]
  requestBody?: {
    contentType: string
    schema: any
    example: string
  }
  responseBody: {
    contentType: string
    schema: any
    example: string
  }
  errorResponses?: {
    status: number
    code: string
    message: string
    description: string
  }[]
  authentication?: boolean
  rateLimit?: string
}

export function EndpointDetail({
  path,
  method,
  description,
  requestParams,
  requestBody,
  responseBody,
  errorResponses,
  authentication,
  rateLimit,
}: EndpointDetailProps) {
  const [showTester, setShowTester] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const generateCurlCommand = () => {
    let curl = `curl -X ${method} "${window.location.origin}/api/v1${path}"`

    // 添加请求头
    curl += ' \\\n  -H "Content-Type: application/json"'
    if (authentication) {
      curl += ' \\\n  -H "Authorization: Bearer YOUR_TOKEN"'
    }

    // 添加请求体
    if (["POST", "PUT", "PATCH"].includes(method) && requestBody) {
      curl += ` \\\n  -d '${requestBody.example}'`
    }

    return curl
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge
              variant={
                method === "GET"
                  ? "secondary"
                  : method === "POST"
                    ? "default"
                    : method === "PUT"
                      ? "outline"
                      : method === "DELETE"
                        ? "destructive"
                        : "default"
              }
            >
              {method}
            </Badge>
            <CardTitle className="text-lg font-mono">{path}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(generateCurlCommand())}>
              <Copy className="h-4 w-4 mr-1" />
              复制 cURL
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowTester(!showTester)}>
              <Play className="h-4 w-4 mr-1" />
              {showTester ? "隐藏测试工具" : "测试接口"}
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
        {authentication && (
          <Badge variant="outline" className="mt-2">
            需要认证
          </Badge>
        )}
        {rateLimit && (
          <Badge variant="outline" className="mt-2 ml-2">
            限流: {rateLimit}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="params">
          <TabsList className="mb-4">
            <TabsTrigger value="params">请求参数</TabsTrigger>
            <TabsTrigger value="body">请求体</TabsTrigger>
            <TabsTrigger value="response">响应</TabsTrigger>
            <TabsTrigger value="errors">错误处理</TabsTrigger>
            <TabsTrigger value="curl">cURL 示例</TabsTrigger>
          </TabsList>

          <TabsContent value="params">
            {requestParams && requestParams.length > 0 ? (
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-medium">参数名</th>
                      <th className="text-left p-2 font-medium">类型</th>
                      <th className="text-left p-2 font-medium">必填</th>
                      <th className="text-left p-2 font-medium">描述</th>
                      <th className="text-left p-2 font-medium">示例</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestParams.map((param, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-muted/20"}>
                        <td className="p-2 font-mono text-sm">{param.name}</td>
                        <td className="p-2 text-sm">{param.type}</td>
                        <td className="p-2 text-sm">{param.required ? "是" : "否"}</td>
                        <td className="p-2 text-sm">{param.description}</td>
                        <td className="p-2 font-mono text-sm">{param.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">此接口不需要请求参数</p>
            )}
          </TabsContent>

          <TabsContent value="body">
            {requestBody ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Content-Type</p>
                  <p className="text-sm font-mono">{requestBody.contentType}</p>
                </div>

                <Collapsible>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Schema</p>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <div className="bg-muted p-2 rounded-md mt-1">
                      <pre className="text-xs">{JSON.stringify(requestBody.schema, null, 2)}</pre>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div>
                  <p className="text-sm font-medium mb-1">示例</p>
                  <div className="bg-muted p-2 rounded-md relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(requestBody.example)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <ScrollArea className="h-60">
                      <pre className="text-xs">{requestBody.example}</pre>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">此接口不需要请求体</p>
            )}
          </TabsContent>

          <TabsContent value="response">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Content-Type</p>
                <p className="text-sm font-mono">{responseBody.contentType}</p>
              </div>

              <Collapsible>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Schema</p>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div className="bg-muted p-2 rounded-md mt-1">
                    <pre className="text-xs">{JSON.stringify(responseBody.schema, null, 2)}</pre>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div>
                <p className="text-sm font-medium mb-1">示例</p>
                <div className="bg-muted p-2 rounded-md relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(responseBody.example)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <ScrollArea className="h-60">
                    <pre className="text-xs">{responseBody.example}</pre>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="errors">
            {errorResponses && errorResponses.length > 0 ? (
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-medium">状态码</th>
                      <th className="text-left p-2 font-medium">错误码</th>
                      <th className="text-left p-2 font-medium">错误信息</th>
                      <th className="text-left p-2 font-medium">描述</th>
                    </tr>
                  </thead>
                  <tbody>
                    {errorResponses.map((error, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-muted/20"}>
                        <td className="p-2 text-sm">{error.status}</td>
                        <td className="p-2 font-mono text-sm">{error.code}</td>
                        <td className="p-2 text-sm">{error.message}</td>
                        <td className="p-2 text-sm">{error.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">此接口没有特定的错误响应</p>
            )}
          </TabsContent>

          <TabsContent value="curl">
            <div className="bg-muted p-4 rounded-md relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(generateCurlCommand())}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <pre className="text-xs whitespace-pre-wrap">{generateCurlCommand()}</pre>
            </div>
          </TabsContent>
        </Tabs>

        {showTester && (
          <ApiTester
            endpoint={path}
            method={method}
            description={description}
            requestBody={requestBody ? JSON.parse(requestBody.example) : undefined}
            headers={authentication ? { Authorization: "Bearer YOUR_TOKEN" } : {}}
          />
        )}
      </CardContent>
    </Card>
  )
}
