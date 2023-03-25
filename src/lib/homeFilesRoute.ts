/* eslint-disable import/no-cycle */
import Banner from '../modules/Home/Banner';
import SuggestCounselor from '../modules/Home/SuggestCounselor';
import CustomTopic from '../modules/Home/CustomTopic';
import PlatformFeature from '../modules/Home/PlatformFeature';
import UserComment from '../modules/Home/UserComment';
import ReservationTour from '../modules/Home/ReservationTour';

export const homeComponents = {
  Banner,
  SuggestCounselor,
  CustomTopic,
  PlatformFeature,
  UserComment,
  ReservationTour,
};

export const counselorRank = [
  { name: '家洋 1 號', rankTag: '熱門諮商師 TOP 1' },
  { name: '家洋 2 號', rankTag: '熱門諮商師 TOP 2' },
  { name: '家洋 3 號', rankTag: '熱門諮商師 TOP 3' },
  { name: '家洋 4 號', rankTag: '熱門諮商師 TOP 4' },
  { name: '家洋 5 號', rankTag: '熱門諮商師 TOP 5' },
  { name: '家洋 6 號', rankTag: '熱門諮商師 TOP 6' },
];

export const topicCardAry = [
  {
    type: '女性議題',
    text: '產後憂鬱、更年期',
  },
  {
    type: '親密關係',
    text: '婚姻、戀愛、親子關係',
  },
  {
    type: '青少年',
    text: '升學壓力、人際關係、自我探索',
  },
  {
    type: 'PTSD',
    text: '性侵、霸凌、家暴',
  },
  {
    type: '中老年議題',
    text: '老化擔憂、孤獨、阿茲海默',
  },
  {
    type: '一般成人',
    text: '職涯發展、適應障礙、壓力排解',
  },
];
