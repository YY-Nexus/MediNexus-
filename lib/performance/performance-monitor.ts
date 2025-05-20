export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private measures: Record<string, number[]> = {}
  private marks: Record<string, number> = {}
  private enabled = false

  private constructor() {}

  // 单例模式
  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // 启用性能监控
  public enable(): void {
    this.enabled = true
  }

  // 禁用性能监控
  public disable(): void {
    this.enabled = false
  }

  // 设置性能标记
  public mark(name: string): void {
    if (!this.enabled) return
    this.marks[name] = performance.now()
  }

  // 测量两个标记之间的性能
  public measure(name: string, startMark: string, endMark?: string): void {
    if (!this.enabled) return

    const start = this.marks[startMark]
    if (!start) {
      console.warn(`Start mark "${startMark}" not found`)
      return
    }

    const end = endMark ? this.marks[endMark] : performance.now()
    if (endMark && !end) {
      console.warn(`End mark "${endMark}" not found`)
      return
    }

    const duration = end - start
    if (!this.measures[name]) {
      this.measures[name] = []
    }
    this.measures[name].push(duration)

    // 如果在开发环境，输出到控制台
    if (process.env.NODE_ENV === "development") {
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`)
    }
  }

  // 获取测量结果
  public getMeasure(name: string): { avg: number; min: number; max: number; count: number } | null {
    const measurements = this.measures[name]
    if (!measurements || measurements.length === 0) {
      return null
    }

    const sum = measurements.reduce((acc, val) => acc + val, 0)
    return {
      avg: sum / measurements.length,
      min: Math.min(...measurements),
      max: Math.max(...measurements),
      count: measurements.length,
    }
  }

  // 获取所有测量结果
  public getAllMeasures(): Record<string, { avg: number; min: number; max: number; count: number }> {
    const result: Record<string, { avg: number; min: number; max: number; count: number }> = {}

    Object.keys(this.measures).forEach((name) => {
      const measure = this.getMeasure(name)
      if (measure) {
        result[name] = measure
      }
    })

    return result
  }

  // 清除所有测量
  public clearMeasures(): void {
    this.measures = {}
  }

  // 清除所有标记
  public clearMarks(): void {
    this.marks = {}
  }

  // 清除所有数据
  public clear(): void {
    this.clearMarks()
    this.clearMeasures()
  }
}

// 创建性能监控实例
export const performanceMonitor = PerformanceMonitor.getInstance()

// 在开发环境中自动启用
if (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_SHOW_PERFORMANCE_MONITOR === "true") {
  performanceMonitor.enable()
}
