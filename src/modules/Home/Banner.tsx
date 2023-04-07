/* eslint-disable import/no-extraneous-dependencies */
import Link from 'next/link';
import Image from 'next/image';
import { IButton } from '../../common/components/IButton';
import bannerMain from '../../../public/images/home/banner/BannerMain.svg';
import bannreMainSM from '../../../public/images/home/banner/BannerMainSM.svg';

export default function Banner() {
  return (
    <section className="py-10 lg:container lg:py-[128px]">
      <div className="flex flex-col items-center justify-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div>
          <h1 className="text-5xl font-bold text-secondary">Slogan</h1>
          <p className="mt-5 text-[14px] text-gray-900 lg:mt-[84px] lg:max-w-[612px] lg:text-left lg:text-lg">那些你說不出口的話，我們來聽！</p>
          <div className="mt-10 flex space-x-4 lg:mt-[52px] ">
            <Link href="counselorlist/1" className="">
              <IButton text="尋找專屬諮商師" px="px-7 lg:px-9" py="py-4 lg:py-5" fontSize="text-[14px] lg:text-base" mode="dark" />
            </Link>
            <Link href="/signup" className="">
              <IButton text="立即註冊" px="px-7 lg:px-9" py="py-4 lg:py-5" fontSize="text-[14px] lg:text-base" />
            </Link>
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
