import type React from "react"
import {
  Activity,
  Brain,
  FileText,
  Lock,
  Settings,
  Smartphone,
  Stethoscope,
  UserCog,
  Users,
  Video,
  Workflow,
  BookOpen,
  Microscope,
  Pill,
  HeartPulse,
  Dna,
  Clipboard,
  ClipboardList,
  CalendarClock,
  BadgeAlert,
  ShieldCheck,
  LineChart,
  PieChart,
  BarChart,
  TrendingUp,
  FileCheck,
  BadgeIcon as Certificate,
  Key,
  HardDrive,
  Clock,
  Bell,
  CreditCard,
  UserCircle,
  Eye,
  Database,
  Server,
  Cog,
  User,
  MonitorCheck,
  Save,
  Layers,
  Wrench,
  Gauge,
  FileDigit,
  Building,
  Bed,
  Calendar,
  Syringe,
  Scan,
  Laptop,
  Fingerprint,
  Shield,
  FileWarning,
  Printer,
  Receipt,
  DollarSign,
  FileSpreadsheet,
} from "lucide-react"

// 定义导航项类型
export interface NavItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  children?: NavItem[]
  description?: string
  badge?: string
  roles?: string[] // 允许访问的角色
}

// 定义分组类型
export interface NavGroup {
  title: string
  items: NavItem[]
}

// 优化后的导航结构
export const optimizedNavItems: NavGroup[] = [
  {
    title: "临床工作站",
    items: [
      {
        title: "临床工作站",
        icon: Stethoscope,
        children: [
          {
            title: "智能诊断",
            href: "/clinical/ai-diagnosis",
            icon: Brain,
            description: "AI辅助诊断系统",
            roles: ["doctor", "researcher", "admin"],
          },
          {
            title: "临床决策",
            href: "/clinical/decision-support",
            icon: Clipboard,
            description: "临床决策支持系统",
            roles: ["doctor", "admin"],
          },
          {
            title: "治疗方案",
            href: "/clinical/treatment-plans",
            icon: ClipboardList,
            description: "个性化治疗方案生成",
            roles: ["doctor", "admin"],
          },
          {
            title: "诊断记录",
            href: "/clinical/diagnosis-records",
            icon: FileText,
            description: "历史诊断记录查询",
            roles: ["doctor", "nurse", "admin"],
          },
          {
            title: "AI模型管理",
            href: "/clinical/ai-models",
            icon: Brain,
            description: "诊断模型管理与训练",
            roles: ["doctor", "researcher", "admin"],
          },
          {
            title: "临床指南",
            href: "/clinical/guidelines",
            icon: BookOpen,
            description: "标准临床指南参考",
            roles: ["doctor", "nurse", "admin"],
          },
        ],
      },
    ],
  },
  {
    title: "患者管理",
    items: [
      {
        title: "患者管理",
        icon: Users,
        children: [
          {
            title: "患者列表",
            href: "/patients/list",
            icon: Users,
            description: "患者信息管理",
            roles: ["doctor", "nurse", "admin", "receptionist"],
          },
          {
            title: "病历管理",
            href: "/patients/records",
            icon: FileText,
            description: "电子病历管理",
            roles: ["doctor", "nurse", "admin"],
          },
          {
            title: "随访计划",
            href: "/patients/followup",
            icon: CalendarClock,
            description: "患者随访管理",
            roles: ["doctor", "nurse", "admin"],
          },
          {
            title: "患者分组",
            href: "/patients/groups",
            icon: Workflow,
            description: "患者分类管理",
            roles: ["doctor", "researcher", "admin"],
          },
          {
            title: "患者门户",
            href: "/patients/portal",
            icon: UserCircle,
            description: "患者自助服务管理",
            badge: "新功能",
            roles: ["doctor", "nurse", "admin", "receptionist"],
          },
          {
            title: "知情同意",
            href: "/patients/consent",
            icon: FileCheck,
            description: "患者知情同意管理",
            badge: "新功能",
            roles: ["doctor", "nurse", "admin", "receptionist"],
          },
        ],
      },
    ],
  },
  {
    title: "医疗资源",
    items: [
      {
        title: "医疗资源",
        icon: Pill,
        children: [
          {
            title: "药品管理",
            href: "/resources/medications",
            icon: Pill,
            description: "药品目录与库存管理",
            roles: ["doctor", "pharmacist", "admin"],
          },
          {
            title: "处方管理",
            href: "/resources/prescriptions",
            icon: FileText,
            description: "电子处方管理",
            roles: ["doctor", "pharmacist", "admin"],
          },
          {
            title: "健康数据",
            href: "/resources/health-data",
            icon: HeartPulse,
            description: "患者健康数据管理",
            roles: ["doctor", "nurse", "researcher", "admin"],
          },
          {
            title: "检测结果",
            href: "/resources/test-results",
            icon: Activity,
            description: "检验检查结果管理",
            roles: ["doctor", "nurse", "lab", "admin"],
          },
          {
            title: "医疗设备",
            href: "/resources/equipment",
            icon: Scan,
            description: "医疗设备管理",
            badge: "新功能",
            roles: ["doctor", "nurse", "admin", "technician"],
          },
          {
            title: "资源调度",
            href: "/resources/scheduling",
            icon: Calendar,
            description: "医疗资源调度管理",
            badge: "新功能",
            roles: ["doctor", "nurse", "admin", "receptionist"],
          },
          {
            title: "床位管理",
            href: "/resources/beds",
            icon: Bed,
            description: "住院床位管理",
            badge: "新功能",
            roles: ["doctor", "nurse", "admin"],
          },
          {
            title: "手术排程",
            href: "/resources/surgeries",
            icon: Syringe,
            description: "手术室排程管理",
            badge: "新功能",
            roles: ["doctor", "nurse", "admin"],
          },
        ],
      },
    ],
  },
  {
    title: "远程医疗",
    items: [
      {
        title: "远程医疗",
        icon: Video,
        children: [
          {
            title: "远程会诊",
            href: "/telemedicine/consultation",
            icon: Video,
            description: "远程会诊服务",
            roles: ["doctor", "admin"],
          },
          {
            title: "移动应用",
            href: "/telemedicine/mobile-app",
            icon: Smartphone,
            description: "移动应用管理",
            roles: ["doctor", "nurse", "admin", "it"],
          },
          {
            title: "排程管理",
            href: "/telemedicine/scheduling",
            icon: CalendarClock,
            description: "远程会诊排程",
            roles: ["doctor", "nurse", "admin", "receptionist"],
          },
          {
            title: "专家网络",
            href: "/telemedicine/experts",
            icon: Users,
            description: "专家资源管理",
            roles: ["doctor", "admin"],
          },
          {
            title: "会诊记录",
            href: "/telemedicine/records",
            icon: FileText,
            description: "远程会诊记录",
            roles: ["doctor", "nurse", "admin"],
          },
          {
            title: "远程监护",
            href: "/telemedicine/monitoring",
            icon: Activity,
            description: "患者远程监护",
            badge: "新功能",
            roles: ["doctor", "nurse", "admin"],
          },
        ],
      },
    ],
  },
  {
    title: "医学研究",
    items: [
      {
        title: "医学研究",
        icon: Microscope,
        children: [
          {
            title: "研究项目",
            href: "/research/projects",
            icon: Microscope,
            description: "研究项目管理",
            roles: ["researcher", "doctor", "admin"],
          },
          {
            title: "数据分析",
            href: "/research/analysis",
            icon: LineChart,
            description: "医学数据分析",
            roles: ["researcher", "doctor", "admin"],
          },
          {
            title: "样本管理",
            href: "/research/samples",
            icon: Dna,
            description: "研究样本管理",
            roles: ["researcher", "lab", "admin"],
          },
          {
            title: "试验设计",
            href: "/research/trials",
            icon: Clipboard,
            description: "临床试验设计",
            roles: ["researcher", "doctor", "admin"],
          },
          {
            title: "成果管理",
            href: "/research/publications",
            icon: FileText,
            description: "研究成果管理",
            badge: "新功能",
            roles: ["researcher", "doctor", "admin"],
          },
          {
            title: "伦理审查",
            href: "/research/ethics",
            icon: Shield,
            description: "研究伦理审查",
            badge: "新功能",
            roles: ["researcher", "doctor", "admin", "ethics"],
          },
        ],
      },
    ],
  },
  {
    title: "系统集成",
    items: [
      {
        title: "系统集成",
        icon: Layers,
        children: [
          {
            title: "电子病历",
            href: "/integration/ehr",
            icon: FileText,
            description: "电子病历系统集成",
            roles: ["admin", "it"],
          },
          {
            title: "资质验证",
            href: "/integration/certifications",
            icon: Certificate,
            description: "医疗资质验证",
            roles: ["admin", "hr", "it"],
          },
          {
            title: "数据映射",
            href: "/integration/mapping",
            icon: Workflow,
            description: "系统数据映射",
            roles: ["admin", "it"],
          },
          {
            title: "接口管理",
            href: "/integration/apis",
            icon: Key,
            description: "API接口管理",
            roles: ["admin", "it"],
          },
          {
            title: "集成监控",
            href: "/integration/monitoring",
            icon: Activity,
            description: "集成状态监控",
            roles: ["admin", "it"],
          },
          {
            title: "第三方系统",
            href: "/integration/third-party",
            icon: Layers,
            description: "第三方系统集成",
            roles: ["admin", "it"],
          },
        ],
      },
    ],
  },
  {
    title: "安全与合规",
    items: [
      {
        title: "安全与合规",
        icon: ShieldCheck,
        children: [
          {
            title: "安全管理",
            href: "/security/overview",
            icon: Lock,
            description: "系统安全管理",
            roles: ["admin", "security", "it"],
          },
          {
            title: "访问控制",
            href: "/security/access",
            icon: UserCog,
            description: "用户访问控制",
            roles: ["admin", "security", "it"],
          },
          {
            title: "审计日志",
            href: "/security/audit",
            icon: ClipboardList,
            description: "系统审计日志",
            roles: ["admin", "security", "it"],
          },
          {
            title: "合规检查",
            href: "/security/compliance",
            icon: BadgeAlert,
            description: "合规性检查",
            roles: ["admin", "security", "compliance"],
          },
          {
            title: "隐私保护",
            href: "/security/privacy",
            icon: Eye,
            description: "数据隐私保护",
            badge: "新功能",
            roles: ["admin", "security", "compliance"],
          },
          {
            title: "数据脱敏",
            href: "/security/anonymization",
            icon: Fingerprint,
            description: "数据脱敏与匿名化",
            badge: "新功能",
            roles: ["admin", "security", "researcher", "it"],
          },
          {
            title: "监管报告",
            href: "/security/reports",
            icon: FileWarning,
            description: "监管合规报告",
            badge: "新功能",
            roles: ["admin", "security", "compliance"],
          },
        ],
      },
    ],
  },
  {
    title: "财务管理",
    items: [
      {
        title: "财务管理",
        icon: DollarSign,
        badge: "新模块",
        children: [
          {
            title: "医保结算",
            href: "/finance/insurance",
            icon: CreditCard,
            description: "医保费用结算",
            badge: "新功能",
            roles: ["finance", "admin", "receptionist"],
          },
          {
            title: "费用管理",
            href: "/finance/expenses",
            icon: Receipt,
            description: "医疗费用管理",
            badge: "新功能",
            roles: ["finance", "admin", "receptionist"],
          },
          {
            title: "收费项目",
            href: "/finance/pricing",
            icon: FileSpreadsheet,
            description: "医疗服务定价",
            badge: "新功能",
            roles: ["finance", "admin"],
          },
          {
            title: "财务报表",
            href: "/finance/reports",
            icon: BarChart,
            description: "财务报表生成",
            badge: "新功能",
            roles: ["finance", "admin"],
          },
          {
            title: "发票管理",
            href: "/finance/invoices",
            icon: Printer,
            description: "发票生成与管理",
            badge: "新功能",
            roles: ["finance", "admin", "receptionist"],
          },
          {
            title: "费用统计",
            href: "/finance/statistics",
            icon: PieChart,
            description: "费用统计分析",
            badge: "新功能",
            roles: ["finance", "admin"],
          },
        ],
      },
    ],
  },
  {
    title: "系统管理",
    items: [
      {
        title: "系统配置",
        icon: Settings,
        children: [
          {
            title: "基础设置",
            href: "/admin/settings/basic",
            icon: Cog,
            description: "系统基础配置",
            roles: ["admin", "it"],
          },
          {
            title: "参数配置",
            href: "/admin/settings/parameters",
            icon: Wrench,
            description: "系统参数配置",
            roles: ["admin", "it"],
          },
          {
            title: "界面定制",
            href: "/admin/settings/ui",
            icon: Laptop,
            description: "用户界面定制",
            roles: ["admin", "it"],
          },
          {
            title: "通知设置",
            href: "/admin/settings/notifications",
            icon: Bell,
            description: "系统通知配置",
            roles: ["admin", "it"],
          },
        ],
      },
      {
        title: "用户权限",
        icon: UserCog,
        children: [
          {
            title: "用户管理",
            href: "/admin/users",
            icon: User,
            description: "系统用户管理",
            roles: ["admin", "hr"],
          },
          {
            title: "角色管理",
            href: "/admin/roles",
            icon: Users,
            description: "用户角色管理",
            roles: ["admin"],
          },
          {
            title: "权限分配",
            href: "/admin/permissions",
            icon: Lock,
            description: "系统权限分配",
            roles: ["admin"],
          },
          {
            title: "部门管理",
            href: "/admin/departments",
            icon: Building,
            description: "医院部门管理",
            roles: ["admin", "hr"],
          },
        ],
      },
      {
        title: "运维管理",
        icon: Server,
        children: [
          {
            title: "系统监控",
            href: "/admin/monitoring",
            icon: Gauge,
            description: "系统性能监控",
            roles: ["admin", "it"],
          },
          {
            title: "性能优化",
            href: "/admin/performance",
            icon: TrendingUp,
            description: "系统性能优化",
            roles: ["admin", "it"],
          },
          {
            title: "日志管理",
            href: "/admin/logs",
            icon: FileText,
            description: "系统日志管理",
            roles: ["admin", "it"],
          },
          {
            title: "计划任务",
            href: "/admin/tasks",
            icon: Clock,
            description: "系统计划任务",
            roles: ["admin", "it"],
          },
          {
            title: "部署检查",
            href: "/admin/deployment",
            icon: MonitorCheck,
            description: "系统部署检查",
            roles: ["admin", "it"],
          },
        ],
      },
      {
        title: "数据管理",
        icon: Database,
        children: [
          {
            title: "数据备份",
            href: "/admin/backup",
            icon: Save,
            description: "系统数据备份",
            roles: ["admin", "it"],
          },
          {
            title: "数据恢复",
            href: "/admin/restore",
            icon: HardDrive,
            description: "系统数据恢复",
            roles: ["admin", "it"],
          },
          {
            title: "数据归档",
            href: "/admin/archive",
            icon: FileDigit,
            description: "历史数据归档",
            roles: ["admin", "it"],
          },
          {
            title: "数据清理",
            href: "/admin/cleanup",
            icon: Workflow,
            description: "系统数据清理",
            roles: ["admin", "it"],
          },
        ],
      },
    ],
  },
]

// 角色导航视图配置
export const roleNavigation: Record<string, string[]> = {
  doctor: ["临床工作站", "患者管理", "医疗资源", "远程医疗", "医学研究"],
  nurse: ["患者管理", "医疗资源", "远程医疗"],
  researcher: ["临床工作站", "患者管理", "医疗资源", "医学研究", "安全与合规"],
  admin: [
    "临床工作站",
    "患者管理",
    "医疗资源",
    "远程医疗",
    "医学研究",
    "系统集成",
    "安全与合规",
    "财务管理",
    "系统管理",
  ],
  it: ["系统集成", "安全与合规", "系统管理"],
  finance: ["患者管理", "财务管理"],
  receptionist: ["患者管理", "医疗资源", "远程医疗", "财务管理"],
  pharmacist: ["医疗资源"],
  lab: ["医疗资源", "医学研究"],
  security: ["安全与合规"],
  compliance: ["安全与合规"],
  hr: ["系统集成", "系统管理"],
  ethics: ["医学研究"],
  technician: ["医疗资源"],
}

// 获取角色可见的导航项
export function getNavItemsByRole(role: string): NavGroup[] {
  if (!roleNavigation[role]) {
    return optimizedNavItems // 如果角色未定义，返回所有导航项
  }

  const allowedGroups = roleNavigation[role]

  return optimizedNavItems
    .filter((group) => allowedGroups.includes(group.title))
    .map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        children: item.children?.filter((child) => !child.roles || child.roles.includes(role)),
      })),
    }))
}
