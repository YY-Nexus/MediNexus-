import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Users, BookOpen, Award, Stethoscope } from "lucide-react"

export const metadata: Metadata = {
  title: "医疗标准 | 言语云³",
  description: "医疗行业特色功能和合规标准",
}

export default function MedicalStandardsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-blue-800">医疗行业标准</h1>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg max-w-2xl mx-auto">
          <p className="text-blue-700 font-medium italic">"医者仁心，以患者为本，以生命为重"</p>
          <p className="text-blue-600 text-sm mt-1">"技术服务医疗，智慧守护健康"</p>
        </div>
      </div>

      {/* 医疗合规标准 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            医疗合规标准
          </CardTitle>
          <CardDescription>符合国际医疗行业标准和法规要求</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800">已认证</Badge>
                <span className="font-medium text-green-800">HIPAA</span>
              </div>
              <p className="text-sm text-green-600">美国健康保险流通与责任法案合规</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800">已认证</Badge>
                <span className="font-medium text-green-800">GDPR</span>
              </div>
              <p className="text-sm text-green-600">欧盟通用数据保护条例合规</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800">已认证</Badge>
                <span className="font-medium text-green-800">ISO 27001</span>
              </div>
              <p className="text-sm text-green-600">信息安全管理体系国际标准</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 医疗专业功能 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            医疗专业功能
          </CardTitle>
          <CardDescription>针对医疗行业特殊需求设计的专业功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">患者隐私保护</span>
                </div>
                <p className="text-sm text-blue-600">端到端加密，确保患者数据安全</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">多角色权限</span>
                </div>
                <p className="text-sm text-blue-600">医生、护士、管理员等不同角色权限管理</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">医学知识库</span>
                </div>
                <p className="text-sm text-blue-600">集成权威医学指南和诊疗规范</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">质量认证</span>
                </div>
                <p className="text-sm text-blue-600">医疗器械软件质量管理体系认证</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 医德医风建设 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            医德医风建设
          </CardTitle>
          <CardDescription>弘扬医者精神，传承医学人文</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">医者誓言</h4>
              <p className="text-sm text-blue-700 italic">
                "健康所系，性命相托。当我步入神圣医学学府的时刻，谨庄严宣誓：
                我志愿献身医学，热爱祖国，忠于人民，恪守医德，尊师守纪，刻苦钻研， 孜孜不倦，精益求精，全面发展。"
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-1">仁心仁术</h5>
                <p className="text-xs text-blue-600">以仁爱之心对待每一位患者，以精湛医术守护生命健康</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-1">严谨治学</h5>
                <p className="text-xs text-blue-600">严格遵循循证医学原则，持续学习最新医学知识</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-1">团队协作</h5>
                <p className="text-xs text-blue-600">发挥团队精神，多学科协作为患者提供最佳治疗方案</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-1">持续改进</h5>
                <p className="text-xs text-blue-600">不断改进医疗质量，提升患者满意度和治疗效果</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
