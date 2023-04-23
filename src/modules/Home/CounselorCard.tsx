/* eslint-disable import/no-cycle */
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';
import { ISuggestCounselorCardProps } from '@/types/interface';
import useOpenLoading from '@/common/hooks/useOpenLoading';

export default function CounselorCard({ name, rankTag, img, skillsAry, id }: ISuggestCounselorCardProps) {
  const openLoading = useOpenLoading();
  return (
    <Link href={`/counselorlist/counselorpage/${id}`} className="group flex justify-center p-[36px]" onClick={openLoading}>
      <div className="max-w-[244px] lg:max-w-[280px]">
        {/* 這是圖片 */}
        <div className="relative h-[244px] w-[244px] lg:h-[280px] lg:w-[280px]">
          <Image src={img} alt="stepPicture" width={280} height={280} className="object-cover h-full transition duration-300 lg:group-hover:opacity-70 rounded-xl" />
          {/* 手機版連結裝飾按鈕 */}
          <button type="button" className="absolute bottom-3 right-3 h-7 w-7 rounded-full bg-white/70 text-gray-800 lg:hidden">
            <ArrowRightOutlined />
          </button>

          {/* 電腦版連結裝飾按鈕 */}
          <div className="absolute bottom-0 left-0 hidden w-full rounded-b-xl bg-white/70 py-3 font-semibold text-gray-800 opacity-0 backdrop-blur-sm transition duration-300 lg:block lg:group-hover:opacity-100">立即預約</div>
        </div>

        {/* 諮商師名稱 */}
        <div className="flex items-center justify-between px-2">
          <span className="py-5 text-left text-xl font-bold text-gray-900 lg:text-[28px]">{name}</span>
          <div className="rounded border border-secondary bg-white py-1 px-3 lg:py-2 lg:px-4">
            <p className="text-xs font-bold text-secondary">{rankTag}</p>
          </div>
        </div>

        {/* 諮商師tag */}
        <ul className="flex flex-wrap border-y-2 border-gray-700 py-2 min-h-[92px]">
          {skillsAry?.map(({ type }) => (
            <li key={type} className=" py-2 px-3 text-xs font-bold text-gray-700 lg:text-sm">
              <p>{`#${type}`}</p>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
