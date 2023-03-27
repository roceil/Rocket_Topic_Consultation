import Image from 'next/image';
import rocket from '../../../public/images/home/platformFeature/rocket.svg';

export default function PlatformFeature() {
  return (
    <section>
      <div className="container py-20 text-center lg:flex lg:justify-center lg:space-x-[216px] lg:py-[157px]">
        <div>
          {/* 這裡是圖片 */}
          <Image src={rocket} width={108} height={108} alt="rocket" className="hidden lg:mb-11 lg:block lg:h-[108px] lg:w-[108px]" />
          <h2 className="lg:text-left">平台特色</h2>
          <p className="subTitle mb-10 lg:max-w-[326px] lg:text-left">4 個理由讓你愛上 『 拍拍 』</p>
        </div>

        <ul className="flex flex-wrap lg:w-[546px]">
          <li className="flex w-1/2 flex-col items-center justify-center  border-b-2 border-gray-500 p-6 text-secondary">
            <h3 className="mb-2 text-lg font-bold lg:text-[28px]">客製化</h3>
            <p className="text-xs lg:text-lg">為你量身打造的課程</p>
          </li>

          <li className="flex w-1/2 flex-col items-center justify-center  border-b-2 border-l-2 border-gray-500 p-6 text-secondary">
            <h3 className="mb-2 text-lg font-bold lg:text-[28px]">全程保密</h3>
            <p className="text-xs lg:text-lg">個資、晤談將完全保密</p>
          </li>

          <li className="flex w-1/2 flex-col items-center justify-center p-6 text-secondary">
            <h3 className="mb-2 text-lg font-bold lg:text-[28px]">體驗課程</h3>
            <p className="text-xs lg:text-lg">快速探索心儀諮商師</p>
          </li>

          <li className="flex w-1/2 flex-col items-center justify-center  border-l-2 border-gray-500 p-6 text-secondary">
            <h3 className="mb-2 text-lg  font-bold lg:text-[28px]">專業心理師</h3>
            <p className="text-xs lg:text-lg">嚴格篩選專業人士</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
