import Link from 'next/link';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectHasToken } from '../redux/feature/hasToken';

// 登入時，顯示『會員中心、通知』icons
export default function HasLoginBtn() {
  const cookie = useSelector(selectHasToken);
  const checkIdentity = cookie.identity === 'user' ? 'UserCenter' : 'CounselorCenter';
  return (
    <>
      <button type="button" className="flexCenterCenter rounded-full border border-secondary p-[10px] text-xl text-primary-heavy hover:opacity-50">
        <BellOutlined />
      </button>

      <Link href={checkIdentity}>
        <button type="button" className="flexCenterCenter rounded-full border border-secondary p-[10px] text-xl text-primary-heavy hover:opacity-50">
          <UserOutlined />
        </button>
      </Link>
    </>
  );
}
