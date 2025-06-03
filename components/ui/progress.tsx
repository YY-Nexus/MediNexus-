"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "medical"
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, variant = "medical", ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "success":
          return "bg-green-500"
        case "warning":
          return "bg-amber-500"
        case "danger":
          return "bg-red-500"
        case "info":
          return "bg-blue-500"
        case "medical":
          return "bg-gradient-to-r from-blue-500 to-blue-600"
        default:
          return "bg-gradient-to-r from-blue-500 to-blue-600"
      }
    }

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative h-3 w-full overflow-hidden rounded-full bg-blue-50 border border-blue-100", className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn("h-full w-full flex-1 transition-all duration-500 ease-out rounded-full", getVariantClasses())}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    )
  },
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
