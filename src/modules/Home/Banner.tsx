import Link from 'next/link';
import Image from 'next/image';
import { IButton, lightBtn, darkBtn } from '../../common/components/IButton';
import bannerMain from '../../../public/images/home/banner/BannerMain.svg';
import bannreMainSM from '../../../public/images/home/banner/BannerMainSM.svg';

export default function Banner() {
  return (
    <section className="container py-10 lg:py-[128px]">
      <div className="flex flex-col items-center justify-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div>
          <h1 className="text-5xl font-bold text-secondary">Slogan</h1>
          <p className="mt-5 text-[14px] text-gray-900 lg:mt-[84px] lg:max-w-[612px] lg:text-left lg:text-lg">Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam.</p>
          <div className="mt-10 space-x-4 lg:mt-[52px]">
            <Link href="counselorlist">
              <IButton text="尋找專屬諮商師" bgColor={darkBtn} px="px-[28px]" py="py-4" fontSize="text-[14px] lg:text-base" />
            </Link>
            <Link href="/signup">
              <IButton text="立即註冊" bgColor={lightBtn} px="px-[28px]" py="py-[15px]" fontSize="text-[14px] lg:text-base" />
            </Link>
          </div>
        </div>

        <div className="hidden items-center justify-center bg-bannerBG lg:flex lg:h-[556px] lg:w-[556px]">
          <Image src={bannerMain} alt="bannerMain" width={200} height={388.68} className="animate-wiggle" />
        </div>

        <Image src={bannreMainSM} alt="bannreMainSM" width={380} height={380} className="mt-12 lg:hidden" />
      </div>
    </section>
  );
}
