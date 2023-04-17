import { useReservationDataGetQuery, useReservationRateGetQuery } from '@/common/redux/service/userCenter';
import { v4 as uuidv4 } from 'uuid';
import { getCookie } from 'cookies-next';
import { IButton } from '@/common/components/IButton';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadingStatus } from '@/common/redux/feature/loading';
import dayjs from 'dayjs';
import { IAppointment, ListItem, OrderIdMap } from '@/types/interface';
import UserReservationPagination from './UserReservationPagination';
import RateModal from './RateModal';

export function Appointment({ appointment }: { appointment: IAppointment }) {
  const { AppointmentId, Counselor, Field, Time } = appointment;
  const token = getCookie('auth');
  const convertTime = dayjs(Time).format('HH:mm');
  const convertDate = dayjs(Time).format('YYYY / MM / DD');
  const { data, isLoading } = useReservationRateGetQuery({ token, AppointmentId });

  const [comment, setComment] = useState('');
  const [rateLevel, setRateLevel] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ==================== 評價 modal 開關 ====================
  const showModal = () => {
    setIsModalOpen(true);
  };

  // ==================== 資料回來後傳給RateModal ====================
  useEffect(() => {
    if (isLoading) return;
    const { Comment, Star } = data.Data;
    setRateLevel(Star);
    setComment(Comment);
  }, [data, isLoading]);

  return (
    <li key={AppointmentId} className="flex items-center rounded-lg bg-white lg:py-6">
      <div className="w-[44.8275%] pl-[24px] pt-5 pb-[25px] text-left lg:w-1/5 lg:p-0 lg:text-center">
        <p className="mb-3 font-semibold lg:hidden">{Field}</p>
        <p className="lg:hidden">{`諮商師｜${Counselor}`}</p>
        <p className="hidden lg:block">{Counselor}</p>
      </div>

      <div className="hidden lg:block lg:w-1/5">
        <p>{Field}</p>
      </div>

      <div className="hidden lg:block lg:w-1/5">
        <p>{convertDate}</p>
      </div>

      <div className="hidden lg:block lg:w-1/5">
        <p>{convertTime}</p>
      </div>

      <div className="hidden lg:block lg:w-1/5">
        <IButton text="完成訂單" fontSize="text-sm" px="lg:px-5" py="lg:py-2" mode="light" onClick={showModal} />
      </div>

      {/* 手機版內容 */}
      <div className="flex w-[55.1724%] flex-col items-start py-5 px-3 sm:px-6 lg:hidden">
        <div className="mb-3 flex space-x-2">
          <p>{convertDate}</p>
          <p>{convertTime}</p>
        </div>
        <IButton text="完成訂單" fontSize="text-xs" px="px-3" py="py-1" mode="light" extraStyle="w-full" onClick={showModal} />
      </div>

      <RateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} comment={comment} AppointmentId={AppointmentId} rate={rateLevel} setRateLevel={setRateLevel} setComment={setComment} />
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
        <div>
          <div className=" w-full rounded-2xl bg-gray-200 px-4 text-center lg:px-7">
            {/* 標題 */}
            <ul className="flex w-full border-b border-gray-400 py-5 text-center text-sm font-bold text-gray-700 lg:items-center">
              <li className="hidden lg:block lg:w-1/5 ">諮商師</li>
              <li className="w-1/2  lg:w-1/5 ">諮商議題</li>
              <li className="hidden lg:block lg:w-1/5">預約日期</li>
              <li className="hidden lg:block lg:w-1/5">預約時間</li>
              <li className="hidden lg:block lg:w-1/5">完成訂單</li>
              <li className="w-1/2 lg:hidden">預約詳情</li>
            </ul>

            {/* 內容 */}
            <ul className="mt-5 flex flex-col space-y-4 pb-9 text-sm text-gray-900 lg:mt-7 lg:text-base">
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
