"use client"

import { useState, useCallback, type ChangeEvent, useEffect, useRef } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { AvatarCropper } from "./avatar-cropper"

interface AvatarUploadProps {
  currentAvatar: string | null | undefined
  onAvatarChange: (file: File | null, previewUrl: string | null) => void
  className?: string
}

export function AvatarUpload({ currentAvatar, onAvatarChange, className }: AvatarUploadProps) {
  const [preview, setPreview] = useState(currentAvatar)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const [showCropper, setShowCropper] = useState(false)
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null)

  useEffect(() => {
    setPreview(currentAvatar)
  }, [currentAvatar])

  const handleFileChange = useCallback(
    (file: File | null) => {
      setError(null)

      if (!file) {
        setPreview(currentAvatar)
        onAvatarChange(null, currentAvatar)
        return
      }

      // 检查文件类型
      const fileType = file.type
      if (!fileType.startsWith("image/")) {
        setError("请上传图片文件")
        return
      }

      // 检查文件大小 (最大 2MB)
      const fileSizeMB = file.size / (1024 * 1024)
      if (fileSizeMB > 2) {
        setError("图片过大，请上传小于 2MB 的图片")
        return
      }

      // 创建预览并打开裁剪器
      const reader = new FileReader()
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string
        setCropImageUrl(previewUrl)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    },
    [currentAvatar, onAvatarChange],
  )

  const handleCropComplete = useCallback(
    (croppedImageUrl: string) => {
      setPreview(croppedImageUrl)

      // 将 base64 转换为文件对象
      fetch(croppedImageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "avatar.png", { type: "image/png" })
          onAvatarChange(file, croppedImageUrl)
        })
        .catch((err) => {
          console.error("转换裁剪图片失败:", err)
          setError("处理图片失败，请重试")
        })
    },
    [onAvatarChange],
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFileChange(file)
  }

  const handleRemoveAvatar = () => {
    handleFileChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // Reset the file input
    }
  }

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <Avatar className="h-24 w-24">
        {preview ? (
          <AvatarImage src={preview || "/placeholder.svg"} alt="Avatar" />
        ) : (
          <AvatarFallback>
            {/* Fallback initials logic here if needed */}
            {/* {name ? name[0] : "U"} */}U
          </AvatarFallback>
        )}
      </Avatar>
      <div className="space-y-2 text-center">
        <Label htmlFor="avatar-upload">上传头像</Label>
        <Input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
          ref={fileInputRef}
        />
        {error && <p className="text-red-500">{error}</p>}
        {preview && (
          <Button variant="destructive" size="sm" onClick={handleRemoveAvatar}>
            移除头像
          </Button>
        )}
      </div>
      {cropImageUrl && (
        <AvatarCropper
          isOpen={showCropper}
          onClose={() => setShowCropper(false)}
          imageUrl={cropImageUrl}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  )
}
