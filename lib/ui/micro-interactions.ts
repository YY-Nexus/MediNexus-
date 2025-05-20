export type InteractionType =
  | "click"
  | "hover"
  | "focus"
  | "success"
  | "error"
  | "loading"
  | "complete"
  | "notification"
  | "navigation"
  | "expansion"
  | "collapse"
  | "swipe"
  | "drag"
  | "drop"
  | "scroll"
  | "zoom"
  | "rotate"
  | "resize"
  | "custom"

export interface MicroInteraction {
  id: string
  type: InteractionType
  element: HTMLElement
  animation: (element: HTMLElement) => void
  cleanup: (element: HTMLElement) => void
  options?: {
    duration?: number
    delay?: number
    repeat?: number
    easing?: string
    threshold?: number
    onStart?: () => void
    onComplete?: () => void
  }
}

export class MicroInteractionManager {
  private static instance: MicroInteractionManager
  private interactions: Map<string, MicroInteraction> = new Map()
  private observers: Map<string, IntersectionObserver> = new Map()

  private constructor() {}

  // 单例模式
  public static getInstance(): MicroInteractionManager {
    if (!MicroInteractionManager.instance) {
      MicroInteractionManager.instance = new MicroInteractionManager()
    }
    return MicroInteractionManager.instance
  }

  // 注册微交互
  public register(interaction: MicroInteraction): void {
    this.interactions.set(interaction.id, interaction)

    // 如果是滚动触发的交互，设置IntersectionObserver
    if (interaction.type === "scroll") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const inter = this.interactions.get(interaction.id)
              if (inter) {
                inter.options?.onStart?.()
                inter.animation(inter.element)

                // 如果不重复，则取消观察
                if (!inter.options?.repeat) {
                  observer.unobserve(inter.element)
                }
              }
            } else {
              // 元素离开视口时清理
              const inter = this.interactions.get(interaction.id)
              if (inter && inter.options?.repeat) {
                inter.cleanup(inter.element)
              }
            }
          })
        },
        {
          threshold: interaction.options?.threshold || 0.1,
          rootMargin: "0px",
        },
      )

      observer.observe(interaction.element)
      this.observers.set(interaction.id, observer)
    }
  }

  // 触发微交互
  public trigger(id: string): void {
    const interaction = this.interactions.get(id)
    if (interaction) {
      interaction.options?.onStart?.()
      interaction.animation(interaction.element)

      if (interaction.options?.duration) {
        setTimeout(() => {
          interaction.cleanup(interaction.element)
          interaction.options?.onComplete?.()
        }, interaction.options.duration)
      }
    }
  }

  // 移除微交互
  public unregister(id: string): void {
    const interaction = this.interactions.get(id)
    if (interaction) {
      // 清理动画
      interaction.cleanup(interaction.element)

      // 如果有观察器，取消观察
      const observer = this.observers.get(id)
      if (observer) {
        observer.unobserve(interaction.element)
        this.observers.delete(id)
      }

      this.interactions.delete(id)
    }
  }

  // 清理所有微交互
  public cleanup(): void {
    this.interactions.forEach((interaction) => {
      interaction.cleanup(interaction.element)
    })

    this.observers.forEach((observer) => {
      observer.disconnect()
    })

    this.interactions.clear()
    this.observers.clear()
  }
}

// 创建微交互管理器实例
export const microInteractionManager = MicroInteractionManager.getInstance()
