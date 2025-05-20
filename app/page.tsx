import { Suspense } from "react"
import {
  ResponsiveMedicalCard,
  ResponsiveMedicalCardContent,
  ResponsiveMedicalCardDescription,
  ResponsiveMedicalCardHeader,
  ResponsiveMedicalCardTitle,
} from "@/components/ui/responsive-medical-card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Brain, HeartPulse, Stethoscope, Users, Video, FileText } from "lucide-react"
import { BrandFormula } from "@/components/brand/formula"

export default function Home() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-medical-800">言语「 医枢³」智能诊疗系统</h1>
          <p className="text-sm text-medical-600 mt-1">YanYu MediNexus³ AI Diagnostic System (YY³-MNDS)</p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm font-medium text-medical-700 bg-medical-50 px-3 py-1 rounded-full border border-medical-100">
            ³维精准：1mm病灶识别、3秒AI初诊、30年临床知识库
          </p>
        </div>
      </div>

      <BrandFormula className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Suspense fallback={<LoadingSpinner />}>
          <ResponsiveMedicalCard variant="elevated">
            <ResponsiveMedicalCardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-medical-100">
                  <Brain className="h-5 w-5 text-medical-600" />
                </div>
                <ResponsiveMedicalCardTitle>智能诊断</ResponsiveMedicalCardTitle>
              </div>
              <ResponsiveMedicalCardDescription>基于深度学习的医疗影像分析和诊断系统</ResponsiveMedicalCardDescription>
            </ResponsiveMedicalCardHeader>
            <ResponsiveMedicalCardContent>
              <div className="text-sm text-medical-700">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>支持多模态医疗数据分析</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>实时诊断结果与解释</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>持续学习与模型优化</span>
                  </li>
                </ul>
              </div>
            </ResponsiveMedicalCardContent>
          </ResponsiveMedicalCard>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ResponsiveMedicalCard variant="elevated">
            <ResponsiveMedicalCardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-medical-100">
                  <Stethoscope className="h-5 w-5 text-medical-600" />
                </div>
                <ResponsiveMedicalCardTitle>临床决策</ResponsiveMedicalCardTitle>
              </div>
              <ResponsiveMedicalCardDescription>辅助医生进行临床决策的智能推荐系统</ResponsiveMedicalCardDescription>
            </ResponsiveMedicalCardHeader>
            <ResponsiveMedicalCardContent>
              <div className="text-sm text-medical-700">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>基于证据的治疗方案推荐</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>药物相互作用检查</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>个性化治疗方案生成</span>
                  </li>
                </ul>
              </div>
            </ResponsiveMedicalCardContent>
          </ResponsiveMedicalCard>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ResponsiveMedicalCard variant="elevated">
            <ResponsiveMedicalCardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-medical-100">
                  <Video className="h-5 w-5 text-medical-600" />
                </div>
                <ResponsiveMedicalCardTitle>远程会诊</ResponsiveMedicalCardTitle>
              </div>
              <ResponsiveMedicalCardDescription>高清视频会诊系统，连接全球医疗专家</ResponsiveMedicalCardDescription>
            </ResponsiveMedicalCardHeader>
            <ResponsiveMedicalCardContent>
              <div className="text-sm text-medical-700">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>低延迟高清视频通话</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>医疗数据实时共享</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>多方会诊与协作</span>
                  </li>
                </ul>
              </div>
            </ResponsiveMedicalCardContent>
          </ResponsiveMedicalCard>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ResponsiveMedicalCard variant="elevated">
            <ResponsiveMedicalCardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-medical-100">
                  <Users className="h-5 w-5 text-medical-600" />
                </div>
                <ResponsiveMedicalCardTitle>患者管理</ResponsiveMedicalCardTitle>
              </div>
              <ResponsiveMedicalCardDescription>全面的患者信息管理与随访系统</ResponsiveMedicalCardDescription>
            </ResponsiveMedicalCardHeader>
            <ResponsiveMedicalCardContent>
              <div className="text-sm text-medical-700">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>患者360°全景视图</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>智能随访计划生成</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>患者分组与标签管理</span>
                  </li>
                </ul>
              </div>
            </ResponsiveMedicalCardContent>
          </ResponsiveMedicalCard>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ResponsiveMedicalCard variant="elevated">
            <ResponsiveMedicalCardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-medical-100">
                  <HeartPulse className="h-5 w-5 text-medical-600" />
                </div>
                <ResponsiveMedicalCardTitle>健康数据</ResponsiveMedicalCardTitle>
              </div>
              <ResponsiveMedicalCardDescription>实时健康数据监测与分析平台</ResponsiveMedicalCardDescription>
            </ResponsiveMedicalCardHeader>
            <ResponsiveMedicalCardContent>
              <div className="text-sm text-medical-700">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>多源健康数据整合</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>健康趋势分析与预警</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>可穿戴设备数据同步</span>
                  </li>
                </ul>
              </div>
            </ResponsiveMedicalCardContent>
          </ResponsiveMedicalCard>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ResponsiveMedicalCard variant="elevated">
            <ResponsiveMedicalCardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-medical-100">
                  <FileText className="h-5 w-5 text-medical-600" />
                </div>
                <ResponsiveMedicalCardTitle>电子病历</ResponsiveMedicalCardTitle>
              </div>
              <ResponsiveMedicalCardDescription>智能电子病历系统与多系统集成</ResponsiveMedicalCardDescription>
            </ResponsiveMedicalCardHeader>
            <ResponsiveMedicalCardContent>
              <div className="text-sm text-medical-700">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>结构化病历数据管理</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>多系统无缝集成</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medical-400"></div>
                    <span>智能语音录入与转写</span>
                  </li>
                </ul>
              </div>
            </ResponsiveMedicalCardContent>
          </ResponsiveMedicalCard>
        </Suspense>
      </div>
    </div>
  )
}
