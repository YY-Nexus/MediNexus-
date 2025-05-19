// 缓存版本标识，更新时需要修改此值
const CACHE_VERSION = "v1"
const CACHE_NAME = `medinexus-${CACHE_VERSION}`

// 需要缓存的资源列表
const RESOURCES_TO_CACHE = ["/", "/yanyu-cloud-logo.png", "/offline.html", "/manifest.json", "/favicon.ico"]

// 安装Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("缓存已打开")
        return cache.addAll(RESOURCES_TO_CACHE)
      })
      .then(() => {
        // 强制激活，不等待旧版本关闭
        return self.skipWaiting()
      }),
  )
})

// 激活Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // 删除旧版本缓存
            if (cacheName !== CACHE_NAME) {
              console.log("删除旧缓存:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        // 立即接管所有页面
        return self.clients.claim()
      }),
  )
})

// 处理资源请求
self.addEventListener("fetch", (event) => {
  // 跳过非GET请求和浏览器扩展请求
  if (event.request.method !== "GET" || event.request.url.startsWith("chrome-extension://")) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果在缓存中找到响应，则返回缓存的响应
      if (response) {
        return response
      }

      // 克隆请求，因为请求是一个流，只能使用一次
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest)
        .then((response) => {
          // 检查是否收到有效响应
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // 克隆响应，因为响应是一个流，只能使用一次
          const responseToCache = response.clone()

          // 打开缓存并存储响应
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // 如果请求失败（离线），返回离线页面
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html")
          }

          // 对于图片请求，可以返回一个默认图片
          if (event.request.destination === "image") {
            return caches.match("/yanyu-cloud-logo.png")
          }

          // 对于其他资源，返回简单的离线响应
          return new Response("离线模式，无法加载资源", {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "text/plain",
            }),
          })
        })
    }),
  )
})

// 接收消息
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
