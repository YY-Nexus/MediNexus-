/**
 * localStorage 工具函数
 * 提供对 localStorage 的安全访问和类型支持
 */
import type { StorageOptions, NamespacedStorage } from "../../types/storage"

/**
 * 序列化值以存储到 localStorage
 * @param value 要序列化的值
 * @returns 序列化后的字符串
 */
function serializeValue<T>(value: T): string {
  try {
    return JSON.stringify(value)
  } catch (error) {
    console.error("Error serializing value:", error)
    return ""
  }
}

/**
 * 从 localStorage 反序列化值
 * @param value 要反序列化的字符串
 * @returns 反序列化后的值
 */
function deserializeValue<T>(value: string | null): T | null {
  if (value === null) {
    return null
  }

  try {
    return JSON.parse(value) as T
  } catch (error) {
    console.error("Error deserializing value:", error)
    return null
  }
}

/**
 * 存储项目到 localStorage
 * @param key 存储键
 * @param value 存储值
 */
export function setItem<T>(key: string, value: T): void {
  try {
    const serializedValue = serializeValue(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
  }
}

/**
 * 从 localStorage 获取项目
 * @param key 存储键
 * @param defaultValue 默认值
 * @returns 存储的值或默认值
 */
export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const serializedValue = localStorage.getItem(key)
    const value = deserializeValue<T>(serializedValue)
    return value !== null ? value : defaultValue
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error)
    return defaultValue
  }
}

/**
 * 从 localStorage 移除项目
 * @param key 存储键
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
  }
}

/**
 * 清空 localStorage
 */
export function clear(): void {
  try {
    localStorage.clear()
  } catch (error) {
    console.error("Error clearing localStorage:", error)
  }
}

/**
 * 检查 localStorage 中是否存在某个键
 * @param key 存储键
 * @returns 是否存在
 */
export function hasKey(key: string): boolean {
  try {
    return localStorage.getItem(key) !== null
  } catch (error) {
    console.error(`Error checking localStorage key "${key}":`, error)
    return false
  }
}

/**
 * 获取所有键
 * @returns 所有键的数组
 */
export function getAllKeys(): string[] {
  try {
    return Object.keys(localStorage)
  } catch (error) {
    console.error("Error getting all localStorage keys:", error)
    return []
  }
}

/**
 * 获取 localStorage 已使用空间（以字节为单位）
 * @returns 已使用空间（字节）
 */
export function getUsedSpace(): number {
  try {
    let total = 0
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        total += (localStorage[key].length + key.length) * 2 // UTF-16 编码每个字符占用 2 字节
      }
    }
    return total
  } catch (error) {
    console.error("Error calculating localStorage used space:", error)
    return 0
  }
}

/**
 * 检查 localStorage 是否可用
 * @returns localStorage 是否可用
 */
export function isAvailable(): boolean {
  try {
    const testKey = "__test__"
    localStorage.setItem(testKey, testKey)
    const result = localStorage.getItem(testKey) === testKey
    localStorage.removeItem(testKey)
    return result
  } catch (error) {
    return false
  }
}

/**
 * 过滤特定命名空间的键
 * @param allKeys 所有键
 * @param prefix 命名空间前缀
 * @returns 过滤后的键
 */
function filterNamespacedKeys(allKeys: string[], prefix: string): string[] {
  return allKeys.filter((k) => k.startsWith(prefix))
}

/**
 * 从带前缀的键中提取原始键名
 * @param namespacedKey 带命名空间前缀的键
 * @param prefix 命名空间前缀
 * @returns 原始键名
 */
function extractOriginalKey(namespacedKey: string, prefix: string): string {
  return namespacedKey.substring(prefix.length)
}

/**
 * 创建命名空间存储
 * @param namespace 命名空间
 * @returns 命名空间存储对象
 */
export function createNamespacedStorage(namespace: string): NamespacedStorage {
  const prefix = `${namespace}:`

  return {
    setItem<T>(key: string, value: T, options?: StorageOptions): void {
      setItem<T>(`${prefix}${key}`, value)
    },

    getItem<T>(key: string, defaultValue: T): T {
      return getItem<T>(`${prefix}${key}`, defaultValue)
    },

    removeItem(key: string): void {
      removeItem(`${prefix}${key}`)
    },

    clear(): void {
      const allKeys = getAllKeys()
      const namespacedKeys = filterNamespacedKeys(allKeys, prefix)
      namespacedKeys.forEach((namespacedKey) => removeItem(namespacedKey))
    },

    hasKey(key: string): boolean {
      return hasKey(`${prefix}${key}`)
    },

    getAllKeys(): string[] {
      const allKeys = getAllKeys()
      const namespacedKeys = filterNamespacedKeys(allKeys, prefix)
      return namespacedKeys.map((namespacedKey) => extractOriginalKey(namespacedKey, prefix))
    },

    getUsedSpace(): number {
      let total = 0
      const allKeys = getAllKeys()
      const namespacedKeys = filterNamespacedKeys(allKeys, prefix)

      namespacedKeys.forEach((key) => {
        const value = localStorage.getItem(key) || ""
        total += (value.length + key.length) * 2
      })

      return total
    },
  }
}

// 创建一个命名空间的本地存储工具，避免键名冲突
export const medicalStorage = {
  getItem<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue

    try {
      const item = window.localStorage.getItem(`medinexus_${key}`)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error)
      return defaultValue
    }
  },

  setItem<T>(key: string, value: T): void {
    if (typeof window === "undefined") return

    try {
      window.localStorage.setItem(`medinexus_${key}`, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error)
    }
  },

  removeItem(key: string): void {
    if (typeof window === "undefined") return

    try {
      window.localStorage.removeItem(`medinexus_${key}`)
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error)
    }
  },

  clear(): void {
    if (typeof window === "undefined") return

    try {
      // 只清除我们的命名空间的项
      Object.keys(window.localStorage)
        .filter((key) => key.startsWith("medinexus_"))
        .forEach((key) => window.localStorage.removeItem(key))
    } catch (error) {
      console.error("Error clearing localStorage:", error)
    }
  },
}
