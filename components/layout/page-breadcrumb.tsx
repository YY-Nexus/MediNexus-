"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function PageBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  // 路径映射表
  const pathMap: Record<string, string> = {
    "ai-diagnosis": "智能诊断",
    "ai-model": "AI模型",
    records: "诊断记录",
    training: "模型训练",
    performance: "性能分析",
    deployment: "模型部署",
    patients: "患者管理",
    followup: "随访计划",
    groups: "患者分组",
    "clinical-decision": "临床决策",
    treatments: "治疗方案",
    guidelines: "临床指南",
    "drug-reference": "药物参考",
    medications: "药物管理",
    prescriptions: "处方管理",
    interactions: "药物互作",
    inventory: "库存管理",
    "health-data": "健康数据",
    vitals: "生命体征",
    tests: "检测结果",
    trends: "趋势分析",
    import: "数据导入",
    research: "医学研究",
    analysis: "数据分析",
    samples: "样本管理",
    trials: "试验设计",
    certifications: "资质验证",
    upload: "资质上传",
    status: "验证状态",
    management: "资质管理",
    providers: "验证机构",
    security: "数据安全",
    access: "访问控制",
    audit: "审计日志",
    compliance: "合规管理",
    "mobile-app": "移动应用",
    features: "功能管理",
    feedback: "用户反馈",
    releases: "版本发布",
    "ehr-integration": "电子病历",
    mapping: "数据映射",
    sync: "同步状态",
    connections: "系统连接",
    teleconsultation: "远程会诊",
    schedule: "排程管理",
    experts: "专家网络",
    analytics: "统计分析",
    distribution: "分布分析",
    prediction: "预测模型",
    admin: "系统管理",
    settings: "系统设置",
    roles: "角色权限",
    logs: "系统日志",
    backup: "数据备份",
    tasks: "计划任务",
    notifications: "通知管理",
    "deployment-check": "部署检查",
    "api-config": "API配置",
  }

  // 构建面包屑路径
  const breadcrumbs = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`
    const label = pathMap[segment] || segment
    return { path, label }
  })

  return (
    <nav className="flex items-center text-sm text-gray-500">
      <Link href="/" className="flex items-center hover:text-gray-900">
        <Home className="h-4 w-4" />
        <span className="sr-only">首页</span>
      </Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center">
          <ChevronRight className="mx-1 h-4 w-4" />
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-gray-900">{breadcrumb.label}</span>
          ) : (
            <Link href={breadcrumb.path} className="hover:text-gray-900">
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

export default PageBreadcrumb
