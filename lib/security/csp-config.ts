export const cspConfig = {
  // 默认策略
  "default-src": ["'self'"],

  // 脚本来源
  "script-src": [
    "'self'",
    "'unsafe-inline'", // 仅在开发环境中使用
    "https://cdn.jsdelivr.net",
    "https://cdn.tailwindcss.com",
  ],

  // 样式来源
  "style-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],

  // 图像来源
  "img-src": ["'self'", "data:", "blob:", "https://cdn.jsdelivr.net", "https://res.cloudinary.com"],

  // 字体来源
  "font-src": ["'self'", "https://fonts.gstatic.com"],

  // 连接来源
  "connect-src": ["'self'", "https://api.medinexus.com", "wss://realtime.medinexus.com"],

  // 媒体来源
  "media-src": ["'self'"],

  // 对象来源
  "object-src": ["'none'"],

  // 框架来源
  "frame-src": ["'self'"],

  // 工作线程来源
  "worker-src": ["'self'", "blob:"],

  // 清单来源
  "manifest-src": ["'self'"],

  // 表单操作
  "form-action": ["'self'"],

  // 基础URI
  "base-uri": ["'self'"],

  // 框架祖先
  "frame-ancestors": ["'self'"],

  // 升级不安全请求
  "upgrade-insecure-requests": [],

  // 阻止混合内容
  "block-all-mixed-content": [],

  // 引用策略
  referrer: ["strict-origin-when-cross-origin"],

  // 报告URI
  "report-uri": ["/api/security/csp-report"],

  // 报告到
  "report-to": ["default"],
}

// 生成CSP头
export function generateCSPHeader(isDev = false): string {
  const policies = { ...cspConfig }

  // 在开发环境中放宽某些限制
  if (isDev) {
    policies["script-src"] = [...policies["script-src"], "'unsafe-eval'"]
  } else {
    // 在生产环境中移除不安全的内联
    policies["script-src"] = policies["script-src"].filter((src) => src !== "'unsafe-inline'")
    // 添加nonce支持
    policies["script-src"].push("'nonce-{{nonce}}'")
  }

  // 构建CSP头
  return Object.entries(policies)
    .map(([key, values]) => {
      if (values.length === 0) return key
      return `${key} ${values.join(" ")}`
    })
    .join("; ")
}
