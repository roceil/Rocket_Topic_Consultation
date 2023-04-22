import { v4 as uuidv4 } from 'uuid';
import { IButton } from '@/common/components/IButton';
import { useCounselorReservationDataGetQuery } from '@/common/redux/service/counselorReservation';
import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CounselorPagination from './CounselorPagination';

interface ICounselorAppointment {
  AppointmentId: number;
  Field: string;
  OrderId: number;
  Time: string;
  User: string;
}

// !這個要想辦法元件化
export function Appointment({ appointment }: { appointment: ICounselorAppointment }) {
  const { AppointmentId, Field, Time, User } = appointment;
  const convertTime = dayjs(Time).format('HH:mm');
  const convertDate = dayjs(Time).format('YYYY / MM / DD');

  return (
    <li key={AppointmentId} className="flex items-center rounded-lg bg-white py-5 text-center text-sm text-gray-900 lg:space-x-0 lg:text-base">
      <div className="w-[20.1438%]">{User}</div>
      <div className="w-[20.1438%]">{Field}</div>
      <div className="w-[22.1438%]">{convertDate}</div>
      <div className="w-[20.1438%]">{convertTime}</div>
      <div className="flex w-[19.4244%] justify-center text-xs lg:text-sm">
        <IButton text="查看" px="px-4 lg:px-5" py="py-1 lg:py-2" fontSize="text-secondary font-bold " />
      </div>
    </li>
  );
}

export default function CounselorHasCancel() {
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
    if (!data) return;
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
          <div className="overflow-x-auto rounded-2xl bg-gray-200 pb-9 lg:pb-12 px-7">
            <ul className="flex w-[624px] border-b border-gray-400  py-5  text-sm font-bold text-gray-700 lg:w-auto lg:text-center">
              <li className="w-1/5 ">個案姓名</li>
              <li className="w-1/5">諮商議題</li>
              <li className="w-1/5">諮商日期</li>
              <li className="w-1/5">諮商時間</li>
              <li className="w-1/5">個案記錄</li>
            </ul>

            <ul className="w-[588px] space-y-4  pt-5 lg:w-auto  lg:pt-7">
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

