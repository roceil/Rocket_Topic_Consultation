import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from 'cookies-next';
import { useCounselorReservationDataGetQuery } from '@/common/redux/service/counselorReservation';
import { loadingStatus } from '@/common/redux/feature/loading';
import CounselorPagination from './CounselorPagination';
import { ICounselorAppointment, Appointment } from './layout/HasSetUpListLayout';

export default function CounselorHasSetUp() {
  const dispatch = useDispatch();
  const token = getCookie('auth');
  const PageNum = useSelector((state:{ counselorReservationPage:{ value:number } }) => state.counselorReservationPage.value);
  const tab = useSelector((state:{ counselorReservationTab:{ value:string } }) => state.counselorReservationTab.value);

  // ====================== state ======================
  const [renderData, setRenderData] = useState<ICounselorAppointment[][]>([]);
  const [totalPageNum, setTotalPageNum] = useState(0);

  // ====================== 取得諮商師預約資料 ======================
  const { data, isLoading } = useCounselorReservationDataGetQuery({ token, tab, page: PageNum }, { refetchOnMountOrArgChange: true,
    refetchOnFocus: true });

  // ====================== 取得資料並渲染 ======================
  useEffect(() => {
    console.log('已完成', isLoading);
    if (!data) {
      dispatch(loadingStatus('none'));
      return;
    }
    const { List, TotalPageNum } = data.Data;
    const convertRenderData: ICounselorAppointment[][] = Object.values(
      List.reduce((acc: { [key: number]: ICounselorAppointment[] }, curr: ICounselorAppointment) => {
        if (!acc[curr.OrderId]) {
          acc[curr.OrderId] = [];
        }
        acc[curr.OrderId].push(curr);
        return acc;
      }, {}),
    );
    setRenderData(convertRenderData);
    setTotalPageNum(TotalPageNum);
  }, [data, isLoading]);

  return (
    <div>
      {renderData.length === 0 ? (<div className="flex h-[467px] w-full items-center justify-center rounded-2xl bg-gray-200 font-bold text-gray-900 lg:h-[519px]">尚無訂單記錄</div>) : (
        <div>
          {/* 表格 */}
          <div className="overflow-x-auto px-7 rounded-2xl bg-gray-200 pb-9 lg:pb-12">
            <ul className="flex w-[761px] border-b border-gray-400  py-5  text-sm font-bold text-gray-700 lg:w-auto  lg:text-center">
              <li className="w-1/5">個案姓名</li>
              <li className="w-1/5">諮商議題</li>
              <li className="w-1/5">預約日期</li>
              <li className="w-1/5">預約時間</li>
              <li className="w-1/5">加入Google日曆</li>
              <li className="w-1/5">個案記錄</li>
            </ul>

            <ul className="w-[761px] space-y-4 pt-5 lg:w-auto lg:pt-7">
              {renderData.map((group: ICounselorAppointment[], index: number) => {
                if (index < renderData.length - 1) {
                  return (
                    <ul key={uuidv4()} className="flex flex-col space-y-4 border-b border-dashed border-gray-400 pb-4">
                      {group.map((appointment:ICounselorAppointment) => (
                        <Appointment key={uuidv4()} appointment={appointment} />
                      ))}
                    </ul>
                  );
                }
                return (
                  <ul key={uuidv4()} className="flex flex-col space-y-4 pb-4">
                    {group.map((appointment: ICounselorAppointment) => (
                      <Appointment key={uuidv4()} appointment={appointment} />
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

