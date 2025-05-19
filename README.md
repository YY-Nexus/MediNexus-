# YanYu MediNexus³-Admin

## 部署要求

- Node.js 22.x 或更高版本
- npm 10.x 或更高版本

## 本地开发

1. 安装依赖：
   \`\`\`bash
   npm install
   \`\`\`

2. 运行开发服务器：
   \`\`\`bash
   npm run dev
   \`\`\`

3. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 环境变量

复制 `.env.local.example` 文件并重命名为 `.env.local`，然后填写必要的环境变量：

- `TRANSLATOR_API_KEY` - Azure 翻译服务 API 密钥
- `TRANSLATOR_REGION` - Azure 翻译服务区域
- `JWT_SECRET` - JWT 签名密钥
- `NEXT_PUBLIC_APP_URL` - 应用 URL

## Vercel 部署

确保在 Vercel 项目设置中：

1. 设置 Node.js 版本为 22.x
2. 添加所有必要的环境变量
3. 使用 `npm` 作为包管理器

## 故障排除

如果遇到部署问题：

1. 确保 Node.js 版本为 22.x
2. 尝试清除 Vercel 构建缓存
3. 检查环境变量是否正确设置
4. 查看构建日志以获取详细错误信息
\`\`\`

### 11. 创建 Node.js 22 兼容性检查页面
