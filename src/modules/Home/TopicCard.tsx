import Image from 'next/image';
import { ITopicCardProps } from '../../types/interface';

export default function TopicCard({ gap, type, text, img, imgSM }: ITopicCardProps) {
  return (
    <li className={`flex items-center bg-white lg:bg-inherit space-x-6 rounded-xl border-2 border-primary-border py-3 px-3 sm:max-w-none lg:w-[316px] lg:flex-col lg:space-x-0 lg:border-none lg:p-0 ${gap} `}>
      {/* 手機版圖片 */}
      <Image src={imgSM} alt="test5" width={80} height={80} className="h-[80px] w-[80px] lg:hidden" />
      {/* 電腦版圖片 */}
      <Image src={img} alt="test1" width={316} height={286} className="hidden lg:block lg:rounded-t-xl lg:border-x-2 lg:border-t-2 lg:border-primary-border lg:bg-primary" />

      {/* 文字區塊 */}
      <div className="text-left lg:w-full lg:rounded-b-2xl lg:border-x-2 lg:border-b-2 lg:border-primary-border lg:bg-white lg:pt-5 lg:pb-8 lg:text-center">
        <h3 className="mb-2 font-bold text-gray-900 lg:text-xl">{type}</h3>
        <p className="text-xs text-gray-800 lg:text-base">{text}</p>
      </div>
    </li>
  );
}
