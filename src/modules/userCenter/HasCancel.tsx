import { useReservationDataGetQuery } from '@/common/redux/service/userCenter';
import { v4 as uuidv4 } from 'uuid';
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadingStatus } from '@/common/redux/feature/loading';
import dayjs from 'dayjs';
import { IAppointment, ListItem } from '@/types/interface';
import { formatAppointments } from '@/common/helpers/groupRenderData';
import UserReservationPagination from './UserReservationPagination';

export function Appointment({ appointment }: { appointment: IAppointment }) {
  const { AppointmentId, Counselor, Field, Time } = appointment;
  const convertTime = dayjs(Time).format('HH:mm');
  const convertDate = dayjs(Time).format('YYYY / MM / DD');

  return (
    <li key={AppointmentId} className="flex  rounded-lg bg-white lg:py-6">
      <div className="w-[44.2528%] py-[18px] pl-5 text-left text-gray-900 lg:w-[22.1757%] lg:p-0 lg:text-center">
        <p className="mb-3 font-semibold lg:hidden">{Field}</p>
        <p className="lg:hidden">{`諮商師｜${Counselor}`}</p>
        <p className="hidden lg:block lg:pl-[104px] lg:text-left">{Counselor}</p>
      </div>

      <div className="hidden lg:block lg:w-[28.4518%]">
        <p>{Field}</p>
      </div>

      <div className="hidden lg:block lg:w-[23.3263%]">
        <p>{convertDate}</p>
      </div>

      <div className="hidden lg:block lg:w-[26.046%]">
        <p>{convertTime}</p>
      </div>
      <div className="flex w-[55.7471%] flex-col items-start justify-start pt-4 pl-8 lg:hidden">
        <div className="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:space-x-2">
          <p>{convertDate}</p>
          <p>{convertTime}</p>
        </div>
      </div>
    </li>
  );
}

export default function HasCancel() {
  const token = getCookie('auth');
  const dispatch = useDispatch();
  const tab = useSelector((state: { userCenterReservation: { value: string } }) => state.userCenterReservation.value);
  const PageNum = useSelector((state: { userCenterReservationPosition: { value: number } }) => state.userCenterReservationPosition.value);

  const [totalPageNum, setTotalPageNum] = useState(0);
  const [renderData, setRenderData] = useState<ListItem[][]>([]);

  const { data = [], isLoading } = useReservationDataGetQuery({ token, tab, PageNum });

  // 取得資料
  useEffect(() => {
    dispatch(loadingStatus('none'));
    if (data.length === 0) return;

    const {
      Data: { List, TotalPageNum },
    } = data;

    const formattedAppointments = formatAppointments(List);
    setRenderData(formattedAppointments);
    setTotalPageNum(TotalPageNum);
  }, [isLoading, data]);

  return (
    <div>
      {renderData[0]?.length === 0 ? (
        <div className="flex h-[467px] w-full items-center justify-center rounded-2xl bg-gray-200 font-bold text-gray-900 lg:h-[519px]">尚無取消記錄</div>
      ) : (
        <div className="">
          <div className=" w-full rounded-2xl bg-gray-200 text-center">
            <ul className="flex w-full border-b border-gray-400 py-5 text-left text-sm font-bold text-gray-700">
              <li className="hidden lg:block lg:w-1/4 lg:pl-[134px]">諮商師</li>
              <li className="w-1/2 pl-[59px] lg:w-1/4 lg:pl-[93px]">諮商議題</li>
              <li className="hidden lg:block lg:w-1/4 lg:pl-[87px]">預約日期</li>
              <li className="hidden lg:block lg:w-1/4 lg:pl-[70px]">預約時間</li>
              <li className="w-1/2 pl-[48px] lg:hidden ">預約詳情</li>
            </ul>

            <ul className="mt-5 flex flex-col space-y-4 px-4 pb-9 text-sm text-gray-900 lg:mt-7 lg:space-y-5 lg:px-7 lg:text-base">
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

