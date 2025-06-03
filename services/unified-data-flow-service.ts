import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

// 统一数据流状态接口
interface UnifiedDataFlowState {
  // 患者数据流
  currentPatient: {
    id: string | null
    basicInfo: any
    medicalHistory: any[]
    currentDiagnosis: any
    prescriptions: any[]
    labResults: any[]
  }

  // 诊断数据流
  diagnosisFlow: {
    currentCase: any
    aiAnalysis: any
    clinicalDecision: any
    treatmentPlan: any
    followUpPlan: any
  }

  // 药物管理数据流
  medicationFlow: {
    activePrescriptions: any[]
    interactions: any[]
    inventoryAlerts: any[]
    complianceData: any
  }

  // 系统集成状态
  integrationStatus: {
    ehrSync: boolean
    aiModelStatus: boolean
    notificationSystem: boolean
    mobileSync: boolean
  }

  // 工作流状态
  workflowState: {
    currentStep: string
    completedSteps: string[]
    pendingActions: any[]
    notifications: any[]
  }
}

// 统一数据流管理 Store
export const useUnifiedDataFlow = create<
  UnifiedDataFlowState & {
    // 患者数据操作
    setCurrentPatient: (patient: any) => void
    updatePatientData: (field: string, data: any) => void

    // 诊断流程操作
    updateDiagnosisFlow: (step: string, data: any) => void
    triggerAIAnalysis: (patientData: any) => Promise<void>

    // 药物管理操作
    updateMedicationFlow: (type: string, data: any) => void
    checkDrugInteractions: (medications: any[]) => Promise<any[]>

    // 系统集成操作
    syncWithEHR: () => Promise<void>
    updateIntegrationStatus: (service: string, status: boolean) => void

    // 工作流操作
    advanceWorkflow: (nextStep: string) => void
    addNotification: (notification: any) => void
    clearNotifications: () => void
  }
>()(
  subscribeWithSelector((set, get) => ({
    // 初始状态
    currentPatient: {
      id: null,
      basicInfo: null,
      medicalHistory: [],
      currentDiagnosis: null,
      prescriptions: [],
      labResults: [],
    },

    diagnosisFlow: {
      currentCase: null,
      aiAnalysis: null,
      clinicalDecision: null,
      treatmentPlan: null,
      followUpPlan: null,
    },

    medicationFlow: {
      activePrescriptions: [],
      interactions: [],
      inventoryAlerts: [],
      complianceData: null,
    },

    integrationStatus: {
      ehrSync: true,
      aiModelStatus: true,
      notificationSystem: true,
      mobileSync: true,
    },

    workflowState: {
      currentStep: "patient-selection",
      completedSteps: [],
      pendingActions: [],
      notifications: [],
    },

    // 患者数据操作
    setCurrentPatient: (patient) => {
      set((state) => ({
        currentPatient: {
          ...state.currentPatient,
          id: patient.id,
          basicInfo: patient,
        },
        workflowState: {
          ...state.workflowState,
          currentStep: "data-collection",
        },
      }))

      // 触发相关数据加载
      get().syncWithEHR()
    },

    updatePatientData: (field, data) => {
      set((state) => ({
        currentPatient: {
          ...state.currentPatient,
          [field]: data,
        },
      }))
    },

    // 诊断流程操作
    updateDiagnosisFlow: (step, data) => {
      set((state) => ({
        diagnosisFlow: {
          ...state.diagnosisFlow,
          [step]: data,
        },
      }))

      // 自动触发下一步流程
      if (step === "aiAnalysis" && data) {
        setTimeout(() => {
          get().advanceWorkflow("clinical-decision")
        }, 1000)
      }
    },

    triggerAIAnalysis: async (patientData) => {
      try {
        // 模拟AI分析过程
        set((state) => ({
          workflowState: {
            ...state.workflowState,
            currentStep: "ai-analysis",
          },
        }))

        // 模拟AI分析延迟
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const aiResult = {
          primaryDiagnosis: "急性心肌梗死",
          confidence: 0.92,
          differentialDiagnoses: [
            { diagnosis: "不稳定性心绞痛", probability: 0.15 },
            { diagnosis: "主动脉夹层", probability: 0.08 },
          ],
          recommendedTests: ["心电图", "心肌酶", "冠脉造影"],
          riskFactors: ["高血压", "糖尿病", "吸烟史"],
          urgencyLevel: "high",
        }

        get().updateDiagnosisFlow("aiAnalysis", aiResult)
        get().addNotification({
          id: Date.now(),
          type: "success",
          title: "AI分析完成",
          message: `诊断建议：${aiResult.primaryDiagnosis}，置信度：${(aiResult.confidence * 100).toFixed(1)}%`,
          timestamp: new Date().toISOString(),
        })
      } catch (error) {
        get().addNotification({
          id: Date.now(),
          type: "error",
          title: "AI分析失败",
          message: "请检查网络连接或联系技术支持",
          timestamp: new Date().toISOString(),
        })
      }
    },

    // 药物管理操作
    updateMedicationFlow: (type, data) => {
      set((state) => ({
        medicationFlow: {
          ...state.medicationFlow,
          [type]: data,
        },
      }))
    },

    checkDrugInteractions: async (medications) => {
      // 模拟药物相互作用检查
      const interactions =
        medications.length > 1
          ? [
              {
                drug1: medications[0]?.name || "阿司匹林",
                drug2: medications[1]?.name || "华法林",
                severity: "high",
                description: "增加出血风险",
                recommendation: "密切监测凝血功能",
              },
            ]
          : []

      get().updateMedicationFlow("interactions", interactions)
      return interactions
    },

    // 系统集成操作
    syncWithEHR: async () => {
      try {
        // 模拟EHR同步
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const patientId = get().currentPatient.id
        if (patientId) {
          // 模拟从EHR获取数据
          const ehrData = {
            medicalHistory: [
              { date: "2023-01-15", diagnosis: "高血压", doctor: "张医生" },
              { date: "2023-06-20", diagnosis: "糖尿病", doctor: "李医生" },
            ],
            labResults: [
              { date: "2024-01-10", test: "血糖", value: "8.2 mmol/L", normal: false },
              { date: "2024-01-10", test: "血压", value: "150/95 mmHg", normal: false },
            ],
          }

          get().updatePatientData("medicalHistory", ehrData.medicalHistory)
          get().updatePatientData("labResults", ehrData.labResults)
        }

        get().updateIntegrationStatus("ehrSync", true)
      } catch (error) {
        get().updateIntegrationStatus("ehrSync", false)
      }
    },

    updateIntegrationStatus: (service, status) => {
      set((state) => ({
        integrationStatus: {
          ...state.integrationStatus,
          [service]: status,
        },
      }))
    },

    // 工作流操作
    advanceWorkflow: (nextStep) => {
      set((state) => ({
        workflowState: {
          ...state.workflowState,
          completedSteps: [...state.completedSteps, state.currentStep],
          currentStep: nextStep,
        },
      }))
    },

    addNotification: (notification) => {
      set((state) => ({
        workflowState: {
          ...state.workflowState,
          notifications: [...state.workflowState.notifications, notification],
        },
      }))
    },

    clearNotifications: () => {
      set((state) => ({
        workflowState: {
          ...state.workflowState,
          notifications: [],
        },
      }))
    },
  })),
)

// 数据流监听器 - 用于跨模块通信
export const setupDataFlowListeners = () => {
  // 监听患者变更，自动触发相关数据加载
  useUnifiedDataFlow.subscribe(
    (state) => state.currentPatient.id,
    (patientId) => {
      if (patientId) {
        console.log("患者变更，触发数据同步:", patientId)
        // 可以在这里触发其他模块的数据更新
      }
    },
  )

  // 监听AI分析结果，自动更新临床决策
  useUnifiedDataFlow.subscribe(
    (state) => state.diagnosisFlow.aiAnalysis,
    (aiAnalysis) => {
      if (aiAnalysis) {
        console.log("AI分析完成，更新临床决策:", aiAnalysis)
        // 自动生成临床决策建议
      }
    },
  )

  // 监听药物变更，自动检查相互作用
  useUnifiedDataFlow.subscribe(
    (state) => state.medicationFlow.activePrescriptions,
    (prescriptions) => {
      if (prescriptions.length > 0) {
        console.log("处方变更，检查药物相互作用:", prescriptions)
        useUnifiedDataFlow.getState().checkDrugInteractions(prescriptions)
      }
    },
  )
}
