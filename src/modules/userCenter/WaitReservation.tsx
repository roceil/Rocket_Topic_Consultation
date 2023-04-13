/* eslint-disable react/no-array-index-key */
import { IButton } from '@/common/components/IButton';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

interface IWaiteReservationDetail {
  OrderId: number;
  Appointments: {
    AppointmentId: number;
    Counselor: string;
    Field: string;
  }[];
}

export function Appointment({ appointment }: { appointment: IWaiteReservationDetail['Appointments'][0] }) {
  console.log(appointment);
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

  // 取得資料
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/appointmentRecords?status=%E5%BE%85%E9%A0%90%E7%B4%84`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { Data } = res.data;
        const AppoinmentsData = Data.map((item: { Appointments: { appointment: IWaiteReservationDetail['Appointments'][0] } }) => {
          const { Appointments } = item;
          return Appointments;
        });
        setRenderData(AppoinmentsData);
      });
  }, []);

  return (
    <div className=" w-full rounded-2xl bg-gray-200 text-center">
      <ul className="flex w-full border-b border-gray-400 py-5 text-sm font-bold text-gray-700">
        <li className="w-[26.8421%] lg:w-[31.6205%]">諮商師</li>
        <li className="w-[31.5789%] lg:w-[29.3478%]">諮商議題</li>
        <li className="w-[41.57894%] lg:w-[39.0316%]">選擇時段</li>
      </ul>

      <ul className="scrollBAryHidden max-h-[467px] lg:max-h-[613px] overflow-y-scroll mt-5 flex flex-col space-y-4 px-4 pb-9 text-sm text-gray-900 lg:mt-7 lg:space-y-5 lg:px-7 lg:text-base">
        {renderData.map((group: any, groupIndex) => (
          <ul key={groupIndex} className="flex flex-col space-y-4 border-b border-dashed border-gray-400 pb-4">
            {group.map((appointment: { AppointmentId: number; Counselor: string; Field: string }, appointmentIndex: number) => (
              <Appointment key={appointmentIndex} appointment={appointment} />
            ))}
          </ul>
        ))}
      </ul>
    </div>
  );
}
