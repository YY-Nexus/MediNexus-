"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Plus,
  Trash2,
  Edit,
  X,
  CheckCircle,
  AlertTriangle,
  Database,
  FileText,
  Download,
  Upload,
  Play,
} from "lucide-react"

// 模拟数据源和目标系统
const dataSources = [
  { id: "his-001", name: "中心医院HIS", type: "HIS", fields: 156 },
  { id: "emr-002", name: "社区医疗EMR", type: "EMR", fields: 89 },
  { id: "lis-003", name: "检验科LIS", type: "LIS", fields: 67 },
  { id: "pacs-004", name: "影像科PACS", type: "PACS", fields: 45 },
]

const targetSystems = [
  { id: "fhir-r4", name: "FHIR R4标准", type: "Standard", fields: 234 },
  { id: "hl7-v25", name: "HL7 v2.5标准", type: "Standard", fields: 178 },
  { id: "central-db", name: "中央数据库", type: "Database", fields: 312 },
]

// 模拟字段映射配置
const fieldMappings = [
  {
    id: "map-001",
    sourceSystem: "his-001",
    targetSystem: "fhir-r4",
    sourceField: "patient_id",
    targetField: "Patient.id",
    dataType: "string",
    transformation: "direct",
    validation: "required",
    status: "active",
    description: "患者唯一标识符",
  },
  {
    id: "map-002",
    sourceSystem: "his-001",
    targetSystem: "fhir-r4",
    sourceField: "patient_name",
    targetField: "Patient.name.given",
    dataType: "string",
    transformation: "split",
    validation: "required",
    status: "active",
    description: "患者姓名",
  },
  {
    id: "map-003",
    sourceSystem: "his-001",
    targetSystem: "fhir-r4",
    sourceField: "birth_date",
    targetField: "Patient.birthDate",
    dataType: "date",
    transformation: "format",
    validation: "date",
    status: "active",
    description: "出生日期",
  },
  {
    id: "map-004",
    sourceSystem: "emr-002",
    targetSystem: "fhir-r4",
    sourceField: "gender_code",
    targetField: "Patient.gender",
    dataType: "code",
    transformation: "lookup",
    validation: "enum",
    status: "warning",
    description: "性别代码",
  },
  {
    id: "map-005",
    sourceSystem: "lis-003",
    targetSystem: "fhir-r4",
    sourceField: "test_result",
    targetField: "Observation.valueQuantity",
    dataType: "decimal",
    transformation: "convert",
    validation: "numeric",
    status: "error",
    description: "检验结果数值",
  },
]

// 模拟数据转换规则
const transformationRules = [
  {
    id: "rule-001",
    name: "日期格式转换",
    type: "format",
    sourceFormat: "YYYY-MM-DD",
    targetFormat: "YYYY-MM-DDTHH:mm:ss.sssZ",
    description: "将日期格式转换为ISO 8601标准",
  },
  {
    id: "rule-002",
    name: "性别代码映射",
    type: "lookup",
    mappingTable: { "1": "male", "2": "female", "0": "unknown" },
    description: "将数字性别代码转换为FHIR标准",
  },
  {
    id: "rule-003",
    name: "姓名分割",
    type: "split",
    delimiter: " ",
    targetFields: ["family", "given"],
    description: "将全名分割为姓和名",
  },
]

export default function DataMappingTool() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedSource, setSelectedSource] = useState(dataSources[0])
  const [selectedTarget, setSelectedTarget] = useState(targetSystems[0])
  const [mappings, setMappings] = useState(fieldMappings)
  const [isEditingMapping, setIsEditingMapping] = useState(null)
  const [newMapping, setNewMapping] = useState({
    sourceField: "",
    targetField: "",
    dataType: "string",
    transformation: "direct",
    validation: "none",
    description: "",
  })

  // 获取映射统计
  const getMappingStats = () => {
    const total = mappings.length
    const active = mappings.filter((m) => m.status === "active").length
    const warning = mappings.filter((m) => m.status === "warning").length
    const error = mappings.filter((m) => m.status === "error").length
    return { total, active, warning, error }
  }

  const stats = getMappingStats()

  // 添加新映射
  const addMapping = () => {
    const newId = `map-${Date.now()}`
    const mapping = {
      id: newId,
      sourceSystem: selectedSource.id,
      targetSystem: selectedTarget.id,
      ...newMapping,
      status: "active",
    }
    setMappings([...mappings, mapping])
    setNewMapping({
      sourceField: "",
      targetField: "",
      dataType: "string",
      transformation: "direct",
      validation: "none",
      description: "",
    })
  }

  // 删除映射
  const deleteMapping = (id: string) => {
    setMappings(mappings.filter((m) => m.id !== id))
  }

  // 测试映射
  const testMapping = (mappingId: string) => {
    console.log(`测试映射: ${mappingId}`)
    // 模拟测试结果
    const mapping = mappings.find((m) => m.id === mappingId)
    if (mapping) {
      const testResult = Math.random() > 0.3 ? "success" : "error"
      console.log(`映射测试结果: ${testResult}`)
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>数据映射工具</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              导入映射
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              导出映射
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">映射概览</TabsTrigger>
            <TabsTrigger value="mapping">字段映射</TabsTrigger>
            <TabsTrigger value="transformation">转换规则</TabsTrigger>
            <TabsTrigger value="validation">验证测试</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-blue-700">总映射数</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-blue-600">字段映射</div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium text-emerald-700">正常映射</span>
                </div>
                <div className="text-2xl font-bold text-emerald-600">{stats.active}</div>
                <div className="text-sm text-emerald-600">运行正常</div>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span className="font-medium text-amber-700">警告映射</span>
                </div>
                <div className="text-2xl font-bold text-amber-600">{stats.warning}</div>
                <div className="text-sm text-amber-600">需要关注</div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-red-700">错误映射</span>
                </div>
                <div className="text-2xl font-bold text-red-600">{stats.error}</div>
                <div className="text-sm text-red-600">需要修复</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">数据源系统</h3>
                <div className="space-y-3">
                  {dataSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="font-medium">{source.name}</div>
                          <div className="text-sm text-muted-foreground">{source.type}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{source.fields} 字段</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">目标系统</h3>
                <div className="space-y-3">
                  {targetSystems.map((target) => (
                    <div key={target.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-emerald-500" />
                        <div>
                          <div className="font-medium">{target.name}</div>
                          <div className="text-sm text-muted-foreground">{target.type}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{target.fields} 字段</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mapping" className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">字段映射配置</h3>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    添加映射
                  </Button>
                </div>

                <div className="space-y-3">
                  {mappings.map((mapping) => (
                    <div key={mapping.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {dataSources.find((s) => s.id === mapping.sourceSystem)?.name}
                          </Badge>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <Badge variant="outline" className="text-xs">
                            {targetSystems.find((t) => t.id === mapping.targetSystem)?.name}
                          </Badge>
                        </div>
                        <Badge
                          variant={mapping.status === "active" ? "default" : "outline"}
                          className={
                            mapping.status === "active"
                              ? "bg-emerald-500"
                              : mapping.status === "warning"
                                ? "text-amber-500 border-amber-500"
                                : "text-red-500 border-red-500"
                          }
                        >
                          {mapping.status === "active" ? "正常" : mapping.status === "warning" ? "警告" : "错误"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-muted-foreground">源字段</div>
                          <code className="text-sm font-mono">{mapping.sourceField}</code>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">目标字段</div>
                          <code className="text-sm font-mono">{mapping.targetField}</code>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-muted-foreground">数据类型</div>
                          <div className="text-sm">{mapping.dataType}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">转换规则</div>
                          <div className="text-sm">{mapping.transformation}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">验证规则</div>
                          <div className="text-sm">{mapping.validation}</div>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground mb-3">{mapping.description}</div>

                      <div className="flex justify-between items-center pt-3 border-t">
                        <div className="text-xs text-muted-foreground">ID: {mapping.id}</div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => testMapping(mapping.id)}>
                            <Play className="w-4 h-4 mr-1" />
                            测试
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            编辑
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteMapping(mapping.id)}>
                            <Trash2 className="w-4 h-4 mr-1" />
                            删除
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">添加新映射</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">数据源</label>
                    <Select
                      value={selectedSource.id}
                      onValueChange={(value) =>
                        setSelectedSource(dataSources.find((s) => s.id === value) || dataSources[0])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择数据源" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataSources.map((source) => (
                          <SelectItem key={source.id} value={source.id}>
                            {source.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">目标系统</label>
                    <Select
                      value={selectedTarget.id}
                      onValueChange={(value) =>
                        setSelectedTarget(targetSystems.find((t) => t.id === value) || targetSystems[0])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择目标系统" />
                      </SelectTrigger>
                      <SelectContent>
                        {targetSystems.map((target) => (
                          <SelectItem key={target.id} value={target.id}>
                            {target.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">源字段</label>
                    <Input
                      value={newMapping.sourceField}
                      onChange={(e) => setNewMapping({ ...newMapping, sourceField: e.target.value })}
                      placeholder="输入源字段名"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">目标字段</label>
                    <Input
                      value={newMapping.targetField}
                      onChange={(e) => setNewMapping({ ...newMapping, targetField: e.target.value })}
                      placeholder="输入目标字段名"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">数据类型</label>
                    <Select
                      value={newMapping.dataType}
                      onValueChange={(value) => setNewMapping({ ...newMapping, dataType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择数据类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">字符串</SelectItem>
                        <SelectItem value="number">数字</SelectItem>
                        <SelectItem value="date">日期</SelectItem>
                        <SelectItem value="boolean">布尔值</SelectItem>
                        <SelectItem value="code">代码</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">转换规则</label>
                    <Select
                      value={newMapping.transformation}
                      onValueChange={(value) => setNewMapping({ ...newMapping, transformation: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择转换规则" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="direct">直接映射</SelectItem>
                        <SelectItem value="format">格式转换</SelectItem>
                        <SelectItem value="lookup">查表映射</SelectItem>
                        <SelectItem value="split">字符串分割</SelectItem>
                        <SelectItem value="convert">数据转换</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">描述</label>
                    <Textarea
                      value={newMapping.description}
                      onChange={(e) => setNewMapping({ ...newMapping, description: e.target.value })}
                      placeholder="输入映射描述"
                      rows={3}
                    />
                  </div>

                  <Button onClick={addMapping} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    添加映射
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transformation" className="pt-4">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">数据转换规则</h3>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加规则
                </Button>
              </div>

              <div className="space-y-4">
                {transformationRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium">{rule.name}</div>
                        <div className="text-sm text-muted-foreground">类型: {rule.type}</div>
                      </div>
                      <Badge variant="outline">{rule.type}</Badge>
                    </div>

                    <div className="text-sm text-muted-foreground mb-3">{rule.description}</div>

                    {rule.type === "format" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-muted-foreground">源格式</div>
                          <code className="text-sm">{rule.sourceFormat}</code>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">目标格式</div>
                          <code className="text-sm">{rule.targetFormat}</code>
                        </div>
                      </div>
                    )}

                    {rule.type === "lookup" && (
                      <div className="mb-3">
                        <div className="text-sm text-muted-foreground mb-2">映射表</div>
                        <div className="p-3 bg-muted rounded-lg">
                          <code className="text-sm">{JSON.stringify(rule.mappingTable, null, 2)}</code>
                        </div>
                      </div>
                    )}

                    {rule.type === "split" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-muted-foreground">分隔符</div>
                          <code className="text-sm">"{rule.delimiter}"</code>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">目标字段</div>
                          <code className="text-sm">{rule.targetFields?.join(", ")}</code>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-3 border-t">
                      <Button variant="ghost" size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        测试
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        编辑
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 mr-1" />
                        删除
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="validation" className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">映射验证</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">选择映射</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择要验证的映射" />
                      </SelectTrigger>
                      <SelectContent>
                        {mappings.map((mapping) => (
                          <SelectItem key={mapping.id} value={mapping.id}>
                            {mapping.sourceField} → {mapping.targetField}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">测试数据</label>
                    <Textarea placeholder="输入测试数据（JSON格式）" rows={6} />
                  </div>

                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    执行验证
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">验证结果</h3>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium">patient_id → Patient.id</span>
                    </div>
                    <div className="text-sm text-muted-foreground">源值: "P001234" → 目标值: "P001234"</div>
                    <div className="text-sm text-emerald-600">验证通过</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span className="font-medium">birth_date → Patient.birthDate</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      源值: "1990-01-01" → 目标值: "1990-01-01T00:00:00.000Z"
                    </div>
                    <div className="text-sm text-amber-600">格式转换成功，但需要确认时区</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <X className="w-4 h-4 text-red-500" />
                      <span className="font-medium">gender_code → Patient.gender</span>
                    </div>
                    <div className="text-sm text-muted-foreground">源值: "3" → 目标值: null</div>
                    <div className="text-sm text-red-600">映射失败：未知的性别代码</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
