import Link from 'next/link';
import Image from 'next/image';
import { ICounselorListCardProps } from '../../types/interface';

const before = 'counselorCardShadow flex justify-between overflow-hidden rounded-3xl bg-white';

const after = 'counselorCardShadow flex justify-between overflow-hidden bg-white lg:mb-8 hidden rounded-3xl lg:flex';
export default function CounselorListCard({ className, counselorName, subtitle, img, description }: ICounselorListCardProps) {
  const isBefore = className === 'before' ? before : after;

  return (
    <li className={isBefore}>
      {/* 這是圖片 */}
      <Image src={img} alt="test" className="] h-[238px] w-[41.5789%] bg-primary-tint object-cover lg:h-[100%] lg:w-[220px]" />

      {/* 這是文字區塊 */}
      <div className="flex w-[58.421%] flex-col justify-center pl-4  pr-[18px] lg:h-[327px] lg:w-[268px] lg:px-6">
        <h3 className="mb-1 text-xl font-bold text-secondary lg:text-2xl">{counselorName}</h3>
        <p className="mb-3 text-sm font-bold text-gray-900 lg:mb-6 lg:text-base">{subtitle}</p>
        <p className="mb-6 text-sm text-gray-700 lg:mb-8 lg:text-base">{description}</p>

        <div className="flex justify-end space-x-3">
          <button type="button" className="hidden w-[90px] rounded-full border border-secondary py-2 text-xs font-semibold text-secondary hover:opacity-50 lg:block lg:text-sm">
            我有問題
          </button>
          <Link href="CounselorPage">
            <button type="button" className="w-[90px] rounded-full border border-secondary bg-secondary py-2 text-xs font-semibold text-white hover:opacity-50 lg:text-sm">
              立即預約
            </button>
          </Link>
        </div>
      </div>
    </li>
  );
}