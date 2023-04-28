import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { reservationPageNum } from '@/common/redux/feature/userCenterReservationPosition';

export default function UserReservationPagination({ totalPageNum, PageNum }:{ totalPageNum:number, PageNum:number }) {
  const dispatch = useDispatch();
  const [renderPageNum, setRenderPageNum] = useState(PageNum);
  return (
    <div className="mt-12 flex w-full justify-center lg:justify-end">
      <Pagination
        current={renderPageNum}
        total={totalPageNum * 10}
        onChange={(value) => {
          dispatch(reservationPageNum(value));
          setRenderPageNum(value);
        }}
      />
    </div>
  );
}
