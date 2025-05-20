"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Info, AlertTriangle, ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function NavigationAnalysis() {
  const [activeTab, setActiveTab] = useState("completeness")

  const completenessScore = 92
  const complianceScore = 88
  const consistencyScore = 90
  const optimizationScore = 85

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">言语医枢³系统导航结构分析</h1>
        <p className="text-muted-foreground">全面评估系统导航的功能完整性、合规性、统一性和分类优化情况</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <ScoreCard
          title="功能完整性"
          score={completenessScore}
          description="系统功能覆盖度评分"
          icon={<CheckCircle className="h-5 w-5" />}
          color="text-green-500"
          active={activeTab === "completeness"}
          onClick={() => setActiveTab("completeness")}
        />
        <ScoreCard
          title="合规性"
          score={complianceScore}
          description="医疗法规标准符合度"
          icon={<AlertCircle className="h-5 w-5" />}
          color="text-blue-500"
          active={activeTab === "compliance"}
          onClick={() => setActiveTab("compliance")}
        />
        <ScoreCard
          title="统一性"
          score={consistencyScore}
          description="命名与分类一致性评分"
          icon={<Info className="h-5 w-5" />}
          color="text-purple-500"
          active={activeTab === "consistency"}
          onClick={() => setActiveTab("consistency")}
        />
        <ScoreCard
          title="分类优化"
          score={optimizationScore}
          description="导航结构优化程度评分"
          icon={<AlertTriangle className="h-5 w-5" />}
          color="text-amber-500"
          active={activeTab === "optimization"}
          onClick={() => setActiveTab("optimization")}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="completeness">功能完整性</TabsTrigger>
          <TabsTrigger value="compliance">合规性</TabsTrigger>
          <TabsTrigger value="consistency">统一性</TabsTrigger>
          <TabsTrigger value="optimization">分类优化</TabsTrigger>
        </TabsList>

        <TabsContent value="completeness">
          <Card>
            <CardHeader>
              <CardTitle>功能完整性分析</CardTitle>
              <CardDescription>评估系统是否涵盖了医疗信息系统所需的所有关键功能</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">优势</h3>
                  <ul className="space-y-2">
                    <AnalysisItem status="positive">
                      全面覆盖了医疗核心业务流程（诊断、患者管理、临床决策、药物管理等）
                    </AnalysisItem>
                    <AnalysisItem status="positive">包含了AI辅助诊断和模型管理的先进功能</AnalysisItem>
                    <AnalysisItem status="positive">提供了完整的研究支持功能，满足医学研究需求</AnalysisItem>
                    <AnalysisItem status="positive">包含了远程会诊功能，支持远程医疗服务</AnalysisItem>
                    <AnalysisItem status="positive">提供了资质验证和安全管理功能，保障系统安全性</AnalysisItem>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">不足</h3>
                  <ul className="space-y-2">
                    <AnalysisItem status="negative">缺少医保结算和财务管理相关功能</AnalysisItem>
                    <AnalysisItem status="negative">未见明确的患者门户或患者自助服务功能</AnalysisItem>
                    <AnalysisItem status="negative">缺少医院运营管理相关功能（如床位管理、手术排程等）</AnalysisItem>
                    <AnalysisItem status="warning">应急预案和灾难恢复功能未明确体现</AnalysisItem>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">建议</h3>
                  <ul className="space-y-2">
                    <AnalysisItem status="info">考虑增加医保结算和财务管理模块</AnalysisItem>
                    <AnalysisItem status="info">添加患者门户功能，提供患者自助服务</AnalysisItem>
                    <AnalysisItem status="info">增加医院运营管理相关功能</AnalysisItem>
                    <AnalysisItem status="info">明确应急预案和灾难恢复功能的位置</AnalysisItem>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>合规性分析</CardTitle>
              <CardDescription>评估系统是否符合医疗行业的法规和标准要求</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">优势</h3>
                  <ul className="space-y-2">
                    <AnalysisItem status="positive">包含了数据安全和访问控制功能，符合医疗数据保护要求</AnalysisItem>
                    <AnalysisItem status="positive">提供了审计日志功能，支持系统操作追踪</AnalysisItem>
                    <AnalysisItem status="positive">包含资质验证功能，确保医疗人员资质合规</AnalysisItem>
                    <AnalysisItem status="positive">提供了合规管理功能，有助于满足监管要求</AnalysisItem>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">不足</h3>
                  <ul className="space-y-2">
                    <AnalysisItem status="negative">未明确患者隐私保护和知情同意管理功能</AnalysisItem>
                    <AnalysisItem status="negative">缺少专门的数据脱敏和匿名化处理功能</AnalysisItem>
                    <AnalysisItem status="warning">未见明确的监管报告生成功能</AnalysisItem>
                    <AnalysisItem status="warning">缺少针对特定法规（如GDPR、HIPAA等）的合规检查功能</AnalysisItem>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">建议</h3>
                  <ul className="space-y-2">
                    <AnalysisItem status="info">增加患者隐私保护和知情同意管理功能</AnalysisItem>
                    <AnalysisItem status="info">添加数据脱敏和匿名化处理功能</AnalysisItem>
                    <AnalysisItem status="info">增加监管报告生成功能</AnalysisItem>
                    <AnalysisItem status="info">添加针对特定法规的合规检查功能</AnalysisItem>
                    <AnalysisItem status="info">在"合规管理"下增加更详细的子功能</AnalysisItem>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consistency">
          <Card>
            <CardHeader>
              <CardTitle>统一性分析</CardTitle>
              <CardDescription>评估系统导航的命名和分类是否一致</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">优势</h3>
                  <ul className="space-y-2">
                    <AnalysisItem status="positive">一级导航使用简洁的两字词组，保持了一致性</AnalysisItem>
                    <AnalysisItem status="positive">二级导航命名风格统一，多为动宾结构</AnalysisItem>
                    <AnalysisItem status="positive">相关功能分组合理，逻辑清晰</AnalysisItem>
                    <AnalysisItem status="positive">术语使用一致，避免了同义词混用</AnalysisItem>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">不足</h3>
                  <ul className="space-y-2">
                    <AnalysisItem status="negative">
                      "资质验证"下的"API配置"与其他子项不一致，更适合放在系统管理下
                    </AnalysisItem>
                    <AnalysisItem status="warning">
                      "系统管理"下的子项较多，可能导致用户难以快速找到所需功能
                    </AnalysisItem>
                    <AnalysisItem status="warning">部分二级导航命名不够具体，如"数据分析"、"数据导入"等</AnalysisItem>
                    <AnalysisItem status="warning">"系统主页"作为一级导航项，与其他功能模块的定位不同</AnalysisItem>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">建议</h3>
                  <ul className="space-y-2">
                    <AnalysisItem status="info">将"API配置"移至"系统管理"下</AnalysisItem>
                    <AnalysisItem status="info">重新组织"系统管理"下的子项，可考虑进一步分类</AnalysisItem>
                    <AnalysisItem status="info">使二级导航命名更具体，如"健康数据分析"、"患者数据导入"等</AnalysisItem>
                    <AnalysisItem status="info">将"系统主页"改为固定的首页入口，不作为常规导航项</AnalysisItem>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <Card>
            <CardHeader>
              <CardTitle>分类优化分析</CardTitle>
              <CardDescription>评估导航结构的合理性，提供优化建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">优势</h3>
                  <ul className="space-y-2">
                    <AnalysisItem status="positive">导航结构层次清晰，一级导航和二级导航划分合理</AnalysisItem>
                    <AnalysisItem status="positive">功能分组符合医疗业务流程，便于用户理解</AnalysisItem>
                    <AnalysisItem status="positive">相关功能集中在同一导航组下，减少用户查找成本</AnalysisItem>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">不足</h3>
                  <ul className="space-y-2">
                    <AnalysisItem status="negative">
                      一级导航项过多（13项），超出了用户认知负荷的最佳范围（7±2项）
                    </AnalysisItem>
                    <AnalysisItem status="negative">部分功能存在重叠，如"临床决策"和"智能诊断"有相似之处</AnalysisItem>
                    <AnalysisItem status="warning">"系统管理"下的子项过多且分类不够细化</AnalysisItem>
                    <AnalysisItem status="warning">缺少基于用户角色的导航视图定制</AnalysisItem>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">建议</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>重组一级导航，减少项目数量</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-4">
                          <p className="text-sm">建议将一级导航重组为以下几类：</p>
                          <ul className="space-y-1 list-disc pl-5 text-sm">
                            <li>临床工作站（合并智能诊断、临床决策）</li>
                            <li>患者管理（保持不变）</li>
                            <li>医疗资源（合并药物管理、健康数据）</li>
                            <li>远程医疗（合并远程会诊、移动应用）</li>
                            <li>医学研究（保持不变）</li>
                            <li>系统集成（合并电子病历、资质验证）</li>
                            <li>安全与合规（合并数据安全、部分系统管理功能）</li>
                            <li>系统管理（精简后保留）</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>优化二级导航分组</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-4">
                          <p className="text-sm">建议对以下二级导航进行优化：</p>
                          <ul className="space-y-1 list-disc pl-5 text-sm">
                            <li>将"系统管理"下的功能按照"系统配置"、"用户权限"、"运维管理"、"数据管理"等进行分组</li>
                            <li>将"API配置"从"资质验证"移至"系统管理"下的"系统集成"分组</li>
                            <li>将"智能诊断"和"临床决策"下的相似功能合并，避免重复</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>引入角色导航视图</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-4">
                          <p className="text-sm">建议为不同角色提供定制化导航视图：</p>
                          <ul className="space-y-1 list-disc pl-5 text-sm">
                            <li>医生视图：突出临床工作站、患者管理、医疗资源等功能</li>
                            <li>研究人员视图：突出医学研究、数据分析等功能</li>
                            <li>管理人员视图：突出统计分析、系统管理等功能</li>
                            <li>IT人员视图：突出系统管理、安全与合规等功能</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>添加常用功能快捷访问</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-4">
                          <p className="text-sm">建议添加以下快捷访问功能：</p>
                          <ul className="space-y-1 list-disc pl-5 text-sm">
                            <li>在系统主页提供个性化的常用功能快捷方式</li>
                            <li>允许用户自定义常用功能列表</li>
                            <li>提供最近访问功能的历史记录</li>
                            <li>根据用户使用频率自动调整导航项的显示顺序</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">优化后的导航结构示例</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>优化前</CardTitle>
              <CardDescription>当前导航结构（13个一级导航）</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <NavigationItem title="系统主页" />
                <NavigationItem
                  title="智能诊断"
                  subItems={["诊断中心", "模型管理", "诊断记录", "模型训练", "性能分析", "模型部署"]}
                />
                <NavigationItem title="患者管理" subItems={["患者列表", "病历管理", "随访计划", "患者分组"]} />
                <NavigationItem title="临床决策" subItems={["决策支持", "治疗方案", "临床指南", "药物参考"]} />
                <NavigationItem title="药物管理" subItems={["药品目录", "处方管理", "药物互作", "库存管理"]} />
                <NavigationItem title="健康数据" subItems={["生命体征", "检测结果", "趋势分析", "数据导入"]} />
                <NavigationItem title="医学研究" subItems={["研究项目", "数据分析", "样本管理", "试验设计"]} />
                <NavigationItem
                  title="资质验证"
                  subItems={["资质概览", "资质上传", "验证状态", "资质管理", "验证机构", "API配置"]}
                />
                <NavigationItem title="数据安全" subItems={["安全概览", "访问控制", "审计日志", "合规管理"]} />
                <NavigationItem title="移动应用" subItems={["应用概览", "功能管理", "用户反馈", "版本发布"]} />
                <NavigationItem title="电子病历" subItems={["集成概览", "数据映射", "同步状态", "系统连接"]} />
                <NavigationItem title="远程会诊" subItems={["会诊中心", "排程管理", "专家网络", "会诊记录"]} />
                <NavigationItem title="统计分析" subItems={["数据概览", "趋势报告", "分布分析", "预测模型"]} />
                <NavigationItem
                  title="系统管理"
                  subItems={["系统设置", "角色权限", "系统日志", "数据备份", "计划任务", "通知管理", "部署检查"]}
                />
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>优化后</CardTitle>
              <CardDescription>建议导航结构（8个一级导航）</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <NavigationItem
                  title="临床工作站"
                  subItems={["智能诊断", "临床决策", "治疗方案", "诊断记录", "AI模型管理"]}
                />
                <NavigationItem
                  title="患者管理"
                  subItems={["患者列表", "病历管理", "随访计划", "患者分组", "患者门户"]}
                />
                <NavigationItem
                  title="医疗资源"
                  subItems={["药品管理", "健康数据", "检测结果", "医疗设备", "资源调度"]}
                />
                <NavigationItem
                  title="远程医疗"
                  subItems={["远程会诊", "移动应用", "排程管理", "专家网络", "会诊记录"]}
                />
                <NavigationItem
                  title="医学研究"
                  subItems={["研究项目", "数据分析", "样本管理", "试验设计", "成果管理"]}
                />
                <NavigationItem
                  title="系统集成"
                  subItems={["电子病历", "资质验证", "数据映射", "接口管理", "集成监控"]}
                />
                <NavigationItem
                  title="安全与合规"
                  subItems={["安全管理", "访问控制", "审计日志", "合规检查", "隐私保护"]}
                />
                <NavigationItem
                  title="系统管理"
                  subItems={[
                    { title: "系统配置", items: ["基础设置", "参数配置", "界面定制"] },
                    { title: "用户权限", items: ["用户管理", "角色管理", "权限分配"] },
                    { title: "运维管理", items: ["系统监控", "性能优化", "日志管理"] },
                    { title: "数据管理", items: ["数据备份", "数据恢复", "数据归档"] },
                  ]}
                />
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface ScoreCardProps {
  title: string
  score: number
  description: string
  icon: React.ReactNode
  color: string
  active: boolean
  onClick: () => void
}

function ScoreCard({ title, score, description, icon, color, active, onClick }: ScoreCardProps) {
  return (
    <Card className={`cursor-pointer transition-all ${active ? "ring-2 ring-primary" : ""}`} onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className={color}>{icon}</div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">得分</span>
            <span className="font-medium">{score}/100</span>
          </div>
          <Progress value={score} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

interface AnalysisItemProps {
  children: React.ReactNode
  status: "positive" | "negative" | "warning" | "info"
}

function AnalysisItem({ children, status }: AnalysisItemProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "positive":
        return {
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          bg: "bg-green-50",
          border: "border-green-200",
        }
      case "negative":
        return { icon: <AlertCircle className="h-4 w-4 text-red-500" />, bg: "bg-red-50", border: "border-red-200" }
      case "warning":
        return {
          icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
          bg: "bg-amber-50",
          border: "border-amber-200",
        }
      case "info":
        return { icon: <ArrowRight className="h-4 w-4 text-blue-500" />, bg: "bg-blue-50", border: "border-blue-200" }
      default:
        return { icon: <Info className="h-4 w-4 text-gray-500" />, bg: "bg-gray-50", border: "border-gray-200" }
    }
  }

  const { icon, bg, border } = getStatusConfig()

  return (
    <li className={`flex items-start gap-2 p-2 rounded-md ${bg} ${border} border`}>
      <div className="mt-0.5">{icon}</div>
      <div className="text-sm">{children}</div>
    </li>
  )
}

interface NavigationItemProps {
  title: string
  subItems?: (string | { title: string; items: string[] })[]
}

function NavigationItem({ title, subItems }: NavigationItemProps) {
  return (
    <li>
      <div className="font-medium">{title}</div>
      {subItems && (
        <ul className="mt-1 pl-4 space-y-1">
          {subItems.map((item, index) =>
            typeof item === "string" ? (
              <li key={index} className="text-sm text-muted-foreground">
                {item}
              </li>
            ) : (
              <li key={index} className="mt-2">
                <div className="text-sm font-medium">{item.title}</div>
                <ul className="pl-3 mt-1 space-y-1">
                  {item.items.map((subItem, subIndex) => (
                    <li key={subIndex} className="text-xs text-muted-foreground">
                      {subItem}
                    </li>
                  ))}
                </ul>
              </li>
            ),
          )}
        </ul>
      )}
    </li>
  )
}
