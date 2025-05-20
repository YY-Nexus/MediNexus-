"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { LazyComponent } from "@/lib/performance/lazy-component"
import { performanceMonitor } from "@/lib/performance/performance-monitor"
import { useOptimizedRender } from "@/hooks/use-optimized-render"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { BarChart, LineChart, PieChart } from "lucide-react"

// 模拟大数据生成
const generateLargeDataset = (size: number) => {
  return Array.from({ length: size }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    value: Math.floor(Math.random() * 1000),
    category: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }))
}

// 重型组件（将被懒加载）
const HeavyComponent = ({ itemCount = 100 }: { itemCount: number }) => {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    performanceMonitor.mark("heavy_component_start")

    // 模拟耗时操作
    const timer = setTimeout(() => {
      setItems(generateLargeDataset(itemCount))
      performanceMonitor.mark("heavy_component_end")
      performanceMonitor.measure("heavy_component_render_time", "heavy_component_start", "heavy_component_end")
    }, 500)

    return () => clearTimeout(timer)
  }, [itemCount])

  return (
    <div className="border rounded-md p-4 max-h-60 overflow-auto">
      <h3 className="text-lg font-medium mb-2">已加载 {items.length} 个项目</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between p-2 bg-muted/50 rounded-md">
            <span>{item.name}</span>
            <span>类别: {item.category}</span>
            <span>值: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 性能指标组件
const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<Record<string, any>>({})

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(performanceMonitor.getAllMeasures())
    }

    // 每秒更新一次指标
    const interval = setInterval(updateMetrics, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">性能指标</h3>
      {Object.keys(metrics).length === 0 ? (
        <p className="text-muted-foreground">尚无性能数据。尝试使用上面的功能来生成性能指标。</p>
      ) : (
        <div className="space-y-2">
          {Object.entries(metrics).map(([name, data]) => (
            <div key={name} className="p-2 bg-muted/50 rounded-md">
              <div className="flex justify-between">
                <span className="font-medium">{name}</span>
                <span>平均: {data.avg.toFixed(2)}ms</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>最小: {data.min.toFixed(2)}ms</span>
                <span>最大: {data.max.toFixed(2)}ms</span>
                <span>次数: {data.count}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function PerformanceDemo() {
  const [itemCount, setItemCount] = useState(100)
  const [loadHeavyComponent, setLoadHeavyComponent] = useState(false)
  const [renderCount, setRenderCount] = useState(0)
  const [dataSize, setDataSize] = useState(1000)
  const [debounceTime, setDebounceTime] = useState(300)

  // 生成大数据集
  const generateData = useCallback(() => {
    performanceMonitor.mark("data_generation_start")
    const data = generateLargeDataset(dataSize)
    performanceMonitor.mark("data_generation_end")
    performanceMonitor.measure("data_generation_time", "data_generation_start", "data_generation_end")
    return data
  }, [dataSize])

  // 使用useMemo缓存数据
  const largeData = useMemo(() => generateData(), [generateData])

  // 使用优化渲染钩子
  const optimizedData = useOptimizedRender(largeData, {
    name: "large_data_render",
    debounceMs: debounceTime,
    enabled: true,
  })

  // 模拟组件重渲染
  useEffect(() => {
    const interval = setInterval(() => {
      setRenderCount((prev) => prev + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // 启用性能监控
  useEffect(() => {
    performanceMonitor.enable()

    return () => {
      performanceMonitor.disable()
    }
  }, [])

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>组件级代码分割</CardTitle>
          <CardDescription>演示使用LazyComponent进行组件级代码分割</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item-count">项目数量</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="item-count"
                min={10}
                max={500}
                step={10}
                value={[itemCount]}
                onValueChange={(value) => setItemCount(value[0])}
              />
              <span className="w-12 text-center">{itemCount}</span>
            </div>
          </div>

          <Button
            onClick={() => setLoadHeavyComponent(!loadHeavyComponent)}
            variant={loadHeavyComponent ? "destructive" : "default"}
          >
            {loadHeavyComponent ? "卸载重型组件" : "加载重型组件"}
          </Button>

          {loadHeavyComponent && (
            <LazyComponent
              component={() => Promise.resolve({ default: HeavyComponent })}
              props={{ itemCount }}
              fallback={
                <div className="flex items-center justify-center p-12">
                  <LoadingSpinner />
                </div>
              }
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>优化渲染性能</CardTitle>
          <CardDescription>演示使用useOptimizedRender钩子优化渲染性能</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="data-size">数据大小</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="data-size"
                    min={100}
                    max={5000}
                    step={100}
                    value={[dataSize]}
                    onValueChange={(value) => setDataSize(value[0])}
                  />
                  <span className="w-16 text-center">{dataSize}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="debounce-time">防抖时间 (ms)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="debounce-time"
                    min={0}
                    max={1000}
                    step={50}
                    value={[debounceTime]}
                    onValueChange={(value) => setDebounceTime(value[0])}
                  />
                  <span className="w-16 text-center">{debounceTime}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">渲染统计</h3>
              <div className="p-4 bg-muted/50 rounded-md">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">组件渲染次数:</p>
                    <p className="text-2xl font-bold">{renderCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">数据项数量:</p>
                    <p className="text-2xl font-bold">{optimizedData.length}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1 gap-2">
                  <BarChart className="h-4 w-4" />
                  柱状图
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <LineChart className="h-4 w-4" />
                  折线图
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <PieChart className="h-4 w-4" />
                  饼图
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>性能监控</CardTitle>
          <CardDescription>使用performanceMonitor跟踪关键性能指标</CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceMetrics />
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => performanceMonitor.clear()}>
            清除性能数据
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
