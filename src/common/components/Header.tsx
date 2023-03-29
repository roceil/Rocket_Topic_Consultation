import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import { selectHasToken } from '../redux/feature/hasToken';
import { IButton, darkBtn } from './IButton';
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
        <Link href="/" className="cursor-pointer text-2xl font-bold leading-normal text-secondary hover:opacity-50">
          <Image src={LOGO} alt="LOGO" width={100} height={43} />
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
            {/*
            <Link href="/shoppingcart" className={handleDisplay}>
              <button type="button" className="flexCenterCenter fakeBorder rounded-full p-[10px] text-xl text-secondary ">
                <ShoppingCartOutlined />
              </button>
            </Link> */}

            <div className="fakeBorder group relative inline-block h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-inherit [transform:translateZ(0)] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:origin-[100%_100%] before:scale-x-0 before:bg-secondary before:transition before:duration-500 before:ease-in-out hover:before:origin-[0_0] hover:before:scale-x-100 cursor-pointer active:scale-50">
              <span
                className="justify-center relative z-0 flex p-[10px] text-xl font-bold text-secondary transition duration-200 ease-in-out group-hover:text-gray-200
              "
              >
                <ShoppingCartOutlined />
              </span>
            </div>

            {/* 判斷是否有登入，有登入就顯示『會員中心、通知』icons，沒有登入就顯示『登入、註冊』icons */}
            {hasCookie ? <HasLoginBtn /> : <NoLoginBtn />}

            <Link href="/counselorlist" className="flex flex-shrink-0 justify-center active:rotate-45">
              <IButton text="尋找諮商師" bgColor={darkBtn} fontSize="text-[14px] lg:text-base" px="px-6" py="py-3" />
            </Link>
          </ConfigProvider>
        </div>
      </div>
    </header>
  );
}
