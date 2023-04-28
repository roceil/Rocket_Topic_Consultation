/* eslint-disable import/no-cycle */
import 人際關係 from 'public/images/home/customTopic/人際關係.svg';
import 人際關係SM from 'public/images/home/customTopic/人際關係SM.svg';
import 伴侶關係 from 'public/images/home/customTopic/伴侶關係.svg';
import 伴侶關係SM from 'public/images/home/customTopic/伴侶關係SM.svg';
import 負面情緒 from 'public/images/home/customTopic/負面情緒.svg';
import 負面情緒SM from 'public/images/home/customTopic/負面情緒SM.svg';
import 個人發展 from 'public/images/home/customTopic/個人發展.svg';
import 個人發展SM from 'public/images/home/customTopic/個人發展SM.svg';
import 家庭議題 from 'public/images/home/customTopic/家庭議題.svg';
import 家庭議題SM from 'public/images/home/customTopic/家庭議題SM.svg';
import 職場議題 from 'public/images/home/customTopic/職場議題.svg';
import 職場議題SM from 'public/images/home/customTopic/職場議題SM.svg';
import step1 from 'public/images/home/reservationTour/step1.svg';
import step2 from 'public/images/home/reservationTour/Step2.svg';
import step3 from 'public/images/home/reservationTour/Step3.svg';
import step4 from 'public/images/home/reservationTour/Step4.svg';
import ReservationTour from '../modules/Home/ReservationTour';
import UserComment from '../modules/Home/UserComment';
import PlatformFeature from '../modules/Home/PlatformFeature';
import CustomTopic from '../modules/Home/CustomTopic';
import SuggestCounselor from '../modules/Home/SuggestCounselor';
import Banner from '../modules/Home/Banner';

export const homeComponents = {
  Banner,
  SuggestCounselor,
  CustomTopic,
  PlatformFeature,
  UserComment,
  ReservationTour,
};

export const counselorRank = [
  {
    name: '劉昱涵',
    rankTag: '熱門諮商師 TOP 1',
    id: 5,
    img: 'https://pi.rocket-coding.com/upload/headshot/5-劉昱涵-20230423235804.png',
    skillsAry: [
      {
        type: '人際關係',
        text: '社交技能、溝通技巧、衝突管理',
        img: 人際關係,
        imgSM: 人際關係SM,
      },
      {
        type: '負面情緒',
        text: '性侵、霸凌、家暴、失眠、焦慮',
        img: 負面情緒,
        imgSM: 負面情緒SM,
      },
    ],
  },
  {
    name: '吳虹慧',
    rankTag: '熱門諮商師 TOP 2',
    id: 7,
    img: 'https://pi.rocket-coding.com/upload/headshot/7-吳虹慧-20230424000824.png',
    skillsAry: [
      {
        type: '個人發展',
        text: '自我認同、性傾向探索、人生目標',
        img: 個人發展,
        imgSM: 個人發展SM,
      },
      {
        type: '家庭議題',
        text: '情緒勒索、產後憂鬱、親子溝通',
        img: 家庭議題,
        imgSM: 家庭議題SM,
      },
    ],
  },
  {
    name: '薛晉楷',
    rankTag: '熱門諮商師 TOP 3',
    id: 8,
    img: 'https://pi.rocket-coding.com/upload/headshot/8-薛晉楷-20230424000904.png',
    skillsAry: [
      {
        type: '個人發展',
        text: '自我認同、性傾向探索、人生目標',
        img: 個人發展,
        imgSM: 個人發展SM,
      },
      {
        type: '家庭議題',
        text: '情緒勒索、產後憂鬱、親子溝通',
        img: 家庭議題,
        imgSM: 家庭議題SM,
      },
    ],
  },
  {
    name: '蕭翔宇',
    rankTag: '熱門諮商師 TOP 4',
    id: 9,
    img: 'https://pi.rocket-coding.com/upload/headshot/9-蕭翔宇-20230424000935.png',
    skillsAry: [
      {
        type: '職場議題',
        text: '壓力排解、溝通表達、職涯規劃',
        img: 職場議題,
        imgSM: 職場議題SM,
      },
      {
        type: '負面情緒',
        text: '性侵、霸凌、家暴、失眠、焦慮',
        img: 負面情緒,
        imgSM: 負面情緒SM,
      },
      {
        type: '個人發展',
        text: '自我認同、性傾向探索、人生目標',
        img: 個人發展,
        imgSM: 個人發展SM,
      },
    ],
  },
  {
    name: '施宇峻',
    rankTag: '熱門諮商師 TOP 5',
    id: 10,
    img: 'https://pi.rocket-coding.com/upload/headshot/10-施宇峻-20230424000956.png',
    skillsAry: [
      {
        type: '伴侶關係',
        text: '婚姻、戀愛關係',
        img: 伴侶關係,
        imgSM: 伴侶關係SM,
      },
      {
        type: '人際關係',
        text: '社交技能、溝通技巧、衝突管理',
        img: 人際關係,
        imgSM: 人際關係SM,
      },
      {
        type: '家庭議題',
        text: '情緒勒索、產後憂鬱、親子溝通',
        img: 家庭議題,
        imgSM: 家庭議題SM,
      },
    ],
  },
  {
    name: '王也修',
    rankTag: '熱門諮商師 TOP 6',
    id: 11,
    img: 'https://pi.rocket-coding.com/upload/headshot/11-王也修-20230424001015.png',
    skillsAry: [
      {
        type: '職場議題',
        text: '壓力排解、溝通表達、職涯規劃',
        img: 職場議題,
        imgSM: 職場議題SM,
      },
      {
        type: '人際關係',
        text: '社交技能、溝通技巧、衝突管理',
        img: 人際關係,
        imgSM: 人際關係SM,
      },
    ],
  },
];

export const topicCardAry = [
  {
    type: '職場議題',
    text: '壓力排解、溝通表達、職涯規劃',
    img: 職場議題,
    imgSM: 職場議題SM,
  },
  {
    type: '伴侶關係',
    text: '婚姻、戀愛關係',
    img: 伴侶關係,
    imgSM: 伴侶關係SM,
  },
  {
    type: '人際關係',
    text: '社交技能、溝通技巧、衝突管理',
    img: 人際關係,
    imgSM: 人際關係SM,
  },
  {
    type: '負面情緒',
    text: '性侵、霸凌、家暴、失眠、焦慮',
    img: 負面情緒,
    imgSM: 負面情緒SM,
  },
  {
    type: '個人發展',
    text: '自我認同、性傾向探索、人生目標',
    img: 個人發展,
    imgSM: 個人發展SM,
  },
  {
    type: '家庭議題',
    text: '情緒勒索、產後憂鬱、親子溝通',
    img: 家庭議題,
    imgSM: 家庭議題SM,
  },
];

export const reservationCardAry = [
  {
    step: 'Step 1',
    img: step1,
    extraStyle: null,
  },
  {
    step: 'Step 2',
    img: step2,
    extraStyle: 'lg:!mt-[182px]',
  },
  {
    step: 'Step 3',
    img: step3,
    extraStyle: 'lg:!mt-[-127px]',
  },
  {
    step: 'Step 4',
    img: step4,
    extraStyle: 'lg:!mt-[56px]',
  },
];

export const userCommentAry1 = [
  {
    name: '李先生',
    comment: '平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師',
    img: 'https://images.unsplash.com/photo-1594167307527-9cc767ea56d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  },
  {
    name: '林小姐',
    comment: '我一直尋找能夠真正幫助我解決心理問題的平台，而這個平台真的讓我驚艷。他們的諮商師都很專業，且非常關心我的問題。我非常感...',
    img: 'https://images.unsplash.com/photo-1617549765716-5ab5b509c102?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: '李小姐',
    comment: '我之前一直對網上諮商持懷疑態度，但這個平台真的改變了我的看法。他們的系統非常穩定，諮商師的回覆速度也非常迅速。對於那...',
    img: 'https://images.unsplash.com/photo-1565019011521-b0575cbb57c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: '王小姐',
    comment: '我很滿意這個平台，他們的諮商師非常親切和專業，讓我感覺到自己的問題得到了重視和關注。平台的使用體驗也非常好，我從來沒有...',
    img: 'https://images.unsplash.com/photo-1541823709867-1b206113eafd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: '陳小姐',
    comment: '我想推薦這個平台給所有需要心理諮商的人。他們的諮商師真的很出色，且對於每個問題都能夠提供具體、有用的建議。我現在比以前...',
    img: 'https://images.unsplash.com/photo-1616325629936-99a9013c29c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: '廖小姐',
    comment: '我在這個平台上找到了我需要的支持和理解。諮商師非常專業和關心，而平台也非常注重用戶的隱私和安全。我現在比以前更有信心...',
    img: 'https://images.unsplash.com/photo-1522124719135-96ddb42c76d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  },
  {
    name: '吳先生',
    comment: '我一直在尋找一個能夠幫助我解決家庭問題的平台，而這個平台終於讓我找到了一個出路。他們的諮商師真的很有耐心和同理心，而且...',
    img: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: '林小姐',
    comment: '這個平台真的是一個改變我人生的地方。我現在能夠更好地了解自己，更好地應對自己的問題。我非常感謝這個平台，因為他們讓我...',
    img: 'https://images.unsplash.com/photo-1475823678248-624fc6f85785?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: '陳先生',
    comment: '非常感謝平台提供的心理諮商服務，讓我找到了解決問題的方法，讓我能夠更加積極地面對生活。',
    img: 'https://images.unsplash.com/photo-1552168212-9ceb61083ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: '柳小姐',
    comment: '很滿意平台的服務，諮商師非常專業，讓我在短時間內找到了問題的解決方案，謝謝平台。',
    img: 'https://images.unsplash.com/photo-1556755211-33971570a20c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=626&q=80',
  },
  {
    name: '吳小姐',
    comment: '這是一個非常方便的心理諮商平台，能夠隨時隨地進行諮詢，讓我感到非常舒適。',
    img: 'https://images.unsplash.com/photo-1620613908146-bb9a8bbb7eca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
  },
  {
    name: '曹小姐',
    comment: '平台提供的心理諮詢服務非常有用，讓我能夠更好地了解自己的問題並解決它們。',
    img: 'https://images.unsplash.com/photo-1575872235826-d560ce532ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  },
  {
    name: '蕭小姐',
    comment: '心理諮詢師非常親切，讓我感到非常放心和安心，謝謝平台提供這樣的服務。',
    img: 'https://images.unsplash.com/photo-1515077678510-ce3bdf418862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
  },
  {
    name: '藍小姐',
    comment: '非常感謝平台的諮詢師，他們對我的問題非常耐心，並給予了非常有用的建議和支持。',
    img: 'https://images.unsplash.com/photo-1569078449082-d264d9e239c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80',
  },
];
export const userCommentAry2 = [
  {
    name: '李先生',
    comment: '平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師',
    img: 'https://images.unsplash.com/photo-1594167307527-9cc767ea56d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  },
  {
    name: '林小姐',
    comment: '我一直尋找能夠真正幫助我解決心理問題的平台，而這個平台真的讓我驚艷。他們的諮商師都很專業，且非常關心我的問題。我非常感...',
    img: 'https://images.unsplash.com/photo-1617549765716-5ab5b509c102?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: '李小姐',
    comment: '我之前一直對網上諮商持懷疑態度，但這個平台真的改變了我的看法。他們的系統非常穩定，諮商師的回覆速度也非常迅速。對於那...',
    img: 'https://images.unsplash.com/photo-1565019011521-b0575cbb57c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: '王小姐',
    comment: '我很滿意這個平台，他們的諮商師非常親切和專業，讓我感覺到自己的問題得到了重視和關注。平台的使用體驗也非常好，我從來沒有...',
    img: 'https://images.unsplash.com/photo-1541823709867-1b206113eafd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: '陳小姐',
    comment: '我想推薦這個平台給所有需要心理諮商的人。他們的諮商師真的很出色，且對於每個問題都能夠提供具體、有用的建議。我現在比以前...',
    img: 'https://images.unsplash.com/photo-1616325629936-99a9013c29c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: '廖小姐',
    comment: '我在這個平台上找到了我需要的支持和理解。諮商師非常專業和關心，而平台也非常注重用戶的隱私和安全。我現在比以前更有信心...',
    img: 'https://images.unsplash.com/photo-1522124719135-96ddb42c76d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  },
  {
    name: '吳先生',
    comment: '我一直在尋找一個能夠幫助我解決家庭問題的平台，而這個平台終於讓我找到了一個出路。他們的諮商師真的很有耐心和同理心，而且...',
    img: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: '林小姐',
    comment: '這個平台真的是一個改變我人生的地方。我現在能夠更好地了解自己，更好地應對自己的問題。我非常感謝這個平台，因為他們讓我...',
    img: 'https://images.unsplash.com/photo-1475823678248-624fc6f85785?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: '陳先生',
    comment: '非常感謝平台提供的心理諮商服務，讓我找到了解決問題的方法，讓我能夠更加積極地面對生活。',
    img: 'https://images.unsplash.com/photo-1552168212-9ceb61083ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: '柳小姐',
    comment: '很滿意平台的服務，諮商師非常專業，讓我在短時間內找到了問題的解決方案，謝謝平台。',
    img: 'https://images.unsplash.com/photo-1556755211-33971570a20c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=626&q=80',
  },
  {
    name: '吳小姐',
    comment: '這是一個非常方便的心理諮商平台，能夠隨時隨地進行諮詢，讓我感到非常舒適。',
    img: 'https://images.unsplash.com/photo-1620613908146-bb9a8bbb7eca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
  },
  {
    name: '曹小姐',
    comment: '平台提供的心理諮詢服務非常有用，讓我能夠更好地了解自己的問題並解決它們。',
    img: 'https://images.unsplash.com/photo-1575872235826-d560ce532ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  },
  {
    name: '蕭小姐',
    comment: '心理諮詢師非常親切，讓我感到非常放心和安心，謝謝平台提供這樣的服務。',
    img: 'https://images.unsplash.com/photo-1515077678510-ce3bdf418862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
  },
  {
    name: '藍小姐',
    comment: '非常感謝平台的諮詢師，他們對我的問題非常耐心，並給予了非常有用的建議和支持。',
    img: 'https://images.unsplash.com/photo-1569078449082-d264d9e239c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80',
  },
];
