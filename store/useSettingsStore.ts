import { create } from "zustand"
import { persist } from "zustand/middleware"
import { optimized, debounced, logged } from "./middleware/optimized-middleware"

// 主题类型
export type Theme = "light" | "dark" | "system"

// 语言类型
export type Language = "zh-CN" | "en-US"

// 设置状态接口
interface SettingsState {
  theme: Theme
  language: Language
  fontSize: number
  highContrast: boolean
  animations: boolean
  notifications: boolean
  autoSave: boolean
  compactView: boolean

  // 操作
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  setFontSize: (size: number) => void
  toggleHighContrast: () => void
  toggleAnimations: () => void
  toggleNotifications: () => void
  toggleAutoSave: () => void
  toggleCompactView: () => void
  resetSettings: () => void
}

// 默认设置
const defaultSettings = {
  theme: "system" as Theme,
  language: "zh-CN" as Language,
  fontSize: 16,
  highContrast: false,
  animations: true,
  notifications: true,
  autoSave: true,
  compactView: false,
}

// 创建设置存储 - 使用优化的中间件
export const useSettingsStore = create<SettingsState>()(
  logged("Settings")(
    debounced(300)(
      optimized(
        persist(
          (set, get) => ({
            ...defaultSettings,

            setTheme: (theme) => {
              // 只有当主题真正变化时才更新状态
              if (get().theme !== theme) {
                set({ theme })
              }
            },

            setLanguage: (language) => {
              // 只有当语言真正变化时才更新状态
              if (get().language !== language) {
                set({ language })
              }
            },

            setFontSize: (fontSize) => {
              // 只有当字体大小真正变化时才更新状态
              if (get().fontSize !== fontSize) {
                set({ fontSize })
              }
            },

            toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),

            toggleAnimations: () => set((state) => ({ animations: !state.animations })),

            toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),

            toggleAutoSave: () => set((state) => ({ autoSave: !state.autoSave })),

            toggleCompactView: () => set((state) => ({ compactView: !state.compactView })),

            resetSettings: () => {
              // 只有当设置与默认值不同时才重置
              const currentSettings = get()
              if (JSON.stringify(currentSettings) !== JSON.stringify(defaultSettings)) {
                set(defaultSettings)
              }
            },
          }),
          {
            name: "medinexus-settings",
          },
        ),
      ),
    ),
  ),
)

// 导出选择器，以便组件可以只订阅需要的状态部分
export const useTheme = () => useSettingsStore((state) => state.theme)
export const useLanguage = () => useSettingsStore((state) => state.language)
export const useFontSize = () => useSettingsStore((state) => state.fontSize)
export const useHighContrast = () => useSettingsStore((state) => state.highContrast)
export const useAnimations = () => useSettingsStore((state) => state.animations)
export const useNotifications = () => useSettingsStore((state) => state.notifications)
export const useAutoSave = () => useSettingsStore((state) => state.autoSave)
export const useCompactView = () => useSettingsStore((state) => state.compactView)
