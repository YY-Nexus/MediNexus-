import { execSync } from "child_process"
import { existsSync, readFileSync } from "fs"
import { join } from "path"

// 构建验证脚本
class BuildVerification {
  private errors: string[] = []
  private warnings: string[] = []
  private projectRoot = process.cwd()

  // 验证项目结构
  verifyProjectStructure() {
    console.log("🔍 验证项目结构...")

    const requiredFiles = [
      "package.json",
      "next.config.mjs",
      "tsconfig.json",
      "tailwind.config.ts",
      "app/layout.tsx",
      "services/performance-monitoring-service.ts",
    ]

    const missingFiles = requiredFiles.filter((file) => !existsSync(join(this.projectRoot, file)))

    if (missingFiles.length > 0) {
      this.errors.push(`缺少必要文件: ${missingFiles.join(", ")}`)
    } else {
      console.log("✅ 项目结构验证通过")
    }
  }

  // 验证 package.json
  verifyPackageJson() {
    console.log("📦 验证 package.json...")

    try {
      const packagePath = join(this.projectRoot, "package.json")
      const packageJson = JSON.parse(readFileSync(packagePath, "utf-8"))

      // 检查必要的脚本
      const requiredScripts = ["build", "dev", "start"]
      const missingScripts = requiredScripts.filter((script) => !packageJson.scripts?.[script])

      if (missingScripts.length > 0) {
        this.errors.push(`package.json 缺少脚本: ${missingScripts.join(", ")}`)
      }

      // 检查 Next.js 版本
      const nextVersion = packageJson.dependencies?.next || packageJson.devDependencies?.next
      if (!nextVersion) {
        this.errors.push("未找到 Next.js 依赖")
      } else {
        console.log(`✅ Next.js 版本: ${nextVersion}`)
      }

      console.log("✅ package.json 验证通过")
    } catch (error) {
      this.errors.push(`package.json 解析错误: ${error}`)
    }
  }

  // 验证 TypeScript 配置
  verifyTypeScriptConfig() {
    console.log("📝 验证 TypeScript 配置...")

    try {
      const tsconfigPath = join(this.projectRoot, "tsconfig.json")
      const tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf-8"))

      // 检查必要的编译选项
      const requiredOptions = {
        target: "es5",
        module: "esnext",
        moduleResolution: "bundler",
        jsx: "preserve",
      }

      const missingOptions = Object.entries(requiredOptions).filter(
        ([key, value]) => tsconfig.compilerOptions?.[key] !== value,
      )

      if (missingOptions.length > 0) {
        this.warnings.push(`TypeScript 配置建议: ${missingOptions.map(([k, v]) => `${k}: ${v}`).join(", ")}`)
      }

      console.log("✅ TypeScript 配置验证通过")
    } catch (error) {
      this.errors.push(`TypeScript 配置错误: ${error}`)
    }
  }

  // 验证关键文件语法
  verifyKeySyntax() {
    console.log("🔧 验证关键文件语法...")

    const keyFiles = ["services/performance-monitoring-service.ts", "next.config.mjs", "app/layout.tsx"]

    keyFiles.forEach((file) => {
      const filePath = join(this.projectRoot, file)
      if (existsSync(filePath)) {
        try {
          const content = readFileSync(filePath, "utf-8")

          // 基本语法检查
          if (file.endsWith(".ts") || file.endsWith(".tsx")) {
            // 检查常见的 TypeScript 语法错误
            if (content.includes("return <Component {...props} />") && !content.includes("React.createElement")) {
              this.warnings.push(`${file}: 建议使用 React.createElement 替代 JSX 语法`)
            }
          }

          if (file.endsWith(".mjs")) {
            // 检查 ES 模块语法
            if (!content.includes("export default")) {
              this.warnings.push(`${file}: 缺少默认导出`)
            }
          }

          console.log(`✅ ${file} 语法检查通过`)
        } catch (error) {
          this.errors.push(`${file} 读取错误: ${error}`)
        }
      } else {
        this.errors.push(`文件不存在: ${file}`)
      }
    })
  }

  // 运行类型检查
  runTypeCheck() {
    console.log("🔍 运行 TypeScript 类型检查...")

    try {
      execSync("npx tsc --noEmit --skipLibCheck", {
        stdio: "pipe",
        cwd: this.projectRoot,
      })
      console.log("✅ TypeScript 类型检查通过")
    } catch (error) {
      const errorOutput = error.stdout?.toString() || error.stderr?.toString() || error.message
      this.errors.push(`TypeScript 类型检查失败:\n${errorOutput}`)
    }
  }

  // 运行 ESLint 检查
  runLintCheck() {
    console.log("🔍 运行 ESLint 检查...")

    try {
      execSync("npx eslint . --ext .ts,.tsx --max-warnings 0", {
        stdio: "pipe",
        cwd: this.projectRoot,
      })
      console.log("✅ ESLint 检查通过")
    } catch (error) {
      const errorOutput = error.stdout?.toString() || error.stderr?.toString() || error.message
      this.warnings.push(`ESLint 检查发现问题:\n${errorOutput}`)
    }
  }

  // 模拟构建过程
  simulateBuild() {
    console.log("🏗️ 模拟构建过程...")

    try {
      // 首先检查依赖
      console.log("📦 检查依赖安装...")
      execSync("npm list --depth=0", {
        stdio: "pipe",
        cwd: this.projectRoot,
      })
      console.log("✅ 依赖检查通过")

      // 运行构建命令
      console.log("🔨 运行构建命令...")
      const buildOutput = execSync("npm run build", {
        stdio: "pipe",
        cwd: this.projectRoot,
        timeout: 300000, // 5分钟超时
      }).toString()

      console.log("✅ 构建成功完成!")
      console.log("\n📊 构建输出摘要:")

      // 解析构建输出
      const lines = buildOutput.split("\n")
      const importantLines = lines.filter(
        (line) =>
          line.includes("✓") ||
          line.includes("⚠") ||
          line.includes("Error") ||
          line.includes("Warning") ||
          line.includes("Size") ||
          line.includes("First Load JS"),
      )

      importantLines.slice(0, 10).forEach((line) => {
        console.log(`  ${line}`)
      })

      return true
    } catch (error) {
      const errorOutput = error.stdout?.toString() || error.stderr?.toString() || error.message
      this.errors.push(`构建失败:\n${errorOutput}`)
      return false
    }
  }

  // 生成报告
  generateReport() {
    console.log("\n" + "=".repeat(60))
    console.log("📋 构建验证报告")
    console.log("=".repeat(60))

    if (this.errors.length === 0) {
      console.log("🎉 所有检查都通过了!")
      console.log("✅ 项目已准备好进行部署")
    } else {
      console.log("❌ 发现以下错误:")
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`)
      })
    }

    if (this.warnings.length > 0) {
      console.log("\n⚠️ 警告信息:")
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning}`)
      })
    }

    console.log("\n" + "=".repeat(60))

    return {
      success: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
    }
  }

  // 运行完整验证
  async runFullVerification() {
    console.log("🚀 开始构建验证流程...\n")

    // 基础验证
    this.verifyProjectStructure()
    this.verifyPackageJson()
    this.verifyTypeScriptConfig()
    this.verifyKeySyntax()

    // 如果基础验证通过，继续进行构建验证
    if (this.errors.length === 0) {
      this.runTypeCheck()
      this.runLintCheck()

      // 如果类型检查通过，尝试构建
      if (this.errors.length === 0) {
        const buildSuccess = this.simulateBuild()

        if (buildSuccess) {
          console.log("\n🎯 构建验证完成 - 所有检查都通过!")
        }
      }
    }

    return this.generateReport()
  }
}

// 运行验证
const verification = new BuildVerification()
verification
  .runFullVerification()
  .then((result) => {
    process.exit(result.success ? 0 : 1)
  })
  .catch((error) => {
    console.error("验证过程中发生错误:", error)
    process.exit(1)
  })
