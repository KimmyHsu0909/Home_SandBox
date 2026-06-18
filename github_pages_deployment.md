# GitHub Pages Deployment

本项目已经配置为可部署到 GitHub Pages。

## 已完成的项目改动

```text
vite.config.ts
```

使用：

```ts
base: './'
```

这样构建后的资源路径会以相对路径加载，适合 GitHub Pages 的项目路径：

```text
https://你的用户名.github.io/仓库名/
```

```text
src/config/assetPaths.ts
```

统一生成资源路径。地图、tileset、设备、家具、玩家图片都通过 `import.meta.env.BASE_URL` 加载。

```text
.github/workflows/deploy.yml
```

GitHub Actions 部署文件。每次 push 到 `main` 后会自动：

```text
npm ci
npm run build
上传 dist 到 GitHub Pages
```

## 第一次发布步骤

1. 在 GitHub 创建一个新仓库，例如：

```text
acc-ai-identity-sandbox
```

2. 在本地项目目录初始化 git，如果还没有：

```bash
git init
```

3. 添加远程仓库：

```bash
git remote add origin https://github.com/你的用户名/acc-ai-identity-sandbox.git
```

4. 提交并推送：

```bash
git add .
git commit -m "Initial GitHub Pages sandbox"
git branch -M main
git push -u origin main
```

5. 打开 GitHub 仓库页面：

```text
Settings -> Pages
```

6. 在 Build and deployment 中选择：

```text
Source: GitHub Actions
```

7. 回到：

```text
Actions
```

等待 `Deploy to GitHub Pages` 工作流完成。

8. 部署完成后，访问：

```text
https://你的用户名.github.io/acc-ai-identity-sandbox/
```

## 更新项目

以后每次修改后：

```bash
git add .
git commit -m "Update sandbox"
git push
```

GitHub Actions 会自动重新构建和部署。

## LLM API 注意事项

当前 `src/config/llmConfig.ts` 默认是：

```text
provider: mock
```

GitHub Pages 是纯静态托管，不能安全保存 API key。不要把真实 API key 写进前端配置再推到 GitHub。

如果要在线公开版本接真实 LLM，应使用后端代理，例如：

```text
Cloudflare Worker
Vercel Serverless Function
Netlify Function
自己的 Node server
```

然后让 `src/config/llmConfig.ts` 的 `endpoint` 指向你的代理地址。

