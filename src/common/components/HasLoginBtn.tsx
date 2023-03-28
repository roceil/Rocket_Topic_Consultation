import Link from 'next/link';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectHasToken } from '../redux/feature/hasToken';

// 登入時，顯示『會員中心、通知』icons
export default function HasLoginBtn() {
  const { identity } = useSelector(selectHasToken);
  const handleLink = identity === 'user' ? 'UserCenter' : 'CounselorCenter';
  return (
    <>
      <button type="button" className="flexCenterCenter rounded-full border-[2px] border-secondary p-[10px] text-xl text-secondary hover:opacity-50 ">
        <BellOutlined />
      </button>

      <Link href={handleLink}>
        <button type="button" className="flexCenterCenter rounded-full border-[2px] border-secondary p-[10px] text-xl text-secondary hover:opacity-50">
          <UserOutlined />
        </button>
      </Link>
    </>
  );
}
