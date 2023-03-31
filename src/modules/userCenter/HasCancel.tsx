/* eslint-disable react/no-array-index-key */
export default function HasCancel() {
  const fakeAry = Array(5).fill(1);
  return (
    <div className=" w-full rounded-2xl bg-gray-200 text-center">
      <ul className="flex w-full border-b border-gray-400 py-5 text-left text-sm font-bold text-gray-700">
        <li className="hidden lg:block lg:w-1/4 lg:pl-[134px]">諮商師</li>
        <li className="w-1/2 pl-[59px] lg:w-1/4 lg:pl-[93px]">諮商議題</li>
        <li className="hidden lg:block lg:w-1/4 lg:pl-[87px]">預約日期</li>
        <li className="hidden lg:block lg:w-1/4 lg:pl-[70px]">預約時間</li>
        <li className="w-1/2 pl-[48px] lg:hidden ">預約詳情</li>
      </ul>

      <ul className="mt-5 flex flex-col space-y-4 px-4 pb-9 text-sm text-gray-900 lg:mt-7 lg:space-y-5 lg:px-7 lg:text-base">
        {fakeAry.map((_, index) => (
          <li key={index} className="flex  rounded-lg bg-white lg:py-6">
            <div className="w-[44.2528%] py-[18px] pl-5 text-left text-gray-900 lg:w-[22.1757%] lg:p-0 lg:text-center">
              <p className="mb-3 font-semibold lg:hidden">一般諮商</p>
              <p className="lg:hidden">諮商師｜我是誰</p>
              <p className="hidden lg:block lg:pl-[104px] lg:text-left">我是誰</p>
            </div>

            <div className="hidden lg:block lg:w-[28.4518%]">
              <p>一般成人</p>
            </div>

            <div className="hidden lg:block lg:w-[23.3263%]">
              <p>2023 / 03 / 05</p>
            </div>

            <div className="hidden lg:block lg:w-[26.046%]">
              <p>09:00</p>
            </div>
            <div className="flex w-[55.7471%] flex-col items-start justify-start pt-4 pl-8 lg:hidden">
              <div className="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:space-x-2">
                <p>2023 / 03 / 05</p>
                <p>09:00</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
