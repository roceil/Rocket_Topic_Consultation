import Image from 'next/image';
import { useRouter } from 'next/router';
import { IButton } from '@/common/components/IButton';
import success from 'public/images/success/success.png';
import useCloseLoading from '@/common/hooks/useCloseLoading';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import CustomHead from '@/common/components/CustomHead';

export default function Success() {
  useCloseLoading();
  const router = useRouter();
  const openLoading = useOpenLoading();

  // 去會員中心
  const goToReservation = () => {
    openLoading();
    router.push('/usercenter/reservation');
  };

  // 去諮商師總覽
  const goToCounselorList = () => {
    openLoading();
    router.push('/counselorlist/1');
  };
  return (
    <>
      <CustomHead pageTitle="付款成功" />
      <section className="flex h-[calc(100vh-70px)] w-full flex-col items-center justify-center lg:h-[calc(100vh-110px)]">
        <Image src={success} alt="orderSuccess" width={596} height={340} className="lg:mb-7 lg:h-[340px] lg:w-[596px]" priority />

        <div className="container flex w-full justify-center space-x-5 lg:space-x-7">
          <IButton text="繼續逛逛" fontSize="text-base" py="py-4" mode="light" extraStyle="max-w-[150px] w-full sm:max-w-[180px]" onClick={goToCounselorList} />
          <IButton text="選擇預約時段" fontSize="text-base" py="py-4" mode="dark" extraStyle="max-w-[150px] w-full sm:max-w-[180px]" onClick={goToReservation} />
        </div>
      </section>
    </>
  );
}
