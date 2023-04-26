/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCounselorTimetableQuery, useCounselorTimetablePostMutation } from '@/common/redux/service/timetableBrowser';
import { IAppointmentTime } from '@/types/interface';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { DatePicker, Button, Form, Modal } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { v4 as uuidv4 } from 'uuid';
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
const { RangePicker } = DatePicker;

export default function TimeInfo() {
  const token = getCookie('auth');
  // ==================== 取得諮商師頁面時間表 API ====================
  const { data = {} as IAppointmentTime, isLoading, refetch } = useGetCounselorTimetableQuery({ token });

  // ==================== 取出資料 ====================
  const [Data, setData] = useState<IApiTimetables>();
  const [WeekData, setWeekData] = useState();
  const [renderData, setRenderData] = useState<IApiTimetables>();
  const [renderWeekData, setRenderWeekData] = useState();

  useEffect(() => {
    if (data) {
      setRenderData(data.Data);
      setRenderWeekData(data?.Data?.WeekData);
    }
  }, [data, isLoading]);

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

  // ==================== 編輯時段 Modal ====================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  return (
    <div className="flex text-center flex-col rounded-lg border bg-gray-200 py-8 justify-around lg:px-[100px] ">
      {(data?.Data?.Message === '諮商師尚未設定預約時段' || !renderData) && (
        <>
          <p className="text-lg text-gray-900 my-[180px]">諮商師尚未設定預約時段</p>
          <div className="space-x-5 mt-5 lg:relative lg:left-[395px] lg:top-[150px]">
            <Button
              type="primary"
              shape="round"
              htmlType="button"
              onClick={showModal}
              className=" btnHoverDark w-[120px] lg:w-[180px] border-none text-[14px] font-bold text-white shadow-none lg:text-base h-[56px]"
            >
              立即設定
            </Button>
            <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null} className="!p-0 rounded-[10px]  lg:pt-10 lg:pb-11 py-6 userCenter" width="700px">
              <EmptyTimetable />
            </Modal>
          </div>
        </>
      )}

      {renderData && (
      <Form
        form={form}
        className="space-y-[38px]"
      >
        <Form.Item name="range-picker" className="flex flex-row lg:justify-start justify-center text-secondary text-left">
          <div>
            <RangePicker
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
                      編輯
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
