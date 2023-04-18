// GET => POST / DELETE 後要重新 GET 渲染畫面 => GPT 建議在 POST RTKQ 加上 onSuccess 屬性刷新
// POST => 資料寫死，還沒綁上 form
import { Button, ConfigProvider, Form, Input, Switch, Modal } from 'antd';
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
  // GET 上架課程
  const { data, isLoading } = useCoursesDataGetQuery({ token });
  // POST 新增課程
  const [coursesDataPostMutation] = useCoursesDataPostMutation();

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
    console.log('renderData:', renderData);
  }, [isLoading, renderData]);

  // Render『單一主題』的課程資訊
  const [getCoursesID, setGetCoursesID] = useState<any>();
  const [featureAry, SetFeatureAry] = useState<any>([]);

  // POST 後，重新觸發 GET
  useEffect(() => {
    setRenderData(data);
    setGetCoursesID(renderData?.Data?.Courses);
    SetFeatureAry(renderData?.Data?.Courses);
    // console.log(renderData?.Data?.Courses);
    console.log('所有課程:', getCoursesID); // 所有課程物件
    // console.log(featureAry); // 單一課程特色 Ary => 要綁上 fieldId
    console.log('點擊的膠囊 id:', clickId); //  點擊的膠囊 id
    console.log(clickId, clickFilterAry);
    console.log(clickId, clickFeaturesFilterAry);
  }, [isLoading, renderData, getCoursesID, featureAry, clickId, clickFilterAry, clickFeaturesFilterAry]);

  useEffect(() => {
    getCoursesID?.filter((item, i) => {
      console.log('點擊取得相應課程ID data：', item);
      SetFeatureAry(item.Feature);
    });
  }, [renderData, getCoursesID, featureAry, clickId]);

  // 『課程特色』保留 placeholder 的值
  const [featureStates, setFeatureStates] = useState(featureAry || []);

  // 判斷『單一主題』課程資訊，
  const courseNotExist = data?.Data?.Courses[getCoursesID]?.FieldId === undefined;

  // POST 新增/修改課程 data
  const courseContent = {
    FieldId: clickId,
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
      Feature1: `課程ID：${clickId}`,
      Feature2: '菲菲2',
      Feature3: '菲菲3',
      Feature4: 'ccccc',
      Feature5: 'bbbbb',
    },
  };
  // 新增課程 Axios POST (async/await)
  const addCourse = async () => {
    try {
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
      // alert(response.data.Message); // 換成 alert component
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized');
      } else {
        console.log('Error adding course:', error);
      }
    }
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

  // 判斷膠囊id，控制表格渲染
  function changeRenderForm(id) {
    if (FieldIds2.includes(id)) {
      setRenderForm('block');
      setRenderEmptyForm('hidden');
      setClickId(id);
      console.log(clickId);
      return;
    }
    setRenderForm('hidden');
    setRenderEmptyForm('block');
    setClickId(id);
    console.log(clickId);
  }

  // ==================== 新增/修改課程 API ====================
  // const postCourse = async (token, FieldId, Courses, Features) => {
  //   const res = await coursesDataPostMutation({
  //     token,
  //     FieldId,
  //     Courses,
  //     Features,
  //   });
  //   console.log(res);
  //   if ('error' in res) {
  //     console.log('🚀 ~ file: CounselorSignUpForm.tsx:23 ~ counselorSignUpPost ~ res:', res);
  //     const { Message } = (res.error as { data: { Message: string } }).data;
  //     dispatch(loadingStatus('none'));
  //     customAlert({ modal, Message, type: 'error' });
  //   }
  // };

  // ==================== 新增/修改課程表單 ====================
  // const onFinish = ({ token, FieldId, Courses, Features }) => {
  //   postCourse(token, FieldId, Courses, Features);
  // };

  return (
    <div className=" space-y-10 px-5 lg:mt-2 lg:space-y-12 ">
      <input type="button" value="add" onClick={addCourse} />
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
                console.log(getCoursesID);
                const filterAry = getCoursesID.filter((item) => item.FieldId === id);
                const featuersfilterAry = getCoursesID.filter((item) => item.FieldId === id);
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
        <div className="flex-row lg:flex relative">
          <h3 className="mr-2 mb-4 border-t border-gray-400 pt-10 font-bold text-secondary lg:mb-0 lg:w-[10%] lg:border-none lg:pt-0">
            課程方案 *
          </h3>
          {/* PC 課程方案 */}
          {/* 判斷有無課程資料，渲染課程方案、課程特色 */}
          {statusCode === 400 && (<NoCourses text="請先選擇專長領域" height="h-[338px]" />)}
          {/* 點擊膠囊前，渲染初始畫面 */}
          {isSuccess && (<NoCourses text="請先選擇專長領域" height="h-[338px]" />)}
          <div className={`w-[90%] rounded-2xl bg-gray-200 pb-9 ${isSuccess ? 'hidden' : ''}`}>
            <ul className="flex w-full border-b  border-gray-400 py-5 text-sm font-bold text-gray-900 lg:w-auto lg:px-0 lg:text-center">
              <li className="lg:w-[33.33%]">課程方案</li>
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
                    // onFinish={onFinish}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <div className="flex w-full flex-col space-y-4">
                      {clickFilterAry?.map(({ Item, Price, Availability }, i) => (
                        <li className="flex items-center" key={i}>
                          <Form.Item name="Item" className="w-[33.33%]">
                            <div>{Item}</div>
                          </Form.Item>
                          <Form.Item className="mb-0 lg:w-[33.33%]" name="Price">
                            <Input
                              disabled={isDisabled}
                              placeholder={Price ?? '請填寫價格'}
                              className="font-normal"
                              style={{ height: 40, width: 124 }}
                            />
                          </Form.Item>
                          <Form.Item className="mb-0 lg:w-[33.33%]" name="Availability">
                            <Switch
                              onChange={SwitchOnChange}
                              disabled={isDisabled}
                              defaultChecked={Availability}
                              className="bg-gray-400"
                            />
                          </Form.Item>
                        </li>
                      ))}
                    </div>
                    <div className="mt-20">
                      {clickFeaturesFilterAry?.map((item, i) => (
                        <Form.Item
                          name="Features"
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
                          {/* <TextArea
                            showCount
                            maxLength={25}
                            style={{ height: 45, resize: 'none' }}
                            onChange={(e) => setFeatureStates(e.target.value)}
                            placeholder={item ?? '請輸入課程特色'}
                            disabled={isDisabled}
                            value={item}
                          /> */}
                          <TextArea
                            showCount
                            maxLength={25}
                            style={{ height: 45, resize: 'none' }}
                            onChange={onChange}
                            placeholder={item ?? '請輸入課程特色'}
                            disabled={isDisabled}
                            value={item}
                          />
                          {/* <TextArea
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
                          /> */}
                        </Form.Item>
                      ))}
                    </div>
                    <Form.Item className={!courseNotExist ? 'hidden' : ''}>
                      <div className="mt-10 flex justify-between space-x-5 px-14">
                        <input
                          type="button"
                          value="刪除此專長領域"
                          className={`text-base text-gray-900 underline underline-offset-2 ${
                            !isDisabled ? 'hover:text-red-500' : ''
                          }`}
                          onClick={() => deleteCourse(clickId)}
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
                            className=" btnHoverDark border-none !px-[66px] text-base text-[14px] font-bold w-[168px] text-white shadow-none lg:text-base"
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
      </div>
    </div>
  );
}

