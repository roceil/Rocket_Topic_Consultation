/* eslint-disable import/no-extraneous-dependencies */
import Link from 'next/link';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import ReactWOW from 'react-wow';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import { IButton } from '@/common/components/IButton';
import bannerMain from 'public/images/home/banner/BannerMain.svg';
import bannreMainSM from 'public/images/home/banner/BannerMainSM.svg';

export default function Banner() {
  const openLoading = useOpenLoading();
  const token = getCookie('auth');

  return (
    <section className="py-10 lg:container lg:py-[128px]">
      <div className="flex flex-col items-center justify-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div>

          <div className="text-gray-900 font-bold">
            <ReactWOW animation="flipInX" duration="1.5s">
              <h2 className="text-[40px] lg:text-[56px] font-bold leading-[84px] relative bannerDecoration inline-block">不用出門</h2>

            </ReactWOW>
            <h3 className="text-2xl lg:text-3xl">就能找到屬於你的心理服務！</h3>
          </div>

          <p className="mt-2 text-[14px] text-gray-900 lg:mt-10 lg:max-w-[612px] lg:text-left lg:text-lg">一鍵就能輕鬆預約諮商師，在家也能照顧好自己</p>

          <div className="mt-8 flex justify-center items-center  space-x-4 lg:mt-[52px] ">
            <Link href="counselorlist/1" className="">
              <IButton text="尋找專屬諮商師" px="px-7 lg:px-9" py="py-4 lg:py-5" fontSize="text-[14px] lg:text-base" mode="dark" onClick={openLoading} />
            </Link>
            <Link href="/signup" className={`hidden ${!token && '!block'}`}>
              <IButton
                text="立即註冊"
                px="px-7 lg:px-9"
                py="py-4 lg:py-5"
                fontSize="text-[14px] lg:text-base"
                onClick={openLoading}
              />
            </Link>
            <a href="#reservationTour" className={`hidden ${token && '!block'}`}>
              <IButton
                text="預約教學"
                px="px-7 lg:px-9"
                py="py-4 lg:py-5"
                fontSize="text-[14px] lg:text-base"
                extraStyle="h-14 lg:h-auto"
              />
            </a>
          </div>
        </div>

        <div className="items-center justify-center lg:flex lg:h-[556px] lg:w-[556px] lg:bg-bannerBG">
          <Image src={bannerMain} alt="bannerMain" width={200} height={388.68} className="hidden animate-wiggle lg:block" priority />
        </div>

        <div className="mt-20 flex w-full items-center justify-center bg-bannerBGSM bg-center bg-no-repeat lg:hidden">
          <Image src={bannreMainSM} alt="bannreMainSM" width={136} height={262} className=" animate-wiggle lg:hidden" priority />
        </div>
      </div>
    </section>
  );
}
