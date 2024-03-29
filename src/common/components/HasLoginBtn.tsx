import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { Dropdown, MenuProps } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import useOpenLoading from '../hooks/useOpenLoading';
import { hasHeaderAlert } from '../redux/feature/headerAlert';

// 登入時，顯示『會員中心、通知』icons
export default function HasLoginBtn({ renderAlertMessage, renderCourseTime, renderCourseLink }:{
  renderAlertMessage:string,
  renderCourseTime:string,
  renderCourseLink?:string,
}) {
  const getIdentity = getCookie('identity');
  const dispatch = useDispatch();
  const hasAlert = useSelector((state:{ headerAlertSlice:{ value:boolean } }) => state.headerAlertSlice.value);
  const showAlert = hasAlert ? 'block' : 'hidden';
  const openLoading = useOpenLoading();
  const handleLink = getIdentity === 'user' ? '/usercenter' : '/counselorcenter';

  // ==================== 關閉通知 ====================
  const closeAlert = () => {
    dispatch(hasHeaderAlert(false));
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link href={renderCourseLink || '#'} target="_blank" className="text-center text-gray-900">
          <p>{renderAlertMessage}</p>
          <p>{renderCourseTime}</p>
        </Link>
      ),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="bottom">
        <div className="relative">
          <div className={`absolute w-3 h-3 bg-red-500 rounded-full top-0 right-0 z-50 ${showAlert}`} />
          <button type="button" className="btnHover h-10 w-10 group" onClick={closeAlert}>
            <span className="btnHoverText">
              <BellOutlined className="p-[10px] text-xl" />
            </span>
          </button>
        </div>
      </Dropdown>

      <Link href={handleLink}>
        <button type="button" className="btnHover h-10 w-10 group" onClick={openLoading}>
          <span className="btnHoverText">
            <UserOutlined className="p-[10px] text-xl" />
          </span>
        </button>
      </Link>
    </>
  );
}
