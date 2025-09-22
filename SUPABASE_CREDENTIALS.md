# Supabase 專案資訊和 API 憑證

## 專案基本資訊

- **專案名稱**: riveon-cms
- **專案 ID**: oqbnibfkdxvexbwpctlr
- **地區**: Southeast Asia (Singapore)
- **組織**: jacky_chin (Free Plan)
- **資料庫密碼**: RiveonCMS2025!@#

## API 憑證

### 專案 URL
```
https://oqbnibfkdxvexbwpctlr.supabase.co
```

### API 金鑰

#### Anon/Public Key (用於前端)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYm5pYmZrZHh2ZXhid3BjdGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NjE3NzQsImV4cCI6MjA0MjUzNzc3NH0.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYm5pYmZrZHh2ZXhid3BjdGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NjE3NzQsImV4cCI6MjA0MjUzNzc3NH0
```

#### Service Role Key (用於後端，需要時顯示)
- 位置：Supabase Dashboard > Settings > API Keys > service_role
- 狀態：已隱藏，需要點擊 "Reveal" 顯示

## 環境變數配置

### 用於 Vercel 部署的環境變數

```bash
# Supabase 配置
VITE_SUPABASE_URL=https://oqbnibfkdxvexbwpctlr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYm5pYmZrZHh2ZXhid3BjdGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NjE3NzQsImV4cCI6MjA0MjUzNzc3NH0.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYm5pYmZrZHh2ZXhid3BjdGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NjE3NzQsImV4cCI6MjA0MjUzNzc3NH0
```

### 本地開發環境變數 (.env.local)

```bash
# 複製到 .env.local 檔案
VITE_SUPABASE_URL=https://oqbnibfkdxvexbwpctlr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYm5pYmZrZHh2ZXhid3BjdGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NjE3NzQsImV4cCI6MjA0MjUzNzc3NH0.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYm5pYmZrZHh2ZXhid3BjdGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NjE3NzQsImV4cCI6MjA0MjUzNzc3NH0
```

## 資料庫設定

### 需要建立的資料表

```sql
-- 車輛內容管理資料表
CREATE TABLE car_content (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 啟用 Row Level Security (RLS)
ALTER TABLE car_content ENABLE ROW LEVEL SECURITY;

-- 建立基本的 RLS 政策（允許所有操作，可根據需要調整）
CREATE POLICY "Enable all operations for car_content" ON car_content
FOR ALL USING (true);
```

## 安全性注意事項

1. **Anon Key**: 可以安全地在前端使用，已啟用 Row Level Security
2. **Service Role Key**: 具有完整資料庫存取權限，僅用於後端或管理操作
3. **資料庫密碼**: 僅用於直接資料庫連線，一般應用不需要

## 連線測試

### JavaScript 範例

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oqbnibfkdxvexbwpctlr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYm5pYmZrZHh2ZXhid3BjdGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NjE3NzQsImV4cCI6MjA0MjUzNzc3NH0.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYm5pYmZrZHh2ZXhid3BjdGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NjE3NzQsImV4cCI6MjA0MjUzNzc3NH0'

const supabase = createClient(supabaseUrl, supabaseKey)

// 測試連線
async function testConnection() {
  const { data, error } = await supabase
    .from('car_content')
    .select('*')
    .limit(1)
  
  if (error) {
    console.error('連線錯誤:', error)
  } else {
    console.log('連線成功:', data)
  }
}
```

## 下一步

1. 在 Vercel 中設定環境變數
2. 建立資料庫資料表
3. 測試應用程式連線
4. 部署並驗證功能

---

**建立時間**: 2025-09-22  
**專案狀態**: 已建立，等待資料表設定  
**Dashboard URL**: https://supabase.com/dashboard/project/oqbnibfkdxvexbwpctlr
