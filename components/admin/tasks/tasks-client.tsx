"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TaskHistory from "./task-history"
import TaskScheduler from "./task-scheduler"
import TaskMonitor from "./task-monitor"

export function TasksClient() {
  const [activeTab, setActiveTab] = useState("scheduler")

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="scheduler" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scheduler">计划任务管理</TabsTrigger>
          <TabsTrigger value="monitor">任务监控</TabsTrigger>
          <TabsTrigger value="history">执行历史</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduler">
          <TaskScheduler />
        </TabsContent>

        <TabsContent value="monitor">
          <TaskMonitor />
        </TabsContent>

        <TabsContent value="history">
          <TaskHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TasksClient
