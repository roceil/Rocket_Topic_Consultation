import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { IButton } from '@/common/components/IButton';
import { useReservationDataGetQuery } from '@/common/redux/service/userCenter';

interface IWaiteReservationDetail {
  OrderId: number;
  Appointments: {
    AppointmentId: number;
    Counselor: string;
    Field: string;
  }[];
}

// !這個要想辦法元件化
export function Appointment({ appointment }: { appointment: IWaiteReservationDetail['Appointments'][0] }) {
  const { AppointmentId, Counselor, Field } = appointment;

  return (
    <li key={AppointmentId} className="flex items-center rounded-lg bg-white py-3 lg:py-[18px]">
      <p className="w-[23.5632%] lg:w-[27.615%]">{Counselor}</p>
      <p className="w-[35.6321%] lg:w-[36.82%]">{Field}</p>
      <div className="w-[40.8045%] lg:w-[35.5648%]">
        <IButton text="選擇預約時段" fontSize="text-xs lg:text-sm" px="px-[19px] lg:px-5" py="py-1 lg:py-2" mode="light" />
      </div>
    </li>
  );
}

export default function WaitReservation() {
  const token = getCookie('auth');
  const [renderData, setRenderData] = useState<IWaiteReservationDetail[]>([]);
  const tab = useSelector((state: { userCenterReservation: { value: string } }) => state.userCenterReservation.value);
  const { data = [], isLoading } = useReservationDataGetQuery({ token, tab });

  // 取得資料
  useEffect(() => {
    const { Data = [] } = data;
    const AppoinmentsData = Data.map((item: { Appointments: { appointment: IWaiteReservationDetail['Appointments'][0] } }) => {
      const { Appointments } = item;
      return Appointments;
    });
    setRenderData(AppoinmentsData);
  }, [isLoading]);

  return (
    <div className=" w-full rounded-2xl bg-gray-200 text-center">
      <ul className="flex w-full border-b border-gray-400 py-5 text-sm font-bold text-gray-700">
        <li className="w-[26.8421%] lg:w-[31.6205%]">諮商師</li>
        <li className="w-[31.5789%] lg:w-[29.3478%]">諮商議題</li>
        <li className="w-[41.57894%] lg:w-[39.0316%]">選擇時段</li>
      </ul>

      <ul className="scrollBAryHidden mt-5 flex max-h-[467px] flex-col space-y-4 overflow-y-scroll px-4 pb-9 text-sm text-gray-900 lg:mt-7 lg:max-h-[613px] lg:space-y-5 lg:px-7 lg:text-base">
        {renderData.map((group: any, index) => {
          if (group.length === 0) {
            return (
              <div key={uuidv4()} className="flex h-full w-full items-center justify-center">
                <p className="text-gray-400">目前沒有資料</p>
              </div>
            );
          }
          if (index < renderData.length - 1) {
            return (
              <ul key={uuidv4()} className="flex flex-col space-y-4 border-b border-dashed border-gray-400 pb-4">
                {group.map((appointment: { AppointmentId: number; Counselor: string; Field: string }) => (
                  <Appointment key={uuidv4()} appointment={appointment} />
                ))}
              </ul>
            );
          }
          return (
            <ul key={uuidv4()} className="flex flex-col space-y-4 pb-4">
              {group.map((appointment: { AppointmentId: number; Counselor: string; Field: string }) => (
                <Appointment key={uuidv4()} appointment={appointment} />
              ))}
            </ul>
          );
        })}
      </ul>
    </div>
  );
}
