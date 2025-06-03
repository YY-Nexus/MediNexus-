"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  User,
  Calendar,
  Phone,
  Mail,
  Clock,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  gender: "male" | "female" | "other"
  phone: string
  email: string
  address: string
  emergencyContact: string
  bloodType: string
  allergies: string[]
  chronicConditions: string[]
  lastVisit: string
  nextAppointment?: string
  status: "active" | "inactive" | "critical"
  avatar?: string
  medicalRecordNumber: string
  insuranceInfo: {
    provider: string
    policyNumber: string
    expiryDate: string
  }
  vitalSigns: {
    bloodPressure: string
    heartRate: number
    temperature: number
    weight: number
    height: number
  }
}

export function EnhancedPatientManagement() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // 模拟患者数据
  useEffect(() => {
    const mockPatients: Patient[] = [
      {
        id: "1",
        name: "张三",
        age: 45,
        gender: "male",
        phone: "13800138001",
        email: "zhangsan@example.com",
        address: "北京市朝阳区建国路1号",
        emergencyContact: "李四 13800138002",
        bloodType: "A+",
        allergies: ["青霉素", "花生"],
        chronicConditions: ["高血压", "糖尿病"],
        lastVisit: "2024-01-15",
        nextAppointment: "2024-02-15",
        status: "active",
        medicalRecordNumber: "MR001",
        insuranceInfo: {
          provider: "中国人寿",
          policyNumber: "CL2024001",
          expiryDate: "2024-12-31",
        },
        vitalSigns: {
          bloodPressure: "140/90",
          heartRate: 78,
          temperature: 36.5,
          weight: 70,
          height: 175,
        },
      },
      {
        id: "2",
        name: "王丽",
        age: 32,
        gender: "female",
        phone: "13800138003",
        email: "wangli@example.com",
        address: "上海市浦东新区陆家嘴1号",
        emergencyContact: "王强 13800138004",
        bloodType: "B+",
        allergies: ["磺胺类药物"],
        chronicConditions: [],
        lastVisit: "2024-01-20",
        status: "active",
        medicalRecordNumber: "MR002",
        insuranceInfo: {
          provider: "平安保险",
          policyNumber: "PA2024002",
          expiryDate: "2024-11-30",
        },
        vitalSigns: {
          bloodPressure: "120/80",
          heartRate: 72,
          temperature: 36.3,
          weight: 55,
          height: 165,
        },
      },
    ]

    setTimeout(() => {
      setPatients(mockPatients)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.medicalRecordNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || patient.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: Patient["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">活跃</Badge>
      case "inactive":
        return <Badge variant="secondary">非活跃</Badge>
      case "critical":
        return <Badge variant="destructive">紧急</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  const handleAddPatient = () => {
    setIsAddDialogOpen(true)
  }

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">患者管理</h1>
          <p className="text-muted-foreground">管理患者信息、病历记录和预约安排</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            导入
          </Button>
          <Button onClick={handleAddPatient}>
            <Plus className="mr-2 h-4 w-4" />
            添加患者
          </Button>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索患者姓名、电话或病历号..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">活跃</SelectItem>
                <SelectItem value="inactive">非活跃</SelectItem>
                <SelectItem value="critical">紧急</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              高级筛选
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">总患者数</p>
                <p className="text-2xl font-bold">{patients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">活跃患者</p>
                <p className="text-2xl font-bold">{patients.filter((p) => p.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">紧急患者</p>
                <p className="text-2xl font-bold">{patients.filter((p) => p.status === "critical").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">今日预约</p>
                <p className="text-2xl font-bold">
                  {patients.filter((p) => p.nextAppointment === new Date().toISOString().split("T")[0]).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 患者列表 */}
      <Card>
        <CardHeader>
          <CardTitle>患者列表</CardTitle>
          <CardDescription>找到 {filteredPatients.length} 位患者</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>患者信息</TableHead>
                <TableHead>联系方式</TableHead>
                <TableHead>血型</TableHead>
                <TableHead>慢性疾病</TableHead>
                <TableHead>最后就诊</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {patient.age}岁 · {patient.gender === "male" ? "男" : "女"} · {patient.medicalRecordNumber}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="mr-1 h-3 w-3" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="mr-1 h-3 w-3" />
                        {patient.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.bloodType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {patient.chronicConditions.length > 0 ? (
                        patient.chronicConditions.map((condition, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {condition}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">无</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-1 h-3 w-3" />
                      {patient.lastVisit}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewPatient(patient)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 患者详情对话框 */}
      {selectedPatient && (
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={selectedPatient.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedPatient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {selectedPatient.name} - 详细信息
              </DialogTitle>
              <DialogDescription>病历号：{selectedPatient.medicalRecordNumber}</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">基本信息</TabsTrigger>
                <TabsTrigger value="medical">医疗信息</TabsTrigger>
                <TabsTrigger value="vitals">生命体征</TabsTrigger>
                <TabsTrigger value="insurance">保险信息</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>姓名</Label>
                    <p className="text-sm">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <Label>年龄</Label>
                    <p className="text-sm">{selectedPatient.age}岁</p>
                  </div>
                  <div>
                    <Label>性别</Label>
                    <p className="text-sm">{selectedPatient.gender === "male" ? "男" : "女"}</p>
                  </div>
                  <div>
                    <Label>血型</Label>
                    <p className="text-sm">{selectedPatient.bloodType}</p>
                  </div>
                  <div>
                    <Label>电话</Label>
                    <p className="text-sm">{selectedPatient.phone}</p>
                  </div>
                  <div>
                    <Label>邮箱</Label>
                    <p className="text-sm">{selectedPatient.email}</p>
                  </div>
                  <div className="col-span-2">
                    <Label>地址</Label>
                    <p className="text-sm">{selectedPatient.address}</p>
                  </div>
                  <div className="col-span-2">
                    <Label>紧急联系人</Label>
                    <p className="text-sm">{selectedPatient.emergencyContact}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="medical" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>过敏史</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedPatient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>慢性疾病</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedPatient.chronicConditions.map((condition, index) => (
                        <Badge key={index} variant="secondary">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>最后就诊</Label>
                      <p className="text-sm">{selectedPatient.lastVisit}</p>
                    </div>
                    <div>
                      <Label>下次预约</Label>
                      <p className="text-sm">{selectedPatient.nextAppointment || "无"}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="vitals" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>血压</Label>
                    <p className="text-sm">{selectedPatient.vitalSigns.bloodPressure} mmHg</p>
                  </div>
                  <div>
                    <Label>心率</Label>
                    <p className="text-sm">{selectedPatient.vitalSigns.heartRate} bpm</p>
                  </div>
                  <div>
                    <Label>体温</Label>
                    <p className="text-sm">{selectedPatient.vitalSigns.temperature}°C</p>
                  </div>
                  <div>
                    <Label>体重</Label>
                    <p className="text-sm">{selectedPatient.vitalSigns.weight} kg</p>
                  </div>
                  <div>
                    <Label>身高</Label>
                    <p className="text-sm">{selectedPatient.vitalSigns.height} cm</p>
                  </div>
                  <div>
                    <Label>BMI</Label>
                    <p className="text-sm">
                      {(
                        selectedPatient.vitalSigns.weight / Math.pow(selectedPatient.vitalSigns.height / 100, 2)
                      ).toFixed(1)}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="insurance" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>保险公司</Label>
                    <p className="text-sm">{selectedPatient.insuranceInfo.provider}</p>
                  </div>
                  <div>
                    <Label>保单号</Label>
                    <p className="text-sm">{selectedPatient.insuranceInfo.policyNumber}</p>
                  </div>
                  <div>
                    <Label>到期日期</Label>
                    <p className="text-sm">{selectedPatient.insuranceInfo.expiryDate}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
