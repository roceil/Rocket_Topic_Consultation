import Link from 'next/link';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectHasToken } from '../redux/feature/hasToken';

// 登入時，顯示『會員中心、通知』icons
export default function HasLoginBtn() {
  const { identity } = useSelector(selectHasToken);
  const handleLink = identity === 'user' ? '/usercenter' : '/counselorcenter/1';
  return (
    <>
      <button type="button" className="btnHover h-10 w-10 group">
        <span className="btnHoverText">
          <BellOutlined className="p-[10px] text-xl" />
        </span>
      </button>

      <Link href={handleLink}>
        <button type="button" className="btnHover h-10 w-10 group">
          <span className="btnHoverText">
            <UserOutlined className="p-[10px] text-xl" />
          </span>
        </button>
      </Link>
    </>
  );
}
