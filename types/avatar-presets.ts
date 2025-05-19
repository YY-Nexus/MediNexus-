// 默认头像和基于角色的头像预设

// 默认头像URL
export const DEFAULT_AVATAR = "/avatars/default-doctor.png"

// 基于角色的头像映射
export const ROLE_AVATARS = {
  医生: "/avatars/default-doctor.png",
  护士: "/avatars/default-nurse.png",
  专家: "/avatars/default-specialist.png",
  外科医生: "/avatars/default-surgeon.png",
  研究员: "/avatars/default-researcher.png",
  管理员: "/avatars/default-admin.png",
  技术员: "/avatars/default-technician.png",
  药剂师: "/avatars/default-pharmacist.png",
}

// 获取基于角色的头像
export function getAvatarByRole(role: string): string {
  return ROLE_AVATARS[role as keyof typeof ROLE_AVATARS] || DEFAULT_AVATAR
}

// 所有可用的头像预设
export const AVATAR_PRESETS = Object.values(ROLE_AVATARS)

export interface AvatarPreset {
  id: string
  name: string
  path: string
  description: string
  role?: string
}

// export const AVATAR_PRESETS: AvatarPreset[] = [
//   {
//     id: "doctor",
//     name: "医生",
//     path: "/avatars/default-doctor.png",
//     description: "适用于临床医生",
//     role: "医生",
//   },
//   {
//     id: "nurse",
//     name: "护士",
//     path: "/avatars/default-nurse.png",
//     description: "适用于护理人员",
//     role: "护士",
//   },
//   {
//     id: "specialist",
//     name: "专科医生",
//     path: "/avatars/default-specialist.png",
//     description: "适用于专科医生",
//     role: "专科医生",
//   },
//   {
//     id: "surgeon",
//     name: "外科医生",
//     path: "/avatars/default-surgeon.png",
//     description: "适用于外科医生",
//     role: "外科医生",
//   },
//   {
//     id: "researcher",
//     name: "研究员",
//     path: "/avatars/default-researcher.png",
//     description: "适用于医学研究人员",
//     role: "研究员",
//   },
//   {
//     id: "admin",
//     name: "管理员",
//     path: "/avatars/default-admin.png",
//     description: "适用于医疗管理人员",
//     role: "管理员",
//   },
//   {
//     id: "technician",
//     name: "技术员",
//     path: "/avatars/default-technician.png",
//     description: "适用于医疗技术人员",
//     role: "技术员",
//   },
//   {
//     id: "pharmacist",
//     name: "药剂师",
//     path: "/avatars/default-pharmacist.png",
//     description: "适用于药剂师",
//     role: "药剂师",
//   },
// ]

// export const DEFAULT_AVATAR = AVATAR_PRESETS[0].path

// export function getAvatarByRole(role?: string): string {
//   if (!role) return DEFAULT_AVATAR

//   const preset = AVATAR_PRESETS.find((p) => p.role?.toLowerCase() === role.toLowerCase())
//   return preset?.path || DEFAULT_AVATAR
// }

export function getAvatarById(id?: string): string {
  if (!id) return DEFAULT_AVATAR

  // const preset = AVATAR_PRESETS.find((p) => p.id === id)
  // return preset?.path || DEFAULT_AVATAR
  return DEFAULT_AVATAR
}
