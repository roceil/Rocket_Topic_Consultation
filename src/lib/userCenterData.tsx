import HasCancel from '@/modules/userCenter/HasCancel';
import HasSetUp from '@/modules/userCenter/HasSetUp';
import WaitReply from '@/modules/userCenter/WaitReply';
import WaitReservation from '@/modules/userCenter/WaitReservation';
import HasFinish from '@/modules/userCenter/HasFinish';
import { TabsProps } from 'antd';

export const reservationTabs: TabsProps['items'] = [
  {
    key: '待預約',
    label: '待預約',
    children: <WaitReservation />,
  },
  {
    key: '待回覆',
    label: '待回覆',
    children: <WaitReply />,
  },
  {
    key: '已成立',
    label: '已成立',
    children: <HasSetUp />,
  },
  {
    key: '已完成',
    label: '已完成',
    children: <HasFinish />,
  },
  {
    key: '已取消',
    label: '已取消',
    children: <HasCancel />,
  },
];

export const orderStatus = [
  { value: '待預約', label: '待預約' },
  { value: '待回覆', label: '待回覆' },
  { value: '已成立', label: '已成立' },
  { value: '已完成', label: '已完成' },
  { value: '已取消', label: '已取消' },
];

