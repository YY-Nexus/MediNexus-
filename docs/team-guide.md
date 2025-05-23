# YanYu MediNexus³-Admin 团队开发指南

## 目录

1. [开发环境设置](#开发环境设置)
2. [代码质量工具](#代码质量工具)
3. [TypeScript 最佳实践](#typescript-最佳实践)
4. [组件开发指南](#组件开发指南)
5. [状态管理](#状态管理)
6. [测试策略](#测试策略)
7. [Git 工作流](#git-工作流)
8. [部署流程](#部署流程)
9. [常见问题解答](#常见问题解答)

## 开发环境设置

### 必要软件

- Node.js (v18+)
- npm (v8+)
- Git
- VS Code (推荐)

### 项目设置

\`\`\`bash
# 克隆仓库
git clone [仓库URL]

# 安装依赖
npm install

# 启动开发服务器
npm run dev
\`\`\`

### VS Code 扩展

我们的 `.vscode/extensions.json` 文件中已经包含了推荐的扩展列表。在 VS Code 中打开项目后，您应该会收到安装这些扩展的提示。

主要扩展包括：
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript 支持

## 代码质量工具

### ESLint

我们使用 ESLint 进行代码质量检查。配置文件位于 `.eslintrc.js`。

常用命令：
\`\`\`bash
# 运行 lint 检查
npm run lint

# 自动修复 lint 问题
npm run lint:fix
\`\`\`

### Prettier

我们使用 Prettier 进行代码格式化。配置文件位于 `.prettierrc`。

常用命令：
\`\`\`bash
# 格式化所有文件
npm run format

# 检查文件格式是否正确
npm run format:check
\`\`\`

### TypeScript

我们使用 TypeScript 的严格模式进行类型检查。配置文件位于 `tsconfig.json`。

常用命令：
\`\`\`bash
# 运行类型检查
npm run type-check
\`\`\`

### 提交前检查

我们使用 husky 和 lint-staged 在提交代码前自动运行检查。这确保了只有符合质量标准的代码才能被提交。

## TypeScript 最佳实践

### 类型定义

- 使用专门的 `.d.ts` 文件定义复杂类型
- 为所有函数添加返回类型
- 避免使用 `any` 类型
- 使用接口而不是类型别名定义对象结构

### 泛型使用

- 为复杂泛型使用有意义的名称（如 `TUser` 而不是 `T`）
- 使用约束限制泛型类型（如 `<T extends object>`）
- 为泛型参数提供默认值

### 类型安全

- 使用类型守卫进行运行时类型检查
- 使用可辨识联合类型处理复杂状态
- 使用 `unknown` 而不是 `any` 处理未知类型

## 组件开发指南

### 组件结构

- 使用函数组件和 Hooks
- 使用 TypeScript 接口定义 Props
- 为组件添加 JSDoc 注释
- 使用 `React.memo` 优化渲染性能

### 样式指南

- 使用 Tailwind CSS 进行样式设计
- 遵循我们的设计系统
- 使用响应式设计原则
- 确保组件的可访问性

### 状态管理

- 使用 React Context 进行全局状态管理
- 使用 React Query 进行服务器状态管理
- 使用 Zustand 进行复杂状态管理

## 测试策略

### 单元测试

我们使用 Jest 和 React Testing Library 进行单元测试。

\`\`\`bash
# 运行所有测试
npm test

# 运行测试并监视文件变化
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage
\`\`\`

### 测试最佳实践

- 测试组件的行为而不是实现细节
- 使用 `screen.getByRole` 等查询方法
- 模拟 API 请求和外部依赖
- 为每个组件编写至少一个测试

## Git 工作流

### 分支策略

- `main`: 生产环境代码
- `develop`: 开发环境代码
- 功能分支: `feature/[功能名称]`
- 修复分支: `bugfix/[问题描述]`

### 提交消息格式

\`\`\`
[类型]: [简短描述]

[详细描述]
\`\`\`

类型包括：
- `feat`: 新功能
- `fix`: 错误修复
- `docs`: 文档更改
- `style`: 不影响代码含义的更改（空格、格式等）
- `refactor`: 既不修复错误也不添加功能的代码更改
- `perf`: 提高性能的代码更改
- `test`: 添加或修正测试
- `chore`: 对构建过程或辅助工具的更改

### 代码审查

所有代码必须通过代码审查才能合并到 `develop` 或 `main` 分支。

## 部署流程

我们使用 GitHub Actions 进行 CI/CD。配置文件位于 `.github/workflows/ci.yml`。

部署流程：
1. 代码推送到 GitHub
2. GitHub Actions 运行验证、构建和测试
3. 如果所有检查通过，代码会被自动部署到相应环境

## 常见问题解答

### Q: 如何解决类型错误？

A: 首先，确保您理解错误消息。TypeScript 错误通常会指出问题所在。如果您不确定如何修复，可以查阅 TypeScript 文档或向团队成员寻求帮助。

### Q: 如何处理 ESLint 警告？

A: ESLint 警告通常可以通过 `npm run lint:fix` 自动修复。对于无法自动修复的警告，请查看 ESLint 规则文档了解如何手动修复。

### Q: 如何添加新的依赖？

A: 使用 `npm install [包名]` 添加依赖。对于开发依赖，使用 `npm install --save-dev [包名]`。添加依赖后，请确保应用仍然可以正常构建和运行。

### Q: 如何处理合并冲突？

A: 合并冲突通常发生在多人修改同一文件时。解决冲突的步骤：
1. 运行 `git status` 查看冲突文件
2. 打开冲突文件，查找 `<<<<<<<`, `=======`, `>>>>>>>` 标记
3. 编辑文件解决冲突
4. 运行 `git add [文件名]` 标记冲突已解决
5. 运行 `git commit` 完成合并

### Q: 如何调试测试失败？

A: 使用 `npm run test:watch` 运行测试并监视文件变化。这将显示详细的错误信息。您还可以在测试文件中添加 `console.log` 语句或使用 VS Code 的调试功能。
