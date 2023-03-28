import { ConfigProvider, Breadcrumb, Select } from 'antd';
import { counselorData, counselorBreadcrumb, selectOptions } from '@/lib/counselorList/counselorData';
import SearchCapsule from '../../common/components/SearchCapsule';
import CounselorListCard from '../../modules/counselorList/CounselorListCard';
import CommonPagination from '../../common/components/CommonPagination';

// 手機版膠囊篩選器函式
const handleMobileSelectorChange = (value: string[]) => {
  console.log('🚀 ~ file: index.tsx:8 ~ handleMobileSelectorChange ~ value:', value);
};

export default function CounselorList() {
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
                  colorBorder: '#4A5364',
                  colorTextPlaceholder: '#4A5364',
                  paddingSM: 16,
                  paddingXS: 12,
                  paddingXXS: 8,
                },
              }}
            >
              <Select
                mode="multiple"
                allowClear
                className="w-full"
                onChange={handleMobileSelectorChange}
                options={selectOptions}
                dropdownMatchSelectWidth={false}
                placement="bottomLeft"
                placeholder="選擇主題"
                virtual={false}
                getPopupContainer={() => document.getElementById('topicPicker') || document.body}
              />
            </ConfigProvider>
          </div>

          <ul className="hidden space-x-4 lg:mb-7 lg:flex">
            {selectOptions?.map(({ label, value }) => (
              <li key={value}>
                <button type="button" className=" rounded-full border-[2px] border-secondary text-xs text-secondary hover:opacity-50 focus:bg-secondary focus:text-white lg:w-[146px] lg:py-3 lg:text-base lg:font-bold">
                  {`# ${label}`}
                </button>
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
          <ul className="mb-12 flex flex-col space-y-9 lg:mb-16 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-[52px]  lg:gap-y-[68px] lg:space-y-0 xl:gap-x-[104px]">
            {counselorData.map(({ counselorName, subtitle, img, description, id }, index) => {
              if (index < 5) {
                return <CounselorListCard key={id} className="before" counselorName={counselorName} subtitle={subtitle} img={img} description={description} />;
              }
              return <CounselorListCard key={id} className="after" counselorName={counselorName} subtitle={subtitle} img={img} description={description} />;
            })}
          </ul>

          {/* 分頁按鈕 */}
          <CommonPagination />
        </div>
      </section>
    </>
  );
}
