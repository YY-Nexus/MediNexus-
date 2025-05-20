"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InsuranceSettlement } from "./insurance-settlement"
import { ExpenseManagement } from "./expense-management"
import { PricingManagement } from "./pricing-management"
import { FinancialReports } from "./financial-reports"
import { InvoiceManagement } from "./invoice-management"
import { ExpenseStatistics } from "./expense-statistics"
import { Badge } from "@/components/ui/badge"

export function FinanceModule() {
  const [activeTab, setActiveTab] = useState("insurance")

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">财务管理</h1>
          <Badge variant="outline" className="text-xs">
            新模块
          </Badge>
        </div>
        <p className="text-muted-foreground mt-2">医疗费用结算、医保报销和财务报表管理</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="insurance">医保结算</TabsTrigger>
          <TabsTrigger value="expenses">费用管理</TabsTrigger>
          <TabsTrigger value="pricing">收费项目</TabsTrigger>
          <TabsTrigger value="reports">财务报表</TabsTrigger>
          <TabsTrigger value="invoices">发票管理</TabsTrigger>
          <TabsTrigger value="statistics">费用统计</TabsTrigger>
        </TabsList>

        <TabsContent value="insurance" className="mt-6">
          <InsuranceSettlement />
        </TabsContent>

        <TabsContent value="expenses" className="mt-6">
          <ExpenseManagement />
        </TabsContent>

        <TabsContent value="pricing" className="mt-6">
          <PricingManagement />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <FinancialReports />
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <InvoiceManagement />
        </TabsContent>

        <TabsContent value="statistics" className="mt-6">
          <ExpenseStatistics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
