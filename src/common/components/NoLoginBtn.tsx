import Link from 'next/link';
import { IButton } from './IButton';

export default function NoLoginBtn() {
  return (
    <Link href="/login" className="flex flex-shrink-0 items-center">
      <IButton text="登入 / 註冊" fontSize="text-[14px] lg:text-base" px="px-6" py="py-3" />
    </Link>
  );
}
