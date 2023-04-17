import { useState } from 'react';
import Link from 'next/link';
import { Button, ConfigProvider, Modal } from 'antd';
import { deleteCookie, getCookie } from 'cookies-next';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { counselorListAry, userListAry, counselorCenterAry, userCenterAry } from '@/lib/hamburger/aryData';
import useOpenLoading from '../hooks/useOpenLoading';

export default function HamburgerModal() {
  const auth = getCookie('auth');
  const identity = getCookie('identity');
  const openLoading = useOpenLoading();

  const isLogin = auth !== undefined;
  const handleDisplay = isLogin ? 'block' : 'hidden';
  const handleText = isLogin ? '登出' : '登入 / 註冊';
  const handleLink = isLogin ? '/' : '/login';
  const checkIdentity = identity === 'counselor' ? counselorListAry : userListAry;
  const checkCenter = identity === 'counselor' ? counselorCenterAry : userCenterAry;

  // ==================== 漢堡選單狀態 ====================
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ==================== 漢堡選單函式 ====================
  const showModal = () => {
    setIsModalOpen(true);
  };

  // ==================== 關閉漢堡選單 ====================
  const handleCancel = () => {
    openLoading();
    setIsModalOpen(false);
  };

  // ==================== 登入 / 登出函式 ====================
  const loginLogout = () => {
    // 登出條件
    if (isLogin) {
      deleteCookie('auth');
      deleteCookie('identity');
      deleteCookie('userID');
      alert('登出成功');
      handleCancel();
    }
    handleCancel();
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFF6E2',
          colorLink: '#5D5A88',
          colorLinkActive: '#8D8BA7',
          colorLinkHover: '#8D8BA7',
          colorIcon: '#5D5A88',
        },
      }}
    >
      <Button onClick={showModal} icon={<MenuOutlined />} type="primary" shape="round" className="flexCenterCenter text-base text-secondary shadow-none lg:hidden" />

      {/* 漢堡選單本體 */}
      <Modal
        width={348}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        maskStyle={{
          backgroundColor: '#FFF6E2',
          boxShadow: 'none',
          display: 'flex',
          justifyContent: 'center',
        }}
        className="hamburger-menu"
      >
        {/* 課程連結文字欄 */}
        <div className={`${handleDisplay} mb-8 flex w-full flex-col justify-center rounded-[10px] bg-primary-heavy py-3`}>
          <p className="text-center text-base font-bold text-secondary">目前尚無預約</p>
        </div>

        {/* 列表清單 */}
        <ul className="w-full">
          {/* 這裡會列出前兩個按鈕 */}
          {checkIdentity.map(({ labelName, link, icon }) => (
            <li key={labelName} className="border-b-2 border-gray-400 py-5 ">
              <Link href={link} className="flex items-center justify-start space-x-5 text-gray-900">
                {icon}
                <button type="button" onClick={handleCancel} className="text-lg font-bold ">
                  {labelName}
                </button>
              </Link>
            </li>
          ))}

          {/* 這裡會列出會員中心的子按鈕 */}
          <li className={`${handleDisplay} border-b-2 border-gray-400 py-5`}>
            <Link href="/UserCenter" className="flex items-center justify-start space-x-5 text-gray-900">
              <UserOutlined className="text-lg" />
              <button type="button" onClick={handleCancel} className="text-lg font-bold ">
                會員中心
              </button>
            </Link>
            <div className="mt-4 flex flex-col items-start space-y-4 text-secondary">
              {checkCenter.map(({ lableName, link }) => (
                <Link key={lableName} href={link}>
                  <button type="button" onClick={handleCancel} className="ml-[38px] text-base text-gray-900">
                    {lableName}
                  </button>
                </Link>
              ))}
            </div>
          </li>
        </ul>

        {/* 登入登出按鈕 */}
        <Link href={handleLink} className="w-full">
          <button type="button" className="mt-20 h-[56px] w-full rounded-full bg-gray-300 text-base font-bold text-gray-900" onClick={loginLogout}>
            {handleText}
          </button>
        </Link>
      </Modal>
    </ConfigProvider>
  );
}
