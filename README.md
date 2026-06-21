# 资源分享平台

一个现代化的资源分享网站，基于 Vue 3 + Vite + Tailwind CSS 构建。支持分类浏览、资源搜索、资源详情查看等功能。

## 功能特点

- 🎨 **现代化UI设计** - 紫色渐变动态背景，流畅的动画效果
- 🔍 **全文搜索** - 支持跨分类搜索资源
- 📂 **13个资源分类** - 软件工具、图片资源、儿童学习资料、音乐资源、小吃资源、健身-瑜伽-太极、互联网副业项目、手机游戏、古籍、电子书、影视资源、计算机专业技能教程、成人学习资料
- 🖼️ **多图展示** - 资源详情页支持多张截图展示、全屏浏览
- 📱 **响应式设计** - 适配桌面端和移动端
- ⚡ **静态数据** - 无需后端，纯 JSON 数据驱动

## 快速开始

### 环境要求

- Node.js 16.x 或更高版本
- npm 8.x 或更高版本

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173/ 查看网站

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
资源分享/
├── src/
│   ├── components/          # Vue 组件
│   │   ├── Header.vue      # 顶部导航栏
│   │   ├── Footer.vue      # 底部
│   │   ├── ResourceList.vue # 资源列表
│   │   └── ResourceDetail.vue # 资源详情弹窗
│   ├── data/
│   │   ├── categories/     # 分类数据目录
│   │   │   ├── software.json      # 软件工具
│   │   │   ├── images.json       # 图片资源
│   │   │   ├── kids-learning.json # 儿童学习资料
│   │   │   ├── music.json        # 音乐资源
│   │   │   ├── snacks.json       # 小吃资源
│   │   │   ├── fitness.json      # 健身-瑜伽-太极
│   │   │   ├── side-hustle.json  # 互联网副业项目
│   │   │   ├── mobile-games.json # 手机游戏
│   │   │   ├── ancient-books.json # 古籍
│   │   │   ├── e-books.json      # 电子书
│   │   │   ├── movies.json       # 影视资源
│   │   │   ├── tech-tutorials.json # 计算机专业技能教程
│   │   │   └── adult-learning.json # 成人学习资料
│   │   └── categories.json  # 分类导航配置
│   ├── utils/
│   │   └── resourceData.js # 数据加载工具
│   ├── App.vue             # 主应用
│   ├── main.js             # 入口文件
│   └── style.css           # 全局样式
├── public/                 # 静态资源
├── package.json            # 项目配置
├── vite.config.js          # Vite 配置
├── tailwind.config.js      # Tailwind CSS 配置
└── postcss.config.js       # PostCSS 配置
```

## 数据管理

### 新增资源

1. 打开对应的分类 JSON 文件，例如：`src/data/categories/software.json`

2. 在 `resources` 数组中添加新的资源对象，格式如下：

```json
{
  "id": "software-unique-id",
  "title": "资源标题",
  "description": "资源描述内容",
  "uploadTime": "2024-01-15",
  "screenshots": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ],
  "downloadUrl": "https://example.com/download",
  "tags": ["标签1", "标签2", "标签3"],
  "size": "500MB",
  "language": "中文"
}
```

**字段说明：**

| 字段 | 必填 | 说明 |
|------|------|------|
| id | ✅ | 唯一标识符，建议格式：`分类id-序号` |
| title | ✅ | 资源标题 |
| description | ✅ | 资源详细描述 |
| uploadTime | ✅ | 上传时间，格式：`YYYY-MM-DD` |
| screenshots | ✅ | 截图数组，建议 2-4 张 |
| downloadUrl | ✅ | 下载链接 |
| tags | ✅ | 标签数组，用于搜索匹配 |
| size | ❌ | 文件大小 |
| language | ❌ | 语言 |

### 修改资源

1. 找到资源所在的分类 JSON 文件
2. 通过资源的 `id` 找到对应条目
3. 修改相应字段的值

**示例：** 修改某个资源的标题

```json
// 修改前
"title": "旧标题"

// 修改后
"title": "新标题"
```

### 删除资源

1. 打开资源所在的分类 JSON 文件
2. 找到对应资源条目
3. 删除整个资源对象

```json
// 删除这个对象
{
  "id": "software-to-delete",
  "title": "要删除的资源",
  ...
}
```

## 分类管理

### 新增资源分类

**步骤 1：创建分类数据文件**

在 `src/data/categories/` 目录下创建新的 JSON 文件，例如 `new-category.json`：

```json
{
  "categoryId": "new-category",
  "categoryName": "新分类名称",
  "resources": [
    {
      "id": "new-category-001",
      "title": "第一个资源",
      "description": "资源描述",
      "uploadTime": "2024-01-01",
      "screenshots": [
        "https://example.com/image.jpg"
      ],
      "downloadUrl": "#",
      "tags": ["标签"],
      "size": "100MB",
      "language": "中文"
    }
  ]
}
```

**步骤 2：更新分类导航配置**

编辑 `src/data/categories.json`，在 `categories` 数组中添加新分类：

```json
{
  "categories": [
    {
      "id": "new-category",
      "name": "新分类名称",
      "icon": "📁"
    }
  ]
}
```

**字段说明：**

| 字段 | 说明 |
|------|------|
| id | 必须与 JSON 文件名一致（不含 `.json`） |
| name | 分类显示名称 |
| icon | emoji 图标，会在导航栏显示 |

**步骤 3：在数据加载器中注册**

编辑 `src/utils/resourceData.js`，在文件顶部添加导入：

```javascript
import newCategoryData from '../data/categories/new-category.json'
```

在 `categoryDataMap` 对象中添加映射：

```javascript
const categoryDataMap = {
  // ... 其他分类
  'new-category': newCategoryData
}
```

### 修改分类信息

**方法一：修改分类导航配置**

编辑 `src/data/categories.json`：

```json
{
  "id": "software",
  "name": "新名称",    // 修改这里
  "icon": "🆕"         // 修改图标
}
```

**方法二：修改分类数据文件**

编辑对应的分类 JSON 文件：

```json
{
  "categoryId": "software",
  "categoryName": "新分类名称"  // 修改这里
}
```

> 注意：如果修改了 `categoryId`，必须同时修改：
> - `src/data/categories.json` 中的 `id`
> - `src/data/categories/xxx.json` 文件名
> - `src/utils/resourceData.js` 中的映射键名

### 删除分类

1. **删除分类数据文件**
   ```bash
   # 删除 src/data/categories/xxx.json 文件
   ```

2. **更新分类导航配置**
   
   编辑 `src/data/categories.json`，删除对应条目

3. **更新数据加载器**
   
   编辑 `src/utils/resourceData.js`：
   - 删除导入语句
   - 删除 `categoryDataMap` 中的映射

## 搜索功能

### 全局搜索

- 在顶部导航栏的搜索框中输入关键词
- 支持搜索：资源标题、描述、标签
- 搜索结果可以按分类筛选

### 分类内搜索

- 进入某个分类页面后
- 在分类页面顶部的搜索框中输入关键词
- 只搜索当前分类下的资源

## 资源详情页

### 主要功能

- 🖼️ **多图展示** - 左右箭头切换、缩略图导航
- 🔍 **全屏查看** - 点击图片或按钮进入全屏模式
- 📋 **复制链接** - 一键复制下载链接
- 📥 **下载资源** - 直接跳转到下载页面

### 快捷操作

- **切换图片**：点击左右箭头或使用键盘左右键
- **全屏模式**：点击图片或"全屏查看"按钮
- **关闭详情**：点击右上角关闭按钮或按 ESC 键

## 自定义配置

### 修改网站标题

编辑 `src/App.vue` 中的 Hero 区域标题：

```vue
<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
  资源分享平台  <!-- 修改这里 -->
</h1>
```

### 修改网站描述

编辑 `src/App.vue` 中的描述文字：

```vue
<p class="text-lg md:text-xl text-white text-opacity-90 max-w-2xl mx-auto">
  汇集各类优质资源...  <!-- 修改这里 -->
</p>
```

### 修改网站 Logo

Logo 在 `src/components/Header.vue` 中定义，找到以下代码修改：

```vue
<div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
  <!-- SVG 图标 -->
</div>
```

### 修改颜色主题

编辑 `tailwind.config.js` 中的颜色配置：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#faf5ff',
        100: '#f3e8ff',
        // ... 其他色阶
        600: '#9333ea',  // 主色调
        700: '#7c3aed',
      }
    }
  }
}
```

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Tailwind CSS** - 功能类 CSS 框架
- **Lucide Vue** - 图标库

## 开发指南

### 代码规范

- 使用 Vue 3 Composition API
- 组件使用 `<script setup>` 语法
- 样式优先使用 Tailwind CSS 类名
- 自定义样式添加到 `src/style.css`

### 添加自定义动画

在 `src/style.css` 中定义动画：

```css
@keyframes my-animation {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}

.animate-my-animation {
  animation: my-animation 3s ease-in-out infinite;
}
```

## 常见问题

### Q: 为什么搜索不到资源？
A: 确保搜索的关键词出现在资源的 `title`、`description` 或 `tags` 字段中。

### Q: 如何添加图片？
A: 将图片上传到图床或 CDN，获取图片 URL 后填入 `screenshots` 数组。

### Q: 下载链接无效怎么办？
A: 检查 `downloadUrl` 字段是否为有效的 URL 格式，包括 `http://` 或 `https://`。

### Q: 分类显示顺序如何调整？
A: 编辑 `src/data/categories.json`，调整 `categories` 数组中条目的顺序。

## 许可证

本项目基于 MIT 许可证开源。

## 联系方式

如有问题或建议，请提交 Issue。
