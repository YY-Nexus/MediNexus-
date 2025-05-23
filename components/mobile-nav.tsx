"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { Logo } from "@/components/brand/logo"
import { navItems } from "@/config/navigation"
import { motion, AnimatePresence } from "framer-motion"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // 关闭导航菜单当路由变化时
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // 添加滑动手势支持
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
      // 从左向右滑动打开菜单（当菜单关闭时）
      if (!isOpen && touchEndX.current - touchStartX.current > 100) {
        setIsOpen(true)
      }

      // 从右向左滑动关闭菜单（当菜单打开时）
      if (isOpen && touchStartX.current - touchEndX.current > 100) {
        setIsOpen(false)
      }

      // 重置
      touchStartX.current = 0
      touchEndX.current = 0
    }

    // 添加事件监听器
    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)

    // 清理事件监听器
    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isOpen])

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // 防止滚动穿透
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // 处理导航项点击
  const handleItemClick = (title: string) => {
    setActiveItem(title)
    setTimeout(() => setActiveItem(null), 300)
  }

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between p-4 border-b border-blue-100">
        <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
          <Logo variant="compact" />
        </Link>
        <MedicalButton
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "close" : "menu"}
              initial={{ opacity: 0, rotate: isOpen ? -90 : 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: isOpen ? 90 : -90 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </AnimatePresence>
        </MedicalButton>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={navRef}
            className="fixed inset-0 top-[64px] z-50 bg-white dark:bg-gray-950 overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <nav className="space-y-6 p-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="font-medium text-lg text-blue-800 dark:text-blue-200">{item.title}</div>
                  {item.children ? (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <motion.div
                          key={child.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 + childIndex * 0.03 }}
                        >
                          <Link
                            href={child.href}
                            onClick={() => handleItemClick(child.title)}
                            className={cn(
                              "block py-2 text-blue-600 dark:text-blue-400 group",
                              "transition-all duration-200 ease-in-out",
                              "hover:bg-blue-50 hover:text-blue-900 hover:pl-2 hover:rounded-md hover:shadow-sm",
                              "active:bg-blue-100 active:scale-[0.98]",
                              "dark:hover:text-blue-100 dark:hover:bg-blue-900/20",
                              pathname === child.href &&
                                "text-blue-900 dark:text-blue-100 font-medium bg-blue-50 dark:bg-blue-900/10 pl-2 rounded-md",
                              activeItem === child.title && "animate-pulse bg-blue-50",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <child.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                              <span>{child.title}</span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => handleItemClick(item.title)}
                      className={cn(
                        "block py-2 text-blue-600 dark:text-blue-400 group",
                        "transition-all duration-200 ease-in-out",
                        "hover:bg-blue-50 hover:text-blue-900 hover:pl-2 hover:rounded-md hover:shadow-sm",
                        "active:bg-blue-100 active:scale-[0.98]",
                        "dark:hover:text-blue-100 dark:hover:bg-blue-900/20",
                        pathname === item.href &&
                          "text-blue-900 dark:text-blue-100 font-medium bg-blue-50 dark:bg-blue-900/10 pl-2 rounded-md",
                        activeItem === item.title && "animate-pulse bg-blue-50",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
