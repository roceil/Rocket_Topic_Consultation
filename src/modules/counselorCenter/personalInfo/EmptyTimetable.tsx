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
    const rangePickerValue = values['range-picker'];
    console.log('RangePicker:', rangePickerValue);
    // eslint-disable-next-line max-len
    const { 日0, 日1, 日2, 日3, 日4, 日5, 日6, 日7, 日8, 日9, 日10, 日11, 日12, 日13, 日14, 日15, 日16, 日17, 日18, 日19, 日20, 日21, 日22, 日23, 一0, 一1, 一2, 一3, 一4, 一5, 一6, 一7, 一8, 一9, 一10, 一11, 一12, 一13, 一14, 一15, 一16, 一17, 一18, 一19, 一20, 一21, 一22, 一23, 二0, 二1, 二2, 二3, 二4, 二5, 二6, 二7, 二8, 二9, 二10, 二11, 二12, 二13, 二14, 二15, 二16, 二17, 二18, 二19, 二20, 二21, 二22, 二23, 三0, 三1, 三2, 三3, 三4, 三5, 三6, 三7, 三8, 三9, 三10, 三11, 三12, 三13, 三14, 三15, 三16, 三17, 三18, 三19, 三20, 三21, 三22, 三23, 四0, 四1, 四2, 四3, 四4, 四5, 四6, 四7, 四8, 四9, 四10, 四11, 四12, 四13, 四14, 四15, 四16, 四17, 四18, 四19, 四20, 四21, 四22, 四23, 五0, 五1, 五2, 五3, 五4, 五5, 五6, 五7, 五8, 五9, 五10, 五11, 五12, 五13, 五14, 五15, 五16, 五17, 五18, 五19, 五20, 五21, 五22, 五23, 六0, 六1, 六2, 六3, 六4, 六5, 六6, 六7, 六8, 六9, 六10, 六11, 六12, 六13, 六14, 六15, 六16, 六17, 六18, 六19, 六20, 六21, 六22, 六23 } = values;

    const WeekData = [
      {
        WeekDay: '日',
        Hours: [
          { Time: '00:00', Available: 日0 !== undefined },
          { Time: '01:00', Available: 日1 !== undefined },
          { Time: '02:00', Available: 日2 !== undefined },
          { Time: '03:00', Available: 日3 !== undefined },
          { Time: '04:00', Available: 日4 !== undefined },
          { Time: '05:00', Available: 日5 !== undefined },
          { Time: '06:00', Available: 日6 !== undefined },
          { Time: '07:00', Available: 日7 !== undefined },
          { Time: '08:00', Available: 日8 !== undefined },
          { Time: '09:00', Available: 日9 !== undefined },
          { Time: '10:00', Available: 日10 !== undefined },
          { Time: '11:00', Available: 日11 !== undefined },
          { Time: '12:00', Available: 日12 !== undefined },
          { Time: '13:00', Available: 日13 !== undefined },
          { Time: '14:00', Available: 日14 !== undefined },
          { Time: '15:00', Available: 日15 !== undefined },
          { Time: '16:00', Available: 日16 !== undefined },
          { Time: '17:00', Available: 日17 !== undefined },
          { Time: '18:00', Available: 日18 !== undefined },
          { Time: '19:00', Available: 日19 !== undefined },
          { Time: '20:00', Available: 日20 !== undefined },
          { Time: '21:00', Available: 日21 !== undefined },
          { Time: '22:00', Available: 日22 !== undefined },
          { Time: '23:00', Available: 日23 !== undefined },
        ],
      },
      {
        WeekDay: '一',
        Hours: [
          { Time: '00:00', Available: 一0 !== undefined },
          { Time: '01:00', Available: 一1 !== undefined },
          { Time: '02:00', Available: 一2 !== undefined },
          { Time: '03:00', Available: 一3 !== undefined },
          { Time: '04:00', Available: 一4 !== undefined },
          { Time: '05:00', Available: 一5 !== undefined },
          { Time: '06:00', Available: 一6 !== undefined },
          { Time: '07:00', Available: 一7 !== undefined },
          { Time: '08:00', Available: 一8 !== undefined },
          { Time: '09:00', Available: 一9 !== undefined },
          { Time: '10:00', Available: 一10 !== undefined },
          { Time: '11:00', Available: 一11 !== undefined },
          { Time: '12:00', Available: 一12 !== undefined },
          { Time: '13:00', Available: 一13 !== undefined },
          { Time: '14:00', Available: 一14 !== undefined },
          { Time: '15:00', Available: 一15 !== undefined },
          { Time: '16:00', Available: 一16 !== undefined },
          { Time: '17:00', Available: 一17 !== undefined },
          { Time: '18:00', Available: 一18 !== undefined },
          { Time: '19:00', Available: 一19 !== undefined },
          { Time: '20:00', Available: 一20 !== undefined },
          { Time: '21:00', Available: 一21 !== undefined },
          { Time: '22:00', Available: 一22 !== undefined },
          { Time: '23:00', Available: 一23 !== undefined },
        ],
      },
      {
        WeekDay: '二',
        Hours: [
          { Time: '00:00', Available: 二0 !== undefined },
          { Time: '01:00', Available: 二1 !== undefined },
          { Time: '02:00', Available: 二2 !== undefined },
          { Time: '03:00', Available: 二3 !== undefined },
          { Time: '04:00', Available: 二4 !== undefined },
          { Time: '05:00', Available: 二5 !== undefined },
          { Time: '06:00', Available: 二6 !== undefined },
          { Time: '07:00', Available: 二7 !== undefined },
          { Time: '08:00', Available: 二8 !== undefined },
          { Time: '09:00', Available: 二9 !== undefined },
          { Time: '10:00', Available: 二10 !== undefined },
          { Time: '11:00', Available: 二11 !== undefined },
          { Time: '12:00', Available: 二12 !== undefined },
          { Time: '13:00', Available: 二13 !== undefined },
          { Time: '14:00', Available: 二14 !== undefined },
          { Time: '15:00', Available: 二15 !== undefined },
          { Time: '16:00', Available: 二16 !== undefined },
          { Time: '17:00', Available: 二17 !== undefined },
          { Time: '18:00', Available: 二18 !== undefined },
          { Time: '19:00', Available: 二19 !== undefined },
          { Time: '20:00', Available: 二20 !== undefined },
          { Time: '21:00', Available: 二21 !== undefined },
          { Time: '22:00', Available: 二22 !== undefined },
          { Time: '23:00', Available: 二23 !== undefined },
        ],
      },
      {
        WeekDay: '三',
        Hours: [
          { Time: '00:00', Available: 三0 !== undefined },
          { Time: '01:00', Available: 三1 !== undefined },
          { Time: '02:00', Available: 三2 !== undefined },
          { Time: '03:00', Available: 三3 !== undefined },
          { Time: '04:00', Available: 三4 !== undefined },
          { Time: '05:00', Available: 三5 !== undefined },
          { Time: '06:00', Available: 三6 !== undefined },
          { Time: '07:00', Available: 三7 !== undefined },
          { Time: '08:00', Available: 三8 !== undefined },
          { Time: '09:00', Available: 三9 !== undefined },
          { Time: '10:00', Available: 三10 !== undefined },
          { Time: '11:00', Available: 三11 !== undefined },
          { Time: '12:00', Available: 三12 !== undefined },
          { Time: '13:00', Available: 三13 !== undefined },
          { Time: '14:00', Available: 三14 !== undefined },
          { Time: '15:00', Available: 三15 !== undefined },
          { Time: '16:00', Available: 三16 !== undefined },
          { Time: '17:00', Available: 三17 !== undefined },
          { Time: '18:00', Available: 三18 !== undefined },
          { Time: '19:00', Available: 三19 !== undefined },
          { Time: '20:00', Available: 三20 !== undefined },
          { Time: '21:00', Available: 三21 !== undefined },
          { Time: '22:00', Available: 三22 !== undefined },
          { Time: '23:00', Available: 三23 !== undefined },
        ],
      },
      {
        WeekDay: '四',
        Hours: [
          { Time: '00:00', Available: 四0 !== undefined },
          { Time: '01:00', Available: 四1 !== undefined },
          { Time: '02:00', Available: 四2 !== undefined },
          { Time: '03:00', Available: 四3 !== undefined },
          { Time: '04:00', Available: 四4 !== undefined },
          { Time: '05:00', Available: 四5 !== undefined },
          { Time: '06:00', Available: 四6 !== undefined },
          { Time: '07:00', Available: 四7 !== undefined },
          { Time: '08:00', Available: 四8 !== undefined },
          { Time: '09:00', Available: 四9 !== undefined },
          { Time: '10:00', Available: 四10 !== undefined },
          { Time: '11:00', Available: 四11 !== undefined },
          { Time: '12:00', Available: 四12 !== undefined },
          { Time: '13:00', Available: 四13 !== undefined },
          { Time: '14:00', Available: 四14 !== undefined },
          { Time: '15:00', Available: 四15 !== undefined },
          { Time: '16:00', Available: 四16 !== undefined },
          { Time: '17:00', Available: 四17 !== undefined },
          { Time: '18:00', Available: 四18 !== undefined },
          { Time: '19:00', Available: 四19 !== undefined },
          { Time: '20:00', Available: 四20 !== undefined },
          { Time: '21:00', Available: 四21 !== undefined },
          { Time: '22:00', Available: 四22 !== undefined },
          { Time: '23:00', Available: 四23 !== undefined },
        ],
      },
      {
        WeekDay: '五',
        Hours: [
          { Time: '00:00', Available: 五0 !== undefined },
          { Time: '01:00', Available: 五1 !== undefined },
          { Time: '02:00', Available: 五2 !== undefined },
          { Time: '03:00', Available: 五3 !== undefined },
          { Time: '04:00', Available: 五4 !== undefined },
          { Time: '05:00', Available: 五5 !== undefined },
          { Time: '06:00', Available: 五6 !== undefined },
          { Time: '07:00', Available: 五7 !== undefined },
          { Time: '08:00', Available: 五8 !== undefined },
          { Time: '09:00', Available: 五9 !== undefined },
          { Time: '10:00', Available: 五10 !== undefined },
          { Time: '11:00', Available: 五11 !== undefined },
          { Time: '12:00', Available: 五12 !== undefined },
          { Time: '13:00', Available: 五13 !== undefined },
          { Time: '14:00', Available: 五14 !== undefined },
          { Time: '15:00', Available: 五15 !== undefined },
          { Time: '16:00', Available: 五16 !== undefined },
          { Time: '17:00', Available: 五17 !== undefined },
          { Time: '18:00', Available: 五18 !== undefined },
          { Time: '19:00', Available: 五19 !== undefined },
          { Time: '20:00', Available: 五20 !== undefined },
          { Time: '21:00', Available: 五21 !== undefined },
          { Time: '22:00', Available: 五22 !== undefined },
          { Time: '23:00', Available: 五23 !== undefined },
        ],
      },
      {
        WeekDay: '六',
        Hours: [
          { Time: '00:00', Available: 六0 !== undefined },
          { Time: '01:00', Available: 六1 !== undefined },
          { Time: '02:00', Available: 六2 !== undefined },
          { Time: '03:00', Available: 六3 !== undefined },
          { Time: '04:00', Available: 六4 !== undefined },
          { Time: '05:00', Available: 六5 !== undefined },
          { Time: '06:00', Available: 六6 !== undefined },
          { Time: '07:00', Available: 六7 !== undefined },
          { Time: '08:00', Available: 六8 !== undefined },
          { Time: '09:00', Available: 六9 !== undefined },
          { Time: '10:00', Available: 六10 !== undefined },
          { Time: '11:00', Available: 六11 !== undefined },
          { Time: '12:00', Available: 六12 !== undefined },
          { Time: '13:00', Available: 六13 !== undefined },
          { Time: '14:00', Available: 六14 !== undefined },
          { Time: '15:00', Available: 六15 !== undefined },
          { Time: '16:00', Available: 六16 !== undefined },
          { Time: '17:00', Available: 六17 !== undefined },
          { Time: '18:00', Available: 六18 !== undefined },
          { Time: '19:00', Available: 六19 !== undefined },
          { Time: '20:00', Available: 六20 !== undefined },
          { Time: '21:00', Available: 六21 !== undefined },
          { Time: '22:00', Available: 六22 !== undefined },
          { Time: '23:00', Available: 六23 !== undefined },
        ],
      },
    ];
    const formattedDates = selectedDates ? [selectedDates[0]?.format('YYYY-MM-DD'), selectedDates[1]?.format('YYYY-MM-DD')] : null;

    const StartDate = formattedDates?.[0];
    const EndDate = formattedDates?.[1];

    setIsHidden('block');
    const res = await CounselorTimetablePost({
      token,
      StartDate,
      EndDate,
      WeekData,
    });
    refetch();
    setIsHidden('hidden');
    const { Message } = (res as { data: { Message: string } }).data;
    CustomAlert({ modal, Message, type: 'success' });
    // 在表單送出後，清空表單的欄位值
    form.resetFields();
    // 清空表單的值
    form.setFieldsValue({});
    // 清空渲染的 checkbox
    setCheckboxValues({});
    setSelectedDates(null);
    onSubmit();
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
              {emptyTimetableData.map((item: { WeekDay: string, Hours: any }) => (
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
