import { useEffect, useState } from 'react';
import {
  ConfigProvider, Select, Tabs, TabsProps,
} from 'antd';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import user from '../../public/images/user.svg';
import profile from '../../public/images/profile.svg';

function UserInformation({
  save,
  edit,
  nameDisable,
  accountName,
  accountEmail,
}: any) {
  return (
    <form
      onSubmit={save}
      className="flex w-full flex-col  border-secondary  lg:mt-[-60px] lg:pl-[76px]"
    >
      <div className="mb-12 flex flex-col space-y-6 border-y py-8 lg:rounded-xl lg:border lg:border-secondary lg:py-10 lg:px-9">
        <label className="min-h-10 py-2 text-primary-heavy">
          <span>會員帳號：</span>
          <span className="text-sm">{accountEmail}</span>
        </label>

        <label className="min-h-10 text-primary-heavy">
          <span>修改密碼：</span>
          <button
            type="button"
            className="rounded-[10px] border border-secondary py-[9px] px-5 text-sm hover:bg-primary-heavy hover:text-white"
          >
            點我重設密碼
          </button>
        </label>

        <label className="min-h-10 text-primary-heavy">
          <span>會員姓名：</span>
          <input
            type="text"
            className="rounded-[10px] border border-secondary py-[9px] px-3 text-sm caret-primary-heavy outline-none placeholder:text-primary-heavy"
            placeholder={accountName}
            disabled={nameDisable}
          />
        </label>

        <label className="min-h-10 py-2 text-primary-heavy">
          <span>會員生日：</span>
          <span className="text-sm">1998/88/99</span>
        </label>

        <label className="min-h-10 !mb-3 py-2 text-primary-heavy ">
          <span>會員性別：</span>
          <span className="text-sm">女</span>
        </label>
      </div>

      <div className="flex justify-center space-x-5 lg:justify-end">
        <button
          type="button"
          className="w-full max-w-[180px] rounded-full border border-primary-heavy py-4 font-bold text-primary-heavy"
          onClick={edit}
        >
          編輯
        </button>

        <button
          type="submit"
          className="w-full max-w-[180px] rounded-full border border-primary-heavy bg-primary-heavy py-4 font-bold text-white"
        >
          儲存
        </button>
      </div>
    </form>
  );
}

function WaitReservation() {
  return (
    <div className=" w-full rounded-2xl bg-bg2 text-center">
      <ul className="flex w-full border-b border-secondary text-sm font-bold text-[#767494]">
        <li className="w-[26.8421%] py-5 lg:w-[31.6205%]">諮商師</li>
        <li className="w-[31.5789%] py-5 lg:w-[29.3478%]">諮商議題</li>
        <li className="w-[41.57894%] py-5 lg:w-[39.0316%]">選擇時段</li>
      </ul>

      <ul className="mt-5 flex flex-col space-y-4 px-4 pb-9 text-sm text-primary-heavy lg:mt-7 lg:space-y-5 lg:px-7 lg:text-base">
        <li className="flex items-center rounded-lg bg-white py-3 lg:py-[18px]">
          <p className="w-[23.5632%] lg:w-[27.615%]">我真的</p>
          <p className="w-[35.6321%] lg:w-[36.82%]">討厭table</p>
          <div className="w-[40.8045%] lg:w-[35.5648%]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-[19px] text-xs font-semibold text-primary-heavy lg:py-2 lg:px-5 lg:text-sm lg:hover:bg-primary-heavy lg:hover:text-white"
            >
              選擇預約時段
            </button>
          </div>
        </li>

        <li className="flex items-center rounded-lg bg-white py-3 lg:py-[18px]">
          <p className="w-[23.5632%] lg:w-[27.615%]">我真的</p>
          <p className="w-[35.6321%] lg:w-[36.82%]">討厭table</p>
          <div className="w-[40.8045%] lg:w-[35.5648%]">
            <button
              type="button"
              className=" rounded-full border border-primary-heavy py-1 px-[19px] text-xs font-semibold text-primary-heavy lg:py-2 lg:px-5 lg:text-sm lg:hover:bg-primary-heavy lg:hover:text-white"
            >
              選擇預約時段
            </button>
          </div>
        </li>

        <li className="flex items-center rounded-lg bg-white py-3 lg:py-[18px]">
          <p className="w-[23.5632%] lg:w-[27.615%]">我真的</p>
          <p className="w-[35.6321%] lg:w-[36.82%]">討厭table</p>
          <div className="w-[40.8045%] lg:w-[35.5648%]">
            <button
              type="button"
              className=" rounded-full border border-primary-heavy py-1 px-[19px] text-xs font-semibold text-primary-heavy lg:py-2 lg:px-5 lg:text-sm lg:hover:bg-primary-heavy lg:hover:text-white"
            >
              選擇預約時段
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

function WaitReply() {
  return (
    <div className=" w-full rounded-2xl bg-bg2 text-center">
      <ul className="flex w-full border-b border-secondary text-sm font-bold text-[#767494]">
        <li className="hidden py-5 lg:block lg:w-[29.8418%]">諮商師</li>
        <li className="w-[43.9473%] py-5 lg:w-[11.3636%]">諮商議題</li>
        <li className="w-[56.0526%] py-5 lg:w-[58.7944%]">預約時段</li>
      </ul>

      <ul className="mt-5 flex flex-col space-y-4 px-4 pb-9 text-sm text-primary-heavy lg:mt-7 lg:px-7 lg:text-base">
        <li className="flex items-center rounded-lg bg-white ">
          <div className="w-[45.4022%] pl-5 pt-5 pb-[25px] text-left text-primary-heavy lg:w-[25.9414%] lg:p-6">
            <p className="mb-3 font-semibold lg:hidden">一般諮商</p>
            <p className="lg:hidden">諮商師｜家洋老師</p>
            <p className="hidden lg:block lg:text-center">家洋老師</p>
          </div>

          <div className="hidden lg:block lg:w-[17.5732%]">
            <p>一般成人</p>
          </div>

          <div className="flex w-[54.5977%] flex-col items-start py-5 pl-5 lg:w-[56.4853%] lg:flex-row lg:items-center lg:justify-center lg:space-x-10">
            <div className="mb-3 flex space-x-2 lg:mb-0 lg:space-x-5">
              <p>2023 / 03 / 05</p>
              <p>09:00</p>
            </div>
            <button
              type="button"
              className=" rounded-full border border-primary-heavy py-1 px-4 text-xs  font-semibold text-primary-heavy lg:py-2 lg:px-5 lg:text-sm lg:hover:bg-primary-heavy lg:hover:text-white"
            >
              選擇預約時段
            </button>
          </div>
        </li>

        <li className="flex items-center rounded-lg bg-white ">
          <div className="w-[45.4022%] pl-5 pt-5 pb-[25px] text-left text-primary-heavy lg:w-[25.9414%] lg:p-6">
            <p className="mb-3 font-semibold lg:hidden">一般諮商</p>
            <p className="lg:hidden">諮商師｜家洋老師</p>
            <p className="hidden lg:block lg:text-center">家洋老師</p>
          </div>

          <div className="hidden lg:block lg:w-[17.5732%]">
            <p>一般成人</p>
          </div>

          <div className="flex w-[54.5977%] flex-col items-start py-5 pl-5 lg:w-[56.4853%] lg:flex-row lg:items-center lg:justify-center lg:space-x-10">
            <div className="mb-3 flex space-x-2 lg:mb-0 lg:space-x-5">
              <p>2023 / 03 / 05</p>
              <p>09:00</p>
            </div>
            <button
              type="button"
              className=" rounded-full border border-primary-heavy py-1 px-4 text-xs  font-semibold text-primary-heavy lg:py-2 lg:px-5 lg:text-sm lg:hover:bg-primary-heavy lg:hover:text-white"
            >
              選擇預約時段
            </button>
          </div>
        </li>

        <li className="flex items-center rounded-lg bg-white ">
          <div className="w-[45.4022%] pl-5 pt-5 pb-[25px] text-left text-primary-heavy lg:w-[25.9414%] lg:p-6">
            <p className="mb-3 font-semibold lg:hidden">一般諮商</p>
            <p className="lg:hidden">諮商師｜家洋老師</p>
            <p className="hidden lg:block lg:text-center">家洋老師</p>
          </div>

          <div className="hidden lg:block lg:w-[17.5732%]">
            <p>一般成人</p>
          </div>

          <div className="flex w-[54.5977%] flex-col items-start py-5 pl-5 lg:w-[56.4853%] lg:flex-row lg:items-center lg:justify-center lg:space-x-10">
            <div className="mb-3 flex space-x-2 lg:mb-0 lg:space-x-5">
              <p>2023 / 03 / 05</p>
              <p>09:00</p>
            </div>
            <button
              type="button"
              className=" rounded-full border border-primary-heavy py-1 px-4 text-xs  font-semibold text-primary-heavy lg:py-2 lg:px-5 lg:text-sm lg:hover:bg-primary-heavy lg:hover:text-white"
            >
              選擇預約時段
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

function HasSetUp() {
  return (
    <div className=" w-full rounded-2xl bg-bg2 text-center">
      {/* 標題 */}
      <ul className="flex w-full border-b border-secondary py-5 text-left text-sm font-bold text-[#767494] lg:items-center lg:text-center">
        <li className="hidden lg:block lg:w-[12.6482%] lg:pl-[63px] lg:text-left">
          諮商師
        </li>
        <li className="w-1/2 pl-[59px] lg:w-[18.4782%] lg:pl-0">諮商議題</li>
        <li className="hidden lg:block lg:w-[13.7351%]">預約日期</li>
        <li className="hidden lg:block lg:w-[16.3043%]">預約時間</li>
        <li className="hidden lg:block lg:w-[13.1422%]">完成訂單</li>
        <li className="hidden lg:block lg:w-[25.6916%]">評價</li>
        <li className="w-1/2 pl-[48px] lg:hidden">預約詳情</li>
      </ul>

      {/* 內容 */}
      <ul className="mt-5 flex flex-col space-y-4 px-4 pb-9 text-sm text-primary-heavy lg:mt-7 lg:px-7 lg:text-base">
        <li className="flex items-center rounded-lg bg-white text-primary-heavy lg:py-6">
          <div className="w-[44.8275%] pl-[24px] pt-5 pb-[25px] text-left lg:w-[12.6569%] lg:p-0 lg:text-center">
            <p className="mb-3 font-semibold lg:hidden">一般諮商</p>
            <p className="lg:hidden">諮商師｜我是誰</p>
            <p className="hidden lg:block">我是誰</p>
          </div>

          <div className="hidden lg:block lg:w-[15.0627%]">
            <p>一般成人</p>
          </div>

          <div className="hidden lg:block lg:w-[19.1422%]">
            <p>2023 / 03 / 05</p>
          </div>

          <div className="hidden lg:block lg:w-[12.6569%]">
            <p>09:00</p>
          </div>

          <div className="hidden lg:block lg:w-[18.41%]">
            <button
              type="button"
              className=" rounded-full border border-primary-heavy lg:px-5 lg:py-2 lg:text-sm lg:font-bold lg:hover:bg-primary-heavy lg:hover:text-white"
            >
              完成訂單
            </button>
          </div>

          <div className="hidden lg:block lg:w-[22.0711%]">
            <button
              type="button"
              className=" rounded-full border border-primary-heavy lg:px-5 lg:py-2 lg:text-sm lg:font-bold lg:hover:bg-primary-heavy lg:hover:text-white"
            >
              撰寫 / 編輯評價
            </button>
          </div>

          <div className="flex w-[55.1724%] flex-col items-start py-5 pl-[24px] lg:hidden">
            <div className="mb-3 flex space-x-2">
              <p>2023 / 03 / 05</p>
              <p>09:00</p>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className=" rounded-full border border-primary-heavy py-1 px-3 text-xs font-semibold text-primary-heavy sm:px-4"
              >
                完成訂單
              </button>

              <button
                type="button"
                className=" rounded-full border border-primary-heavy py-1 px-3 text-xs font-semibold text-primary-heavy sm:px-4"
              >
                評價
              </button>
            </div>
          </div>
        </li>

        <li className="flex items-center rounded-lg bg-white text-primary-heavy lg:py-6">
          <div className="w-[44.8275%] pl-[24px] pt-5 pb-[25px] text-left lg:w-[12.6569%] lg:p-0 lg:text-center">
            <p className="mb-3 font-semibold lg:hidden">一般諮商</p>
            <p className="lg:hidden">諮商師｜我是誰</p>
            <p className="hidden lg:block">我是誰</p>
          </div>

          <div className="hidden lg:block lg:w-[15.0627%]">
            <p>一般成人</p>
          </div>

          <div className="hidden lg:block lg:w-[19.1422%]">
            <p>2023 / 03 / 05</p>
          </div>

          <div className="hidden lg:block lg:w-[12.6569%]">
            <p>09:00</p>
          </div>

          <div className="hidden lg:block lg:w-[18.41%]">
            <button
              type="button"
              className=" rounded-full border border-primary-heavy lg:px-5 lg:py-2 lg:text-sm lg:font-bold lg:hover:bg-primary-heavy lg:hover:text-white"
            >
              完成訂單
            </button>
          </div>

          <div className="hidden lg:block lg:w-[22.0711%]">
            <button
              type="button"
              className=" rounded-full border border-primary-heavy lg:px-5 lg:py-2 lg:text-sm lg:font-bold lg:hover:bg-primary-heavy lg:hover:text-white"
            >
              撰寫 / 編輯評價
            </button>
          </div>

          <div className="flex w-[55.1724%] flex-col items-start py-5 pl-[24px] lg:hidden">
            <div className="mb-3 flex space-x-2">
              <p>2023 / 03 / 05</p>
              <p>09:00</p>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className=" rounded-full border border-primary-heavy py-1 px-3 text-xs font-semibold text-primary-heavy sm:px-4"
              >
                完成訂單
              </button>

              <button
                type="button"
                className=" rounded-full border border-primary-heavy py-1 px-3 text-xs font-semibold text-primary-heavy sm:px-4"
              >
                評價
              </button>
            </div>
          </div>
        </li>

        <li className="flex items-center rounded-lg bg-white text-primary-heavy lg:py-6">
          <div className="w-[44.8275%] pl-[24px] pt-5 pb-[25px] text-left lg:w-[12.6569%] lg:p-0 lg:text-center">
            <p className="mb-3 font-semibold lg:hidden">一般諮商</p>
            <p className="lg:hidden">諮商師｜我是誰</p>
            <p className="hidden lg:block">我是誰</p>
          </div>

          <div className="hidden lg:block lg:w-[15.0627%]">
            <p>一般成人</p>
          </div>

          <div className="hidden lg:block lg:w-[19.1422%]">
            <p>2023 / 03 / 05</p>
          </div>

          <div className="hidden lg:block lg:w-[12.6569%]">
            <p>09:00</p>
          </div>

          <div className="hidden lg:block lg:w-[18.41%]">
            <button
              type="button"
              className=" rounded-full border border-primary-heavy lg:px-5 lg:py-2 lg:text-sm lg:font-bold lg:hover:bg-primary-heavy lg:hover:text-white"
            >
              完成訂單
            </button>
          </div>

          <div className="hidden lg:block lg:w-[22.0711%]">
            <button
              type="button"
              className=" rounded-full border border-primary-heavy lg:px-5 lg:py-2 lg:text-sm lg:font-bold lg:hover:bg-primary-heavy lg:hover:text-white"
            >
              撰寫 / 編輯評價
            </button>
          </div>

          <div className="flex w-[55.1724%] flex-col items-start py-5 pl-[24px] lg:hidden">
            <div className="mb-3 flex space-x-2">
              <p>2023 / 03 / 05</p>
              <p>09:00</p>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className=" rounded-full border border-primary-heavy py-1 px-3 text-xs font-semibold text-primary-heavy sm:px-4"
              >
                完成訂單
              </button>

              <button
                type="button"
                className=" rounded-full border border-primary-heavy py-1 px-3 text-xs font-semibold text-primary-heavy sm:px-4"
              >
                評價
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

function HasCancel() {
  return (
    <div className=" w-full rounded-2xl bg-bg2 text-center">
      <ul className="flex w-full border-b border-secondary py-5 text-left text-sm font-bold text-[#767494]">
        <li className="hidden lg:block lg:w-1/4 lg:pl-[134px]">諮商師</li>
        <li className="w-1/2 pl-[59px] lg:w-1/4 lg:pl-[93px]">諮商議題</li>
        <li className="hidden lg:block lg:w-1/4 lg:pl-[87px]">預約日期</li>
        <li className="hidden lg:block lg:w-1/4 lg:pl-[70px]">預約時間</li>
        <li className="w-1/2 pl-[48px] lg:hidden ">預約詳情</li>
      </ul>

      <ul className="mt-5 flex flex-col space-y-4 px-4 pb-9 text-sm text-primary-heavy lg:mt-7 lg:px-7 lg:text-base">
        <li className="flex  rounded-lg bg-white lg:py-6">
          <div className="w-[44.2528%] py-[18px] pl-5 text-left text-primary-heavy lg:w-[22.1757%] lg:p-0 lg:text-center">
            <p className="mb-3 font-semibold lg:hidden">一般諮商</p>
            <p className="lg:hidden">諮商師｜我是誰</p>
            <p className="hidden lg:block lg:pl-[104px] lg:text-left">我是誰</p>
          </div>

          <div className="hidden lg:block lg:w-[28.4518%]">
            <p>一般成人</p>
          </div>

          <div className="hidden lg:block lg:w-[23.3263%]">
            <p>2023 / 03 / 05</p>
          </div>

          <div className="hidden lg:block lg:w-[26.046%]">
            <p>09:00</p>
          </div>
          <div className="flex w-[55.7471%] flex-col items-start justify-start pt-4 pl-8 lg:hidden">
            <div className="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:space-x-2">
              <p>2023 / 03 / 05</p>
              <p>09:00</p>
            </div>
          </div>
        </li>

        <li className="flex  rounded-lg bg-white lg:py-6">
          <div className="w-[44.2528%] py-[18px] pl-5 text-left text-primary-heavy lg:w-[22.1757%] lg:p-0 lg:text-center">
            <p className="mb-3 font-semibold lg:hidden">一般諮商</p>
            <p className="lg:hidden">諮商師｜我是誰</p>
            <p className="hidden lg:block lg:pl-[104px] lg:text-left">我是誰</p>
          </div>

          <div className="hidden lg:block lg:w-[28.4518%]">
            <p>一般成人</p>
          </div>

          <div className="hidden lg:block lg:w-[23.3263%]">
            <p>2023 / 03 / 05</p>
          </div>

          <div className="hidden lg:block lg:w-[26.046%]">
            <p>09:00</p>
          </div>
          <div className="flex w-[55.7471%] flex-col items-start justify-start pt-4 pl-8 lg:hidden">
            <div className="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:space-x-2">
              <p>2023 / 03 / 05</p>
              <p>09:00</p>
            </div>
          </div>
        </li>

        <li className="flex  rounded-lg bg-white lg:py-6">
          <div className="w-[44.2528%] py-[18px] pl-5 text-left text-primary-heavy lg:w-[22.1757%] lg:p-0 lg:text-center">
            <p className="mb-3 font-semibold lg:hidden">一般諮商</p>
            <p className="lg:hidden">諮商師｜我是誰</p>
            <p className="hidden lg:block lg:pl-[104px] lg:text-left">我是誰</p>
          </div>

          <div className="hidden lg:block lg:w-[28.4518%]">
            <p>一般成人</p>
          </div>

          <div className="hidden lg:block lg:w-[23.3263%]">
            <p>2023 / 03 / 05</p>
          </div>

          <div className="hidden lg:block lg:w-[26.046%]">
            <p>09:00</p>
          </div>
          <div className="flex w-[55.7471%] flex-col items-start justify-start pt-4 pl-8 lg:hidden">
            <div className="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:space-x-2">
              <p>2023 / 03 / 05</p>
              <p>09:00</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default function UserCenter() {
  const [nameDisable, setNameDisable] = useState(true);
  const [tab, setTab] = useState('待預約');

  const edit = () => setNameDisable(false);

  const save = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (nameDisable === true) return;
    setNameDisable(true);
    alert('儲存成功');
  };

  const handleChange = (value: string) => {
    console.log('value', value);
    setTab(value);
  };
  const [test, setTest] = useState(<WaitReservation />);

  const checkTab = () => {
    switch (tab) {
      case '待回覆':
        setTest(<WaitReply />);
        break;
      case '待預約':
        setTest(<WaitReservation />);
        break;

      case '已取消':
        setTest(<HasCancel />);
        break;

      case '已成立':
        setTest(<HasSetUp />);
        break;

      default:
        break;
    }
  };

  useEffect(checkTab, [tab]);

  const reservationTabs: TabsProps['items'] = [
    {
      key: '待預約',
      label: '待預約',
      children: <WaitReservation />,
    },
    {
      key: '待回覆',
      label: '待回覆',
      children: <WaitReply />,
    },
    {
      key: '已成立',
      label: '已成立',
      children: <HasSetUp />,
    },
    {
      key: '已取消',
      label: '已取消',
      children: <HasCancel />,
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
        <UserInformation
          edit={edit}
          save={save}
          nameDisable={nameDisable}
          accountName="菲菲"
          accountEmail="test@no.mail"
        />
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
      children: (
        <div className="order flex justify-end ">
          <ConfigProvider
            theme={{
              token: {
                margin: 48,
              },
            }}
          >
            <Tabs
              className="mt-[-60px] w-full max-w-[1012px]"
              defaultActiveKey="1"
              items={reservationTabs}
              onChange={onChange}
            />
          </ConfigProvider>
        </div>
      ),
    },
  ];

  const orderStatus = [
    { value: '待預約', label: '待預約' },
    { value: '待回覆', label: '待回覆' },
    { value: '已成立', label: '已成立' },
    { value: '已取消', label: '已取消' },
  ];

  interface IProps {
    userCenterSlice: { value: string };
  }

  const userCenterPosition = useSelector((state: IProps) => {
    if (state) {
      return state.userCenterSlice;
    }
    return null;
  });
  return (
    <>
      {/* 手機版 個人資料 */}
      <section
        className={`pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px] ${
          userCenterPosition?.value === '個人資料' ? 'block' : 'hidden'
        }`}
      >
        <div className="container">
          <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
            目前尚無預約
          </div>
          <h2 className="mb-5 text-center leading-loose lg:hidden">個人資料</h2>
          <div className="justify-between lg:flex">
            <div className="hidden h-[242px] w-[116px] ring-1 lg:block ">
              <h3 className="mb-8 font-bold text-primary-heavy">會員中心</h3>
            </div>

            <form
              onSubmit={save}
              className="flex w-full flex-col  border-secondary  lg:mt-[62px] lg:max-w-[1012px] "
            >
              <div className="mb-12 flex flex-col space-y-6 border-y py-8 lg:rounded-xl lg:border lg:border-secondary lg:py-10 lg:px-9">
                <label className="min-h-10 py-2 text-primary-heavy">
                  <span>會員帳號：</span>
                  <span className="text-sm">hello@gamil.com</span>
                </label>

                <label className="min-h-10 text-primary-heavy">
                  <span>修改密碼：</span>
                  <button
                    type="button"
                    className="rounded-[10px] border border-secondary py-[9px] px-5 text-sm hover:bg-primary-heavy hover:text-white"
                  >
                    點我重設密碼
                  </button>
                </label>

                <label className="min-h-10 text-primary-heavy">
                  <span>會員姓名：</span>
                  <input
                    type="text"
                    className="rounded-[10px] border border-secondary py-[9px] px-3 text-sm caret-primary-heavy outline-none placeholder:text-primary-heavy"
                    placeholder="設計超人"
                    disabled={nameDisable}
                  />
                </label>

                <label className="min-h-10 py-2 text-primary-heavy">
                  <span>會員生日：</span>
                  <span className="text-sm">1998/88/99</span>
                </label>

                <label className="min-h-10 !mb-3 py-2 text-primary-heavy ">
                  <span>會員性別：</span>
                  <span className="text-sm">女</span>
                </label>
              </div>

              <div className="flex justify-center space-x-5 lg:justify-end">
                <button
                  type="button"
                  className="w-full max-w-[180px] rounded-full border border-primary-heavy py-4 font-bold text-primary-heavy"
                  onClick={edit}
                >
                  編輯
                </button>

                <button
                  type="submit"
                  className="w-full max-w-[180px] rounded-full border border-primary-heavy bg-primary-heavy py-4 font-bold text-white"
                >
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 手機版 預約管理 */}
      <section
        className={`mt-12 mb-28 lg:hidden lg:pt-[84px] lg:pb-[136px] ${
          userCenterPosition?.value === '預約管理' ? 'block' : 'hidden'
        }`}
      >
        <div className="container">
          <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
            目前尚無預約
          </div>
          <h2 className="mb-5 text-center leading-loose lg:hidden">預約管理</h2>

          <div className="mb-8 flex items-center space-x-5">
            <span className="text-sm text-primary-heavy">訂單狀態</span>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#767494',
                  colorText: '#767494',
                  colorBorder: '#767494',
                  colorTextQuaternary: '#767494',
                  controlHeight: 36,
                  borderRadius: 10,
                },
              }}
            >
              <Select
                defaultValue="待預約"
                style={{ width: 152 }}
                onChange={handleChange}
                options={orderStatus}
                getPopupContainer={(trigger) => trigger.parentElement}
              />
            </ConfigProvider>
          </div>

          {/* 表格顯示區塊 */}
          {test}
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
