export function Banner() {
  return (
    <section className='container lg:my-[128px] lg:flex lg:justify-between'>
      <div className='mt-10 flex flex-col items-center justify-center text-center lg:mt-0 lg:flex-row lg:items-center lg:text-left'>
        <div>
          <h1 className='text-5xl font-bold text-primary-heavy'>Slogan</h1>
          <p className='mt-5 text-[14px] text-primary lg:mt-[84px] lg:max-w-[612px] lg:text-left lg:text-lg'>
            Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
            phasellus mollis sit aliquam sit nullam.
          </p>
          <ul className='mt-10 space-x-6 lg:mt-[52px]'>
            <input
              type='button'
              value='尋找專屬諮商師'
              className='rounded-[50px] bg-primary-heavy py-5 px-9 text-base font-bold text-white' />
            <input
              type='button'
              value='立即註冊'
              className='rounded-[50px] border-2 border-primary-heavy bg-white py-5 px-9 text-base font-bold text-primary-heavy' />
          </ul>
        </div>
        <div className='flex lg:w-[608px] lg:justify-end'>
          <div className='mt-9 mb-[60px] h-[380px] w-[380px] rounded-[24px] bg-primary-light text-center lg:my-0 lg:h-[556px] lg:w-[556px]'>
            image
          </div>
        </div>
      </div>
    </section>
  );
}
