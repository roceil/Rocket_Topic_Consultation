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
    img: 'https://pi.rocket-coding.com/upload/headshot/5-測試12-20230420171238.png',
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
    img: 'https://pi.rocket-coding.com/upload/headshot/7-吳虹慧-20230420161831.png',
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
    img: 'https://pi.rocket-coding.com/upload/headshot/8-測試1-20230420170913.png',
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
    img: 'https://pi.rocket-coding.com/upload/headshot/9-蕭翔宇-20230422173211.png',
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
    img: 'https://pi.rocket-coding.com/upload/headshot/10-施宇峻-20230422155712.png',
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
    img: 'https://pi.rocket-coding.com/upload/headshot/11-測試4-20230420163102.png',
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
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1522124719135-96ddb42c76d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1565019011521-b0575cbb57c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1475823678248-624fc6f85785?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1552168212-9ceb61083ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1621390842036-f01b53d9cbfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1556755211-33971570a20c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=926&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1515077678510-ce3bdf418862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1620613908146-bb9a8bbb7eca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1487309078313-fad80c3ec1e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1569078449082-d264d9e239c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=985&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1575872235826-d560ce532ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
  },
];
export const userCommentAry2 = [
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1522124719135-96ddb42c76d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1565019011521-b0575cbb57c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1475823678248-624fc6f85785?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1552168212-9ceb61083ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1621390842036-f01b53d9cbfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1556755211-33971570a20c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=926&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1515077678510-ce3bdf418862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1620613908146-bb9a8bbb7eca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1487309078313-fad80c3ec1e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1569078449082-d264d9e239c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=985&q=80',
  },
  {
    name: '王小明',
    comment: '諮商師很有耐心，很細心的聽我說話，我覺得很棒！',
    img: 'https://images.unsplash.com/photo-1575872235826-d560ce532ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
  },
];
