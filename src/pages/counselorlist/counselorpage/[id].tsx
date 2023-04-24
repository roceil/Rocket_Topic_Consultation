import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ConfigProvider, Modal, Radio, RadioChangeEvent, Select } from 'antd';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useCloseLoading from '@/common/hooks/useCloseLoading';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import { useAddToCartPostMutation } from '@/common/redux/service/counselorPage';
import { IButton } from '@/common/components/IButton';
import { counselorPageBreadcrumb } from '@/lib/counselorPage/CounselorPageData';
import checkCircle from 'public/images/check-circle.svg';
import convertFieldId from '@/common/helpers/convertFieldId';
import RegularQuestion from '@/modules/counselorPage/RegularQuestion';
import UserComment from '@/modules/counselorPage/UserComment';
import CounsleorCalendar from '@/modules/counselorPage/CounselorCalendar';
import CounselorVideo from '@/modules/counselorPage/CounselorVideo';
import CounselorRate from '@/modules/counselorPage/CounselorRate';
import CounselorInformation from '@/modules/counselorPage/CounselorInformation';
import { ICounselorPageProps, ICourses, IFilterCases } from '@/types/interface';
import customAlert from '@/common/helpers/customAlert';
import CustomHead from '@/common/components/CustomHead';

// 使用axios取得path
export const getServerSidePaths = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profiles?page=`,
  );
  const { data } = res;
  const paths = data.map((counselor: { id: { toString: () => string } }) => ({
    params: { id: counselor.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

// 使用axios取得props
export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profile?id=${params.id}`,
  );
  const { data } = res;
  return {
    props: {
      data,
      counselorId: params.id,
    },
  };
};

// Server 渲染步驟 ＝ 渲染諮商師個人資料 => 渲染諮商師的專長領域選項 => 渲染專長領域的說明文字 => 渲染諮商師的課程方案
// Client 互動步驟 ＝ 選擇專長領域 => 選擇課程方案 => 加入購物車

export default function CounselorPage({
  data,
  counselorId,
}: {
  data: ICounselorPageProps;
  counselorId: string;
}) {
  // ==================== 關閉 loading ====================
  useCloseLoading();
  const [modal, alertModal] = Modal.useModal();
  const openLoading = useOpenLoading();
  const dispatch = useDispatch();
  const [addToCartPost] = useAddToCartPostMutation();
  const token = getCookie('auth');
  const identity = getCookie('identity');
  const clickUserId = getCookie('userID');
  const router = useRouter();
  const { Name, FieldTags, Photo, SelfIntroduction, Fields, VideoLink = null } = data.Data;
  const [chooseCase, setChooseCase] = useState(null);

  // ==================== Server 渲染畫面 ====================
  // 取得專長領域的選項
  const FieldOptions = Fields.map(({ Field }: { Field: string }) => ({
    label: Field,
    value: Field,
  }));

  // 渲染專長領域
  const [chooseTopic, setChooseTopic] = useState(FieldOptions[0].value);

  // 渲染專長領域的說明文字
  const [topicFeature, setTopicFeature] = useState(Fields[0].Features);

  // 取得課程方案的選項 => 拿到資料後，再把資料依條件轉換成選項
  const topicOptions = Fields.map(({ Courses }: { Courses: ICourses[] }) => {
    const courseOptions = Courses.map(
      ({ Item, Price }: { Item: string; Price: number }) => {
        if (Item === '體驗課一堂') {
          return {
            label: `體驗課 60分鐘 / ${Price.toLocaleString()} 元`,
            value: Item,
          };
        }
        if (Item === '一堂') {
          return {
            label: `${Item} 60分鐘 / ${Price.toLocaleString()} 元`,
            value: Item,
          };
        }
        if (Item === '三堂') {
          return {
            label: `${Item} 3小時 / ${Price.toLocaleString()} 元`,
            value: Item,
          };
        }
        if (Item === '五堂') {
          return {
            label: `${Item} 5小時 / ${Price.toLocaleString()} 元`,
            value: Item,
          };
        }
        return { label: `${Item} / ${Price.toLocaleString()} 元`, value: Item };
      },
    );
    return courseOptions;
  });

  // 渲染課程方案的選項
  const [chooseCourse, setChooseCourse] = useState(topicOptions[0]);

  // ==================== Client 畫面互動 ====================

  // 課程方案篩選
  const filterCase = (value: string) => Fields?.flatMap((item: { Courses: ICourses[]; Field: string }) => {
    const convertData = item.Courses.filter(() => value === item.Field).map(
      ({ Item, Price }) => {
        if (Item === '體驗課一堂') {
          return {
            label: `體驗課 60分鐘 / ${Price.toLocaleString()} 元`,
            value: Item,
          };
        }
        if (Item === '一堂') {
          return {
            label: `${Item} 60分鐘 / ${Price.toLocaleString()} 元`,
            value: Item,
          };
        }
        if (Item === '三堂') {
          return {
            label: `${Item} 3小時 / ${Price.toLocaleString()} 元`,
            value: Item,
          };
        }
        if (Item === '五堂') {
          return {
            label: `${Item} 5小時 / ${Price.toLocaleString()} 元`,
            value: Item,
          };
        }
        return {
          label: `${Item} / ${Price.toLocaleString()} 元`,
          value: Item,
        };
      },
    );
    return convertData;
  });

  // 課程特色篩選
  const filterFeature = (value: string) => Fields.filter((item: { Field: string }) => value === item.Field).map(
    (item2: { Features: string }) => item2.Features,
  );

  // 手機更改主題函式
  const changeCase = (value: string) => {
    setChooseTopic(value);

    // 如果選擇的value跟Fields的Field相同，就回傳轉換後的Courses
    const filter = filterCase(value);
    setChooseCourse(filter);

    // 如果選擇的value跟Fields的Field相同，就回傳Features
    const filterFeatureAry = filterFeature(value);
    setTopicFeature(filterFeatureAry[0]);
  };

  // 電腦更改主題函式
  const changeCasePC = ({ target: { value } }: RadioChangeEvent) => {
    // 更新選擇的專長領域 => 之後要用來轉成專長領域ID
    setChooseTopic(value);

    // 如果選擇的value跟Fields的Field相同，就回傳轉換後的Courses
    const filter = filterCase(value);
    setChooseCourse(filter);

    // 如果選擇的value跟Fields的Field相同，就回傳Features
    const filterFeatureAry = filterFeature(value);
    setTopicFeature(filterFeatureAry[0]);
  };

  // 選擇方案函式
  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    setChooseCase(value);
  };

  // 手刀預約（加入購物車）
  const addToCart = async () => {
    if (!token) {
      router.push('/login');
      return;
    }
    if (identity === 'counselor') {
      customAlert({ modal, Message: '諮商師無法預約，請更換帳號', type: 'error' });
      return;
    }

    if (!chooseCase) {
      customAlert({ modal, Message: '請選擇方案', type: 'error' });
      return;
    }
    openLoading();
    const FieldId = convertFieldId(chooseTopic);
    const CounselorId = Number(counselorId);

    const res = await addToCartPost({
      token,
      CounselorId,
      FieldId,
      chooseCase,
    });

    if ('error' in res) {
      console.log('🚀 ~ file: [id].tsx:167 ~ addToCart ~ res:', res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      useCloseLoading();
      customAlert({ modal, Message, type: 'error' });
    }

    const { data: resData } = res as {
      data: { Success: boolean; Message: string };
    };

    if (resData && resData.Success) {
      customAlert({
        modal,
        Message: resData.Message,
        type: 'success',
        router,
        link: '/shoppingcart',
      });
    } else {
      useCloseLoading();
      customAlert({
        modal,
        Message: resData?.Message || '加入購物車失敗',
        type: 'error',
      });
    }
  };

  // 打開聊天室
  const startChat = () => {
    if (identity === 'user') {
      dispatch({
        type: 'chatRoomSwitch/chatRoomSwitch',
        payload: {
          isChatRoomOpen: true,
          clickUserId,
          clickCounselorId: Number(counselorId),
        },
      });
    }
  };

  // ==================== GSAP ====================
  gsap.registerPlugin(ScrollTrigger);
  const caseRef = useRef(null);

  useEffect(() => {
    gsap.to('#case', {
      x: 0,
      y: 1000,
      scrollTrigger: {
        trigger: '#case',
        start: 'top 206px',
        end: 'bottom -800px',
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <CustomHead
        pageTitle={Name}
        pageImage={Photo}
        pageDescription={SelfIntroduction}
      />

      {/* 諮商師資料 */}
      <CounselorInformation
        counselorPageBreadcrumb={counselorPageBreadcrumb}
        Photo={Photo}
        Name={Name}
        SelfIntroduction={SelfIntroduction}
        FieldTags={FieldTags}
      />

      {/* 預約課程 */}
      <section ref={caseRef} className="lg:container lg:flex lg:justify-between lg:py-[148px]">
        {/* 手機版 */}
        <div>
          {/* 預約課程 */}
          <div className="py-20 lg:pt-0 lg:pb-14">
            <div className="container">
              <h2 className="mb-[55px] text-center lg:text-left">預約課程</h2>

              {/* 課程內容 */}
              <div className="flex flex-col items-center ">
                <div className="mb-9 flex w-full items-center justify-start lg:mb-10 lg:flex-col lg:items-start">
                  <span className="font-bold text-secondary lg:mb-3">
                    我想了解：
                  </span>

                  {/* 手機版 topic下拉選單 */}
                  <div className="w-[151px] lg:hidden">
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: '#4A5364',
                          colorText: '#4A5364',
                          colorBorder: '#4A5364',
                          borderRadius: 10,
                          colorFillSecondary: '#4A5364',
                        },
                      }}
                    >
                      <Select
                        defaultValue={FieldOptions[0].label}
                        style={{ width: '100%' }}
                        options={FieldOptions}
                        onChange={changeCase}
                        getPopupContainer={(node) => {
                          if (node) {
                            return node.parentNode;
                          }
                          return document.body;
                        }}
                      />
                    </ConfigProvider>
                  </div>

                  {/* 電腦版方案選擇 */}
                  <div className="hidden lg:block">
                    <ConfigProvider
                      theme={{
                        token: {
                          borderRadius: 10,
                          colorPrimary: '#4A5364',
                          colorPrimaryActive: '#4A5364',
                          colorPrimaryHover: '#4A5364',
                          colorBgContainer: '#FFFCF6',
                          controlHeight: 45,
                          colorText: '#4A5364',
                          fontSize: 14,
                        },
                      }}
                    >
                      <Radio.Group
                        defaultValue={FieldOptions[0].label}
                        buttonStyle="solid"
                        onChange={changeCasePC}
                      >
                        {FieldOptions.map(
                          ({ value, label }: IFilterCases, index: number) => {
                            if (index === 0) {
                              return (
                                <Radio.Button
                                  key={value}
                                  className="!fakeBorder w-[112px] !rounded-full !text-center !font-semibold"
                                  value={value}
                                >
                                  {label}
                                </Radio.Button>
                              );
                            }
                            return (
                              <Radio.Button
                                key={value}
                                className="!fakeBorder ml-4 w-[112px] !rounded-full !text-center !font-semibold"
                                value={value}
                              >
                                {label}
                              </Radio.Button>
                            );
                          },
                        )}
                      </Radio.Group>
                    </ConfigProvider>
                  </div>
                </div>

                {/* 文案列表區塊 */}
                <ul className="mb-20 flex w-full flex-col items-start space-y-5 lg:mb-0">
                  {topicFeature.map((featureTxt: string) => {
                    if (featureTxt) {
                      return (
                        <li className="flex max-w-[340px] items-center space-x-3 lg:max-w-none">
                          <Image
                            src={checkCircle}
                            alt="checkCircle_icon"
                            width={17.5}
                            height={17.5}
                          />
                          <p className="text-gray-900">{featureTxt}</p>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>

                {/* 手機版方案選擇 */}
                <div className=" relative w-full max-w-[340px] rounded-2xl border-2 border-gray-700 bg-white px-11 pt-[60px] pb-12 lg:hidden">
                  <div className="mb-9">
                    {/* 課程主題 */}
                    <div className="absolute top-0 left-1/2 w-[135px] -translate-x-1/2 translate-y-[-23px] rounded-full border-2 border-gray-700 bg-primary-heavy py-3 text-center font-bold text-gray-900">
                      {chooseTopic}
                    </div>
                    <ConfigProvider
                      theme={{
                        token: {
                          borderRadius: 10,
                          colorPrimary: '#FFEFCD',
                          colorPrimaryActive: '#4A5364',
                          colorPrimaryHover: '#FFEFCD',
                          colorBgContainer: '#F5F5F5',
                          controlHeight: 53,
                          colorText: '#424242',
                          fontSize: 14,
                        },
                      }}
                    >
                      <Radio.Group
                        buttonStyle="solid"
                        onChange={onChange3}
                        style={{ width: '100%' }}
                      >
                        {chooseCourse.map(
                          ({ value, label }: IFilterCases, index: number) => {
                            if (index === 0) {
                              return (
                                <Radio.Button
                                  key={value}
                                  className="w-[252px] !rounded-xl !border-0 !text-center !font-bold !text-gray-900"
                                  value={value}
                                >
                                  {label}
                                </Radio.Button>
                              );
                            }
                            return (
                              <Radio.Button
                                key={value}
                                className="mt-5 w-[252px] !rounded-xl !border-0  !text-center !font-bold !text-gray-900"
                                value={value}
                              >
                                {label}
                              </Radio.Button>
                            );
                          },
                        )}
                      </Radio.Group>
                    </ConfigProvider>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <IButton
                      text="我有問題"
                      fontSize="text-sm"
                      py="py-3"
                      extraStyle="w-[104px]"
                      mode="light"
                      onClick={startChat}
                    />
                    <IButton
                      text="手刀預約"
                      fontSize="text-sm"
                      py="py-3"
                      extraStyle="w-[104px]"
                      mode="dark"
                      onClick={addToCart}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 可預約時段 */}
          <CounsleorCalendar counselorId={Number(counselorId)} />

          {/* 影片區塊 */}
          <CounselorVideo VideoLink={VideoLink} />

          {/* 評分區塊 */}
          <CounselorRate />
        </div>

        {/* 電腦版方案選擇 */}
        <div ref={caseRef} className="hidden  lg:block lg:pt-[146px]">
          {/* 價格區塊 */}
          <div id="case" className="caseChoose relative w-full rounded-2xl border-2 border-gray-700 bg-gray-100  pt-[60px] pb-12 lg:max-w-[388px] lg:pt-[78px] lg:pb-14 text-center">
            <div
              className="absolute top-0 left-1/2 w-[135px] -translate-x-1/2 translate-y-[-23px] rounded-full border-2 border-gray-700 bg-primary-heavy py-3 text-sm font-bold text-gray-900 lg:w-[240px]  lg:translate-y-[-35px] lg:py-5 lg:text-xl"
            >
              {chooseTopic}
            </div>

            <div className="mb-9 lg:mb-12  lg:px-[54px]">
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 10,
                    colorPrimary: '#FFEFCD',
                    colorPrimaryActive: '#4A5364',
                    colorPrimaryHover: '#FFEFCD',
                    colorBgContainer: '#F5F5F5',
                    controlHeight: 53,
                    colorText: '#4A5364',
                    fontSize: 14,
                  },
                }}
              >
                <Radio.Group buttonStyle="solid" onChange={onChange3}>
                  {chooseCourse.map(
                    ({ value, label }: IFilterCases, index: number) => {
                      if (index === 0) {
                        return (
                          <Radio.Button
                            key={value}
                            className="w-full !rounded-xl !border-0 !text-center !font-bold !text-gray-900"
                            value={value}
                          >
                            {label}
                          </Radio.Button>
                        );
                      }
                      return (
                        <Radio.Button
                          key={value}
                          className="mt-5 w-full !rounded-xl !border-0 !text-center !font-bold !text-gray-900 lg:mt-[25px]"
                          value={value}
                        >
                          {label}
                        </Radio.Button>
                      );
                    },
                  )}
                </Radio.Group>
              </ConfigProvider>
            </div>

            <div className="flex justify-center space-x-4 px-10">
              <IButton
                text="我有問題"
                fontSize="text-base"
                py="py-4"
                extraStyle="w-[144px]"
                mode="light"
                onClick={startChat}
              />
              <IButton
                text="手刀預約"
                fontSize="text-base"
                py="py-4"
                extraStyle="w-[144px]"
                mode="dark"
                onClick={addToCart}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 用戶好評 */}
      <UserComment />

      {/* 常見問題 */}
      <RegularQuestion />

      <div className="alert">{alertModal}</div>
    </>
  );
}
