export interface UserPreference {
  userId: string
  features: Record<string, number>
  lastUpdated: number
}

export interface RecommendationItem {
  id: string
  type: string
  title: string
  description: string
  features: Record<string, number>
  url: string
  imageUrl?: string
  priority?: number
  tags?: string[]
  metadata?: Record<string, any>
}

export class RecommendationService {
  private static instance: RecommendationService
  private userPreferences: Map<string, UserPreference> = new Map()
  private items: RecommendationItem[] = []

  private constructor() {
    // 初始化时从本地存储加载用户偏好
    if (typeof window !== "undefined") {
      try {
        const savedPreferences = localStorage.getItem("user_preferences")
        if (savedPreferences) {
          const preferences = JSON.parse(savedPreferences) as UserPreference[]
          preferences.forEach((pref) => {
            this.userPreferences.set(pref.userId, pref)
          })
        }
      } catch (error) {
        console.error("Error loading user preferences:", error)
      }
    }
  }

  // 单例模式
  public static getInstance(): RecommendationService {
    if (!RecommendationService.instance) {
      RecommendationService.instance = new RecommendationService()
    }
    return RecommendationService.instance
  }

  // 设置可推荐项目
  public setItems(items: RecommendationItem[]): void {
    this.items = items
  }

  // 添加可推荐项目
  public addItem(item: RecommendationItem): void {
    const existingIndex = this.items.findIndex((i) => i.id === item.id)
    if (existingIndex >= 0) {
      this.items[existingIndex] = item
    } else {
      this.items.push(item)
    }
  }

  // 记录用户行为
  public recordUserAction(userId: string, itemId: string, actionType: string, weight = 1): void {
    // 获取项目
    const item = this.items.find((i) => i.id === itemId)
    if (!item) return

    // 获取或创建用户偏好
    let preference = this.userPreferences.get(userId)
    if (!preference) {
      preference = {
        userId,
        features: {},
        lastUpdated: Date.now(),
      }
    }

    // 更新用户偏好
    Object.entries(item.features).forEach(([feature, value]) => {
      const currentValue = preference!.features[feature] || 0
      preference!.features[feature] = currentValue + value * weight
    })

    // 如果有标签，也将其作为特征
    if (item.tags) {
      item.tags.forEach((tag) => {
        const featureKey = `tag:${tag}`
        const currentValue = preference!.features[featureKey] || 0
        preference!.features[featureKey] = currentValue + weight
      })
    }

    // 更新时间戳
    preference.lastUpdated = Date.now()

    // 保存用户偏好
    this.userPreferences.set(userId, preference)
    this.savePreferences()
  }

  // 获取推荐
  public getRecommendations(userId: string, count = 5, types?: string[]): RecommendationItem[] {
    const preference = this.userPreferences.get(userId)
    if (!preference) {
      // 如果没有用户偏好，返回默认推荐
      return this.getDefaultRecommendations(count, types)
    }

    // 过滤项目类型
    let filteredItems = this.items
    if (types && types.length > 0) {
      filteredItems = this.items.filter((item) => types.includes(item.type))
    }

    // 计算每个项目的相似度得分
    const scoredItems = filteredItems.map((item) => {
      let score = 0

      // 计算特征相似度
      Object.entries(item.features).forEach(([feature, value]) => {
        const userValue = preference.features[feature] || 0
        score += userValue * value
      })

      // 考虑标签
      if (item.tags) {
        item.tags.forEach((tag) => {
          const featureKey = `tag:${tag}`
          const userValue = preference.features[featureKey] || 0
          score += userValue
        })
      }

      // 考虑优先级
      if (item.priority) {
        score *= item.priority
      }

      return { item, score }
    })

    // 按得分排序并返回前N个
    return scoredItems
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map((scored) => scored.item)
  }

  // 获取默认推荐
  private getDefaultRecommendations(count = 5, types?: string[]): RecommendationItem[] {
    let filteredItems = this.items
    if (types && types.length > 0) {
      filteredItems = this.items.filter((item) => types.includes(item.type))
    }

    // 随机排序并返回前N个
    return filteredItems.sort(() => Math.random() - 0.5).slice(0, count)
  }

  // 保存用户偏好到本地存储
  private savePreferences(): void {
    if (typeof window !== "undefined") {
      try {
        const preferences = Array.from(this.userPreferences.values())
        localStorage.setItem("user_preferences", JSON.stringify(preferences))
      } catch (error) {
        console.error("Error saving user preferences:", error)
      }
    }
  }
}

// 创建并导出 recommendationService 实例
export const recommendationService = RecommendationService.getInstance()
