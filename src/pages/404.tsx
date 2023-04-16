import Image from 'next/image';
import notFound from 'public/images/404/404.png';
import notFoundSM from 'public/images/404/404sm.png';
import useCloseLoading from '@/common/hooks/useCloseLoading';

export default function Success() {
  useCloseLoading();
  return (
    <section className="flex h-[calc(100vh-70px)] w-full  items-center justify-center lg:h-[calc(100vh-110px)]">
      <Image src={notFound} alt="orderSuccess" width={757} height={466} className="hidden lg:block" priority />
      <Image src={notFoundSM} alt="orderSuccess" width={348} height={281} className="lg:hidden" priority />
    </section>
  );
}
