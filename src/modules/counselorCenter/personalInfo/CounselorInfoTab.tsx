import { ConfigProvider, Tabs } from 'antd';
import React from 'react';
import { ClassInfo } from './ClassInfo';
import TimeInfo from './TimeInfo';
import { InfoForm } from './InfoForm';

const counselorInfoTabAry = [
  {
    key: '基本資料',
    label: '基本資料',
    children: (
      <InfoForm />
    ),
  },
  {
    key: '課程資訊',
    label: '課程資訊',
    children: <ClassInfo />,
  },
  {
    key: '預約時段',
    label: '預約時段',
    children: <TimeInfo />,
  },
];

// 控制『個人資料 3 Tabs』函式
export default function CounselorInfoTab() {
  return (
    <div className="counselorTab">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#4A5364',
            colorText: '#9E9E9E',
            fontSize: 16,
            margin: 32,
          },
        }}
      >
        <Tabs
          defaultActiveKey="基本資料"
          items={counselorInfoTabAry}
        />
      </ConfigProvider>
    </div>
  );
}
