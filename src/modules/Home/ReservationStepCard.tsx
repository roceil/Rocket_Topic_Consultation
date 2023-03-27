import Image from 'next/image';
import { IReservationStepCardProps } from '@/types/interface';

export default function ReservationStepCard({ step, img, extraStyle }: IReservationStepCardProps) {
  return (
    <li className={`${extraStyle} flex flex-col items-center`}>
      {/* 文字區塊 */}
      <p className="mb-2 w-full text-left text-xl font-bold text-secondary lg:mt-3">{step}</p>

      {/* 圖片區塊 */}
      <Image src={img} alt="stepPicture" className="h-[360px] w-[280px] lg:block lg:h-[415px] lg:w-[328px]" />
    </li>
  );
}
