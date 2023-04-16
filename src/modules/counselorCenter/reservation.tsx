import CommonPagination from '@/common/components/CommonPagination';
import CounselorCenterLayout from '@/modules/counselorCenter/CounselorCenterLayout';
import CounselorHasCancel from '@/modules/counselorCenter/CounselorHasCancel';
import CounselorHasSetUp from '@/modules/counselorCenter/CounselorHasSetUp';
import CounselorWaitReply from '@/modules/counselorCenter/CounselorWaitReply';
import { ConfigProvider, Tabs } from 'antd';

// 右側選單的選項陣列
const counselorReservationTabAry = [
  {
    key: '待回覆',
    label: <p className="font-bold">待回覆</p>,
    children: <CounselorWaitReply />,
  },
  {
    key: '已成立',
    label: <p className="font-bold">已成立</p>,
    children: <CounselorHasSetUp />,
  },
  {
    key: '已取消',
    label: <p className="font-bold">已取消</p>,
    children: <CounselorHasCancel />,
  },
];

// 控制右側選單函式
function CounselorReservationTab() {
  // 顯示分頁位置函式
  const onChange = (key: string) => {
    console.log('🚀 ~ file: reservation.tsx:23 ~ onChange ~ key:', key);
  };
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
        <Tabs defaultActiveKey="待回覆" items={counselorReservationTabAry} onChange={onChange} />
      </ConfigProvider>
      <div className="mt-10">
        <CommonPagination TotalPageNum={0} pageId="1" />
      </div>
    </div>
  );
}

export default function reservation() {
  return (
    <>
      {/* 手機版 預約管理 */}
      <section className="pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px] bg-white">
        <div className="container mb-10">
          <h2 className="mb-12 text-center leading-loose lg:hidden">預約管理</h2>
          <CounselorReservationTab />
        </div>
      </section>

      {/* 電腦版 */}
      <CounselorCenterLayout>
        <CounselorReservationTab />
      </CounselorCenterLayout>
    </>
  );
}