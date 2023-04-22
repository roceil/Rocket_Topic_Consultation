import LoginTab from '@/modules/login/LoginTab';
import RegisterSVG from '@/common/components/RegisterSVG';
import CustomHead from '@/common/components/CustomHead';
import useCloseLoading from '@/common/hooks/useCloseLoading';

export default function login() {
  useCloseLoading();
  return (
    <>
      <CustomHead pageTitle="用戶登入" />
      <div className="container z-20 flex pt-12 pb-[84px] lg:py-[120px] lg:min-h-[calc(100vh-110px-356px)]">
        {/* 圖片 */}
        <RegisterSVG />

        {/* 右側輸入區 */}
        <div className=" w-[380px]">
          <div className="my-12 flex flex-col items-center lg:mt-0 lg:mb-12 lg:items-start">
            <p className="mb-1 hidden text-sm font-bold text-secondary lg:block">LOG IN</p>
            <h2 className="text-secondary">會員登入</h2>
          </div>
          <div className="loginForm">
            <LoginTab />
          </div>
        </div>
      </div>
    </>
  );
}
