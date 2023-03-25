import Link from 'next/link';
import { IButton, lightBtn } from './IButton';

export default function NoLoginBtn() {
  return (
    <Link href="/login">
      <IButton text="登入 / 註冊" bgColor={lightBtn} fontSize="text-[14px] lg:text-base" px="px-6" py="py-3" />
    </Link>
  );
}
