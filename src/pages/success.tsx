import Image from 'next/image';
import { useRouter } from 'next/router';
import { IButton } from '@/common/components/IButton';
import success from 'public/images/success/success.png';

export default function Success() {
  const router = useRouter();

  // 去會員中心
  const goToReservation = () => {
    router.push('/usercenter/reservation');
  };

  // 去諮商師總覽
  const goToCounselorList = () => {
    router.push('/counselorlist/1');
  };
  return (
    <section className="flex h-[calc(100vh-70px)] lg:h-[calc(100vh-110px)] w-full flex-col items-center justify-center">
      <Image src={success} alt="orderSuccess" width={596} height={340} className="lg:w-[596px] lg:h-[340px] lg:mb-7" priority />

      <div className="w-full flex justify-center space-x-5 container lg:space-x-7">
        <IButton text="繼續逛逛" fontSize="text-base" py="py-4" mode="light" extraStyle="max-w-[150px] w-full sm:max-w-[180px]" onClick={goToCounselorList} />
        <IButton text="選擇預約時段" fontSize="text-base" py="py-4" mode="dark" extraStyle="max-w-[150px] w-full sm:max-w-[180px]" onClick={goToReservation} />
      </div>
    </section>
  );
}
