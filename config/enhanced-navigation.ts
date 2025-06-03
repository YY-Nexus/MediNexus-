import {
  Home,
  Users,
  Brain,
  FileText,
  Award,
  Stethoscope,
  Pill,
  Video,
  BarChart3,
  Microscope,
  GraduationCap,
  Settings,
  Shield,
  Smartphone,
  Database,
  Search,
  Calendar,
  Heart,
  Activity,
  Zap,
  Globe,
  Lock,
  UserCheck,
  Building,
  Workflow,
  BookOpen,
  HelpCircle,
  Bell,
} from "lucide-react"

export interface NavigationItem {
  title: string
  href: string
  icon: any
  description?: string
  badge?: string
  children?: NavigationItem[]
  roles?: string[]
  isNew?: boolean
  isUpdated?: boolean
}

export const navigationConfig: NavigationItem[] = [
  {
    title: "系统主页",
    href: "/",
    icon: Home,
    description: "系统概览和快速访问",
  },
  {
    title: "患者管理",
    href: "/patients",
    icon: Users,
    description: "患者信息管理",
    children: [
      {
        title: "患者列表",
        href: "/patients",
        icon: Users,
        description: "查看和管理所有患者",
      },
      {
        title: "患者分组",
        href: "/patients/groups",
        icon: Users,
        description: "按条件分组管理患者",
      },
      {
        title: "随访管理",
        href: "/patients/followup",
        icon: Calendar,
        description: "患者随访计划和记录",
      },
      {
        title: "病历记录",
        href: "/patients/records",
        icon: FileText,
        description: "患者病历档案管理",
      },
    ],
  },
  {
    title: "AI诊断",
    href: "/ai-diagnosis",
    icon: Brain,
    description: "人工智能辅助诊断",
    isNew: true,
    children: [
      {
        title: "智能诊断",
        href: "/ai-diagnosis",
        icon: Brain,
        description: "AI辅助疾病诊断",
      },
      {
        title: "诊断记录",
        href: "/ai-diagnosis/records",
        icon: FileText,
        description: "历史诊断记录查询",
      },
      {
        title: "模型训练",
        href: "/ai-model-training",
        icon: Zap,
        description: "AI模型训练管理",
      },
      {
        title: "模型性能",
        href: "/ai-model/performance",
        icon: Activity,
        description: "模型性能监控",
      },
    ],
  },
  {
    title: "医疗记录",
    href: "/medical-records",
    icon: FileText,
    description: "电子病历管理",
    children: [
      {
        title: "病历管理",
        href: "/medical-records",
        icon: FileText,
        description: "电子病历录入和管理",
      },
      {
        title: "影像特征",
        href: "/imaging-features",
        icon: Microscope,
        description: "医学影像特征分析",
      },
      {
        title: "知识库",
        href: "/knowledge-base",
        icon: BookOpen,
        description: "医学知识库查询",
      },
      {
        title: "知识图谱",
        href: "/knowledge-graph",
        icon: Globe,
        description: "医学知识关联图谱",
      },
    ],
  },
  {
    title: "资质管理",
    href: "/certifications",
    icon: Award,
    description: "医护人员资质认证",
    children: [
      {
        title: "资质概览",
        href: "/certifications",
        icon: Award,
        description: "资质认证总览",
      },
      {
        title: "资质管理",
        href: "/certifications/management",
        icon: UserCheck,
        description: "资质证书管理",
      },
      {
        title: "认证机构",
        href: "/certifications/providers",
        icon: Building,
        description: "认证机构管理",
      },
      {
        title: "状态监控",
        href: "/certifications/status",
        icon: Activity,
        description: "认证状态实时监控",
      },
      {
        title: "统计分析",
        href: "/certifications/statistics",
        icon: BarChart3,
        description: "认证数据统计分析",
      },
      {
        title: "批量上传",
        href: "/certifications/upload",
        icon: Database,
        description: "批量上传认证文件",
      },
    ],
  },
  {
    title: "临床决策",
    href: "/clinical-decision",
    icon: Stethoscope,
    description: "临床决策支持系统",
    children: [
      {
        title: "决策支持",
        href: "/clinical-decision",
        icon: Stethoscope,
        description: "临床决策辅助工具",
      },
      {
        title: "临床路径",
        href: "/clinical-decision/clinical-pathways",
        icon: Workflow,
        description: "标准化临床路径",
      },
      {
        title: "诊断工具",
        href: "/clinical-decision/diagnostic-tools",
        icon: Microscope,
        description: "专业诊断工具集",
      },
      {
        title: "药物参考",
        href: "/clinical-decision/drug-reference",
        icon: Pill,
        description: "药物信息参考库",
      },
      {
        title: "临床指南",
        href: "/clinical-decision/guidelines",
        icon: BookOpen,
        description: "临床诊疗指南",
      },
    ],
  },
  {
    title: "药物管理",
    href: "/medications",
    icon: Pill,
    description: "药物信息和用药指导",
    children: [
      {
        title: "药物目录",
        href: "/medications",
        icon: Pill,
        description: "药物信息查询",
      },
      {
        title: "用药指导",
        href: "/medications/guidance",
        icon: Heart,
        description: "智能用药指导",
      },
      {
        title: "相互作用",
        href: "/medications/interactions",
        icon: Zap,
        description: "药物相互作用检查",
      },
    ],
  },
  {
    title: "远程医疗",
    href: "/teleconsultation",
    icon: Video,
    description: "远程会诊和咨询",
    children: [
      {
        title: "视频会诊",
        href: "/teleconsultation",
        icon: Video,
        description: "远程视频会诊",
      },
      {
        title: "会诊记录",
        href: "/teleconsultation/records",
        icon: FileText,
        description: "会诊历史记录",
      },
    ],
  },
  {
    title: "数据分析",
    href: "/analytics",
    icon: BarChart3,
    description: "医疗数据分析和报告",
    children: [
      {
        title: "数据概览",
        href: "/analytics",
        icon: BarChart3,
        description: "医疗数据分析仪表板",
      },
      {
        title: "搜索分析",
        href: "/search-analytics",
        icon: Search,
        description: "搜索行为分析",
      },
    ],
  },
  {
    title: "科研管理",
    href: "/research",
    icon: Microscope,
    description: "医学科研项目管理",
    children: [
      {
        title: "科研项目",
        href: "/research",
        icon: Microscope,
        description: "科研项目管理",
      },
      {
        title: "实验设计",
        href: "/experiment-design",
        icon: Workflow,
        description: "实验方案设计",
      },
      {
        title: "案例库",
        href: "/case-library",
        icon: BookOpen,
        description: "医学案例库",
      },
    ],
  },
  {
    title: "培训系统",
    href: "/training",
    icon: GraduationCap,
    description: "医护人员培训管理",
    children: [
      {
        title: "用户培训",
        href: "/user-training",
        icon: GraduationCap,
        description: "用户培训课程",
      },
      {
        title: "培训开发",
        href: "/training-development",
        icon: BookOpen,
        description: "培训内容开发",
      },
      {
        title: "讲师认证",
        href: "/trainer-certification",
        icon: Award,
        description: "培训讲师认证",
      },
    ],
  },
  {
    title: "系统集成",
    href: "/integration",
    icon: Database,
    description: "第三方系统集成",
    children: [
      {
        title: "EHR集成",
        href: "/ehr-integration",
        icon: Database,
        description: "电子健康记录集成",
      },
      {
        title: "健康数据",
        href: "/health-data",
        icon: Heart,
        description: "健康数据管理",
      },
    ],
  },
  {
    title: "移动应用",
    href: "/mobile-app",
    icon: Smartphone,
    description: "移动端应用管理",
  },
  {
    title: "安全管理",
    href: "/security",
    icon: Shield,
    description: "系统安全和权限管理",
    children: [
      {
        title: "安全概览",
        href: "/security",
        icon: Shield,
        description: "系统安全状态",
      },
      {
        title: "账户安全",
        href: "/security/account",
        icon: Lock,
        description: "账户安全设置",
      },
      {
        title: "数据安全",
        href: "/security/data-security",
        icon: Database,
        description: "数据安全管理",
      },
    ],
  },
  {
    title: "系统管理",
    href: "/admin",
    icon: Settings,
    description: "系统配置和管理",
    roles: ["admin", "super_admin"],
    children: [
      {
        title: "管理面板",
        href: "/admin",
        icon: Settings,
        description: "系统管理总览",
      },
      {
        title: "用户管理",
        href: "/admin/users",
        icon: Users,
        description: "用户账户管理",
      },
      {
        title: "角色权限",
        href: "/admin/roles",
        icon: UserCheck,
        description: "角色和权限管理",
      },
      {
        title: "系统设置",
        href: "/admin/settings",
        icon: Settings,
        description: "系统参数配置",
      },
      {
        title: "系统监控",
        href: "/admin/monitoring",
        icon: Activity,
        description: "系统性能监控",
      },
      {
        title: "备份管理",
        href: "/admin/backup",
        icon: Database,
        description: "数据备份管理",
      },
      {
        title: "日志管理",
        href: "/admin/logs",
        icon: FileText,
        description: "系统日志查看",
      },
      {
        title: "通知管理",
        href: "/admin/notifications",
        icon: Bell,
        description: "系统通知管理",
      },
    ],
  },
  {
    title: "帮助支持",
    href: "/help",
    icon: HelpCircle,
    description: "帮助文档和技术支持",
    children: [
      {
        title: "使用帮助",
        href: "/help",
        icon: HelpCircle,
        description: "系统使用帮助",
      },
      {
        title: "API文档",
        href: "/api-docs",
        icon: BookOpen,
        description: "API接口文档",
      },
      {
        title: "系统分析",
        href: "/system-analysis",
        icon: Activity,
        description: "系统功能分析",
      },
    ],
  },
]

// 根据用户角色过滤导航项
export function filterNavigationByRole(navigation: NavigationItem[], userRole: string): NavigationItem[] {
  return navigation.filter((item) => {
    if (item.roles && !item.roles.includes(userRole)) {
      return false
    }

    if (item.children) {
      item.children = filterNavigationByRole(item.children, userRole)
    }

    return true
  })
}

// 获取扁平化的导航路径
export function getFlatNavigationPaths(navigation: NavigationItem[]): string[] {
  const paths: string[] = []

  function extractPaths(items: NavigationItem[]) {
    items.forEach((item) => {
      paths.push(item.href)
      if (item.children) {
        extractPaths(item.children)
      }
    })
  }

  extractPaths(navigation)
  return paths
}

// 根据路径查找导航项
export function findNavigationItem(navigation: NavigationItem[], path: string): NavigationItem | null {
  for (const item of navigation) {
    if (item.href === path) {
      return item
    }
    if (item.children) {
      const found = findNavigationItem(item.children, path)
      if (found) return found
    }
  }
  return null
}
