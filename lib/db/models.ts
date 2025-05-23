// 用户模型
export interface User {
  id: string
  username: string
  password: string // 实际存储哈希值
  name: string
  email: string
  phone?: string
  role: "admin" | "trainer" | "student"
  status: "active" | "inactive" | "suspended"
  profile?: UserProfile
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
}

// 用户个人资料
export interface UserProfile {
  avatar?: string
  bio?: string
  organization?: string
  position?: string
  specialties?: string[]
}

// 认证申请
export interface CertificationApplication {
  id: string
  applicantId: string
  applicantName: string
  certificationType: string
  specialties: string[]
  qualifications: Qualification[]
  experience: Experience[]
  documents: Document[]
  status: "pending" | "approved" | "rejected"
  reviewComments?: string
  reviewerId?: string
  reviewerName?: string
  reviewedAt?: string
  submittedAt: string
  updatedAt: string
}

// 资质证书
export interface Qualification {
  type: string
  number: string
  issueDate: string
  expiryDate: string
  issuingAuthority: string
  verificationStatus?: "pending" | "verified" | "failed"
}

// 工作经验
export interface Experience {
  organization: string
  position: string
  startDate: string
  endDate?: string
  description?: string
}

// 文档
export interface Document {
  type: string
  fileId: string
  filename: string
  uploadedAt: string
  url?: string
}

// 培训课程
export interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  duration: number // 小时
  objectives?: string[]
  prerequisites?: string[]
  modules: CourseModule[]
  materials?: CourseMaterial[]
  status: "draft" | "published" | "archived"
  createdBy: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

// 课程模块
export interface CourseModule {
  id: string
  title: string
  description?: string
  duration: number // 小时
  content: string
}

// 课程资料
export interface CourseMaterial {
  id: string
  type: string
  title: string
  fileId?: string
  url?: string
  createdAt: string
}

// 培训活动
export interface TrainingSession {
  id: string
  courseId: string
  title: string
  description?: string
  startDate: string
  endDate: string
  location: string
  capacity: number
  enrolled: number
  trainerId: string
  assistants?: string[]
  materials?: CourseMaterial[]
  registrationDeadline?: string
  status: "scheduled" | "ongoing" | "completed" | "cancelled"
  createdAt: string
  updatedAt: string
}

// 考试
export interface Exam {
  id: string
  title: string
  description?: string
  courseId: string
  sessionId?: string
  type: string
  duration: number // 分钟
  totalPoints: number
  passingScore: number
  startTime?: string
  endTime?: string
  instructions?: string
  sections: ExamSection[]
  status: "draft" | "published" | "ongoing" | "completed" | "archived"
  createdBy: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

// 考试章节
export interface ExamSection {
  id: string
  title: string
  description?: string
  points: number
  questions: ExamQuestion[]
}

// 考试题目
export interface ExamQuestion {
  id: string
  type: "single" | "multiple" | "boolean" | "essay" | "practical"
  content: string
  points: number
  options?: QuestionOption[]
  answer?: string
  explanation?: string
}

// 题目选项
export interface QuestionOption {
  label: string
  content: string
  isCorrect: boolean
}

// 考试提交
export interface ExamSubmission {
  id: string
  examId: string
  userId: string
  answers: SubmissionAnswer[]
  score?: number
  totalPoints: number
  passed?: boolean
  status: "submitted" | "graded"
  submittedAt: string
  gradedAt?: string
}

// 提交答案
export interface SubmissionAnswer {
  questionId: string
  answer: string | string[]
  score?: number
  feedback?: string
}
