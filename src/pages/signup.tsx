import Image from 'next/image';
import SignUpTabs from '../modules/signup/SignUpTabs';

export default function signup() {
  return (
    <div className="container z-20 flex justify-center pt-12 pb-[84px] lg:pt-[120px] lg:pb-[160px]">
      {/* 圖片 */}
      <Image
        src="https://fakeimg.pl/492x492/F9F9FF/"
        alt="picture"
        width={492}
        height={492}
        className="mr-[176px] hidden h-[492px] w-[492px] rounded-[25px] lg:block"
      />

      {/* 右側輸入區 */}
      <div className="w-full lg:max-w-[380px]">
        <div className="flex flex-col items-center lg:my-0 lg:items-start">
          <p className="mb-1 hidden text-sm font-bold text-primary-heavy lg:block">SIGN UP</p>
          <h2>會員註冊</h2>
        </div>

        <div className="signUpForm fle-col mt-12 flex items-center justify-center">
          <SignUpTabs />
        </div>
      </div>
    </div>
  );
}
