"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ExpenseManagement() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>费用管理</CardTitle>
          <Badge variant="outline">开发中</Badge>
        </div>
        <CardDescription>医疗费用管理功能正在开发中，即将上线</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-8 text-center text-muted-foreground">
          <p>费用管理功能将在下一版本中推出</p>
          <p className="text-sm mt-2">预计上线时间：2023年12月15日</p>
        </div>
      </CardContent>
    </Card>
  )
}
