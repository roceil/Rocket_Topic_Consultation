import { Button, ConfigProvider, Form, Input, Switch } from 'antd';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import {
  useCoursesDataPostMutation,
} from '../../../common/redux/service/counselorCenter';

// Render Empty Form map
const emptyFeatureAry = Array(5).fill('請輸入課程特色');
const emptyPriceAry = ['一堂', '三堂', '五堂', '體驗課一堂'];

export type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

// 無『該筆』課程資料時，顯示此 div
export function RenderEmptyForm({ renderEmptyForm, clickId }:{ renderEmptyForm:string, clickId:number }) {
  const token = getCookie('auth');
  // POST 新增課程
  const [coursesDataPostMutation] = useCoursesDataPostMutation();
  useEffect(() => {
    console.log(clickId);
  }, [clickId]);
  // 開關編輯功能
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const isHidden = isDisabled
    ? '!opacity-0 transform duration-300'
    : '!opacity-100 transform duration-300';
  // Render 『單一主題』的課程資訊
  const [getCoursesID, setGetCoursesID] = useState<number>(1);
  const [featureStates, setFeatureStates] = useState(emptyFeatureAry || []);
  const [featuresAry, SetFeaturesAry] = useState(featureStates);
  // 課程資料
  const [renderData, setRenderData] = useState<any>([]);

  // ==================== 刪除課程 API Axios DELETE ====================
  const deleteCourse = async (courseId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses?id=${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('delete Course :', response.data);
      // alert(response.data.Message); // 換成 alert component
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized');
      } else {
        console.log('Error adding course:', error);
      }
    }
  };

  // ==================== 新增/修改課程 API Axios POST ====================
  const addCourse = async (clickId, Courses, Features) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
        {
          FieldId: clickId,
          Courses,
          Features,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Course added:', response.data);
      setIsDisabled(true);
      // alert(response.data.Message); // 換成 alert component
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized');
      } else {
        console.log('Error adding course:', error);
      }
    }
  };

  // ==================== 新增/修改課程表單 ====================
  const courseItemAry = ['一堂', '三堂', '五堂', '體驗課一堂'];
  const courseQuantityAry = [1, 3, 5, 1];

  const handleSubmit = async (values: any) => {
    console.log(values);
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
        Price: parseInt(Price0),
        Availability: Availability0,
      },
      {
        Item: courseItemAry[1],
        Quantity: courseQuantityAry[1],
        Price: parseInt(Price1),
        Availability: Availability1,
      }, {
        Item: courseItemAry[2],
        Quantity: courseQuantityAry[2],
        Price: parseInt(Price2),
        Availability: Availability2,
      },
      {
        Item: courseItemAry[3],
        Quantity: courseQuantityAry[3],
        Price: parseInt(Price3),
        Availability: Availability3,
      },
    ];
    const res = await coursesDataPostMutation({ token, clickId, Courses, Features });
    setIsDisabled(true);
    // alert(res.data.Message);
    console.log(res);
  };

  // Antd Form
  const [form] = Form.useForm();
  // Antd Switch
  const SwitchOnChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  // Antd form 課程特色
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log('Change:', e.target.value);
  };
  return (
    <div className={`relative z-50 ${renderEmptyForm}`}>
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
                <li className="flex items-center" key={i}>
                  <div className="w-[33.33%]">{item}</div>
                  <Form.Item className="mb-0 lg:w-[33.33%]" name={`Price${i}`}>
                    <Input
                      disabled={isDisabled}
                      placeholder="請填寫價格"
                      className="font-normal"
                      style={{ height: 40, width: 124 }}
                    />
                  </Form.Item>
                  <Form.Item className="mb-0 lg:w-[33.33%]" name={`Availability${i}`}>
                    <Switch
                      onChange={SwitchOnChange}
                      disabled={isDisabled}
                      defaultChecked
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
                    className={`mb-8 px-5 lg:px-[56px] ${i > 2 && 'ml-[10px]'}`}
                    rules={[
                      {
                        required: i <= 2,
                        message: '此項為必填',
                        whitespace: true,
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      maxLength={25}
                      style={{ height: 45, resize: 'none' }}
                      onChange={(e) => {
                        const newFeatures = [...featureStates];
                        newFeatures[i] = e.target.value; // 將新輸入的值儲存
                        setFeatureStates(newFeatures);
                      }}
                      placeholder={featureStates[i] ?? '請輸入課程特色'} // 如果 featureStates[i] 是 undefined 或 null，則將 placeholder 設為預設值
                      disabled={isDisabled}
                      value={featureStates[i]}
                    />
                  </Form.Item>
                ),
              )}
            </div>
            <Form.Item>
              {/* btns */}
              <div className="flex justify-end">
                <div className="mt-10 flex justify-between space-x-5 px-14">
                  <input
                    type="button"
                    value="刪除此專長領域"
                    className={`text-base text-gray-900 underline underline-offset-2 ${
                      !isDisabled ? 'hover:text-red-500' : ''
                    }`}
                    onClick={() => deleteCourse(clickId)}
                          // onClick={() => { deleteCourse1(token, clickId); }}
                    disabled={isDisabled}
                  />
                </div>
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
                    onClick={() => setIsDisabled(false)}
                    className=" btnHoverDark w-[120px] lg:w-[180px] border-none text-[14px] font-bold text-white shadow-none lg:text-base h-[56px]"
                  >
                    {isDisabled ? '編輯' : '取消編輯'}
                  </Button>
                </div>
              </div>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </ul>
    </div>
  );
}

