// GET => POST / DELETE 後要重新 GET 渲染畫面 => GPT 建議在 POST RTKQ 加上 onSuccess 屬性刷新
// POST 改 RTKQ
// 調整手機版
import { Button, ConfigProvider, Form, Input, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import {
  useCoursesDataGetQuery,
  useCoursesDataPostMutation,
  useCourseDataDeleteMutation,
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
  // ==================== 取得課程 API RTKQ ====================
  const { data, isLoading } = useCoursesDataGetQuery({ token });

  // ==================== 新增/修改課程 API RTKQ ====================
  const [coursesDataPostMutation] = useCoursesDataPostMutation();

  // ==================== 刪除課程 API RTKQ ====================
  const [CourseDataDeleteMutation] = useCourseDataDeleteMutation();
  const deleteCourse1 = async (token:any, clickId:number) => {
    const res = await CourseDataDeleteMutation({ token, clickId });
    alert(res.data.Message);
    console.log(res);
  };

  // 課程資料
  const [renderData, setRenderData] = useState<any>([]);
  // 課程 id 陣列
  const [FieldIds2, setFieldIds] = useState(null);
  // 點擊膠囊前的預設畫面
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  // 課程方案＋定價
  const [courses, setCourses] = useState(null);
  // 控制渲染表格
  const [renderForm, setRenderForm] = useState('hidden');
  const [renderEmptyForm, setRenderEmptyForm] = useState('hidden');
  //  點擊的膠囊 id
  const [clickId, setClickId] = useState();
  //  篩選出指定 id 的課程方案、價錢
  const [clickFilterAry, setClickFilterAry] = useState([]);
  const [clickFeaturesFilterAry, setClickFeaturesFilterAry] = useState([]);

  // 開啟編輯功能
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const isHidden = isDisabled
    ? '!opacity-0 transform duration-300'
    : '!opacity-100 transform duration-300';

  // 資料回來時，解構 data
  useEffect(() => {
    if (!data) return;
    const {
      Data: { FieldIds, Courses },
    } = data;
    setRenderData(Courses);
    setFieldIds(FieldIds);
    setIsSuccess(data.Success);
    setCourses(renderData?.Course);
    // console.log('isLoading:', data);
    // console.log('renderData:', renderData);
  }, [isLoading, renderData]);

  // Render『單一主題』的課程資訊
  const [getCoursesID, setGetCoursesID] = useState<any>();
  const [featureAry, SetFeatureAry] = useState<any>([]);

  // POST 後，重新觸發 GET
  useEffect(() => {
    setRenderData(data);
    setGetCoursesID(renderData?.Data?.Courses);
    SetFeatureAry(renderData?.Data?.Courses);
    console.log('所有課程:', getCoursesID); // 所有課程物件
    // console.log(featureAry); // 單一課程特色 Ary => 要綁上 fieldId
    // console.log('點擊的膠囊 id:', clickId); //  點擊的膠囊 id
    // console.log(clickId, clickFilterAry);
    // console.log(clickId, clickFeaturesFilterAry);
  }, [
    isLoading,
    renderData,
    getCoursesID,
    featureAry,
    clickId,
    clickFilterAry,
    clickFeaturesFilterAry,
  ]);
  // POST 後，重新觸發 GET
  useEffect(() => {
    setRenderData(data);
  }, [isLoading, data]);

  useEffect(() => {
    getCoursesID?.filter((item, i) => {
      // console.log('點擊取得相應課程ID data：', item);
      SetFeatureAry(item.Feature);
    });
  }, [renderData, getCoursesID, featureAry, clickId]);

  // 『課程特色』保留 placeholder 的值
  const [featureStates, setFeatureStates] = useState(featureAry || []);

  // 判斷『單一主題』課程資訊，
  const courseNotExist = data?.Data?.Courses[getCoursesID]?.FieldId === undefined;

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

  // 儲存 Get API 的狀態碼
  const [statusCode, setStatusCode] = useState<number>();
  // 因為 RTKQ 取 res.status 卡關，所以多寫了這個 get axios
  useEffect(() => {
    // axios 當測試，最後要用 redux 打 API ，才能一次管理多種狀態
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
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

  // ==================== 判斷膠囊id，控制表格渲染 ====================
  function changeRenderForm(id:number) {
    if (FieldIds2?.includes(id)) {
      setRenderForm('block');
      setRenderEmptyForm('hidden');
      setClickId(id);
      console.log('clickId:', clickId);
      return;
    }
    setRenderForm('hidden');
    setRenderEmptyForm('block');
    setClickId(id);
    console.log(clickId);
  }

  // ==================== 待修改：送出表單 ====================
  // const courseItemAry = ['一堂', '三堂', '五堂', '體驗課一堂'];
  // const courseQuantityAry = [1, 3, 5, 1];
  // const handleSubmit = async (values: any) => {
  //   console.log(values);
  //   const { Feature1, Feature2, Feature3, Feature4, Feature5, Price0, Price1, Price2, Price3, Availability0, Availability1, Availability2, Availability3 } = values;
  //   // 組成 POST 用的 Features
  //   const Features = {
  //     Feature1,
  //     Feature2,
  //     Feature3,
  //     Feature4,
  //     Feature5,
  //   };

  //   // 組成 POST 用的 Courses
  //   const Courses = [
  //     {
  //       Item: courseItemAry[0],
  //       Quantity: courseQuantityAry[0],
  //       Price: parseInt(Price0),
  //       Availability: Availability0,
  //     },
  //     {
  //       Item: courseItemAry[1],
  //       Quantity: courseQuantityAry[1],
  //       Price: parseInt(Price1),
  //       Availability: Availability1,
  //     }, {
  //       Item: courseItemAry[2],
  //       Quantity: courseQuantityAry[2],
  //       Price: parseInt(Price2),
  //       Availability: Availability2,
  //     },
  //     {
  //       Item: courseItemAry[3],
  //       Quantity: courseQuantityAry[3],
  //       Price: parseInt(Price3),
  //       Availability: Availability3,
  //     },
  //   ];

  //   // 取出的資料回傳 POST
  //   const res = await coursesDataPostMutation({ token, clickId, Courses, Features });
  //   setIsDisabled(true);
  //   alert(res.data.Message);
  //   console.log(res);
  // };

  const courseItemAry = ['一堂', '三堂', '五堂', '體驗課一堂'];
  const courseQuantityAry = [1, 3, 5, 1];

  // 更新 Features
  const updateFeatures = (values: any, originalFeatures: any) => {
    const updatedFeatures = { ...originalFeatures };
    if (values.Feature1) updatedFeatures.Feature1 = values.Feature1;
    if (values.Feature2) updatedFeatures.Feature2 = values.Feature2;
    if (values.Feature3) updatedFeatures.Feature3 = values.Feature3;
    if (values.Feature4) updatedFeatures.Feature4 = values.Feature4;
    if (values.Feature5) updatedFeatures.Feature5 = values.Feature5;
    return updatedFeatures;
  };

  // 更新 Courses
  const updateCourses = (values: any, originalCourses: any) => {
    if (!originalCourses || typeof originalCourses[Symbol.iterator] !== 'function') {
      originalCourses = []; // 如果不是可迭代對象，則初始化為空陣列
    }
    const updatedCourses = [...originalCourses];
    if (values.Course0) {
      updatedCourses[0] = {
        ...originalCourses[0],
        Quantity: values.Course0.Quantity || originalCourses[0].Quantity,
        Price: values.Course0.Price || originalCourses[0].Price,
        Availability: values.Course0.Availability || originalCourses[0].Availability,
      };
    }
    if (values.Course1) {
      updatedCourses[1] = {
        ...originalCourses[1],
        Quantity: values.Course1.Quantity || originalCourses[1].Quantity,
        Price: values.Course1.Price || originalCourses[1].Price,
        Availability: values.Course1.Availability || originalCourses[1].Availability,
      };
    }
    if (values.Course2) {
      updatedCourses[2] = {
        ...originalCourses[2],
        Quantity: values.Course2.Quantity || originalCourses[2].Quantity,
        Price: values.Course2.Price || originalCourses[2].Price,
        Availability: values.Course2.Availability || originalCourses[2].Availability,
      };
    }
    if (values.Course3) {
      updatedCourses[3] = {
        ...originalCourses[3],
        Quantity: values.Course3.Quantity || originalCourses[3].Quantity,
        Price: values.Course3.Price || originalCourses[3].Price,
        Availability: values.Course3.Availability || originalCourses[3].Availability,
      };
    }
    return updatedCourses;
  };
  // ==================== 送出表單 ====================
  const handleSubmit = async (values: any, originalFeatures: any, originalCourses: any) => {
    console.log(values);
    const { Feature1, Feature2, Feature3, Feature4, Feature5 } = values;
    const Features = updateFeatures(values, originalFeatures);

    const Courses = updateCourses(values, originalCourses);

    // 取出的資料回傳 PUT
    const res = await coursesDataPostMutation({
      token,
      clickId,
      Courses,
      Features,
    });
    setIsDisabled(true);
    alert(res.data.Message);
    console.log(res);
  };

  return (
    <div className=" space-y-10 px-5 lg:mt-2 lg:space-y-12 ">
      <div className="flex-row lg:flex">
        <h3 className="mr-2 mb-4 text-base font-bold text-secondary lg:mb-0 lg:w-[10%]">
          專長領域 *
        </h3>
        <div className="flex flex-wrap justify-around lg:w-[80%] lg:flex-nowrap lg:justify-between lg:space-x-3">
          {/* 渲染膠囊 => 有資料藍色，無資料灰色 */}
          {classTopic.map(({ topicName, id }) => (FieldIds2?.includes(id) ? (
            <IButton
              text={topicName}
              fontSize="text-[14px]"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
              key={id}
              onClick={() => {
                changeRenderForm(id);
                console.log('取clickID筆資料：', getCoursesID);
                const filterAry = getCoursesID.filter(
                  (item) => item.FieldId === id,
                );
                const featuersfilterAry = getCoursesID.filter(
                  (item) => item.FieldId === id,
                );
                const { Course } = filterAry[0];
                const { Feature } = featuersfilterAry[0];
                setIsSuccess(false);
                setClickFilterAry(Course);
                setClickFeaturesFilterAry(Feature);
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
                setIsSuccess(false);
              }}
            />
          )))}
        </div>
      </div>
      <div className="space-y-10 lg:space-y-12 ">
        <div className="relative flex-row lg:flex">
          <h3 className="mr-2 mb-4 border-t border-gray-400 pt-10 font-bold text-secondary lg:mb-0 lg:w-[10%] lg:border-none lg:pt-0">
            課程方案 *
          </h3>
          {/* PC 課程方案 */}
          {/* 判斷有無課程資料，渲染課程方案、課程特色 */}
          {FieldIds2?.length === 0 && (
            <NoCourses text="尚未新增課程資訊" height="h-[338px]" />
          )}
          {/* 點擊膠囊前，初始畫面 */}
          {isSuccess && (
            <NoCourses text="請先選擇專長領域" height="h-[338px]" />
          )}
          <div
            className={`w-[90%] rounded-2xl bg-gray-200 pb-9 ${
              isSuccess ? 'hidden' : ''
            }`}
          >
            <ul className="flex w-full border-b  border-gray-400 py-5 text-sm font-bold text-gray-900 lg:w-auto lg:px-0 lg:text-center">
              <li className="lg:w-[33.33%]">課程方案</li>
              <li className="lg:w-[33.33%]">定價</li>
              <li className="lg:w-[33.33%]">是否開放</li>
            </ul>
            <div className="w-full space-y-4 px-3 pt-5 lg:px-0 lg:pt-7">
              <RenderEmptyForm renderEmptyForm={renderEmptyForm} clickId={clickId} />
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
                    onFinish={handleSubmit}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <div className="flex w-full flex-col space-y-4">
                      {clickFilterAry?.map(
                        ({ Item, Price, Availability }, i) => (
                          <li className="flex items-center" key={i}>
                            <div className="w-[33.33%]">{Item}</div>
                            <Form.Item
                              className="mb-0 lg:w-[33.33%]"
                              name={`Price${i}`}
                            >
                              <Input
                                disabled={isDisabled}
                                placeholder={Price ?? '請填寫價格'}
                                className="font-normal"
                                style={{ height: 40, width: 124 }}
                              />
                            </Form.Item>
                            <Form.Item
                              className="mb-0 lg:w-[33.33%]"
                              name={`Availability${i}`}
                            >
                              <Switch
                                onChange={SwitchOnChange}
                                disabled={isDisabled}
                                defaultChecked={Availability}
                                className="bg-gray-400"
                              />
                            </Form.Item>
                          </li>
                        ),
                      )}
                    </div>
                    <div className="mt-20">
                      {clickFeaturesFilterAry?.map((item, i) => (
                        <Form.Item
                          name={`Feature${i + 1}`}
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
                      ))}
                    </div>
                    <Form.Item className={!courseNotExist ? 'hidden' : ''}>
                      {/* btns */}
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
                      <div className="flex justify-end">
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
          </div>
        </div>
      </div>
    </div>
  );
}
