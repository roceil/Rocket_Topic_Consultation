/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCounselorTimetableQuery, useCounselorTimetablePostMutation } from '@/common/redux/service/timetableBrowser';
import { emptyTimetableData } from '@/lib/counselorCenter/emptyTimetableData';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { DatePicker, Button, Checkbox, Form, Modal } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { v4 as uuidv4 } from 'uuid';
import CustomAlert from '@/common/helpers/customAlert';
import { LoadingOutlined } from '@ant-design/icons';
import { IApiTimetablesHours } from '@/types/interface';

// ==================== 設定時間區段 ====================
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';
const today = dayjs();
const showToday = today.format(dateFormat);
const threeMonthsLater = today.add(3, 'month');
const showThreeMonthsLater = threeMonthsLater.format(dateFormat);

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

export default function EmptyTimetable({ onSubmit }: { onSubmit: () => void }) {
  const token = getCookie('auth');
  // ==================== alert Modal ====================
  const [modal, alertModal] = Modal.useModal();

  // ==================== 取得諮商師頁面時間表 API ====================
  const { refetch } = useGetCounselorTimetableQuery({ token });

  // ==================== 新增/修改預約時段 API ====================
  const [CounselorTimetablePost] = useCounselorTimetablePostMutation();

  // ==================== RangePicker 設定時間區段 ====================
  const [selectedDates, setSelectedDates] = useState<RangeValue>(null);

  const disabledDate = (current: Dayjs | null) => {
    if (!current) {
      return false;
    }
    const tooLate = current.isAfter(showThreeMonthsLater, 'day');
    const tooEarly = current.isBefore(showToday, 'day');
    return tooEarly || tooLate;
  };

  // 轉換時間格式
  const onCalendarChange = (dates: RangeValue) => {
    setSelectedDates(dates);
  };

  // ==================== Antd 表單 ====================
  const [form] = Form.useForm();

  // ==================== Antd Checkbox ====================
  const [checkboxValues, setCheckboxValues] = useState<{ [key: string]: boolean }>({});

  // ==================== 控制 Loading ====================
  const [isHidden, setIsHidden] = useState('hidden');

  const onChange = (e: any) => {
    const { name, checked } = e.target;
    setCheckboxValues((prevState) => ({ ...prevState, [name]: checked }));
  };

  useEffect(() => {
    form.resetFields();
  }, []);

  const onFinish = async (values: any) => {
    // 打包 POST 需要的資料
    const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
    const WeekData = daysOfWeek.map((day) => ({
      WeekDay: day,
      Hours: Array.from({ length: 24 }).map((_, index) => ({
        Time: `${index.toString().padStart(2, '0')}:00`,
        Available: values[`${day}${index}`] !== undefined,
      })),
    }));

    const formattedDates = selectedDates ? [selectedDates[0]?.format('YYYY-MM-DD'), selectedDates[1]?.format('YYYY-MM-DD')] : null;

    const StartDate = formattedDates?.[0] ?? showToday;
    const EndDate = formattedDates?.[1];

    setIsHidden('block');
    const res = await CounselorTimetablePost({
      token,
      StartDate,
      EndDate,
      WeekData,
    });
    const { Message } = (res as { data: { Message: string } }).data;
    CustomAlert({ modal, Message, type: 'success' });

    await Promise.all([
      refetch(),
      setIsHidden('hidden'),
      // 在表單送出後，清空表單的欄位值
      form.resetFields(),
      // 清空表單的值
      form.setFieldsValue({}),
      // 清空渲染的 checkbox
      setCheckboxValues({}),
      setSelectedDates(null),
      onSubmit(),
    ]);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Form.Item>
        <div className={`absolute z-50 h-[700px] w-full bg-white ${isHidden}`}>
          <div className="h-full w-full flex items-center justify-center text-lg space-x-5">
            <LoadingOutlined className=" text-4xl text-secondary" />
            <h3 className="text-center text-secondary text-3xl ">Loading...</h3>
          </div>
        </div>
      </Form.Item>
      <Form.Item name="range-picker" className="flex flex-row text-secondary text-left">
        <div>
          <p className="mb-2">選擇日期</p>
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
          <div className="space-y-5">
            <ul className="hour-scrollbar flex w-full h-[487px] lg:h-[451px] space-x-1 lg:space-x-2 overflow-auto text-center justify-center">
              {emptyTimetableData.map((item: { WeekDay: string, Hours: IApiTimetablesHours[] }) => (
                <li className="space-y-0 relative h-full flex flex-col items-center" key={uuidv4()}>
                  <div className="space-y-1 bg-white z-10 sticky top-0 flex w-[76px]">
                    <div className="justify-center w-full space-y-1 border-b-2 border-gray-900 py-3 mb-5">
                      <p className="text-sm lg:text-lg text-gray-900">{item.WeekDay}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div>
                      {item?.Hours.map((hoursItem: IApiTimetablesHours, i: number) => (
                        <Form.Item key={uuidv4()} name={`${item.WeekDay}${i}`} className="my-0">
                          <div>
                            <Checkbox
                              onChange={onChange}
                              name={`${item.WeekDay}${hoursItem.Time}`}
                              className="flex justify-center items-center border-none lg:w-auto w-[38px] lg:text-base text-[10px] mobile-calendar shadow-none my-1"
                              style={{ color: checkboxValues[`${item.WeekDay}${hoursItem.Time}`] ? '#424242' : '#BDBDBD' }}
                              checked={checkboxValues[`${item.WeekDay}${hoursItem.Time}`] || false}
                            >
                              <span>{hoursItem.Time}</span>
                            </Checkbox>
                          </div>
                        </Form.Item>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="flex-col justify-end">
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            className="btnHoverDark w-full border-none text-[14px] font-bold text-white shadow-none lg:text-base h-[56px]"
          >
            儲存
          </Button>
          <p className="text-red-600 pl-2 mt-3">注意：儲存後將清空編輯前所有日期、時段設定</p>
        </div>
      </Form.Item>
      <div className="alert">{alertModal}</div>
    </Form>
  );
}
