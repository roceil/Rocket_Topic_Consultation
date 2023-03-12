import { useState } from 'react'

export default function UserCenter() {
  const [nameDisable, setNameDisable] = useState(true)

  const edit = () => setNameDisable(false)

  const save = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log('送出')
    if (nameDisable === true) return
    setNameDisable(true)
    alert('儲存成功')
  }
  return (
    <>
      <section className='pt-12 pb-28 lg:pt-[84px] lg:pb-[136px]'>
        <div className='container'>
          <div className='hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block'>
            目前尚無預約
          </div>
          <h2 className='mb-5 text-center leading-loose lg:hidden'>個人資料</h2>
          <div className='justify-between lg:flex'>
            <div className='hidden h-[242px] w-[116px] bg-black lg:block'></div>

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
      </section>
    </>
  )
}

{
  /* <form className='flex w-full flex-col space-y-6 border-t border-secondary pt-8 lg:mt-[62px] lg:max-w-[1012px] lg:border lg:rounded-xl'>
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

<div className='flex justify-center space-x-5 border-t border-secondary !pt-12 lg:justify-end'>
  <button
    type='button'
    className='w-full max-w-[180px] rounded-full border border-primary-heavy py-4 font-bold text-primary-heavy'
    onClick={edit}
  >
    編輯
  </button>

  <button
    type='button'
    className='w-full max-w-[180px] rounded-full border border-primary-heavy bg-primary-heavy py-4 font-bold text-white'
    onClick={save}
  >
    儲存
  </button>
</div>
</form> */
}
