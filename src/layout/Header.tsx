import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Button, ConfigProvider, Input } from 'antd'
import { IButton, darkBtn, lightBtn } from '../components/Public/IButton'

const isLogIn = false // 判斷是否登入，控制 Nav 顯示內容

// 登入時，顯示『會員中心、通知』icons
const LogInIcons = (
  <>
    <Button
      type='default'
      shape='circle'
      size='large'
      icon={
        <BellOutlined
          style={{
            fontSize: '20px',
            color: '#8D8BA7'
          }}
        />
      }
    />
    <Button
      type='default'
      shape='circle'
      size='large'
      icon={
        <UserOutlined
          style={{
            fontSize: '20px',
            color: '#8D8BA7'
          }}
        />
      }
    />
  </>
)

// 未登入時，顯示『登入/註冊』Btn
const YetLogInBtn = (
  <IButton
    text='登入 / 註冊'
    bgColor={lightBtn}
    fontSize='text-[14px] lg:text-base'
    px='px-6'
    py='py-3'
  ></IButton>
)

// Header - input 元件(PC)
const { Search } = Input
export const onSearch = (value: any) => console.log(value)

export function Header() {
  return (
    <header className='my-[18px] lg:my-0 lg:py-[30px]'>
      <div className='container flex items-center justify-between'>
        <div className='text-2xl font-bold leading-normal text-[#5D5A88]'>
          Logo
        </div>
        <div className='flex h-6 w-6 items-center justify-center  lg:hidden xl:hidden'>
          <div className='h-[10px] w-[18px] border-y-2 border-y-[#5D5A88]'></div>
        </div>
        {/* PC 版導覽列 */}
        <div className='hidden lg:block'>
          <ul className='flex items-center space-x-5'>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#D4D2E3',
                  borderRadiusLG: 100,
                  borderRadius: 100,
                  colorBorder: '#D4D2E3',
                  colorFillAlter: '#FFF'
                },
                components: {}
              }}
            >
              <Search
                placeholder=''
                onSearch={onSearch}
                size='large'
                style={{
                  width: 180
                }}
              />
              <Button
                type='default'
                shape='circle'
                size='large'
                icon={
                  <ShoppingCartOutlined
                    style={{
                      fontSize: '20px',
                      color: '#8D8BA7'
                    }}
                  />
                }
              />
              {isLogIn && LogInIcons}
            </ConfigProvider>
            {!isLogIn && YetLogInBtn}
            <IButton
              text='尋找諮商師'
              bgColor={darkBtn}
              fontSize='text-[14px] lg:text-base'
              px='px-6'
              py='py-3'
            ></IButton>
          </ul>
        </div>
      </div>
    </header>
  )
}
