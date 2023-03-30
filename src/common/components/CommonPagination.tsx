import { Pagination } from 'antd';

export default function CommonPagination() {
  return (
    <div className="mb-[94px] flex items-center justify-center lg:justify-end">
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
}
