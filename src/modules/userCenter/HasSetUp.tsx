import { useReservationDataGetQuery } from '@/common/redux/service/userCenter';
import { v4 as uuidv4 } from 'uuid';
import { getCookie } from 'cookies-next';
import { IButton } from '@/common/components/IButton';
import { useEffect, useState } from 'react';
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
    <li key={AppointmentId} className="flex items-center rounded-lg bg-white lg:py-6">
      <div className="w-[44.8275%] pl-[24px] pt-5 pb-[25px] text-left lg:w-[12.6569%] lg:p-0 lg:text-center">
        <p className="mb-3 font-semibold lg:hidden">{Field}</p>
        <p className="lg:hidden">{`諮商師｜${Counselor}`}</p>
        <p className="hidden lg:block">{Counselor}</p>
      </div>

      <div className="hidden lg:block lg:w-[15.0627%]">
        <p>{Field}</p>
      </div>

      <div className="hidden lg:block lg:w-[19.1422%]">
        <p>2023 / 03 / 05</p>
      </div>

      <div className="hidden lg:block lg:w-[12.6569%]">
        <p>09:00</p>
      </div>

      <div className="hidden lg:block lg:w-[18.41%]">
        <IButton text="完成訂單" fontSize="text-sm" px="lg:px-5" py="lg:py-2" mode="light" />
      </div>

      <div className="hidden lg:block lg:w-[22.0711%]">
        <IButton text="撰寫 / 編輯評價" fontSize="text-sm" px="lg:px-5" py="lg:py-2" mode="light" />
      </div>

      <div className="flex w-[55.1724%] flex-col items-start py-5 pl-[24px] lg:hidden">
        <div className="mb-3 flex space-x-2">
          <p>2023 / 03 / 05</p>
          <p>09:00</p>
        </div>
        <div className="flex space-x-2">
          <IButton text="完成訂單" fontSize="text-xs" px="px-3" py="py-1" mode="light" />
          <IButton text="評價" fontSize="text-xs" px="px-3" py="py-1" mode="light" />
        </div>
      </div>
    </li>
  );
}

export default function HasSetUp() {
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
        <div className="flex h-[467px] w-full items-center justify-center rounded-2xl bg-gray-200 font-bold text-gray-900 lg:h-[519px]">尚無訂單記錄</div>
      ) : (
        <div className="">
          <div className=" w-full rounded-2xl bg-gray-200 text-center">
            {/* 標題 */}
            <ul className="flex w-full border-b border-gray-400 py-5 text-left text-sm font-bold text-gray-700 lg:items-center lg:text-center">
              <li className="hidden lg:block lg:w-[12.6482%] lg:pl-[63px] lg:text-left">諮商師</li>
              <li className="w-1/2 pl-[59px] lg:w-[18.4782%] lg:pl-0">諮商議題</li>
              <li className="hidden lg:block lg:w-[13.7351%]">預約日期</li>
              <li className="hidden lg:block lg:w-[16.3043%]">預約時間</li>
              <li className="hidden lg:block lg:w-[13.1422%]">完成訂單</li>
              <li className="hidden lg:block lg:w-[25.6916%]">評價</li>
              <li className="w-1/2 pl-[48px] lg:hidden">預約詳情</li>
            </ul>

            {/* 內容 */}
            <ul className="mt-5 flex flex-col space-y-4 px-4 pb-9 text-sm text-gray-900 lg:mt-7 lg:px-7 lg:text-base">
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

