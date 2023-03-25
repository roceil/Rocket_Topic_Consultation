import LoginTab from '@/modules/login/LoginTab';

export default function login() {
  return (
    <div className="container z-20 flex">
      {/* 圖片 */}
      <div className="mr-[176px] mt-[120px] ml-[58px] hidden h-[492px] w-[492px] rounded-[25px] bg-primary-light text-center lg:block">
        Image
      </div>

      {/* 右側輸入區 */}
      <div className="mb-[84px] w-[380px] lg:mt-[120px] lg:mb-[160px]">
        <div className="my-12 flex flex-col items-center lg:mt-0 lg:mb-12 lg:items-start">
          <p className="mb-1 hidden text-sm font-bold text-primary-heavy lg:block">LOG IN</p>
          <h2>會員登入</h2>
        </div>
        <div className="loginForm">
          <LoginTab />
        </div>
      </div>
    </div>
  );
}
