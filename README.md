# DriveOn Content Management System

一個現代化的車輛內容管理系統，使用 React 和 Supabase 構建。

## 功能特色

- **車輛內容管理**: 完整的 CRUD 操作支援
- **圖片預覽**: 支援車輛圖片的即時預覽
- **YouTube 影片整合**: 內嵌 YouTube 影片播放器
- **響應式設計**: 適配各種螢幕尺寸
- **即時資料庫**: 使用 Supabase PostgreSQL 資料庫
- **現代化 UI**: 基於 Tailwind CSS 和 shadcn/ui 組件

## 技術架構

- **前端框架**: React 19.1.0 + Vite
- **UI 框架**: Tailwind CSS + shadcn/ui
- **資料庫**: Supabase PostgreSQL
- **部署平台**: Vercel
- **版本控制**: Git + GitHub

## 快速開始

### 環境需求

- Node.js 18+ 
- pnpm (推薦) 或 npm

### 安裝依賴

```bash
pnpm install
```

### 環境變數設定

創建 `.env.local` 檔案並設定以下變數：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 開發模式

```bash
pnpm dev
```

### 建置生產版本

```bash
pnpm build
```

### 預覽生產版本

```bash
pnpm preview
```

## 資料庫結構

### car_content 表格

| 欄位名稱 | 類型 | 描述 |
|---------|------|------|
| id | integer | 主鍵，自動遞增 |
| title | text | 車輛標題 |
| description | text | 車輛描述 |
| image_url | text | 車輛圖片 URL |
| video_url | text | YouTube 影片 URL |
| created_at | timestamp | 建立時間 |
| updated_at | timestamp | 更新時間 |

## 專案結構

```
src/
├── components/          # React 組件
│   ├── ContentCard.jsx  # 內容卡片組件
│   └── StatsCard.jsx    # 統計卡片組件
├── lib/                 # 工具函式庫
│   ├── supabase.js      # Supabase 客戶端設定
│   └── carContentService.js # 資料服務層
├── App.jsx              # 主應用程式組件
├── App.css              # 全域樣式
└── main.jsx             # 應用程式入口點
```

## 部署說明

本專案已設定為自動部署至 Vercel 平台：

1. 推送程式碼至 GitHub 主分支
2. Vercel 自動觸發建置和部署
3. 部署完成後可透過 Vercel 提供的 URL 存取

## 開發指南

### 程式碼風格

- 使用 ESLint 進行程式碼檢查
- 遵循 React 最佳實踐
- 使用函式組件和 Hooks

### 提交訊息規範

使用 Conventional Commits 格式：

- `feat:` 新功能
- `fix:` 錯誤修復
- `docs:` 文件更新
- `style:` 程式碼格式調整
- `refactor:` 程式碼重構
- `chore:` 建置或輔助工具變動

## 授權

本專案採用 MIT 授權條款。

## 聯絡資訊

如有任何問題或建議，請透過 GitHub Issues 聯絡我們。
