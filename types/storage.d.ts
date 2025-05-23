/**
 * 存储项目接口
 * 定义存储在 localStorage 中的项目结构
 */
export interface StorageItem<T> {
  value: T
  timestamp: number
  expiry?: number
}

/**
 * 存储选项接口
 * 定义存储操作的可选配置
 */
export interface StorageOptions {
  expiry?: number // 过期时间（毫秒）
  namespace?: string // 命名空间
}

/**
 * 命名空间存储接口
 * 定义命名空间存储的方法
 */
export interface NamespacedStorage {
  setItem<T>(key: string, value: T, options?: StorageOptions): void
  getItem<T>(key: string, defaultValue: T): T
  removeItem(key: string): void
  clear(): void
  hasKey(key: string): boolean
  getAllKeys(): string[]
  getUsedSpace(): number
}

/**
 * 存储工具类型
 * 用于定义存储相关的工具函数类型
 */
export type StorageUtilityFunctions = {
  setItem<T>(key: string, value: T): void
  getItem<T>(key: string, defaultValue: T): T
  removeItem(key: string): void
  clear(): void
  hasKey(key: string): boolean
  getAllKeys(): string[]
  getUsedSpace(): number
  isAvailable(): boolean
  createNamespacedStorage(namespace: string): NamespacedStorage
}
