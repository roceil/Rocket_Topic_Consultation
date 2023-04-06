import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import { selectHasToken } from '../redux/feature/hasToken';
import { IButton } from './IButton';
import SearchCapsule from './SearchCapsule';
import HamburgerModal from './HamburgerModal';
import HasLoginBtn from './HasLoginBtn';
import NoLoginBtn from './NoLoginBtn';
import LOGO from '../../../public/images/header/LOGO.svg';

export default function Header() {
  const { auth, identity } = useSelector(selectHasToken);
  const hasCookie = auth !== undefined;
  const handleDisplay = identity === 'counselor' ? 'hidden' : 'block';

  return (
    <header className="border border-gray-200 bg-gray-100/70 py-[18px] lg:py-[30px]">
      <div className="container flex items-center justify-between">
        <Link href="/" className="cursor-pointer text-2xl font-bold leading-normal text-secondary active:scale-[0.8] lg:hover:opacity-50">
          <Image src={LOGO} alt="LOGO" width={100} height={43} className="h-9 w-[60px ] lg:h-auto lg:w-auto" />
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
            <SearchCapsule colorPrimary="#5D5A88" borderRadius={99999} controlHeight={40} colorBgContainer="#FFFEFC" placeholder="" />

            <Link href="/shoppingcart" className={handleDisplay}>
              <button type="button" className="btnHover group h-10 w-10">
                <span className="btnHoverText">
                  <ShoppingCartOutlined className="p-[10px] text-xl" />
                </span>
              </button>
            </Link>

            {/* 判斷是否有登入，有登入就顯示『會員中心、通知』icons，沒有登入就顯示『登入、註冊』icons */}
            {hasCookie ? <HasLoginBtn /> : <NoLoginBtn />}

            <Link href="/counselorlist/1" className="flex flex-shrink-0 justify-center">
              <IButton text="尋找諮商師" fontSize="text-[14px] lg:text-base" px="px-6" py="py-3" />
            </Link>
          </ConfigProvider>
        </div>
      </div>
    </header>
  );
}
