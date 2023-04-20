/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useTimetableBrowserGetQuery } from '@/common/redux/service/timetableBrowser';
import { IAppointmentTime, IPagination, IHours } from '@/types/interface';

export default function CounselorCalendar({ counselorId }: { counselorId: number }) {
  const [pageNum, setPageNum] = useState(1);
  // ==================== 取得諮商師頁面時間表 API ====================
  const { data = {} as IAppointmentTime } = useTimetableBrowserGetQuery({ counselorId, pageNum });

  // ==================== 接初始資料 ====================
  // 接今日全時段
  const [todayData, setTodayData] = useState({});
  // 打包今日全時段
  const [renderToday, setRenderToday] = useState<IPagination | null>(null);
  // 接今日全時段
  const [weekData, setWeekData] = useState([]);
  // 打包本週全時段
  const [renderWeek, setRenderWeek] = useState([]);

  useEffect(() => {
    if (data && data?.Data) {
      setWeekData(data?.Data?.Pagination);
      setRenderWeek(data?.Data?.Pagination);
      setRenderToday(data?.Data?.Pagination[0]);
    }
  }, [data]);
  // 當 renderToday 變更時，同步更新 todayData
  useEffect(() => {
    if (!renderToday) return; // 為了判斷型別，如果沒資料，出現 null 就 return
    setTodayData(renderToday);
    console.log('renderToday:', renderToday);
    setWeekData(renderWeek);
    console.log('renderWeek:', renderWeek);
  }, [renderToday, renderWeek]);

  useEffect(() => {
    console.log('pageNum:', pageNum);
  }, [pageNum]);

  // ==================== renderWeek 載入時預設 ====================
  if (renderWeek.length === 0) {
    return <div className="w-[340px] h-[487px] lg:h-[451px] lg:w-[480px] bg-primary-tint flex items-center justify-center text-lg"><p>Loading...</p></div>;
  }

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

  // 點擊按鈕時，取得下週所有時段
  const getNextWeek = () => {
    setPageNum((prev) => prev + 1);
  };

  // 點擊按鈕時，取得上週所有時段
  const getPreviousWeek = () => {
    if (pageNum > 0) {
      setPageNum((prev) => prev - 1);
    }
  };

  return (
    <div className="container ">
      <div className="border-y border-secondary py-20 lg:py-14 px-3">
        <h2 className="mb-7 text-center lg:mb-4 lg:text-left lg:text-lg">
          可預約時段
        </h2>
        {/* Calender */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="w-[340px] lg:w-[480px] flex items-start">
            <h3 className="px-2 text-base text-gray-900 text-center border-b-gray-900 mb-3">{`${renderToday?.Year} ${chineseMonth}`}</h3>
          </div>
          <ul className="hour-scrollbar flex w-[340px] h-[487px] lg:h-[451px] lg:w-[480px] space-x-1 lg:space-x-3 overflow-auto  text-center">
            {renderWeek.map((item: IPagination, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li className="relative" key={i}>
                <div className="space-y-1 bg-primary-tint sticky top-0 flex">
                  <div className="justify-center w-[44px] lg:w-[56px] space-y-1 border-b-2 border-b-[#424242] py-3 mb-[10px]">
                    <p className="text-sm lg:text-lg">{item.WeekDay}</p>
                    <p className="text-sm lg:text-base">{item.Date}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-x-1">
                  {item?.Hours.map((hoursItem: IHours) => (
                    <input
                      type="button"
                      value={hoursItem.Time}
                      key={hoursItem.AppointmentTimeId}
                      className={`my-[5px] lg:w-[52px] w-[40px] lg:text-sm mobile-calendar ${
                        hoursItem.Availability
                          ? 'text-[#424242]'
                          : 'text-[#D0D0D0]'
                      }`}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between w-[332px] lg:w-[480px] ">
            <Button
              className="text-sm text-[#424242] w-[160px] lg:w-[230px] rounded-[10px] border-[1.5px] border-[#424242] font-semibold"
              onClick={getPreviousWeek}
            >
              上一週
            </Button>
            <Button
              className="text-sm text-[#424242] w-[160px] lg:w-[230px] rounded-[10px] border-[1.5px] border-[#424242] font-semibold"
              onClick={getNextWeek}
            >
              下一週
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
