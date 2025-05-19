"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit } from "lucide-react"

// 模拟任务数据
const taskData = {
  id: "TASK-2024-201",
  name: "每日数据备份",
  type: "system",
  scheduleType: "daily",
  time: "02:00",
  description: "执行全系统数据备份，包括患者数据、医疗记录和系统配置",
  priority: "high",
  notify: true,
}

export function EditTaskDialog({ taskId, trigger }) {
  const [open, setOpen] = useState(false)
  const [task, setTask] = useState(taskData)
  const [scheduleType, setScheduleType] = useState(taskData.scheduleType)
  const [startDate, setStartDate] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // 处理任务更新逻辑
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            编辑
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>编辑任务</DialogTitle>
            <DialogDescription>修改任务 {task.id} 的信息</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-name" className="text-right">
                任务名称
              </Label>
              <Input
                id="task-name"
                value={task.name}
                onChange={(e) => setTask({ ...task, name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-type" className="text-right">
                任务类型
              </Label>
              <Select value={task.type} onValueChange={(value) => setTask({ ...task, type: value })} required>
                <SelectTrigger id="task-type" className="col-span-3">
                  <SelectValue placeholder="选择任务类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">系统维护</SelectItem>
                  <SelectItem value="data">数据处理</SelectItem>
                  <SelectItem value="ai">AI处理</SelectItem>
                  <SelectItem value="report">报告生成</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="schedule-type" className="text-right">
                执行计划
              </Label>
              <Select value={scheduleType} onValueChange={setScheduleType} required>
                <SelectTrigger id="schedule-type" className="col-span-3">
                  <SelectValue placeholder="选择执行计划" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once">单次执行</SelectItem>
                  <SelectItem value="daily">每日执行</SelectItem>
                  <SelectItem value="weekly">每周执行</SelectItem>
                  <SelectItem value="monthly">每月执行</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {scheduleType === "once" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start-date" className="text-right">
                  执行日期
                </Label>
                <div className="col-span-3">
                  <DatePicker value={startDate} onChange={setStartDate} placeholder="选择执行日期" />
                </div>
              </div>
            )}

            {scheduleType !== "once" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  执行时间
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={task.time}
                  onChange={(e) => setTask({ ...task, time: e.target.value })}
                  className="col-span-3"
                  required={scheduleType !== "once"}
                />
              </div>
            )}

            {scheduleType === "weekly" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">执行日</Label>
                <div className="col-span-3 flex flex-wrap gap-2">
                  {["周一", "周二", "周三", "周四", "周五", "周六", "周日"].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox id={`day-${day}`} />
                      <label
                        htmlFor={`day-${day}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scheduleType === "monthly" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="day-of-month" className="text-right">
                  执行日期
                </Label>
                <Input
                  id="day-of-month"
                  type="number"
                  min="1"
                  max="31"
                  placeholder="月中的第几天"
                  className="col-span-3"
                  required={scheduleType === "monthly"}
                />
              </div>
            )}

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">
                任务描述
              </Label>
              <Textarea
                id="description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                className="col-span-3"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                优先级
              </Label>
              <Select value={task.priority} onValueChange={(value) => setTask({ ...task, priority: value })}>
                <SelectTrigger id="priority" className="col-span-3">
                  <SelectValue placeholder="选择优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">低</SelectItem>
                  <SelectItem value="normal">普通</SelectItem>
                  <SelectItem value="high">高</SelectItem>
                  <SelectItem value="urgent">紧急</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <div></div>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox
                  id="notify"
                  checked={task.notify}
                  onCheckedChange={(checked) => setTask({ ...task, notify: checked })}
                />
                <label
                  htmlFor="notify"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  任务完成后发送通知
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button type="submit">保存更改</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTaskDialog
