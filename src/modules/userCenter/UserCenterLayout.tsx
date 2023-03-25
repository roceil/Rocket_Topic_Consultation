import Link from 'next/link';
import { useRouter } from 'next/router';
import { LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { IUserCenterLayoutProps } from '@/types/interface';

export default function UserCenterLayout({ children }: IUserCenterLayoutProps) {
  const router = useRouter();
  const { pathname } = router;
  const isUserCenter = pathname === '/usercenter' ? 'opacity-100' : 'opacity-70';
  const isReservation = pathname === '/usercenter/reservation' ? 'opacity-100' : 'opacity-70';

  // 登出函式 => 未完成 delete cookie
  const logout = () => {
    alert('登出成功');
    router.push('/');
  };
  return (
    <section className="hidden pt-12 pb-28 lg:block lg:pt-[84px] lg:pb-[136px]">
      <div className="container min-h-[calc(100vh-330px)]">
        <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
          目前尚無預約
        </div>

        <div className="flex justify-between">
          <div className="w-[20%]">
            <h3 className="mb-7 text-xl font-bold text-primary-heavy">會員中心</h3>
            <ul className="flex flex-col space-y-4 text-primary-heavy">
              {/* 個人資料 */}
              <li className={`${isUserCenter} hover:opacity-100`}>
                <Link href="/usercenter">
                  <button
                    type="button"
                    className="border-l-2 border-primary-heavy/70 p-4 font-bold"
                  >
                    <UserOutlined className="mr-3 text-xl" />
                    個人資料
                  </button>
                </Link>
              </li>

              {/* 預約管理 */}
              <li className={`${isReservation} hover:opacity-100`}>
                <Link href="/usercenter/reservation">
                  <button
                    type="button"
                    className="border-l-2 border-primary-heavy/70 p-4 font-bold"
                  >
                    <ProfileOutlined className="mr-3 text-xl" />
                    預約紀錄
                  </button>
                </Link>
              </li>

              {/* 登出 */}
              <li className="opacity-70 hover:opacity-100">
                <button
                  type="button"
                  className="border-l-2 border-primary-heavy/70 p-4 font-bold"
                  onClick={logout}
                >
                  <LogoutOutlined className="mr-3 text-xl" />
                  登出
                </button>
              </li>
            </ul>
          </div>
          <div className="w-[80%]">{children}</div>
        </div>
      </div>
    </section>
  );
}
