"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// 定义模型部署状态类型
type DeploymentStatus = "deployed" | "pending" | "failed" | "stopped"

// 定义模型部署信息类型
interface ModelDeployment {
  id: string
  name: string
  version: string
  status: DeploymentStatus
  environment: string
  deployedAt: string
  health: number
  region: string
  resources: {
    cpu: string
    memory: string
    gpu?: string
  }
}

// 模拟数据
const deployments: ModelDeployment[] = [
  {
    id: "model-1",
    name: "肺部CT诊断模型",
    version: "v2.3.0",
    status: "deployed",
    environment: "生产环境",
    deployedAt: "2023-05-15T08:30:00Z",
    health: 98,
    region: "华东区域",
    resources: {
      cpu: "4 核",
      memory: "16 GB",
      gpu: "NVIDIA T4",
    },
  },
  {
    id: "model-2",
    name: "心电图分析模型",
    version: "v1.5.2",
    status: "deployed",
    environment: "生产环境",
    deployedAt: "2023-04-20T10:15:00Z",
    health: 100,
    region: "华北区域",
    resources: {
      cpu: "2 核",
      memory: "8 GB",
    },
  },
  {
    id: "model-3",
    name: "医学影像分割模型",
    version: "v3.0.1",
    status: "pending",
    environment: "测试环境",
    deployedAt: "2023-05-18T14:45:00Z",
    health: 0,
    region: "华南区域",
    resources: {
      cpu: "8 核",
      memory: "32 GB",
      gpu: "NVIDIA A100",
    },
  },
  {
    id: "model-4",
    name: "医疗文本分析模型",
    version: "v1.2.0",
    status: "failed",
    environment: "开发环境",
    deployedAt: "2023-05-17T09:20:00Z",
    health: 0,
    region: "华东区域",
    resources: {
      cpu: "2 核",
      memory: "4 GB",
    },
  },
]

// 获取状态徽章颜色
const getStatusColor = (status: DeploymentStatus) => {
  switch (status) {
    case "deployed":
      return "bg-green-500"
    case "pending":
      return "bg-yellow-500"
    case "failed":
      return "bg-red-500"
    case "stopped":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

// 获取状态文本
const getStatusText = (status: DeploymentStatus) => {
  switch (status) {
    case "deployed":
      return "已部署"
    case "pending":
      return "部署中"
    case "failed":
      return "部署失败"
    case "stopped":
      return "已停止"
    default:
      return "未知状态"
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// 模型部署组件
function ModelDeploymentComponent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">总部署模型</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">运行中模型</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployments.filter((d) => d.status === "deployed").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">部署中模型</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployments.filter((d) => d.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">故障模型</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployments.filter((d) => d.status === "failed").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>模型部署状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deployments.map((deployment) => (
              <div key={deployment.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{deployment.name}</h3>
                    <div className="text-sm text-muted-foreground">版本: {deployment.version}</div>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0 space-x-2">
                    <Badge className={`${getStatusColor(deployment.status)}`}>{getStatusText(deployment.status)}</Badge>
                    <Badge variant="outline">{deployment.environment}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">部署时间</div>
                    <div>{formatDate(deployment.deployedAt)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">部署区域</div>
                    <div>{deployment.region}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">资源配置</div>
                    <div>
                      {deployment.resources.cpu} / {deployment.resources.memory}{" "}
                      {deployment.resources.gpu ? `/ ${deployment.resources.gpu}` : ""}
                    </div>
                  </div>
                </div>

                {deployment.status === "deployed" && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-muted-foreground">健康状态</span>
                      <span className="text-sm font-medium">{deployment.health}%</span>
                    </div>
                    <Progress value={deployment.health} className="h-2" />
                  </div>
                )}

                <div className="flex justify-end mt-4 space-x-2">
                  {deployment.status === "deployed" && (
                    <>
                      <Button variant="outline" size="sm">
                        查看日志
                      </Button>
                      <Button variant="outline" size="sm">
                        监控
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                        停止
                      </Button>
                    </>
                  )}
                  {deployment.status === "pending" && (
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      取消部署
                    </Button>
                  )}
                  {deployment.status === "failed" && (
                    <>
                      <Button variant="outline" size="sm">
                        查看错误
                      </Button>
                      <Button variant="default" size="sm">
                        重试
                      </Button>
                    </>
                  )}
                  {deployment.status === "stopped" && (
                    <Button variant="default" size="sm">
                      启动
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 导出组件
export default ModelDeploymentComponent
