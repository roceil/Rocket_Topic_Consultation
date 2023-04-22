import { useReservationDataGetQuery } from '@/common/redux/service/userCenter';
import { IButton } from '@/common/components/IButton';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { loadingStatus } from '@/common/redux/feature/loading';
import { IAppointment, ListItem, OrderIdMap } from '@/types/interface';
import { Modal } from 'antd';
import dayjs from 'dayjs';
import UserReservationPagination from './UserReservationPagination';
import ReservationTimetable from './ReservationTimetable';

export function Appointment({ appointment, token, refetch }: { appointment: IAppointment, token:string, refetch:any }) {
  const { AppointmentId, Counselor, Field, Time, CounselorId } = appointment;
  const convertTime = dayjs(Time).format('HH:mm');
  const convertDate = dayjs(Time).format('YYYY / MM / DD');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
          <p>{convertDate}</p>
          <p>{convertTime}</p>
        </div>
        <IButton text="更改預約時段" fontSize="text-xs lg:text-sm" px="px-4 lg:px-5" py="py-1 lg:py-2" mode="light" onClick={showModal} />
        <Modal open={isModalOpen} onCancel={handleCancel} footer={null} className="!p-0 lg:w-[550px] bg-white rounded-[10px] border-4 lg:pt-10 lg:pb-11 py-6 userCenter">
          <ReservationTimetable counselorId={CounselorId} token={token} AppointmentId={AppointmentId} refetch={refetch} />
        </Modal>
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

  const { data = [], isLoading, refetch } = useReservationDataGetQuery({ token, tab, PageNum });

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
              {typeof token === 'string'
                && renderData.map((group: IAppointment[], index: number) => {
                  if (index < renderData.length - 1) {
                    return (
                      <ul key={uuidv4()} className="flex flex-col space-y-4 border-b border-dashed border-gray-400 pb-4">
                        {group.map((appointment: IAppointment) => (
                          <Appointment key={uuidv4()} appointment={appointment} token={token} refetch={refetch} />
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <ul key={uuidv4()} className="flex flex-col space-y-4 pb-4">
                      {group.map((appointment: IAppointment) => (
                        <Appointment key={uuidv4()} appointment={appointment} token={token} refetch={refetch} />
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
