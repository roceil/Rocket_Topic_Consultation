
export default function Console() {
  const asciiArt = [
    '_____      _     _____                      _             _   ',
    '|  __ ＼  (_)    |  __ ＼                   | |           | |  ',
    '| |__) |  _      | |__) |    ___     ___   | | __   ___  | |_ ',
    '|  ___/  | |     |  _  /    / _ ＼   / __| | |/ /  / _ ＼ | __|',
    '| |      | |  _  | | ＼ ＼  | (_) | | (__  |   <   |  __/ | |_ ',
    '|_|      |_| (_) |_|  ＼_＼ ＼___/   ＼___| |_|＼_＼ ＼___| ＼__|',
  ];

  const opening = [
    `拍拍是由五位來自不同的背景，
  包括翻譯工作者、中文老師、海外業務等，
  歷經七個月程式設計培訓，打造的線上諮商平台，
  以下是團隊成員介紹：`,
  ];

  const teamMembers = [
    `- 劉俞廷｜UI 設計師
      - 信箱：thejamie215@gmail.com
      - 負責項目：介面設計、繪製插圖、簡報製作
    
    - 菲菲｜前端工程師
      - 信箱：2020soop@gmail.com
      - 負責項目：前端切版、API 串接（開發預約時間表、諮商師上架課程）
    
    - Frank｜前端工程師
      - 信箱：a0978006326@gmail.com
      - 負責項目：前端切版、前端聊天室、前端金流、Mock API、Readme撰寫、環境部署
        
    - Kris｜後端工程師
      - 信箱：kris.setsu@gmail.com
      - 負責項目：Azure遠端主機架設、資料庫設計、個案/諮商師雙方預約流程 API 開發
    
    - 陳品豪｜後端工程師
      - 信箱：plowrain1328@gmail.com
      - 負責項目：後端聊天室、後端金流、Zoom Api、後台API`,
  ];

  console.log(
    asciiArt
      .map((line) => line
        .split('')
        .map((char) => String.fromCharCode(char.charCodeAt(0)))
        .join(''))
      .join('\n'),
  );

  console.log('%c Hi 恭喜您解鎖小彩蛋 🙌', 'background: #222; color: #bada55');
  console.log(`%c ${opening}`, 'background: #bada55; color: #222');
  console.log(`%c ${teamMembers}`, 'background: #222; color: #E1D6BE');
  console.log('%c 🔊 我們正在找工作喔，期待收到您的來信！', 'background: #bada55; color: #222');

  return null;
}
