"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Command } from "lucide-react"

interface KeyboardShortcutsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function KeyboardShortcutsDialog({ open, onOpenChange }: KeyboardShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Command className="h-5 w-5" />
            键盘快捷键
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">导航</h3>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">切换侧边栏</span>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">Alt</kbd>
                  <span>+</span>
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">S</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">打开搜索</span>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">⌘</kbd>
                  <span>+</span>
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">K</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">打开快捷键帮助</span>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">Alt</kbd>
                  <span>+</span>
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">K</kbd>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">搜索</h3>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">聚焦搜索框</span>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">/</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">清除搜索</span>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">Esc</kbd>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">常用功能</h3>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">保存</span>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">⌘</kbd>
                  <span>+</span>
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">S</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">刷新</span>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">⌘</kbd>
                  <span>+</span>
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">R</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
