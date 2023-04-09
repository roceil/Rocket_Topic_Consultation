import Link from 'next/link';

/* eslint-disable import/prefer-default-export */
export const counselorPageBreadcrumb = [
  {
    title: <Link href="/">Home</Link>,
  },
  {
    title: <Link href="/counselorlist/1">諮商師總覽</Link>,
  },
  {
    title: <span className="text-secondary">諮商師個人頁面</span>,
  },
];
