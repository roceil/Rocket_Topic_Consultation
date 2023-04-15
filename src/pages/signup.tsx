import SignUpTabs from '@/modules/signup/SignUpTabs';
import RegisterSVG from '@/common/components/RegisterSVG';

export default function signup() {
  return (
    <div className="container z-20 flex justify-start pt-12 pb-[84px] lg:pt-[120px] lg:pb-[160px]">
      {/* 圖片 */}
      <RegisterSVG />
      {/* 右側輸入區 */}
      <div className="w-full lg:max-w-[380px]">
        <div className="flex flex-col items-center lg:my-0 lg:items-start">
          <p className="mb-1 hidden text-sm font-bold text-secondary lg:block">SIGN UP</p>
          <h2 className="text-secondary">會員註冊</h2>
        </div>

        <div className="signUpForm fle-col mt-12 flex items-center justify-center">
          <SignUpTabs />
        </div>
      </div>
    </div>
  );
}
