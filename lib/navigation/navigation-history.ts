export interface NavigationHistoryEntry {
  path: string
  title: string
  timestamp: number
  params?: Record<string, string>
  state?: any
}

export class NavigationHistoryManager {
  private static instance: NavigationHistoryManager
  private history: NavigationHistoryEntry[] = []
  private currentIndex = -1
  private maxSize = 50
  private listeners: Set<(history: NavigationHistoryEntry[], currentIndex: number) => void> = new Set()

  private constructor() {
    // 在客户端初始化时从本地存储加载历史记录
    if (typeof window !== "undefined") {
      try {
        const savedHistory = localStorage.getItem("navigation_history")
        const savedIndex = localStorage.getItem("navigation_history_index")

        if (savedHistory) {
          this.history = JSON.parse(savedHistory)
        }

        if (savedIndex) {
          this.currentIndex = Number.parseInt(savedIndex, 10)
        }
      } catch (error) {
        console.error("Error loading navigation history:", error)
      }
    }
  }

  // 单例模式
  public static getInstance(): NavigationHistoryManager {
    if (!NavigationHistoryManager.instance) {
      NavigationHistoryManager.instance = new NavigationHistoryManager()
    }
    return NavigationHistoryManager.instance
  }

  // 添加历史记录
  public add(entry: Omit<NavigationHistoryEntry, "timestamp">): void {
    // 如果当前不是最后一个，则删除后面的历史记录
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1)
    }

    // 添加新记录
    this.history.push({
      ...entry,
      timestamp: Date.now(),
    })

    // 如果超过最大大小，删除最旧的记录
    if (this.history.length > this.maxSize) {
      this.history.shift()
    }

    // 更新当前索引
    this.currentIndex = this.history.length - 1

    // 保存到本地存储
    this.saveToLocalStorage()

    // 通知监听器
    this.notifyListeners()
  }

  // 获取当前历史记录
  public getCurrent(): NavigationHistoryEntry | null {
    if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
      return this.history[this.currentIndex]
    }
    return null
  }

  // 获取所有历史记录
  public getAll(): NavigationHistoryEntry[] {
    return [...this.history]
  }

  // 获取最近的历史记录
  public getRecent(count = 10): NavigationHistoryEntry[] {
    return this.history.slice(-count).reverse()
  }

  // 后退
  public back(): NavigationHistoryEntry | null {
    if (this.currentIndex > 0) {
      this.currentIndex--
      this.saveToLocalStorage()
      this.notifyListeners()
      return this.history[this.currentIndex]
    }
    return null
  }

  // 前进
  public forward(): NavigationHistoryEntry | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++
      this.saveToLocalStorage()
      this.notifyListeners()
      return this.history[this.currentIndex]
    }
    return null
  }

  // 跳转到特定索引
  public goTo(index: number): NavigationHistoryEntry | null {
    if (index >= 0 && index < this.history.length) {
      this.currentIndex = index
      this.saveToLocalStorage()
      this.notifyListeners()
      return this.history[this.currentIndex]
    }
    return null
  }

  // 清除历史记录
  public clear(): void {
    this.history = []
    this.currentIndex = -1
    this.saveToLocalStorage()
    this.notifyListeners()
  }

  // 添加监听器
  public addListener(listener: (history: NavigationHistoryEntry[], currentIndex: number) => void): () => void {
    this.listeners.add(listener)

    // 返回取消监听的函数
    return () => {
      this.listeners.delete(listener)
    }
  }

  // 保存到本地存储
  private saveToLocalStorage(): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("navigation_history", JSON.stringify(this.history))
        localStorage.setItem("navigation_history_index", String(this.currentIndex))
      } catch (error) {
        console.error("Error saving navigation history:", error)
      }
    }
  }

  // 通知监听器
  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      listener(this.history, this.currentIndex)
    })
  }
}

// 创建导航历史管理器实例
export const navigationHistoryManager = NavigationHistoryManager.getInstance()
