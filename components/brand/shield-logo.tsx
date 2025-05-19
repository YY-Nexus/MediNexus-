import { cn } from "@/lib/utils"

interface ShieldLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function ShieldLogo({ size = "md", showText = true, className }: ShieldLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("h-full w-full text-medical-600")}
        >
          <path
            d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg font-bold leading-tight text-medical-700">YanYu</span>
          <span className="text-xs font-medium text-medical-600">MediNexus³</span>
        </div>
      )}
    </div>
  )
}
