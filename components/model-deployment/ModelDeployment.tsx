"use client"

// 导入原始的ModelDeployment组件
import { ModelDeployment as OriginalModelDeployment } from "../ai-model-training/model-deployment"

// 重新导出组件，确保命名导出正确
export function ModelDeployment() {
  return <OriginalModelDeployment />
}
