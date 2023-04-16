import ForgetPasswordForm from '@/modules/forgetPassword/ForgetPasswordForm';
import RegisterSVG from '@/common/components/RegisterSVG';

export default function ForgetPassword() {
  return (
    <div className="container z-20 flex  items-center pt-12 pb-[84px] lg:min-h-[calc(100vh-110px-356px)] lg:py-[120px]">
      {/* 圖片 */}
      <RegisterSVG />

      {/* 右側輸入區 */}
      <div className="w-full max-w-[380px]">
        <div className="mb-12 flex flex-col items-center lg:items-start">
          <p className="mb-1 hidden text-base font-bold text-secondary lg:block">FORGET PASSWORD</p>
          <h2 className="text-secondary">忘記密碼</h2>
        </div>

        <ForgetPasswordForm />
      </div>
    </div>
  );
}
