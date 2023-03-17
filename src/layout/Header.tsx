/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import { userCenterPosition } from '@/redux/feature/userCenter';
import { IButton, darkBtn, lightBtn } from '../components/Public/IButton';
import { SearchCapsule } from '@/components/Public/SearchCapsule';

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
  <IButton
    text="登入 / 註冊"
    bgColor={lightBtn}
    fontSize="text-[14px] lg:text-base"
    px="px-6"
    py="py-3"
  />
);

// Header - input 元件(PC)
export const onSearch = (value: any) => console.log(value);

export function Header() {
  const dispatch = useDispatch();
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

        <div className="flex h-6 w-6 items-center justify-center  lg:hidden xl:hidden">
          <Link href="UserCenter">
            <button
              className="h-[10px] w-[18px] border-y-2 border-y-[#5D5A88]"
              onClick={() => {
                dispatch(userCenterPosition('預約管理'));
              }}
            />
          </Link>
        </div>
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
