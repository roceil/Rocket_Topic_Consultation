/* eslint-disable import/no-cycle */
import Image from 'next/image';
import { ISuggestCounselorCardProps } from '../../types/interface';
import test from "../../../public/images/test.jpg"

export default function CounselorCard({ name, rankTag, img, skillsAry }: ISuggestCounselorCardProps) {
  return (
    <div className="p-[36px]">
      <div className="max-w-[244px] lg:max-w-[280px]">
        {/* 這是圖片 */}
        {/* <div className="h-[244px] w-[244px] rounded bg-secondary lg:h-[280px] lg:w-[280px]" /> */}

        <Image src={test} alt="stepPicture" width={280} height={360} className="h-[360px] w-[280px] lg:block lg:h-[415px] lg:w-[328px]" placeholder="empty" />

        {/* 諮商師名稱 */}
        <div className="flex items-center justify-between px-2">
          <span className="py-5 text-left text-xl font-bold text-secondary lg:text-[28px]">{name}</span>
          <div className="rounded border border-secondary bg-white py-1 px-3 lg:py-2 lg:px-4">
            <p className="text-xs font-bold text-secondary">{rankTag}</p>
          </div>
        </div>

        {/* 諮商師tag */}
        <ul className="flex flex-wrap border-y-2 border-secondary py-2">
          {skillsAry?.map(({ type }) => (
            <li key={type} className=" py-2 px-3 text-xs font-bold text-secondary lg:text-sm">
              <p>{`#${type}`}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
