import { ConfigProvider, Form, Input, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { NamePath } from 'antd/es/form/interface';
import { useCoursesDataGetQuery, useCoursesDataPostMutation } from '../../../common/redux/service/counselorCenter';
import { IButton } from '../../../common/components/IButton';
import { classTopic } from '../../../lib/counselorCenterData';

export type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

// 無課程資料時，顯示此 div
function NoCourses() {
  return (
    <div className="container z-50 flex h-[338px] w-full items-center justify-center rounded-2xl bg-gray-200">
      <h1 className="text-lg text-secondary">請先選擇專長領域</h1>
    </div>
  );
}

// 待修改：無『該筆』課程資料時，顯示此 div
// function EmptyCourses() {
//   return (
//     <li className="flex items-center">
//       <div className="w-[33.33%]">一堂</div>
//       <Form.Item className="mb-0 lg:w-[33.33%]">
//         <Input
//           // disabled={editInfo}
//           placeholder="請填寫價格"
//           className="font-normal"
//           style={{ height: 40, width: 124 }}
//         />
//       </Form.Item>
//       <Form.Item className="mb-0 lg:w-[33.33%]">
//         <Switch
//           // onChange={SwitchOnChange}
//           // disabled={editInfo}
//           defaultChecked
//           className="bg-gray-400"
//         />
//       </Form.Item>
//     </li>
//   );
// }

// 諮商師 > 個人資料 > 課程資訊
export function ClassInfo() {
  const token = getCookie('auth');
  // 用 redux 打 API ，可以一次管理多種狀態
  // GET 上架課程
  const { data = [], isLoading } = useCoursesDataGetQuery({ token });
  // POST 新增課程
  const [CoursesDataPost] = useCoursesDataPostMutation();

  // 新增課程 API 函式
  // const CoursesDataPostApi = async (FieldId, Course[{Item,Quantity,Price,Availability}],Feature) => {
  //   const res = await CoursesDataPost({
  //     FieldId,
  //     Course[{Item,Quantity,Price,Availability}],
  //     Feature
  //   });
  //   if ('error' in res) {
  //     const {
  //       data: { Message },
  //     } = res.error as { data: { Message: string } };
  //     alert(Message);
  //     return;
  //   }
  //   const { Message } = res.data as { Message: string };
  //   alert(Message);
  //   console.log(Message);
  // };

  // 新增課程 Axios POST
  // useEffect(() => {
  //   axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: {
  //       FieldId: 3,
  //       Course: [
  //         {
  //           Item: '一堂',
  //           Quantity: 1,
  //           Price: 1000,
  //           Availability: true,
  //         },
  //         {
  //           Item: '三堂',
  //           Quantity: 3,
  //           Price: 3000,
  //           Availability: true,
  //         },
  //         {
  //           Item: '五堂',
  //           Quantity: 5,
  //           Price: 5000,
  //           Availability: true,
  //         },
  //         {
  //           Item: '體驗課一堂',
  //           Quantity: 1,
  //           Price: 500,
  //           Availability: false,
  //         },
  //       ],
  //       Feature: ['string', 'string', 'string', 'string', 'string'],
  //     },
  //   });
  // }, [isLoading]);

  // const addCourses = { FieldId: 3,
  //   Course: [
  //     {
  //       Item: '一堂',
  //       Quantity: 1,
  //       Price: 1000,
  //       Availability: true,
  //     },
  //     {
  //       Item: '三堂',
  //       Quantity: 3,
  //       Price: 3000,
  //       Availability: true,
  //     },
  //     {
  //       Item: '五堂',
  //       Quantity: 5,
  //       Price: 5000,
  //       Availability: true,
  //     },
  //     {
  //       Item: '體驗課一堂',
  //       Quantity: 1,
  //       Price: 500,
  //       Availability: false,
  //     },
  //   ],
  //   Feature: ['string', 'string', 'string', 'string', 'string'] };

  // 新增課程 Axios POST
  // useEffect(() => {
  //   const postCourse = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
  //         { FieldId: 3,
  //           Course: [
  //             {
  //               Item: '一堂',
  //               Quantity: 1,
  //               Price: 1000,
  //               Availability: true,
  //             },
  //             {
  //               Item: '三堂',
  //               Quantity: 3,
  //               Price: 3000,
  //               Availability: true,
  //             },
  //             {
  //               Item: '五堂',
  //               Quantity: 5,
  //               Price: 5000,
  //               Availability: true,
  //             },
  //             {
  //               Item: '體驗課一堂',
  //               Quantity: 1,
  //               Price: 500,
  //               Availability: false,
  //             },
  //           ],
  //           Feature: ['string', 'string', 'string', 'string', 'string'] },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         },
  //       );
  //       console.log('Course added:', response.data);
  //     } catch (error) {
  //       console.log('API error:', error);
  //     }
  //   };
  //   postCourse();
  // }, [isLoading, token]);
  // 新增課程 Axios POST
  // useEffect(() => {
  //   axios
  //     .post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
  //       {
  //         FieldId: 3,
  //         Course: [
  //           {
  //             Item: '一堂',
  //             Quantity: 1,
  //             Price: 1000,
  //             Availability: true,
  //           },
  //           {
  //             Item: '三堂',
  //             Quantity: 3,
  //             Price: 3000,
  //             Availability: true,
  //           },
  //           {
  //             Item: '五堂',
  //             Quantity: 5,
  //             Price: 5000,
  //             Availability: true,
  //           },
  //           {
  //             Item: '體驗課一堂',
  //             Quantity: 1,
  //             Price: 500,
  //             Availability: false,
  //           },
  //         ],
  //         Feature: ['string', 'string', 'string', 'string', 'string'],
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     )
  //     .then((response) => {
  //       console.log('Course added:', response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response && error.response.status === 401) {
  //         console.log('Unauthorized');
  //       } else {
  //         console.log('Error adding course:', error);
  //       }
  //     });
  // }, [isLoading, token]);

  // 儲存 Get API 的狀態碼
  const [statusCode, setStatusCode] = useState<number>();

  // 因為 RTKQ 取 res.status 卡關，所以多寫了這個 get axios
  useEffect(() => {
    // axios 當測試，最後要用 redux 打 API ，才能一次管理多種狀態
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log('res', res);
        const { status } = res;
        setStatusCode(status);
      });
  }, [isLoading]);

  // 控制顯示哪個主題的課程資訊
  const [getCoursesID, setGetCoursesID] = useState<number>(1);
  // 課程方案
  const coursesPriceAry = data?.Data?.Courses[getCoursesID - 1]?.Course;
  // 課程特色
  const coursesFeature = data?.Data?.Courses[getCoursesID - 1]?.Feature;

  useEffect(() => {
    console.log(data?.Data?.Courses[2]?.Feature);
  }, [getCoursesID]);

  // 開啟編輯功能
  const [editInfo, setEditInfo] = useState<boolean>(true);
  const isHidden = editInfo ? '!opacity-0 transform duration-300' : '!opacity-100 transform duration-300';

  // 判斷有無課程資料，渲染課程方案、課程特色
  const renderNoCoursesSection = () => (statusCode === 400 ? <NoCourses /> : null);

  // Form
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  // Switch
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
    <>
      <div className=" space-y-10 px-5 lg:mt-2 lg:space-y-12 ">
        <button
          type="button"
          onClick={() => {
            {
              axios
                .post(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
                  {
                    FieldId: 3,
                    Course: [
                      {
                        Item: '一堂',
                        Quantity: 1,
                        Price: 1000,
                        Availability: true,
                      },
                      {
                        Item: '三堂',
                        Quantity: 3,
                        Price: 3000,
                        Availability: true,
                      },
                      {
                        Item: '五堂',
                        Quantity: 5,
                        Price: 5000,
                        Availability: true,
                      },
                      {
                        Item: '體驗課一堂',
                        Quantity: 1,
                        Price: 500,
                        Availability: false,
                      },
                    ],
                    Feature: ['string', 'string', 'string', 'string', 'string'],
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  },
                )
                .then((response) => {
                  console.log('Course added:', response.data);
                })
                .catch((error) => {
                  if (error.response && error.response.status === 401) {
                    console.log('Unauthorized');
                  } else {
                    console.log('Error adding course:', error);
                  }
                });
            }
          }}
        >
          test

        </button>
        <div className="flex-row lg:flex">
          <h3 className="mr-2 mb-4 text-base font-bold text-secondary lg:mb-0 lg:w-[10%]">
            專長領域 *
          </h3>
          <div className="flex flex-wrap justify-around lg:w-[80%] lg:flex-nowrap lg:justify-between lg:space-x-3">
            {/* 判斷有無該課程資料，渲染膠囊 => 有資料藍色，無資料灰色 */}
            {classTopic.map((item) => (data?.Data?.FieldIds.includes(item.id) ? (
              <IButton
                text={item.topicName}
                fontSize="text-[14px]"
                px="w-[104px] lg:w-[112px]"
                py="py-2 lg:py-[10px]"
                key={item.id}
                onClick={() => { setGetCoursesID(item.id); console.log(getCoursesID); }}
              />
            ) : (
              <IButton
                text={item.topicName}
                fontSize="text-[14px] !text-gray-600 "
                px="w-[104px] lg:w-[112px]"
                py="py-2 lg:py-[10px]"
                extraStyle="!CounselorCenterNoDataBtn"
                key={item.id}
                onClick={() => { setGetCoursesID(item.id); console.log(getCoursesID); }}
              />
            )))}
          </div>
        </div>
        {renderNoCoursesSection()}
        <div className={`space-y-10 lg:space-y-12 ${data.Success ? '' : 'hidden'}`}>
          <div className="flex-row lg:flex">
            <h3 className="mr-2 mb-4 border-t border-gray-400 pt-10 font-bold text-secondary lg:mb-0 lg:w-[10%] lg:border-none lg:pt-0">
              課程方案 *
            </h3>
            {/* PC 課程方案 */}
            <div className="hidden w-[90%] rounded-2xl bg-gray-200 pb-9 lg:block">
              <ul className="flex w-full border-b  border-gray-400 py-5 text-sm font-bold text-gray-900 lg:w-auto lg:px-0 lg:text-center">
                <li className="lg:w-[33.33%]">專長領域</li>
                <li className="lg:w-[33.33%]">定價</li>
                <li className="lg:w-[33.33%]">是否開放</li>
              </ul>
              <div className="w-full space-y-4 px-3 pt-5 lg:px-0 lg:pt-7">
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
                      onFinish={onFinish}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      {/* PC 課程方案＋定價 */}
                      <div className="flex w-full flex-col space-y-4">
                        {/* 沒有資料時，點擊該主題，會顯示乾淨的input讓諮商師填寫 */}
                        {coursesPriceAry === undefined ? <NoCourses /> : null }
                        {coursesPriceAry?.map((item, i) => (
                          <li className="flex items-center" key={i}>
                            <div className="w-[33.33%]">{item.Item}</div>
                            <Form.Item className="mb-0 lg:w-[33.33%]">
                              <Input
                                disabled={editInfo}
                                placeholder="請填寫價格"
                                className="font-normal"
                                style={{ height: 40, width: 124 }}
                                value={item.Price}
                              />
                            </Form.Item>
                            <Form.Item className="mb-0 lg:w-[33.33%]">
                              <Switch
                                onChange={SwitchOnChange}
                                disabled={editInfo}
                                defaultChecked={item.Availability}
                                className="bg-gray-400"
                              />
                            </Form.Item>
                          </li>
                        ))}
                      </div>
                    </Form>
                  </ConfigProvider>
                </ul>
              </div>
            </div>
            {/* Mobile 課程方案 */}
            <div className="rounded-2xl bg-gray-200 lg:hidden">
              <ul className="flex w-full border-b  border-gray-400 py-5 px-0 text-center text-sm font-bold text-gray-900">
                <li className="w-[33.33%]">專長領域</li>
                <li className="w-[33.33%]">定價</li>
                <li className="w-[33.33%]">是否開放</li>
              </ul>
              <ul className="flex flex-col space-y-4 pt-5 ">
                <li className="items-center space-x-10 rounded-lg text-sm text-primary-heavy">
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
                    <Form form={form} name="classInfo" onFinish={onFinish}>
                      {/* 課程方案＋定價 */}
                      <ul className="flex flex-col space-y-4 pb-7">
                        {coursesPriceAry === undefined ? <NoCourses /> : null }
                        {coursesPriceAry?.map((item, i) => (
                          <li className="flex items-center justify-between" key={i}>
                            <div className="w-[33.33%] text-center">{item.Item}</div>
                            <Form.Item className="mb-0 w-[33.33%] text-center">
                              <Input
                                disabled={editInfo}
                                placeholder="請填寫價格"
                                className="font-normal"
                                style={{ height: 40, width: 96 }}
                                value={item.Price}
                              />
                            </Form.Item>
                            <Form.Item className="mb-0 w-[33.33%] text-center">
                              <Switch
                                defaultChecked={item.Availability}
                                onChange={SwitchOnChange}
                                disabled={editInfo}
                                className="bg-gray-400"
                              />
                            </Form.Item>
                          </li>
                        ))}
                      </ul>
                    </Form>
                  </ConfigProvider>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-row lg:flex">
            <h3 className="mr-2 mb-4 border-t border-gray-400 pt-10 font-bold text-secondary lg:mb-0 lg:w-[10%] lg:border-none lg:pt-0">
              課程特色 *
            </h3>
            <div className="rounded-2xl bg-gray-200 pb-9 lg:w-[90%]">
              <ul className="w-full space-y-4 pt-5 lg:px-0 lg:pt-7">
                <li className="flex w-full flex-col items-center rounded-lg py-5 text-sm text-primary-heavy lg:space-x-10 lg:text-center lg:text-base">
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
                    {/* PC 課程特色 textarea */}
                    <div className="hidden w-full lg:block">
                      <Form
                        form={form}
                        name="classInfo"
                        onFinish={onFinish}
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        {/* 課程特色 */}
                        {coursesFeature === undefined ? <NoCourses /> : null }
                        {coursesFeature?.map((item: string | number | readonly string[] | undefined, i: NamePath | undefined) => (
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
                              onChange={onChange}
                              placeholder={item}
                              disabled={editInfo}
                              value={item}
                            />
                          </Form.Item>
                        ))}
                      </Form>
                    </div>
                    {/* Mobile 課程特色 textarea */}
                    <div className="class-info w-full px-5 lg:hidden">
                      <Form
                        form={form}
                        name="classInfo"
                        onFinish={onFinish}
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        {/* 課程特色 */}
                        {coursesFeature === undefined ? <NoCourses /> : null }
                        {coursesFeature?.map((item: string | number | readonly string[] | undefined, i: NamePath | undefined) => (
                          <Form.Item
                            name={i}
                            label={`特色 ${i + 1}`}
                            className="mb-8"
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
                              style={{ height: 69, resize: 'none' }}
                              onChange={onChange}
                              placeholder={item}
                              disabled={editInfo}
                              value={item}
                            />
                          </Form.Item>
                        ))}
                      </Form>
                    </div>
                  </ConfigProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <input
          type="button"
          value="刪除此專長領域"
          className="mt-4 text-base text-gray-900 underline underline-offset-2 hover:text-red-500"
        />
      </div>
      <div className="mt-12 flex justify-end space-x-7">
        {!editInfo && (
        <IButton
          text="儲存"
          fontSize="text-[14px] lg:text-base"
          px="px-[66px] lg:px-[74px]"
          py="py-4"
          mode="dark"
          onClick={() => setEditInfo(true)}
          extraStyle={isHidden}
        />
        )}
        <IButton
          text="編輯"
          fontSize="text-[14px] lg:text-base"
          px="px-[66px] lg:px-[74px]"
          py="py-4"
          mode="light"
          onClick={() => setEditInfo(false)}
        />
      </div>
    </>
  );
}
