// Layout Components
export { AppShell } from "./layout/app-shell"
export { AppHeader } from "./layout/app-header"
export { SidebarNav } from "./layout/sidebar-nav"
export { PageBreadcrumb } from "./layout/page-breadcrumb"
export { KeyboardShortcutsDialog } from "./layout/keyboard-shortcuts-dialog"
export { RoleBasedSidebar } from "./layout/role-based-sidebar"

// Navigation Components
export { UserNav } from "./user-nav"
export { NavigationSearch } from "./navigation-search"
export { Breadcrumb } from "./breadcrumb"
export { TopNav } from "./top-nav"
export { GlobalNavigation } from "./global-navigation"

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
export { LoadingSpinner } from "./ui/loading-spinner"

// 医疗专用UI组件
export { MedicalButton, buttonVariants as medicalButtonVariants } from "./ui/medical-button"
export {
  MedicalCard,
  MedicalCardHeader,
  MedicalCardFooter,
  MedicalCardTitle,
  MedicalCardDescription,
  MedicalCardContent,
} from "./ui/medical-card"
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

// Brand Components
export { Logo } from "./brand/logo"
export { ShieldLogo } from "./brand/shield-logo"
export { AnimatedLogo } from "./brand/animated-logo"
export { CloudLogo } from "./brand/cloud-logo"
export { Slogan } from "./brand/slogan"

// 错误处理组件
export { SafeWrapper } from "./safe-wrapper"
export { GlobalErrorBoundary } from "./error-boundary/global-error-boundary"
export { ComponentErrorBoundary } from "./error-boundary/component-error-boundary"
export { NetworkErrorHandler } from "./error-boundary/network-error-handler"

// 开发工具
export { GlobalComponentTester } from "./dev/global-component-tester"
export { ComponentFixer } from "./dev/component-fixer"
export { PerformanceMonitor } from "./dev/performance-monitor"
export { ErrorTester } from "./dev/error-tester"
export { NavigationTester } from "./dev/navigation-tester"

// 通用组件
export { PageHeader } from "./page-header"
export { QuickFilterMenu } from "./quick-filter-menu"
export { OfflineNotification } from "./offline-notification"
export { SplashScreen } from "./splash-screen"

// 功能组件
export { ModelDeployment } from "./ai-model-training/model-deployment"
export { NotificationCenter } from "./notifications/notification-center"
export { FeedbackButton } from "./feedback/feedback-button"
export { FeedbackDialog } from "./feedback/feedback-dialog"
export { LanguageSwitcher } from "./language-switcher"
export { KeyboardShortcutsHelp } from "./keyboard-shortcuts-help"
