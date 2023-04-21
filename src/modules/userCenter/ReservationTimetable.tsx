/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useTimetableBrowserGetQuery } from '@/common/redux/service/timetableBrowser';
import { IAppointmentTime, IPagination, IHours } from '@/types/interface';

export default function ReservationTimetable({ counselorId }: { counselorId: number }) {
  const [pageNum, setPageNum] = useState(1);
  const [clickId, setClickId] = useState();
  // ==================== 取得諮商師頁面時間表 API ====================
  const { data = {} as IAppointmentTime } = useTimetableBrowserGetQuery({ counselorId, pageNum });

  // ==================== 選擇/變更預約時段 API ====================

  //   Header 帶個案的 token
  // {
  //     "AppointmentId": 134,
  //     "AppointmentTimeId": 29576,
  //     "DateTimeValue": 
  //     {
  //       "Year" : "2023",
  //       "Month" : "4",
  //       "Day" : "20",
  //       "Hour":"05:00"
  //     }
  // }


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
  // 當 renderToday 變更時，同步更新 todayData
  useEffect(() => {
    if (!renderToday) return; // 為了判斷型別，如果沒資料，出現 null 就 return
    setTodayData(renderToday);
    // console.log('renderToday:', renderToday);
    setWeekData(renderWeek);
    // console.log('renderWeek:', renderWeek);
    setCheckPageNum(renderPageNum);
    // console.log('renderPageNum:', renderPageNum);
  }, [renderToday, renderWeek, renderPageNum]);

  useEffect(() => {
    console.log('New pageNum:', pageNum);
  }, [pageNum]);

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
  const Month = renderToday?.Month ?? '';
  const chineseMonth = monthDict[Month];

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

  return (
    <div className="container  p-0 lg:w-[536px] bg-white rounded-[10px] border-4 lg:pt-10 lg:pb-11 py-6">
      {/* Calender */}
      {/* <div className="absolute z-20 h-[550px] lg:h-[500px] lg:w-[510px] w-[320px]">
        <div className="h-full w-full flex items-center justify-center text-lg bg-white"><p className="w-full">Loading...</p></div>
      </div> */}
      <div className="px-6 space-y-5">
        <div className="lg:w-[480px] flex items-start">
          <h3 className="px-2 text-base text-gray-900 text-center border-b-gray-900 mb-3">{`${renderToday?.Year} ${chineseMonth}`}</h3>
        </div>
        <ul className="ml-2 hour-scrollbar flex w-full h-[487px] lg:h-[451px]  space-x-1 lg:space-x-3 overflow-auto  text-center">
          {renderWeek.map((item: IPagination, i) => (
            <li className="relative" key={`${pageNum}-${i}`}>
              <div className="space-y-1 bg-white z-50 sticky top-0 flex  w-[44px] lg:w-[56px]">
                <div className="justify-center w-[44px] lg:w-[56px] space-y-1 border-b-2 border-b-[#424242] py-3 mb-[10px]">
                  <p className="text-sm lg:text-lg">{item.WeekDay}</p>
                  <p className="text-sm lg:text-base">{item.Date}</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-x-1">
                {item?.Hours.map((hoursItem: IHours, hoursI) => (
                  <div
                    key={`${hoursI}${hoursItem.AppointmentTimeId}`}
                    className="mb-0"
                  >
                    <Button
                      className={`flex justify-center items-center border-none lg:w-[52px] w-[40px] lg:text-sm mobile-calendar shadow-none ${
                        hoursItem.Availability
                          ? 'text-[#424242]'
                          : 'text-[#D0D0D0]'
                      }`}
                      disabled={!hoursItem.Availability}
                      style={{ backgroundColor: hoursItem.Availability ? '#ECECEC' : '#FFF', border: hoursItem.AppointmentTimeId === clickId ? '1px solid #333' : '' }}
                      onClick={() => setClickId(hoursItem.AppointmentTimeId)}
                    >
                      <span>{hoursItem.Time}</span>
                    </Button>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <div>
          <div className="flex justify-between w-full lg:w-[480px]">
            <Button
              className="group text-sm text-[#424242] w-[48%] lg:w-[230px] !rounded-[10px]  font-semibold  btnHoverTimeTable"
              onClick={getPreviousWeek}
              disabled={pageNum === 1}
              style={{ border: pageNum === 1 ? '1.5px solid #BDBDBD' : 'none' }}
            >
              <span className="btnHoverText">上一週</span>
            </Button>
            <Button
              className="group text-sm text-[#424242] w-[48%] lg:w-[230px] !rounded-[10px]  font-semibold  btnHoverTimeTable"
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
            className="group text-sm text-[#424242] w-full !rounded-[10px]  font-semibold  btnHoverTimeTable"
            disabled={!clickId}
            style={{ border: !clickId ? '1.5px solid #BDBDBD' : 'none' }}
            onClick={() => console.log(clickId)}
          >
            <span className="btnHoverText">立即預約</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
