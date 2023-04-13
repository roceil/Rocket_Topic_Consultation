/* eslint-disable react/no-unused-prop-types */
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Breadcrumb, Collapse, ConfigProvider, Radio, RadioChangeEvent, Select } from 'antd';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useAddToCartPostMutation } from '@/common/redux/service/counselorPage';
import { IButton } from '@/common/components/IButton';
import { counselorPageBreadcrumb } from '@/lib/counselorPage/CounselorPageData';
import checkCircle from 'public/images/check-circle.svg';
import rateStar from 'public/images/rateStar.svg';
import convertFieldId from '@/common/helpers/convertFieldId';

// 使用axios取得path
export const getServerSidePaths = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profiles?page=`);
  const { data } = res;
  const paths = data.map((counselor: { id: { toString: () => any } }) => ({
    params: { id: counselor.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

// 使用axios取得props
export const getServerSideProps = async ({ params }: { params: { id: string } }) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile?id=${params.id}`);
  const { data } = res;
  return {
    props: {
      data,
      counselorId: params.id,
    },
  };
};

// 折疊元件
const { Panel } = Collapse;
// 常見問題的資料陣列
const questionData = [
  {
    question: '預約方式',
    answer: (
      <ul className=" font-normal text-gray-900">
        <li>1. 選擇心儀的課程方案後，點選「手刀預約」</li>
        <li>2. 前往購物車完成結帳</li>
        <li>3. 前往 會員中心 / 預約管理 / 待預約 選擇預約時段</li>
        <li>4. 等待諮商師接受預約，收到接受通知後就完成囉！</li>
      </ul>
    ),
  },
  {
    question: '費用說明',
    answer: <p className=" font-normal text-gray-900">每堂課皆為一小時，可以自行選擇預約堂數，單堂費用由諮商師自行訂定，不同諮商主題的費用可能不同。</p>,
  },
  {
    question: '上課說明',
    answer: <p className=" font-normal text-gray-900">課程將透過 ZOOM 線上進行，預約時間十分鐘前會在會員中心釋出課程連結，只要點選連結，就可以開始上課囉！</p>,
  },
  {
    question: '退課須知',
    answer: <p className=" font-normal text-gray-900">預約成功後若要辦理退課，請聯絡客服信箱由小幫手協助處理。提醒：為維護雙方權益，請審慎考慮後再申請退課。</p>,
  },
];

interface ICounselorPageProps {
  Data: {
    Name: string;
    FieldTags: string[];
    Photo: string;
    SelfIntroduction: string;
    Fields: any;
  };
}
interface ICourses {
  Item: string;
  Price: number;
}
interface IFilterCases {
  label: string;
  value: number;
}

export default function CounselorPage({ data, counselorId }: { data: ICounselorPageProps; counselorId: string }) {
  const token = getCookie('auth');
  const router = useRouter();
  const [addToCartPost] = useAddToCartPostMutation();
  const { Name, FieldTags, Photo, SelfIntroduction, Fields } = data.Data;
  const FieldOptions = Fields.map(({ Field }: { Field: string }) => ({ label: Field, value: Field }));
  const [topicFeature, setTopicFeature] = useState(Fields[0].Features);
  const [chooseTopic, setChooseTopic] = useState(FieldOptions[0].value);

  // 課程方案篩選
  const filterCase = (value: string) => Fields.flatMap((item: { Courses: ICourses[]; Field: string }) => {
    const convertData = item.Courses.filter(() => value === item.Field).map((item2: { Item: any; Price: any }) => ({ label: `${item2.Item} / ${item2.Price} 元`, value: item2.Item }));
    return convertData;
  });

  // 課程特色篩選
  const filterFeature = (value: string) => Fields.filter((item: { Field: string }) => value === item.Field).map((item2: { Features: string }) => item2.Features);

  // 取得課程方案的選項
  const topicOptions = Fields.map(({ Courses }: { Courses: ICourses[] }) => {
    const courseOptions = Courses.map(({ Item, Price }: { Item: string; Price: number }) => ({ label: `${Item} / ${Price} 元`, value: Item }));
    return courseOptions;
  });

  const [chooseCourse, setChooseCourse] = useState(topicOptions[0]);

  // 手機更改主題函式
  const changeTopic = (value: string) => {
    setChooseTopic(value);

    // 如果選擇的value跟Fields的Field相同，就回傳轉換後的Courses
    const filter = filterCase(value);
    setChooseCourse(filter);

    // 如果選擇的value跟Fields的Field相同，就回傳Features
    const filterFeatureAry = filterFeature(value);
    setTopicFeature(filterFeatureAry[0]);
  };

  // 電腦更改主題函式
  const changeTopicPC = ({ target: { value } }: RadioChangeEvent) => {
    setChooseTopic(value);

    // 如果選擇的value跟Fields的Field相同，就回傳轉換後的Courses
    const filter = filterCase(value);
    setChooseCourse(filter);

    // 如果選擇的value跟Fields的Field相同，就回傳Features
    const filterFeatureAry = filterFeature(value);
    setTopicFeature(filterFeatureAry[0]);
  };

  const [chooseCase, setChooseCase] = useState(null);
  // 選擇方案函式
  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    console.log(value);
    setChooseCase(value);
  };

  // 手刀預約（加入購物車）
  const addToCart = async () => {
    if (!token) router.push('/login');
    if (!chooseCase) return alert('請選擇方案');
    const FieldId = convertFieldId(chooseTopic);
    const CounselorId = Number(counselorId);
    console.log('token', token);
    console.log('諮商師ID', CounselorId);
    console.log('主題ID', FieldId);
    console.log('選擇的方案', chooseCase);

    const res = await addToCartPost({
      token,
      CounselorId,
      FieldId,
      chooseCase,
    });
    console.log(res);
    return null;
  };

  return (
    <>
      {/* 諮商師資料 */}
      <section className="bg-primary py-14 lg:pt-[84px] lg:pb-[124px]">
        <div className="container">
          <Breadcrumb items={counselorPageBreadcrumb} />
          <div className="mt-6 flex w-full justify-center lg:mt-14">
            <div className="flex flex-col items-center lg:w-full lg:max-w-[1012px] lg:flex-row lg:items-center lg:justify-between">
              <Image className="rounded-2xl" src={Photo} alt={Name} width={400} height={400} priority />

              <div className="mt-10 w-full max-w-[340px] border-y border-secondary pt-6 pb-8 lg:mt-0 lg:min-h-[400px] lg:max-w-[492px] lg:pt-10 lg:pb-[45px]">
                <h2 className="mb-4 w-full text-left lg:mb-6">{Name}</h2>

                {/* 手機版FieldTags */}
                <ul className="mb-8 flex w-[340px] flex-wrap lg:hidden">
                  {FieldTags.map((topic: string, index: number) => {
                    if (index < 3) {
                      return <li className="fakeBorder mr-4 w-full max-w-[96px] rounded-full py-3 text-center text-sm font-semibold text-secondary ">{topic}</li>;
                    }
                    if (index >= 3) {
                      return <li className="fakeBorder mr-4  mt-3 w-full max-w-[96px] rounded-full py-3 text-center text-sm font-semibold text-secondary ">{topic}</li>;
                    }
                    return null;
                  })}
                </ul>

                {/* 電腦版FieldTags */}
                <ul className="hidden flex-wrap  lg:mb-14 lg:flex">
                  {FieldTags.map((topic: string, index: number) => {
                    if (index < 4) {
                      return <li className="fakeBorder mr-3 w-full rounded-full py-3 text-center text-sm  font-semibold text-secondary lg:max-w-[104px]">{topic}</li>;
                    }
                    if (index >= 4) {
                      return <li className="fakeBorder mt-3  mr-3 w-full rounded-full py-3 text-center text-sm  font-semibold text-secondary lg:max-w-[104px]">{topic}</li>;
                    }
                    return null;
                  })}
                </ul>

                {/* 自我介紹 */}
                <p className="text-sm text-gray-900 lg:text-lg">{SelfIntroduction}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 預約課程 */}
      <section className="lg:container lg:flex lg:justify-between lg:py-[148px]">
        <div className="">
          {/* 預約課程 */}
          <div className="py-20 lg:pt-0 lg:pb-14">
            <div className="container">
              <h2 className="mb-[55px] text-center lg:text-left">預約課程</h2>

              {/* 課程內容 */}
              <div className="flex flex-col items-center ">
                <div className="mb-9 flex w-full items-center justify-start lg:mb-10 lg:flex-col lg:items-start">
                  <span className="font-bold text-secondary lg:mb-3">我想了解：</span>

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
                        onChange={changeTopic}
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
                      <Radio.Group defaultValue={FieldOptions[0].label} buttonStyle="solid" onChange={changeTopicPC}>
                        {FieldOptions.map(({ value, label }: IFilterCases, index: number) => {
                          if (index === 0) {
                            return (
                              <Radio.Button key={value} className="!fakeBorder w-[112px] !rounded-full !text-center !font-semibold" value={value}>
                                {label}
                              </Radio.Button>
                            );
                          }
                          return (
                            <Radio.Button key={value} className="!fakeBorder ml-4 w-[112px] !rounded-full !text-center !font-semibold" value={value}>
                              {label}
                            </Radio.Button>
                          );
                        })}
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
                          <Image src={checkCircle} alt="checkCircle_icon" width={17.5} height={17.5} />
                          <p className="text-gray-900">想要改善伴侶間爭吵、衝突的你們</p>
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
                    <div className="absolute top-0 left-1/2 w-[135px] -translate-x-1/2 translate-y-[-23px] rounded-full border-2 border-gray-700 bg-primary-heavy py-3 text-center font-bold text-gray-900">{chooseTopic}</div>
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
                      <Radio.Group buttonStyle="solid" onChange={onChange3}>
                        {chooseCourse.map(({ value, label }: IFilterCases, index: number) => {
                          if (index === 0) {
                            return (
                              <Radio.Button key={value} className="w-[252px] !rounded-xl !border-0 !text-center !font-bold !text-gray-900" value={value}>
                                {label}
                              </Radio.Button>
                            );
                          }
                          return (
                            <Radio.Button key={value} className="mt-5 w-[252px] !rounded-xl !border-0  !text-center !font-bold !text-gray-900" value={value}>
                              {label}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    </ConfigProvider>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <IButton text="我有問題" fontSize="text-sm" py="py-3" extraStyle="w-[104px]" mode="light" />
                    <IButton text="手刀預約" fontSize="text-sm" py="py-3" extraStyle="w-[104px]" mode="dark" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 可預約時段 */}
          <div className="container ">
            <div className="border-y border-secondary py-20 lg:py-14">
              <h2 className="mb-7 text-center lg:mb-4 lg:text-left lg:text-lg">可預約時段</h2>

              <Image className="rounded-2xl lg:hidden" src="http://fakeimg.pl/380x487/F9F9FF/?text=calendar" alt="手機版假圖片" width={380} height={487} />

              <Image className="hidden rounded-2xl lg:block" src="http://fakeimg.pl/464x572/F9F9FF/?text=PC calendar" alt="電腦版假圖片" width={464} height={572} />
            </div>
          </div>

          {/* 影片區塊 */}
          <div className="py-12 lg:py-14">
            <div className="container h-[212px] lg:h-[276px]">
              <iframe className="h-full w-full" src="https://www.youtube.com/embed/qpOcRG3e9Q8" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
            </div>
          </div>

          {/* 評分區塊 */}
          <div className="container">
            <div className="flex flex-col items-center border-t border-secondary py-12 lg:py-14">
              <h2 className="mb-7 text-center lg:w-full lg:text-left lg:text-lg">諮商師評論數據</h2>

              <ul className="flex w-full max-w-[308px] py-3 lg:max-w-[356px]">
                <li className="w-1/3 font-bold text-secondary">
                  <p className="mb-1 lg:text-2xl">
                    99
                    <span className="text-gray-500">％</span>
                  </p>
                  <p>滿意度</p>
                </li>

                <li className="w-1/3 min-w-[112px] border-x border-secondary text-center font-bold text-secondary">
                  <p className="mb-1 lg:text-2xl">
                    100
                    <span className="text-gray-500">％</span>
                  </p>
                  <p>出席率</p>
                </li>

                <li className="w-1/3 text-end font-bold text-secondary">
                  <p className="mb-1 lg:text-2xl">
                    100
                    <span className="text-gray-500">＋</span>
                  </p>
                  <p>個案人數</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:pt-[146px]">
          {/* 價格區塊 */}
          <div className="relative w-full rounded-2xl border-2 border-gray-700 bg-gray-100  pt-[60px] pb-12 lg:max-w-[388px] lg:pt-[78px] lg:pb-14">
            <button
              type="button"
              className="absolute top-0 left-1/2 w-[135px] -translate-x-1/2 translate-y-[-23px] rounded-full border-2 border-gray-700 bg-primary-heavy py-3 text-sm font-bold text-gray-900 lg:w-[240px]  lg:translate-y-[-35px] lg:py-5 lg:text-xl"
            >
              {chooseTopic}
            </button>

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
                  {chooseCourse.map(({ value, label }: IFilterCases, index: number) => {
                    if (index === 0) {
                      return (
                        <Radio.Button key={value} className="w-full !rounded-xl !border-0 !text-center !font-bold !text-gray-900" value={value}>
                          {label}
                        </Radio.Button>
                      );
                    }
                    return (
                      <Radio.Button key={value} className="mt-5 w-full !rounded-xl !border-0 !text-center !font-bold !text-gray-900 lg:mt-[25px]" value={value}>
                        {label}
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              </ConfigProvider>
            </div>

            <div className="flex justify-center space-x-4 px-10">
              <IButton text="我有問題" fontSize="text-base" py="py-4" extraStyle="w-[144px]" mode="light" />
              <IButton text="手刀預約" fontSize="text-base" py="py-4" extraStyle="w-[144px]" mode="dark" onClick={addToCart} />
            </div>
          </div>
        </div>
      </section>

      {/* 用戶好評 */}
      <section className="bg-primary py-20 lg:py-[148px]">
        <div className="container flex flex-col items-center">
          <h2 className="mb-[46px] w-full text-center lg:mb-[72px] lg:text-left ">用戶好評</h2>

          <ul className="lg:flex lg:w-full lg:justify-between">
            <li>
              <div className="flex h-[338px] w-[284px] flex-col justify-between rounded-[20px] bg-white py-12 px-6 text-gray-900 shadow-md">
                <div>
                  <ul className="mb-3 flex">
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                  </ul>

                  <p>平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師。</p>
                </div>

                <h3 className="text-xl font-bold">菲小姐</h3>
              </div>
            </li>

            <li className="hidden lg:block">
              <div className="flex h-[338px] w-[284px] flex-col justify-between rounded-[20px] bg-white py-12 px-6 text-gray-900 shadow-md">
                <div className="">
                  <ul className="mb-3 flex">
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                  </ul>

                  <p className="mb-12">平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師。</p>
                </div>

                <h3 className="mb-2 text-xl font-bold">菲小姐</h3>
              </div>
            </li>

            <li className="hidden lg:block">
              <div className="flex h-[338px] w-[284px] flex-col justify-between rounded-[20px] bg-white py-12 px-6 text-gray-900 shadow-md">
                <div className="">
                  <ul className="mb-3 flex">
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                  </ul>

                  <p className="mb-12">平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師。</p>
                </div>

                <h3 className="mb-2 text-xl font-bold">菲小姐</h3>
              </div>
            </li>

            <li className="hidden lg:block">
              <div className="flex h-[338px] w-[284px] flex-col justify-between rounded-[20px] bg-white py-12 px-6 text-gray-900 shadow-md">
                <div className="">
                  <ul className="mb-3 flex">
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                    <li>
                      <Image src={rateStar} alt="rateStar" />
                    </li>
                  </ul>

                  <p className="mb-12">平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師。</p>
                </div>

                <h3 className="mb-2 text-xl font-bold">菲小姐</h3>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 常見問題 */}
      <section className="bg-primary-tint py-20">
        <div className="container lg:flex lg:max-w-[860px] lg:flex-col lg:items-center lg:px-0">
          <h2 className="mb-7 w-full text-center lg:mb-14">常見問題</h2>

          <div className="counselorPageQuestion w-full border-y border-gray-900">
            <ConfigProvider
              theme={{
                token: {
                  colorTextBase: '#424242',
                  // 變更標題色
                  colorBorder: '#424242',
                },
              }}
            >
              <Collapse bordered={false} expandIconPosition="end" className="bg-inherit">
                {questionData.map(({ question, answer }) => (
                  <Panel className="p-2 text-lg font-bold " header={question} key={question}>
                    {answer}
                  </Panel>
                ))}
              </Collapse>
            </ConfigProvider>
          </div>
        </div>
      </section>
    </>
  );
}
