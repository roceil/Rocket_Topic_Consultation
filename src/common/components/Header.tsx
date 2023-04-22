import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import LOGO from 'public/images/header/LOGO.svg';
import LOGO_SM from 'public/images/header/LOGO_SM.svg';
import { IButton } from './IButton';
import SearchCapsule from './SearchCapsule';
import HamburgerModal from './HamburgerModal';
import HasLoginBtn from './HasLoginBtn';
import NoLoginBtn from './NoLoginBtn';
import useOpenLoading from '../hooks/useOpenLoading';
import { useZoomLinkGetQuery } from '../redux/service/header';

export default function Header() {
  const openLoading = useOpenLoading();
  const [isMounted, setIsMounted] = useState(false);
  const getToken = isMounted ? getCookie('auth') : undefined;
  const getIdentity = isMounted ? getCookie('identity') : undefined;
  const hasCookie = isMounted && getToken !== undefined;
  const handleDisplay = isMounted && getIdentity === 'counselor' ? 'hidden' : 'block';
  const { data, isLoading } = useZoomLinkGetQuery({ token: getToken }, {
    // 10 秒重新發送請求
    pollingInterval: 10 * 1000,
  });

  // 避免兩端渲染不同，進入畫面後才更改狀態
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data, isLoading]);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border border-gray-200  bg-gray-100/80 py-[18px] backdrop-blur-2xl lg:py-[30px]">
        <div className="container flex items-center justify-between">
          <Link href="/" className="hidden lg:block cursor-pointer text-2xl font-bold leading-normal text-secondary active:scale-[0.8] ">
            <Image src={LOGO} alt="LOGO" width={100} height={43} />
          </Link>

          <Link href="/" className="cursor-pointer text-2xl font-bold leading-normal text-secondary active:scale-[0.8] lg:hidden">
            <Image src={LOGO_SM} alt="LOGO" width={60} height={27} />
          </Link>

          {/* 漢堡選單 */}
          <HamburgerModal />

          {/* PC 版導覽列 */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-5">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#D4D2E3',
                  borderRadiusLG: 100,
                  borderRadius: 100,
                  colorBorder: '#4A5364',
                },
              }}
            >
              <div className="hidden">
                <SearchCapsule colorPrimary="#4A5364" borderRadius={99999} controlHeight={40} colorBgContainer="#FFFEFC" />
              </div>

              <Link href="/shoppingcart" className={handleDisplay}>
                <button type="button" className="btnHover group h-10 w-10" onClick={openLoading}>
                  <span className="btnHoverText">
                    <ShoppingCartOutlined className="p-[10px] text-xl" />
                  </span>
                </button>
              </Link>

              {/* 判斷是否有登入，有登入就顯示『會員中心、通知』icons，沒有登入就顯示『登入、註冊』icons */}
              {hasCookie ? <HasLoginBtn /> : <NoLoginBtn />}

              <Link href="/counselorlist/1" className="flex flex-shrink-0 justify-center">
                <IButton text="尋找諮商師" fontSize="text-[14px] lg:text-base" px="px-6" py="py-3" mode="dark" onClick={openLoading} />
              </Link>
            </ConfigProvider>
          </div>
        </div>
      </header>

      {/* header佔位格 */}
      <div className="h-[70px] lg:h-[110px]" />
    </>
  );
}
