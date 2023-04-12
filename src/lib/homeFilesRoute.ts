/* eslint-disable import/no-cycle */
import Banner from '../modules/Home/Banner';
import SuggestCounselor from '../modules/Home/SuggestCounselor';
import CustomTopic from '../modules/Home/CustomTopic';
import PlatformFeature from '../modules/Home/PlatformFeature';
import UserComment from '../modules/Home/UserComment';
import ReservationTour from '../modules/Home/ReservationTour';
import 人際關係 from '../../public/images/home/customTopic/人際關係.svg';
import 人際關係SM from '../../public/images/home/customTopic/人際關係SM.svg';
import 伴侶關係 from '../../public/images/home/customTopic/伴侶關係.svg';
import 伴侶關係SM from '../../public/images/home/customTopic/伴侶關係SM.svg';
import 負面情緒 from '../../public/images/home/customTopic/負面情緒.svg';
import 負面情緒SM from '../../public/images/home/customTopic/負面情緒SM.svg';
import 個人發展 from '../../public/images/home/customTopic/個人發展.svg';
import 個人發展SM from '../../public/images/home/customTopic/個人發展SM.svg';
import 家庭議題 from '../../public/images/home/customTopic/家庭議題.svg';
import 家庭議題SM from '../../public/images/home/customTopic/家庭議題SM.svg';
import 職場議題 from '../../public/images/home/customTopic/職場議題.svg';
import 職場議題SM from '../../public/images/home/customTopic/職場議題SM.svg';
import step1 from '../../public/images/home/reservationTour/step1.svg';
import step2 from '../../public/images/home/reservationTour/Step2.svg';
import step3 from '../../public/images/home/reservationTour/Step3.svg';
import step4 from '../../public/images/home/reservationTour/Step4.svg';

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
    name: '家洋 1 號',
    rankTag: '熱門諮商師 TOP 1',
    img: 'https://raw.githubusercontent.com/roceil/Rocket_Topic_Consultation/dev/public/images/home/suggestCounselor/counselor1.svg',
    skillsAry: [
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
    ],
  },
  {
    name: '家洋 2 號',
    rankTag: '熱門諮商師 TOP 2',
    img: 'https://raw.githubusercontent.com/roceil/Rocket_Topic_Consultation/dev/public/images/home/suggestCounselor/counselor2.svg',
    skillsAry: [
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
    ],
  },
  {
    name: '家洋 3 號',
    rankTag: '熱門諮商師 TOP 3',
    img: 'https://raw.githubusercontent.com/roceil/Rocket_Topic_Consultation/dev/public/images/home/suggestCounselor/counselor3.svg',
    skillsAry: [
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
    ],
  },
  {
    name: '家洋 4 號',
    rankTag: '熱門諮商師 TOP 4',
    img: 'https://raw.githubusercontent.com/roceil/Rocket_Topic_Consultation/dev/public/images/home/suggestCounselor/counselor4.svg',
    skillsAry: [
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
    ],
  },
  {
    name: '家洋 5 號',
    rankTag: '熱門諮商師 TOP 5',
    img: 'https://raw.githubusercontent.com/roceil/Rocket_Topic_Consultation/dev/public/images/home/suggestCounselor/counselor5.svg',
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
    name: '家洋 6 號',
    rankTag: '熱門諮商師 TOP 6',
    img: 'https://raw.githubusercontent.com/roceil/Rocket_Topic_Consultation/dev/public/images/home/suggestCounselor/counselor6.svg',
    skillsAry: [
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
