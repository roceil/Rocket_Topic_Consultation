export function PlatformFeature() {
  return (
    <section>
      <div className='container py-20 text-center lg:flex lg:justify-center lg:space-x-[216px] lg:py-[157px]'>
        <div>
          {/* 這裡是圖片 */}
          <div className='hidden rounded bg-secondary lg:mb-11 lg:block lg:h-[108px] lg:w-[108px]'></div>
          <h2 className='lg:text-left'>平台特色</h2>
          <p className='subTitle mb-10 lg:max-w-[326px] lg:text-left'>
            Lorem ipsum dolor sit amet consectet adipiscing elit eget quamumto.
          </p>
        </div>

        <ul className='flex flex-wrap lg:w-[546px]'>
          <li className='flex w-1/2 flex-col items-center justify-center  border-b border-secondary p-6 text-primary-heavy'>
            <h3 className='mb-2 text-lg  font-bold lg:text-[28px]'>客製化</h3>
            <p className='text-xs lg:text-lg'>Lorem ipsum dolor</p>
          </li>

          <li className='flex w-1/2 flex-col items-center justify-center  border-b border-l border-secondary p-6 text-primary-heavy'>
            <h3 className='mb-2 text-lg  font-bold lg:text-[28px]'>全程保密</h3>
            <p className='text-xs lg:text-lg'>Lorem ipsum dolor</p>
          </li>

          <li className='flex w-1/2 flex-col items-center justify-center p-6 text-primary-heavy'>
            <h3 className='mb-2 text-lg  font-bold lg:text-[28px]'>體驗課程</h3>
            <p className='text-xs lg:text-lg'>Lorem ipsum dolor</p>
          </li>

          <li className='flex w-1/2 flex-col items-center justify-center  border-l border-secondary p-6 text-primary-heavy'>
            <h3 className='mb-2 text-lg  font-bold lg:text-[28px]'>
              專業心理師
            </h3>
            <p className='text-xs lg:text-lg'>Lorem ipsum dolor</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
