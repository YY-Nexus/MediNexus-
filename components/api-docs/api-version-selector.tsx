"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface ApiVersionSelectorProps {
  versions: {
    version: string
    releaseDate: string
    isLatest?: boolean
  }[]
  currentVersion: string
  onVersionChange: (version: string) => void
}

export function ApiVersionSelector({ versions, currentVersion, onVersionChange }: ApiVersionSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">API 版本:</span>
      <Select value={currentVersion} onValueChange={onVersionChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="选择版本" />
        </SelectTrigger>
        <SelectContent>
          {versions.map((version) => (
            <SelectItem key={version.version} value={version.version}>
              <div className="flex items-center justify-between w-full">
                <span>v{version.version}</span>
                {version.isLatest && (
                  <Badge variant="outline" className="ml-2">
                    最新
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
