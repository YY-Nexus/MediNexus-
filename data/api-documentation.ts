export const apiDocumentation = {
  title: "言语医枢³培训师认证系统 API",
  version: "1.2.0",
  description:
    "为医疗培训师认证系统提供完整的RESTful API接口，支持用户认证、培训师认证申请、培训管理、考核管理和用户管理等功能。",
  baseUrl: "https://api.yanyu.com/v1",
  authentication: {
    type: "Bearer Token",
    description: "使用JWT令牌进行身份验证。在请求头中添加 'Authorization: Bearer <token>'。",
  },
  sections: [
    {
      name: "认证与授权",
      description: "用户登录、令牌刷新等认证相关接口",
      endpoints: [
        {
          path: "/auth/login",
          method: "POST",
          description: "用户登录，获取访问令牌",
          authentication: false,
          requestBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                username: "zhangdoctor",
                password: "password123",
              },
              null,
              2,
            ),
          },
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  expiresIn: 3600,
                  user: {
                    id: "u12345",
                    username: "zhangdoctor",
                    name: "张医生",
                    role: "trainer",
                  },
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 401,
              code: "INVALID_CREDENTIALS",
              message: "用户名或密码错误",
              description: "提供的登录凭据无效",
            },
            {
              status: 403,
              code: "ACCOUNT_DISABLED",
              message: "账户已被禁用",
              description: "用户账户处于禁用状态",
            },
          ],
        },
        {
          path: "/auth/refresh",
          method: "POST",
          description: "刷新访问令牌",
          authentication: false,
          requestBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
              null,
              2,
            ),
          },
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  expiresIn: 3600,
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 401,
              code: "INVALID_REFRESH_TOKEN",
              message: "刷新令牌无效",
              description: "提供的刷新令牌已过期或无效",
            },
          ],
        },
      ],
    },
    {
      name: "培训师认证申请",
      description: "培训师资质认证申请的提交、查询和审核",
      endpoints: [
        {
          path: "/certification/applications",
          method: "GET",
          description: "获取认证申请列表",
          authentication: true,
          requestParams: [
            {
              name: "status",
              type: "string",
              required: false,
              description: "申请状态过滤",
              example: "pending",
            },
            {
              name: "page",
              type: "integer",
              required: false,
              description: "页码",
              example: "1",
            },
            {
              name: "limit",
              type: "integer",
              required: false,
              description: "每页数量",
              example: "20",
            },
          ],
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  total: 1,
                  page: 1,
                  limit: 20,
                  items: [
                    {
                      id: "app12345",
                      applicantName: "张医生",
                      certificationType: "高级培训师",
                      status: "pending",
                      submittedAt: "2023-05-15T08:30:00Z",
                    },
                  ],
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 401,
              code: "UNAUTHORIZED",
              message: "未授权访问",
              description: "需要有效的访问令牌",
            },
          ],
        },
        {
          path: "/certification/applications",
          method: "POST",
          description: "提交新的认证申请",
          authentication: true,
          requestBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                certificationType: "高级培训师",
                specialties: ["内科", "心脏病学"],
                qualifications: [
                  {
                    type: "医师资格证",
                    number: "1234567890",
                    issueDate: "2015-01-15",
                    expiryDate: "2025-01-14",
                    issuingAuthority: "国家卫生健康委员会",
                  },
                ],
                experience: [
                  {
                    organization: "北京协和医院",
                    position: "主治医师",
                    startDate: "2018-03-01",
                    endDate: "2023-04-30",
                    description: "负责心内科临床工作和医学教育",
                  },
                ],
              },
              null,
              2,
            ),
          },
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  id: "app12345",
                  status: "pending",
                  submittedAt: "2023-05-15T08:30:00Z",
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 400,
              code: "INVALID_REQUEST",
              message: "请求数据无效",
              description: "缺少必要字段或数据格式错误",
            },
            {
              status: 409,
              code: "APPLICATION_EXISTS",
              message: "已存在未完成的申请",
              description: "用户已有进行中的认证申请",
            },
          ],
        },
        {
          path: "/certification/applications/{id}",
          method: "GET",
          description: "获取认证申请详情",
          authentication: true,
          requestParams: [
            {
              name: "id",
              type: "string",
              required: true,
              description: "申请ID",
              example: "app12345",
            },
          ],
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  id: "app12345",
                  applicantName: "张医生",
                  certificationType: "高级培训师",
                  specialties: ["内科", "心脏病学"],
                  qualifications: [
                    {
                      type: "医师资格证",
                      number: "1234567890",
                      issueDate: "2015-01-15",
                      expiryDate: "2025-01-14",
                      issuingAuthority: "国家卫生健康委员会",
                      verificationStatus: "verified",
                    },
                  ],
                  status: "pending",
                  submittedAt: "2023-05-15T08:30:00Z",
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 404,
              code: "APPLICATION_NOT_FOUND",
              message: "申请不存在",
              description: "指定的申请ID不存在",
            },
          ],
        },
        {
          path: "/certification/applications/{id}/review",
          method: "POST",
          description: "审核认证申请",
          authentication: true,
          requestParams: [
            {
              name: "id",
              type: "string",
              required: true,
              description: "申请ID",
              example: "app12345",
            },
          ],
          requestBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                status: "approved",
                comments: "申请材料完整，符合认证要求",
              },
              null,
              2,
            ),
          },
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  id: "app12345",
                  status: "approved",
                  reviewedAt: "2023-05-16T10:30:00Z",
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 403,
              code: "PERMISSION_DENIED",
              message: "权限不足",
              description: "只有管理员可以审核申请",
            },
            {
              status: 400,
              code: "INVALID_STATUS",
              message: "状态值无效",
              description: "状态必须是 approved 或 rejected",
            },
          ],
        },
      ],
    },
    {
      name: "培训管理",
      description: "培训课程和培训活动的管理",
      endpoints: [
        {
          path: "/training/courses",
          method: "GET",
          description: "获取培训课程列表",
          authentication: true,
          requestParams: [
            {
              name: "category",
              type: "string",
              required: false,
              description: "课程分类",
              example: "医学影像",
            },
            {
              name: "level",
              type: "string",
              required: false,
              description: "课程级别",
              example: "初级",
            },
            {
              name: "status",
              type: "string",
              required: false,
              description: "课程状态",
              example: "published",
            },
            {
              name: "page",
              type: "integer",
              required: false,
              description: "页码",
              example: "1",
            },
            {
              name: "limit",
              type: "integer",
              required: false,
              description: "每页数量",
              example: "20",
            },
          ],
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  total: 1,
                  page: 1,
                  limit: 20,
                  items: [
                    {
                      id: "course12345",
                      title: "医学影像诊断基础",
                      description: "学习医学影像诊断的基本原理和方法",
                      category: "医学影像",
                      level: "初级",
                      duration: 40,
                      status: "published",
                      createdAt: "2023-05-15T08:30:00Z",
                    },
                  ],
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 401,
              code: "UNAUTHORIZED",
              message: "未授权访问",
              description: "需要有效的访问令牌",
            },
          ],
        },
        {
          path: "/training/courses",
          method: "POST",
          description: "创建新的培训课程",
          authentication: true,
          requestBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                title: "医学影像诊断基础",
                description: "学习医学影像诊断的基本原理和方法",
                category: "医学影像",
                level: "初级",
                duration: 40,
                objectives: ["掌握医学影像诊断的基本原理", "学会常见疾病的影像表现"],
                prerequisites: ["医学基础知识", "解剖学基础"],
                modules: [
                  {
                    id: "module1",
                    title: "影像诊断概述",
                    description: "医学影像诊断的基本概念",
                    duration: 8,
                    content: "详细的课程内容...",
                  },
                ],
              },
              null,
              2,
            ),
          },
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  id: "course12345",
                  title: "医学影像诊断基础",
                  status: "draft",
                  createdAt: "2023-05-15T08:30:00Z",
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 400,
              code: "INVALID_REQUEST",
              message: "请求数据无效",
              description: "缺少必要字段或数据格式错误",
            },
          ],
        },
        {
          path: "/training/sessions",
          method: "GET",
          description: "获取培训活动列表",
          authentication: true,
          requestParams: [
            {
              name: "courseId",
              type: "string",
              required: false,
              description: "课程ID过滤",
              example: "course12345",
            },
            {
              name: "status",
              type: "string",
              required: false,
              description: "活动状态",
              example: "scheduled",
            },
            {
              name: "trainerId",
              type: "string",
              required: false,
              description: "培训师ID",
              example: "u23456",
            },
            {
              name: "page",
              type: "integer",
              required: false,
              description: "页码",
              example: "1",
            },
            {
              name: "limit",
              type: "integer",
              required: false,
              description: "每页数量",
              example: "20",
            },
          ],
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  total: 1,
                  page: 1,
                  limit: 20,
                  items: [
                    {
                      id: "session12345",
                      courseId: "course12345",
                      title: "医学影像诊断基础培训班",
                      startDate: "2023-06-01T09:00:00Z",
                      endDate: "2023-06-05T17:00:00Z",
                      location: "北京协和医院培训中心",
                      capacity: 30,
                      enrolled: 25,
                      status: "scheduled",
                    },
                  ],
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 401,
              code: "UNAUTHORIZED",
              message: "未授权访问",
              description: "需要有效的访问令牌",
            },
          ],
        },
        {
          path: "/training/sessions",
          method: "POST",
          description: "创建新的培训活动",
          authentication: true,
          requestBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                courseId: "course12345",
                title: "医学影像诊断基础培训班",
                description: "为期一周的医学影像诊断基础培训",
                startDate: "2023-06-01T09:00:00Z",
                endDate: "2023-06-05T17:00:00Z",
                location: "北京协和医院培训中心",
                capacity: 30,
                trainerId: "u23456",
                registrationDeadline: "2023-05-25T23:59:59Z",
              },
              null,
              2,
            ),
          },
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  id: "session12345",
                  title: "医学影像诊断基础培训班",
                  status: "scheduled",
                  createdAt: "2023-05-15T08:30:00Z",
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 400,
              code: "INVALID_REQUEST",
              message: "请求数据无效",
              description: "缺少必要字段或数据格式错误",
            },
            {
              status: 400,
              code: "INVALID_DATE_RANGE",
              message: "开始时间必须早于结束时间",
              description: "培训活动的时间范围设置错误",
            },
          ],
        },
      ],
    },
    {
      name: "考核管理",
      description: "考试创建、管理和成绩统计",
      endpoints: [
        {
          path: "/exams",
          method: "GET",
          description: "获取考试列表",
          authentication: true,
          requestParams: [
            {
              name: "courseId",
              type: "string",
              required: false,
              description: "课程ID过滤",
              example: "course12345",
            },
            {
              name: "sessionId",
              type: "string",
              required: false,
              description: "培训活动ID过滤",
              example: "session12345",
            },
            {
              name: "status",
              type: "string",
              required: false,
              description: "考试状态",
              example: "published",
            },
            {
              name: "page",
              type: "integer",
              required: false,
              description: "页码",
              example: "1",
            },
            {
              name: "limit",
              type: "integer",
              required: false,
              description: "每页数量",
              example: "20",
            },
          ],
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  total: 1,
                  page: 1,
                  limit: 20,
                  items: [
                    {
                      id: "exam12345",
                      title: "医学影像诊断基础考试",
                      courseId: "course12345",
                      type: "综合考试",
                      duration: 120,
                      totalPoints: 100,
                      passingScore: 60,
                      status: "published",
                    },
                  ],
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 401,
              code: "UNAUTHORIZED",
              message: "未授权访问",
              description: "需要有效的访问令牌",
            },
          ],
        },
        {
          path: "/exams",
          method: "POST",
          description: "创建新考试",
          authentication: true,
          requestBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                title: "医学影像诊断基础考试",
                description: "测试学员对医学影像诊断基础知识的掌握程度",
                courseId: "course12345",
                type: "综合考试",
                duration: 120,
                totalPoints: 100,
                passingScore: 60,
                sections: [
                  {
                    id: "section1",
                    title: "选择题",
                    description: "单选题和多选题",
                    points: 60,
                    questions: [
                      {
                        id: "q1",
                        type: "single",
                        content: "X线的发现者是？",
                        points: 2,
                        options: [
                          { label: "A", content: "伦琴", isCorrect: true },
                          { label: "B", content: "居里夫人", isCorrect: false },
                        ],
                      },
                    ],
                  },
                ],
              },
              null,
              2,
            ),
          },
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  id: "exam12345",
                  title: "医学影像诊断基础考试",
                  status: "draft",
                  createdAt: "2023-05-20T08:30:00Z",
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 400,
              code: "INVALID_REQUEST",
              message: "请求数据无效",
              description: "缺少必要字段或数据格式错误",
            },
            {
              status: 400,
              code: "INVALID_PASSING_SCORE",
              message: "及格分数不能超过总分",
              description: "及格分数设置错误",
            },
          ],
        },
      ],
    },
    {
      name: "用户管理",
      description: "系统用户的创建、查询和管理",
      endpoints: [
        {
          path: "/users",
          method: "GET",
          description: "获取用户列表",
          authentication: true,
          requestParams: [
            {
              name: "role",
              type: "string",
              required: false,
              description: "用户角色过滤",
              example: "trainer",
            },
            {
              name: "status",
              type: "string",
              required: false,
              description: "用户状态过滤",
              example: "active",
            },
            {
              name: "search",
              type: "string",
              required: false,
              description: "搜索关键词",
              example: "张医生",
            },
            {
              name: "page",
              type: "integer",
              required: false,
              description: "页码",
              example: "1",
            },
            {
              name: "limit",
              type: "integer",
              required: false,
              description: "每页数量",
              example: "20",
            },
          ],
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  total: 2,
                  page: 1,
                  limit: 20,
                  items: [
                    {
                      id: "u12345",
                      username: "zhangdoctor",
                      name: "张医生",
                      email: "zhang@hospital.com",
                      role: "trainer",
                      status: "active",
                      createdAt: "2023-01-15T08:30:00Z",
                    },
                  ],
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 401,
              code: "UNAUTHORIZED",
              message: "未授权访问",
              description: "需要有效的访问令牌",
            },
          ],
        },
        {
          path: "/users",
          method: "POST",
          description: "创建新用户",
          authentication: true,
          requestBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                username: "wangdoctor",
                name: "王医生",
                email: "wang@hospital.com",
                phone: "13700137000",
                role: "trainer",
                profile: {
                  organization: "上海第一人民医院",
                  position: "副主任医师",
                  specialties: ["外科", "微创手术"],
                },
              },
              null,
              2,
            ),
          },
          responseBody: {
            contentType: "application/json",
            example: JSON.stringify(
              {
                success: true,
                data: {
                  id: "u34567",
                  username: "wangdoctor",
                  name: "王医生",
                  email: "wang@hospital.com",
                  role: "trainer",
                  status: "active",
                  createdAt: "2023-05-30T10:00:00Z",
                },
              },
              null,
              2,
            ),
          },
          errorResponses: [
            {
              status: 400,
              code: "INVALID_REQUEST",
              message: "请求数据无效",
              description: "缺少必要字段或数据格式错误",
            },
            {
              status: 409,
              code: "USER_EXISTS",
              message: "用户名或邮箱已存在",
              description: "用户名或邮箱已被其他用户使用",
            },
            {
              status: 400,
              code: "INVALID_ROLE",
              message: "无效的用户角色",
              description: "角色必须是 admin、trainer 或 student",
            },
          ],
        },
      ],
    },
  ],
}
