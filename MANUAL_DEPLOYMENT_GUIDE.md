# DriveOn CMS 手動部署指南

由於 Vercel 網頁介面可能遇到一些技術問題，以下提供完整的手動部署指南。

## 🚀 快速部署步驟

### 方法一：透過 Vercel Dashboard

1. **登入 Vercel**
   - 前往 https://vercel.com/login
   - 使用您的帳戶登入

2. **建立新專案**
   - 點擊 "Add New..." > "Project"
   - 選擇 "Import Git Repository"
   - 找到並選擇 `jacky6063/riveon-cms` 儲存庫
   - 點擊 "Import"

3. **配置專案設定**
   ```
   專案名稱: riveon-cms
   框架: Vite (應該會自動偵測)
   建置命令: npm run build
   輸出目錄: dist
   根目錄: ./
   ```

4. **設定環境變數**（稍後可在專案設定中添加）
   ```
   VITE_SUPABASE_URL=您的_Supabase_URL
   VITE_SUPABASE_ANON_KEY=您的_Supabase_匿名金鑰
   ```

5. **部署**
   - 點擊 "Deploy" 按鈕
   - 等待建置完成（通常需要 1-3 分鐘）

### 方法二：使用 Vercel CLI

1. **安裝 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登入 Vercel**
   ```bash
   vercel login
   ```

3. **在專案目錄中部署**
   ```bash
   cd /path/to/riveon-cms
   vercel
   ```

4. **首次部署設定**
   - 選擇您的團隊 (Jacky6063's projects)
   - 確認專案名稱: riveon-cms
   - 確認設定並部署

## 📋 部署後設定

### 1. 環境變數設定

在 Vercel Dashboard 中：
1. 前往您的專案頁面
2. 點擊 "Settings" 標籤
3. 選擇 "Environment Variables"
4. 添加以下變數：

| 變數名稱 | 值 | 環境 |
|---------|---|------|
| `VITE_SUPABASE_URL` | 您的 Supabase 專案 URL | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | 您的 Supabase 匿名金鑰 | Production, Preview, Development |

### 2. 取得 Supabase 資訊

如果您還沒有 Supabase 資訊：

1. **前往 Supabase Dashboard**
   - 網址: https://supabase.com/dashboard
   - 登入您的帳戶

2. **建立新專案**（如果還沒有）
   - 點擊 "New Project"
   - 選擇組織
   - 輸入專案名稱: `riveon-cms`
   - 設定資料庫密碼
   - 選擇地區（建議選擇 Asia Pacific）
   - 點擊 "Create new project"

3. **取得 API 資訊**
   - 在專案 Dashboard 中，前往 "Settings" > "API"
   - 複製 "Project URL" (這是您的 `VITE_SUPABASE_URL`)
   - 複製 "anon public" 金鑰 (這是您的 `VITE_SUPABASE_ANON_KEY`)

4. **建立資料表**
   - 前往 "Table Editor"
   - 建立新資料表 `car_content`
   - 添加以下欄位：
     ```sql
     CREATE TABLE car_content (
       id SERIAL PRIMARY KEY,
       title TEXT NOT NULL,
       description TEXT,
       image_url TEXT,
       video_url TEXT,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );
     ```

### 3. 自動部署設定

部署完成後，每次推送到 GitHub main 分支都會自動觸發重新部署：

```bash
# 在本地進行更改後
git add .
git commit -m "feat: 添加新功能"
git push origin main
```

## 🔧 故障排除

### 建置失敗

1. **檢查建置日誌**
   - 在 Vercel Dashboard 中查看 "Deployments" 標籤
   - 點擊失敗的部署查看詳細日誌

2. **常見問題**
   - 確認 `package.json` 中有正確的建置腳本
   - 檢查所有依賴套件是否已安裝
   - 確認環境變數設定正確

### 環境變數問題

1. **變數未生效**
   - 確認變數名稱以 `VITE_` 開頭
   - 重新部署專案以套用新的環境變數
   - 檢查變數是否設定在正確的環境中

### 資料庫連線問題

1. **Supabase 連線失敗**
   - 確認 Supabase URL 和金鑰正確
   - 檢查 Supabase 專案是否處於活躍狀態
   - 確認資料表已正確建立

## 📊 部署狀態檢查

部署完成後，您可以：

1. **存取應用程式**
   - Vercel 會提供一個 `.vercel.app` 網域
   - 例如: `https://riveon-cms.vercel.app`

2. **檢查功能**
   - 確認頁面正常載入
   - 測試資料庫連線（如果已設定環境變數）
   - 檢查所有 UI 組件是否正常運作

3. **監控部署**
   - 在 Vercel Dashboard 查看部署狀態
   - 設定通知以接收部署結果

## 🔄 版本管理

### 分支策略

- `main`: 生產環境，自動部署到 Vercel
- `develop`: 開發分支，可設定 Preview 部署
- `feature/*`: 功能分支，PR 時會產生 Preview 部署

### 回滾版本

如需回滾：
1. 在 Vercel Dashboard 的 "Deployments" 頁面
2. 找到要回滾的版本
3. 點擊 "Promote to Production"

## 📞 支援資源

- **Vercel 文件**: https://vercel.com/docs
- **Supabase 文件**: https://supabase.com/docs
- **GitHub 儲存庫**: https://github.com/jacky6063/riveon-cms

## 🎯 下一步

1. 完成 Vercel 部署
2. 設定 Supabase 資料庫
3. 配置環境變數
4. 測試應用程式功能
5. 設定自訂網域（可選）

---

**注意**: 如果在部署過程中遇到任何問題，請參考上述故障排除章節，或查看 Vercel 和 Supabase 的官方文件。
