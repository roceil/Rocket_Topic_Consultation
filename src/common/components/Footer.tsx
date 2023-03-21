/* eslint-disable import/no-extraneous-dependencies */
import Link from 'next/link';
import { ConfigProvider, Collapse } from 'antd';

// Footer - 折疊元件(Mobile)
const { Panel } = Collapse;
const text = (
  <p style={{ color: '#9795B5', fontSize: '14px' }}>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
);

export default function Footer() {
  return (
    <footer className="footer-shadow lg:py-[72px]">
      {/* PC Footer */}
      <div className="hidden lg:block">
        <div className="container flex h-[217px] w-[1056px] justify-between p-0">
          {/* Logo & copy right */}
          <section className="flex flex-col justify-between">
            <h2 className="text-[24px]">Logo</h2>
            <div>
              <p className="text-[14px] leading-normal text-[#9795B5]">
                Copyright © 2023 xxxxxxxxxxx
              </p>
              <p className="text-[14px] leading-normal text-[#9795B5]">
                All Rights Reserved
              </p>
            </div>
          </section>
          {/* Footers */}
          <div className="flex space-x-[120px]">
            <section>
              <h3 className="mb-6 text-base font-bold text-primary-heavy">
                會員中心
              </h3>
              <ul className="space-y-4 text-[14px] text-[#9795B5]">
                <li>
                  <Link href="/LogIn">個人資料</Link>
                </li>
                <li>
                  <Link href="/ForgetPassword">預約記錄</Link>
                </li>
                <li>
                  <Link href="/ResetPassword">加入會員</Link>
                </li>
                <li className="">最新活動</li>
              </ul>
            </section>
            <section>
              <h3 className="mb-6 text-base font-bold text-primary-heavy">
                常見問題
              </h3>
              <ul className="space-y-4 text-[14px] text-[#9795B5]">
                <li className="">預約教學</li>
                <li className="">註冊認證</li>
                <li className="">付款相關</li>
                <li className="">退課相關</li>
                <li className="">條款與政策</li>
              </ul>
            </section>
            <section>
              <h3 className="mb-6 text-base font-bold text-primary-heavy">
                關於我們
              </h3>
              <ul className="space-y-4 text-[14px] text-[#9795B5]">
                <li className="">品牌故事</li>
                <li className="">合作機構</li>
              </ul>
            </section>
            <section>
              <h3 className="mb-6 text-base font-bold text-primary-heavy">
                追蹤我們
              </h3>
              <ul className="space-y-4 text-[14px] text-[#9795B5]">
                <li className="">Facebook</li>
                <li className="">Instagram</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      {/* Mobile Footer */}
      <div className="container py-[72px] lg:hidden">
        <div className="footer-mobile mb-12 px-7">
          <ConfigProvider
            theme={{
              token: {
                colorTextBase: '#5D5A88',
                colorBorder: '#5D5A88',
              },
            }}
          >
            <Collapse
              bordered={false}
              expandIconPosition="end"
              style={{ background: '#fff' }}
            >
              <Panel header="會員中心" key="1">
                {text}
              </Panel>
              <Panel header="常見問題" key="2">
                {text}
              </Panel>
              <Panel header="關於我們" key="3">
                {text}
              </Panel>
              <Panel header="追蹤我們" key="4">
                {text}
              </Panel>
              <div className="h-[1px] border-primary-heavy" />
            </Collapse>
          </ConfigProvider>
        </div>
        <div className="px-7">
          <p className="text-[14px] leading-normal text-[#9795B5]">
            Copyright © 2023 xxxxxxxxxxx
          </p>
          <p className="text-[14px] leading-normal text-[#9795B5]">
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
