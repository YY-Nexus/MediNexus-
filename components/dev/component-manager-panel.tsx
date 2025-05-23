"use client"

import { useState, useEffect } from "react"
import { ComponentManager } from "../error-boundary/safe-component"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Settings, X, RefreshCw, Eye } from "lucide-react"

export function ComponentManagerPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [components, setComponents] = useState<Array<{ name: string; priority: number; enabled: boolean }>>([])
  const [filter, setFilter] = useState("")

  // 加载组件列表
  useEffect(() => {
    const updateComponentList = () => {
      const allComponents = ComponentManager.getAllComponentsWithPriority()
      setComponents(allComponents)
    }

    updateComponentList()

    // 每秒更新一次组件列表
    const interval = setInterval(updateComponentList, 1000)
    return () => clearInterval(interval)
  }, [])

  // 过滤组件
  const filteredComponents = components.filter((comp) => comp.name.toLowerCase().includes(filter.toLowerCase()))

  // 按优先级排序
  const sortedComponents = [...filteredComponents].sort((a, b) => a.priority - b.priority)

  // 切换组件启用状态
  const toggleComponent = (name: string, enabled: boolean) => {
    if (enabled) {
      ComponentManager.enableComponent(name)
    } else {
      ComponentManager.disableComponent(name)
    }

    // 更新组件列表
    setComponents(ComponentManager.getAllComponentsWithPriority())
  }

  // 重置所有组件
  const resetAllComponents = () => {
    ComponentManager.resetAllComponents()
    setComponents(ComponentManager.getAllComponentsWithPriority())
  }

  // 启用所有组件
  const enableAllComponents = () => {
    components.forEach((comp) => {
      ComponentManager.enableComponent(comp.name)
    })
    setComponents(ComponentManager.getAllComponentsWithPriority())
  }

  // 按优先级启用组件
  const enableByPriority = (maxPriority: number) => {
    ComponentManager.resetAllComponents()
    ComponentManager.enableComponentsByPriority(maxPriority)
    setComponents(ComponentManager.getAllComponentsWithPriority())
  }

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 bg-white shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <Settings className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[80vh] flex flex-col">
      <div className="p-3 border-b flex items-center justify-between">
        <h3 className="font-medium text-sm">组件管理器</h3>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-3 border-b">
        <div className="flex gap-2 mb-2">
          <Button size="sm" variant="outline" onClick={resetAllComponents} className="flex-1">
            <RefreshCw className="mr-1 h-3 w-3" />
            重置
          </Button>
          <Button size="sm" variant="outline" onClick={enableAllComponents} className="flex-1">
            <Eye className="mr-1 h-3 w-3" />
            全部启用
          </Button>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => enableByPriority(10)} className="flex-1">
            核心组件
          </Button>
          <Button size="sm" variant="outline" onClick={() => enableByPriority(50)} className="flex-1">
            重要组件
          </Button>
          <Button size="sm" variant="outline" onClick={() => enableByPriority(100)} className="flex-1">
            次要组件
          </Button>
        </div>
      </div>

      <div className="p-3 border-b">
        <Input
          placeholder="搜索组件..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-xs"
        />
      </div>

      <div className="overflow-y-auto flex-1 p-1">
        {sortedComponents.length === 0 ? (
          <p className="text-center text-gray-500 text-xs p-4">暂无组件</p>
        ) : (
          sortedComponents.map((comp) => (
            <div key={comp.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate" title={comp.name}>
                  {comp.name}
                </p>
                <p className="text-xs text-gray-500">优先级: {comp.priority}</p>
              </div>
              <Switch checked={comp.enabled} onCheckedChange={(checked) => toggleComponent(comp.name, checked)} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
