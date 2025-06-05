// Layout Components
export { AppShell } from "./layout/app-shell"
export { AppHeader } from "./layout/app-header"
export { SidebarNav } from "./layout/sidebar-nav"
export { PageBreadcrumb } from "./layout/page-breadcrumb"
export { KeyboardShortcutsDialog } from "./layout/keyboard-shortcuts-dialog"

// Navigation Components
export { UserNav } from "./user-nav"
export { NavigationSearch } from "./navigation-search"

// UI Components
export { Button } from "./ui/button"
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
export { Badge } from "./ui/badge"
export { Progress } from "./ui/progress"
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
export { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
export { Input } from "./ui/input"
export { Label } from "./ui/label"
export { Textarea } from "./ui/textarea"
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
export { Switch } from "./ui/switch"
export { Separator } from "./ui/separator"
export { Alert, AlertDescription } from "./ui/alert"
export { ScrollArea } from "./ui/scroll-area"
export { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
export { Calendar } from "./ui/calendar"
export { Slider } from "./ui/slider"

// 自定义UI组件
export { DatePicker, DateRangePicker } from "./ui/date-picker"
export {
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
  MultiSeriesChart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  medicalChartColors,
  medicalChartConfig,
} from "./ui/chart"

// 医疗专用组件 (需要创建)
// export { MedicalButton } from "./ui/medical-button"
// export { MedicalCard } from "./ui/medical-card"
export { LoadingSpinner } from "./ui/loading-spinner"

// Brand Components
export { Logo } from "./brand/logo"
export { ShieldLogo } from "./brand/shield-logo"

// Feature Components
export { ModelDeployment } from "./ai-model-training/model-deployment"

// 错误处理组件 (需要创建)
// export { SafeWrapper } from "./safe-wrapper"
// export { GlobalErrorBoundary } from "./error-boundary/global-error-boundary"

// 开发工具
export { GlobalComponentTester } from "./dev/global-component-tester"
export { ComponentFixer } from "./dev/component-fixer"

// 通用组件
export { PageHeader } from "./page-header"
