import { ApiChangelog } from "@/components/api-docs/api-changelog"

// 模拟更新日志数据
const changelog = [
  {
    version: "1.2.0",
    date: "2024-01-15",
    changes: [
      {
        type: "added" as const,
        description: "新增培训课程批量导入功能API",
      },
      {
        type: "added" as const,
        description: "新增考试成绩统计分析API",
      },
      {
        type: "changed" as const,
        description: "优化认证申请审核流程，支持多级审核",
      },
      {
        type: "fixed" as const,
        description: "修复用户权限验证在某些场景下的问题",
      },
    ],
  },
  {
    version: "1.1.0",
    date: "2023-12-20",
    changes: [
      {
        type: "added" as const,
        description: "新增培训课程评价和反馈API",
      },
      {
        type: "added" as const,
        description: "新增考试防作弊监控API",
      },
      {
        type: "changed" as const,
        description: "升级认证令牌安全机制，支持更长的有效期",
      },
      {
        type: "fixed" as const,
        description: "修复文件上传在大文件时的超时问题",
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2023-11-30",
    changes: [
      {
        type: "added" as const,
        description: "正式版本发布，包含完整的培训师认证系统API",
      },
      {
        type: "added" as const,
        description: "支持多种文件格式的证书上传和验证",
      },
      {
        type: "added" as const,
        description: "完整的API文档和测试工具",
      },
    ],
  },
  {
    version: "0.9.0",
    date: "2023-11-15",
    changes: [
      {
        type: "added" as const,
        description: "添加了培训管理模块的API",
      },
      {
        type: "added" as const,
        description: "添加了考核管理模块的API",
      },
      {
        type: "changed" as const,
        description: "优化了认证流程，增加了刷新令牌功能",
      },
    ],
  },
  {
    version: "0.8.0",
    date: "2023-11-01",
    changes: [
      {
        type: "added" as const,
        description: "添加了认证与授权模块的API",
      },
      {
        type: "added" as const,
        description: "添加了培训师认证申请模块的API",
      },
      {
        type: "added" as const,
        description: "添加了用户管理模块的API",
      },
    ],
  },
]

export default function ApiChangelogPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">API 更新日志</h1>
        <p className="text-muted-foreground">
          查看言语医枢³培训师认证系统 API 的版本历史和更新内容，了解每个版本的新功能、改进和修复。
        </p>
      </div>

      <ApiChangelog changelog={changelog} />
    </div>
  )
}
