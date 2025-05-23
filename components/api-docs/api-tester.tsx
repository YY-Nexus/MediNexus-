"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface ApiTesterProps {
  endpoint: string
  method: string
  description: string
  requestBody?: any
  headers?: Record<string, string>
}

export function ApiTester({ endpoint, method, description, requestBody, headers = {} }: ApiTesterProps) {
  const [url, setUrl] = useState(`/api/v1${endpoint}`)
  const [body, setBody] = useState(requestBody ? JSON.stringify(requestBody, null, 2) : "")
  const [customHeaders, setCustomHeaders] = useState<Record<string, string>>({
    "Content-Type": "application/json",
    ...headers,
  })
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [responseTime, setResponseTime] = useState<number | null>(null)

  const handleHeaderChange = (key: string, value: string) => {
    setCustomHeaders((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const addHeader = () => {
    setCustomHeaders((prev) => ({
      ...prev,
      "": "",
    }))
  }

  const removeHeader = (key: string) => {
    setCustomHeaders((prev) => {
      const newHeaders = { ...prev }
      delete newHeaders[key]
      return newHeaders
    })
  }

  const sendRequest = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)
    setResponseTime(null)

    try {
      const startTime = performance.now()

      const options: RequestInit = {
        method,
        headers: Object.entries(customHeaders)
          .filter(([key, value]) => key && value)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
      }

      if (["POST", "PUT", "PATCH"].includes(method) && body) {
        options.body = body
      }

      const response = await fetch(url, options)
      const endTime = performance.now()
      setResponseTime(Math.round(endTime - startTime))

      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json()
        setResponse({
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          data,
        })
      } else {
        const text = await response.text()
        setResponse({
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          data: text,
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">API 测试工具</CardTitle>
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
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="request">
          <TabsList className="mb-4">
            <TabsTrigger value="request">请求</TabsTrigger>
            <TabsTrigger value="response">响应</TabsTrigger>
          </TabsList>

          <TabsContent value="request">
            <div className="space-y-4">
              <div>
                <Label htmlFor="url">URL</Label>
                <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="API 端点 URL" />
              </div>

              <div>
                <Label>请求头</Label>
                <div className="space-y-2 mt-2">
                  {Object.entries(customHeaders).map(([key, value], index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={key}
                        onChange={(e) => handleHeaderChange(key, value)}
                        placeholder="Header 名称"
                        className="w-1/3"
                      />
                      <Input
                        value={value}
                        onChange={(e) => handleHeaderChange(key, e.target.value)}
                        placeholder="Header 值"
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm" onClick={() => removeHeader(key)}>
                        删除
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addHeader}>
                    添加请求头
                  </Button>
                </div>
              </div>

              {["POST", "PUT", "PATCH"].includes(method) && (
                <div>
                  <Label htmlFor="body">请求体 (JSON)</Label>
                  <Textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="请求体 JSON 数据"
                    className="font-mono text-sm"
                    rows={10}
                  />
                </div>
              )}

              <Button onClick={sendRequest} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    发送请求中...
                  </>
                ) : (
                  "发送请求"
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="response">
            <div className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                  <p className="font-medium">请求错误</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {response && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          response.status >= 200 && response.status < 300
                            ? "success"
                            : response.status >= 400 && response.status < 500
                              ? "warning"
                              : response.status >= 500
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {response.status} {response.statusText}
                      </Badge>
                      {responseTime !== null && <span className="text-xs text-muted-foreground">{responseTime}ms</span>}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">响应头</p>
                    <div className="bg-muted p-2 rounded-md">
                      <ScrollArea className="h-24">
                        <pre className="text-xs">{JSON.stringify(response.headers, null, 2)}</pre>
                      </ScrollArea>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">响应体</p>
                    <div className="bg-muted p-2 rounded-md">
                      <ScrollArea className="h-80">
                        <pre className="text-xs whitespace-pre-wrap">
                          {typeof response.data === "object" ? JSON.stringify(response.data, null, 2) : response.data}
                        </pre>
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              )}

              {!response && !error && !loading && (
                <div className="p-8 text-center text-muted-foreground">
                  <p>发送请求以查看响应</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
