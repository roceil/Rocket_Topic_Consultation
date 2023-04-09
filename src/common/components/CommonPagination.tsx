import { Pagination } from 'antd';
import { useRouter } from 'next/router';

export default function CommonPagination({ TotalPageNum }: { TotalPageNum: number }) {
  const router = useRouter();
  return (
    <div className="mb-[94px] flex items-center justify-center lg:justify-end">
      <Pagination
        defaultCurrent={1}
        total={TotalPageNum * 10}
        onChange={(value) => {
          router.push(`/counselorlist/${value}`);
        }}
      />
    </div>
  );
}
