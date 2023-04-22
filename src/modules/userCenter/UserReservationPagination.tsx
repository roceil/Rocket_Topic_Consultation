import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { reservationPageNum } from '@/common/redux/feature/userCenterReservationPosition';
import { loadingStatus } from '@/common/redux/feature/loading';

export default function UserReservationPagination({ totalPageNum, PageNum }:{ totalPageNum:number, PageNum:number }) {
  const dispatch = useDispatch();
  return (
    <div className="mt-12 flex w-full justify-center lg:justify-end">
      <Pagination
        defaultCurrent={PageNum}
        total={totalPageNum * 10}
        onChange={(value) => {
          dispatch(reservationPageNum(value));
          dispatch(loadingStatus('isLoading'));
        }}
      />
    </div>
  );
}
