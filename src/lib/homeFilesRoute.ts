import { Banner } from '../components/Home/Banner'
import { SuggestCounselor } from '../components/Home/SuggestCounselor'
import { CustomTopic } from '../components/Home/CustomTopic'
import { PlatformFeature } from '../components/Home/PlatformFeature'
import { UserComment } from '../components/Home/UserComment'
import { ReservationTour } from '../components/Home/ReservationTour'

export const homeComponents = {
  Banner,
  SuggestCounselor,
  CustomTopic,
  PlatformFeature,
  UserComment,
  ReservationTour
}

export const fakeCounselorAry = [
  '#女性議題',
  '#親密關係',
  '#青少年',
  '#中老年議題',
  '#一般成人',
  '#PTSD'
]

export const topicCardAry = [
  {
    type: '女性議題',
    text: '產後憂鬱、更年期'
  },
  {
    type: '親密關係',
    text: '婚姻、戀愛、親子關係'
  },
  {
    type: '青少年',
    text: '升學壓力、人際關係、自我探索'
  },
  {
    type: 'PTSD',
    text: '性侵、霸凌、家暴'
  },
  {
    type: '中老年議題',
    text: '老化擔憂、孤獨、阿茲海默'
  },
  {
    type: '一般成人',
    text: '職涯發展、適應障礙、壓力排解'
  }
]