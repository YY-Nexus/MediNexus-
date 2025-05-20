export const a11yConfig = {
  // WCAG AA级合规配置
  ariaAttributes: true, // 启用ARIA属性验证
  colorContrast: {
    enabled: true,
    level: "AA", // WCAG AA级对比度要求
    minRatio: 4.5, // 普通文本最小对比度
    largeTextMinRatio: 3, // 大文本最小对比度
  },
  keyboardNavigation: {
    enabled: true,
    tabIndex: true, // 验证tabIndex使用
    focusVisible: true, // 确保焦点可见
  },
  screenReader: {
    announcements: true, // 启用屏幕阅读器公告
    liveRegions: true, // 启用实时区域
  },
  semanticHTML: true, // 验证语义化HTML使用
  imageAlts: true, // 验证图像替代文本
  formLabels: true, // 验证表单标签
  skipLinks: true, // 启用跳过导航链接
}
