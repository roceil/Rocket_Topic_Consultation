import RegisterSVG from '@/common/components/RegisterSVG';
import ResetPasswordForm from '@/modules/resetPassword/ResetPasswordForm';

export default function LogIn() {
  return (
    <div className="container z-20 flex justify-center pt-12 pb-[84px] lg:py-[120px]">
      {/* 圖片 */}
      <RegisterSVG />

      {/* 右側輸入區 */}
      <div className="w-full max-w-[380px]">
        <div className="mb-12 flex flex-col items-center lg:items-start">
          <p className="mb-1 hidden text-base font-bold text-secondary lg:block">Reset password</p>
          <h2 className="text-secondary">重設密碼</h2>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
}
