/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
import Link from 'next/link';
import Image from 'next/image';
import { ConfigProvider, Collapse } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import footerLOGO from '../../../public/images/footer/footerLOGO.svg';

// Footer - 折疊元件(Mobile)
const { Panel } = Collapse;
const userCenterChilds = (
  <ul className="flex flex-col space-y-4">
    <li className="text-sm text-secondary">
      <Link href="/usercenter">個人資料</Link>
    </li>
    <li className="text-sm text-secondary">
      <Link href="/usercenter/reservation">預約記錄</Link>
    </li>
    <li className="text-sm text-secondary hover:text-white">
      <Link href="/signup">加入會員</Link>
    </li>
    <li className="text-sm text-secondary">
      <Link href="/">最新活動</Link>
    </li>
  </ul>
);
const questionChilds = (
  <ul className="flex flex-col space-y-4">
    <li className="text-sm text-secondary">
      <Link href="/">預約教學</Link>
    </li>
    <li className="text-sm text-secondary">
      <Link href="/">註冊認證</Link>
    </li>
    <li className="text-sm text-secondary hover:text-white">
      <Link href="/">付款相關</Link>
    </li>
    <li className="text-sm text-secondary">
      <Link href="/">退課相關</Link>
    </li>
    <li className="text-sm text-secondary">
      <Link href="/">條款與政策</Link>
    </li>
  </ul>
);
const aboutUsChilds = (
  <ul className="flex flex-col space-y-4">
    <li className="text-sm text-secondary">
      <Link href="/">品牌故事</Link>
    </li>
    <li className="text-sm text-secondary">
      <Link href="/">合作機構</Link>
    </li>
  </ul>
);
const followUsChilds = (
  <ul className="flex flex-col space-y-4">
    <li className="text-sm text-secondary">
      <Link href="/">Facebook</Link>
    </li>
    <li className="text-sm text-secondary">
      <Link href="/">Instagram</Link>
    </li>
  </ul>
);

export default function Footer() {
  return (
    <footer className="bg-primary lg:py-[72px]">
      {/* PC Footer */}
      <div className="hidden lg:block">
        <div className="container flex justify-center space-x-[225px]">
          {/* Logo & copy right */}
          <div className="flex flex-col justify-between">
            <Image src={footerLOGO} alt="footerLOGO" width={100} height={100} />
            <p className="text-sm text-secondary">
              Copyright © 2023 xxxxxxxxxxx
              <br />
              All Rights Reserved
            </p>
          </div>
          {/* Footers */}
          <div className="flex space-x-[120px] text-center text-secondary">
            {/* 會員中心 */}
            <div>
              <h3 className="mb-6 text-base font-bold">會員中心</h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link href="/LogIn">個人資料</Link>
                </li>
                <li>
                  <Link href="/ForgetPassword">預約記錄</Link>
                </li>
                <li>
                  <Link href="/signup">加入會員</Link>
                </li>
                <li className="">最新活動</li>
              </ul>
            </div>

            {/* 常見問題 */}
            <div>
              <h3 className="mb-6 text-base font-bold">常見問題</h3>
              <ul className="space-y-4 text-sm">
                <li className="">預約教學</li>
                <li className="">註冊認證</li>
                <li className="">付款相關</li>
                <li className="">退課相關</li>
                <li className="">條款與政策</li>
              </ul>
            </div>

            {/* 關於我們 */}
            <div>
              <h3 className="mb-6 text-base font-bold ">關於我們</h3>
              <ul className="space-y-4 text-sm">
                <li className="">品牌故事</li>
                <li className="">合作機構</li>
              </ul>
            </div>

            {/* 追蹤我們 */}
            <div>
              <h3 className="mb-6 text-base font-bold">追蹤我們</h3>
              <ul className="space-y-4 text-sm">
                <li className="">Facebook</li>
                <li className="">Instagram</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="container py-[72px] lg:hidden">
        <div className="footer-mobile mb-12 px-7">
          <ConfigProvider
            theme={{
              token: {
                colorTextBase: '#424242',
                colorBorder: '#424242',
              },
            }}
          >
            <Collapse bordered={false} expandIconPosition="end" className="bg-primary" expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}>
              <Panel header="會員中心" key="1">
                {userCenterChilds}
              </Panel>
              <Panel header="常見問題" key="2">
                {questionChilds}
              </Panel>
              <Panel header="關於我們" key="3">
                {aboutUsChilds}
              </Panel>
              <Panel header="追蹤我們" key="4">
                {followUsChilds}
              </Panel>
              <div className="h-[1px] border-primary-heavy" />
            </Collapse>
          </ConfigProvider>
        </div>

        <div className="px-7 text-sm text-secondary">
          <p>
            Copyright © 2023 consulation
            <br />
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
