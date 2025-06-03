import type { Expert, Consultation, ConsultationMessage } from "../types/clinical-decision"

// 智能会诊协调服务
export class IntelligentConsultationService {
  // 专业领域映射
  private static specialtyMapping = {
    心血管疾病: ["心内科", "心外科", "影像科"],
    糖尿病: ["内分泌科", "营养科", "眼科", "肾内科"],
    肿瘤: ["肿瘤科", "病理科", "影像科", "外科"],
    神经系统疾病: ["神经内科", "神经外科", "影像科", "康复科"],
    呼吸系统疾病: ["呼吸科", "影像科", "病理科"],
  }

  // 评估病例复杂度
  static assessCaseComplexity(caseDetails: any): "简单" | "中等" | "复杂" | "极复杂" {
    let complexityScore = 0

    // 合并症数量
    const comorbidities = caseDetails.comorbidities?.length || 0
    complexityScore += comorbidities * 10

    // 既往治疗失败次数
    const failedTreatments = caseDetails.failedTreatments?.length || 0
    complexityScore += failedTreatments * 15

    // 罕见疾病
    if (caseDetails.diagnosis?.includes("罕见") || caseDetails.diagnosis?.includes("疑难")) {
      complexityScore += 30
    }

    // 多系统受累
    const systemsInvolved = caseDetails.systemsInvolved?.length || 1
    complexityScore += (systemsInvolved - 1) * 12

    // 紧急程度
    if (caseDetails.urgency === "紧急") {
      complexityScore += 20
    }

    if (complexityScore <= 20) return "简单"
    if (complexityScore <= 40) return "中等"
    if (complexityScore <= 70) return "复杂"
    return "极复杂"
  }

  // 确定最佳团队规模
  static getOptimalTeamSize(complexity: string): number {
    const teamSizes = {
      简单: 2,
      中等: 3,
      复杂: 4,
      极复杂: 5,
    }
    return teamSizes[complexity] || 3
  }

  // 计算专业匹配度
  static calculateSpecialtyMatch(expertExpertise: Expert["expertise"], requiredSpecialties: string[]): number {
    let matchScore = 0
    const totalRequired = requiredSpecialties.length

    for (const required of requiredSpecialties) {
      // 主要专业完全匹配
      if (expertExpertise.primarySpecialties.includes(required)) {
        matchScore += 100
      }
      // 次要专业匹配
      else if (expertExpertise.subSpecialties.includes(required)) {
        matchScore += 70
      }
      // 研究领域匹配
      else if (expertExpertise.researchAreas.some((area) => area.includes(required))) {
        matchScore += 50
      }
    }

    return totalRequired > 0 ? matchScore / totalRequired : 0
  }

  // 计算专家可用性
  static calculateAvailability(workload: Expert["workload"], urgencyLevel: string): number {
    const utilizationRate = workload.currentCases / workload.maxCapacity
    let availabilityScore = (1 - utilizationRate) * 100

    // 紧急情况下的可用性调整
    if (urgencyLevel === "紧急") {
      if (workload.urgentCasesHandled < 3) {
        availabilityScore *= 1.2 // 有处理紧急情况的能力
      } else {
        availabilityScore *= 0.8 // 已处理较多紧急情况
      }
    }

    return Math.min(100, Math.max(0, availabilityScore))
  }

  // AI兼容性评分
  static getAICompatibilityScore(aiLevel: Expert["aiAssistanceLevel"]): number {
    const scores = {
      基础: 60,
      中级: 80,
      高级: 100,
    }
    return scores[aiLevel] || 60
  }

  // 实时冲突检测
  static detectConflicts(messages: ConsultationMessage[]): boolean {
    const recentMessages = messages.slice(-10) // 最近10条消息
    const conflictKeywords = ["不同意", "反对", "错误", "不正确", "质疑"]

    let conflictCount = 0
    for (const message of recentMessages) {
      for (const keyword of conflictKeywords) {
        if (message.content.includes(keyword)) {
          conflictCount++
          break
        }
      }
    }

    return conflictCount >= 2 // 如果有2条或更多冲突消息
  }

  // 计算共识度
  static calculateConsensus(messages: ConsultationMessage[], decisions: any[]): number {
    if (messages.length === 0) return 0

    // 分析消息中的同意/反对情绪
    let agreementCount = 0
    let disagreementCount = 0

    const agreementKeywords = ["同意", "赞成", "支持", "正确", "很好"]
    const disagreementKeywords = ["不同意", "反对", "质疑", "错误", "不妥"]

    for (const message of messages) {
      let hasAgreement = false
      let hasDisagreement = false

      for (const keyword of agreementKeywords) {
        if (message.content.includes(keyword)) {
          hasAgreement = true
          break
        }
      }

      for (const keyword of disagreementKeywords) {
        if (message.content.includes(keyword)) {
          hasDisagreement = true
          break
        }
      }

      if (hasAgreement && !hasDisagreement) agreementCount++
      if (hasDisagreement && !hasAgreement) disagreementCount++
    }

    const totalOpinions = agreementCount + disagreementCount
    if (totalOpinions === 0) return 50 // 中性

    return Math.round((agreementCount / totalOpinions) * 100)
  }

  // 生成AI综合建议
  static generateRecommendationSynthesis(messages: ConsultationMessage[], decisions: any[], caseDetails: any): string {
    // 提取关键观点
    const keyPoints = this.extractKeyPoints(messages)

    // 分析决策趋势
    const decisionTrend = this.analyzeDecisionTrend(decisions)

    // 考虑病例特点
    const caseSpecificFactors = this.analyzeCaseFactors(caseDetails)

    // 生成综合建议
    let synthesis = "基于多学科专家讨论，AI综合分析建议："

    if (keyPoints.length > 0) {
      synthesis += `\n\n关键共识：${keyPoints.slice(0, 3).join("；")}`
    }

    if (decisionTrend) {
      synthesis += `\n\n决策趋势：${decisionTrend}`
    }

    if (caseSpecificFactors) {
      synthesis += `\n\n特殊考虑：${caseSpecificFactors}`
    }

    synthesis += "\n\n建议在实施前进行最终确认，并制定详细的监测计划。"

    return synthesis
  }

  // 提取关键观点
  private static extractKeyPoints(messages: ConsultationMessage[]): string[] {
    const keyPoints: string[] = []
    const importantKeywords = ["建议", "推荐", "应该", "必须", "关键", "重要"]

    for (const message of messages) {
      for (const keyword of importantKeywords) {
        if (message.content.includes(keyword)) {
          // 提取包含关键词的句子
          const sentences = message.content.split(/[。！？]/)
          for (const sentence of sentences) {
            if (sentence.includes(keyword) && sentence.length > 10 && sentence.length < 100) {
              keyPoints.push(sentence.trim())
            }
          }
        }
      }
    }

    // 去重并返回最重要的观点
    return [...new Set(keyPoints)].slice(0, 5)
  }

  // 分析决策趋势
  private static analyzeDecisionTrend(decisions: any[]): string {
    if (decisions.length === 0) return ""

    const latestDecision = decisions[decisions.length - 1]
    const avgConfidence = decisions.reduce((sum, d) => sum + d.confidence, 0) / decisions.length

    if (avgConfidence >= 80) {
      return "专家团队对当前决策方案具有高度信心"
    } else if (avgConfidence >= 60) {
      return "专家团队对当前决策方案基本认同，建议进一步讨论细节"
    } else {
      return "专家意见存在分歧，建议寻求更多证据或扩大会诊范围"
    }
  }

  // 分析病例特殊因素
  private static analyzeCaseFactors(caseDetails: any): string {
    const factors: string[] = []

    if (caseDetails.age && caseDetails.age > 65) {
      factors.push("考虑患者高龄因素")
    }

    if (caseDetails.comorbidities && caseDetails.comorbidities.length > 2) {
      factors.push("注意多重合并症的相互影响")
    }

    if (caseDetails.urgency === "紧急") {
      factors.push("时间紧迫，需要快速决策")
    }

    if (caseDetails.previousTreatmentFailures) {
      factors.push("既往治疗失败，需要创新方案")
    }

    return factors.join("；")
  }

  // 生成下一步行动建议
  static generateNextSteps(consultation: Consultation, consensus: number, conflicts: boolean): string[] {
    const steps: string[] = []

    if (conflicts) {
      steps.push("组织结构化讨论解决分歧")
      steps.push("邀请相关领域权威专家参与")
    }

    if (consensus < 70) {
      steps.push("收集更多临床证据")
      steps.push("进行文献回顾和指南对比")
    }

    if (consultation.status === "in-progress") {
      steps.push("制定详细的实施计划")
      steps.push("确定监测指标和随访时间")
    }

    if (consultation.followUp?.required) {
      steps.push("安排定期随访评估")
      steps.push("建立患者反馈机制")
    }

    // 默认步骤
    if (steps.length === 0) {
      steps.push("总结会诊结论")
      steps.push("制定实施时间表")
      steps.push("分配责任人员")
    }

    return steps
  }

  // 评估会诊质量
  static assessConsultationQuality(consultation: Consultation): {
    participationRate: number
    decisionQuality: number
    timeEfficiency: number
    patientCenteredness: number
  } {
    // 参与度评估
    const totalParticipants = consultation.participants.length
    const activeParticipants = new Set(consultation.messages.map((m) => m.senderId)).size
    const participationRate = Math.round((activeParticipants / totalParticipants) * 100)

    // 决策质量评估
    const hasEvidence = consultation.attachments.length > 0
    const hasDecisions = consultation.decisions.length > 0
    const avgConfidence =
      consultation.decisions.length > 0
        ? consultation.decisions.reduce((sum, d) => sum + d.confidence, 0) / consultation.decisions.length
        : 0
    const decisionQuality = Math.round((hasEvidence ? 30 : 0) + (hasDecisions ? 30 : 0) + avgConfidence * 0.4)

    // 时间效率评估
    const plannedDuration = consultation.duration
    const actualDuration = this.calculateActualDuration(consultation)
    const timeEfficiency = Math.round(Math.min(100, (plannedDuration / actualDuration) * 100))

    // 患者中心度评估
    const patientMentions = consultation.messages.filter(
      (m) => m.content.includes("患者") || m.content.includes("病人"),
    ).length
    const totalMessages = consultation.messages.length
    const patientCenteredness =
      totalMessages > 0 ? Math.round(Math.min(100, (patientMentions / totalMessages) * 200)) : 0

    return {
      participationRate,
      decisionQuality,
      timeEfficiency,
      patientCenteredness,
    }
  }

  // 计算实际会诊时长
  private static calculateActualDuration(consultation: Consultation): number {
    if (consultation.messages.length < 2) return consultation.duration

    const firstMessage = new Date(consultation.messages[0].timestamp)
    const lastMessage = new Date(consultation.messages[consultation.messages.length - 1].timestamp)

    return Math.round((lastMessage.getTime() - firstMessage.getTime()) / (1000 * 60)) // 分钟
  }
}
