/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import Image from 'next/image';
import { Breadcrumb, Collapse, ConfigProvider, Radio, RadioChangeEvent, Select } from 'antd';
import { counselorPageBreadcrumb } from '@/lib/counselorPage/CounselorPageData';
import checkCircle from '../../../../public/images/check-circle.svg';
import rateStar from '../../../../public/images/rateStar.svg';

interface IButton2Props {
  rounded?: 'full' | number | 'xl';
  text?: string;
  textColor?: string;
  textSize?: number;
  textLgSize?: number;
  bgColor?: string;
  px?: string;
  py?: string;
  width?: string;
}

const defaultProps: IButton2Props = {
  text: '123',
  rounded: 'full',
  textColor: '#000000',
  textSize: 16,
  textLgSize: 20,
  bgColor: '#FFFFFF',
  px: '4',
  py: '2',
  width: 'auto',
};

function IButton2({ rounded, text, textColor, textSize, textLgSize, bgColor, px, py, width }: IButton2Props) {
  return (
    <button type="button" className={`rounded-${rounded}  ${px} ${py} text-[${textSize}px] lg:text-[${textLgSize}px] ${textColor} ${width} bg-[${bgColor}] fakeBorder`}>
      {text}
    </button>
  );
}

IButton2.defaultProps = defaultProps;

const options = [
  { label: '60 分鐘體驗課只要 1,500 元 ', value: '體驗課' },
  { label: '一堂 60 分鐘 / 2,500元', value: '1' },
  { label: '三堂  3 小時 / 5,500元', value: '2' },
  { label: '五堂  5 小時 / 8,000元', value: '3' },
];

const topicOptions = [
  { label: '親密關係', value: '親密關係' },
  { label: '中老年議題', value: '中老年議題' },
];
// 折疊元件
const { Panel } = Collapse;
// 常見問題的資料陣列
const questionData = [
  {
    question: '預約方式',
    answer: (
      <ul className="text-sm font-normal text-gray-900">
        <li>1. 選擇心儀的課程方案後，點選「手刀預約」</li>
        <li>2. 前往購物車完成結帳</li>
        <li>3. 前往 會員中心 / 預約管理 / 待預約 選擇預約時段</li>
        <li>4. 等待諮商師接受預約，收到接受通知後就完成囉！</li>
      </ul>
    ),
  },
  {
    question: '費用說明',
    answer: <p className="text-sm font-normal text-gray-900">每堂課皆為一小時，可以自行選擇預約堂數，單堂費用由諮商師自行訂定，不同諮商主題的費用可能不同。</p>,
  },
  {
    question: '上課說明',
    answer: <p className="text-sm font-normal text-gray-900">課程將透過 ZOOM 線上進行，預約時間十分鐘前會在會員中心釋出課程連結，只要點選連結，就可以開始上課囉！</p>,
  },
  {
    question: '退課須知',
    answer: <p className="text-sm font-normal text-gray-900">預約成功後若要辦理退課，請聯絡客服信箱由小幫手協助處理。提醒：為維護雙方權益，請審慎考慮後再申請退課。</p>,
  },
];

export default function CounselorPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value3, setValue3] = useState('Apple');

  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio3 checked', value);
    setValue3(value);
  };
  return (
    <>
      {/* 諮商師資料 */}
      <section className="bg-primary py-14 lg:pt-[84px] lg:pb-[124px]">
        <div className="container">
          <Breadcrumb items={counselorPageBreadcrumb} />
          <div className="mt-6 flex w-full justify-center lg:mt-14">
            <div className="flex flex-col items-center lg:w-full lg:max-w-[1012px] lg:flex-row lg:items-center lg:justify-between">
              <Image className="rounded-2xl lg:hidden" src="http://fakeimg.pl/356x356/4A5364" alt="這是假圖片" width={356} height={356} priority />

              <Image className="hidden rounded-2xl lg:block" src="http://fakeimg.pl/400x400/4A5364" alt="這是假圖片" width={400} height={400} priority />

              <div className="mt-10 w-full max-w-[340px] border-y border-secondary pt-6 pb-8 lg:mt-0 lg:min-h-[400px] lg:max-w-[492px] lg:pt-10 lg:pb-[45px]">
                <h2 className="mb-4 w-full text-left lg:mb-6">筱清 1 號</h2>
                <div className="mb-8 flex space-x-[22px] lg:mb-[84px] lg:space-x-3">
                  <IButton2 rounded="full" text="親屬關係" textColor="text-secondary" textSize={14} textLgSize={16} py="py-3" width="w-[104px]" />

                  <IButton2 rounded="full" text="中老年議題" textColor="text-secondary" textSize={14} textLgSize={16} py="py-3" width="w-[104px]" />
                </div>
                <p className="text-sm text-gray-900 lg:text-lg">我是一位經驗豐富的心理學家和諮商師，專注於幫助人們克服壓力、焦慮和憂鬱等情緒問題。我認為，通過與我的客戶建立一種真誠的關係，可以幫助他們達到長期穩定的情緒狀態</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 預約課程 */}
      <section className="lg:container lg:flex lg:justify-between lg:py-[148px]">
        <div className="">
          {/* 預約課程 */}
          <section className="py-20 lg:pt-0 lg:pb-14">
            <div className="container">
              <h2 className="mb-[55px] text-center lg:text-left">預約課程</h2>

              {/* 課程內容 */}
              <div className="flex flex-col items-center ">
                <div className="mb-9 flex w-full items-center justify-start lg:mb-10 lg:flex-col lg:items-start">
                  <span className="font-bold text-secondary lg:mb-3">我想了解：</span>

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
                        defaultValue="依諮商主題搜尋"
                        style={{ width: '100%' }}
                        options={[
                          { value: '親密關係', label: '親密關係' },
                          { value: '中老年議題', label: '中老年議題' },
                        ]}
                        getPopupContainer={(node) => {
                          if (node) {
                            return node.parentNode;
                          }
                          return document.body;
                        }}
                      />
                    </ConfigProvider>
                  </div>

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
                      <Radio.Group defaultValue="親密關係" buttonStyle="solid" onChange={onChange3}>
                        {topicOptions.map((item, index) => {
                          if (index === 0) {
                            return (
                              <Radio.Button key={index} className="!fakeBorder w-[112px] !rounded-full !text-center !font-semibold" value={item.value}>
                                {item.label}
                              </Radio.Button>
                            );
                          }
                          return (
                            <Radio.Button key={index} className="!fakeBorder ml-4 w-[112px] !rounded-full !text-center !font-semibold" value={item.value}>
                              {item.label}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    </ConfigProvider>
                  </div>
                </div>

                {/* 文案列表區塊 */}
                <ul className="mb-20 flex w-full flex-col items-start space-y-5 lg:mb-0">
                  <li className="flex max-w-[340px] items-center space-x-3 lg:max-w-none">
                    <Image src={checkCircle} alt="checkCircle_icon" width={17.5} height={17.5} />
                    <p className="text-secondary">想要改善伴侶間爭吵、衝突的你們</p>
                  </li>

                  <li className="flex max-w-[340px] items-center space-x-3 lg:max-w-none">
                    <Image src={checkCircle} alt="checkCircle_icon" width={17.5} height={17.5} />
                    <p className="text-secondary">想要改善伴侶間爭吵、衝突的你們</p>
                  </li>

                  <li className="flex max-w-[340px] items-center space-x-3 lg:max-w-none">
                    <Image src={checkCircle} alt="checkCircle_icon" width={17.5} height={17.5} />
                    <p className="text-secondary">關係裡出現了裂痕，想要修復關係、好好處理問題的你們</p>
                  </li>

                  <li className="flex max-w-[340px] items-center space-x-3 lg:max-w-none">
                    <Image src={checkCircle} alt="checkCircle_icon" width={17.5} height={17.5} />
                    <p className="text-secondary">建議伴侶雙方可以先各自預約一堂課，再一起開始伴侶課程。</p>
                  </li>

                  <li className="flex max-w-[340px] items-center space-x-3 lg:max-w-none">
                    <Image src={checkCircle} alt="checkCircle_icon" width={17.5} height={17.5} />
                    <p className="text-secondary">給關係裡出現了裂痕，想要修復關係、好好處理問題的你們</p>
                  </li>
                </ul>

                {/* 價格區塊 */}
                <div className=" relative w-full max-w-[340px] rounded-2xl border-2 border-secondary bg-white px-11 pt-[60px] pb-12 lg:hidden">
                  <div className="mb-9">
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
                      <Radio.Group defaultValue="體驗課" buttonStyle="solid" onChange={onChange3}>
                        {options.map((item, index) => {
                          if (index === 0) {
                            return (
                              <Radio.Button key={index} className="w-[252px] !rounded-xl !border-0 !text-center !font-bold !text-secondary" value={item.value}>
                                {item.label}
                              </Radio.Button>
                            );
                          }
                          return (
                            <Radio.Button key={index} className="mt-5 w-[252px] !rounded-xl !border-0  !text-center !font-bold !text-secondary" value={item.value}>
                              {item.label}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    </ConfigProvider>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button type="button" className="w-[104px] rounded-full border border-secondary py-3 text-sm font-bold text-secondary">
                      我有問題
                    </button>

                    <button type="button" className="w-[104px] rounded-full border border-secondary bg-secondary py-3 text-sm text-white">
                      手刀預約
                    </button>
                  </div>

                  <div className="absolute top-0 left-1/2 w-[135px] -translate-x-1/2 translate-y-[-23px] rounded-full border-2 border-secondary bg-primary-heavy py-3 text-center text-sm font-bold text-secondary">親密關係</div>
                </div>
              </div>
            </div>
          </section>

          {/* 可預約時段 */}
          <section className="container ">
            <div className="border-y border-secondary py-20 lg:py-14">
              <h2 className="mb-7 text-center lg:mb-4 lg:text-left lg:text-lg">可預約時段</h2>

              <Image className="rounded-2xl lg:hidden" src="http://fakeimg.pl/380x487/F9F9FF/?text=calendar" alt="手機版假圖片" width={380} height={487} />

              <Image className="hidden rounded-2xl lg:block" src="http://fakeimg.pl/464x572/F9F9FF/?text=PC calendar" alt="電腦版假圖片" width={464} height={572} />
            </div>
          </section>

          {/* 影片區塊 */}
          <section className="py-12 lg:py-14">
            <div className="container h-[212px] lg:h-[276px]">
              <iframe className="h-full w-full" src="https://www.youtube.com/embed/qpOcRG3e9Q8" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
            </div>
          </section>

          {/* 評分區塊 */}
          <section className="container">
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
          </section>
        </div>

        <div className="hidden lg:block lg:pt-[226px]">
          {/* 價格區塊 */}
          <div className="fakeBorder relative w-full max-w-[340px] rounded-2xl bg-gray-100 px-11 pt-[60px] pb-12 lg:max-w-[388px] lg:px-14 lg:pt-[78px] lg:pb-14">
            <button
              type="button"
              className="fakeBorder absolute top-0 left-1/2 w-[135px] -translate-x-1/2 translate-y-[-23px] rounded-full bg-primary-heavy py-3 text-sm font-bold text-secondary lg:w-[240px]  lg:translate-y-[-35px] lg:py-5 lg:text-xl"
            >
              親密關係
            </button>

            <div className="mb-9 lg:mb-12">
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
                <Radio.Group defaultValue="體驗課" buttonStyle="solid" onChange={onChange3}>
                  {options.map((item, index) => {
                    if (index === 0) {
                      return (
                        <Radio.Button key={index} className="w-full !rounded-xl !border-0 !text-center !font-bold !text-secondary" value={item.value}>
                          {item.label}
                        </Radio.Button>
                      );
                    }
                    return (
                      <Radio.Button key={index} className="mt-5 w-full !rounded-xl !border-0 !text-center !font-bold !text-secondary lg:mt-[25px]" value={item.value}>
                        {item.label}
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              </ConfigProvider>
            </div>

            <div className="flex justify-center space-x-4">
              <button type="button" className="fakeBorder w-[104px] rounded-full py-3 text-sm text-secondary lg:w-[144px] lg:py-4 lg:text-base">
                我有問題
              </button>

              <button type="button" className="fakeBorder w-[104px] rounded-full bg-secondary py-3 text-sm text-white lg:w-[144px] lg:py-4 lg:text-base">
                手刀預約
              </button>
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
              <div className="h-[338px] w-[284px] rounded-[20px] bg-white py-12 px-6 text-gray-900">
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

                <h3 className="mb-2 font-bold">菲菲</h3>
                <p>前端好伙伴</p>
              </div>
            </li>

            <li className="hidden lg:block">
              <div className="h-[338px] w-[284px] rounded-[20px] bg-white py-12 px-6 text-gray-900">
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

                <h3 className="mb-2 font-bold">菲菲</h3>
                <p>前端好伙伴</p>
              </div>
            </li>

            <li className="hidden lg:block">
              <div className="h-[338px] w-[284px] rounded-[20px] bg-white py-12 px-6 text-gray-900">
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

                <h3 className="mb-2 font-bold">菲菲</h3>
                <p>前端好伙伴</p>
              </div>
            </li>

            <li className="hidden xl:block">
              <div className="h-[338px] w-[284px] rounded-[20px] bg-white py-12 px-6 text-gray-900">
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

                <h3 className="mb-2 font-bold">菲菲</h3>
                <p>前端好伙伴</p>
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
                {questionData.map(({ question, answer }, index) => (
                  <Panel className="p-2 text-lg font-bold " header={question} key={index}>
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
