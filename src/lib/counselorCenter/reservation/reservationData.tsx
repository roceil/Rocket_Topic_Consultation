import CounselorHasCancel from '@/modules/counselorCenter/reservation/CounselorHasCancel';
import CounselorHasSetUp from '@/modules/counselorCenter/reservation/CounselorHasSetUp';
import CounselorWaitReply from '@/modules/counselorCenter/reservation/CounselorWaitReply';

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

export default counselorReservationTabAry;
