import { SelectProps } from 'antd';
import Link from 'next/link';
import counselor03 from '../../../public/images/counselorList/Counselor 03  - lg.svg';

export const counselorListAPI = {
  Success: true,
  Message: '成功取得諮商師總覽',
  Data: {
    TotalPageNum: 2, // 總頁數
    CounselorsData: [
      {
        Id: 1,
        Name: '王小明123',
        SellingPoint: '頂級傳統百年手作諮商工藝',
        SelfIntroduction: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
        Photo: 'https://pi.rocket-coding.com/upload/headshot/22-KrisHsueh-20230409133904.jpg',
        Field: ['職場議題', '伴侶關係'],
      },
      {
        Id: 2,
        Name: '哈哈哈',
        SellingPoint: '頂級傳統百年手作諮商工藝',
        SelfIntroduction: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
        Photo: 'https://images.unsplash.com/photo-1620613908146-bb9a8bbb7eca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
        Field: ['職場議題', '伴侶關係'],
      },
      {
        Id: 3,
        Name: '耶耶耶',
        SellingPoint: '頂級傳統百年手作諮商工藝',
        SelfIntroduction: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
        Photo: counselor03,
        Field: ['職場議題', '伴侶關係'],
      },
    ],
  },
};

export const counselorListAPI2 = {
  Success: true,
  Message: '成功取得諮商師總覽',
  Data: {
    TotalPageNum: 2, // 總頁數
    CounselorsData: [
      {
        Id: 1,
        Name: '王小明 2 號',
        SellingPoint: '頂級傳統百年手作諮商工藝',
        SelfIntroduction: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
        Photo: 'https://pi.rocket-coding.com/upload/headshot/22-KrisHsueh-20230409133904.jpg',
        Field: ['職場議題', '伴侶關係'],
      },
      {
        Id: 2,
        Name: '哈哈哈哈哈',
        SellingPoint: '頂級傳統百年手作諮商工藝',
        SelfIntroduction: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
        Photo: 'https://images.unsplash.com/photo-1620613908146-bb9a8bbb7eca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
        Field: ['職場議題', '伴侶關係'],
      },
      {
        Id: 3,
        Name: '耶耶耶耶耶',
        SellingPoint: '頂級傳統百年手作諮商工藝',
        SelfIntroduction: '我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒...',
        Photo: counselor03,
        Field: ['職場議題', '伴侶關係'],
      },
    ],
  },
};

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
