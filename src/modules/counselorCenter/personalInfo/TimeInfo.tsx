export default function TimeInfo() {
  return (
    <div className="flex flex-col rounded-lg border bg-gray-200 py-[42px] lg:flex-row">
      <div className="flex">
        <div>開始日期</div>
        <div>結束日期</div>
      </div>
      <div className="ml-[60px] mr-[64px] hidden w-[180px] bg-white lg:block">
        這是日期選單
      </div>
      <div className="h-[473px] w-full border bg-white lg:w-[594px]">
        這是日曆
      </div>
    </div>
  );
}
