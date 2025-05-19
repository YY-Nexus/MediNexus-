"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function TaskScheduler() {
  const [date, setDate] = useState<Date>()
  const [activeTab, setActiveTab] = useState("simple")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="simple">简单调度</TabsTrigger>
          <TabsTrigger value="advanced">高级调度</TabsTrigger>
          <TabsTrigger value="dependencies">任务依赖</TabsTrigger>
        </TabsList>

        <TabsContent value="simple" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-name">任务名称</Label>
                <Input id="task-name" placeholder="输入任务名称" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-type">任务类型</Label>
                <Select>
                  <SelectTrigger id="task-type">
                    <SelectValue placeholder="选择任务类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">系统任务</SelectItem>
                    <SelectItem value="analytics">分析任务</SelectItem>
                    <SelectItem value="ai">AI任务</SelectItem>
                    <SelectItem value="custom">自定义任务</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-command">执行命令/脚本</Label>
                <Input id="task-command" placeholder="输入执行命令或脚本路径" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-description">任务描述</Label>
                <Input id="task-description" placeholder="输入任务描述" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>执行频率</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择执行频率" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">一次性</SelectItem>
                    <SelectItem value="hourly">每小时</SelectItem>
                    <SelectItem value="daily">每天</SelectItem>
                    <SelectItem value="weekly">每周</SelectItem>
                    <SelectItem value="monthly">每月</SelectItem>
                    <SelectItem value="custom">自定义</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>开始日期</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "yyyy-MM-dd") : "选择日期"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>开始时间</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择时间" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, hour) => (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {`${hour.toString().padStart(2, "0")}:00`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>重复选项</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-mon" />
                    <label
                      htmlFor="repeat-mon"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周一
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-tue" />
                    <label
                      htmlFor="repeat-tue"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周二
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-wed" />
                    <label
                      htmlFor="repeat-wed"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周三
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-thu" />
                    <label
                      htmlFor="repeat-thu"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周四
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-fri" />
                    <label
                      htmlFor="repeat-fri"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周五
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-sat" />
                    <label
                      htmlFor="repeat-sat"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周六
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-sun" />
                    <label
                      htmlFor="repeat-sun"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周日
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>高级选项</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="option-timeout" />
                    <label
                      htmlFor="option-timeout"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      设置超时时间
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="option-retry" />
                    <label
                      htmlFor="option-retry"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      失败自动重试
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="option-notify" />
                    <label
                      htmlFor="option-notify"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      执行结果通知
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline">取消</Button>
            <Button>保存任务</Button>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adv-task-name">任务名称</Label>
                <Input id="adv-task-name" placeholder="输入任务名称" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adv-task-type">任务类型</Label>
                <Select>
                  <SelectTrigger id="adv-task-type">
                    <SelectValue placeholder="选择任务类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">系统任务</SelectItem>
                    <SelectItem value="analytics">分析任务</SelectItem>
                    <SelectItem value="ai">AI任务</SelectItem>
                    <SelectItem value="custom">自定义任务</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adv-cron">Cron 表达式</Label>
                <Input id="adv-cron" placeholder="*/5 * * * *" />
                <p className="text-xs text-muted-foreground">使用标准 cron 表达式设置执行计划</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adv-timeout">超时时间 (秒)</Label>
                <Input id="adv-timeout" type="number" placeholder="300" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adv-retry">重试次数</Label>
                <Input id="adv-retry" type="number" placeholder="3" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adv-command">执行命令/脚本</Label>
                <Input id="adv-command" placeholder="输入执行命令或脚本路径" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adv-params">参数</Label>
                <Input id="adv-params" placeholder="--verbose --output=/tmp/result.json" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adv-env">环境变量</Label>
                <Input id="adv-env" placeholder="KEY1=value1,KEY2=value2" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adv-working-dir">工作目录</Label>
                <Input id="adv-working-dir" placeholder="/app/scripts" />
              </div>

              <div className="space-y-2">
                <Label>通知设置</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-success" />
                    <label
                      htmlFor="notify-success"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      成功时通知
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-failure" defaultChecked />
                    <label
                      htmlFor="notify-failure"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      失败时通知
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-timeout" />
                    <label
                      htmlFor="notify-timeout"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      超时时通知
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline">取消</Button>
            <Button>保存任务</Button>
          </div>
        </TabsContent>

        <TabsContent value="dependencies" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>前置任务</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择前置任务" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="task1">数据备份任务</SelectItem>
                  <SelectItem value="task2">日志清理任务</SelectItem>
                  <SelectItem value="task3">数据分析任务</SelectItem>
                  <SelectItem value="task4">报告生成任务</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="mt-2 w-full">
                添加前置任务
              </Button>
            </div>

            <div className="space-y-2">
              <Label>依赖条件</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择依赖条件" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="success">成功后执行</SelectItem>
                  <SelectItem value="failure">失败后执行</SelectItem>
                  <SelectItem value="always">无论结果都执行</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>后续任务</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择后续任务" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="task5">数据导出任务</SelectItem>
                  <SelectItem value="task6">邮件通知任务</SelectItem>
                  <SelectItem value="task7">系统优化任务</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="mt-2 w-full">
                添加后续任务
              </Button>
            </div>

            <div className="space-y-2">
              <Label>任务流程图</Label>
              <div className="h-64 border rounded-md p-4 bg-muted/20 flex items-center justify-center">
                <p className="text-muted-foreground">任务依赖流程图将在此处显示</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline">取消</Button>
            <Button>保存依赖关系</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
