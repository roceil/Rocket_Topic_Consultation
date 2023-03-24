import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCartOutlined, UserOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Modal, Space } from 'antd';

export default function HamburgerModal() {
  // 漢堡選單開關
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
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
        className="flexCenterCenter text-base text-primary-heavy shadow-none lg:hidden"
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
          <p className="my-3 text-center text-base font-bold text-primary-heavy">目前尚無預約</p>
        </div>
        <Space
          direction="vertical"
          style={{
            width: 276,
          }}
        >
          <Link href="/counselorlist">
            <Button type="link" onClick={handleCancel} icon={<SearchOutlined />} className="text-lg font-bold ">
              諮商師總覽
            </Button>
          </Link>
          <div className="my-2 border border-t-[1px] border-[#D4D2E3]" />
          <Link href="/shoppingcart">
            <Button type="link" icon={<ShoppingCartOutlined />} onClick={handleCancel} className="text-lg font-bold ">
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
          onClick={() => alert('登出成功，應該吧')}
        >
          登出
        </Button>
      </Modal>
    </ConfigProvider>
  );
}
