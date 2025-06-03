"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertTriangle, ArrowRight, Users, Brain, Pill, FileText, Activity } from "lucide-react"
import { useUnifiedDataFlow } from "@/services/unified-data-flow-service"

// 工作流步骤定义
const workflowSteps = [
  {
    id: "patient-selection",
    name: "患者选择",
    description: "选择或创建患者档案",
    icon: Users,
    estimatedTime: 30,
    dependencies: [],
  },
  {
    id: "data-collection",
    name: "数据收集",
    description: "收集患者基本信息和病史",
    icon: FileText,
    estimatedTime: 120,
    dependencies: ["patient-selection"],
  },
  {
    id: "ai-analysis",
    name: "AI智能分析",
    description: "多模态AI诊断分析",
    icon: Brain,
    estimatedTime: 60,
    dependencies: ["data-collection"],
  },
  {
    id: "clinical-decision",
    name: "临床决策",
    description: "基于AI分析的临床决策支持",
    icon: Activity,
    estimatedTime: 180,
    dependencies: ["ai-analysis"],
  },
  {
    id: "medication-management",
    name: "药物管理",
    description: "处方开具和药物相互作用检查",
    icon: Pill,
    estimatedTime: 90,
    dependencies: ["clinical-decision"],
  },
  {
    id: "treatment-plan",
    name: "治疗方案",
    description: "制定个性化治疗计划",
    icon: CheckCircle,
    estimatedTime: 120,
    dependencies: ["medication-management"],
  },
]

export function WorkflowEngine() {
  const {
    workflowState,
    currentPatient,
    diagnosisFlow,
    medicationFlow,
    integrationStatus,
    advanceWorkflow,
    triggerAIAnalysis,
    addNotification,
  } = useUnifiedDataFlow()

  const [workflowProgress, setWorkflowProgress] = useState(0)
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(0)

  // 计算工作流进度
  useEffect(() => {
    const currentStepIndex = workflowSteps.findIndex((step) => step.id === workflowState.currentStep)
    const completedSteps = workflowState.completedSteps.length
    const totalSteps = workflowSteps.length

    const progress = (completedSteps / totalSteps) * 100
    setWorkflowProgress(progress)

    // 计算预估剩余时间
    const remainingSteps = workflowSteps.slice(currentStepIndex)
    const totalTime = remainingSteps.reduce((sum, step) => sum + step.estimatedTime, 0)
    setEstimatedTimeRemaining(totalTime)
  }, [workflowState.currentStep, workflowState.completedSteps])

  // 获取步骤状态
  const getStepStatus = (stepId: string) => {
    if (workflowState.completedSteps.includes(stepId)) {
      return "completed"
    } else if (stepId === workflowState.currentStep) {
      return "active"
    } else {
      return "pending"
    }
  }

  // 检查步骤是否可执行
  const canExecuteStep = (step: any) => {
    return step.dependencies.every((dep: string) => workflowState.completedSteps.includes(dep))
  }

  // 自动执行下一步
  const executeNextStep = async () => {
    const currentStep = workflowSteps.find((step) => step.id === workflowState.currentStep)

    if (!currentStep) return

    switch (currentStep.id) {
      case "patient-selection":
        if (currentPatient.id) {
          advanceWorkflow("data-collection")
        }
        break

      case "data-collection":
        if (currentPatient.basicInfo && currentPatient.medicalHistory.length > 0) {
          advanceWorkflow("ai-analysis")
        }
        break

      case "ai-analysis":
        if (currentPatient.id) {
          await triggerAIAnalysis(currentPatient)
        }
        break

      case "clinical-decision":
        if (diagnosisFlow.aiAnalysis) {
          advanceWorkflow("medication-management")
        }
        break

      case "medication-management":
        if (medicationFlow.activePrescriptions.length > 0) {
          advanceWorkflow("treatment-plan")
        }
        break

      default:
        break
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-600" />
          智能工作流引擎
        </CardTitle>
        <CardDescription>跨模块集成的智能医疗工作流，自动协调各系统间的数据流转</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 整体进度 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">整体进度</span>
            <span className="text-sm text-muted-foreground">
              预估剩余时间: {Math.round(estimatedTimeRemaining / 60)} 分钟
            </span>
          </div>
          <Progress value={workflowProgress} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {workflowState.completedSteps.length} / {workflowSteps.length} 步骤已完成
          </div>
        </div>

        {/* 系统集成状态 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(integrationStatus).map(([service, status]) => (
            <div key={service} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <div className={`w-2 h-2 rounded-full ${status ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-xs">
                {service === "ehrSync" && "EHR同步"}
                {service === "aiModelStatus" && "AI模型"}
                {service === "notificationSystem" && "通知系统"}
                {service === "mobileSync" && "移动同步"}
              </span>
            </div>
          ))}
        </div>

        {/* 工作流步骤 */}
        <div className="space-y-3">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon
            const status = getStepStatus(step.id)
            const canExecute = canExecuteStep(step)

            return (
              <div
                key={step.id}
                className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                  status === "completed"
                    ? "bg-green-50 border-green-200"
                    : status === "active"
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200"
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    status === "completed"
                      ? "bg-green-100 text-green-600"
                      : status === "active"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {status === "completed" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : status === "active" ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{step.name}</h4>
                    <Badge variant={status === "completed" ? "default" : status === "active" ? "secondary" : "outline"}>
                      {status === "completed" ? "已完成" : status === "active" ? "进行中" : "待执行"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <div className="text-xs text-muted-foreground mt-1">预估时间: {step.estimatedTime} 秒</div>
                </div>

                {status === "active" && canExecute && (
                  <Button size="sm" onClick={executeNextStep} className="ml-auto">
                    执行
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                )}

                {!canExecute && status === "pending" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
              </div>
            )
          })}
        </div>

        {/* 实时通知 */}
        {workflowState.notifications.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">实时通知</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {workflowState.notifications.slice(-3).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-2 rounded text-xs ${
                    notification.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : notification.type === "error"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  <div className="font-medium">{notification.title}</div>
                  <div>{notification.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
