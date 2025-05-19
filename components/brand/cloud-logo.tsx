"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CloudLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
  className?: string
}

export function CloudLogo({ size = "md", animated = true, className = "" }: CloudLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 根据尺寸确定宽高
  const dimensions = {
    sm: { width: 40, height: 40 },
    md: { width: 60, height: 60 },
    lg: { width: 100, height: 100 },
    xl: { width: 150, height: 150 },
  }

  const { width, height } = dimensions[size]

  // 如果不支持客户端动画，则返回静态版本
  if (!isMounted || !animated) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <img src="/cloud-logo.png" alt="YY Cloud³ Logo" width={width} height={height} className="object-contain" />
      </div>
    )
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 盾牌背景 */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg viewBox="0 0 200 230" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* 主盾牌 */}
          <path
            d="M20,20 L180,20 C180,20 190,100 100,210 C10,100 20,20 20,20 Z"
            fill="url(#shieldGradient)"
            filter="url(#shadow)"
          />

          {/* 盾牌边缘装饰 */}
          <path
            d="M180,20 C180,20 190,100 100,210"
            stroke="#f0f4f8"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />

          {/* 右上角圆点 */}
          <circle cx="180" cy="20" r="8" fill="#3b82f6" />
        </svg>
      </motion.div>

      {/* 云和数字3标志 */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ y: 0 }}
        animate={{ y: isHovered ? -5 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg viewBox="0 0 100 100" width={width * 0.6} height={height * 0.6} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cloudGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </linearGradient>
            <linearGradient id="cloudGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="cloudGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* 云形状1 */}
          <path
            d="M50,20 C65,20 75,35 75,50 C75,65 65,80 50,80 C35,80 25,65 25,50 C25,35 35,20 50,20 Z"
            fill="url(#cloudGradient1)"
            opacity="0.9"
          />

          {/* 云形状2 */}
          <path
            d="M40,25 C55,25 65,40 65,55 C65,70 55,75 40,75 C25,75 20,60 20,45 C20,30 25,25 40,25 Z"
            fill="url(#cloudGradient2)"
            opacity="0.8"
          />

          {/* 云形状3 */}
          <path
            d="M60,25 C75,25 80,40 80,55 C80,70 75,75 60,75 C45,75 35,60 35,45 C35,30 45,25 60,25 Z"
            fill="url(#cloudGradient3)"
            opacity="0.8"
          />

          {/* 数字3 */}
          <text
            x="50"
            y="58"
            fontSize="30"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            3
          </text>
        </svg>
      </motion.div>

      {/* 文字标志 */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <svg viewBox="0 0 120 30" width={width * 0.8} xmlns="http://www.w3.org/2000/svg">
          <text
            x="50%"
            y="50%"
            fontSize="16"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Arial, sans-serif"
          >
            YY Cloud
            <tspan fontSize="10" baselineShift="super">
              3
            </tspan>
          </text>
        </svg>
      </motion.div>
    </div>
  )
}
