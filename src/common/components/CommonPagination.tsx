import { Pagination } from 'antd';
import { useRouter } from 'next/router';

export default function CommonPagination({ TotalPageNum, pageId }: { TotalPageNum: number; pageId: string }) {
  const router = useRouter();
  const convertPageId = Number(pageId);
  return (
    <div className="mb-[94px] flex items-center justify-center lg:justify-end">
      <Pagination
        defaultCurrent={convertPageId}
        total={TotalPageNum * 10}
        onChange={(value) => {
          router.push(`/counselorlist/${value}`);
        }}
      />
    </div>
  );
}
