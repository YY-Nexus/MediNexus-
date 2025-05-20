"use client"

import { useCallback } from "react"
import { useAuthStore } from "@/store/useAuthStore"

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, error, login, logout, refreshToken, updateUser, clearError } =
    useAuthStore()

  // 检查用户是否有特定权限
  const hasPermission = useCallback(
    (requiredRole: string) => {
      if (!user) return false

      // 简单的基于角色的权限检查
      // 在实际应用中，可能需要更复杂的权限系统
      switch (requiredRole) {
        case "admin":
          return user.role === "admin"
        case "doctor":
          return user.role === "doctor" || user.role === "admin"
        case "researcher":
          return user.role === "researcher" || user.role === "admin"
        default:
          return false
      }
    },
    [user],
  )

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshToken,
    updateUser,
    clearError,
    hasPermission,
  }
}
