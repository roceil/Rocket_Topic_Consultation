import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { EditOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import { Modal } from 'antd';
import CustomAlert from '@/common/helpers/customAlert';

interface IUserCenterLayoutProps {
  children: React.ReactNode;
}

export default function CounselorCenterLayout({ children }: IUserCenterLayoutProps) {
  const openLoading = useOpenLoading();
  const router = useRouter();
  const { pathname } = router;
  const isCounselorCenter = pathname === '/counselorcenter' ? 'opacity-100' : 'opacity-70';
  const isReservation = pathname === '/counselorcenter/reservation' ? 'opacity-100' : 'opacity-70';
  const isCase = pathname === '/counselorcenter/case' ? 'opacity-100' : 'opacity-70';
  const [modal, alertModal] = Modal.useModal();

  // 登出函式
  const logout = () => {
    deleteCookie('auth');
    deleteCookie('identity');
    deleteCookie('userID');
    deleteCookie('counselorID');
    const Message = '登出成功';
    CustomAlert({ modal, Message, type: 'success', router });
  };
  return (
    <section className="hidden pt-12 pb-28 lg:block lg:pt-[84px] lg:pb-[136px] bg-white">
      <div className="container min-h-[calc(100vh-330px)]">
        <div className="hidden rounded-full bg-primary-heavy py-[13px] text-center font-bold text-gray-900 lg:mb-[72px] lg:block">
          目前尚無預約
        </div>

        <div className="flex justify-between">
          <div className="w-[20%]">
            <h3 className="mb-7 text-xl font-bold text-secondary">會員中心</h3>
            <ul className="flex flex-col space-y-4 text-secondary">
              {/* 個人資料 */}
              <li className={`${isCounselorCenter} hover:opacity-100`}>
                <Link href="/counselorcenter">
                  <button
                    type="button"
                    className="border-l-2 border-secondary p-4 font-bold"
                    onClick={() => openLoading()}
                  >
                    <UserOutlined className="mr-3 text-xl" />
                    個人資料
                  </button>
                </Link>
              </li>

              {/* 預約管理 */}
              <li className={`${isReservation} hover:opacity-100`}>
                <Link href="/counselorcenter/reservation">
                  <button
                    type="button"
                    className="border-l-2 border-secondary p-4 font-bold"
                    onClick={() => openLoading()}
                  >
                    <ProfileOutlined className="mr-3 text-xl" />
                    預約紀錄
                  </button>
                </Link>
              </li>

              {/* 個案記錄 */}
              <li className={`${isCase} hover:opacity-100`}>
                <Link href="/counselorcenter/case">
                  <button
                    type="button"
                    className="border-l-2 border-secondary p-4 font-bold"
                    onClick={() => openLoading()}
                  >
                    <EditOutlined className="mr-3 text-xl" />
                    個案記錄
                  </button>
                </Link>
              </li>

              {/* 登出 */}
              <li className="opacity-70 hover:opacity-100">
                <button
                  type="button"
                  className="border-l-2 border-secondary p-4 font-bold"
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
      <div className="alert">{alertModal}</div>
    </section>
  );
}
