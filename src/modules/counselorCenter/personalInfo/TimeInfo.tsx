/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCounselorTimetableQuery } from '@/common/redux/service/timetableBrowser';
import { IAppointmentTime } from '@/types/interface';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { DatePicker, Button, Checkbox, Form } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { v4 as uuidv4 } from 'uuid';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface IApiTimetablesHours {
  Time: string;
  DefaultAvail: boolean;
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

  // 打包 POST 資料
  const [DefaultAvail, setDefaultAvail] = useState();

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

  useEffect(() => {
    console.log(DefaultAvail);
  }, [DefaultAvail]);

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

  // ==================== Antd 表單 ====================
  // const onFinish = (fieldsValue: any) => {
  //   const rangeValue = fieldsValue['range-picker'];
  //   console.log(123);
  //   if (rangeValue && rangeValue.length > 0) {
  //     const values = {
  //       ...fieldsValue,
  //       'range-picker': [rangeValue[0]?.format('YYYY-MM-DD'), rangeValue[1]?.format('YYYY-MM-DD')],
  //     };
  //     console.log('Received values of form: ', values);
  //   }
  //   console.log('Received values of form: ', rangeValue);
  // };

  const onFinish = (fieldsValue: any) => {
    // Should format date value before submit.
    console.log(fieldsValue);
    const rangeValue = fieldsValue['range-picker'];
    if (rangeValue && rangeValue.length > 0) {
      const values = {
        ...fieldsValue,
        'range-picker': [rangeValue[0]?.format('YYYY-MM-DD'), rangeValue[1]?.format('YYYY-MM-DD')],
      };
      console.log('Received values of form: ', values);
    }
  };

  const [form] = Form.useForm();

  // ==================== Antd Checkbox ====================
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    setDefaultAvail(e.target.checked);
  };

  // 開啟編輯功能
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const isHidden = isDisabled
    ? '!opacity-0 transform duration-300'
    : '!opacity-100 transform duration-300';

  return (
    <div className="flex text-center flex-col rounded-lg border bg-gray-200 py-[42px] justify-around px-5 space-y-5">
      <Form
        form={form}
        onFinish={onFinish}
      >
        <Form.Item name="range-picker" className="flex flex-row text-secondary text-left">
          <div>
            <p>選擇日期</p>
            <RangePicker
              value={selectedDates}
              disabledDate={disabledDate}
              onCalendarChange={onCalendarChange}
              format={dateFormat}
              style={{ padding: '12px 20px', borderRadius: '10px', textAlign: 'center' }}
              placeholder={[showToday, '結束日期']}
            />
          </div>
        </Form.Item>
        <Form.Item name="Hours">
          <div className="h-[473px] w-full border bg-white">
            {/* Calendar */}
            <div className=" space-y-5">
              <ul className="hour-scrollbar flex w-full h-[487px] lg:h-[451px]  space-x-1 lg:space-x-2 overflow-auto  text-center">
                {renderWeekData && (
                  renderWeekData.map((item: IApiTimetablesWeekData) => (
                    <li className="relative h-full flex flex-col items-center" key={uuidv4()}>
                      <div className="space-y-1 bg-white z-40 !sticky !top-0 flex w-[40px] lg:w-[56px]">
                        <div className="justify-center w-[44px] lg:w-[56px] space-y-1 border-b-2 border-b-gray-900 py-3 mb-[10px]">
                          <p className="text-sm lg:text-lg">{item.WeekDay}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-x-0">
                        <div>
                          {item?.Hours.map((hoursItem: IApiTimetablesHours) => (
                            <Form.Item name={`${item.WeekDay}${hoursItem.Time}`}>
                              <div
                                key={uuidv4()}
                                className="mb-0"
                              >
                                <Checkbox
                                  onChange={onChange}
                                  className={`flex justify-center items-center !border-none lg:w-auto w-[38px] lg:text-base text-[10px] mobile-calendar shadow-none my-1 ${
                                    hoursItem.DefaultAvail
                                      ? 'text-gray-900'
                                      : 'text-gray-500'
                                  }`}
                                  style={{ backgroundColor: !hoursItem.DefaultAvail ? '#ECECEC' : '#FFF' }}
                                  onClick={() => { console.log(hoursItem); }}
                                >
                                  <span>{hoursItem.Time}</span>
                                </Checkbox>
                              </div>
                            </Form.Item>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              <div>
                <Form.Item>
                  <div className="flex justify-end">
                    <div className="space-x-5 mt-5">
                      <Button
                        type="primary"
                        shape="round"
                        htmlType="submit"
                        className={`btnHoverDark w-[120px] lg:w-[180px] border-none text-[14px] font-bold text-white shadow-none lg:text-base h-[56px] ${isHidden}`}
                        onClick={() => setIsDisabled(true)}
                      >
                        儲存
                      </Button>
                      <Button
                        type="primary"
                        shape="round"
                        htmlType="button"
                        onClick={() => setIsDisabled(false)}
                        className=" btnHoverDark w-[120px] lg:w-[180px] border-none text-[14px] font-bold text-white shadow-none lg:text-base h-[56px]"
                      >
                        {isDisabled ? '編輯' : '取消編輯'}
                      </Button>
                    </div>
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form.Item>

      </Form>
    </div>
  );
}
