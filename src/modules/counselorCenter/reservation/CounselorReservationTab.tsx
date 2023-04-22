import { ConfigProvider, Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import { counselorReservationTab } from '@/common/redux/feature/counselorReservationTab';
import counselorReservationTabAry from '@/lib/counselorCenter/reservation/reservationData';
import { counselorReservationPage } from '@/common/redux/feature/counselorReservationPage';

export default function CounselorReservationTab() {
  const dispatch = useDispatch();
  // ====================== tab 切換 ======================
  const onChange = (key: string) => {
    dispatch(counselorReservationTab(key));
    dispatch(counselorReservationPage(1));
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

    </div>
  );
}
