import { useRouter } from 'next/router';
import UserCenterLayout from './UserCenterLayout';

export default function index() {
  const router = useRouter();
  console.log(router);
  return (
    <UserCenterLayout>
      <div className="h-[380px] w-[1012px] bg-bg2">預約管理</div>
    </UserCenterLayout>
  );
}
