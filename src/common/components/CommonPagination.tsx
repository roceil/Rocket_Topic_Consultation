import { Pagination } from 'antd';
import { useRouter } from 'next/router';

export default function CommonPagination() {
  const router = useRouter();
  return (
    <div className="mb-[94px] flex items-center justify-center lg:justify-end">
      <Pagination
        defaultCurrent={1}
        total={50}
        onChange={(value) => {
          router.push(`/counselorlist/${value}`);
        }}
      />
    </div>
  );
}
