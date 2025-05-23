import { createNamespacedStorage } from "@/lib/storage/localStorage"

describe("localStorage 工具函数", () => {
  // 在每个测试前模拟 localStorage
  beforeEach(() => {
    // 模拟 localStorage
    const localStorageMock = (() => {
      let store: Record<string, string> = {}
      return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          store[key] = value.toString()
        }),
        removeItem: jest.fn((key: string) => {
          delete store[key]
        }),
        clear: jest.fn(() => {
          store = {}
        }),
      }
    })()

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    })
  })

  test("应该创建一个命名空间存储", () => {
    const storage = createNamespacedStorage("test")
    expect(storage).toBeDefined()
    expect(typeof storage.setItem).toBe("function")
    expect(typeof storage.getItem).toBe("function")
    expect(typeof storage.removeItem).toBe("function")
    expect(typeof storage.clear).toBe("function")
    expect(typeof storage.hasKey).toBe("function")
    expect(typeof storage.getAllKeys).toBe("function")
  })

  test("应该在命名空间中存储和检索值", () => {
    const storage = createNamespacedStorage("test")
    const testValue = { name: "张三", age: 30 }

    storage.setItem("user", testValue)
    const retrievedValue = storage.getItem("user", {})

    expect(retrievedValue).toEqual(testValue)
    expect(localStorage.setItem).toHaveBeenCalled()
    expect(localStorage.getItem).toHaveBeenCalled()
  })

  test("应该返回默认值当键不存在时", () => {
    const storage = createNamespacedStorage("test")
    const defaultValue = { name: "默认用户" }

    const retrievedValue = storage.getItem("nonexistent", defaultValue)

    expect(retrievedValue).toEqual(defaultValue)
  })

  test("应该移除一个键", () => {
    const storage = createNamespacedStorage("test")
    const testValue = { name: "张三", age: 30 }

    storage.setItem("user", testValue)
    storage.removeItem("user")

    const retrievedValue = storage.getItem("user", null)
    expect(retrievedValue).toBeNull()
  })

  test("应该清除所有键", () => {
    const storage = createNamespacedStorage("test")

    storage.setItem("user1", { name: "张三" })
    storage.setItem("user2", { name: "李四" })

    storage.clear()

    expect(storage.getItem("user1", null)).toBeNull()
    expect(storage.getItem("user2", null)).toBeNull()
  })

  test("应该检查键是否存在", () => {
    const storage = createNamespacedStorage("test")

    storage.setItem("user", { name: "张三" })

    expect(storage.hasKey("user")).toBe(true)
    expect(storage.hasKey("nonexistent")).toBe(false)
  })

  test("应该获取所有键", () => {
    const storage = createNamespacedStorage("test")

    storage.setItem("user1", { name: "张三" })
    storage.setItem("user2", { name: "李四" })

    const keys = storage.getAllKeys()

    expect(keys).toContain("user1")
    expect(keys).toContain("user2")
    expect(keys.length).toBe(2)
  })
})
