import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { loadingStatus } from '@/common/redux/feature/loading';
import { IButton } from '@/common/components/IButton';
import { useReservationDataGetQuery } from '@/common/redux/service/userCenter';
import ReservationTimetable from '@/modules/userCenter/ReservationTimetable';
import UserReservationPagination from './UserReservationPagination';

interface IAppointment {
  AppointmentId: number;
  Counselor: string;
  Field: string;
}

type OrderIdMap<T> = {
  [orderId: number]: T[];
};

type ListItem = {
  OrderId: number;
  AppointmentId: number;
  Counselor: string;
  Field: string;
};

// !這個要想辦法元件化
export function Appointment({ appointment }: { appointment: IAppointment }) {
  const { AppointmentId, Counselor, Field } = appointment;

  return (
    <li key={AppointmentId} className="flex items-center rounded-lg bg-white py-4 px-3  lg:py-[18px]">
      <p className="w-[23.5632%] lg:w-[27.615%]">{Counselor}</p>
      <p className="w-[35.6321%] lg:w-[36.82%]">{Field}</p>
      <div className="w-[40.8045%] lg:w-[35.5648%]">
        <IButton text="選擇預約時段" fontSize="text-xs lg:text-sm" px="px-[19px] lg:px-5" py="py-1 lg:py-2" mode="light" />
      </div>
    </li>
  );
}

export default function WaitReservation() {
  const dispatch = useDispatch();
  const token = getCookie('auth');
  const [renderData, setRenderData] = useState<ListItem[][]>([]);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const tab = useSelector((state: { userCenterReservation: { value: string } }) => state.userCenterReservation.value);
  const PageNum = useSelector((state: { userCenterReservationPosition: { value: number } }) => state.userCenterReservationPosition.value);

  const { data = [], isLoading } = useReservationDataGetQuery({ token, tab, PageNum });

  // ==================== 取得資料  ====================
  useEffect(() => {
    if (data.length === 0) return;
    const {
      Data: { List, TotalPageNum },
    } = data;

    const convertRenderData: ListItem[][] = Object.values(
      List.reduce((acc: OrderIdMap<ListItem>, curr: ListItem) => {
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
  }, [isLoading, data]);

  useEffect(() => {
    console.log(renderData);
  }, [renderData]);

  return (
    <div>
      {renderData.length === 0 ? (
        <div className="flex h-[467px] w-full items-center justify-center rounded-2xl bg-gray-200 font-bold text-gray-900 lg:h-[519px]">尚無預約記錄</div>
      ) : (
        <div>
          <div className=" w-full rounded-2xl bg-gray-200 text-center">
            <ul className="flex w-full border-b border-gray-400 py-5 text-sm font-bold text-gray-700">
              <li className="w-[26.8421%] lg:w-[31.6205%]">諮商師</li>
              <li className="w-[31.5789%] lg:w-[29.3478%]">諮商議題</li>
              <li className="w-[41.57894%] lg:w-[39.0316%]">選擇時段</li>
            </ul>
            <ReservationTimetable counselorId={5} />
            <ul className=" mt-5 flex px-4 flex-col space-y-4 pb-9 text-sm text-gray-900 lg:mt-7  lg:space-y-5 lg:px-7 lg:text-base">
              {renderData.map((group: IAppointment[], index: number) => {
                if (index < renderData.length - 1) {
                  return (
                    <ul key={uuidv4()} className="flex flex-col space-y-4 border-b border-dashed border-gray-400 pb-4">
                      {group.map((appointment: IAppointment) => (
                        <Appointment key={uuidv4()} appointment={appointment} />
                      ))}
                    </ul>
                  );
                }
                return (
                  <ul key={uuidv4()} className="flex flex-col space-y-4 pb-4">
                    {group.map((appointment: IAppointment) => (
                      <Appointment key={uuidv4()} appointment={appointment} />
                    ))}
                  </ul>
                );
              })}
            </ul>

          </div>

          {/* 分頁 */}
          <UserReservationPagination totalPageNum={totalPageNum} PageNum={PageNum} />
        </div>
      )}

    </div>
  );
}
