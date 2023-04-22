import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ICounselorWaitReplyProps } from '@/types/interface';
import { useCounselorReservationDataGetQuery } from '@/common/redux/service/counselorReservation';
import useCloseLoading from '@/common/hooks/useCloseLoading';
import { loadingStatus } from '@/common/redux/feature/loading';
import CounselorPagination from './CounselorPagination';
import WaitReplyListLayout from './layout/WaitReplyListLayout';

export default function CounselorWaitReply() {
  const dispatch = useDispatch();
  const token = getCookie('auth');
  const PageNum = useSelector((state:{ counselorReservationPage:{ value:number } }) => state.counselorReservationPage.value);
  const tab = useSelector((state:{ counselorReservationTab:{ value:string } }) => state.counselorReservationTab.value);

  // ====================== 關閉 loading ======================
  useCloseLoading();

  // ====================== state ======================
  const [renderData, setRenderData] = useState<ICounselorWaitReplyProps[][]>([]);
  const [totalPageNum, setTotalPageNum] = useState(0);

  // ====================== 取得諮商師預約資料 ======================
  const { data, isLoading, refetch } = useCounselorReservationDataGetQuery({ token, tab, page: PageNum }, { refetchOnMountOrArgChange: true,
    refetchOnFocus: true });

  // ====================== 取得資料並渲染 ======================
  useEffect(() => {
    if (!data) {
      dispatch(loadingStatus('none'));
      return;
    }
    const { List, TotalPageNum } = data.Data;
    const convertRenderData: ICounselorWaitReplyProps[][] = Object.values(
      List.reduce((acc: { [key: number]: ICounselorWaitReplyProps[] }, curr: ICounselorWaitReplyProps) => {
        if (!acc[curr.OrderId]) {
          acc[curr.OrderId] = [];
        }
        acc[curr.OrderId].push(curr);
        return acc;
      }, {}),
    );
    setRenderData(convertRenderData);
    setTotalPageNum(TotalPageNum);
    dispatch(loadingStatus('none'));
  }, [data, isLoading]);

  return (
    <div>
      {renderData.length === 0 ? (<div className="flex h-[467px] w-full items-center justify-center rounded-2xl bg-gray-200 font-bold text-gray-900 lg:h-[519px]">尚無訂單記錄</div>) : (
        <div>
          {/* 表格 */}
          <div className="overflow-x-auto rounded-2xl bg-gray-200 pb-9 lg:pb-12">
            <ul className="flex w-[624px] border-b border-gray-400  py-5 pl-[29px] text-sm font-bold text-gray-700 lg:w-auto lg:px-0 lg:text-center">
              <li className="lg:w-[19.5889%] lg:pl-[100px] xl:pl-[80px] lg:text-center">個案姓名</li>
              <li className="ml-[33px] lg:ml-0 lg:w-[16.996%] lg:pl-0">諮商議題</li>
              <li className="ml-[57px] lg:ml-0  lg:w-[17.7865%]">諮商日期</li>
              <li className="ml-[47px] lg:ml-0  lg:w-[14.4268%]">諮商時間</li>
              <li className="ml-[72px] lg:ml-0  lg:w-[33.2015%] lg:pl-[100px] lg:text-left">
                確認預約時段
              </li>
            </ul>
            <ul className="w-[624px] space-y-4 px-3 pt-5 lg:w-auto lg:px-7 lg:pt-7">
              {renderData.map((group: ICounselorWaitReplyProps[], index: number) => {
                if (index < renderData.length - 1) {
                  return (
                    <ul key={uuidv4()} className="flex flex-col space-y-4 border-b border-dashed border-gray-400 pb-4">
                      {group.map((appointment:ICounselorWaitReplyProps) => (
                        <WaitReplyListLayout key={uuidv4()} appointment={appointment} refetch={refetch} />
                      ))}
                    </ul>
                  );
                }
                return (
                  <ul key={uuidv4()} className="flex flex-col space-y-4 pb-4">
                    {group.map((appointment: ICounselorWaitReplyProps) => (
                      <WaitReplyListLayout key={uuidv4()} appointment={appointment} refetch={refetch} />
                    ))}
                  </ul>
                );
              })}
            </ul>

          </div>

          {/* 分頁 */}
          <CounselorPagination PageNum={PageNum} totalPageNum={totalPageNum} />
        </div>
      )}
    </div>
  );
}
