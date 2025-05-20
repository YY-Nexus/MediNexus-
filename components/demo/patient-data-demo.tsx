"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

const DEMO_PATIENTS = [
  { id: "p1", name: "张伟", age: 45, gender: "男", condition: "高血压", lastVisit: "2023-04-15" },
  { id: "p2", name: "李娜", age: 32, gender: "女", condition: "妊娠期糖尿病", lastVisit: "2023-05-02" },
  { id: "p3", name: "王强", age: 67, gender: "男", condition: "冠心病", lastVisit: "2023-04-28" },
  { id: "p4", name: "刘芳", age: 29, gender: "女", condition: "哮喘", lastVisit: "2023-05-10" },
]

export function PatientDataDemo() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("patients")

  const filteredPatients = DEMO_PATIENTS.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={t("demo.patientData.searchPlaceholder", "搜索患者姓名或病症...")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="patients">{t("demo.patientData.tabs.patients", "患者列表")}</TabsTrigger>
          <TabsTrigger value="records">{t("demo.patientData.tabs.records", "医疗记录")}</TabsTrigger>
          <TabsTrigger value="trends">{t("demo.patientData.tabs.trends", "数据趋势")}</TabsTrigger>
        </TabsList>

        <TabsContent value="patients">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <Card key={patient.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {patient.age}岁, {patient.gender}
                        </p>
                        <p className="text-sm mt-1">{patient.condition}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {t("demo.patientData.viewDetails", "查看详情")}
                      </Button>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {t("demo.patientData.lastVisit", "上次就诊")}: {patient.lastVisit}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                {t("demo.patientData.noResults", "没有找到匹配的患者")}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {t("demo.patientData.selectPatient", "请先选择一位患者查看其医疗记录")}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {t("demo.patientData.trendsDescription", "患者数据趋势分析将在此显示")}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
