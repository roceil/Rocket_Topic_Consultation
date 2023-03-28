import { SelectProps } from 'antd';
import Link from 'next/link';
import counselor01 from '../../../public/images/counselorList/Counselor 01  - lg.svg';
import counselor02 from '../../../public/images/counselorList/Counselor 02  - lg.svg';
import counselor03 from '../../../public/images/counselorList/Counselor 03  - lg.svg';
import counselor04 from '../../../public/images/counselorList/Counselor 04  - lg.svg';
import counselor05 from '../../../public/images/counselorList/Counselor 05  - lg.svg';
import counselor06 from '../../../public/images/counselorList/Counselor 06  - lg.svg';
import counselor07 from '../../../public/images/counselorList/Counselor 07  - lg.svg';
import counselor08 from '../../../public/images/counselorList/Counselor 08  - lg.svg';
import counselor09 from '../../../public/images/counselorList/Counselor 09  - lg.svg';
import counselor10 from '../../../public/images/counselorList/Counselor 10  - lg.svg';

export const counselorData = [
  {
    id: 1,
    counselorName: '王小明',
    subtitle: '頂級傳統百年手作諮商工藝',
    description: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
    img: counselor01,
  },
  {
    id: 2,
    counselorName: '李小華',
    subtitle: '頂級傳統百年手作諮商工藝',
    description: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
    img: counselor02,
  },
  {
    id: 3,
    counselorName: '陳小美',
    subtitle: '頂級傳統百年手作諮商工藝',
    description: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
    img: counselor03,
  },
  {
    id: 4,
    counselorName: '林小英',
    subtitle: '頂級傳統百年手作諮商工藝',
    description: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
    img: counselor04,
  },
  {
    id: 5,
    counselorName: '黃小花',
    subtitle: '頂級傳統百年手作諮商工藝',
    description: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
    img: counselor05,
  },
  {
    id: 6,
    counselorName: '張小雄',
    subtitle: '頂級傳統百年手作諮商工藝',
    description: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
    img: counselor06,
  },
  {
    id: 7,
    counselorName: '劉小娟',
    subtitle: '頂級傳統百年手作諮商工藝',
    description: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
    img: counselor07,
  },
  {
    id: 8,
    counselorName: '蔡小威',
    subtitle: '頂級傳統百年手作諮商工藝',
    description: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
    img: counselor08,
  },
  {
    id: 9,
    counselorName: '謝小婷',
    subtitle: '頂級傳統百年手作諮商工藝',
    description: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
    img: counselor09,
  },
  {
    id: 10,
    counselorName: '蔡小威',
    subtitle: '頂級傳統百年手作諮商工藝',
    description: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
    img: counselor10,
  },
];

export const counselorBreadcrumb = [
  {
    title: (
      <Link href="/" className="text-base">
        Home
      </Link>
    ),
  },
  {
    title: <span className="text-base text-secondary">諮商師總覽</span>,
  },
];

export const selectOptions: SelectProps['options'] = [
  {
    label: '職場議題',
    value: '職場議題',
  },
  {
    label: '伴侶關係',
    value: '伴侶關係',
  },
  {
    label: '人際關係',
    value: '人際關係',
  },
  {
    label: '負面情緒',
    value: '負面情緒',
  },
  {
    label: '個人發展',
    value: '個人發展',
  },
  {
    label: '家庭議題',
    value: '家庭議題',
  },
];
