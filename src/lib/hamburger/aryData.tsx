import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';

// 管理「諮商師」會員中心的子按鈕
export const counselorCenterAry = [
  {
    lableName: '個人資料',
    link: '/UserCenter',
  },
  {
    lableName: '預約管理',
    link: '/UserCenter',
  },
  {
    lableName: '個案記錄',
    link: '/UserCenter',
  },
];

// 管理「用戶」會員中心的子按鈕
export const userCenterAry = [
  {
    lableName: '個人資料',
    link: '/usercenter',
  },
  {
    lableName: '預約管理',
    link: '/usercenter/reservation',
  },
];

// 管理「諮商師」選單的前兩個按鈕
export const counselorListAry = [
  {
    labelName: '諮商師總覽',
    link: '/counselorlist',
    icon: <SearchOutlined className="text-lg" />,
  },
];

// 管理「用戶」選單的前兩個按鈕
export const userListAry = [
  {
    labelName: '諮商師總覽',
    link: '/counselorlist',
    icon: <SearchOutlined className="text-lg" />,
  },
  {
    labelName: '購物車',
    link: '/shoppingcart',
    icon: <ShoppingCartOutlined className="text-lg" />,
  },
];
