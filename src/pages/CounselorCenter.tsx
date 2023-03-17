import Image from 'next/image';
import { ConfigProvider, Tabs } from 'antd';
import user from '../../public/images/user.svg';
import profile from '../../public/images/profile.svg';
import edit from '../../public/images/Edit.svg';

const counselorInfoTabAry = [
  {
    key: '基本資料',
    label: '基本資料',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '課程資訊',
    label: '課程資訊',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '預約時段',
    label: '預約時段',
    children: 'Content of Tab Pane 1',
  },
];

const onChange = (key: string) => {
  console.log(key);
};

const UserCenterTabAry = [
  {
    label: (
      <div className="flex items-center justify-between space-x-4">
        <Image src={user} alt="user_icon" width={20} height={20} />
        <span className="">個人資料</span>
      </div>
    ),
    key: '個人資料',
    children: (
      <div className="counselorTab -mt-[60px]">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#767494',
              colorText: '#767494',
              fontSize: 16,
              margin: 32,
            },
          }}
        >
          <Tabs
            defaultActiveKey="1"
            items={counselorInfoTabAry}
            onChange={onChange}
          />
        </ConfigProvider>
      </div>
    ),
  },
  {
    label: (
      <div className="flex items-center justify-between space-x-4">
        <Image src={profile} alt="user_icon" width={20} height={20} />
        <span className="">預約管理</span>
      </div>
    ),
    key: '預約管理',
    children: '預約管理',
  },
  {
    label: (
      <div className="flex items-center justify-between space-x-4">
        <Image src={edit} alt="user_icon" width={20} height={20} />
        <span className="">個案紀錄</span>
      </div>
    ),
    key: '個案記錄',
    children: '個案記錄',
  },
];
export default function CounselorCenter() {
  return (
    <>
      {/* 手機版 個人資料 */}
      <section className="pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px]">
        <div className="container">
          <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
            目前尚無預約
          </div>
          <h2 className="mb-12 text-center leading-loose lg:hidden">
            個人資料
          </h2>

          <div className="counselorTab">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#767494',
                  colorText: '#767494',
                  fontSize: 16,
                  margin: 32,
                },
              }}
            >
              <Tabs
                defaultActiveKey="1"
                items={counselorInfoTabAry}
                onChange={onChange}
              />
            </ConfigProvider>
          </div>
        </div>
      </section>

      {/* 電腦版 */}
      <section className="hidden pt-12 pb-28 lg:block lg:pt-[84px] lg:pb-[136px]">
        <div className="container min-h-[calc(100vh-330px)]">
          <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
            目前尚無預約
          </div>

          <div className="">
            <h3 className="mb-8 text-xl font-bold text-primary-heavy">
              會員中心
            </h3>
            <div className="userCenterTab">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#767494',
                    colorText: '#767494',
                    fontSize: 16,
                  },
                }}
              >
                <Tabs tabPosition="left" items={UserCenterTabAry} />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
