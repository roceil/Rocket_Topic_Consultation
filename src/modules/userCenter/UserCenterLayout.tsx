import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { IUserCenterLayoutProps } from '@/types/interface';
import customAlert from '@/common/helpers/customAlert';
import { Modal } from 'antd';

export default function UserCenterLayout({ children }: IUserCenterLayoutProps) {
  const router = useRouter();
  const [modal, alertModal] = Modal.useModal();
  const { pathname } = router;
  const isUserCenter = pathname === '/usercenter' ? '!text-secondary !border-secondary !font-semibold' : '';
  const isReservation = pathname === '/usercenter/reservation' ? '!text-secondary !border-secondary !font-semibold' : '';

  // 登出函式
  const logout = () => {
    deleteCookie('auth');
    deleteCookie('identity');
    deleteCookie('userID');
    customAlert({ modal, Message: '登出成功', type: 'success', router, link: '/' });
  };
  return (
    <section className="hidden pt-12 pb-28 lg:block lg:pt-[84px] lg:pb-[136px]">
      <div className="container min-h-[calc(100vh-330px)]">
        <div className="hidden rounded-full bg-primary-heavy py-[13px] text-center font-bold text-gray-900 lg:mb-[72px] lg:block">目前尚無預約</div>

        <div className="flex justify-between">
          <div className="w-[20%]">
            <h3 className="mb-7 text-xl font-bold text-secondary">會員中心</h3>
            <ul className="userCenterLayout flex max-w-[130px] flex-col space-y-4">
              {/* 個人資料 */}
              <li className="group">
                <Link href="/usercenter">
                  <button type="button" className={`${isUserCenter} border-l-2 border-gray-600 p-4 text-gray-600 group-hover:border-secondary group-hover:font-semibold group-hover:text-secondary`}>
                    <UserOutlined className="mr-3 text-xl" />
                    個人資料
                  </button>
                </Link>
              </li>

              {/* 預約管理 */}
              <li className="group ">
                <Link href="/usercenter/reservation">
                  <button type="button" className={`${isReservation} border-l-2 border-gray-600 p-4  text-gray-600 group-hover:border-secondary group-hover:font-semibold group-hover:text-secondary`}>
                    <ProfileOutlined className="mr-3 text-xl" />
                    預約紀錄
                  </button>
                </Link>
              </li>

              {/* 登出 */}
              <li className="group ">
                <button type="button" className="w-full border-l-2 border-gray-600 p-4 text-left text-gray-600 group-hover:border-secondary group-hover:font-semibold group-hover:text-secondary" onClick={logout}>
                  <LogoutOutlined className="mr-3 text-xl" />
                  登出
                </button>
              </li>
            </ul>
          </div>
          <div className="w-[80%]">{children}</div>
        </div>
      </div>
      <div className="alert">{alertModal}</div>
    </section>
  );
}
