/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import Link from 'next/link';
import { ShoppingCartOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import { deleteCookie } from 'cookies-next';
import { useSelector, useDispatch } from 'react-redux';
import { selectHasToken, hasToken } from '../redux/feature/hasToken';
import { IButton, darkBtn, lightBtn } from './IButton';
import SearchCapsule from './SearchCapsule';
import HamburgerModal from './HamburgerModal';

export default function Header() {
  const hasTAuth = useSelector(selectHasToken);
  const dispatch = useDispatch();
  console.log('🚀 ~ file: Header.tsx:70 ~ Header ~ hasToken:', hasTAuth);

  // 登入時，顯示『會員中心、通知』icons
  const LogInBtn = (
    <>
      <Button
        type="default"
        shape="circle"
        size="large"
        onClick={() => {
          dispatch(hasToken(false));
          deleteCookie('auth');
        }}
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
      <IButton text="登入 / 註冊" bgColor={lightBtn} fontSize="text-[14px] lg:text-base" px="px-6" py="py-3" />
    </Link>
  );

  return (
    <header className="my-[18px] lg:my-0 lg:py-[30px]">
      <div className="container flex items-center justify-between">
        <Link href="/" className="cursor-pointer text-2xl font-bold leading-normal text-[#5D5A88] hover:opacity-50">
          Logo
        </Link>
        {/* 漢堡選單 */}
        <HamburgerModal />

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
              <SearchCapsule colorPrimary="#5D5A88" borderRadius={100} controlHeight={40} colorBgContainer="#fff" placeholder="" />
              <Link href="/shoppingcart">
                <button className="flexCenterCenter rounded-full border border-secondary p-[10px] text-xl text-primary-heavy hover:opacity-50">
                  <ShoppingCartOutlined />
                </button>
              </Link>
              {hasTAuth ? LogInBtn : YetLogInBtn}
            </ConfigProvider>

            <Link href="/counselorlist">
              <IButton text="尋找諮商師" bgColor={darkBtn} fontSize="text-[14px] lg:text-base" px="px-6" py="py-3" />
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}
