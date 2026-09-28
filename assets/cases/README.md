# 工程案例媒體資料夾

把各子目錄的相片／視頻放在對應資料夾，例如：

- `assets/cases/waterproofing/` → 防水工程

建議命名：

- `photo-01.jpg`
- `video-01.mp4`

然後在後台 `/admin/` 登記路徑，例如：

`/assets/cases/waterproofing/photo-01.jpg`

發佈時記得同時：

1. 上傳媒體檔案到此資料夾
2. 覆蓋 `data/cases.json`
3. push 到 GitHub（Vercel 會自動更新）
