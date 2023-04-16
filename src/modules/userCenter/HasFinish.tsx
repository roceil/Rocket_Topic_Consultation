import { useReservationDataGetQuery } from '@/common/redux/service/userCenter';
import { IButton } from '@/common/components/IButton';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { reservationPageNum } from '@/common/redux/feature/userCenterReservationPosition';
import { loadingStatus } from '@/common/redux/feature/loading';

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

export function Appointment({ appointment }: { appointment: IAppointment }) {
  const { AppointmentId, Counselor, Field } = appointment;

  return (
    <li key={AppointmentId} className="flex items-center rounded-lg bg-white ">
      <div className="w-[45.4022%] pl-5 pt-5 pb-[25px] text-left text-gray-900 lg:w-[25.9414%] lg:p-6">
        <p className="mb-3 font-semibold lg:hidden">{Field}</p>
        <p className="lg:hidden">{` 諮商師｜${Counselor}`}</p>
        <p className="hidden lg:block lg:text-center">{Counselor}</p>
      </div>

      <div className="hidden lg:block lg:w-[17.5732%]">
        <p>{Field}</p>
      </div>

      <div className="flex w-[54.5977%] flex-col items-start py-5 pl-5 lg:w-[56.4853%] lg:flex-row lg:items-center lg:justify-center lg:space-x-10">
        <div className="mb-3 flex space-x-2 lg:mb-0 lg:space-x-5">
          <p>2023 / 03 / 05</p>
          <p>09:00</p>
        </div>
        <IButton text="選擇預約時段" fontSize="text-xs lg:text-sm" px="px-4 lg:px-5" py="py-1 lg:py-2" mode="light" />
      </div>
    </li>
  );
}

export default function WaitReply() {
  const token = getCookie('auth');
  const dispatch = useDispatch();
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [renderData, setRenderData] = useState<ListItem[][]>([]);
  const tab = useSelector((state: { userCenterReservation: { value: string } }) => state.userCenterReservation.value);
  const PageNum = useSelector((state: { userCenterReservationPosition: { value: number } }) => state.userCenterReservationPosition.value);

  const { data = [], isLoading } = useReservationDataGetQuery({ token, tab, PageNum });

  // 取得資料
  useEffect(() => {
    if (data.length === 0) return;
    const {
      Data: { List, TotalPageNum },
    } = data;
    console.log('🚀 ~ file: WaitReply.tsx:71 ~ useEffect ~ data:', data);

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

  return (
    <div>
      {renderData.length === 0 ? (
        <div className="flex h-[467px] w-full items-center justify-center rounded-2xl bg-gray-200 font-bold text-gray-900 lg:h-[519px]">尚無預約記錄</div>
      ) : (
        <div className="">
          <div className=" w-full rounded-2xl bg-gray-200 text-center">
            <ul className="flex w-full border-b border-gray-400 text-sm font-bold text-gray-700">
              <li className="hidden py-5 lg:block lg:w-[29.8418%]">諮商師</li>
              <li className="w-[43.9473%] py-5 lg:w-[11.3636%]">諮商議題</li>
              <li className="w-[56.0526%] py-5 lg:w-[58.7944%]">預約時段</li>
            </ul>

            <ul className="mt-5 flex flex-col space-y-4 px-4 pb-9 text-sm text-gray-900 lg:mt-7 lg:space-y-5 lg:px-7 lg:text-base">
              {renderData.map((group: any) => (
                <ul key={uuidv4()} className="flex flex-col space-y-4 border-b border-dashed border-gray-400 pb-4">
                  {group.map((appointment: { AppointmentId: number; Counselor: string; Field: string }) => (
                    <Appointment key={uuidv4()} appointment={appointment} />
                  ))}
                </ul>
              ))}
            </ul>
          </div>
          <div className="mt-12 flex w-full justify-center ring-1 lg:justify-end">
            <Pagination
              defaultCurrent={PageNum}
              total={totalPageNum * 10}
              onChange={(value) => {
                console.log('頁數', value);
                dispatch(reservationPageNum(value));
              // dispatch(loadingStatus('flex'));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
