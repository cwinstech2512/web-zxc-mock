# web_zxc

Vue 2 + webpack 3 的多入口前端專案。專案現在可在不啟動後端的情況下，以環境變數切換到完整的本機 Mock API；未開啟 Mock 時仍沿用原本的 API URL、Axios 攔截器、請求參數與錯誤處理流程。

## 環境需求

- 建議 Node.js 20（本次驗證使用 `v20.9.0`）
- npm

此專案沒有使用 Sass 原始碼；舊版 `node-sass` 在新環境安裝時可使用 `npm ci --ignore-scripts` 避免執行已不相容的安裝腳本。

## 安裝

```bash
npm install --ignore-scripts
```

## 啟動模式

### Mock 模式（不需要後端）

```bash
npm run dev:mock
```

預設網址為 `http://localhost:8080`。頁面右下角會顯示 `MOCK MODE · LOCAL DATA`。

測試登入：

- 帳號：任意非空值，例如 `mockuser`
- 密碼：任意非空值，例如 `mockpass`
- 圖形驗證碼：任意非空值，例如 `12345`
- 簡訊／Email 驗證碼：`123456`

也可以複製環境範例檔後再執行一般啟動指令：

```bash
cp .env.example .env
# 將 WEB_USE_MOCK 改成 true
npm run dev
```

Shell 環境變數的優先順序高於 `.env.local` 與 `.env`。

### 真實 API 模式（預設）

```bash
npm run dev
```

開發環境維持原本的 `/api` proxy；正式建置維持原本的 `/data` base URL。

## 建置

真實 API 正式版（預設不會開啟 Mock）：

```bash
npm run build
```

刻意建立純前端展示版：

```bash
npm run build:mock
```

正式環境如果只設定 `WEB_USE_MOCK=true`，建置會被阻擋。只有 `build:mock` 同時明確設定 `ALLOW_PRODUCTION_MOCK=true`，才允許產生 Mock 展示版，避免正式部署誤用假資料。

## GitHub Pages 部署

Repository 已包含 `.github/workflows/deploy-pages.yml`。推送到 `main` 後，GitHub Actions 會自動：

1. 以 Node.js 20 安裝依賴。
2. 檢查 Mock API 覆蓋。
3. 執行 `npm run build:mock`。
4. 將 `dist` 發布到 GitHub Pages。

GitHub Pages 上的版本固定使用 Mock 模式，因此不會連線到真實後端。此專案的 production asset 路徑為相對路徑，可直接部署在 repository 子路徑；目前預定網址為：

```text
https://cwinstech2512.github.io/web-zxc-mock/
```

首次建立 repository 後，需在 GitHub 的 `Settings → Pages → Build and deployment` 選擇 `GitHub Actions`。之後每次推送 `main` 都會自動重新部署，也可在 Actions 頁面手動執行此 workflow。

## Mock 資料與重設

Mock 狀態使用固定種子，並儲存在瀏覽器 localStorage。登入 session 仍依專案原有行為存放於 sessionStorage。

在瀏覽器開發者工具執行：

```js
window.__WEB_ZXC_MOCK__.state() // 查看目前 Mock 狀態
window.__WEB_ZXC_MOCK__.reset() // 重設資料與登入 session
location.reload()
```

不同網址來源（host、port 或 protocol）各自擁有獨立的 localStorage。

## 驗證指令

```bash
npm run verify:mock
npm run lint
npm run build:mock
npm run build
```

`verify:mock` 會掃描 `src` 內的 API 字串並逐一交給 Mock adapter；任何未覆蓋端點都會令指令失敗。Mock 執行期間的未知請求會回傳 `501` 與 `MOCK_NOT_IMPLEMENTED`，不會 fallback 到真實後端。

更完整的架構、覆蓋範圍與限制請見 [Mock API 說明](docs/MOCK_API.md)。
