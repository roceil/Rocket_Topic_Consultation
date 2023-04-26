/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCounselorTimetableQuery, useCounselorTimetablePostMutation } from '@/common/redux/service/timetableBrowser';
import { IAppointmentTime } from '@/types/interface';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { DatePicker, Button, Checkbox, Form, Modal } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { v4 as uuidv4 } from 'uuid';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import EmptyTimetable from './EmptyTimetable';

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

  // ==================== 新增/修改預約時段 API ====================
  const [CounselorTimetablePost] = useCounselorTimetablePostMutation();
  const StartDate = '2023/4/24';
  const EndDate = '2023/4/30';
  const PostWeekData = [1, 2, 3];
  const handlePost = () => {
    CounselorTimetablePost({
      token,
      StartDate,
      EndDate,
      WeekData: PostWeekData,
    });
  };

  // ==================== 取出資料 ====================
  const [Data, setData] = useState<IApiTimetables>();
  const [WeekData, setWeekData] = useState();
  const [renderData, setRenderData] = useState<IApiTimetables>();
  const [renderWeekData, setRenderWeekData] = useState();

  // 打包 POST 資料
  const [DefaultAvail, setDefaultAvail] = useState();

  const [clickId, setClickId] = useState();

  useEffect(() => {
    if (data) {
      setRenderData(data.Data);
      setRenderWeekData(data?.Data?.WeekData);
    }
  }, [isLoading]);

  const [renderStartDate, setRenderStartDate] = useState<string>('');
  const [renderEndDate, setRenderEndDate] = useState<string>('');

  useEffect(() => {
    if (renderData && renderWeekData) {
      setData(renderData);
      setWeekData(renderWeekData);
      // console.log('renderData:', renderData);
      console.log('renderWeekData:', renderWeekData);
      // 轉換 StartDate 格式
      const formattedStartDate = dayjs(renderData.StartDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
      // 轉換 EndDate 格式
      const formattedEndDate = dayjs(renderData.EndDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
      setRenderStartDate(renderData.StartDate);
      setRenderEndDate(renderData.EndDate);
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

  // ==================== 編輯時段 Modal ====================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ==================== Antd 表單 ====================
  // const onFinish = (fieldsValue: any) => {
  //   // Should format date value before submit.
  //   console.log(fieldsValue);
  //   const rangeValue = fieldsValue['range-picker'];
  //   if (rangeValue && rangeValue.length > 0) {
  //     const formattedRangeValue = [
  //       rangeValue[0]?.format('YYYY-MM-DD'),
  //       rangeValue[1]?.format('YYYY-MM-DD'),
  //     ];
  //     const values = {
  //       ...fieldsValue,
  //       'range-picker': formattedRangeValue,
  //     };
  //     console.log('Received values of form: ', values);
  //   }
  // };

  const [form] = Form.useForm();

  // ==================== Antd Checkbox ====================
  const [checkboxValues, setCheckboxValues] = useState({});

  const onChange = (e: any) => {
    const { name, checked } = e.target;
    setCheckboxValues((prevState) => ({ ...prevState, [name]: checked }));
  };
  // const onChange = (e: CheckboxChangeEvent) => {
  //   console.log(`checked = ${e.target.checked}`);
  //   setDefaultAvail(e.target.checked);
  // };

  // ==================== Antd 表單 ====================
  // const onFinish = (fieldsValue: any) => {
  //   // Should format date value before submit.
  //   console.log(fieldsValue);
  //   const rangeValue = fieldsValue['range-picker'];
  //   if (rangeValue && rangeValue.length > 0) {
  //     const formattedRangeValue = [
  //       rangeValue[0]?.format('YYYY-MM-DD'),
  //       rangeValue[1]?.format('YYYY-MM-DD'),
  //     ];
  //     const values = {
  //       ...fieldsValue,
  //       'range-picker': formattedRangeValue,
  //     };
  //     console.log('Received values of form: ', values);
  //   }
  // };
  const onFinish = (values: any) => {
    console.log('checkboxValues:', checkboxValues);
  };

  // 開啟編輯功能
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const isHidden = isDisabled
    ? '!opacity-0 transform duration-300'
    : '!opacity-100 transform duration-300';

  return (
    <div className="flex text-center flex-col rounded-lg border bg-gray-200 py-8 justify-around lg:px-[100px] ">

      {(renderData && renderData.length === 0) && <EmptyTimetable />}
      {renderData && (
      <Form
        form={form}
        onFinish={onFinish}
        className="space-y-[38px]"
      >
        <Form.Item name="range-picker" className="flex flex-row lg:justify-start justify-center text-secondary text-left">
          <div>
            <RangePicker
              value={selectedDates}
              disabled
              format={dateFormat}
              style={{ padding: '12px 20px', borderRadius: '10px', textAlign: 'center' }}
              placeholder={[renderStartDate, renderEndDate]}
            />
          </div>
        </Form.Item>
        <Form.Item name="Hours">
          <div className="h-[473px] w-full border">
            <div className="space-y-5">
              <ul className="flex justify-center lg:justify-start hour-scrollbar flex w-full h-[487px] lg:h-[451px]  space-x-1 lg:space-x-8 overflow-auto  text-center">
                {renderWeekData && (
                  renderWeekData.map((item: IApiTimetablesWeekData) => (
                    <li className="relative h-full lg:w-[56] max-w-12 flex flex-col items-center" key={uuidv4()}>
                      <div className="space-y-1 bg-gray-200 z-40 !sticky !top-0 flex w-full">
                        <div className="m-auto justify-center w-full lg:w-[56px] space-y-1 border-b-2 border-b-gray-900 py-3 mb-[10px]">
                          <p className="text-sm lg:text-lg text-gray-900">{item.WeekDay}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-x-0">
                        <div className="space-y-3">
                          {item?.Hours.map((hoursItem: IApiTimetablesHours) => (
                            <div
                              key={uuidv4()}
                              className="mb-0"
                            >
                              <input
                                type="button"
                                value={hoursItem.Time}
                                className={`flex justify-center items-center !border-none lg:w-auto w-[38px] lg:!text-base !text-[10px] mobile-calendar shadow-none my-1 ${
                                  hoursItem.DefaultAvail
                                    ? 'text-gray-900'
                                    : 'text-gray-500'
                                }`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              <div>
                <div className="flex justify-end lg:mt-20 relative">
                  <div className="space-x-5 mt-5 lg:relative lg:left-[100px] lg:top-2">
                    <Button
                      type="primary"
                      shape="round"
                      htmlType="button"
                      onClick={showModal}
                      className=" btnHoverDark w-[120px] lg:w-[180px] border-none text-[14px] font-bold text-white shadow-none lg:text-base h-[56px]"
                    >
                      {isDisabled ? '編輯' : '取消編輯'}
                    </Button>
                    <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null} className="!p-0 rounded-[10px]  lg:pt-10 lg:pb-11 py-6 userCenter" width="700px">
                      <EmptyTimetable />
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form.Item>
      </Form>
      )}
    </div>
  );
}
