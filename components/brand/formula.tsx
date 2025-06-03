"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Database, Heart, Plus, Equal } from "lucide-react"

export function BrandFormula({ className }: { className?: string }) {
  return (
    <Card className={`bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 ${className}`}>
      <CardContent className="p-4">
        <div className="text-center space-y-3">
          <h3 className="text-base font-semibold text-blue-900 mb-3">品牌公式</h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm">
            {/* AI诊断引擎 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="p-2 bg-blue-100 rounded-full">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                AI<sub>Dx</sub>: AI诊断引擎
              </Badge>
              <p className="text-xs text-blue-600 text-center">精度&gt;99.3%</p>
            </div>

            <Plus className="h-4 w-4 text-gray-400 hidden md:block" />

            {/* 医疗数据安全 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="p-2 bg-green-100 rounded-full">
                <Database className="h-5 w-5 text-green-600" />
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                Data<sub>Safe</sub>: 医疗数据量子加密
              </Badge>
              <p className="text-xs text-green-600 text-center">符合HIPAA/GDPR</p>
            </div>

            <Plus className="h-4 w-4 text-gray-400 hidden md:block" />

            {/* 患者关怀系统 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="p-2 bg-purple-100 rounded-full">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                Empathy<sub>Care</sub>: 患者交互关怀系统
              </Badge>
              <p className="text-xs text-purple-600 text-center">情感计算驱动</p>
            </div>

            <Equal className="h-4 w-4 text-gray-600 hidden md:block" />

            {/* 结果 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <span className="text-white font-bold text-xs">医枢</span>
              </div>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                YY-MCIDS = MediCore® ⊕ (AI<sub>Dx</sub> + Data<sub>Safe</sub> + Empathy<sub>Care</sub>)
              </Badge>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-blue-600">医枢</span> =<span className="text-blue-600"> 智能诊断</span>{" "}
              +<span className="text-green-600"> 数据安全</span> +<span className="text-purple-600"> 人文关怀</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
