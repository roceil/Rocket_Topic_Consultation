import Image from 'next/image';
import loginMain from '../../../public/images/login/loginMain.svg';

export default function RegisterSVG() {
  return (
    <div className="mr-[176px] ml-[58px] hidden h-[492px] w-[492px] rounded-[25px] bg-loginBG text-center lg:flex lg:items-center lg:justify-center">
      <Image src={loginMain} width={229} height={304} alt="picture" className="animate-wiggle" priority />
    </div>
  );
}
