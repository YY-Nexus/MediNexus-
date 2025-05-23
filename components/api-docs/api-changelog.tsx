"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ChangelogEntry {
  version: string
  date: string
  changes: {
    type: "added" | "changed" | "fixed" | "removed"
    description: string
  }[]
}

interface ApiChangelogProps {
  changelog: ChangelogEntry[]
}

export function ApiChangelog({ changelog }: ApiChangelogProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">API 更新日志</h2>

      {changelog.map((entry, index) => (
        <Card key={entry.version} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">v{entry.version}</CardTitle>
              <span className="text-sm text-muted-foreground">{entry.date}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {entry.changes.map((change, changeIndex) => (
                <div key={changeIndex} className="flex items-start space-x-3">
                  <Badge
                    variant={
                      change.type === "added"
                        ? "default"
                        : change.type === "changed"
                          ? "secondary"
                          : change.type === "fixed"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {change.type === "added"
                      ? "新增"
                      : change.type === "changed"
                        ? "变更"
                        : change.type === "fixed"
                          ? "修复"
                          : "移除"}
                  </Badge>
                  <p className="text-sm">{change.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
          {index < changelog.length - 1 && <Separator />}
        </Card>
      ))}
    </div>
  )
}
