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

function CounselorWaitReply() {
  return (
    <div className="overflow-x-auto rounded-2xl bg-bg2 pb-9 lg:pb-12">
      <ul className="flex w-[624px] border-b border-secondary  py-5 pl-[29px] text-sm font-bold text-primary-heavy lg:w-auto lg:px-0 lg:text-center">
        <li className="lg:w-[17.5889%] lg:pl-[87px] lg:text-left">個案姓名</li>
        <li className="ml-[33px] lg:ml-0 lg:w-[16.996%]">諮商議題</li>
        <li className="ml-[57px] lg:ml-0  lg:w-[17.7865%]">諮商日期</li>
        <li className="ml-[47px] lg:ml-0  lg:w-[14.4268%]">諮商時間</li>
        <li className="ml-[72px] lg:ml-0  lg:w-[33.2015%] lg:pl-[100px] lg:text-left">
          確認預約時段
        </li>
      </ul>

      <ul className="w-[624px] space-y-4 px-3 pt-5 lg:w-auto lg:px-7 lg:pt-7">
        <li className="flex  items-center space-x-10 rounded-lg bg-white py-5 px-4 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
          <div className="lg:w-[16.5271%] lg:pl-[64px] lg:text-left">
            哈哈哈
          </div>

          <div className="lg:w-[16.3179%]">一般成人</div>

          <div className="lg:w-[20.3974%]">2023 / 03 / 05</div>

          <div className="lg:w-[13.9121%]">09:00</div>

          <div className=" flex space-x-2 text-xs lg:w-[32.8451%] lg:space-x-3 lg:pl-[46px] lg:text-left lg:text-sm">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              我想更改時段
            </button>

            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              接受
            </button>
          </div>
        </li>

        <li className="flex  items-center space-x-10 rounded-lg bg-white py-5 px-4 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
          <div className="lg:w-[16.5271%] lg:pl-[64px] lg:text-left">
            哈哈哈
          </div>

          <div className="lg:w-[16.3179%]">一般成人</div>

          <div className="lg:w-[20.3974%]">2023 / 03 / 05</div>

          <div className="lg:w-[13.9121%]">09:00</div>

          <div className=" flex space-x-2 text-xs lg:w-[32.8451%] lg:space-x-3 lg:pl-[46px] lg:text-left lg:text-sm">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              我想更改時段
            </button>

            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              接受
            </button>
          </div>
        </li>

        <li className="flex  items-center space-x-10 rounded-lg bg-white py-5 px-4 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
          <div className="lg:w-[16.5271%] lg:pl-[64px] lg:text-left">
            哈哈哈
          </div>

          <div className="lg:w-[16.3179%]">一般成人</div>

          <div className="lg:w-[20.3974%]">2023 / 03 / 05</div>

          <div className="lg:w-[13.9121%]">09:00</div>

          <div className=" flex space-x-2 text-xs lg:w-[32.8451%] lg:space-x-3 lg:pl-[46px] lg:text-left lg:text-sm">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              我想更改時段
            </button>

            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              接受
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

const onChange = (key: string) => {
  console.log(key);
};

function CounselorHasSetUp() {
  return (
    <div className="overflow-x-auto rounded-2xl bg-bg2 pb-9 lg:pb-12">
      <ul className="flex w-[761px] border-b border-secondary  py-5 pl-[29px] text-center text-sm font-bold text-primary-heavy lg:w-auto lg:px-0">
        <li className="w-[15.2631%] lg:w-[17.0498%] lg:pl-[76px] lg:text-left">
          個案姓名
        </li>
        <li className="w-[15.2631%] lg:w-[14.1762%]">諮商議題</li>
        <li className="w-[15.2631%] lg:w-[19.5402%]">諮商日期</li>
        <li className="w-[15.2631%] lg:w-[11.6858%]">諮商時間</li>
        <li className="w-[22.7332%] lg:w-[17.1455%]">加入Google日曆</li>
        <li className="w-[16.2943%] pl-[20px] text-left lg:w-[17.3371%] lg:pl-[55px]">
          個案記錄
        </li>
      </ul>

      <ul className="w-[761px] space-y-4 px-4 pt-5 lg:w-auto lg:px-7 lg:pt-7">
        <li className="flex items-center  rounded-lg bg-white py-5 px-4 text-center text-sm text-primary-heavy lg:text-base">
          <div className="w-[11.2947%] lg:w-[15.2719%] lg:pl-[52px] lg:text-left">
            哈哈哈
          </div>

          <div className="w-[20.6611%] lg:w-[16.3179%]">一般成人</div>

          <div className="w-[13.3966%] lg:w-[20.3974%]">2023 / 03 / 05</div>

          <div className="w-[20.11%] lg:w-[13.9121%]">09:00</div>

          <div className="w-[18.1818%] lg:w-[16.7364%]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              加入
            </button>
          </div>

          <div className="w-[17.3553%] pl-[50px] text-left lg:w-[17.364%] lg:pl-[46px]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              接受
            </button>
          </div>
        </li>
        <li className="flex items-center  rounded-lg bg-white py-5 px-4 text-center text-sm text-primary-heavy lg:text-base">
          <div className="w-[11.2947%] lg:w-[15.2719%] lg:pl-[52px] lg:text-left">
            哈哈哈
          </div>

          <div className="w-[20.6611%] lg:w-[16.3179%]">一般成人</div>

          <div className="w-[13.3966%] lg:w-[20.3974%]">2023 / 03 / 05</div>

          <div className="w-[20.11%] lg:w-[13.9121%]">09:00</div>

          <div className="w-[18.1818%] lg:w-[16.7364%]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              加入
            </button>
          </div>

          <div className="w-[17.3553%] pl-[50px] text-left lg:w-[17.364%] lg:pl-[46px]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              接受
            </button>
          </div>
        </li>
        <li className="flex items-center  rounded-lg bg-white py-5 px-4 text-center text-sm text-primary-heavy lg:text-base">
          <div className="w-[11.2947%] lg:w-[15.2719%] lg:pl-[52px] lg:text-left">
            哈哈哈
          </div>

          <div className="w-[20.6611%] lg:w-[16.3179%]">一般成人</div>

          <div className="w-[13.3966%] lg:w-[20.3974%]">2023 / 03 / 05</div>

          <div className="w-[20.11%] lg:w-[13.9121%]">09:00</div>

          <div className="w-[18.1818%] lg:w-[16.7364%]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              加入
            </button>
          </div>

          <div className="w-[17.3553%] pl-[50px] text-left lg:w-[17.364%] lg:pl-[46px]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              接受
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

const counselorReservationTabAry = [
  {
    key: '待回覆',
    label: <p className="font-bold">待回覆</p>,
    children: <CounselorWaitReply />,
  },
  {
    key: '已成立',
    label: <p className="font-bold">已成立</p>,
    children: <CounselorHasSetUp />,
  },
  {
    key: '已取消',
    label: <p className="font-bold">已取消</p>,
    children: <CounselorWaitReply />,
  },
];

function CounselorReservationTab() {
  return (
    <div className="counselorTab lg:mt-[-60px]">
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
          items={counselorReservationTabAry}
          onChange={onChange}
        />
      </ConfigProvider>
    </div>
  );
}

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
    children: <CounselorReservationTab />,
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
      <section className="hidden pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px]">
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

      {/* 手機版預約管理 */}
      <section className="pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px]">
        <div className="container">
          <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
            目前尚無預約
          </div>
          <h2 className="mb-12 text-center leading-loose lg:hidden">
            預約管理
          </h2>

          <CounselorReservationTab />
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
                <Tabs
                  tabPosition="left"
                  items={UserCenterTabAry}
                  defaultActiveKey="預約管理"
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
