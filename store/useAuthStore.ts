import { create } from "zustand"
import { persist } from "zustand/middleware"
import { jwtVerify } from "jose"
import { optimized, debounced, logged } from "./middleware/optimized-middleware"

interface User {
  id: string
  name: string
  email: string
  role: string
  department?: string
  avatar?: string
}

interface JWTPayload {
  id: string
  name: string
  email: string
  role: string
  department?: string
  avatar?: string
  exp?: number
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // 操作
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<boolean>
  updateUser: (userData: Partial<User>) => void
  clearError: () => void
}

// 从JWT令牌解析用户信息
const parseUserFromToken = async (token: string): Promise<User | null> => {
  try {
    // 使用jose库解析JWT
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-must-be-at-least-32-characters-long"),
      {
        algorithms: ["HS256"],
      },
    )

    const jwtPayload = payload as JWTPayload

    return {
      id: jwtPayload.id,
      name: jwtPayload.name,
      email: jwtPayload.email,
      role: jwtPayload.role,
      department: jwtPayload.department,
      avatar: jwtPayload.avatar,
    }
  } catch (error) {
    console.error("解析JWT令牌失败:", error)
    return null
  }
}

// 使用优化的中间件
export const useAuthStore = create<AuthState>()(
  logged("Auth")(
    debounced(300)(
      optimized(
        persist(
          (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email, password) => {
              set({ isLoading: true, error: null })
              try {
                // 实际项目中替换为真实API调用
                const response = await fetch("/api/auth/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password }),
                })

                if (!response.ok) {
                  const error = await response.json()
                  throw new Error(error.message || "登录失败")
                }

                const data = await response.json()
                const decodedUser = await parseUserFromToken(data.token)

                if (!decodedUser) {
                  throw new Error("无效的认证令牌")
                }

                set({
                  user: decodedUser,
                  token: data.token,
                  isAuthenticated: true,
                  isLoading: false,
                })
              } catch (error) {
                set({
                  isLoading: false,
                  error: error instanceof Error ? error.message : "登录过程中发生错误",
                })
              }
            },

            logout: () => {
              set({
                user: null,
                token: null,
                isAuthenticated: false,
                error: null,
              })
            },

            refreshToken: async () => {
              const { token } = get()
              if (!token) return false

              try {
                const response = await fetch("/api/auth/refresh", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                })

                if (!response.ok) return false

                const data = await response.json()
                const decodedUser = await parseUserFromToken(data.token)

                if (!decodedUser) return false

                // 只有当token真正变化时才更新状态
                if (data.token !== token) {
                  set({
                    user: decodedUser,
                    token: data.token,
                    isAuthenticated: true,
                  })
                }

                return true
              } catch (error) {
                return false
              }
            },

            updateUser: (userData) => {
              const { user } = get()
              if (!user) return

              // 只有当用户数据真正变化时才更新状态
              const updatedUser = { ...user, ...userData }
              if (JSON.stringify(user) !== JSON.stringify(updatedUser)) {
                set({
                  user: updatedUser,
                })
              }
            },

            clearError: () => set({ error: null }),
          }),
          {
            name: "auth-storage",
            partialize: (state) => ({
              token: state.token,
              user: state.user,
            }),
          },
        ),
      ),
    ),
  ),
)

// 导出选择器，以便组件可以只订阅需要的状态部分
export const useAuthUser = () => useAuthStore((state) => state.user)
export const useAuthToken = () => useAuthStore((state) => state.token)
export const useAuthStatus = () => useAuthStore((state) => state.isAuthenticated)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)
export const useAuthError = () => useAuthStore((state) => state.error)
