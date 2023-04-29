/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ConfigProvider, Form, Input, Switch, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import CustomAlert from '@/common/helpers/customAlert';
import { v4 as uuidv4 } from 'uuid';
import { ICourseItem, IupdateFeatures } from '@/types/interface';
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
  // ==================== alert Modal ====================
  const [modal, alertModal] = Modal.useModal();

  // ==================== 取得課程 API ====================
  const { data, isLoading, refetch } = useCoursesDataGetQuery({ token });

  // ==================== 新增/修改課程 API ====================
  const [coursesDataPostMutation] = useCoursesDataPostMutation();

  // ==================== 刪除課程 API ====================
  const [CourseDataDeleteMutation] = useCourseDataDeleteMutation();
  const deleteCourse = async (clickId:number) => {
    const res = await CourseDataDeleteMutation({ token, clickId });
    refetch();
    const { Message } = (res as { data: { Message: string } }).data;
    CustomAlert({ modal, Message, type: 'success' });
  };

  // 課程資料
  const [renderData, setRenderData] = useState<any>([]);
  // 課程 id 陣列
  const [FieldIds2, setFieldIds] = useState(null);
  // 點擊膠囊前的預設畫面
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  // 課程方案＋定價
  const [courses, setCourses] = useState<ICourseItem>();
  // 控制渲染表格
  const [renderForm, setRenderForm] = useState('hidden');
  const [renderEmptyForm, setRenderEmptyForm] = useState('hidden');
  //  點擊的膠囊 id
  const [clickId, setClickId] = useState<number>();
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
  }, [isLoading, renderData]);

  // Render『單一主題』的課程資訊
  const [getCoursesID, setGetCoursesID] = useState<any>();
  const [featureAry, SetFeatureAry] = useState<string[]>([]);

  // POST 後，重新觸發 GET
  useEffect(() => {
    setRenderData(data);
    setGetCoursesID(renderData?.Data?.Courses);
    SetFeatureAry(renderData?.Data?.Courses);
  }, [
    isLoading,
    renderData,
    getCoursesID,
    featureAry,
    clickId,
    clickFilterAry,
    clickFeaturesFilterAry,
    data,
  ]);

  useEffect(() => {
    getCoursesID?.filter(((item:any) => SetFeatureAry(item.Feature)));
  }, [renderData, getCoursesID, featureAry, clickId]);

  // 判斷『單一主題』課程資訊
  const courseNotExist = data?.Data?.Courses[getCoursesID]?.FieldId === undefined;

  // Form
  const [form] = Form.useForm();

  // ==================== 判斷膠囊id，控制表格渲染 ====================
  function changeRenderForm(id: number): void {
    if ((FieldIds2 as unknown as number[])?.includes(id)) {
      setRenderForm('block');
      setRenderEmptyForm('hidden');
      setClickId(id);
      return;
    }
    setRenderForm('hidden');
    setRenderEmptyForm('block');
    setClickId(id);
  }

  // ==================== 送出表單 ====================
  const courseItemAry = ['一堂', '三堂', '五堂', '體驗課一堂'];
  const courseQuantityAry = [1, 3, 5, 1];

  // 更新 Features
  const updateFeatures = (values: IupdateFeatures, originalFeatures: IupdateFeatures) => {
    const updatedFeatures = { ...originalFeatures };
    if (values.Feature1) updatedFeatures.Feature1 = values.Feature1;
    if (values.Feature2) updatedFeatures.Feature2 = values.Feature2;
    if (values.Feature3) updatedFeatures.Feature3 = values.Feature3;
    if (values.Feature4) updatedFeatures.Feature4 = values.Feature4;
    if (values.Feature5) updatedFeatures.Feature5 = values.Feature5;
    return updatedFeatures;
  };

  const handleSubmit = async (values: any) => {
    const { Availability0, Availability1, Availability2, Availability3, Price0, Price1, Price2, Price3 } = values;
    const Features = updateFeatures(values, form.getFieldValue('Features'));
    const Courses = [
      {
        Item: courseItemAry[0],
        Quantity: courseQuantityAry[0],
        Price: parseInt(Price0 ?? '0', 10),
        Availability: Availability0 ?? false,
      },
      {
        Item: courseItemAry[1],
        Quantity: courseQuantityAry[1],
        Price: parseInt(Price1 ?? '0', 10),
        Availability: Availability1 ?? false,
      }, {
        Item: courseItemAry[2],
        Quantity: courseQuantityAry[2],
        Price: parseInt(Price2 ?? '0', 10),
        Availability: Availability2 ?? false,
      },
      {
        Item: courseItemAry[3],
        Quantity: courseQuantityAry[3],
        Price: parseInt(Price3 ?? '0', 10),
        Availability: Availability3 ?? false,
      },
    ];

    type AvailabilityItem = boolean | undefined;
    const AvailabilityAry: AvailabilityItem[] = [Availability0, Availability1, Availability2, Availability3];

    if (AvailabilityAry.every((item: AvailabilityItem) => item === undefined || item === false)) {
      const Message = '請至少開放一種方案';
      CustomAlert({ modal, Message, type: 'error' });
    } else {
      const res = await coursesDataPostMutation({
        token,
        clickId,
        Features,
        Courses,
      });
      setIsDisabled(true);
      refetch();
      const { Message } = (res as { data: { Message: string } }).data;
      CustomAlert({ modal, Message, type: 'success' });
    }
  };

  return (
    <div className=" space-y-10 px-5 lg:mt-2 lg:space-y-12 ">
      <div className="flex-row lg:flex">
        <h3 className="mr-2 mb-4 text-base font-bold text-secondary lg:mb-0 lg:w-[10%]">
          專長領域 *
        </h3>
        <div className="flex flex-wrap justify-around lg:w-[80%] lg:flex-nowrap lg:justify-between lg:space-x-3">
          {/* 渲染膠囊 => 有資料藍色，無資料灰色 */}
          {classTopic.map(({ topicName, id }) => ((FieldIds2 as unknown as number[])?.includes(id) ? (
            <IButton
              text={topicName}
              fontSize="text-[14px]"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
              key={id}
              onClick={() => {
                changeRenderForm(id);
                const filterAry = getCoursesID.filter(
                  (item:any) => item.FieldId === id,
                );
                const featuersfilterAry = getCoursesID.filter(
                  (item:any) => item.FieldId === id,
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
          <h3 className="mr-2 mb-4 border-t border-gray-400 pt-10 font-bold text-secondary lg:mb-0 lg:w-[11%] lg:border-none lg:pt-0">
            課程方案 *
          </h3>
          {/* 點擊膠囊前，初始畫面 */}
          {isSuccess && (
            <NoCourses text="請先選擇專長領域" height="h-[338px] !z-10" />
          )}
          <div
            className={`lg:w-[90%] rounded-2xl bg-gray-200 pb-9 ${
              isSuccess ? 'hidden' : ''
            }`}
          >
            <ul className="rounded-2xl flex w-full border-b  border-gray-400 py-5 text-sm font-bold text-gray-900 lg:w-auto lg:px-0 text-center">
              <li className="w-[33.33%]">課程方案</li>
              <li className="w-[33.33%]">定價</li>
              <li className="w-[33.33%]">是否開放</li>
            </ul>
            <div className="w-full space-y-4 px-3 pt-5 lg:px-0 lg:pt-7">
              <RenderEmptyForm renderEmptyForm={renderEmptyForm} clickId={clickId as unknown as number} />
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
                          <li className="flex items-center text-center" key={uuidv4()}>
                            <div className="w-[33.33%]">{Item}</div>
                            <Form.Item
                              className="mb-0 w-[33.33%]"
                              name={`Price${i}`}
                            >
                              <Input
                                disabled={isDisabled}
                                name={`Price${i}`}
                                placeholder={Price ?? '請填寫價格'}
                                className="font-normal"
                                style={{ maxHeight: 40, maxWidth: 124 }}
                              />
                            </Form.Item>
                            <Form.Item
                              className="mb-0 w-[33.33%] text-center"
                              name={`Availability${i}`}
                            >
                              <Switch
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
                            i > 2 && 'lg:ml-[10px]'
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
                            name={`Feature${i + 1}`}
                            maxLength={25}
                            style={{ height: 45, resize: 'none' }}
                            placeholder={item ?? '請輸入課程特色'}
                            disabled={isDisabled}
                            value={item}
                          />
                        </Form.Item>
                      ))}
                    </div>
                    <Form.Item className={!courseNotExist ? 'hidden' : ''}>
                      {/* btns */}
                      <div>
                        <div className="mt-10 flex justify-between px-8 lg:px-14">
                          <input
                            type="button"
                            value="刪除此專長領域"
                            className={`text-base text-gray-600 underline underline-offset-2 ${
                              !isDisabled ? 'hover:text-red-500' : ''
                            }`}
                            onClick={() => deleteCourse(clickId as unknown as number)}
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
          </div>
        </div>
      </div>
    </div>
  );
}
