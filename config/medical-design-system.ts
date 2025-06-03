/**
 * 医疗机构UI设计系统配置
 * 基于国标GB/T 20474-2006《医院信息系统基本功能规范》
 * 和卫生部《医院信息系统基本功能规范》
 */

// 医疗色彩系统 - 符合医疗行业标准
export const medicalColors = {
  // 主色调 - 医疗蓝（信任、专业、安全）
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // 主蓝色
    600: "#2563eb", // 深蓝色
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },

  // 辅助色 - 医疗绿（健康、生命、安全）
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e", // 主绿色
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },

  // 警告色 - 医疗橙（注意、提醒）
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b", // 主橙色
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  // 危险色 - 医疗红（紧急、错误、危险）
  danger: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444", // 主红色
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  // 中性色 - 文字和背景
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
}

// 医疗字体系统 - 符合可读性标准
export const medicalTypography = {
  // 字体族 - 优先使用系统字体确保兼容性
  fontFamily: {
    sans: ["PingFang SC", "Microsoft YaHei", "SimHei", "Arial", "sans-serif"],
    mono: ["SF Mono", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
  },

  // 字体大小 - 考虑医护人员长时间使用
  fontSize: {
    xs: "0.75rem", // 12px - 辅助信息
    sm: "0.875rem", // 14px - 次要文字
    base: "1rem", // 16px - 正文（标准）
    lg: "1.125rem", // 18px - 重要信息
    xl: "1.25rem", // 20px - 小标题
    "2xl": "1.5rem", // 24px - 中标题
    "3xl": "1.875rem", // 30px - 大标题
    "4xl": "2.25rem", // 36px - 主标题
  },

  // 行高 - 确保良好的可读性
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },

  // 字重
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
}

// 医疗间距系统 - 基于8px网格
export const medicalSpacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
}

// 医疗圆角系统
export const medicalBorderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  base: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  full: "9999px",
}

// 医疗阴影系统
export const medicalShadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  medical: "0 4px 14px 0 rgba(37, 99, 235, 0.15)", // 医疗蓝色阴影
}

// 医疗布局系统
export const medicalLayout = {
  // 容器最大宽度
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // 侧边栏宽度
  sidebar: {
    collapsed: "4rem", // 64px
    expanded: "16rem", // 256px
    mobile: "20rem", // 320px
  },

  // 头部高度
  header: {
    height: "4rem", // 64px
  },

  // 内容区域间距
  content: {
    padding: "1.5rem", // 24px
    gap: "1.5rem", // 24px
  },
}

// 医疗组件尺寸标准
export const medicalComponentSizes = {
  // 按钮尺寸
  button: {
    sm: { height: "2rem", padding: "0 0.75rem", fontSize: "0.875rem" },
    md: { height: "2.5rem", padding: "0 1rem", fontSize: "1rem" },
    lg: { height: "3rem", padding: "0 1.5rem", fontSize: "1.125rem" },
    xl: { height: "3.5rem", padding: "0 2rem", fontSize: "1.25rem" },
  },

  // 输入框尺寸
  input: {
    sm: { height: "2rem", padding: "0 0.75rem", fontSize: "0.875rem" },
    md: { height: "2.5rem", padding: "0 1rem", fontSize: "1rem" },
    lg: { height: "3rem", padding: "0 1.25rem", fontSize: "1.125rem" },
  },

  // 卡片尺寸
  card: {
    sm: { padding: "1rem" },
    md: { padding: "1.5rem" },
    lg: { padding: "2rem" },
  },
}

// 医疗信息优先级系统
export const medicalPriority = {
  // 紧急程度颜色
  emergency: {
    critical: medicalColors.danger[600], // 危重
    urgent: medicalColors.warning[500], // 紧急
    normal: medicalColors.primary[500], // 正常
    low: medicalColors.neutral[400], // 低优先级
  },

  // 状态颜色
  status: {
    active: medicalColors.success[500], // 活跃
    pending: medicalColors.warning[500], // 待处理
    completed: medicalColors.primary[500], // 已完成
    cancelled: medicalColors.neutral[400], // 已取消
    error: medicalColors.danger[500], // 错误
  },
}

// 医疗数据展示标准
export const medicalDataDisplay = {
  // 表格行高
  table: {
    rowHeight: "3rem", // 48px - 确保触摸友好
    headerHeight: "3.5rem", // 56px
  },

  // 列表项高度
  list: {
    itemHeight: "4rem", // 64px - 适合医疗信息展示
  },

  // 卡片最小高度
  card: {
    minHeight: "8rem", // 128px
  },
}

// 医疗无障碍标准
export const medicalAccessibility = {
  // 最小触摸目标
  minTouchTarget: "2.75rem", // 44px

  // 颜色对比度（符合WCAG 2.1 AA标准）
  contrast: {
    normal: 4.5, // 正常文字
    large: 3, // 大文字
  },

  // 焦点指示器
  focusRing: {
    width: "2px",
    color: medicalColors.primary[500],
    offset: "2px",
  },
}

export default {
  colors: medicalColors,
  typography: medicalTypography,
  spacing: medicalSpacing,
  borderRadius: medicalBorderRadius,
  shadows: medicalShadows,
  layout: medicalLayout,
  componentSizes: medicalComponentSizes,
  priority: medicalPriority,
  dataDisplay: medicalDataDisplay,
  accessibility: medicalAccessibility,
}
