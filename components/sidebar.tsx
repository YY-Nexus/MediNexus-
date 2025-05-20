"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import GlobalNavigation from "./global-navigation"
import { useIsMobile } from "@/hooks/use-mobile" // 修正导入路径

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useIsMobile() // 使用项目中已有的媒体查询钩子

  return (
    <>
      {!isMobile ? (
        <div className="hidden lg:block">
          <div className="fixed inset-y-0 z-30 flex w-64 flex-col border-r bg-white">
            <div className="flex h-14 items-center border-b px-4">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <img src="/yanyu-shield-logo.png" alt="YanYu Logo" className="h-8 w-8" />
                <span>YanYu MediNexus³</span>
              </Link>
            </div>
            <ScrollArea className="flex-1 px-2 py-4">
              <GlobalNavigation />
            </ScrollArea>
          </div>
        </div>
      ) : (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">打开菜单</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-14 items-center border-b px-4">
              <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
                <img src="/yanyu-shield-logo.png" alt="YanYu Logo" className="h-8 w-8" />
                <span>YanYu MediNexus³</span>
              </Link>
            </div>
            <ScrollArea className="flex-1 px-2 py-4">
              <GlobalNavigation />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}

export default Sidebar
