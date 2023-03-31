/* eslint-disable react/no-array-index-key */
import { IButton } from '@/common/components/IButton';

const fakeAry = Array(5).fill(1);
export default function HasSetUp() {
  return (
    <div className=" w-full rounded-2xl bg-gray-200 text-center">
      {/* 標題 */}
      <ul className="flex w-full border-b border-gray-400 py-5 text-left text-sm font-bold text-gray-700 lg:items-center lg:text-center">
        <li className="hidden lg:block lg:w-[12.6482%] lg:pl-[63px] lg:text-left">諮商師</li>
        <li className="w-1/2 pl-[59px] lg:w-[18.4782%] lg:pl-0">諮商議題</li>
        <li className="hidden lg:block lg:w-[13.7351%]">預約日期</li>
        <li className="hidden lg:block lg:w-[16.3043%]">預約時間</li>
        <li className="hidden lg:block lg:w-[13.1422%]">完成訂單</li>
        <li className="hidden lg:block lg:w-[25.6916%]">評價</li>
        <li className="w-1/2 pl-[48px] lg:hidden">預約詳情</li>
      </ul>

      {/* 內容 */}
      <ul className="mt-5 flex flex-col space-y-4 px-4 pb-9 text-sm text-gray-900 lg:mt-7 lg:px-7 lg:text-base">
        {fakeAry.map((_, index) => (
          <li key={index} className="flex items-center rounded-lg bg-white lg:py-6">
            <div className="w-[44.8275%] pl-[24px] pt-5 pb-[25px] text-left lg:w-[12.6569%] lg:p-0 lg:text-center">
              <p className="mb-3 font-semibold lg:hidden">一般諮商</p>
              <p className="lg:hidden">諮商師｜我是誰</p>
              <p className="hidden lg:block">我是誰</p>
            </div>

            <div className="hidden lg:block lg:w-[15.0627%]">
              <p>一般成人</p>
            </div>

            <div className="hidden lg:block lg:w-[19.1422%]">
              <p>2023 / 03 / 05</p>
            </div>

            <div className="hidden lg:block lg:w-[12.6569%]">
              <p>09:00</p>
            </div>

            <div className="hidden lg:block lg:w-[18.41%]">
              <IButton text="完成訂單" fontSize="text-sm" px="lg:px-5" py="lg:py-2" mode="light" />
            </div>

            <div className="hidden lg:block lg:w-[22.0711%]">
              <IButton text="撰寫 / 編輯評價" fontSize="text-sm" px="lg:px-5" py="lg:py-2" mode="light" />
            </div>

            <div className="flex w-[55.1724%] flex-col items-start py-5 pl-[24px] lg:hidden">
              <div className="mb-3 flex space-x-2">
                <p>2023 / 03 / 05</p>
                <p>09:00</p>
              </div>
              <div className="flex space-x-2">
                <IButton text="完成訂單" fontSize="text-xs" px="px-3" py="py-1" mode="light" />
                <IButton text="評價" fontSize="text-xs" px="px-3" py="py-1" mode="light" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
