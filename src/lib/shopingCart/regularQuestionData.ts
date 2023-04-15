// 常見問題的資料陣列
const questionData = [
  {
    question: '預約方式',
    answer: (
      <ul className=" font-normal text-gray-900">
        <li>1. 選擇心儀的課程方案後，點選「手刀預約」</li>
        <li>2. 前往購物車完成結帳</li>
        <li>3. 前往 會員中心 / 預約管理 / 待預約 選擇預約時段</li>
        <li>4. 等待諮商師接受預約，收到接受通知後就完成囉！</li>
      </ul>
    ),
  },
  {
    question: '費用說明',
    answer: <p className=" font-normal text-gray-900">每堂課皆為一小時，可以自行選擇預約堂數，單堂費用由諮商師自行訂定，不同諮商主題的費用可能不同。</p>,
  },
  {
    question: '上課說明',
    answer: <p className=" font-normal text-gray-900">課程將透過 ZOOM 線上進行，預約時間十分鐘前會在會員中心釋出課程連結，只要點選連結，就可以開始上課囉！</p>,
  },
  {
    question: '退課須知',
    answer: <p className=" font-normal text-gray-900">預約成功後若要辦理退課，請聯絡客服信箱由小幫手協助處理。提醒：為維護雙方權益，請審慎考慮後再申請退課。</p>,
  },
];