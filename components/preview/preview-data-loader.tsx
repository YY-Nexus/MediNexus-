"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { usePreview } from "@/contexts/preview-context"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface PreviewDataLoaderProps {
  dataSource: string
  onDataLoaded?: (data: any) => void
  children?: React.ReactNode
}

export function PreviewDataLoader({ dataSource, onDataLoaded, children }: PreviewDataLoaderProps) {
  const { setPreviewData, previewMode } = usePreview()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const loadAttemptedRef = useRef(false)

  const loadData = async () => {
    if (loadAttemptedRef.current) return
    loadAttemptedRef.current = true

    setIsLoading(true)
    setError(null)

    try {
      // 根据数据源类型加载数据
      let data
      if (dataSource.startsWith("http")) {
        // 从URL加载
        const response = await fetch(dataSource)
        if (!response.ok) {
          throw new Error(`加载失败: ${response.status} ${response.statusText}`)
        }
        data = await response.json()
      } else if (dataSource.startsWith("/api/")) {
        // 从API加载
        const response = await fetch(dataSource)
        if (!response.ok) {
          throw new Error(`API请求失败: ${response.status} ${response.statusText}`)
        }
        data = await response.json()
      } else {
        // 假设是静态数据标识符
        // 这里可以根据标识符返回不同的模拟数据
        data = getMockData(dataSource)
      }

      // 设置预览数据
      setPreviewData(data)
      if (onDataLoaded) {
        onDataLoaded(data)
      }
    } catch (err) {
      console.error("加载预览数据失败:", err)
      setError(err instanceof Error ? err.message : "加载数据失败")
    } finally {
      setIsLoading(false)
    }
  }

  // 在组件挂载时自动加载数据
  useEffect(() => {
    if (previewMode !== "disabled") {
      loadData()
    }

    return () => {
      loadAttemptedRef.current = false
    }
  }, [previewMode, dataSource])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-md border border-gray-200">
        <Loader2 className="h-5 w-5 text-gray-400 animate-spin mr-2" />
        <span className="text-sm text-gray-500">加载预览数据...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-md bg-red-50">
        <p className="text-sm text-red-600 mb-2">加载预览数据失败: {error}</p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            loadAttemptedRef.current = false
            loadData()
          }}
        >
          重试
        </Button>
      </div>
    )
  }

  return <>{children}</>
}

// 根据标识符获取模拟数据
function getMockData(identifier: string) {
  const mockDataSets: Record<string, any> = {
    patient: {
      id: "P12345",
      name: "张三",
      age: 45,
      gender: "男",
      bloodType: "A+",
      medicalHistory: ["高血压", "糖尿病"],
      lastVisit: "2023-05-15",
    },
    "medical-record": {
      id: "MR78901",
      patientId: "P12345",
      date: "2023-05-15",
      diagnosis: "2型糖尿病",
      treatment: "胰岛素治疗",
      doctor: "李医生",
      notes: "患者血糖控制良好，继续当前治疗方案。",
    },
    "lab-results": {
      id: "LR34567",
      patientId: "P12345",
      date: "2023-05-10",
      tests: [
        { name: "血糖", value: "6.2", unit: "mmol/L", normalRange: "3.9-6.1" },
        { name: "胆固醇", value: "5.1", unit: "mmol/L", normalRange: "3.1-5.7" },
        { name: "血压", value: "135/85", unit: "mmHg", normalRange: "90-120/60-80" },
      ],
    },
    imaging: {
      id: "IM56789",
      patientId: "P12345",
      date: "2023-05-05",
      type: "X光",
      bodyPart: "胸部",
      findings: "未见明显异常",
      imageUrl: "/placeholder-4b9ab.png",
    },
    "ai-diagnosis": {
      patientId: "P12345",
      date: "2023-05-15",
      symptoms: ["咳嗽", "发热", "疲劳"],
      possibleDiagnoses: [
        { name: "普通感冒", probability: 0.75, confidence: "高" },
        { name: "流感", probability: 0.15, confidence: "中" },
        { name: "COVID-19", probability: 0.05, confidence: "低" },
      ],
      recommendedTests: ["血常规", "胸部X光"],
    },
    "treatment-plan": {
      patientId: "P12345",
      diagnosis: "2型糖尿病",
      startDate: "2023-05-15",
      endDate: "2023-08-15",
      medications: [
        { name: "二甲双胍", dosage: "500mg", frequency: "每日两次" },
        { name: "胰岛素", dosage: "10单位", frequency: "每日一次，睡前" },
      ],
      dietaryRecommendations: ["低碳水化合物饮食", "控制总热量摄入", "增加纤维摄入"],
      followUpDate: "2023-06-15",
    },
  }

  return mockDataSets[identifier] || { error: "未找到匹配的模拟数据" }
}
