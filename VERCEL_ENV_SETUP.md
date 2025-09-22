# Vercel 環境變數設定指南

## 🔧 設定步驟

### 1. 登入 Vercel Dashboard
前往：https://vercel.com/jacky6063s-projects/riveon-cms

### 2. 進入專案設定
1. 點擊專案名稱 `riveon-cms`
2. 點擊 "Settings" 標籤
3. 選擇 "Environment Variables"

### 3. 添加環境變數

#### 變數 1: VITE_SUPABASE_URL
```
Key: VITE_SUPABASE_URL
Value: https://oqbnibfkdxvexbwpctlr.supabase.co
Environment: Production, Preview, Development (全選)
```

#### 變數 2: VITE_SUPABASE_ANON_KEY
```
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYm5pYmZrZHh2ZXhid3BjdGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NjE3NzQsImV4cCI6MjA0MjUzNzc3NH0.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYm5pYmZrZHh2ZXhid3BjdGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NjE3NzQsImV4cCI6MjA0MjUzNzc3NH0
Environment: Production, Preview, Development (全選)
```

### 4. 儲存並重新部署
1. 點擊 "Save" 儲存環境變數
2. 前往 "Deployments" 頁面
3. 點擊最新部署的 "..." 選單
4. 選擇 "Redeploy" 重新部署

## 📋 驗證清單

設定完成後，請確認：

- [ ] 兩個環境變數都已正確添加
- [ ] 環境變數適用於所有環境 (Production, Preview, Development)
- [ ] 重新部署已完成
- [ ] 應用程式可以正常存取 Supabase 資料庫

## 🔍 測試連線

部署完成後，您可以：

1. **存取應用程式**：https://riveon-cms.vercel.app
2. **檢查功能**：
   - 頁面正常載入
   - 可以看到車輛內容列表
   - 資料庫連線正常

## 🚨 故障排除

### 如果應用程式無法連接資料庫：

1. **檢查環境變數**
   - 確認變數名稱正確 (VITE_ 前綴)
   - 確認值沒有多餘的空格
   - 確認適用於正確的環境

2. **檢查 Supabase 設定**
   - 確認專案狀態為 Active
   - 確認 RLS 政策正確設定
   - 確認 API 金鑰有效

3. **重新部署**
   - 在 Vercel Dashboard 手動觸發重新部署
   - 檢查部署日誌是否有錯誤

## 📞 支援資源

- **Vercel 文件**: https://vercel.com/docs/concepts/projects/environment-variables
- **Supabase 文件**: https://supabase.com/docs/guides/getting-started/tutorials/with-react
- **專案 GitHub**: https://github.com/jacky6063/riveon-cms

---

**重要提醒**: 環境變數設定完成後，記得重新部署應用程式以套用新的設定！
