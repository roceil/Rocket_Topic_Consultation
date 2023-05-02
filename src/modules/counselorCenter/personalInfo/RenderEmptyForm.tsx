/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ConfigProvider, Form, Input, Switch, Modal } from 'antd';
import CustomAlert from '@/common/helpers/customAlert';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IemptyCourseForm } from '@/types/interface';
import {
  useCourseDataDeleteMutation,
  useCoursesDataGetQuery,
  useCoursesDataPostMutation,
} from '../../../common/redux/service/counselorCenter';

// ==================== Empty Form ====================
const emptyFeatureAry = Array(5).fill('請輸入課程特色');
const emptyPriceAry = ['一堂', '三堂', '五堂', '體驗課一堂'];

export type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

export function RenderEmptyForm({ renderEmptyForm, clickId }:{ renderEmptyForm:string, clickId:number }) {
  const token = getCookie('auth');
  // ==================== alert Modal ====================
  const [modal, alertModal] = Modal.useModal();

  // ==================== Antd Form ====================
  const [form] = Form.useForm();

  // ==================== 取得課程 API ====================
  const { refetch } = useCoursesDataGetQuery({ token });

  // ==================== 刪除課程 ====================
  const [CourseDataDeleteMutation] = useCourseDataDeleteMutation();
  const deleteCourse = async () => {
    const res = await CourseDataDeleteMutation({ token, clickId });
    refetch();
    const Message = '已刪除此專長領域';
    CustomAlert({ modal, Message, type: 'success' });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  // ==================== 新增/修改課程 API ====================
  const [coursesDataPostMutation] = useCoursesDataPostMutation();

  // ==================== 開關編輯功能 ====================
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const isHidden = isDisabled
    ? '!opacity-0 transform duration-300'
    : '!opacity-100 transform duration-300';

  // ==================== 儲存『單一主題』課程特色 ====================
  const [featureStates, setFeatureStates] = useState(emptyFeatureAry || []);

  // ==================== 送出表單 ====================
  const courseItemAry = ['一堂', '三堂', '五堂', '體驗課一堂'];
  const courseQuantityAry = [1, 3, 5, 1];
  const handleSubmit = async (values: IemptyCourseForm) => {
    const { Feature1, Feature2, Feature3, Feature4, Feature5, Price0, Price1, Price2, Price3, Availability0, Availability1, Availability2, Availability3 } = values;

    // 組成 POST 用的 Features
    const Features = {
      Feature1,
      Feature2,
      Feature3,
      Feature4,
      Feature5,
    };

    // 組成 POST 用的 Courses
    const Courses = [
      {
        Item: courseItemAry[0],
        Quantity: courseQuantityAry[0],
        Price: parseInt(Price0, 10),
        Availability: Availability0,
      },
      {
        Item: courseItemAry[1],
        Quantity: courseQuantityAry[1],
        Price: parseInt(Price1, 10),
        Availability: Availability1,
      }, {
        Item: courseItemAry[2],
        Quantity: courseQuantityAry[2],
        Price: parseInt(Price2, 10),
        Availability: Availability2,
      },
      {
        Item: courseItemAry[3],
        Quantity: courseQuantityAry[3],
        Price: parseInt(Price3, 10),
        Availability: Availability3,
      },
    ];

    // 判斷至少開放一時段
    type AvailabilityItem = boolean | undefined;
    const AvailabilityAry: AvailabilityItem[] = [Availability0, Availability1, Availability2, Availability3];
    if (AvailabilityAry.every((item: AvailabilityItem) => item === undefined)) {
      const Message = '請至少開放一種方案';
      CustomAlert({ modal, Message, type: 'error' });
    } else {
      const res = await coursesDataPostMutation({
        token,
        clickId,
        Courses,
        Features,
      });
      setIsDisabled(true);
      refetch();
      const { Message } = (res as { data: { Message: string } }).data;
      CustomAlert({ modal, Message, type: 'success' });
    }
  };

  return (
    <div className={`relative ${renderEmptyForm}`}>
      <ul className="flex w-full flex-col items-center space-x-10 rounded-lg py-5 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
        <ConfigProvider
          theme={{
            token: {
              colorTextPlaceholder: '#9E9E9E',
              colorText: '#424242',
              colorBorder: '#BDBDBD',
              colorIcon: '#5D5A88',
              fontSize: 14,
              borderRadius: 10,
              controlHeight: 40,
            },
          }}
        >
          <Form
            form={form}
            name="classInfo"
            onFinish={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {/* PC 課程方案＋定價 */}
            <div className="flex w-full flex-col space-y-4">
              {emptyPriceAry.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li className="flex items-center text-center" key={uuidv4()}>
                  <div className="w-[33.33%]">{item}</div>
                  <Form.Item className="mb-0 w-[33.33%]" name={`Price${i}`}>
                    <Input
                      disabled={isDisabled}
                      placeholder="請填寫價格"
                      className="font-normal"
                      style={{ maxHeight: 40, maxWidth: 124 }}
                    />
                  </Form.Item>
                  <Form.Item className="mb-0 w-[33.33%] text-center" name={`Availability${i}`}>
                    <Switch
                      disabled={isDisabled}
                      className="bg-gray-400"
                    />
                  </Form.Item>
                </li>
              ))}
            </div>
            <div className="mt-20">
              {emptyFeatureAry?.map(
                (item, i) => (
                  <Form.Item
                    name={`Feature${i + 1}`}
                    label={`特色 ${i + 1}`}
                    className={`mb-8 px-5 lg:px-[56px] ${i > 2 && 'lg:ml-[10px]'}`}
                    rules={[
                      {
                        required: i <= 2,
                        message: '此項為必填',
                        whitespace: true,
                      },
                    ]}
                  >
                    <TextArea
                      key={uuidv4()}
                      showCount
                      maxLength={25}
                      style={{ height: 45, resize: 'none' }}
                      onChange={(e) => {
                        const newFeatures = [...featureStates];
                        newFeatures[i] = e.target.value;
                        setFeatureStates(newFeatures);
                      }}
                      placeholder={featureStates[i] ?? '請輸入課程特色'}
                      disabled={isDisabled}
                      value={featureStates[i]}
                    />
                  </Form.Item>
                ),
              )}
            </div>
            <Form.Item>
              {/* btns */}
              <div className="">
                <div className="mt-10 flex justify-between px-8 lg:px-14">
                  <input
                    type="button"
                    value="刪除此專長領域"
                    className={`text-base text-gray-900 underline underline-offset-2 ${
                      !isDisabled ? 'hover:text-red-500' : ''
                    }`}
                    onClick={deleteCourse}
                    disabled={isDisabled}
                  />
                </div>
                <div className="flex justify-around lg:justify-end lg:mr-14">
                  <div className="space-x-5 mt-5">
                    <Button
                      type="primary"
                      shape="round"
                      htmlType="submit"
                      className={`btnHoverDark w-[120px] lg:w-[180px] border-none text-[14px] font-bold text-white shadow-none lg:text-base h-[56px] ${isHidden}`}
                    >
                      儲存
                    </Button>
                    <Button
                      type="primary"
                      shape="round"
                      htmlType="button"
                      onClick={() => setIsDisabled(!isDisabled)}
                      className=" btnHoverDark w-[120px] lg:w-[180px] border-none text-[14px] font-bold text-white shadow-none lg:text-base h-[56px]"
                    >
                      {isDisabled ? '編輯' : '取消編輯'}
                    </Button>
                  </div>
                </div>
              </div>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </ul>
      <div className="alert">{alertModal}</div>
    </div>
  );
}

