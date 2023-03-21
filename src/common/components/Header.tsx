/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button, ConfigProvider, Modal, Space,
} from 'antd';
import { useState } from 'react';
import { userCenterPosition } from '../redux/feature/userCenter';
import { IButton, darkBtn, lightBtn } from './IButton';
import SearchCapsule from './SearchCapsule';

const isLogIn = false; // 判斷是否登入，控制 Nav 顯示內容

// 登入時，顯示『會員中心、通知』icons
const LogInIcons = (
  <>
    <Button
      type="default"
      shape="circle"
      size="large"
      icon={(
        <BellOutlined
          style={{
            fontSize: '20px',
            color: '#8D8BA7',
          }}
        />
      )}
    />
    <Button
      type="default"
      shape="circle"
      size="large"
      icon={(
        <UserOutlined
          style={{
            fontSize: '20px',
            color: '#8D8BA7',
          }}
        />
      )}
    />
  </>
);

// 未登入時，顯示『登入/註冊』Btn
const YetLogInBtn = (
  <Link href="/login">
    <IButton
      text="登入 / 註冊"
      bgColor={lightBtn}
      fontSize="text-[14px] lg:text-base"
      px="px-6"
      py="py-3"
    />
  </Link>
);

export default function Header() {
  const dispatch = useDispatch();

  // 漢堡選單開關
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="my-[18px] lg:my-0 lg:py-[30px]">
      <div className="container flex items-center justify-between">
        <Link
          href="UserCenter"
          className="cursor-pointer text-2xl font-bold leading-normal text-[#5D5A88] hover:opacity-50"
          onClick={() => {
            dispatch(userCenterPosition('個人資料'));
          }}
        >
          Logo
        </Link>
        {/* 漢堡選單 */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#5D5A88',
              colorLink: '#5D5A88',
              colorLinkActive: '#8D8BA7',
              colorLinkHover: '#8D8BA7',
              colorIcon: '#5D5A88',
            },
          }}
        >
          <Button
            onClick={showModal}
            icon={<MenuOutlined />}
            type="primary"
            shape="round"
            className="text-base text-primary-heavy shadow-none lg:hidden"
          />
          <Modal
            width={348}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            maskStyle={{
              backgroundColor: '#EEECFA',
              boxShadow: 'none',
              display: 'flex',
              justifyContent: 'center',
            }}
            className="hamburger-menu"
          >
            {/* 課程連結 */}
            <div className="mt-12 mb-[52px] flex w-[276px] flex-col justify-center rounded-[10px] bg-[#EEECFA]">
              <p className="my-3 text-center text-base font-bold text-primary-heavy">
                目前尚無預約
              </p>
            </div>
            <Space direction="vertical" style={{ width: 276 }}>
              <Link href="/CounselorList">
                <Button
                  type="link"
                  onClick={handleCancel}
                  icon={<SearchOutlined />}
                  className="text-lg font-bold"
                >
                  諮商師總覽
                </Button>
              </Link>
              <div className="my-2 border border-t-[1px] border-[#D4D2E3]" />
              <Link href="/ShopCart">
                <Button
                  type="link"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleCancel}
                  className="text-lg font-bold"
                >
                  購物車
                </Button>
              </Link>
              <div className="my-2 border border-t-[1px] border-[#D4D2E3]" />
              <Button type="link" icon={<UserOutlined />} className="text-lg font-bold">
                會員中心
              </Button>
              <Button type="link" className="ml-[26px] text-base">
                個人資料
              </Button>
              <Button type="link" className="ml-[26px] text-base">
                預約管理
              </Button>
              <Button type="link" className="ml-[26px] text-base">
                個案記錄
              </Button>
              <div className="my-2 border border-t-[1px] border-[#D4D2E3]" />
            </Space>

            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              className="mt-20 h-[56px] w-[276px] bg-[#5D5A88] text-base text-white shadow-none"
            >
              登出
            </Button>
          </Modal>
        </ConfigProvider>

        {/* PC 版導覽列 */}
        <div className="hidden lg:block">
          <ul className="flex items-center space-x-5">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#D4D2E3',
                  borderRadiusLG: 100,
                  borderRadius: 100,
                  colorBorder: '#D4D2E3',
                  colorFillAlter: '#FFF',
                },
                components: {},
              }}
            >
              <SearchCapsule
                colorPrimary="#5D5A88"
                borderRadius={100}
                controlHeight={40}
                colorBgContainer="#fff"
                placeholder=""
              />
              <Button
                type="default"
                shape="circle"
                size="large"
                icon={(
                  <ShoppingCartOutlined
                    style={{
                      fontSize: '20px',
                      color: '#8D8BA7',
                    }}
                  />
                )}
              />
              {isLogIn && LogInIcons}
            </ConfigProvider>
            {!isLogIn && YetLogInBtn}
            <IButton
              text="尋找諮商師"
              bgColor={darkBtn}
              fontSize="text-[14px] lg:text-base"
              px="px-6"
              py="py-3"
            />
          </ul>
        </div>
      </div>
    </header>
  );
}
