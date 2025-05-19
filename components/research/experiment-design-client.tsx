"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Save,
  Copy,
  FileText,
  Users,
  Calendar,
  FlaskConical,
  Beaker,
  Microscope,
  BarChart,
  ClipboardList,
  Share2,
  Plus,
} from "lucide-react"

export function ExperimentDesignClient() {
  const [activeTab, setActiveTab] = useState("basic")
  const [experimentType, setExperimentType] = useState("clinical")
  const [savedTemplates, setSavedTemplates] = useState([
    { id: 1, name: "临床试验模板A", type: "clinical", createdAt: "2023-05-10" },
    { id: 2, name: "实验室研究模板B", type: "laboratory", createdAt: "2023-04-22" },
    { id: 3, name: "观察性研究模板C", type: "observational", createdAt: "2023-05-18" },
  ])

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">基本信息</span>
          </TabsTrigger>
          <TabsTrigger value="design" className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            <span className="hidden sm:inline">实验设计</span>
          </TabsTrigger>
          <TabsTrigger value="participants" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">参与者</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">时间安排</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">模板</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>实验基本信息</CardTitle>
              <CardDescription>填写实验的基本信息和描述</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experiment-title">实验标题</Label>
                  <Input id="experiment-title" placeholder="输入实验标题" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experiment-type">实验类型</Label>
                  <Select value={experimentType} onValueChange={setExperimentType}>
                    <SelectTrigger id="experiment-type">
                      <SelectValue placeholder="选择实验类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clinical">临床试验</SelectItem>
                      <SelectItem value="laboratory">实验室研究</SelectItem>
                      <SelectItem value="observational">观察性研究</SelectItem>
                      <SelectItem value="animal">动物实验</SelectItem>
                      <SelectItem value="other">其他类型</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experiment-description">实验描述</Label>
                <Textarea id="experiment-description" placeholder="详细描述实验目的、背景和意义" rows={4} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="principal-investigator">主要研究者</Label>
                  <Input id="principal-investigator" placeholder="输入主要研究者姓名" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">所属部门</Label>
                  <Input id="department" placeholder="输入所属部门" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">计划开始日期</Label>
                  <Input id="start-date" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">计划结束日期</Label>
                  <Input id="end-date" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimated-duration">预计持续时间（天）</Label>
                  <Input id="estimated-duration" type="number" min="1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">关键词</Label>
                <Input id="keywords" placeholder="输入关键词，用逗号分隔" />
                <p className="text-sm text-gray-500 mt-1">添加关键词有助于更好地分类和检索实验</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">取消</Button>
              <Button onClick={() => setActiveTab("design")}>下一步：实验设计</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>实验设计</CardTitle>
              <CardDescription>定义实验的设计方法、变量和测量指标</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="design-method">研究设计方法</Label>
                <Select>
                  <SelectTrigger id="design-method">
                    <SelectValue placeholder="选择研究设计方法" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="randomized">随机对照试验</SelectItem>
                    <SelectItem value="cohort">队列研究</SelectItem>
                    <SelectItem value="case-control">病例对照研究</SelectItem>
                    <SelectItem value="cross-sectional">横断面研究</SelectItem>
                    <SelectItem value="longitudinal">纵向研究</SelectItem>
                    <SelectItem value="other">其他方法</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hypothesis">研究假设</Label>
                <Textarea id="hypothesis" placeholder="描述研究假设" rows={3} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="independent-variables">自变量</Label>
                  <Textarea id="independent-variables" placeholder="列出实验的自变量" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dependent-variables">因变量</Label>
                  <Textarea id="dependent-variables" placeholder="列出实验的因变量" rows={3} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="control-variables">控制变量</Label>
                <Textarea id="control-variables" placeholder="列出需要控制的变量" rows={3} />
              </div>

              <div className="space-y-2">
                <Label>实验分组</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="group-number">分组数量</Label>
                    <Input id="group-number" type="number" min="1" defaultValue="2" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allocation-method">分配方法</Label>
                    <Select>
                      <SelectTrigger id="allocation-method">
                        <SelectValue placeholder="选择分配方法" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="random">随机分配</SelectItem>
                        <SelectItem value="stratified">分层随机</SelectItem>
                        <SelectItem value="matched">匹配分配</SelectItem>
                        <SelectItem value="other">其他方法</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>盲法设置</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="single-blind" />
                    <Label htmlFor="single-blind" className="font-normal">
                      单盲（参与者不知道分组）
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="double-blind" />
                    <Label htmlFor="double-blind" className="font-normal">
                      双盲（参与者和研究者不知道分组）
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="triple-blind" />
                    <Label htmlFor="triple-blind" className="font-normal">
                      三盲（参与者、研究者和数据分析者不知道分组）
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="open-label" />
                    <Label htmlFor="open-label" className="font-normal">
                      开放标签（所有人都知道分组）
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="measurement-methods">测量方法</Label>
                <Textarea id="measurement-methods" placeholder="描述将使用的测量方法和工具" rows={3} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("basic")}>
                上一步
              </Button>
              <Button onClick={() => setActiveTab("participants")}>下一步：参与者</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="participants" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>参与者信息</CardTitle>
              <CardDescription>定义研究参与者的选择标准和样本量</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sample-size">样本量</Label>
                <Input id="sample-size" type="number" min="1" />
                <p className="text-sm text-gray-500 mt-1">预计招募的参与者总数</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inclusion-criteria">纳入标准</Label>
                  <Textarea id="inclusion-criteria" placeholder="列出参与者的纳入标准" rows={4} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exclusion-criteria">排除标准</Label>
                  <Textarea id="exclusion-criteria" placeholder="列出参与者的排除标准" rows={4} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>人口统计学特征</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age-range">年龄范围</Label>
                    <div className="flex items-center gap-2">
                      <Input id="age-min" type="number" min="0" placeholder="最小" />
                      <span>-</span>
                      <Input id="age-max" type="number" min="0" placeholder="最大" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">性别</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="选择性别要求" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">不限</SelectItem>
                        <SelectItem value="male">仅男性</SelectItem>
                        <SelectItem value="female">仅女性</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ethnicity">民族/种族</Label>
                    <Select>
                      <SelectTrigger id="ethnicity">
                        <SelectValue placeholder="选择民族/种族要求" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">不限</SelectItem>
                        <SelectItem value="specific">特定要求</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recruitment-method">招募方法</Label>
                <Textarea id="recruitment-method" placeholder="描述如何招募参与者" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="informed-consent">知情同意流程</Label>
                <Textarea id="informed-consent" placeholder="描述知情同意的获取流程" rows={3} />
              </div>

              <div className="space-y-2">
                <Label>伦理审查</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ethics-approval" />
                  <Label htmlFor="ethics-approval" className="font-normal">
                    本研究需要伦理委员会批准
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("design")}>
                上一步
              </Button>
              <Button onClick={() => setActiveTab("schedule")}>下一步：时间安排</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>时间安排</CardTitle>
              <CardDescription>规划实验的时间节点和里程碑</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>实验阶段</Label>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor="phase1-name">阶段名称</Label>
                      <Input id="phase1-name" defaultValue="准备阶段" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phase1-start">开始日期</Label>
                      <Input id="phase1-start" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phase1-end">结束日期</Label>
                      <Input id="phase1-end" type="date" />
                    </div>
                    <div className="md:col-span-3 space-y-2">
                      <Label htmlFor="phase1-description">描述</Label>
                      <Textarea id="phase1-description" placeholder="描述此阶段的主要任务和目标" rows={2} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor="phase2-name">阶段名称</Label>
                      <Input id="phase2-name" defaultValue="实施阶段" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phase2-start">开始日期</Label>
                      <Input id="phase2-start" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phase2-end">结束日期</Label>
                      <Input id="phase2-end" type="date" />
                    </div>
                    <div className="md:col-span-3 space-y-2">
                      <Label htmlFor="phase2-description">描述</Label>
                      <Textarea id="phase2-description" placeholder="描述此阶段的主要任务和目标" rows={2} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor="phase3-name">阶段名称</Label>
                      <Input id="phase3-name" defaultValue="分析阶段" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phase3-start">开始日期</Label>
                      <Input id="phase3-start" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phase3-end">结束日期</Label>
                      <Input id="phase3-end" type="date" />
                    </div>
                    <div className="md:col-span-3 space-y-2">
                      <Label htmlFor="phase3-description">描述</Label>
                      <Textarea id="phase3-description" placeholder="描述此阶段的主要任务和目标" rows={2} />
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    添加阶段
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="milestones">关键里程碑</Label>
                <Textarea id="milestones" placeholder="列出实验的关键里程碑和预期完成日期" rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="follow-up">随访计划</Label>
                <Textarea id="follow-up" placeholder="描述实验后的随访计划和时间点" rows={3} />
              </div>

              <div className="space-y-2">
                <Label>数据收集时间点</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="baseline" />
                    <Label htmlFor="baseline" className="font-normal">
                      基线（实验开始前）
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="during-experiment" />
                    <Label htmlFor="during-experiment" className="font-normal">
                      实验期间（多个时间点）
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="end-experiment" />
                    <Label htmlFor="end-experiment" className="font-normal">
                      实验结束时
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="follow-up-points" />
                    <Label htmlFor="follow-up-points" className="font-normal">
                      随访时间点
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("participants")}>
                上一步
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setActiveTab("templates")}>
                  保存为模板
                </Button>
                <Button>完成设计</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>保存的模板</CardTitle>
                <CardDescription>查看和管理已保存的实验设计模板</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          {template.type === "clinical" && <Beaker className="h-5 w-5 text-blue-600" />}
                          {template.type === "laboratory" && <Microscope className="h-5 w-5 text-blue-600" />}
                          {template.type === "observational" && <BarChart className="h-5 w-5 text-blue-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-gray-500">创建于 {template.createdAt}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>保存当前设计</CardTitle>
                <CardDescription>将当前实验设计保存为模板</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">模板名称</Label>
                  <Input id="template-name" placeholder="输入模板名称" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template-description">模板描述</Label>
                  <Textarea id="template-description" placeholder="简要描述此模板的用途" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>共享设置</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="private-template" defaultChecked />
                      <Label htmlFor="private-template" className="font-normal">
                        私有（仅自己可见）
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="team-template" />
                      <Label htmlFor="team-template" className="font-normal">
                        团队共享（团队成员可见）
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="public-template" />
                      <Label htmlFor="public-template" className="font-normal">
                        公开（所有人可见）
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  保存模板
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ExperimentDesignClient
