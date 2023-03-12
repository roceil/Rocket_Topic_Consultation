import { ConfigProvider, Select, Tabs } from 'antd'
import user from '../../public/images/user.svg'
import profile from '../../public/images/profile.svg'
import Image from 'next/image'
import { useState } from 'react'

function UserInformation({
  save,
  edit,
  nameDisable,
  accountName,
  accountEmail
}: any) {
  return (
    <form
      onSubmit={save}
      className='flex w-full flex-col  border-secondary  lg:mt-[62px] lg:pl-[76px]'
    >
      <div className='mb-12 flex flex-col space-y-6 border-y py-8 lg:rounded-xl lg:border lg:border-secondary lg:py-10 lg:px-9'>
        <label className='min-h-10 py-2 text-primary-heavy'>
          <span>會員帳號：</span>
          <span className='text-sm'>{accountEmail}</span>
        </label>

        <label className='min-h-10 text-primary-heavy'>
          <span>修改密碼：</span>
          <button
            type='button'
            className='rounded-[10px] border border-secondary py-[9px] px-5 text-sm hover:bg-primary-heavy hover:text-white'
          >
            點我重設密碼
          </button>
        </label>

        <label className='min-h-10 text-primary-heavy'>
          <span>會員姓名：</span>
          <input
            type='text'
            className='rounded-[10px] border border-secondary py-[9px] px-3 text-sm caret-primary-heavy outline-none placeholder:text-primary-heavy'
            placeholder={accountName}
            disabled={nameDisable}
          />
        </label>

        <label className='min-h-10 py-2 text-primary-heavy'>
          <span>會員生日：</span>
          <span className='text-sm'>1998/88/99</span>
        </label>

        <label className='min-h-10 !mb-3 py-2 text-primary-heavy '>
          <span>會員性別：</span>
          <span className='text-sm'>女</span>
        </label>
      </div>

      <div className='flex justify-center space-x-5 lg:justify-end'>
        <button
          type='button'
          className='w-full max-w-[180px] rounded-full border border-primary-heavy py-4 font-bold text-primary-heavy'
          onClick={edit}
        >
          編輯
        </button>

        <button
          type='submit'
          className='w-full max-w-[180px] rounded-full border border-primary-heavy bg-primary-heavy py-4 font-bold text-white'
        >
          儲存
        </button>
      </div>
    </form>
  )
}

function WaitReservation() {
  return (
    <div className=' w-full rounded-2xl bg-bg2 text-center'>
      <ul className='flex w-full border-b border-secondary text-sm font-bold text-[#767494]'>
        <li className='w-[26.8421%] py-5'>諮商師</li>
        <li className='w-[31.5789%] py-5'>諮商議題</li>
        <li className='w-[41.57894%] py-5 pl-10 text-left'>選擇時段</li>
      </ul>

      <ul className='mt-5 flex flex-col space-y-4 px-4 pb-9 text-sm text-primary-heavy'>
        <li className='flex items-center rounded-lg bg-white py-3'>
          <p className='w-[23.5632%]'>我真的</p>
          <p className='w-[35.6321%]'>討厭table</p>
          <div className='w-[40.8045%]'>
            <button className=' rounded-full border border-primary-heavy py-1 px-[19px] text-xs font-semibold text-primary-heavy'>
              選擇預約時段
            </button>
          </div>
        </li>

        <li className='flex items-center rounded-lg bg-white py-3'>
          <p className='w-[23.5632%]'>我真的</p>
          <p className='w-[35.6321%]'>討厭table</p>
          <div className='w-[40.8045%]'>
            <button className=' rounded-full border border-primary-heavy py-1 px-[19px] text-xs font-semibold text-primary-heavy'>
              選擇預約時段
            </button>
          </div>
        </li>

        <li className='flex items-center rounded-lg bg-white py-3'>
          <p className='w-[23.5632%]'>我真的</p>
          <p className='w-[35.6321%]'>討厭table</p>
          <div className='w-[40.8045%]'>
            <button className=' rounded-full border border-primary-heavy py-1 px-[19px] text-xs font-semibold text-primary-heavy'>
              選擇預約時段
            </button>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default function UserCenter() {
  const [nameDisable, setNameDisable] = useState(true)
  const [tab, setTab] = useState('待預約')

  const edit = () => setNameDisable(false)

  const save = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (nameDisable === true) return
    setNameDisable(true)
    alert('儲存成功')
  }

  const handleChange = (value: string) => {
    setTab(value)
  }

  const UserCenterTabAry = [
    {
      label: (
        <div className='flex items-center justify-between space-x-4'>
          <Image src={user} alt='user_icon' width={20} height={20} />
          <span className=''>個人資料</span>
        </div>
      ),
      key: '個人資料',
      children: (
        <UserInformation
          edit={edit}
          save={save}
          nameDisable={nameDisable}
          accountName={'菲菲'}
          accountEmail={'test@no.mail'}
        />
      )
    },
    {
      label: (
        <div className='flex items-center justify-between space-x-4'>
          <Image src={profile} alt='user_icon' width={20} height={20} />
          <span className=''>預約管理</span>
        </div>
      ),
      key: '預約管理',
      children: `預約管理`
    }
  ]

  const orderStatus = [
    { value: '待預約', label: '待預約' },
    { value: '待回覆', label: '待回覆' },
    { value: '已成立', label: '已成立' },
    { value: '已取消', label: '已取消' }
  ]

  const checkTab = tab === '待預約' ? <WaitReservation /> : <p>還沒做</p>
  return (
    <>
      {/* 手機版 個人資料*/}
      {/* <section className='pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px]'>
        <div className='container'>
          <div className='hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block'>
            目前尚無預約
          </div>
          <h2 className='mb-5 text-center leading-loose lg:hidden'>個人資料</h2>
          <div className='justify-between lg:flex'>
            <div className='hidden h-[242px] w-[116px] ring-1 lg:block '>
              <h3 className='mb-8 font-bold text-primary-heavy'>會員中心</h3>
            </div>

            <form
              onSubmit={save}
              className='flex w-full flex-col  border-secondary  lg:mt-[62px] lg:max-w-[1012px] '
            >
              <div className='mb-12 flex flex-col space-y-6 border-y py-8 lg:rounded-xl lg:border lg:border-secondary lg:py-10 lg:px-9'>
                <label className='min-h-10 py-2 text-primary-heavy'>
                  <span>會員帳號：</span>
                  <span className='text-sm'>hello@gamil.com</span>
                </label>

                <label className='min-h-10 text-primary-heavy'>
                  <span>修改密碼：</span>
                  <button
                    type='button'
                    className='rounded-[10px] border border-secondary py-[9px] px-5 text-sm hover:bg-primary-heavy hover:text-white'
                  >
                    點我重設密碼
                  </button>
                </label>

                <label className='min-h-10 text-primary-heavy'>
                  <span>會員姓名：</span>
                  <input
                    type='text'
                    className='rounded-[10px] border border-secondary py-[9px] px-3 text-sm caret-primary-heavy outline-none placeholder:text-primary-heavy'
                    placeholder='設計超人'
                    disabled={nameDisable}
                  />
                </label>

                <label className='min-h-10 py-2 text-primary-heavy'>
                  <span>會員生日：</span>
                  <span className='text-sm'>1998/88/99</span>
                </label>

                <label className='min-h-10 !mb-3 py-2 text-primary-heavy '>
                  <span>會員性別：</span>
                  <span className='text-sm'>女</span>
                </label>
              </div>

              <div className='flex justify-center space-x-5 lg:justify-end'>
                <button
                  type='button'
                  className='w-full max-w-[180px] rounded-full border border-primary-heavy py-4 font-bold text-primary-heavy'
                  onClick={edit}
                >
                  編輯
                </button>

                <button
                  type='submit'
                  className='w-full max-w-[180px] rounded-full border border-primary-heavy bg-primary-heavy py-4 font-bold text-white'
                >
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      </section> */}

      {/* 手機版 預約管理 */}
      <section className='mt-12 mb-28 lg:hidden lg:pt-[84px] lg:pb-[136px] '>
        <div className='container'>
          <div className='hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block'>
            目前尚無預約
          </div>
          <h2 className='mb-5 text-center leading-loose lg:hidden'>預約管理</h2>

          <div className='mb-8 flex items-center space-x-5'>
            <span className='text-sm text-primary-heavy'>訂單狀態</span>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#767494',
                  colorText: '#767494',
                  colorBorder: '#767494',
                  colorTextQuaternary: '#767494',
                  controlHeight: 36,
                  borderRadius: 10
                }
              }}
            >
              <Select
                defaultValue='待預約'
                style={{ width: 152 }}
                onChange={handleChange}
                options={orderStatus}
              />
            </ConfigProvider>
          </div>

          {checkTab}
        </div>
      </section>

      {/* 電腦版 */}
      <section className='hidden pt-12 pb-28 lg:block lg:pt-[84px] lg:pb-[136px]'>
        <div className='container min-h-[calc(100vh-330px)]'>
          <div className='hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block'>
            目前尚無預約
          </div>

          <div className=''>
            <h3 className='mb-8 font-bold text-primary-heavy'>會員中心</h3>
            <div className='userCenterTab'>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#767494',
                    colorText: '#767494',
                    fontSize: 16
                  }
                }}
              >
                <Tabs tabPosition={'left'} items={UserCenterTabAry} />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
