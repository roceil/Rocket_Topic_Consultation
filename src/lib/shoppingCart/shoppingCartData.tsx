import Link from 'next/link';
import 人際關係 from 'public/images/home/customTopic/人際關係.svg';
import 伴侶關係 from 'public/images/home/customTopic/伴侶關係.svg';
import 負面情緒 from 'public/images/home/customTopic/負面情緒.svg';
import 個人發展 from 'public/images/home/customTopic/個人發展.svg';
import 家庭議題 from 'public/images/home/customTopic/家庭議題.svg';
import 職場議題 from 'public/images/home/customTopic/職場議題.svg';

// !依據Field顯示對應的圖片 => 待刪除
export const FieldImg = (field: string) => {
  switch (field) {
    case '人際關係':
      return 人際關係;
    case '伴侶關係':
      return 伴侶關係;
    case '負面情緒':
      return 負面情緒;
    case '個人發展':
      return 個人發展;
    case '家庭議題':
      return 家庭議題;
    case '職場議題':
      return 職場議題;
    default:
      return 人際關係;
  }
};

export const breadcrumbTabs = [
  {
    title: (
      <Link href="/" className="lg:text-base">
        Home
      </Link>
    ),
  },
  {
    title: <p className="text-secondary lg:text-base">購物車</p>,
  },
];

