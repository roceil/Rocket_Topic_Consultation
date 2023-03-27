import Link from 'next/link';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import { selectHasToken } from '../redux/feature/hasToken';
import { IButton, darkBtn } from './IButton';
import SearchCapsule from './SearchCapsule';
import HamburgerModal from './HamburgerModal';
import HasLoginBtn from './HasLoginBtn';
import NoLoginBtn from './NoLoginBtn';

export default function Header() {
  const { auth, identity } = useSelector(selectHasToken);
  const hasCookie = auth !== undefined;
  const handleDisplay = identity === 'counselor' ? 'hidden' : 'block';

  return (
    <header className="py-[18px] lg:py-[30px] bg-gray-100/70 border border-gray-200">
      <div className="container flex items-center justify-between">
        <Link href="/" className="cursor-pointer text-2xl font-bold leading-normal text-secondary hover:opacity-50">
          Logo
        </Link>

        {/* 漢堡選單 */}
        <HamburgerModal />

        {/* PC 版導覽列 */}
        <div className="hidden lg:flex lg:items-center lg:space-x-5">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#D4D2E3',
                borderRadiusLG: 100,
                borderRadius: 100,
                colorBorder: '#D4D2E3',
                colorFillAlter: '#FFF',
              },
            }}
          >
            <SearchCapsule colorPrimary="#5D5A88" borderRadius={99999} controlHeight={40} colorBgContainer="#fff" placeholder="" />

            <Link href="/shoppingcart" className={handleDisplay}>
              <button type="button" className="flexCenterCenter rounded-full border border-secondary p-[10px] text-xl text-secondary hover:opacity-50">
                <ShoppingCartOutlined />
              </button>
            </Link>

            {/* 判斷是否有登入，有登入就顯示『會員中心、通知』icons，沒有登入就顯示『登入、註冊』icons */}
            {hasCookie ? <HasLoginBtn /> : <NoLoginBtn />}

            <Link href="/counselorlist">
              <IButton text="尋找諮商師" bgColor={darkBtn} fontSize="text-[14px] lg:text-base" px="px-6" py="py-3" />
            </Link>
          </ConfigProvider>
        </div>
      </div>
    </header>
  );
}
