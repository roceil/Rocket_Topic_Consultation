import { useEffect, useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { useSelector } from 'react-redux';
import { EditOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import { Modal } from 'antd';
import CustomAlert from '@/common/helpers/customAlert';

export default function CounselorCenterLayout({ children }: {
  children: React.ReactNode;
}) {
  const openLoading = useOpenLoading();
  const router = useRouter();
  const { pathname } = router;
  const isCounselorCenter = pathname === '/counselorcenter' ? 'opacity-100' : 'opacity-70';
  const isReservation = pathname === '/counselorcenter/reservation' ? 'opacity-100' : 'opacity-70';
  const isCase = pathname === '/counselorcenter/case' ? 'opacity-100' : 'opacity-70';
  const [modal, alertModal] = Modal.useModal();

  // ==================== 登出 ====================
  const logout = () => {
    deleteCookie('auth');
    deleteCookie('identity');
    deleteCookie('userID');
    deleteCookie('counselorID');
    deleteCookie('counselorID');
    deleteCookie('validation');
    const Message = '登出成功';
    CustomAlert({ modal, Message, type: 'success', router });
  };

  // ==================== 通知 ====================
  const { value } = useSelector((state:{ zoomSlice:{ value:any } }) => state.zoomSlice);
  const [renderAlertMessage, setRenderAlertMessage] = useState('目前尚無預約');
  const [renderCourseTime, setRenderCourseTime] = useState('');
  const [renderCourseLink, setRenderCourseLink] = useState();

  useEffect(() => {
    // 如果value長度為0，表示沒有預約記錄
    if (Object.keys(value).length === 0) return;
    // 如果isHaveUrl為false，但是有spanNowTime，表示有預約記錄
    if (!value?.isHaveUrl && value?.spanNowTime) {
      const covertTime = dayjs(value.spanNowTime).format('M 月 DD 日 HH:mm 產出');
      setRenderAlertMessage('課程連結將於');
      setRenderCourseTime(covertTime);
    }

    // 如果isHaveUrl為true，表示有預約記錄，且已經產出連結
    if (value?.isHaveUrl && value?.spanNowTime) {
      setRenderAlertMessage('課程連結如下');
      setRenderCourseTime('進入會議室');
      setRenderCourseLink(value.url);
    }
  }, [value]);
  return (
    <section className="hidden pt-12 pb-28 lg:block lg:pt-[84px] lg:pb-[136px] bg-white">
      <div className=" container min-h-[calc(100vh-330px)]">
        <Link href={renderCourseLink || '#'} target="_blank" className="hidden rounded-full bg-primary-heavy py-[13px] text-center font-bold text-gray-900 lg:mb-[72px] lg:block">
          <p>{renderAlertMessage}</p>
          <p>{renderCourseTime}</p>
        </Link>

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
