"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { MedicalCard } from "@/components/ui/medical-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Users, MapPin } from "lucide-react"

export function TrainingSchedule() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [location, setLocation] = useState<string>("all")

  // 模拟培训日程数据
  const trainingEvents = [
    {
      id: 1,
      title: "系统基础功能培训",
      date: "2025-05-25",
      startTime: "09:00",
      endTime: "12:00",
      location: "线上",
      trainer: "张医师",
      targetAudience: "所有用户",
      availableSeats: 30,
      registeredUsers: 18,
    },
    {
      id: 2,
      title: "临床医生AI诊断系统培训",
      date: "2025-05-26",
      startTime: "14:00",
      endTime: "17:00",
      location: "线上",
      trainer: "李教授",
      targetAudience: "临床医生",
      availableSeats: 20,
      registeredUsers: 15,
    },
    {
      id: 3,
      title: "系统管理员权限配置培训",
      date: "2025-05-27",
      startTime: "10:00",
      endTime: "12:00",
      location: "线下 - 培训中心A",
      trainer: "王工程师",
      targetAudience: "系统管理员",
      availableSeats: 15,
      registeredUsers: 8,
    },
    {
      id: 4,
      title: "护理人员记录系统培训",
      date: "2025-05-28",
      startTime: "09:30",
      endTime: "11:30",
      location: "线下 - 培训中心B",
      trainer: "赵护士长",
      targetAudience: "护理人员",
      availableSeats: 25,
      registeredUsers: 20,
    },
    {
      id: 5,
      title: "研究人员数据分析工具培训",
      date: "2025-05-29",
      startTime: "13:30",
      endTime: "16:30",
      location: "线上",
      trainer: "陈研究员",
      targetAudience: "研究人员",
      availableSeats: 18,
      registeredUsers: 12,
    },
    {
      id: 6,
      title: "技术人员系统维护培训",
      date: "2025-05-30",
      startTime: "10:00",
      endTime: "15:00",
      location: "线下 - 技术中心",
      trainer: "刘工程师",
      targetAudience: "技术人员",
      availableSeats: 12,
      registeredUsers: 10,
    },
  ]

  // 根据选择的位置筛选培训事件
  const filteredEvents =
    location === "all"
      ? trainingEvents
      : trainingEvents.filter((event) =>
          location === "online" ? event.location === "线上" : event.location.includes("线下"),
        )

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <MedicalCard className="md:col-span-1">
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4">培训日历</h3>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">培训地点</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="选择培训地点" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有地点</SelectItem>
                <SelectItem value="online">线上培训</SelectItem>
                <SelectItem value="offline">线下培训</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6 space-y-2">
            <h4 className="font-medium">培训类型说明</h4>
            <div className="flex items-center text-sm">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>线上培训 - 通过视频会议系统进行</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>线下培训 - 在指定培训中心进行</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span>混合培训 - 线上线下同时进行</span>
            </div>
          </div>
        </div>
      </MedicalCard>

      <MedicalCard className="md:col-span-2">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">即将开始的培训</h3>
            <Button variant="outline" size="sm">
              查看全部
            </Button>
          </div>

          <div className="space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className="border rounded-lg overflow-hidden">
                  <div className={`p-3 ${event.location.includes("线下") ? "bg-green-50" : "bg-blue-50"}`}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">{event.title}</h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          event.location.includes("线下") ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {event.location.includes("线下") ? "线下培训" : "线上培训"}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{event.targetAudience}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-gray-600">培训师: </span>
                        <span className="font-medium">{event.trainer}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">名额: </span>
                        <span className="font-medium">
                          {event.registeredUsers}/{event.availableSeats}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button
                        size="sm"
                        variant={event.registeredUsers >= event.availableSeats ? "outline" : "default"}
                        disabled={event.registeredUsers >= event.availableSeats}
                      >
                        {event.registeredUsers >= event.availableSeats ? "名额已满" : "立即报名"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">没有找到符合条件的培训课程</div>
            )}
          </div>
        </div>
      </MedicalCard>
    </div>
  )
}
