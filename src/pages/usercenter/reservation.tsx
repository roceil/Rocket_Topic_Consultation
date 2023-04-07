import { useEffect, useState } from 'react';
import { ConfigProvider, Select, Tabs } from 'antd';
import HasCancel from '@/modules/userCenter/HasCancel';
import HasSetUp from '@/modules/userCenter/HasSetUp';
import WaitReply from '@/modules/userCenter/WaitReply';
import WaitReservation from '@/modules/userCenter/WaitReservation';
import UserCenterLayout from '@/modules/userCenter/UserCenterLayout';
import { orderStatus, reservationTabs } from '@/lib/userCenterData';

export default function reservation() {
  const [tab, setTab] = useState('待預約');
  const [table, setTable] = useState(<WaitReservation />);

  // 辨識分頁位置函式
  const checkTab = () => {
    switch (tab) {
      case '待預約':
        setTable(<WaitReservation />);
        break;

      case '待回覆':
        setTable(<WaitReply />);
        break;

      case '已取消':
        setTable(<HasCancel />);
        break;

      case '已成立':
        setTable(<HasSetUp />);
        break;

      default:
        break;
    }
  };

  // 手機版改變分頁位置函式
  const handleChange = (value: string) => {
    console.log('🚀 ~ file: reservation.tsx:40 ~ handleChange ~ value:', value);
    setTab(value);
    checkTab();
  };
  // 監聽手機版是否改變分頁位置
  useEffect(() => {
    handleChange(tab);
  }, [tab]);

  // 電腦版改變分頁位置函式
  const onChange = (key: string) => {
    console.log('🚀 ~ file: reservation.tsx:47 ~ onChange ~ key:', key);
  };

  return (
    <div className="bg-white">
      {/* 手機版 */}
      <section className="pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px] ">
        <div className="container">
          <div className="hidden rounded-full bg-primary-heavy py-[13px] text-center font-bold text-secondary lg:mb-[72px] lg:block">目前尚無預約</div>
          <h2 className="mb-5 text-center leading-loose lg:hidden">預約管理</h2>

          <div className="mb-8 flex items-center space-x-5">
            <span className="text-sm text-secondary">訂單狀態</span>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#4A5364',
                  colorText: '#4A5364',
                  colorBorder: '#4A5364',
                  colorTextQuaternary: '#4A5364',
                  controlHeight: 36,
                  borderRadius: 10,
                },
              }}
            >
              <Select defaultValue="待預約" style={{ width: 152 }} onChange={handleChange} options={orderStatus} getPopupContainer={(trigger) => trigger.parentElement} />
            </ConfigProvider>
          </div>

          {/* 表格顯示區塊 */}
          {table}
        </div>
      </section>

      {/* 電腦版 */}
      <UserCenterLayout>
        <div className="order">
          <ConfigProvider
            theme={{
              token: {
                margin: 48,
                colorPrimary: '#4A5364',
                colorText: '#4A5364',
                fontSize: 16,
              },
            }}
          >
            <Tabs className=" w-full" defaultActiveKey="1" items={reservationTabs} onChange={onChange} />
          </ConfigProvider>
        </div>
      </UserCenterLayout>
    </div>
  );
}
