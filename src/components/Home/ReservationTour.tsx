export function ReservationTour() {
  return (
    <section className='bg-[#FAFAFF]'>
      <div className='container py-20 text-center lg:py-[180px]'>
        <div className='lg:flex lg:justify-between '>
          <div className=''>
            <h2 className='mb-9 lg:mt-[68px] lg:text-left'>預約教學</h2>
          </div>

          <ul className='flex flex-col items-center lg:w-[704px] lg:flex-row lg:flex-wrap  lg:items-start lg:justify-between'>
            <li className='flex w-[280px] flex-col items-center lg:-mb-11 lg:w-[328px]'>
              {/* 這裡是圖片 */}
              <div className='h-[360px] w-[280px] rounded bg-secondary lg:block lg:h-[415px] lg:w-full'></div>
              <p className='mt-1 w-full text-left text-xl font-bold text-primary-heavy lg:mt-3'>
                Step1
              </p>
            </li>

            <li className='mt-8 flex w-[280px] flex-col items-center lg:mt-[182px] lg:mb-11 lg:w-[328px]'>
              {/* 這裡是圖片 */}
              <div className='h-[360px] w-[280px] rounded bg-secondary lg:block lg:h-[415px] lg:w-full'></div>
              <p className='mt-1 w-full text-left text-xl font-bold text-primary-heavy lg:mt-3'>
                Step2
              </p>
            </li>

            <li className='mt-8 flex w-[280px] flex-col items-center lg:mt-[-182px] lg:w-[328px]'>
              {/* 這裡是圖片 */}
              <div className='h-[360px] w-[280px] rounded bg-secondary lg:block lg:h-[415px] lg:w-full'></div>
              <p className='mt-1 w-full text-left text-xl font-bold text-primary-heavy lg:mt-3'>
                Step3
              </p>
            </li>

            <li className='mt-8 flex w-[280px] flex-col items-center lg:w-[328px]'>
              {/* 這裡是圖片 */}
              <div className='h-[360px] w-[280px] rounded bg-secondary lg:block lg:h-[415px] lg:w-full'></div>
              <p className='mt-1 w-full text-left text-xl font-bold text-primary-heavy lg:mt-3'>
                Step4
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
