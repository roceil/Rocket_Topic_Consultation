import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import useOpenLoading from '../hooks/useOpenLoading';

// 登入時，顯示『會員中心、通知』icons
export default function HasLoginBtn() {
  const getIdentity = getCookie('identity');
  const openLoading = useOpenLoading();
  const handleLink = getIdentity === 'user' ? '/usercenter' : '/counselorcenter';
  return (
    <>
      <button type="button" className="btnHover h-10 w-10 group">
        <span className="btnHoverText">
          <BellOutlined className="p-[10px] text-xl" />
        </span>
      </button>

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
