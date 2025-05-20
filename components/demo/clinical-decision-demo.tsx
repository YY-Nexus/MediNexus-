"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/hooks/use-translation"
import { AlertCircle, CheckCircle2, HelpCircle } from "lucide-react"

const SYMPTOMS = [
  { id: "s1", name: "发热", value: "fever" },
  { id: "s2", name: "咳嗽", value: "cough" },
  { id: "s3", name: "疲劳", value: "fatigue" },
  { id: "s4", name: "呼吸急促", value: "shortness_of_breath" },
  { id: "s5", name: "肌肉疼痛", value: "muscle_pain" },
  { id: "s6", name: "头痛", value: "headache" },
  { id: "s7", name: "喉咙痛", value: "sore_throat" },
  { id: "s8", name: "味觉或嗅觉丧失", value: "loss_of_taste_or_smell" },
]

export function ClinicalDecisionDemo() {
  const { t } = useTranslation()
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [diagnosis, setDiagnosis] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleSymptomToggle = (value: string) => {
    setSelectedSymptoms((prev) => (prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]))

    // 重置诊断结果
    if (diagnosis) {
      setDiagnosis(null)
      setRecommendations([])
    }
  }

  const analyzeSymptoms = () => {
    setIsAnalyzing(true)

    // 模拟AI分析过程
    setTimeout(() => {
      // 简单的演示逻辑
      if (
        selectedSymptoms.includes("fever") &&
        selectedSymptoms.includes("cough") &&
        selectedSymptoms.includes("shortness_of_breath")
      ) {
        setDiagnosis("可能的呼吸道感染")
        setRecommendations([
          "建议进行COVID-19检测",
          "休息并保持充分水分摄入",
          "监测体温和氧气饱和度",
          "如症状恶化，请立即就医",
        ])
      } else if (selectedSymptoms.includes("headache") && selectedSymptoms.includes("fatigue")) {
        setDiagnosis("可能的偏头痛或疲劳综合征")
        setRecommendations([
          "在安静、黑暗的房间休息",
          "适当补充水分",
          "考虑非处方止痛药",
          "如症状持续超过48小时，请咨询医生",
        ])
      } else if (selectedSymptoms.length > 0) {
        setDiagnosis("症状不明确")
        setRecommendations(["建议进一步咨询医生", "记录症状出现的时间和频率", "注意休息和饮食"])
      } else {
        setDiagnosis("请选择至少一个症状")
        setRecommendations([])
      }

      setIsAnalyzing(false)
    }, 1500)
  }

  const resetForm = () => {
    setSelectedSymptoms([])
    setDiagnosis(null)
    setRecommendations([])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("demo.clinicalDecision.symptoms", "症状选择")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {SYMPTOMS.map((symptom) => (
              <div key={symptom.id} className="flex items-center space-x-2">
                <Checkbox
                  id={symptom.id}
                  checked={selectedSymptoms.includes(symptom.value)}
                  onCheckedChange={() => handleSymptomToggle(symptom.value)}
                />
                <Label htmlFor={symptom.id}>{symptom.name}</Label>
              </div>
            ))}
          </div>

          <div className="flex space-x-2 mt-6">
            <Button
              onClick={analyzeSymptoms}
              disabled={isAnalyzing || selectedSymptoms.length === 0}
              className="flex-1"
            >
              {isAnalyzing
                ? t("demo.clinicalDecision.analyzing", "分析中...")
                : t("demo.clinicalDecision.analyze", "分析症状")}
            </Button>
            <Button variant="outline" onClick={resetForm} disabled={isAnalyzing}>
              {t("demo.clinicalDecision.reset", "重置")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("demo.clinicalDecision.results", "诊断结果")}</CardTitle>
        </CardHeader>
        <CardContent>
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-pulse text-center">
                <HelpCircle className="h-12 w-12 mx-auto text-primary mb-4" />
                <p>{t("demo.clinicalDecision.aiAnalyzing", "AI正在分析症状...")}</p>
              </div>
            </div>
          ) : diagnosis ? (
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                {diagnosis.includes("不明确") || diagnosis.includes("请选择") ? (
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                )}
                <div>
                  <h3 className="font-medium">{t("demo.clinicalDecision.diagnosis", "诊断")}:</h3>
                  <p>{diagnosis}</p>
                </div>
              </div>

              {recommendations.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">{t("demo.clinicalDecision.recommendations", "建议")}:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 text-xs text-muted-foreground border-t mt-4">
                <p>
                  {t(
                    "demo.clinicalDecision.disclaimer",
                    "免责声明：这只是一个演示，不构成医疗建议。请咨询专业医生获取准确诊断。",
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <HelpCircle className="h-12 w-12 mb-4" />
              <p>{t("demo.clinicalDecision.selectSymptomsPrompt", '请选择症状并点击"分析症状"按钮')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
