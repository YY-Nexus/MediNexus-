"use client"

import { UsageExamples } from "@/components/api-docs/usage-examples"

export default function ApiExamplesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">API 使用场景示例</h1>
      <p className="text-muted-foreground mb-8">
        以下示例展示了如何在不同场景和编程语言中使用言语医枢³培训师认证系统 API。
      </p>

      <UsageExamples
        title="用户认证流程"
        description="完整的用户登录、令牌刷新和登出流程示例"
        examples={[
          {
            language: "javascript",
            label: "JavaScript",
            code: `// 用户登录
async function login(username, password) {
  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error.message);
    }
    
    // 存储令牌和用户信息
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('refreshToken', result.data.refreshToken);
    localStorage.setItem('user', JSON.stringify(result.data.user));
    
    return result.data;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
}

// 刷新令牌
async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('没有可用的刷新令牌');
    }
    
    const response = await fetch('/api/v1/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });
    
    const result = await response.json();
    
    if (!result.success) {
      // 刷新令牌失败，需要重新登录
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      throw new Error(result.error.message);
    }
    
    // 更新访问令牌
    localStorage.setItem('token', result.data.token);
    
    return result.data;
  } catch (error) {
    console.error('刷新令牌失败:', error);
    throw error;
  }
}

// 登出
async function logout() {
  try {
    const token = localStorage.getItem('token');
    
    if (token) {
      await fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${token}\`
        }
      });
    }
    
    // 清除本地存储
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    return true;
  } catch (error) {
    console.error('登出失败:', error);
    // 即使API调用失败，也清除本地存储
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return false;
  }
}

// 创建带有认证的API请求函数
async function apiRequest(url, options = {}) {
  try {
    let token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('未登录');
    }
    
    // 设置默认选项
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${token}\`
      }
    };
    
    // 合并选项
    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };
    
    let response = await fetch(url, requestOptions);
    
    // 处理401错误（令牌过期）
    if (response.status === 401) {
      try {
        // 尝试刷新令牌
        const refreshResult = await refreshToken();
        
        // 使用新令牌重试请求
        requestOptions.headers.Authorization = \`Bearer \${refreshResult.token}\`;
        response = await fetch(url, requestOptions);
      } catch (refreshError) {
        // 刷新令牌失败，需要重新登录
        throw new Error('会话已过期，请重新登录');
      }
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error.message);
    }
    
    return result.data;
  } catch (error) {
    console.error('API请求失败:', error);
    throw error;
  }
}

// 使用示例
async function example() {
  try {
    // 登录
    const loginResult = await login('doctor_zhang', 'secure_password');
    console.log('登录成功:', loginResult);
    
    // 获取认证申请列表
    const applications = await apiRequest('/api/v1/certification/applications');
    console.log('认证申请列表:', applications);
    
    // 提交新的认证申请
    const newApplication = await apiRequest('/api/v1/certification/applications', {
      method: 'POST',
      body: JSON.stringify({
        certificationType: "高级培训师",
        specialties: ["内科", "心脏病学"],
        qualifications: [
          {
            type: "医师资格证",
            number: "1234567890",
            issueDate: "2015-01-15",
            expiryDate: "2025-01-14",
            issuingAuthority: "国家卫生健康委员会"
          }
        ]
      })
    });
    console.log('新申请已提交:', newApplication);
    
    // 登出
    await logout();
    console.log('已登出');
  } catch (error) {
    console.error('操作失败:', error);
  }
}

// 执行示例
example();`,
          },
          {
            language: "python",
            label: "Python",
            code: `import requests
import json
import os
from typing import Dict, Any, Optional

# API基础URL
BASE_URL = "http://localhost:3000/api/v1"

# 令牌存储
TOKEN_FILE = ".tokens.json"

def save_tokens(token: str, refresh_token: str, user: Dict[str, Any]) -> None:
    """保存令牌和用户信息到文件"""
    with open(TOKEN_FILE, "w") as f:
        json.dump({
            "token": token,
            "refresh_token": refresh_token,
            "user": user
        }, f)

def load_tokens() -> Optional[Dict[str, Any]]:
    """从文件加载令牌和用户信息"""
    if not os.path.exists(TOKEN_FILE):
        return None
    
    try:
        with open(TOKEN_FILE, "r") as f:
            return json.load(f)
    except:
        return None

def clear_tokens() -> None:
    """清除令牌文件"""
    if os.path.exists(TOKEN_FILE):
        os.remove(TOKEN_FILE)

def login(username: str, password: str) -> Dict[str, Any]:
    """用户登录"""
    url = f"{BASE_URL}/auth/login"
    
    response = requests.post(url, json={
        "username": username,
        "password": password
    })
    
    data = response.json()
    
    if not data.get("success"):
        error = data.get("error", {})
        raise Exception(f"登录失败: {error.get('message', '未知错误')}")
    
    # 保存令牌和用户信息
    result = data["data"]
    save_tokens(result["token"], result["refreshToken"], result["user"])
    
    return result

def refresh_token() -> Dict[str, Any]:
    """刷新访问令牌"""
    tokens = load_tokens()
    
    if not tokens or "refresh_token" not in tokens:
        raise Exception("没有可用的刷新令牌")
    
    url = f"{BASE_URL}/auth/refresh"
    
    response = requests.post(url, json={
        "refreshToken": tokens["refresh_token"]
    })
    
    data = response.json()
    
    if not data.get("success"):
        # 刷新令牌失败，清除令牌
        clear_tokens()
        error = data.get("error", {})
        raise Exception(f"刷新令牌失败: {error.get('message', '未知错误')}")
    
    # 更新访问令牌
    result = data["data"]
    tokens["token"] = result["token"]
    save_tokens(tokens["token"], tokens["refresh_token"], tokens["user"])
    
    return result

def logout() -> bool:
    """用户登出"""
    tokens = load_tokens()
    
    if tokens and "token" in tokens:
        url = f"{BASE_URL}/auth/logout"
        
        try:
            requests.post(url, headers={
                "Authorization": f"Bearer {tokens['token']}"
            })
        except:
            pass
    
    # 清除令牌
    clear_tokens()
    
    return True

def api_request(endpoint: str, method: str = "GET", data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """发送带认证的API请求"""
    tokens = load_tokens()
    
    if not tokens or "token" not in tokens:
        raise Exception("未登录")
    
    url = f"{BASE_URL}{endpoint}"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {tokens['token']}"
    }
    
    try:
        if method == "GET":
            response = requests.get(url, headers=headers)
        elif method == "POST":
            response = requests.post(url, headers=headers, json=data)
        elif method == "PUT":
            response = requests.put(url, headers=headers, json=data)
        elif method == "DELETE":
            response = requests.delete(url, headers=headers)
        else:
            raise Exception(f"不支持的HTTP方法: {method}")
        
        # 处理401错误（令牌过期）
        if response.status_code == 401:
            # 尝试刷新令牌
            refresh_result = refresh_token()
            
            # 更新请求头中的令牌
            headers["Authorization"] = f"Bearer {refresh_result['token']}"
            
            # 重试请求
            if method == "GET":
                response = requests.get(url, headers=headers)
            elif method == "POST":
                response = requests.post(url, headers=headers, json=data)
            elif method == "PUT":
                response = requests.put(url, headers=headers, json=data)
            elif method == "DELETE":
                response = requests.delete(url, headers=headers)
        
        data = response.json()
        
        if not data.get("success"):
            error = data.get("error", {})
            raise Exception(f"API请求失败: {error.get('message', '未知错误')}")
        
        return data["data"]
    
    except Exception as e:
        if "会话已过期" in str(e):
            # 清除令牌
            clear_tokens()
        raise e

def example():
    """使用示例"""
    try:
        # 登录
        login_result = login("doctor_zhang", "secure_password")
        print("登录成功:", login_result)
        
        # 获取认证申请列表
        applications = api_request("/certification/applications")
        print("认证申请列表:", applications)
        
        # 提交新的认证申请
        new_application = api_request("/certification/applications",
            method="POST",
            data={
                "certificationType": "高级培训师",
                "specialties": ["内科", "心脏病学"],
                "qualifications": [
                    {
                        "type": "医师资格证",
                        "number": "1234567890",
                        "issueDate": "2015-01-15",
                        "expiryDate": "2025-01-14",
                        "issuingAuthority": "国家卫生健康委员会"
                    }
                ]
            })
        print("新申请已提交:", new_application)
        
        # 登出
        logout()
        print("已登出")
    except Exception as e:
        print("操作失败:", e)

# 执行示例
if __name__ == "__main__":
    example()`,
          },
          {
            language: "java",
            label: "Java",
            code: `import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class ApiClient {
    private static final String BASE_URL = "http://localhost:3000/api/v1";
    private static final ObjectMapper mapper = new ObjectMapper();
    private static final HttpClient client = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .connectTimeout(Duration.ofSeconds(10))
            .build();
    
    private String token;
    private String refreshToken;
    private JsonNode user;
    
    // 用户登录
    public JsonNode login(String username, String password) throws IOException, InterruptedException {
        ObjectNode requestBody = mapper.createObjectNode();
        requestBody.put("username", username);
        requestBody.put("password", password);
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/auth/login"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody.toString()))
                .build();
        
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        JsonNode responseJson = mapper.readTree(response.body());
        
        if (!responseJson.get("success").asBoolean()) {
            JsonNode error = responseJson.get("error");
            throw new RuntimeException("登录失败: " + error.get("message").asText());
        }
        
        JsonNode data = responseJson.get("data");
        this.token = data.get("token").asText();
        this.refreshToken = data.get("refreshToken").asText();
        this.user = data.get("user");
        
        return data;
    }
    
    // 刷新令牌
    public JsonNode refreshToken() throws IOException, InterruptedException {
        if (this.refreshToken == null) {
            throw new RuntimeException("没有可用的刷新令牌");
        }
        
        ObjectNode requestBody = mapper.createObjectNode();
        requestBody.put("refreshToken", this.refreshToken);
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/auth/refresh"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody.toString()))
                .build();
        
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        JsonNode responseJson = mapper.readTree(response.body());
        
        if (!responseJson.get("success").asBoolean()) {
            this.token = null;
            this.refreshToken = null;
            this.user = null;
            
            JsonNode error = responseJson.get("error");
            throw new RuntimeException("刷新令牌失败: " + error.get("message").asText());
        }
        
        JsonNode data = responseJson.get("data");
        this.token = data.get("token").asText();
        
        return data;
    }
    
    // 登出
    public boolean logout() throws IOException, InterruptedException {
        if (this.token != null) {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_URL + "/auth/logout"))
                        .header("Authorization", "Bearer " + this.token)
                        .POST(HttpRequest.BodyPublishers.noBody())
                        .build();
                
                client.send(request, HttpResponse.BodyHandlers.ofString());
            } catch (Exception e) {
                // 忽略错误
            }
        }
        
        this.token = null;
        this.refreshToken = null;
        this.user = null;
        
        return true;
    }
    
    // 发送API请求
    public JsonNode apiRequest(String endpoint, String method, JsonNode body) throws IOException, InterruptedException {
        if (this.token == null) {
            throw new RuntimeException("未登录");
        }
        
        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + endpoint))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + this.token);
        
        HttpRequest request;
        switch (method) {
            case "GET":
                request = requestBuilder.GET().build();
                break;
            case "POST":
                request = requestBuilder.POST(HttpRequest.BodyPublishers.ofString(body != null ? body.toString() : "{}")).build();
                break;
            case "PUT":
                request = requestBuilder.PUT(HttpRequest.BodyPublishers.ofString(body != null ? body.toString() : "{}")).build();
                break;
            case "DELETE":
                request = requestBuilder.DELETE().build();
                break;
            default:
                throw new RuntimeException("不支持的HTTP方法: " + method);
        }
        
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        JsonNode responseJson = mapper.readTree(response.body());
        
        // 处理401错误（令牌过期）
        if (response.statusCode() == 401) {
            try {
                // 尝试刷新令牌
                JsonNode refreshResult = refreshToken();
                
                // 更新请求头中的令牌
                requestBuilder.header("Authorization", "Bearer " + this.token);
                
                // 重试请求
                switch (method) {
                    case "GET":
                        request = requestBuilder.GET().build();
                        break;
                    case "POST":
                        request = requestBuilder.POST(HttpRequest.BodyPublishers.ofString(body != null ? body.toString() : "{}")).build();
                        break;
                    case "PUT":
                        request = requestBuilder.PUT(HttpRequest.BodyPublishers.ofString(body != null ? body.toString() : "{}")).build();
                        break;
                    case "DELETE":
                        request = requestBuilder.DELETE().build();
                        break;
                }
                
                response = client.send(request, HttpResponse.BodyHandlers.ofString());
                responseJson = mapper.readTree(response.body());
            } catch (Exception e) {
                // 刷新令牌失败，清除令牌
                this.token = null;
                this.refreshToken = null;
                this.user = null;
                throw new RuntimeException("会话已过期，请重新登录");
            }
        }
        
        if (!responseJson.get("success").asBoolean()) {
            JsonNode error = responseJson.get("error");
            throw new RuntimeException("API请求失败: " + error.get("message").asText());
        }
        
        return responseJson.get("data");
    }
    
    // 使用示例
    public static void main(String[] args) {
        try {
            ApiClient client = new ApiClient();
            
            // 登录
            JsonNode loginResult = client.login("doctor_zhang", "secure_password");
            System.out.println("登录成功: " + loginResult);
            
            // 获取认证申请列表
            JsonNode applications = client.apiRequest("/certification/applications", "GET", null);
            System.out.println("认证申请列表: " + applications);
            
            // 提交新的认证申请
            ObjectNode applicationData = mapper.createObjectNode();
            applicationData.put("certificationType", "高级培训师");
            
            ArrayNode specialties = mapper.createArrayNode();
            specialties.add("内科");
            specialties.add("心脏病学");
            applicationData.set("specialties", specialties);
            
            ArrayNode qualifications = mapper.createArrayNode();
            ObjectNode qualification = mapper.createObjectNode();
            qualification.put("type", "医师资格证");
            qualification.put("number", "1234567890");
            qualification.put("issueDate", "2015-01-15");
            qualification.put("expiryDate", "2025-01-14");
            qualification.put("issuingAuthority", "国家卫生健康委员会");
            qualifications.add(qualification);
            applicationData.set("qualifications", qualifications);
            
            JsonNode newApplication = client.apiRequest("/certification/applications", "POST", applicationData);
            System.out.println("新申请已提交: " + newApplication);
            
            // 登出
            client.logout();
            System.out.println("已登出");
        } catch (Exception e) {
            System.err.println("操作失败: " + e.getMessage());
            e.printStackTrace();
        }
    }
}`,
          },
        ]}
      />

      <UsageExamples
        title="培训课程管理流程"
        description="创建、更新和管理培训课程的完整流程示例"
        examples={[
          {
            language: "javascript",
            label: "JavaScript",
            code: `// 假设已经有了apiRequest函数（见上一个示例）

// 获取课程列表
async function getCourses(filters = {}) {
  try {
    // 构建查询参数
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    
    const queryString = queryParams.toString() ? \`?\${queryParams.toString()}\` : '';
    
    // 发送请求
    const courses = await apiRequest(\`/training/courses\${queryString}\`);
    return courses;
  } catch (error) {
    console.error('获取课程列表失败:', error);
    throw error;
  }
}

// 创建新课程
async function createCourse(courseData) {
  try {
    const newCourse = await apiRequest('/training/courses', {
      method: 'POST',
      body: JSON.stringify(courseData)
    });
    return newCourse;
  } catch (error) {
    console.error('创建课程失败:', error);
    throw error;
  }
}

// 获取课程详情
async function getCourseDetails(courseId) {
  try {
    const course = await apiRequest(\`/training/courses/\${courseId}\`);
    return course;
  } catch (error) {
    console.error('获取课程详情失败:', error);
    throw error;
  }
}

// 更新课程
async function updateCourse(courseId, updateData) {
  try {
    const updatedCourse = await apiRequest(\`/training/courses/\${courseId}\`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    });
    return updatedCourse;
  } catch (error) {
    console.error('更新课程失败:', error);
    throw error;
  }
}

// 创建培训活动
async function createTrainingSession(sessionData) {
  try {
    const newSession = await apiRequest('/training/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData)
    });
    return newSession;
  } catch (error) {
    console.error('创建培训活动失败:', error);
    throw error;
  }
}

// 获取培训活动列表
async function getTrainingSessions(filters = {}) {
  try {
    // 构建查询参数
    const queryParams = new URLSearchParams();
    
    if (filters.courseId) queryParams.append('courseId', filters.courseId);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    
    const queryString = queryParams.toString() ? \`?\${queryParams.toString()}\` : '';
    
    // 发送请求
    const sessions = await apiRequest(\`/training/sessions\${queryString}\`);
    return sessions;
  } catch (error) {
    console.error('获取培训活动列表失败:', error);
    throw error;
  }
}

// 使用示例
async function courseManagementExample() {
  try {
    // 获取已发布的课程列表
    const publishedCourses = await getCourses({ status: 'published' });
    console.log('已发布课程:', publishedCourses);
    
    // 创建新课程
    const newCourseData = {
      title: "心脏病急救技能培训",
      description: "本课程旨在提高医护人员对心脏病急救的处理能力",
      category: "临床技能",
      level: "高级",
      duration: 16,
      objectives: [
        "掌握心脏病急救基本技能",
        "学习心肺复苏最新指南",
        "熟悉除颤器的使用方法"
      ],
      prerequisites: [
        "基础医学知识",
        "初级急救证书"
      ],
      modules: [
        {
          title: "心脏病基础知识",
          description: "心脏病的类型、症状和风险因素",
          duration: 4,
          content: "详细内容..."
        },
        {
          title: "心肺复苏技术",
          description: "最新心肺复苏指南和实践",
          duration: 6,
          content: "详细内容..."
        },
        {
          title: "除颤器使用",
          description: "自动体外除颤器(AED)的使用方法",
          duration: 6,
          content: "详细内容..."
        }
      ],
      materials: [
        {
          type: "pdf",
          title: "心脏病急救手册",
          fileId: "file23456"
        },
        {
          type: "video",
          title: "心肺复苏演示视频",
          fileId: "file34567"
        }
      ],
      status: "draft"
    };
    
    const newCourse = await createCourse(newCourseData);
    console.log('新课程已创建:', newCourse);
    
    // 获取课程详情
    const courseDetails = await getCourseDetails(newCourse.id);
    console.log('课程详情:', courseDetails);
    
    // 更新课程状态为已发布
    const updatedCourse = await updateCourse(newCourse.id, {
      status: "published"
    });
    console.log('课程已发布:', updatedCourse);
    
    // 创建培训活动
    const newSessionData = {
      courseId: newCourse.id,
      title: "2023年6月心脏病急救培训班",
      description: "为期两天的心脏病急救技能培训，包含理论和实践环节",
      startDate: "2023-06-15T09:00:00Z",
      endDate: "2023-06-16T17:00:00Z",
      location: "北京协和医院培训中心",
      capacity: 30,
      trainerId: "u12345",
      assistants: ["u23456", "u34567"],
      materials: [
        {
          type: "pdf",
          title: "培训日程安排",
          fileId: "file45678"
        }
      ],
      registrationDeadline: "2023-06-10T23:59:59Z",
      status: "scheduled"
    };
    
    const newSession = await createTrainingSession(newSessionData);
    console.log('新培训活动已创建:', newSession);
    
    // 获取特定课程的培训活动
    const courseSessions = await getTrainingSessions({ courseId: newCourse.id });
    console.log('课程相关培训活动:', courseSessions);
  } catch (error) {
    console.error('课程管理操作失败:', error);
  }
}

// 执行示例
courseManagementExample();`,
          },
          {
            language: "react",
            label: "React",
            code: `import React, { useState, useEffect } from 'react';
import { useAuth } from './useAuth'; // 假设有一个认证上下文

// 课程列表组件
function CourseList() {
  const { apiRequest } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: 'published',
    page: 1,
    limit: 10
  });

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      
      // 构建查询参数
      const queryParams = new URLSearchParams();
      
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.limit) queryParams.append('limit', filters.limit);
      
      const queryString = queryParams.toString() ? \`?\${queryParams.toString()}\` : '';
      
      // 发送请求
      const result = await apiRequest(\`/training/courses\${queryString}\`);
      setCourses(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div>
      <h2>培训课程列表</h2>
      
      {/* 筛选器 */}
      <div className="filters">
        <select 
          name="category" 
          value={filters.category} 
          onChange={handleFilterChange}
        >
          <option value="">所有类别</option>
          <option value="临床技能">临床技能</option>
          <option value="医学知识">医学知识</option>
          <option value="沟通技巧">沟通技巧</option>
        </select>
        
        <select 
          name="status" 
          value={filters.status} 
          onChange={handleFilterChange}
        >
          <option value="">所有状态</option>
          <option value="draft">草稿</option>
          <option value="published">已发布</option>
          <option value="archived">已归档</option>
        </select>
      </div>
      
      {/* 课程列表 */}
      <div className="course-list">
        {courses.items && courses.items.length > 0 ? (
          courses.items.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>类别: {course.category}</p>
              <p>级别: {course.level}</p>
              <p>时长: {course.duration}小时</p>
              <div className="course-actions">
                <button onClick={() => window.location.href = \`/courses/\${course.id}\`}>
                  查看详情
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>没有找到课程</p>
        )}
      </div>
      
      {/* 分页 */}
      {courses.total > filters.limit && (
        <div className="pagination">
          <button 
            disabled={filters.page === 1} 
            onClick={() => handlePageChange(filters.page - 1)}
          >
            上一页
          </button>
          <span>第 {filters.page} 页，共 {Math.ceil(courses.total / filters.limit)} 页</span>
          <button 
            disabled={filters.page >= Math.ceil(courses.total / filters.limit)} 
            onClick={() => handlePageChange(filters.page + 1)}
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
}

// 课程创建表单组件
function CourseForm({ courseId, onSuccess }) {
  const { apiRequest } = useAuth();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    duration: 0,
    objectives: [""],
    prerequisites: [""],
    modules: [
      {
        title: "",
        description: "",
        duration: 0,
        content: ""
      }
    ],
    materials: [],
    status: "draft"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 如果有courseId，则获取课程详情
  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);
  
  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const result = await apiRequest(\`/training/courses/\${courseId}\`);
      setCourse(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleObjectivesChange = (index, value) => {
    setCourse(prev => {
      const newObjectives = [...prev.objectives];
      newObjectives[index] = value;
      return {
        ...prev,
        objectives: newObjectives
      };
    });
  };
  
  const addObjective = () => {
    setCourse(prev => ({
      ...prev,
      objectives: [...prev.objectives, ""]
    }));
  };
  
  const removeObjective = (index) => {
    setCourse(prev => {
      const newObjectives = [...prev.objectives];
      newObjectives.splice(index, 1);
      return {
        ...prev,
        objectives: newObjectives
      };
    });
  };
  
  const handlePrerequisitesChange = (index, value) => {
    setCourse(prev => {
      const newPrerequisites = [...prev.prerequisites];
      newPrerequisites[index] = value;
      return {
        ...prev,
        prerequisites: newPrerequisites
      };
    });
  };
  
  const addPrerequisite = () => {
    setCourse(prev => ({
      ...prev,
      prerequisites: [...prev.prerequisites, ""]
    }));
  };
  
  const removePrerequisite = (index) => {
    setCourse(prev => {
      const newPrerequisites = [...prev.prerequisites];
      newPrerequisites.splice(index, 1);
      return {
        ...prev,
        prerequisites: newPrerequisites
      };
    });
  };
  
  const handleModuleChange = (index, field, value) => {
    setCourse(prev => {
      const newModules = [...prev.modules];
      newModules[index] = {
        ...newModules[index],
        [field]: value
      };
      return {
        ...prev,
        modules: newModules
      };
    });
  };
  
  const addModule = () => {
    setCourse(prev => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          title: "",
          description: "",
          duration: 0,
          content: ""
        }
      ]
    }));
  };
  
  const removeModule = (index) => {
    setCourse(prev => {
      const newModules = [...prev.modules];
      newModules.splice(index, 1);
      return {
        ...prev,
        modules: newModules
      };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // 验证表单
      if (!course.title || !course.category || !course.level || course.duration <= 0) {
        throw new Error("请填写所有必填字段");
      }
      
      if (course.modules.length === 0) {
        throw new Error("至少需要一个课程模块");
      }
      
      // 提交表单
      let result;
      if (courseId) {
        // 更新课程
        result = await apiRequest(\`/training/courses/\${courseId}\`, {
          method: 'PUT',
          body: JSON.stringify(course)
        });
      } else {
        // 创建课程
        result = await apiRequest('/training/courses', {
          method: 'POST',
          body: JSON.stringify(course)
        });
      }
      
      setError(null);
      
      // 调用成功回调
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && courseId) return <div>加载中...</div>;
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>{courseId ? "编辑课程" : "创建新课程"}</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">课程标题 *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={course.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">课程描述</label>
        <textarea
          id="description"
          name="description"
          value={course.description}
          onChange={handleChange}
          rows={4}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">类别 *</label>
          <select
            id="category"
            name="category"
            value={course.category}
            onChange={handleChange}
            required
          >
            <option value="">选择类别</option>
            <option value="临床技能">临床技能</option>
            <option value="医学知识">医学知识</option>
            <option value="沟通技巧">沟通技巧</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="level">级别 *</label>
          <select
            id="level"
            name="level"
            value={course.level}
            onChange={handleChange}
            required
          >
            <option value="">选择级别</option>
            <option value="初级">初级</option>
            <option value="中级">中级</option>
            <option value="高级">高级</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="duration">时长(小时) *</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>学习目标</label>
        {course.objectives.map((objective, index) => (
          <div key={index} className="array-item">
            <input
              type="text"
              value={objective}
              onChange={(e) => handleObjectivesChange(index, e.target.value)}
            />
            <button 
              type="button" 
              onClick={() => removeObjective(index)}
              className="remove-btn"
            >
              删除
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={addObjective}
          className="add-btn"
        >
          添加学习目标
        </button>
      </div>
      
      <div className="form-group">
        <label>先决条件</label>
        {course.prerequisites.map((prerequisite, index) => (
          <div key={index} className="array-item">
            <input
              type="text"
              value={prerequisite}
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            />
            <button 
              type="button" 
              onClick={() => removePrerequisite(index)}
              className="remove-btn"
            >
              删除
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={addPrerequisite}
          className="add-btn"
        >
          添加先决条件
        </button>
      </div>
      
      <div className="form-group">
        <label>课程模块 *</label>
        {course.modules.map((module, index) => (
          <div key={index} className="module-item">
            <h4>模块 {index + 1}</h4>
            <div className="form-group">
              <label>标题 *</label>
              <input
                type="text"
                value={module.title}
                onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>描述</label>
              <input
                type="text"
                value={module.description}
                onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>时长(小时) *</label>
              <input
                type="number"
                value={module.duration}
                onChange={(e) => handleModuleChange(index, 'duration', Number(e.target.value))}
                min="0.5"
                step="0.5"
                required
              />
            </div>
            <div className="form-group">
              <label>内容</label>
              <textarea
                value={module.content}
                onChange={(e) => handleModuleChange(index, 'content', e.target.value)}
                rows={4}
              />
            </div>
            <button 
              type="button" 
              onClick={() => removeModule(index)}
              className="remove-btn"
              disabled={course.modules.length <= 1}
            >
              删除模块
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={addModule}
          className="add-btn"
        >
          添加模块
        </button>
      </div>
      
      <div className="form-group">
        <label htmlFor="status">状态 *</label>
        <select
          id="status"
          name="status"
          value={course.status}
          onChange={handleChange}
          required
        >
          <option value="draft">草稿</option>
          <option value="published">发布</option>
          <option value="archived">归档</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button 
          type="submit" 
          disabled={loading}
          className="submit-btn"
        >
          {loading ? "提交中..." : courseId ? "更新课程" : "创建课程"}
        </button>
      </div>
    </form>
  );
}

// 使用示例
function CourseManagementPage() {
  const [view, setView] = useState('list');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  
  const handleCreateSuccess = (newCourse) => {
    alert(\`课程"\${newCourse.title}"创建成功！\`);
    setView('list');
  };
  
  const handleUpdateSuccess = (updatedCourse) => {
    alert(\`课程"\${updatedCourse.title}"更新成功！\`);
    setView('list');
  };
  
  return (
    <div className="course-management">
      <div className="page-header">
        <h1>课程管理</h1>
        {view === 'list' && (
          <button onClick={() => setView('create')}>创建新课程</button>
        )}
        {(view === 'create' || view === 'edit') && (
          <button onClick={() => setView('list')}>返回列表</button>
        )}
      </div>
      
      {view === 'list' && <CourseList />}
      
      {view === 'create' && (
        <CourseForm onSuccess={handleCreateSuccess} />
      )}
      
      {view === 'edit' && selectedCourseId && (
        <CourseForm 
          courseId={selectedCourseId} 
          onSuccess={handleUpdateSuccess} 
        />
      )}
    </div>
  );
}

export default CourseManagementPage;`,
          },
        ]}
      />

      <UsageExamples
        title="考核管理流程"
        description="创建考试、提交答案和评分的完整流程示例"
        examples={[
          {
            language: "javascript",
            label: "JavaScript",
            code: `// 假设已经有了apiRequest函数（见第一个示例）

// 获取考试列表
async function getExams(filters = {}) {
  try {
    // 构建查询参数
    const queryParams = new URLSearchParams();
    
    if (filters.courseId) queryParams.append('courseId', filters.courseId);
    if (filters.sessionId) queryParams.append('sessionId', filters.sessionId);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    
    const queryString = queryParams.toString() ? \`?\${queryParams.toString()}\` : '';
    
    // 发送请求
    const exams = await apiRequest(\`/assessment/exams\${queryString}\`);
    return exams;
  } catch (error) {
    console.error('获取考试列表失败:', error);
    throw error;
  }
}

// 创建新考试
async function createExam(examData) {
  try {
    const newExam = await apiRequest('/assessment/exams', {
      method: 'POST',
      body: JSON.stringify(examData)
    });
    return newExam;
  } catch (error) {
    console.error('创建考试失败:', error);
    throw error;
  }
}

// 获取考试详情
async function getExamDetails(examId) {
  try {
    const exam = await apiRequest(\`/assessment/exams/\${examId}\`);
    return exam;
  } catch (error) {
    console.error('获取考试详情失败:', error);
    throw error;
  }
}

// 提交考试答案
async function submitExamAnswers(examId, answers) {
  try {
    const submission = await apiRequest(\`/assessment/exams/\${examId}/submit\`, {
      method: 'POST',
      body: JSON.stringify({ answers })
    });
    return submission;
  } catch (error) {
    console.error('提交考试答案失败:', error);
    throw error;
  }
}

// 获取考试提交记录
async function getExamSubmissions(filters = {}) {
  try {
    // 构建查询参数
    const queryParams = new URLSearchParams();
    
    if (filters.examId) queryParams.append('examId', filters.examId);
    if (filters.userId) queryParams.append('userId', filters.userId);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    
    const queryString = queryParams.toString() ? \`?\${queryParams.toString()}\` : '';
    
    // 发送请求
    const submissions = await apiRequest(\`/assessment/submissions\${queryString}\`);
    return submissions;
  } catch (error) {
    console.error('获取考试提交记录失败:', error);
    throw error;
  }
}

// 评分考试提交
async function gradeExamSubmission(submissionId, grades) {
  try {
    const gradedSubmission = await apiRequest(\`/assessment/submissions/\${submissionId}/grade\`, {
      method: 'POST',
      body: JSON.stringify({ grades })
    });
    return gradedSubmission;
  } catch (error) {
    console.error('评分考试提交失败:', error);
    throw error;
  }
}

// 使用示例
async function examManagementExample() {
  try {
    // 获取已发布的考试列表
    const publishedExams = await getExams({ status: 'published' });
    console.log('已发布考试:', publishedExams);
    
    // 创建新考试
    const newExamData = {
      title: "心脏病急救技能考核",
      description: "本考试评估学员对心脏病急救技能的掌握程度",
      courseId: "course12345",
      sessionId: "session12345",
      type: "综合考核",
      duration: 90,
      totalPoints: 100,
      passingScore: 70,
      startTime: "2023-06-16T14:00:00Z",
      endTime: "2023-06-16T15:30:00Z",
      instructions: "请仔细阅读每道题目，理论部分完成后进行实操考核",
      sections: [
        {
          title: "理论知识",
          description: "心脏病急救基础知识",
          points: 40,
          questions: [
            {
              type: "单选",
              content: "以下哪项不是心脏骤停的常见原因？",
              points: 5,
              options: [
                {
                  label: "A",
                  content: "心肌梗死",
                  isCorrect: false
                },
                {
                  label: "B",
                  content: "心律失常",
                  isCorrect: false
                },
                {
                  label: "C",
                  content: "肺炎",
                  isCorrect: true
                },
                {
                  label: "D",
                  content: "药物中毒",
                  isCorrect: false
                }
              ],
              explanation: "肺炎通常不会直接导致心脏骤停，而心肌梗死、心律失常和药物中毒都是心脏骤停的常见原因。"
            },
            {
              type: "多选",
              content: "心肺复苏的基本步骤包括哪些？",
              points: 10,
              options: [
                {
                  label: "A",
                  content: "检查意识和呼吸",
                  isCorrect: true
                },
                {
                  label: "B",
                  content: "胸外按压",
                  isCorrect: true
                },
                {
                  label: "C",
                  content: "开放气道",
                  isCorrect: true
                },
                {
                  label: "D",
                  content: "人工呼吸",
                  isCorrect: true
                }
              ],
              explanation: "心肺复苏的基本步骤包括：检查意识和呼吸、胸外按压、开放气道、人工呼吸。"
            }
          ]
        },
        {
          title: "实操技能",
          description: "心肺复苏实际操作",
          points: 60,
          questions: [
            {
              type: "操作",
              content: "请演示标准的心肺复苏操作流程",
              points: 30,
              answer: "按照2020年心肺复苏指南执行完整操作流程",
              explanation: "评分标准：按压深度5-6cm，频率100-120次/分钟，按压与通气比例30:2"
            },
            {
              type: "操作",
              content: "请正确使用AED除颤器",
              points: 30,
              answer: "正确连接电极片，按照设备提示操作",
              explanation: "评分标准：电极片位置正确，操作流程规范，安全意识到位"
            }
          ]
        }
      ],
      status: "draft"
    };
    
    const newExam = await createExam(newExamData);
    console.log('新考试已创建:', newExam);
    
    // 获取考试详情
    const examDetails = await getExamDetails(newExam.id);
    console.log('考试详情:', examDetails);
    
    // 模拟学员提交考试答案
    const studentAnswers = [
      {
        questionId: examDetails.sections[0].questions[0].id,
        answer: "C"
      },
      {
        questionId: examDetails.sections[0].questions[1].id,
        answer: ["A", "B", "C", "D"]
      },
      {
        questionId: examDetails.sections[1].questions[0].id,
        answer: "学员演示了标准的心肺复苏操作流程，按压深度和频率符合要求"
      },
      {
        questionId: examDetails.sections[1].questions[1].id,
        answer: "学员正确使用了AED除颤器，电极片位置准确，操作流程规范"
      }
    ];
    
    // 提交考试答案
    const submission = await submitExamAnswers(newExam.id, studentAnswers);
    console.log('考试答案已提交:', submission);
    
    // 获取考试提交记录
    const submissions = await getExamSubmissions({ examId: newExam.id });
    console.log('考试提交记录:', submissions);
    
    // 模拟教师评分
    const grades = [
      {
        questionId: examDetails.sections[0].questions[0].id,
        score: 5, // 满分
        feedback: "回答正确"
      },
      {
        questionId: examDetails.sections[0].questions[1].id,
        score: 10, // 满分
        feedback: "回答正确"
      },
      {
        questionId: examDetails.sections[1].questions[0].id,
        score: 25, // 部分得分
        feedback: "按压深度正确，但频率略快"
      },
      {
        questionId: examDetails.sections[1].questions[1].id,
        score: 28, // 部分得分
        feedback: "电极片位置正确，但操作流程有小瑕疵"
      }
    ];
    
    // 评分考试提交
    const gradedSubmission = await gradeExamSubmission(submission.id, grades);
    console.log('考试已评分:', gradedSubmission);
  } catch (error) {
    console.error('考试管理操作失败:', error);
  }
}

// 执行示例
examManagementExample();`,
          },
        ]}
      />
    </div>
  )
}
