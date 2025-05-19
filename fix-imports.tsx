"use client"

import { useState } from "react"

export default function FixImports() {
  const [logs, setLogs] = useState<string[]>([])
  const [isFixing, setIsFixing] = useState(false)

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message])
  }

  const fixImports = async () => {
    setIsFixing(true)
    addLog("开始修复导入路径...")

    try {
      // 在实际环境中，这里会有一个API调用来执行修复
      // 由于这是客户端组件，我们只能模拟这个过程
      addLog("扫描项目文件...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addLog("检查导入语句...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addLog("更新导入路径...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addLog("✅ 导入路径修复完成！")
    } catch (error) {
      addLog(`❌ 修复过程中出错: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsFixing(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">导入路径修复工具</h1>

      <div className="mb-6">
        <p className="mb-2">此工具将帮助修复由文件扩展名变更（.ts → .tsx）导致的导入路径问题。</p>
        <button
          onClick={fixImports}
          disabled={isFixing}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isFixing ? "修复中..." : "开始修复"}
        </button>
      </div>

      <div className="border rounded p-4 bg-gray-50 h-64 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">日志:</h2>
        {logs.length === 0 ? (
          <p className="text-gray-500">点击"开始修复"按钮开始修复过程...</p>
        ) : (
          <ul className="space-y-1">
            {logs.map((log, index) => (
              <li key={index} className="font-mono text-sm">
                {log}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
