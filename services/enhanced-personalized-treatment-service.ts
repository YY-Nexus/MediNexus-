import type { PatientProfile, TreatmentOption } from "../types/clinical-decision"

// 增强的个性化治疗推荐服务
export class EnhancedPersonalizedTreatmentService {
  // 基因型-药物相互作用数据库
  private static geneticDrugInteractions = {
    "CYP2D6*1/*1": {
      二甲双胍: { compatibility: 95, dosageAdjustment: 1.0 },
      格列美脲: { compatibility: 90, dosageAdjustment: 1.0 },
      利拉鲁肽: { compatibility: 85, dosageAdjustment: 1.0 },
    },
    "CYP2D6*4/*4": {
      二甲双胍: { compatibility: 70, dosageAdjustment: 0.7 },
      格列美脲: { compatibility: 60, dosageAdjustment: 0.6 },
      利拉鲁肽: { compatibility: 85, dosageAdjustment: 1.0 },
    },
  }

  // 生活方式-治疗匹配算法
  private static calculateLifestyleAlignment(
    treatment: TreatmentOption,
    lifestyle: PatientProfile["lifestyle"],
  ): number {
    let score = 100

    // 吸烟状态影响
    if (lifestyle.smoking && treatment.type === "药物治疗") {
      score *= 0.8 // 吸烟可能影响药物代谢
    }

    // 运动水平影响
    if (treatment.type === "生活方式干预") {
      const exerciseMultiplier = {
        无: 0.6,
        轻度: 0.8,
        中度: 1.0,
        重度: 1.2,
      }
      score *= exerciseMultiplier[lifestyle.exercise as keyof typeof exerciseMultiplier] || 1.0
    }

    // 饮食习惯影响
    if (treatment.name.includes("饮食") && lifestyle.diet === "特殊饮食") {
      score *= 1.2
    }

    return Math.min(100, Math.max(0, score))
  }

  // 心理社会适应性评估
  private static calculatePsychosocialFit(
    treatment: TreatmentOption,
    psychological: PatientProfile["psychologicalProfile"],
    social: PatientProfile["socialFactors"],
  ): number {
    let score = 100

    // 焦虑水平影响
    if (psychological.anxietyLevel === "高" && treatment.type === "手术治疗") {
      score *= 0.7
    }

    // 抑郁风险影响
    if (psychological.depressionRisk === "高" && treatment.type === "心理治疗") {
      score *= 1.3
    }

    // 动机水平影响
    if (treatment.type === "生活方式干预") {
      score *= psychological.motivationLevel / 10
    }

    // 家庭支持影响
    if (social.familySupport === "强" && treatment.duration.includes("长期")) {
      score *= 1.2
    }

    // 教育水平影响复杂治疗方案
    if (treatment.name.includes("复杂") || treatment.name.includes("精准")) {
      const educationMultiplier = {
        小学: 0.7,
        中学: 0.8,
        大学: 1.0,
        研究生: 1.1,
      }
      score *= educationMultiplier[social.education as keyof typeof educationMultiplier] || 1.0
    }

    return Math.min(100, Math.max(0, score))
  }

  // 经济可行性评估
  private static calculateEconomicFeasibility(
    treatment: TreatmentOption,
    economic: PatientProfile["economicFactors"],
  ): number {
    let score = 100

    // 收入水平与治疗费用匹配
    const costIncomeMatrix = {
      低: { 低: 1.0, 中: 0.7, 高: 0.3 },
      中: { 低: 1.2, 中: 1.0, 高: 0.6 },
      高: { 低: 1.3, 中: 1.1, 高: 1.0 },
    }

    const multiplier = costIncomeMatrix[economic.incomeLevel]?.[treatment.cost] || 1.0
    score *= multiplier

    // 就业状态影响
    if (economic.employmentStatus === "失业" && treatment.cost === "高") {
      score *= 0.5
    }

    // 交通距离影响
    if (economic.travelDistance > 50 && treatment.monitoring.frequency.includes("每周")) {
      score *= 0.8
    }

    return Math.min(100, Math.max(0, score))
  }

  // 文化接受度评估
  private static calculateCulturalAcceptability(
    treatment: TreatmentOption,
    cultural: PatientProfile["culturalFactors"],
  ): number {
    let score = 100

    // 宗教信仰影响
    if (cultural.religiousBeliefs.includes("素食主义") && treatment.name.includes("动物源")) {
      score *= 0.3
    }

    // 文化偏好影响
    if (cultural.culturalPreferences.includes("传统医学偏好") && treatment.type === "药物治疗") {
      score *= 0.8
    }

    if (cultural.culturalPreferences.includes("现代医学偏好") && treatment.type === "物理治疗") {
      score *= 1.2
    }

    return Math.min(100, Math.max(0, score))
  }

  // 基因兼容性评估
  private static calculateGeneticCompatibility(treatment: TreatmentOption, geneticFactors: string[]): number {
    if (!geneticFactors || geneticFactors.length === 0) {
      return 80 // 默认兼容性
    }

    let totalCompatibility = 0
    let factorCount = 0

    for (const factor of geneticFactors) {
      const interactions = this.geneticDrugInteractions[factor as keyof typeof this.geneticDrugInteractions]
      if (interactions) {
        for (const medication of treatment.requirements) {
          if (interactions[medication as keyof typeof interactions]) {
            totalCompatibility += interactions[medication as keyof typeof interactions].compatibility
            factorCount++
          }
        }
      }
    }

    return factorCount > 0 ? totalCompatibility / factorCount : 80
  }

  // 生成个性化治疗推荐
  static generatePersonalizedRecommendations(
    baseRecommendations: TreatmentOption[],
    patientProfile: PatientProfile,
  ): TreatmentOption[] {
    return baseRecommendations
      .map((treatment) => {
        // 计算各个个性化因子
        const geneticCompatibility = this.calculateGeneticCompatibility(treatment, patientProfile.geneticFactors || [])

        const lifestyleAlignment = this.calculateLifestyleAlignment(treatment, patientProfile.lifestyle)

        const psychosocialFit = this.calculatePsychosocialFit(
          treatment,
          patientProfile.psychologicalProfile,
          patientProfile.socialFactors,
        )

        const economicFeasibility = this.calculateEconomicFeasibility(treatment, patientProfile.economicFactors)

        const culturalAcceptability = this.calculateCulturalAcceptability(treatment, patientProfile.culturalFactors)

        // 计算综合个性化评分
        const personalizedScore =
          treatment.suitabilityScore *
          (geneticCompatibility / 100) *
          (lifestyleAlignment / 100) *
          (psychosocialFit / 100) *
          (economicFeasibility / 100) *
          (culturalAcceptability / 100)

        // 生成预测结果
        const successProbability = Math.min(95, Math.max(30, personalizedScore * (treatment.efficacyRate / 100)))

        const qualityOfLifeImpact = Math.min(80, Math.max(10, (personalizedScore + treatment.efficacyRate) / 2))

        return {
          ...treatment,
          suitabilityScore: Math.round(personalizedScore),
          personalizedFactors: {
            geneticCompatibility: Math.round(geneticCompatibility),
            lifestyleAlignment: Math.round(lifestyleAlignment),
            psychosocialFit: Math.round(psychosocialFit),
            economicFeasibility: Math.round(economicFeasibility),
            culturalAcceptability: Math.round(culturalAcceptability),
          },
          adaptiveFeatures: {
            dosageFlexibility: geneticCompatibility < 80,
            scheduleAdaptability: psychosocialFit > 80,
            homeBasedOptions: economicFeasibility < 70 || patientProfile.economicFactors.travelDistance > 30,
            telemedicineSupport: patientProfile.socialFactors.education !== "小学",
          },
          outcomesPrediction: {
            successProbability: Math.round(successProbability),
            timeToImprovement: this.predictTimeToImprovement(treatment, personalizedScore),
            qualityOfLifeImpact: Math.round(qualityOfLifeImpact),
            longTermPrognosis: this.generateLongTermPrognosis(successProbability, qualityOfLifeImpact),
          },
        }
      })
      .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
  }

  // 预测改善时间
  private static predictTimeToImprovement(treatment: TreatmentOption, personalizedScore: number): string {
    const baseTime = {
      药物治疗: 14,
      手术治疗: 7,
      物理治疗: 21,
      心理治疗: 28,
      生活方式干预: 42,
      联合治疗: 21,
    }

    const days = baseTime[treatment.type] || 21
    const adjustedDays = Math.round(days * (100 / personalizedScore))

    if (adjustedDays <= 7) return "1周内"
    if (adjustedDays <= 14) return "2周内"
    if (adjustedDays <= 30) return "1个月内"
    if (adjustedDays <= 60) return "2个月内"
    return "3个月内"
  }

  // 生成长期预后
  private static generateLongTermPrognosis(successProbability: number, qualityOfLifeImpact: number): string {
    const avgScore = (successProbability + qualityOfLifeImpact) / 2

    if (avgScore >= 80) return "预后优良，长期效果显著"
    if (avgScore >= 60) return "预后良好，需要定期随访"
    if (avgScore >= 40) return "预后一般，需要密切监测"
    return "预后需要谨慎评估，建议多学科会诊"
  }
}
