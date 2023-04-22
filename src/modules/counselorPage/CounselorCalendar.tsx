/* eslint-disable react/no-array-index-key */
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
    <div className="container ">
      <div className="border-y border-secondary py-20 lg:py-14 px-3 relative">
        <h2 className="mb-7 text-center lg:mb-4 lg:text-left lg:text-lg">
          可預約時段
        </h2>
        {/* Calender */}
        <div className={`${isHidden} bg-primary-tint absolute z-20 h-[550px] lg:h-[500px]`}>
          <div className="w-[340px] h-[487px] lg:h-[451px] lg:w-[480px] flex items-center justify-center text-lg"><p>Loading...</p></div>
        </div>
        <div className="space-y-4 flex flex-col items-center">
          <div className="w-[340px] lg:w-[480px] flex items-start">
            {renderWeek.length === 0 ? (<div className="px-2 w-7 bg-primary-tint mb-3" />)
              : (<h3 className="px-2 text-base text-gray-900 text-center border-b-gray-900 mb-3">{`${renderToday?.Year} ${chineseMonth}`}</h3>)}
          </div>
          <ul className="hour-scrollbar flex w-[340px] h-[487px] lg:h-[451px] lg:w-[480px] space-x-1 lg:space-x-3 overflow-auto  text-center">
            {renderWeek.length === 0
              ? (
                <div className="absolute z-50 h-[600px] lg:h-[520px] w-full bg-priamry-tint">
                  <div className="h-full w-full flex items-center justify-center text-lg"><p className="w-full text-center text-secondary">尚未新增預約時段</p></div>
                </div>
              ) : (
                renderWeek.map((item: IPagination, i) => (
                  <li className="relative" key={`${pageNum}-${i}`}>
                    <div className="space-y-1 bg-primary-tint sticky top-0 flex">
                      <div className="justify-center w-[44px] lg:w-[56px] space-y-1 border-b-2 border-b-[#424242] py-3 mb-[10px]">
                        <p className="text-sm lg:text-lg">{item.WeekDay}</p>
                        <p className="text-sm lg:text-base">{item.Date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center space-x-1">
                      {item?.Hours.map((hoursItem: IHours, hoursI) => (
                        <input
                          type="button"
                          value={hoursItem.Time}
                          key={`${hoursI}${hoursItem.AppointmentTimeId}`}
                          className={`my-[5px] lg:w-[52px] w-[40px] lg:text-sm mobile-calendar ${
                            hoursItem.Availability
                              ? 'text-[#424242]'
                              : 'text-[#D0D0D0]'
                          }`}
                        />
                      ))}
                    </div>
                  </li>
                )))}
          </ul>
          {renderWeek.length === 0
            ?? (
            <div className="flex justify-between w-[332px] lg:w-[480px] ">
              <Button
                className="group text-sm text-[#424242] w-[160px] lg:w-[230px] !rounded-[10px]  font-semibold  btnHoverTimeTable"
                onClick={getPreviousWeek}
                disabled={pageNum === 1}
                style={{ border: pageNum === 1 ? '1.5px solid #BDBDBD' : 'none' }}
              >
                <span className="btnHoverText">上一週</span>
              </Button>
              <Button
                className="group text-sm text-[#424242] w-[160px] lg:w-[230px] !rounded-[10px]  font-semibold  btnHoverTimeTable"
                onClick={getNextWeek}
                disabled={pageNum === renderPageNum}
                style={{ border: pageNum === renderPageNum ? '1.5px solid #BDBDBD' : 'none' }}
              >
                <span className="btnHoverText">下一週</span>
              </Button>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}
