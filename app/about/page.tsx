import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrandLogo } from "@/components/brand/logo"
import { Building2, Globe, Heart, Shield, Zap, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <BrandLogo variant="full" />
        </div>
        <h1 className="text-3xl font-bold">关于医枢系统</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          言语「医枢」智能诊疗系统（YanYu "MediCore" Intelligent Diagnostic
          System）是新一代基于人工智能的医疗诊断和健康管理平台，致力于通过先进的AI技术提升医疗服务质量和效率。
        </p>
      </div>

      {/* 核心价值 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto p-3 bg-blue-100 rounded-full w-fit">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-blue-900">智能精准</CardTitle>
            <CardDescription>基于深度学习的AI诊断引擎，诊断精度超过99.3%</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto p-3 bg-green-100 rounded-full w-fit">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-green-900">安全可靠</CardTitle>
            <CardDescription>量子加密技术保护医疗数据，符合HIPAA/GDPR标准</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto p-3 bg-purple-100 rounded-full w-fit">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-purple-900">人文关怀</CardTitle>
            <CardDescription>情感计算驱动的患者交互系统，提供温暖的医疗体验</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* 系统特色 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            系统特色
          </CardTitle>
          <CardDescription>医枢系统的核心优势和创新特性</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">技术创新</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    AI
                  </Badge>
                  <span>多模态医疗数据融合分析</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    ML
                  </Badge>
                  <span>持续学习与模型自优化</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    NLP
                  </Badge>
                  <span>智能病历语义理解</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    CV
                  </Badge>
                  <span>医疗影像智能识别</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">服务优势</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    7×24
                  </Badge>
                  <span>全天候智能诊断服务</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    云端
                  </Badge>
                  <span>弹性扩展的云原生架构</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    API
                  </Badge>
                  <span>开放的医疗数据接口</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    移动
                  </Badge>
                  <span>跨平台移动应用支持</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 发展历程 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            发展历程
          </CardTitle>
          <CardDescription>医枢系统的发展里程碑</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <div className="w-px h-16 bg-blue-200"></div>
              </div>
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>2024年</Badge>
                  <h3 className="font-semibold">医枢系统正式发布</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  言语「医枢」智能诊疗系统v1.0正式发布，标志着新一代AI医疗诊断平台的诞生。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <div className="w-px h-16 bg-green-200"></div>
              </div>
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">2024年</Badge>
                  <h3 className="font-semibold">核心AI引擎优化</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI诊断引擎精度突破99.3%，支持多模态医疗数据分析，获得医疗AI领域重要突破。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">未来</Badge>
                  <h3 className="font-semibold">全球化部署</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  计划在全球范围内部署医枢系统，为更多医疗机构和患者提供智能诊疗服务。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 联系信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-600" />
            联系我们
          </CardTitle>
          <CardDescription>获取更多信息或技术支持</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">技术支持</h3>
                <p className="text-sm text-muted-foreground">
                  邮箱: support@yanyu-medicore.com
                  <br />
                  电话: +86 400-123-4567
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">商务合作</h3>
                <p className="text-sm text-muted-foreground">
                  邮箱: business@yanyu-medicore.com
                  <br />
                  电话: +86 400-765-4321
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">官方网站</h3>
                <p className="text-sm text-muted-foreground">https://www.yanyu-medicore.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">开发者文档</h3>
                <p className="text-sm text-muted-foreground">https://docs.yanyu-medicore.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
