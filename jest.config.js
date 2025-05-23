const nextJest = require("next/jest")

const createJestConfig = nextJest({
  // 指向 Next.js 应用的路径
  dir: "./",
})

// 自定义 Jest 配置
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // 处理模块别名
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!jest.config.js",
    "!next.config.js",
    "!postcss.config.js",
    "!tailwind.config.js",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

// createJestConfig 会自动处理一些配置，如 transform 和 moduleFileExtensions
module.exports = createJestConfig(customJestConfig)
