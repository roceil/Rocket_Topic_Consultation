/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useTimetableBrowserGetQuery } from '@/common/redux/service/timetableBrowser';
import { IAppointmentTime, IPagination, IHours } from '@/types/interface';
import { useUserAppointmentPostMutation } from '@/common/redux/service/userCenter';
import CustomAlert from '@/common/helpers/customAlert';

export default function ReservationTimetable({ counselorId, token, AppointmentId, refetch }: { counselorId: number, token:string, AppointmentId:number, refetch:any }) {
  const [modal, alertModal] = Modal.useModal();
  const router = useRouter();
  const [pageNum, setPageNum] = useState(1);
  // ==================== 打包 POST body ====================
  const [clickId, setClickId] = useState();
  const [Year, setYear] = useState();
  const [Month, setMonth] = useState();
  const [Date, setDate] = useState();
  const [Hour, setHour] = useState();
  const AppointmentTimeId = clickId;
  const DateTimeValue = {
    Year,
    Month,
    Day: Date,
    Hour,
  };

  // ==================== 取得諮商師頁面時間表 API ====================
  const { data = {} as IAppointmentTime } = useTimetableBrowserGetQuery({ counselorId, pageNum });

  // ==================== 選擇/變更預約時段 API ====================
  const [userAppointmentPost] = useUserAppointmentPostMutation();

  // ==================== 接初始資料 ====================
  // 接今日全時段
  const [todayData, setTodayData] = useState({});
  // 打包今日全時段
  const [renderToday, setRenderToday] = useState<IPagination | null>(null);
  // 接今日全時段
  const [weekData, setWeekData] = useState([]);
  // 打包本週全時段
  const [renderWeek, setRenderWeek] = useState([]);
  const [checkPageNum, setCheckPageNum] = useState(null);
  const [renderPageNum, setRenderPageNum] = useState(null);
  const [isHidden, setIsHidden] = useState('hidden');

  useEffect(() => {
    if (data && data?.Data) {
      setWeekData(data?.Data?.Pagination);
      setRenderWeek(data?.Data?.Pagination);
      setRenderToday(data?.Data?.Pagination[0]);
      setRenderPageNum(data?.Data?.PageNum);
    }
  }, [data]);

  useEffect(() => {
    if (!renderToday) return;
    setTodayData(renderToday);
    setWeekData(renderWeek);
    setCheckPageNum(renderPageNum);
  }, [renderToday, renderWeek, renderPageNum]);

  // ==================== 月份轉中文 ====================
  const monthDict: { [key: string]: string } = {
    1: '一月',
    2: '二月',
    3: '三月',
    4: '四月',
    5: '五月',
    6: '六月',
    7: '七月',
    8: '八月',
    9: '九月',
    10: '十月',
    11: '十一月',
    12: '十二月',
  };
  const getMonth = renderToday?.Month ?? '';
  const chineseMonth = monthDict[getMonth];

  // ==================== 計算週數 ====================
  const getNextWeek = () => {
    setIsHidden('block');
    if (!renderPageNum) return;
    if (pageNum <= renderPageNum) {
      setTimeout(() => {
        setPageNum((prev) => prev + 1);
        setIsHidden('hidden');
      }, 500);
    }
  };
  const getPreviousWeek = () => {
    if (pageNum > 0) {
      setIsHidden('block');
      setTimeout(() => {
        setPageNum((prev) => prev - 1);
        setIsHidden('hidden');
      }, 500);
    }
  };

  // ==================== 點擊小時取出資料 ====================
  const getAllData = (item:any, hoursItem:any) => {
    if (item && hoursItem) {
      setClickId(hoursItem.AppointmentTimeId);
      setYear(item.Year);
      setMonth(item.Month);
      setDate(item.Date);
      setHour(hoursItem.Time);
    }
  };

  // ==================== 送出預約 ====================
  const handleClick = async () => {
    try {
      setIsHidden('block');
      const response = await userAppointmentPost({
        token,
        AppointmentId,
        AppointmentTimeId,
        DateTimeValue,
      });
      const { Message } = (response as { data: { Message: any } }).data;
      refetch();
      CustomAlert({ modal, Message, type: 'success', contentKeyWord: '關閉' });
      setIsHidden('hidden');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      {/* Loading */}
      <div className={`absolute z-50 h-[550px] lg:h-[520px] w-full bg-white ${isHidden}`}>
        <div className="h-full w-full flex items-center justify-center text-lg"><p className="w-full text-center text-secondary">Loading...</p></div>
      </div>
      {/* Calendar */}
      <div className=" space-y-5">
        <div className=" flex items-start">
          {renderWeek.length === 0
            ? (<div className="px-2 h-7 bg-white mb-3" />) : (<h3 className="px-2 text-base text-gray-900 text-center border-b-gray-900 mb-3">{`${renderToday?.Year} ${chineseMonth}`}</h3>)}
        </div>
        <ul className="hour-scrollbar flex w-full h-[487px] lg:h-[451px]  space-x-1 lg:space-x-2 overflow-auto  text-center">
          {renderWeek.length === 0 ? (
            <div className="absolute z-50 h-[600px] lg:h-[520px] w-full bg-white">
              <div className="h-full w-full flex items-center justify-center text-lg"><p className="w-full text-center text-secondary">尚未新增預約時段</p></div>
            </div>
          ) : (
            renderWeek.map((item: IPagination, i) => (
              <li className="relative h-full" key={`${pageNum}-${i}`}>
                <div className="space-y-1 bg-white z-40 !sticky !top-0 flex w-[40px] lg:w-[56px]">
                  <div className="justify-center w-[44px] lg:w-[56px] space-y-1 border-b-2 border-b-[#424242] py-3 mb-[10px]">
                    <p className="text-sm lg:text-lg">{item.WeekDay}</p>
                    <p className="text-sm lg:text-base">{item.Date}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-x-0">
                  {item?.Hours.map((hoursItem: IHours, hoursI) => (
                    <div
                      key={`${hoursI}${hoursItem.AppointmentTimeId}`}
                      className="mb-0"
                    >
                      <Button
                        className={`flex justify-center items-center border-none lg:w-[52px] w-[38px] lg:text-sm text-[10px] mobile-calendar shadow-none my-1 ${
                          hoursItem.Availability
                            ? 'text-[#424242]'
                            : 'text-[#D0D0D0]'
                        }`}
                        disabled={!hoursItem.Availability}
                        style={{ backgroundColor: hoursItem.Availability ? '#ECECEC' : '#FFF', border: hoursItem.AppointmentTimeId === clickId ? '1px solid #333' : '' }}
                        onClick={() => getAllData(item, hoursItem)}
                      >
                        <span>{hoursItem.Time}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </li>
            ))
          )}
        </ul>

        <div>
          <div className="flex justify-between w-full">
            <Button
              className="group text-sm text-[#424242] w-[48%]  !rounded-[10px]  font-semibold  btnHoverTimeTable"
              onClick={getPreviousWeek}
              disabled={pageNum === 1}
              style={{ border: pageNum === 1 ? '1.5px solid #BDBDBD' : 'none' }}
            >
              <span className="btnHoverText">上一週</span>
            </Button>
            <Button
              className="group text-sm text-[#424242] w-[48%] !rounded-[10px]  font-semibold  btnHoverTimeTable"
              onClick={getNextWeek}
              disabled={pageNum === renderPageNum}
              style={{ border: pageNum === renderPageNum ? '1.5px solid #BDBDBD' : 'none' }}
            >
              <span className="btnHoverText">下一週</span>
            </Button>
          </div>
        </div>
        <div>
          <Button
            htmlType="button"
            className="group text-sm text-[#424242] w-full !rounded-[10px] font-semibold  btnHoverTimeTable"
            disabled={!clickId}
            style={{ border: !clickId ? '1.5px solid #BDBDBD' : 'none' }}
            onClick={handleClick}
          >
            <span className="btnHoverText">立即預約</span>
          </Button>
        </div>
      </div>
      <div className="alert">{alertModal}</div>
    </div>
  );
}
