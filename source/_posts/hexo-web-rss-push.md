title: HEXO用RSS Feed自動網頁推播
author: 彭威翔
abbrlink: 27882
date: 2021-08-09 23:48:27
tags:
---
本篇先教大家在HEXO啟用RSS Feed，在設定RSS Update(文章更新)時，進行網頁推播

## Hexo新增RSS功能

### 什麼是RSS
RSS的英文全稱是Really Simple Syndication，是一種透過XML(eXtensible Markup Language)特性所制定的格式，讓網站的管理者可以把網頁內容傳給訂閱戶。這是個有點像電子報和新聞群組(Newsgroup)的東西，但是賦予讀者更大的自訂能力和更豐富的資料。
將RSS技術應用在獲取來源端的即時訊息是一個很重要的演進，對於使用者也可以很清楚的知道這些新聞是從何而來
<!-- more -->

### 功能實作
首先添加npm套件，在hexo <span id="inline-blue">主題配置文件</span>下執行該命令
``` bash
$ npm install hexo-generator-feed
```


然後在 hexo 根目錄下的 檔中添加配置<span id="inline-yellow">_config.yml</span>
``` yml
feed:
    type: atom
    path: atom.xml
    limit: 20
```
設定含義：
- type： RSS的類型（atom/rss2）
- path： 檔案路徑，預設是<span id="inline-yellow">atom.xml</span>
- limit： 展示文章的數量，使用 0 或則 false 代表展示全部
- hub： URL of the PubSubHubbub hubs （如果使用不到可以為空）
- content： （可選）設置 可以在 RSS 檔中包含文章全部內容，預設：false
- content_limit： （可選）摘要中使用的帖子內容的預設長度。 僅在內容設置為false且未顯示自定義帖子描述時才使用。
- content_limit_delim： （可選）If content_limit is used to shorten post contents， only cut at the last occurrence of this delimiter before reaching the character limit. Not used by default.
- order_by： 訂閱內容的順序. （預設： -date）
然後在 theme 目錄下的 檔中添加配置<span id="inline-yellow">_config.yml</span>
``` yml
rss: /atom.xml
```
隨後重新生成博客靜態檔
``` bash
$ hexo clean && hexo g
```
## Hexo配置iZooto
1. 先在iZooto中進行[註冊](https://panel.izooto.com/signup)
![iZooto中進行註冊](https://i.imgur.com/ZGLFn53.png)
2. 在儀表上點擊新增網站，然後輸入網域名稱

![iZooto新增網站介面](https://i.imgur.com/K6Bug3g.png)
3. 在左邊點選Setting > Setup，正中央有進行步驟

4. 把代碼放到<code>themes\next\layout\_partials\head</code>中最後一行之前
![iZooto代碼範本](https://i.imgur.com/SMx2MOB.png)
5. 把下載下來的Zip解壓縮放到source資料夾

![把Zip下載](https://i.imgur.com/JBKoG4d.png)
6. 部屬到伺服器後。點選驗證。等待關閉即可
``` bash
$ hexo d
```

![點選驗證](https://i.imgur.com/HHOzZ66.png)

## 設定iZooto+Zap設定RSS推播

點擊Setting > General頁面中的[Integration區塊](https://zapier.com/apps/izooto/integrations/rss/16323/send-izooto-web-push-notifications-for-new-rss-items)
1. 選擇Try Template

![Try Template](https://i.imgur.com/jy0hbuk.png)

2. 在第二關<code>set trigger</code>中feed url填入
``` bash
[你的網址]+/atom.xml
```

![輸入URL](https://i.imgur.com/BEToge9.png)
3. 一路設定好，就完成了
4. 等待文章更新吧