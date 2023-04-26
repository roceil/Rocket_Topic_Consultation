import React, { useState } from 'react';
import { ConfigProvider, Select, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { reservationTab } from '@/common/redux/feature/userCenterReservation';
import HasCancel from '@/modules/userCenter/HasCancel';
import HasSetUp from '@/modules/userCenter/HasSetUp';
import WaitReply from '@/modules/userCenter/WaitReply';
import WaitReservation from '@/modules/userCenter/WaitReservation';
import HasFinish from '@/modules/userCenter/HasFinish';
import UserCenterLayout from '@/modules/userCenter/UserCenterLayout';
import { orderStatus, reservationTabs } from '@/lib/userCenterData';
import useCloseLoading from '@/common/hooks/useCloseLoading';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import { reservationPageNum } from '@/common/redux/feature/userCenterReservationPosition';
import CustomHead from '@/common/components/CustomHead';

export default function reservation() {
  useCloseLoading();
  const dispatch = useDispatch();
  const openLoading = useOpenLoading();
  const [table, setTable] = useState(<WaitReservation />);
  const tab = useSelector((state: { userCenterReservation: { value: string } }) => state.userCenterReservation.value);

  // !辨識分頁位置函式 => 記得移出去
  const checkTab = (tabPosition: string) => {
    switch (tabPosition) {
      case '待預約':
        setTable(<WaitReservation />);
        dispatch(reservationTab('待預約'));
        break;

      case '待回覆':
        setTable(<WaitReply />);
        dispatch(reservationTab('待回覆'));
        break;

      case '已成立':
        setTable(<HasSetUp />);
        dispatch(reservationTab('已成立'));
        break;

      case '已完成':
        setTable(<HasFinish />);
        dispatch(reservationTab('已完成'));
        break;

      case '已取消':
        setTable(<HasCancel />);
        dispatch(reservationTab('已取消'));
        break;

      default:
        break;
    }
  };

  // 手機版改變分頁位置函式
  const selectTabOnMobile = (value: string) => {
    dispatch(reservationTab(value));
    openLoading();
    checkTab(value);
  };

  // 電腦版改變分頁位置函式
  const selectTabOnPC = (key: string) => {
    dispatch(reservationTab(key));
    openLoading();
    dispatch(reservationPageNum(1));
  };

  return (
    <>
      <CustomHead pageTitle="預約管理" />
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
                <Select defaultValue={tab} style={{ width: 152 }} onChange={selectTabOnMobile} options={orderStatus} getPopupContainer={(trigger) => trigger.parentElement} />
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
              <Tabs className=" w-full" defaultActiveKey={tab} items={reservationTabs} onChange={selectTabOnPC} />
            </ConfigProvider>
          </div>
        </UserCenterLayout>
      </div>
    </>
  );
}
