"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Globe, CheckCircle, RefreshCw, AlertCircle, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  certificationVerificationService,
  type VerificationProvider,
} from "@/services/certification-verification-service"

interface InternationalCertificationFormProps {
  onSave: (data: any) => void
  onCancel: () => void
}

// 国际资质类型
const internationalCertificationTypes = [
  { value: "international-medical-license", label: "国际医疗执业许可证" },
  { value: "who-certification", label: "WHO认证证书" },
  { value: "usmle-certification", label: "USMLE认证" },
  { value: "ecfmg-certificate", label: "ECFMG证书" },
  { value: "gmc-registration", label: "英国GMC注册" },
  { value: "uk-medical-license", label: "英国医疗执业许可证" },
  { value: "ahpra-registration", label: "澳大利亚AHPRA注册" },
  { value: "australian-medical-license", label: "澳大利亚医疗执业许可证" },
]

// 国家列表
const countries = [
  { value: "US", label: "美国" },
  { value: "UK", label: "英国" },
  { value: "AU", label: "澳大利亚" },
  { value: "CA", label: "加拿大" },
  { value: "DE", label: "德国" },
  { value: "FR", label: "法国" },
  { value: "JP", label: "日本" },
  { value: "SG", label: "新加坡" },
  { value: "CH", label: "瑞士" },
  { value: "NL", label: "荷兰" },
  { value: "SE", label: "瑞典" },
  { value: "NO", label: "挪威" },
  { value: "DK", label: "丹麦" },
  { value: "FI", label: "芬兰" },
  { value: "OTHER", label: "其他" },
]

export function InternationalCertificationForm({ onSave, onCancel }: InternationalCertificationFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    type: "international-medical-license",
    certificateNumber: "",
    name: "",
    country: "",
    institution: "",
    issueDate: "",
    expiryDate: "",
    specialty: "",
    notes: "",
    providerId: "who-verification",
  })
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any | null>(null)
  const [availableProviders, setAvailableProviders] = useState<VerificationProvider[]>([])

  // 当资质类型变化时，更新可用的验证机构
  useEffect(() => {
    const providers = certificationVerificationService.getAvailableProviders(formData.type)
    setAvailableProviders(providers)

    if (!providers.some((p) => p.id === formData.providerId)) {
      setFormData((prev) => ({
        ...prev,
        providerId: providers[0]?.id || "who-verification",
      }))
    }
  }, [formData.type])

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const verifyInternationalCertification = async () => {
    if (!formData.certificateNumber || !formData.name || !formData.country) {
      toast({
        title: "信息不完整",
        description: "请填写证书编号、姓名和发证国家",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    setVerificationResult(null)

    try {
      const result = await certificationVerificationService.verifyInternationalCertification(
        formData.certificateNumber,
        formData.name,
        formData.country,
        formData.type,
        formData.providerId,
      )

      setVerificationResult(result)
    } catch (error) {
      console.error("国际资质验证失败:", error)
      toast({
        title: "验证失败",
        description: error instanceof Error ? error.message : "发生未知错误",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleSave = () => {
    if (!verificationResult?.isValid) {
      toast({
        title: "无法保存",
        description: "请先验证国际资质信息",
        variant: "destructive",
      })
      return
    }

    const completeData = {
      ...formData,
      verificationResult,
      isInternational: true,
    }

    onSave(completeData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-500" />
            <CardTitle>国际资质认证</CardTitle>
          </div>
          <CardDescription>验证国际医疗资质证书，支持WHO、USMLE、GMC等多个国际认证机构</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">资质类型</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="选择国际资质类型" />
                </SelectTrigger>
                <SelectContent>
                  {internationalCertificationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">发证国家/地区</Label>
              <Select value={formData.country} onValueChange={(value) => handleChange("country", value)}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="选择国家/地区" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificateNumber">证书编号</Label>
              <Input
                id="certificateNumber"
                placeholder="输入国际证书编号"
                value={formData.certificateNumber}
                onChange={(e) => handleChange("certificateNumber", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">示例: WHO开头的编号、USMLE开头的编号等</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">姓名</Label>
              <Input
                id="name"
                placeholder="输入英文姓名"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">发证机构</Label>
              <Input
                id="institution"
                placeholder="输入发证机构"
                value={formData.institution}
                onChange={(e) => handleChange("institution", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">专科领域</Label>
              <Input
                id="specialty"
                placeholder="输入专科领域（可选）"
                value={formData.specialty}
                onChange={(e) => handleChange("specialty", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueDate">发证日期</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => handleChange("issueDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">有效期至</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleChange("expiryDate", e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="providerId">验证机构</Label>
              <Select value={formData.providerId} onValueChange={(value) => handleChange("providerId", value)}>
                <SelectTrigger id="providerId">
                  <SelectValue placeholder="选择验证机构" />
                </SelectTrigger>
                <SelectContent>
                  {availableProviders.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      <div className="flex items-center">
                        <span>{provider.name}</span>
                        {provider.isOfficial && <Badge className="ml-2 bg-blue-500 text-xs">官方</Badge>}
                        {provider.isFast && <Badge className="ml-2 bg-green-500 text-xs">快速</Badge>}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {availableProviders.find((p) => p.id === formData.providerId)?.verificationTime} ·
                {availableProviders.find((p) => p.id === formData.providerId)?.fee}
              </p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">备注</Label>
              <Textarea
                id="notes"
                placeholder="添加备注信息（可选）"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={verifyInternationalCertification} disabled={isVerifying}>
            {isVerifying ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                验证中...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                验证国际资质
              </>
            )}
          </Button>
          <Button onClick={handleSave} disabled={!verificationResult?.isValid}>
            保存
          </Button>
        </div>
      </div>

      {verificationResult && (
        <div className="mt-6">
          {verificationResult.isValid ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>国际资质验证通过</AlertTitle>
              <AlertDescription>
                {verificationResult.message}
                <ul className="mt-2 list-disc list-inside">
                  {verificationResult.name && <li>姓名: {verificationResult.name}</li>}
                  {verificationResult.institution && <li>机构: {verificationResult.institution}</li>}
                  {verificationResult.specialty && <li>专科: {verificationResult.specialty}</li>}
                  {verificationResult.validUntil && <li>有效期至: {verificationResult.validUntil}</li>}
                  {verificationResult.details?.country && <li>发证国家: {verificationResult.details.country}</li>}
                  {verificationResult.verificationProvider && (
                    <li>验证机构: {verificationResult.verificationProvider}</li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>国际资质验证失败</AlertTitle>
              <AlertDescription>
                {verificationResult.message}
                {verificationResult.verificationProvider && (
                  <p className="mt-1">验证机构: {verificationResult.verificationProvider}</p>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>国际资质验证说明</AlertTitle>
        <AlertDescription>
          <ul className="mt-2 list-disc list-inside text-sm">
            <li>国际资质验证需要更长的处理时间，请耐心等待</li>
            <li>某些国际认证机构可能需要额外的验证费用</li>
            <li>请确保提供的信息与原始证书完全一致</li>
            <li>如有疑问，请联系相应的国际认证机构</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
