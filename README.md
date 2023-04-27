<p align="center">
  <a href="https://pi-rocket-coding.vercel.app/">
    <img width="200" src ="https://raw.githubusercontent.com/roceil/Rocket_Topic_Consultation/main/public/images/footer/footerLOGO.svg">
  </a>
</p>

<h1 align="center" style="font-weight: 700">拍拍｜線上心理諮商平台</h1>

<div align="center" style="margin-bottom:24px">
<a href="https://bit.ly/3hXSrfs" 
style="display: flex;
 justify-content:center; 
  align-items: center;
 background-color: #FFEFCD; 
 color: black; 
 font-weight: 700; 
 border-radius: 9999px;
 height:40px;"
 >
<p>
📙簡報介紹📙
</p>
</a><br>
<p>
歡迎來到拍拍！拍拍是個線上心理諮商平台<br>
幫助人們克服各種情緒和心理上的困難，改善他們的生活品質。
</p>
<img src="https://i.imgur.com/SHcXsBt.jpg">
</div>

# 拍拍｜線上心理諮商平台

拍拍的進駐諮商師皆為經驗豐富、專業資格齊全的心理學家和臨床心理師，能夠針對每個人的獨特情況提供量身定制的建議和解決方案。您可以隨時隨地在線上與諮商師進行互動，無論您在家中、辦公室或旅途中，都可以方便地使用我們的服務。

我們的目標是成為您信任和依賴的心理諮商平台，幫助您實現自我成長、改善人際關係、克服情緒困擾、減輕壓力和焦慮等問題。歡迎您註冊成為拍拍會員，開始您的心理健康之旅！

## ===== 功能介紹 =====
### <-- 用戶端 -->
  - 會員註冊/登入
  - 會員資料修改
  - 會員預約諮商
  - 會員查看預約紀錄
  - 會員查看諮商師資料
  - 會員查看諮商師預約時段
  - 會員透過「藍新金流」結帳
  - 會員透過「聊天室」與諮商師溝通
  - 會員透過「Zoom」連結進行諮商

### <-- 諮商師端 -->
  - 諮商師註冊/登入
  - 諮商師資料修改
  - 諮商師查看預約紀錄
  - 諮商師查看會員資料
  - 諮商師紀錄諮商過程
  - 諮商師上架諮商時段
  - 諮商師查看會員預約時段
  - 諮商師透過「聊天室」與用戶溝通
  - 諮商師透過「Zoom」連結進行諮商

### <--- 管理員端 -->
  - 管理員登入
  - 管理員查看諮商師審核狀態
  - 管理員審核諮商師
  - 管理員查看所有訂單狀態
  - 管理員查看所有金流狀態

## ===== 下載與安裝 =====

Clone 專案

```bash
  git clone https://github.com/roceil/Rocket_Topic_Consultation.git
```

進入專案

```bash
  cd Rocket_Topic_Consultation
```

安裝套件

```bash
  npm install
```

啟動專案

```bash
  npm run dev
```

## ===== 資料夾結構 =====
```flow
pi.rocket/
├── public/
│   ├── images/
│   │   ├── 404
│   │   ├── chatRoom
│   │   ├── counselorList
│   │   └── ...
│   ├── loading
│   ├── favicon.ico
│   └── mockServiceWorker.js
├── src/
│   ├── common/
│   │   ├── components/
│   │   │   ├── ChatRoom.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ...
│   │   ├── helpers/
│   │   │   ├── customAlert.ts
│   │   │   ├── convertDate.ts
│   │   │   └── convertDescription.ts
│   │   ├── hooks/
│   │   │   ├── useCloseLoading.tsx
│   │   │   └── useOpenLoading.tsx
│   │   ├── msw/
│   │   │   ├── browser.ts
│   │   │   ├── handler.ts
│   │   │   ├── index.ts
│   │   │   └── server.ts
│   │   └── redux/
│   │       ├── feature
│   │       ├── service
│   │       └── store.ts
│   ├── lib/
│   │   ├── hamburger/
│   │   │   └── aryData.tsx
│   │   ├── shoppingCart/
│   │   │   └── shoppingCartData.tsx
│   │   └── ... 
│   ├── modules/
│   │   ├── Home/
│   │   │   ├── Banner.tsx
│   │   │   ├── TopicCard.tsx
│   │   │   └── ...
│   │   ├── login/
│   │   │   ├── LogInForm.tsx
│   │   │   └── LogInTab.tsx
│   │   ├── userCenter/
│   │   │   ├── HasCancel.tsx
│   │   │   ├── HasFinish.tsx
│   │   │   └── ...
│   │   ├── counselorCenter/
│   │   │   ├── CounselorCenterLayout.tsx
│   │   │   └── ...
│   │   └── ...
│   ├── pages/
│   │   ├── api/
│   │   │   └── bluepay/
│   │   │       └── return.ts
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── 404.tsx
│   │   ├── success.tsx
│   │   └── ...
│   ├── styles/
│   │   ├── antd
│   │   ├── swiper
│   │   ├── waves
│   │   └── global.css
│   └── types/
│       └── interface.ts
├── package.json
├── .eslintrc.json
├── .prettierrc
├── README.md
├── tailwind.confing.js
└── tsconfig.json
```

## ===== Git Commit 規則 =====

| 類型       | 格式                              | 範例                               |
| :--------- | :-------------------------------- | :--------------------------------- |
| `新增功能` | `[Feat] create [ModalName]`       | `[Feat] create header`             |
| `修補錯誤` | `[Fix] fix [ModalName] bug`       | `[Fix] fix carousel bug`           |
| `樣式相關` | `[Style] adjust [ModalName] gap`  | `[Style] adjust card gap`          |
| `更新檔案` | `[Update] update [ModalName] pic` | `[Update] update user pic`         |
| `重構代碼` | `[Refactor] refactor [ModalName]` | `[Refactor] refactor API function` |
| `快速更新` | `[Hotfix] fix [ModalName]`        | `[Hotfix] fix API function`        |

## ===== Git Branch 命名規則 =====

- 以類型格式為開頭並大寫，如：Feat
- 以區塊為命名提示並大寫，如：OrderStep
- 範例：`Feat/OrderStep`

## ===== 技術規格 =====

<h2 align="center">👩‍💻 設計工具</h2>
 <p>
  <img alt="VS Code" src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" />
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img alt="AntDesign" src="https://img.shields.io/badge/Ant%20Design-1890FF?style=for-the-badge&logo=antdesign&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="NextJS" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="Redux" src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
  <img alt="NPM" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img alt="GITHUB" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<h2 align="center">💻 前端技術</h2>
 <p>
  <img alt="VS Code" src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" />
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img alt="AntDesign" src="https://img.shields.io/badge/Ant%20Design-1890FF?style=for-the-badge&logo=antdesign&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="NextJS" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="Redux" src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img alt="Mock Service Worker" src="https://img.shields.io/badge/Mock SERVICE WORK-E34F26?style=for-the-badge&&logoColor=white" />
  <img alt="Zeabur" width="87" height="28" style="background-color:#E0E0E0; padding:0 8px" src="https://docs.zeabur.com/logo_b.svg" />
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-4EAA25?style=for-the-badge&&logoColor=white" />




</p>

<h2 align="center">⌨️ 後端技術</h2>
 <p>
  <img alt="VS Code" src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" />
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img alt="AntDesign" src="https://img.shields.io/badge/Ant%20Design-1890FF?style=for-the-badge&logo=antdesign&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="NextJS" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="Redux" src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
  <img alt="NPM" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img alt="GITHUB" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>
