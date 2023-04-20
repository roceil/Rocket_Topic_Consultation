import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { counselorReservationPage } from '@/common/redux/feature/counselorReservationPage';

export default function CounselorPagination({ totalPageNum, PageNum }:{ totalPageNum:number, PageNum:number }) {
  const dispatch = useDispatch();
  return (
    <div className="mt-12 flex w-full justify-center lg:justify-end">
      <Pagination
        defaultCurrent={PageNum}
        total={totalPageNum * 10}
        onChange={(value) => {
          dispatch(counselorReservationPage(value));
        }}
      />
    </div>
  );
}
