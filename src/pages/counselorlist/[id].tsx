import { useEffect, useState } from 'react';
import axios from 'axios';
import { ConfigProvider, Breadcrumb, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useCloseLoading from '@/common/hooks/useCloseLoading';
import { searchCounselorKeyWords } from '@/common/redux/feature/counselorList';
import { useGetFilterListQuery } from '@/common/redux/service/counselorList';
import { IButton } from '@/common/components/IButton';
import { counselorBreadcrumb, selectOptions } from '@/lib/counselorList/counselorData';
import SearchCapsule from '@/common/components/SearchCapsule';
import CounselorListCard from '@/modules/counselorList/CounselorListCard';
import CommonPagination from '@/common/components/CommonPagination';

export const getServerSideProps = async ({ query: { id } }: { query: { id: string } }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profiles?page=${id}`);
    const data = await res.json();
    return {
      props: {
        data,
        pageId: id,
      },
    };
  } catch (error) {
    return {
      props: {
        data: 'error',
      },
    };
  }
};

interface ICounselorListProps {
  Data: {
    CounselorsData: { Id: number; Name: string; SellingPoint: string; SelfIntroduction: string; Photo: string }[];
    TotalPageNum: number;
  };
  Message: string;
  Success: boolean;
}

export default function CounselorList({ data, pageId }: { data: ICounselorListProps; pageId: string }) {
  // ======================== 關閉 loading ========================
  useCloseLoading();
  const {
    Data: { CounselorsData, TotalPageNum },
  } = data;
  const [renderData, setRenderData] = useState(CounselorsData);
  const [totalPage, setTotalPage] = useState(TotalPageNum);
  const [chooseTopic, setChooseTopic] = useState<string[]>([]);
  const dispatch = useDispatch();

  const searchValue = useSelector((state: { counselorListSlice: { value: string } }) => state.counselorListSlice.value);

  // 這邊會將chooseTopic內的字串，透過switch轉成相對應的數字
  const convertTopic = chooseTopic
    .map((item) => {
      switch (item) {
        case '職場議題':
          return 1;
        case '伴侶關係':
          return 2;
        case '人際關係':
          return 3;
        case '負面情緒':
          return 4;
        case '個人發展':
          return 5;
        case '家庭議題':
          return 6;
        default:
          return item;
      }
    })
    .join('');

  const { data: newData } = useGetFilterListQuery({ pageId, convertTopic });

  // 如果搜尋關鍵字&頁數有變動，就重新抓取資料並渲染畫面
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profiles?page=${pageId}&keyword=${searchValue}`);
      const filterData = await res.data;
      setRenderData(filterData.Data.CounselorsData);
      setTotalPage(filterData.Data.TotalPageNum);
    })();
  }, [searchValue, pageId]);

  // 進此頁面之前，清空搜尋關鍵字
  useEffect(
    () => () => {
      dispatch(searchCounselorKeyWords(''));
    },
    [],
  );

  // 監聽膠囊選擇器的變化
  useEffect(() => {
    // 這裡會將轉換過的數字，透過axios抓取資料並渲染畫面
    // ! 暫時用不到，未來要刪掉
    // (async () => {
    //   const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profiles?page=${pageId}&tag=${convertTopic}`);
    //   const filterData = await res.data;
    //   setRenderData(filterData.Data.CounselorsData);
    //   setTotalPage(filterData.Data.TotalPageNum);
    // })();

    // 使用redux-toolkit的query
    if (data) {
      setRenderData(newData?.Data?.CounselorsData);
      setTotalPage(newData?.Data?.TotalPageNum);
    }
  }, [newData, chooseTopic]);

  // 手機版膠囊篩選器函式
  const handleMobileSelectorChange = (value: string[]) => {
    setChooseTopic(value);
  };

  // 電腦版膠囊篩選器函式
  const onClickHandler = (value: string) => {
    setChooseTopic((prevChooseTopic) => {
      if (prevChooseTopic.includes(value)) {
        return prevChooseTopic.filter((item) => item !== value);
      }
      return [...prevChooseTopic, value];
    });
  };

  return (
    <>
      {/* 分頁標題 */}
      <section className="my-14 lg:mt-[84px] ">
        <div className="container">
          {/* 麵包屑 */}
          <Breadcrumb items={counselorBreadcrumb} />

          {/* 分頁標題 */}
          <h1 className="titleDecoration relative mt-3 pl-[30px] text-secondary lg:mt-6 lg:mb-24">諮商師總覽</h1>
        </div>
      </section>

      {/* 諮商師篩選 */}
      <section className="container">
        <div className=" border-y border-secondary py-7 lg:border-y-2 lg:border-gray-700 lg:py-12">
          <p className="mb-1 text-sm text-secondary lg:mb-2 lg:font-bold">選擇諮商主題</p>
          {/* 手機版 膠囊選擇器 */}
          <div id="topicPicker" className="selectTopic relative mb-6 lg:hidden">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#4A5364',
                  colorTextBase: '#4A5364', // => 文字顏色
                  controlOutline: 'none', // => 膠囊focus
                  colorBgContainer: '#ffffff',
                  borderRadiusSM: 10,
                  borderRadius: 10,
                  colorTextPlaceholder: '#4A5364',
                  paddingSM: 16,
                  paddingXS: 12,
                  paddingXXS: 8,
                },
              }}
            >
              <Select
                mode="multiple"
                className="fakeBorder w-full rounded-full ring-1"
                onChange={handleMobileSelectorChange}
                options={selectOptions}
                dropdownMatchSelectWidth={false}
                placement="bottomLeft"
                placeholder="選擇主題"
                virtual={false}
                maxTagCount="responsive"
                value={chooseTopic}
                getPopupContainer={() => document.getElementById('topicPicker') || document.body}
              />
            </ConfigProvider>
          </div>
          {/* 電腦版 膠囊選擇器 */}
          <ul className="hidden space-x-4 lg:mb-7 lg:flex">
            {selectOptions?.map(({ label, value }) => (
              <li key={value}>
                <IButton text={`# ${label}`} fontSize="text-xs lg:text-base" py="py-3" px="px-8" mode={chooseTopic.includes(value) ? 'dark' : 'light'} onClick={() => onClickHandler(value)} />
              </li>
            ))}
          </ul>

          {/* 搜尋欄及篩選 */}
          <div className="search flex items-center justify-between lg:justify-start lg:space-x-6">
            {/* 搜尋欄 */}
            <div className="max-w-[155px] sm:max-w-[180px] lg:w-[416px] lg:max-w-none">
              <SearchCapsule colorPrimary="#4A5364" borderRadius={99999} controlHeight={48} colorBgContainer="#ffffff" placeholder="搜尋諮商師" />
            </div>

            {/* 篩選欄 */}
            <div id="levelFilter" className="relative max-w-[155px] sm:w-[180px] sm:max-w-none">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#4A5364',
                    colorTextBase: '#4A5364', // => 文字顏色
                    controlOutline: 'none', // => 膠囊focus
                    borderRadius: 10,
                    colorBorder: '#4A5364',
                    colorTextPlaceholder: '#4A5364',
                    fontSizeIcon: 10,
                    controlHeight: 48,
                    borderRadiusSM: 10,
                    fontSize: 16,
                  },
                }}
              >
                <Select
                  defaultValue="依熱門程度搜尋"
                  getPopupContainer={() => document.getElementById('levelFilter') || document.body}
                  options={[
                    { value: '依熱門程度搜尋', label: '依熱門程度搜尋' },
                    { value: '依好吃程度搜尋', label: '依好吃程度搜尋' },
                    { value: '依好玩程度搜尋', label: '依好玩程度搜尋' },
                  ]}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </section>

      {/* 諮商師列表 */}
      <section className="mt-20 lg:mt-[168px]">
        <div className="container">
          {/* 清單區塊 */}
          <ul className="mb-12 flex flex-col space-y-9 lg:mb-16 lg:flex-row lg:flex-wrap lg:justify-between lg:gap-x-[52px] lg:gap-y-[68px] lg:space-y-0 xl:gap-x-[104px] xl:px-[68px]">
            {renderData?.map(({ Id, Name, SellingPoint, SelfIntroduction, Photo }, index) => {
              if (index < 5) {
                return <CounselorListCard key={Id} className="before" counselorName={Name} subtitle={SellingPoint} img={Photo} description={SelfIntroduction} id={Id} />;
              }
              return <CounselorListCard key={Id} className="after" counselorName={Name} subtitle={SellingPoint} img={Photo} description={SelfIntroduction} id={Id} />;
            })}
          </ul>

          {/* 分頁按鈕 */}
          <CommonPagination TotalPageNum={totalPage} pageId={pageId} />
        </div>
      </section>
    </>
  );
}
