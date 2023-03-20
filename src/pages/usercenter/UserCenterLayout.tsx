import Image from 'next/image';
import Link from 'next/link';
import user from '../../../public/images/user.svg';
import profile from '../../../public/images/profile.svg';
import logout from '../../../public/images/logOut.svg';

interface IProps {
  children: React.ReactNode;
}

export default function UserCenterLayout({ children }: IProps) {
  return (
    <section className="hidden pt-12 pb-28 lg:block lg:pt-[84px] lg:pb-[136px]">
      <div className="container min-h-[calc(100vh-330px)]">
        <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
          目前尚無預約
        </div>

        <div className="flex justify-between">
          <div>
            <h3 className="mb-8 text-xl font-bold text-primary-heavy">
              會員中心
            </h3>
            <ul className="flex flex-col space-y-4">
              <li className="flex space-x-3 border-l-[3px] border-primary-heavy py-3 pl-4 font-bold text-primary-heavy">
                <Image src={user} alt="user_icon" width={24} height={24} />
                <button type="button">個人資料</button>
              </li>

              <li className="flex space-x-3 border-l-[3px] border-primary-heavy py-3 pl-4 font-bold text-primary-heavy opacity-50 hover:opacity-100">
                <Image src={profile} alt="user_icon" width={24} height={24} />
                <button type="button">
                  <Link href="usercenter/reservation">預約管理</Link>
                </button>
              </li>

              <li className="flex space-x-3 border-l-[3px] border-primary-heavy py-3 pl-4 font-bold text-primary-heavy opacity-50 hover:opacity-100">
                <Image src={logout} alt="user_icon" width={24} height={24} />
                <button type="button">會員登出</button>
              </li>
            </ul>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}
