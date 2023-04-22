import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { counselorReservationPage } from '@/common/redux/feature/counselorReservationPage';
import useOpenLoading from '@/common/hooks/useOpenLoading';

export default function CounselorPagination({ totalPageNum, PageNum }:{ totalPageNum:number, PageNum:number }) {
  const dispatch = useDispatch();
  const openLoading = useOpenLoading();
  return (
    <div className="mt-12 flex w-full justify-center lg:justify-end">
      <Pagination
        defaultCurrent={PageNum}
        total={totalPageNum * 10}
        onChange={(value) => {
          openLoading();
          dispatch(counselorReservationPage(value));
        }}
      />
    </div>
  );
}
