import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import { PatientList } from "@/components/patients/patient-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdvancedSearch } from "@/components/ui/advanced-search"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { AddPatientDialog } from "@/components/patients/add-patient-dialog"

export const metadata = {
  title: "患者管理 | MediNexus³",
  description: "查看和管理患者信息、病历和随访计划",
}

export default function PatientsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">患者管理</h1>
          <p className="text-muted-foreground mt-1">查看和管理患者信息、病历和随访计划</p>
        </div>
        <div className="flex items-center gap-4">
          <AdvancedSearch placeholder="搜索患者..." />
          <AddPatientDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>患者列表</CardTitle>
              <CardDescription>管理您的患者记录和医疗历史</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSpinner />}>
                <PatientList />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>患者统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">活跃患者</span>
                  <span className="font-medium">248</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">本周新增</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">待随访</span>
                  <span className="font-medium">36</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">高风险患者</span>
                  <span className="font-medium">18</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <span>导出患者数据</span>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span>批量添加患者</span>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span>创建患者分组</span>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span>设置随访提醒</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
