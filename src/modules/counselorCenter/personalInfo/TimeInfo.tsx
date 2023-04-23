/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCounselorTimetableQuery } from '@/common/redux/service/timetableBrowser';
import { IAppointmentTime } from '@/types/interface';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { DatePickerProps, DatePicker, Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { v4 as uuidv4 } from 'uuid';

interface IApiTimetablesHours {
  Time: string;
  Availability: boolean;
}

interface IApiTimetablesWeekData {
  WeekDay: string;
  Hours: IApiTimetablesHours[];
}

interface IApiTimetables {
  StartDate: string;
  EndDate: string;
  WeekData: IApiTimetablesWeekData[];
}

// ==================== 設定時間區段 ====================
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';
const today = dayjs();
const showToday = today.format(dateFormat);
const threeMonthsLater = today.add(3, 'month');
const showThreeMonthsLater = threeMonthsLater.format(dateFormat);

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

export default function TimeInfo() {
  const token = getCookie('auth');
  // ==================== 取得諮商師頁面時間表 API ====================
  const { data = {} as IAppointmentTime, isLoading, refetch } = useGetCounselorTimetableQuery({ token });

  // ==================== 取出資料 ====================
  const [Data, setData] = useState();
  const [WeekData, setWeekData] = useState();
  const [renderData, setRenderData] = useState();
  const [renderWeekData, setRenderWeekData] = useState();

  const [clickId, setClickId] = useState();

  useEffect(() => {
    if (data) {
      setRenderData(data.Data);
      setRenderWeekData(data?.Data?.WeekData);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (renderData && renderWeekData) {
      setData(renderData);
      setWeekData(renderWeekData);
      console.log('renderData:', renderData);
      console.log('renderWeekData:', renderWeekData);
    }
  }, [renderData, renderWeekData]);

  // ==================== Antd 設定時間區段 ====================
  const [selectedDates, setSelectedDates] = useState<RangeValue>(null);
  const disabledDate = (current: Dayjs | null) => {
    if (!current) {
      return false;
    }
    const tooLate = current.isAfter(showThreeMonthsLater, 'day');
    const tooEarly = current.isBefore(showToday, 'day');
    return tooEarly || tooLate;
  };

  const onCalendarChange = (dates: RangeValue) => {
    setSelectedDates(dates);
  };

  return (
    <div className="flex text-center flex-col rounded-lg border bg-gray-200 py-[42px] justify-around px-5 space-y-5">
      <div className="flex flex-row justify-start space-x-5 items-center text-secondary">
        <p>選擇日期</p>
        <RangePicker
          value={selectedDates}
          disabledDate={disabledDate}
          onCalendarChange={onCalendarChange}
          format={dateFormat}
          style={{ padding: '12px 20px', borderRadius: '10px', textAlign: 'center' }}
          placeholder={['開始日期', '結束日期']}
        />
      </div>
      <div className="h-[473px] w-full border bg-white">
        {/* Calendar */}
        <div className=" space-y-5">
          <ul className="hour-scrollbar flex w-full h-[487px] lg:h-[451px]  space-x-1 lg:space-x-2 overflow-auto  text-center">
            {renderWeekData && (
              renderWeekData.map((item: IApiTimetablesWeekData, i: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <li className="relative h-full flex flex-col items-center" key={i}>
                  <div className="space-y-1 bg-white z-40 !sticky !top-0 flex w-[40px] lg:w-[56px]">
                    <div className="justify-center w-[44px] lg:w-[56px] space-y-1 border-b-2 border-b-gray-900 py-3 mb-[10px]">
                      <p className="text-sm lg:text-lg">{item.WeekDay}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-x-0">
                    {item?.Hours.map((hoursItem: IApiTimetablesHours, hoursI) => (
                      <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={hoursI}
                        className="mb-0"
                      >
                        <Button
                          className={`flex justify-center items-center !border-none lg:w-auto w-[38px] lg:text-base text-[10px] mobile-calendar shadow-none my-1 ${
                            hoursItem.Availability
                              ? 'text-gray-900'
                              : 'text-gray-500'
                          }`}
                          disabled={!hoursItem.Availability}
                          style={{ backgroundColor: hoursItem.Availability ? '#ECECEC' : '#FFF' }}
                          onClick={() => { console.log(hoursItem); }}
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
          {/* <div>
            <Button
              htmlType="button"
              className="group text-sm text-gray-900 w-full !rounded-[10px] font-semibold  btnHoverTimeTable"
              disabled={!clickId}
              style={{ border: !clickId ? '1.5px solid #BDBDBD' : 'none' }}
              onClick={handleClick}
            >
              <span className="btnHoverText">立即預約</span>
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
