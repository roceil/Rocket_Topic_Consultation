import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Modal } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie } from 'cookies-next';
import { LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';

import customAlert from '@/common/helpers/customAlert';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import { IUserCenterLayoutProps } from '@/types/interface';

export default function UserCenterLayout({ children }: IUserCenterLayoutProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { pathname } = router;
  const openLoading = useOpenLoading();
  const [modal, alertModal] = Modal.useModal();
  const isUserCenter = pathname === '/usercenter' ? '!text-secondary !border-secondary !font-semibold' : '';
  const isReservation = pathname === '/usercenter/reservation' ? '!text-secondary !border-secondary !font-semibold' : '';

  // =================== 登出 ===================
  const logout = () => {
    deleteCookie('auth');
    deleteCookie('identity');
    deleteCookie('userID');
    deleteCookie('counselorID');
    deleteCookie('validation');
    dispatch({
      type: 'chatRoomSwitch/chatRoomSwitch',
      payload: {
        isChatRoomOpen: false,
        clickUserId: 0,
        clickCounselorId: 0,
      },
    });
    customAlert({ modal, Message: '登出成功', type: 'success', router, link: '/' });
  };

  // ==================== 通知 ====================
  const { value } = useSelector((state:{ zoomSlice:{ value: any } }) => state.zoomSlice);
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
    <section className="hidden pt-12 pb-28 lg:block lg:pt-[84px] lg:pb-[136px]">
      <div className="container min-h-[calc(100vh-330px)]">
        <Link href={renderCourseLink || '#'} target="_blank" className="hidden rounded-full bg-primary-heavy py-[13px] text-center font-bold text-gray-900 lg:mb-[72px] lg:block">
          <p>{renderAlertMessage}</p>
          <p>{renderCourseTime}</p>
        </Link>

        <div className="flex justify-between">
          <div className="w-[20%]">
            <h3 className="mb-7 text-xl font-bold text-secondary">會員中心</h3>
            <ul className="userCenterLayout flex max-w-[130px] flex-col space-y-4">
              {/* 個人資料 */}
              <li className="group">
                <Link href="/usercenter">
                  <button type="button" className={`${isUserCenter} border-l-2 border-gray-600 p-4 text-gray-600 group-hover:border-secondary group-hover:font-semibold group-hover:text-secondary`} onClick={openLoading}>
                    <UserOutlined className="mr-3 text-xl" />
                    個人資料
                  </button>
                </Link>
              </li>

              {/* 預約管理 */}
              <li className="group ">
                <Link href="/usercenter/reservation">
                  <button type="button" className={`${isReservation} border-l-2 border-gray-600 p-4  text-gray-600 group-hover:border-secondary group-hover:font-semibold group-hover:text-secondary`} onClick={openLoading}>
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
