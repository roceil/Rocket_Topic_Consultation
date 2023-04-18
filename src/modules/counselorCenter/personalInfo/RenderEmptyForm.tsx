import { useCoursesDataGetQuery } from '@/common/redux/service/counselorCenter';
import { Button, ConfigProvider, Form, Input, Switch } from 'antd';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { useState } from 'react';

// Render Empty Form map
const fakeFeatureAry = Array(5).fill(1);
const fakePriceAry = ['一堂', '三堂', '五堂', '體驗課一堂'];

export type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

// 無『該筆』課程資料時，顯示此 div
export function RenderEmptyForm({ renderEmptyForm }:{ renderEmptyForm:string }) {
  const token = getCookie('auth');
  // GET 上架課程
  const { data, isLoading } = useCoursesDataGetQuery({ token });
  // 開關編輯功能
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const isHidden = isDisabled
    ? '!opacity-0 transform duration-300'
    : '!opacity-100 transform duration-300';
  // Render 『單一主題』的課程資訊
  const [getCoursesID, setGetCoursesID] = useState<number>(1);
  const [featureStates, setFeatureStates] = useState(fakeFeatureAry || []);
  const [featuresAry, SetFeaturesAry] = useState(featureStates);
    // 課程資料
    const [renderData, setRenderData] = useState<any>([]);
    

  // POST 新增/修改課程 data
  const courseContent = {
    FieldId: 4,
    Courses: [
      {
        Item: '一堂',
        Quantity: 1,
        Price: 2000,
        Availability: false,
      },
      {
        Item: '三堂',
        Quantity: 3,
        Price: 6000,
        Availability: false,
      },
      {
        Item: '五堂',
        Quantity: 5,
        Price: 9000,
        Availability: false,
      },
      {
        Item: '體驗課一堂',
        Quantity: 1,
        Price: 800,
        Availability: true,
      },
    ],
    Features: {
      Feature1: `useEffect 取得的 CoursesID：${getCoursesID}`,
      Feature2: '菲菲2',
      Feature3: '菲菲3',
      Feature4: 'ccccc',
      Feature5: 'bbbbb',
    },
  };
    // 新增課程 Axios POST (async/await)
  const addCourse = async () => {
    try {
      // const Features = {
      //   Feature1: '',
      //   Feature2: '',
      //   Feature3: '',
      //   Feature4: '',
      //   Feature5: '',
      // };

      // for (let i = 0; i < featureStates.length; i + 1) {
      //   const feature_key = `Feature${i + 1}`;
      //   Features[feature_key] = featuresAry[i];
      // }

      // const courseContentWithFeatures = {
      //   ...courseContent,
      //   Features,
      // };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
        courseContent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Course added:', response.data);
      setIsDisabled(true);
      console.log(featuresAry);
      // alert(response.data.Message); // 換成 alert component
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized');
      } else {
        console.log('Error adding course:', error);
      }
    }
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
            onFinish={addCourse}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {/* PC 課程方案＋定價 */}
            <div className="flex w-full flex-col space-y-4">
              {fakePriceAry.map((item, i) => (
                <li className="flex items-center" key={i}>
                  <div className="w-[33.33%]">{item}</div>
                  <Form.Item className="mb-0 lg:w-[33.33%]">
                    <Input
                      disabled={isDisabled}
                      placeholder="請填寫價格"
                      className="font-normal"
                      style={{ height: 40, width: 124 }}
                    />
                  </Form.Item>
                  <Form.Item className="mb-0 lg:w-[33.33%]">
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
              {fakeFeatureAry?.map(
                (
                  item: string | number | readonly string[] | undefined,
                  i: number,
                ) => (
                  <Form.Item
                    name={i}
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
              <div className="mt-10 flex justify-between space-x-5 px-14">
                <input
                  type="button"
                  value="刪除此專長領域"
                  className={`text-base text-gray-900 underline underline-offset-2 ${
                    !isDisabled ? 'hover:text-red-500' : ''
                  }`}
                  onClick={() => deleteCourse(getCoursesID)}
                  disabled={isDisabled}
                />
                <div>
                  <Button
                    type="primary"
                    shape="round"
                    htmlType="submit"
                    className={`btnHoverDark !lg:px-[74px] border-none !px-[66px] text-base text-[14px] font-bold text-white shadow-none lg:text-base ${isHidden}`}
                    onClick={() => addCourse}
                  >
                    儲存
                  </Button>
                  <Button
                    type="primary"
                    shape="round"
                    htmlType="button"
                    onClick={() => setIsDisabled(false)}
                    className=" btnHoverDark !lg:px-[74px] border-none !px-[66px] text-base text-[14px] font-bold text-white shadow-none lg:text-base"
                  >
                    編輯
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
