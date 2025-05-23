export interface ApiEndpoint {
  path: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  description: string
  requestParams?: ApiParameter[]
  requestBody?: ApiRequestBody
  responseBody: ApiResponseBody
  errorResponses?: ApiErrorResponse[]
  authentication?: boolean
  rateLimit?: string
  example?: {
    request?: string
    response?: string
  }
}

export interface ApiParameter {
  name: string
  type: string
  required: boolean
  description: string
  example?: string
}

export interface ApiRequestBody {
  contentType: string
  schema: any
  example?: string
}

export interface ApiResponseBody {
  contentType: string
  schema: any
  example?: string
}

export interface ApiErrorResponse {
  status: number
  code: string
  message: string
  description?: string
}

export interface ApiSection {
  name: string
  description: string
  endpoints: ApiEndpoint[]
}

export interface ApiDocumentation {
  title: string
  version: string
  baseUrl: string
  description: string
  authentication: {
    type: string
    description: string
  }
  sections: ApiSection[]
}
