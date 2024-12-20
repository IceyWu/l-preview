# LPreview

一个现代化的 Vue 3 预览组件库。

## 文档

更多详细信息，请访问 [l-preview-docs.netlify.app](https://l-preview-docs.netlify.app)

## 特性

- 🚀 基于 Vue 3 和 TypeScript
- 📦 支持按需引入
- 🎨 现代化的设计风格
- 📱 响应式设计

## 快速开始

### 安装

```bash
npm install l-preview
```

### 使用

```ts
import { createApp } from 'vue' 
import LPreview from 'l-preview' 
import 'l-preview/dist/style.css' 
const app = createApp(App) 
app.use(LPreview)
```

或者按需引入：

```ts
import { Image } from 'l-preview' 
import 'l-preview/dist/style.css'
```