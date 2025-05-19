// 简化版的翻译文件
export type Locale = "zh-CN" | "en-US" | "ja-JP" | "ko-KR"

export type TranslationKey =
  | "common.dashboard"
  | "common.patients"
  | "common.analytics"
  | "common.settings"
  | "common.logout"
  | "common.login"
  | "common.register"
  | "common.profile"
  | "common.help"

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  "zh-CN": {
    "common.dashboard": "仪表盘",
    "common.patients": "患者",
    "common.analytics": "分析",
    "common.settings": "设置",
    "common.logout": "退出",
    "common.login": "登录",
    "common.register": "注册",
    "common.profile": "个人资料",
    "common.help": "帮助",
  },
  "en-US": {
    "common.dashboard": "Dashboard",
    "common.patients": "Patients",
    "common.analytics": "Analytics",
    "common.settings": "Settings",
    "common.logout": "Logout",
    "common.login": "Login",
    "common.register": "Register",
    "common.profile": "Profile",
    "common.help": "Help",
  },
  "ja-JP": {
    "common.dashboard": "ダッシュボード",
    "common.patients": "患者",
    "common.analytics": "分析",
    "common.settings": "設定",
    "common.logout": "ログアウト",
    "common.login": "ログイン",
    "common.register": "登録",
    "common.profile": "プロフィール",
    "common.help": "ヘルプ",
  },
  "ko-KR": {
    "common.dashboard": "대시보드",
    "common.patients": "환자",
    "common.analytics": "분석",
    "common.settings": "설정",
    "common.logout": "로그아웃",
    "common.login": "로그인",
    "common.register": "등록",
    "common.profile": "프로필",
    "common.help": "도움말",
  },
}
