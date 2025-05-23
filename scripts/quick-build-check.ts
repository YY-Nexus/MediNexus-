// 快速构建检查脚本
console.log("🔍 快速构建检查开始...\n")

// 1. 检查性能监控服务文件
console.log("📁 检查 services/performance-monitoring-service.ts...")
try {
  const fs = require("fs")
  const path = require("path")

  const filePath = path.join(process.cwd(), "services/performance-monitoring-service.ts")

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8")

    // 检查是否包含修复的代码
    const hasReactImport = content.includes('import React from "react"')
    const hasCreateElement = content.includes("React.createElement")
    const hasProperHOC = content.includes("PerformanceTrackedComponent")

    if (hasReactImport && hasCreateElement && hasProperHOC) {
      console.log("✅ 性能监控服务文件语法已修复")
    } else {
      console.log("❌ 性能监控服务文件仍有问题")
      console.log(`  React 导入: ${hasReactImport ? "✅" : "❌"}`)
      console.log(`  createElement 使用: ${hasCreateElement ? "✅" : "❌"}`)
      console.log(`  HOC 实现: ${hasProperHOC ? "✅" : "❌"}`)
    }
  } else {
    console.log("❌ 性能监控服务文件不存在")
  }
} catch (error) {
  console.log("❌ 检查性能监控服务文件时出错:", error.message)
}

// 2. 检查 Next.js 配置
console.log("\n📁 检查 next.config.mjs...")
try {
  const fs = require("fs")
  const path = require("path")

  const configPath = path.join(process.cwd(), "next.config.mjs")

  if (fs.existsSync(configPath)) {
    const content = fs.readFileSync(configPath, "utf-8")

    // 检查是否移除了废弃的配置
    const hasAppDir = content.includes("appDir")
    const hasExportDefault = content.includes("export default")
    const hasWebpackConfig = content.includes("webpack:")

    if (!hasAppDir && hasExportDefault) {
      console.log("✅ Next.js 配置已修复")
      console.log(`  移除 appDir: ${!hasAppDir ? "✅" : "❌"}`)
      console.log(`  默认导出: ${hasExportDefault ? "✅" : "❌"}`)
      console.log(`  Webpack 配置: ${hasWebpackConfig ? "✅" : "⚠️ 可选"}`)
    } else {
      console.log("❌ Next.js 配置仍有问题")
      console.log(`  移除 appDir: ${!hasAppDir ? "✅" : "❌"}`)
      console.log(`  默认导出: ${hasExportDefault ? "✅" : "❌"}`)
    }
  } else {
    console.log("❌ Next.js 配置文件不存在")
  }
} catch (error) {
  console.log("❌ 检查 Next.js 配置时出错:", error.message)
}

// 3. 尝试 TypeScript 编译检查
console.log("\n🔧 运行 TypeScript 编译检查...")
try {
  const { execSync } = require("child_process")

  // 运行 TypeScript 编译检查（不生成文件）
  execSync("npx tsc --noEmit --skipLibCheck", {
    stdio: "pipe",
    timeout: 60000, // 1分钟超时
  })

  console.log("✅ TypeScript 编译检查通过")
} catch (error) {
  console.log("❌ TypeScript 编译检查失败")
  const errorOutput = error.stdout?.toString() || error.stderr?.toString()
  if (errorOutput) {
    console.log("错误详情:")
    console.log(errorOutput.split("\n").slice(0, 10).join("\n"))
  }
}

// 4. 尝试构建
console.log("\n🏗️ 尝试运行构建...")
try {
  const { execSync } = require("child_process")

  console.log("正在运行 npm run build...")
  const buildOutput = execSync("npm run build", {
    stdio: "pipe",
    timeout: 300000, // 5分钟超时
  }).toString()

  console.log("✅ 构建成功完成!")

  // 显示构建摘要
  const lines = buildOutput.split("\n")
  const summaryLines = lines.filter(
    (line) => line.includes("✓") || line.includes("⚠") || line.includes("Size") || line.includes("First Load JS"),
  )

  if (summaryLines.length > 0) {
    console.log("\n📊 构建摘要:")
    summaryLines.slice(0, 8).forEach((line) => {
      console.log(`  ${line.trim()}`)
    })
  }
} catch (error) {
  console.log("❌ 构建失败")
  const errorOutput = error.stdout?.toString() || error.stderr?.toString()
  if (errorOutput) {
    console.log("\n错误详情:")
    // 显示关键错误信息
    const errorLines = errorOutput.split("\n")
    const importantErrors = errorLines.filter(
      (line) =>
        line.includes("Error:") ||
        line.includes("Failed to compile") ||
        line.includes("Syntax Error") ||
        line.includes("Type error"),
    )

    if (importantErrors.length > 0) {
      importantErrors.slice(0, 5).forEach((line) => {
        console.log(`  ${line.trim()}`)
      })
    } else {
      // 如果没有找到特定错误，显示前几行
      errorLines.slice(0, 10).forEach((line) => {
        if (line.trim()) {
          console.log(`  ${line.trim()}`)
        }
      })
    }
  }
}

console.log("\n" + "=".repeat(50))
console.log("🎯 快速构建检查完成")
console.log("=".repeat(50))
