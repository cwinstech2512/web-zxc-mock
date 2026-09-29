# Mock API 實作說明

## 架構

所有 Axios 呼叫都由 `src/api/https.js` 建立的全域實例處理。啟用 `WEB_USE_MOCK` 時，`src/mock/adapter.js` 會取代 Axios adapter，因此同時涵蓋：

- `$https.fetchPost`、`$https.fetchGet`
- 舊頁面直接使用的 `axios.get`、`axios.post`
- 絕對 URL 的 Axios 呼叫（Mock 模式下也不會送出）

原有 base URL、Authorization 攔截器、HTTP method、參數簽章及 response/error 處理均保留。關閉 Mock 後不載入任何假資料 handler。

## 覆蓋範圍

- 網站初始化：代理代碼檢查、QQ、首頁公告、輪播、彈窗、通知
- 身分驗證：登入、註冊、圖形驗證碼、簡訊與 Email 驗證碼、忘記密碼、解除綁定
- 會員與權限：會員資料、實名／手機驗證、密碼與安全問題
- 遊戲：平台列表、各平台餘額、老虎机搜尋／分類／分頁、遊戲登入的本機 placeholder
- 帳務：總餘額、平台轉帳、一鍵回收、充值方式、充值訂單、提款、USDT 匯率
- 綁定資料：銀行卡與虛擬錢包新增、列表同步
- 查詢：訊息列表／已讀、交易紀錄分頁、帳務統計、返水、VIP 優惠
- 活動：專案現有的 info、領取、抽獎、刷新、排行榜與歷史端點

列表支援專案實際使用的分頁參數；老虎机支援分類與名稱搜尋。轉帳、提款、卡片／錢包新增、訊息已讀與活動領取會更新 localStorage，後續列表和詳情會看到一致結果。

## 網路隔離

- 未覆蓋端點：Promise reject，HTTP 語意為 `501 Mock Not Implemented`，錯誤碼 `MOCK_NOT_IMPLEMENTED`。
- PG 遊戲第三方 SDK：Mock 模式不載入。
- 客服頁的絕對 URL Axios 偵測：由 Mock adapter 阻擋，不會連線。
- 遊戲與支付跳轉：回傳本機 `#mock-game`／`#mock-payment` placeholder，不使用真實服務。

一般靜態圖片與使用者主動點擊的既有外部下載／客服連結不是後端 API。Mock 模式沒有修改這些既有導覽連結。

## 已知限制

- 假資料用於前端開發與展示，不模擬金流、遊戲供應商或客服服務本身。
- 專案目前沒有 WebSocket、SSE、檔案上傳 API 或檔案下載 API，因此沒有對應模擬器；日後新增時必須先加入 adapter handler，否則會明確收到 `501`。
- Mock 驗證不檢查真實密碼，且固定提供本機 token；與真實驗證資料完全隔離。
- 真實 API 模式已確認仍會建置並保留原路徑，但本次沒有可用後端，因此沒有宣稱完成真實後端端到端驗證。
