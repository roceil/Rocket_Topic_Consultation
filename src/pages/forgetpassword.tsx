import Image from 'next/image';
import ForgetPasswordForm from '@/modules/forgetPassword/ForgetPasswordForm';

export default function ForgetPassword() {
  return (
    <div className="container z-20 flex justify-center pt-12 pb-[84px] lg:py-[120px]">
      {/* 圖片 */}
      <Image
        src="https://fakeimg.pl/492x492/F9F9FF/"
        width={492}
        height={492}
        alt="picture"
        className="mr-[176px] hidden h-[492px] w-[492px] rounded-[25px] bg-primary-light lg:block"
      />

      {/* 右側輸入區 */}
      <div className="w-full max-w-[380px]">
        <div className="mb-12 flex flex-col items-center lg:items-start">
          <p className="mb-1 hidden text-base font-bold text-primary-heavy lg:block">
            FORGET PASSWORD
          </p>
          <h2>忘記密碼</h2>
        </div>

        <ForgetPasswordForm />
      </div>
    </div>
  );
}
