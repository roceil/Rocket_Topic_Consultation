// GET => POST / DELETE 後要重新 GET 渲染畫面 => GPT 建議在 POST RTKQ 加上 onSuccess 屬性刷新
// GET => 渲染表格大卡關，缺一層篩選，現在 GET 的陣列會按順序顯示，而不是按照 ID
// POST => 資料寫死，還沒綁上 form
// DELETE => 資料寫死，還沒綁上 form
import { Button, ConfigProvider, Form, Input, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import {
  useCoursesDataGetQuery,
  useCoursesDataPostMutation,
} from '../../../common/redux/service/counselorCenter';
import { IButton } from '../../../common/components/IButton';
import { classTopic } from '../../../lib/counselorCenterData';
import { RenderEmptyForm } from './RenderEmptyForm';
import { NoCourses } from './NoCourses';

export type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

// 諮商師 > 個人資料 > 課程資訊
export function ClassInfo() {
  const token = getCookie('auth');
  // 用 redux 打 API ，可以一次管理多種狀態
  // GET 上架課程: data 先用 useState 存，當 setRenderData
  const { data, isLoading } = useCoursesDataGetQuery({ token });
  // POST 新增課程
  const [coursesDataPostMutation] = useCoursesDataPostMutation();

  const [renderData, setRenderData] = useState<any>([]);
  const [FieldIds2, setFieldIds] = useState(null);
  useEffect(() => {
    console.log(data);
  }, []);
  useEffect(() => {
    if (!data) return;
    const {
      Data: { FieldIds, Courses },
    } = data;
    setRenderData(Courses);

    setFieldIds(FieldIds);
    console.log(isLoading);
    console.log('isLoading:', data);
  }, [isLoading, renderData]);

  useEffect(() => {
    console.log('renderData:', renderData);
    console.log(renderData?.Course);
  }, [renderData]);

  const [renderForm, setRenderForm] = useState('hidden');
  const [renderEmptyForm, setRenderEmptyForm] = useState('hidden');
  // const [renderEmptyForm, setRenderEmptyForm] = useState('hidden');

  // useEffect(()=>{
  //   if(!data) return
  //   setRenderData(data)
  //   console.log(renderData);
  // },[data,isLoading])

  // POST 後，重新觸發 GET
  useEffect(() => {
    setRenderData(data);
  }, [isLoading]);

  // onSuccess 屬性，這個屬性的值是一個回調函數，當 POST 請求成功時，這個函數就會被執行。在這個回調函數中，我們使用 queryCache.invalidateQueries 方法刷新了 CoursesDataGet 端點的數據。這樣一來，畫面就會重新渲染，並且顯示最新的課程數據。
  // const coursesDataPostMutation = useCoursesDataPostMutation(counselorCenter.CoursesDataPost, {
  //   onSuccess: () => {
  //     queryCache.invalidateQueries('CoursesDataGet');
  //   },
  // });

  // 開啟編輯功能
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const isHidden = isDisabled
    ? '!opacity-0 transform duration-300'
    : '!opacity-100 transform duration-300';

  // 『課程特色』保留 placeholder 的值
  // const [feature, setFeature] = useState<string>('');

  // Render『單一主題』的課程資訊
  const [getCoursesID, setGetCoursesID] = useState<number>(1);
  // 判斷『單一主題』課程資訊，
  const courseNotExist = data?.Data?.Courses[getCoursesID]?.FieldId === undefined;

  // useEffect(() => {
  //   console.log(data?.Data?.Courses[getCoursesID]?.FieldId === undefined);
  // }, [isLoading, getCoursesID]);

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
    // try {
    //   const response = await axios.post(
    //     `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
    //     courseContent,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   console.log('Course added:', response.data);
    //   setIsDisabled(true);
    //   // alert(response.data.Message); // 換成 alert component
    // } catch (error) {
    //   if (error.response && error.response.status === 401) {
    //     console.log('Unauthorized');
    //   } else {
    //     console.log('Error adding course:', error);
    //   }
    // }
  };

  // 刪除課程 Axios DELETE (async/await)
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

  // 新增課程 Axios POST (.Then)
  // useEffect(() => {
  //   {
  //     axios
  //       .post(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
  //         {
  //           FieldId: 4,
  //           Courses: [
  //             {
  //               Item: '一堂',
  //               Quantity: 1,
  //               Price: 2000,
  //               Availability: false,
  //             },
  //             {
  //               Item: '三堂',
  //               Quantity: 3,
  //               Price: 5000,
  //               Availability: false,
  //             },
  //             {
  //               Item: '五堂',
  //               Quantity: 5,
  //               Price: 9000,
  //               Availability: false,
  //             },
  //             {
  //               Item: '體驗課一堂',
  //               Quantity: 1,
  //               Price: 0,
  //               Availability: false,
  //             },
  //           ],
  //           Features:
  //             {
  //               Feature1: '菲菲POST 1',
  //               Feature2: '菲菲POST 2',
  //               Feature3: '菲菲POST 3',
  //               Feature4: null,
  //               Feature5: null,
  //             },
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         },
  //       )
  //       .then((response) => {
  //         console.log('Course added:', response.data);
  //       })
  //       .catch((error) => {
  //         if (error.response && error.response.status === 401) {
  //           console.log('Unauthorized');
  //         } else {
  //           console.log('Error adding course:', error);
  //         }
  //       });
  //   }
  // }, [isLoading, data]);

  // 儲存 Get API 的狀態碼
  // const [statusCode, setStatusCode] = useState<number>();
  // 因為 RTKQ 取 res.status 卡關，所以多寫了這個 get axios
  // useEffect(() => {
  //   // axios 當測試，最後要用 redux 打 API ，才能一次管理多種狀態
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log('res', res);
  //       const { status } = res;
  //       setStatusCode(status);
  //     });
  // }, [isLoading]);

  // 讓 GET 回傳的資料，根據 onClick 顯示在對應的膠囊頁面
  // 方法一：取陣列第[getCoursesID - 1]筆
  // 結果：=> 非同步，第一次點擊會渲染錯誤
  // 課程方案
  const coursesPriceAry = data?.Data?.Courses[getCoursesID - 1]?.Course;
  // 課程特色
  const coursesFeature = data?.Data?.Courses[getCoursesID - 1]?.Feature;

  // 方法二：coursesPriceAry、coursesFeature 都設為 useState
  // 結果：=> 非同步，第一次點擊會渲染錯誤
  // 課程方案
  // const [coursesPriceAry, setCoursesPriceAry] = useState<any>(data?.Data?.Courses[getCoursesID - 1]?.Course);
  // 課程特色
  // const [coursesFeature, setCoursesFeature] = useState<any>(data?.Data?.Courses[getCoursesID - 1]?.Feature);

  // 方法三：coursesPriceAry、coursesFeature 設 useState 後，再加一層 .filter
  // filter() 過濾陣列項目，只保留符合條件的項目。在這裡，我們使用 includes() 方法來判斷 data?.Data?.FieldIds 中是否包含該項目的 fieldId，如果包含就保留該項目。
  // 結果：=> onClick 無法觸發
  // 課程方案
  // let filteredPriceAry = coursesPriceAry?.filter((item) => data?.Data?.FieldIds.includes(
  //   data?.Data?.Courses[getCoursesID - 1]?.FieldId,
  // ));
  // 課程特色
  // let filteredFeature = coursesFeature?.filter((item) => data?.Data?.FieldIds.includes(
  //   data?.Data?.Courses[getCoursesID - 1]?.FieldId,
  // ));

  // onClick 事件處理函式
  // const handleClick = (item: any) => {
  //   setGetCoursesID(item.id);
  //   filteredPriceAry = data?.Data?.Courses[item.id - 1]?.Course?.filter(
  //     (course: any) => data?.Data?.FieldIds.includes(item.fieldId),
  //   );
  //   filteredFeature = data?.Data?.Courses[item.id - 1]?.Feature?.filter(
  //     (feature: any) => data?.Data?.FieldIds.includes(item.fieldId),
  //   );
  //   setCoursesPriceAry(filteredPriceAry);
  //   setCoursesFeature(filteredFeature);
  // };

  useEffect(() => {
    console.log(data);
    // console.log('useEffect 取得的 getCoursesID：', getCoursesID);
  }, [getCoursesID]);

  // 判斷有無課程資料，渲染課程方案、課程特色
  // const renderNoCoursesSection = () => (statusCode === 400 ? <NoCourses /> : null);

  // Form
  const [form] = Form.useForm();

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

  // function changeRenderForm(id) {
  //   if (FieldIds2?.includes(id)) {
  //     // setRenderForm('block');
  //     setRenderEmptyForm('hidden');
  //     return;
  //   }
  //   if (!FieldIds2?.includes(id)) {
  //     // setRenderForm('hidden');
  //     console.log(123);

  //     setRenderEmptyForm('block');
  //   }
  // }

  function changeRenderForm(id) {
    console.log(FieldIds2);

    if (FieldIds2.includes(id)) {
      setRenderForm('block');
      setRenderEmptyForm('hidden');
      return;
    }
    setRenderForm('hidden');
    setRenderEmptyForm('block');
    console.log(11);
  }

  // RTKQ POST 課程資訊後，用 queryCache.invalidateQueries 方法刷新 CoursesDataGet 端點的數據。使畫面重新渲染，顯示最新的課程數據。
  const postCourse = async () => {
    // try {
    //   await coursesDataPostMutation.mutate({ courseContent, token });
    //   queryCache.invalidateQueries('CoursesDataGet');
    // } catch (err) {
    //   console.error(err);
    // }

    const res = await coursesDataPostMutation({ courseContent, token });
    console.log(res);
  };

  return (
    <div className=" space-y-10 px-5 lg:mt-2 lg:space-y-12 ">
      <div className="flex-row lg:flex">
        <h3 className="mr-2 mb-4 text-base font-bold text-secondary lg:mb-0 lg:w-[10%]">
          專長領域 *
        </h3>
        <div className="flex flex-wrap justify-around lg:w-[80%] lg:flex-nowrap lg:justify-between lg:space-x-3">
          {/* 判斷有無該課程資料，渲染膠囊 => 有資料藍色，無資料灰色 */}
          {classTopic.map(({ topicName, id }) => (FieldIds2?.includes(id) ? (
            <IButton
              text={topicName}
              fontSize="text-[14px]"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
              key={id}
              onClick={() => {
                changeRenderForm(id);
              }}
            />
          ) : (
            <IButton
              text={topicName}
              fontSize="text-[14px] !text-gray-600 "
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
              extraStyle="!CounselorCenterNoDataBtn"
              key={id}
              onClick={() => {
                changeRenderForm(id);
              }}
            />
          )))}
          {/* 方法三：結果 => onClick 無法觸發 */}
          {/* {classTopic.map((item) => {
              if (coursesPriceAry && coursesFeature && data?.Data?.FieldIds.includes(item.id)) {
                return (
                  <IButton
                    text={item.topicName}
                    fontSize="text-[14px]"
                    px="w-[104px] lg:w-[112px]"
                    py="py-2 lg:py-[10px]"
                    key={item.id}
                    onClick={() => { handleClick(item.id); console.log(item.id); }}
                  />
                );
              }
              return (
                <IButton
                  text={item.topicName}
                  fontSize="text-[14px] !text-gray-600 "
                  px="w-[104px] lg:w-[112px]"
                  py="py-2 lg:py-[10px]"
                  extraStyle="!CounselorCenterNoDataBtn"
                  key={item.id}
                  onClick={() => { handleClick(item.id); console.log(item.id); }}
                />
              );
            })} */}
        </div>
      </div>
      <div className="space-y-10 lg:space-y-12 ">
        <div className="flex-row lg:flex">
          <h3 className="mr-2 mb-4 border-t border-gray-400 pt-10 font-bold text-secondary lg:mb-0 lg:w-[10%] lg:border-none lg:pt-0">
            課程方案 *
          </h3>
          {/* PC 課程方案 */}
          <NoCourses text="請選擇專業領域" height={'h-[338px]'} />
          <div className="hidden w-[90%] rounded-2xl bg-gray-200 pb-9 lg:block">
            <ul className="flex w-full border-b  border-gray-400 py-5 text-sm font-bold text-gray-900 lg:w-auto lg:px-0 lg:text-center">
              <li className="lg:w-[33.33%]">專長領域</li>
              <li className="lg:w-[33.33%]">定價</li>
              <li className="lg:w-[33.33%]">是否開放</li>
            </ul>
            <div className="w-full space-y-4 px-3 pt-5 lg:px-0 lg:pt-7">
              <RenderEmptyForm renderEmptyForm={renderEmptyForm} />
              <ul
                className={`flex w-full flex-col items-center space-x-10 rounded-lg py-5 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base ${renderForm} `}
              >
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
                    onFinish={postCourse}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    {/* PC 課程方案＋定價 */}
                    <div className="flex w-full flex-col space-y-4">
                      {/* 沒有資料時，點擊該主題，會顯示乾淨的input讓諮商師填寫 */}
                      {renderData?.Course?.map((item, i) => (
                        <li className="flex items-center" key={i}>
                          <div className="w-[33.33%]">{item.Item}</div>
                          <Form.Item className="mb-0 lg:w-[33.33%]">
                            <Input
                              disabled={isDisabled}
                              placeholder={item.Price ?? '請填寫價格'}
                              className="font-normal"
                              style={{ height: 40, width: 124 }}
                              value={item.Price}
                            />
                          </Form.Item>
                          <Form.Item className="mb-0 lg:w-[33.33%]">
                            <Switch
                              onChange={SwitchOnChange}
                              disabled={isDisabled}
                              defaultChecked={item.Availability}
                              className="bg-gray-400"
                            />
                          </Form.Item>
                        </li>
                      ))}
                    </div>
                    <div className="mt-10">
                      {coursesFeature?.map(
                        (
                          item: string | number | readonly string[] | undefined,
                          i: number,
                        ) => (
                          <Form.Item
                            name={i}
                            label={`特色 ${i + 1}`}
                            className={`mb-8 px-5 lg:px-[56px] ${
                              i > 2 && 'ml-[10px]'
                            }`}
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
                              placeholder={item ?? '請輸入課程特色'}
                              disabled={isDisabled}
                              value={item}
                            />
                          </Form.Item>
                        ),
                      )}
                    </div>
                    <Form.Item className={courseNotExist ? 'hidden' : ''}>
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
          </div>
          {/* Mobile 課程方案 */}
          {/* <div className="rounded-2xl bg-gray-200 lg:hidden">
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
                      <ul className="flex flex-col space-y-4 pb-7">
                        {coursesPriceAry === undefined ? <NoCourses /> : null }
                        {coursesPriceAry?.map((item, i) => (
                          <li className="flex items-center justify-between" key={i}>
                            <div className="w-[33.33%] text-center">{item.Item}</div>
                            <Form.Item className="mb-0 w-[33.33%] text-center">
                              <Input
                                disabled={isDisabled}
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
                                disabled={isDisabled}
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
            </div> */}
        </div>
        <div className="flex-row lg:flex">
          <h3 className="mr-2 mb-4 border-t border-gray-400 pt-10 font-bold text-secondary lg:mb-0 lg:w-[10%] lg:border-none lg:pt-0">
            課程特色 *
          </h3>
          <div className="rounded-2xl bg-gray-200 pb-9 lg:w-[90%]">
            <ul className="w-full space-y-4 pt-5 lg:px-0 lg:pt-7">
              <li className="flex w-full flex-col items-center rounded-lg py-5 text-sm text-primary-heavy lg:space-x-10 lg:text-center lg:text-base">
                {/* PC 課程特色 textarea */}
                {/* <div className="hidden w-full lg:block">
                    <Form
                      form={form}
                      name="classInfo"
                      // onFinish={onFinish}
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {coursesFeature === undefined ? <NoCourses /> : null }
                      {coursesFeature?.map((item: string | number | readonly string[] | undefined, i: number) => (
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
                            disabled={isDisabled}
                            value={item}
                          />
                        </Form.Item>
                      ))}
                    </Form>
                  </div> */}
                {/* Mobile 課程特色 textarea */}
                {/* <div className="class-info w-full px-5 lg:hidden">
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
                        {coursesFeature === undefined ? <NoCourses /> : null }
                        {coursesFeature?.map((item: string | number | readonly string[] | undefined, i: number) => (
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
                              disabled={isDisabled}
                              value={item}
                            />
                          </Form.Item>
                        ))}
                      </Form>
                    </div> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
