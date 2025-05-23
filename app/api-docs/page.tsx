import type { Metadata } from "next"
import ApiDocumentationViewer from "@/components/api-docs/api-documentation-viewer"

export const metadata: Metadata = {
  title: "API 接口文档 - 言语医枢³ 培训师认证系统",
  description: "言语医枢³培训师认证系统的完整API接口文档，包含所有模块的详细接口说明和使用示例。",
}

export default function ApiDocsPage() {
  return <ApiDocumentationViewer />
}
