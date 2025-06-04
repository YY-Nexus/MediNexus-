"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"

interface GestureState {
  isActive: boolean
  startX: number
  startY: number
  currentX: number
  currentY: number
  deltaX: number
  deltaY: number
  distance: number
  direction: "left" | "right" | "up" | "down" | null
  velocity: number
  duration: number
}

interface GestureOptions {
  threshold?: number
  velocityThreshold?: number
  preventScroll?: boolean
  enablePinch?: boolean
  enableRotation?: boolean
}

export function useMobileGestures(elementRef: React.RefObject<HTMLElement>, options: GestureOptions = {}) {
  const {
    threshold = 10,
    velocityThreshold = 0.3,
    preventScroll = false,
    enablePinch = false,
    enableRotation = false,
  } = options

  const [gestureState, setGestureState] = useState<GestureState>({
    isActive: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    distance: 0,
    direction: null,
    velocity: 0,
    duration: 0,
  })

  const [pinchState, setPinchState] = useState({
    isActive: false,
    scale: 1,
    initialDistance: 0,
    currentDistance: 0,
  })

  const [rotationState, setRotationState] = useState({
    isActive: false,
    angle: 0,
    initialAngle: 0,
    currentAngle: 0,
  })

  const startTime = useRef<number>(0)
  const lastPosition = useRef({ x: 0, y: 0 })
  const lastTime = useRef<number>(0)

  // 计算两点间距离
  const getDistance = useCallback((touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX
    const dy = touch1.clientY - touch2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }, [])

  // 计算两点间角度
  const getAngle = useCallback((touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX
    const dy = touch1.clientY - touch2.clientY
    return Math.atan2(dy, dx) * (180 / Math.PI)
  }, [])

  // 获取滑动方向
  const getDirection = useCallback((deltaX: number, deltaY: number) => {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? "right" : "left"
    } else {
      return deltaY > 0 ? "down" : "up"
    }
  }, [])

  // 计算速度
  const calculateVelocity = useCallback((deltaX: number, deltaY: number, deltaTime: number) => {
    if (deltaTime === 0) return 0
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    return distance / deltaTime
  }, [])

  // 触摸开始
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (preventScroll) {
        e.preventDefault()
      }

      const touch = e.touches[0]
      const now = Date.now()

      startTime.current = now
      lastTime.current = now
      lastPosition.current = { x: touch.clientX, y: touch.clientY }

      setGestureState({
        isActive: true,
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        currentY: touch.clientY,
        deltaX: 0,
        deltaY: 0,
        distance: 0,
        direction: null,
        velocity: 0,
        duration: 0,
      })

      // 处理双指操作
      if (e.touches.length === 2 && (enablePinch || enableRotation)) {
        const touch1 = e.touches[0]
        const touch2 = e.touches[1]

        if (enablePinch) {
          const distance = getDistance(touch1, touch2)
          setPinchState({
            isActive: true,
            scale: 1,
            initialDistance: distance,
            currentDistance: distance,
          })
        }

        if (enableRotation) {
          const angle = getAngle(touch1, touch2)
          setRotationState({
            isActive: true,
            angle: 0,
            initialAngle: angle,
            currentAngle: angle,
          })
        }
      }
    },
    [preventScroll, enablePinch, enableRotation, getDistance, getAngle],
  )

  // 触摸移动
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (preventScroll) {
        e.preventDefault()
      }

      const touch = e.touches[0]
      const now = Date.now()
      const deltaTime = now - lastTime.current

      if (gestureState.isActive) {
        const deltaX = touch.clientX - gestureState.startX
        const deltaY = touch.clientY - gestureState.startY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const direction = distance > threshold ? getDirection(deltaX, deltaY) : null

        const moveDeltaX = touch.clientX - lastPosition.current.x
        const moveDeltaY = touch.clientY - lastPosition.current.y
        const velocity = calculateVelocity(moveDeltaX, moveDeltaY, deltaTime)

        setGestureState((prev) => ({
          ...prev,
          currentX: touch.clientX,
          currentY: touch.clientY,
          deltaX,
          deltaY,
          distance,
          direction,
          velocity,
          duration: now - startTime.current,
        }))

        lastPosition.current = { x: touch.clientX, y: touch.clientY }
        lastTime.current = now
      }

      // 处理双指操作
      if (e.touches.length === 2) {
        const touch1 = e.touches[0]
        const touch2 = e.touches[1]

        if (enablePinch && pinchState.isActive) {
          const currentDistance = getDistance(touch1, touch2)
          const scale = currentDistance / pinchState.initialDistance

          setPinchState((prev) => ({
            ...prev,
            scale,
            currentDistance,
          }))
        }

        if (enableRotation && rotationState.isActive) {
          const currentAngle = getAngle(touch1, touch2)
          const angle = currentAngle - rotationState.initialAngle

          setRotationState((prev) => ({
            ...prev,
            angle,
            currentAngle,
          }))
        }
      }
    },
    [
      preventScroll,
      gestureState.isActive,
      gestureState.startX,
      gestureState.startY,
      threshold,
      getDirection,
      calculateVelocity,
      enablePinch,
      enableRotation,
      pinchState.isActive,
      pinchState.initialDistance,
      rotationState.isActive,
      rotationState.initialAngle,
      getDistance,
      getAngle,
    ],
  )

  // 触摸结束
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    setGestureState((prev) => ({
      ...prev,
      isActive: false,
    }))

    setPinchState((prev) => ({
      ...prev,
      isActive: false,
    }))

    setRotationState((prev) => ({
      ...prev,
      isActive: false,
    }))
  }, [])

  // 绑定事件监听器
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener("touchstart", handleTouchStart, { passive: !preventScroll })
    element.addEventListener("touchmove", handleTouchMove, { passive: !preventScroll })
    element.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchmove", handleTouchMove)
      element.removeEventListener("touchend", handleTouchEnd)
    }
  }, [elementRef, handleTouchStart, handleTouchMove, handleTouchEnd, preventScroll])

  // 手势识别结果
  const gestures = {
    // 基础滑动手势
    isSwipeLeft: gestureState.direction === "left" && gestureState.distance > threshold,
    isSwipeRight: gestureState.direction === "right" && gestureState.distance > threshold,
    isSwipeUp: gestureState.direction === "up" && gestureState.distance > threshold,
    isSwipeDown: gestureState.direction === "down" && gestureState.distance > threshold,

    // 快速滑动
    isFastSwipe: gestureState.velocity > velocityThreshold,

    // 长按（通过duration判断）
    isLongPress: gestureState.isActive && gestureState.duration > 500 && gestureState.distance < threshold,

    // 缩放手势
    isPinching: pinchState.isActive,
    pinchScale: pinchState.scale,

    // 旋转手势
    isRotating: rotationState.isActive,
    rotationAngle: rotationState.angle,
  }

  return {
    gestureState,
    pinchState,
    rotationState,
    gestures,
  }
}

// 触觉反馈Hook
export function useHapticFeedback() {
  const vibrate = useCallback((pattern: number | number[] = 10) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern)
    }
  }, [])

  const lightImpact = useCallback(() => vibrate(10), [vibrate])
  const mediumImpact = useCallback(() => vibrate(20), [vibrate])
  const heavyImpact = useCallback(() => vibrate([30, 10, 30]), [vibrate])
  const selectionChanged = useCallback(() => vibrate(5), [vibrate])
  const notificationSuccess = useCallback(() => vibrate([10, 50, 10]), [vibrate])
  const notificationWarning = useCallback(() => vibrate([20, 100, 20]), [vibrate])
  const notificationError = useCallback(() => vibrate([50, 50, 50]), [vibrate])

  return {
    vibrate,
    lightImpact,
    mediumImpact,
    heavyImpact,
    selectionChanged,
    notificationSuccess,
    notificationWarning,
    notificationError,
  }
}

// 移动端设备信息Hook
export function useMobileDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    platform: "",
    userAgent: "",
    screenWidth: 0,
    screenHeight: 0,
    pixelRatio: 1,
    orientation: "portrait" as "portrait" | "landscape",
    touchSupport: false,
    batteryLevel: null as number | null,
    networkType: "unknown",
    isOnline: true,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setDeviceInfo({
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isDesktop: width > 1024,
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        pixelRatio: window.devicePixelRatio || 1,
        orientation: width > height ? "landscape" : "portrait",
        touchSupport: "ontouchstart" in window,
        batteryLevel: null, // 需要Battery API
        networkType: "unknown", // 需要Network Information API
        isOnline: navigator.onLine,
      })
    }

    updateDeviceInfo()

    window.addEventListener("resize", updateDeviceInfo)
    window.addEventListener("orientationchange", updateDeviceInfo)
    window.addEventListener("online", updateDeviceInfo)
    window.addEventListener("offline", updateDeviceInfo)

    return () => {
      window.removeEventListener("resize", updateDeviceInfo)
      window.removeEventListener("orientationchange", updateDeviceInfo)
      window.removeEventListener("online", updateDeviceInfo)
      window.removeEventListener("offline", updateDeviceInfo)
    }
  }, [])

  return deviceInfo
}
