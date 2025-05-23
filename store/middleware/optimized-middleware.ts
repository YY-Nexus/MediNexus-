import type { StateCreator } from "zustand"

// 深度比较函数
function isEqual(a: any, b: any): boolean {
  if (a === b) return true

  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return a === b
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!keysB.includes(key)) return false
    if (!isEqual(a[key], b[key])) return false
  }

  return true
}

// 优化中间件 - 防止不必要的状态更新
export const optimized =
  <T extends object>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) => {
    return config(
      (partial, replace) => {
        const nextState = typeof partial === "function" ? partial(get()) : partial
        const prevState = get()

        // 如果状态没有变化，不触发更新
        if (!replace && isEqual(prevState, { ...prevState, ...nextState })) {
          return
        }

        set(partial, replace)
      },
      get,
      api,
    )
  }

// 防抖中间件 - 合并短时间内的多次更新
export const debounced = <T extends object>(delay = 100): ((config: StateCreator<T>) => StateCreator<T>) => {
  let timeout: NodeJS.Timeout | null = null
  let pendingState: Partial<T> | null = null

  return (config) => (set, get, api) => {
    return config(
      (partial, replace) => {
        if (replace) {
          // 如果是替换操作，立即执行
          if (timeout) {
            clearTimeout(timeout)
            timeout = null
            pendingState = null
          }
          set(partial, replace)
          return
        }

        // 合并状态更新
        pendingState = pendingState
          ? { ...pendingState, ...(typeof partial === "function" ? partial(get()) : partial) }
          : typeof partial === "function"
            ? partial(get())
            : partial

        if (!timeout) {
          timeout = setTimeout(() => {
            if (pendingState) {
              set(pendingState, false)
              pendingState = null
            }
            timeout = null
          }, delay)
        }
      },
      get,
      api,
    )
  }
}

// 日志中间件 - 记录状态变化
export const logged = <T extends object>(name: string): ((config: StateCreator<T>) => StateCreator<T>) => {
  return (config) => (set, get, api) => {
    return config(
      (partial, replace) => {
        const nextState = typeof partial === "function" ? partial(get()) : partial
        const prevState = get()

        // 记录状态变化
        console.group(`[Zustand] ${name} 状态更新`)
        console.log("上一状态:", prevState)
        console.log("更新内容:", nextState)
        console.log("替换模式:", replace)
        console.groupEnd()

        set(partial, replace)
      },
      get,
      api,
    )
  }
}
