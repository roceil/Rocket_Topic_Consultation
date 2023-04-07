/* eslint-disable react/no-array-index-key */
import { IButton } from '@/common/components/IButton';

const fakeAry = Array(5).fill(1);
export default function WaitReply() {
  return (
    <div className=" w-full rounded-2xl bg-gray-200 text-center">
      <ul className="flex w-full border-b border-gray-400 text-sm font-bold text-gray-700">
        <li className="hidden py-5 lg:block lg:w-[29.8418%]">諮商師</li>
        <li className="w-[43.9473%] py-5 lg:w-[11.3636%]">諮商議題</li>
        <li className="w-[56.0526%] py-5 lg:w-[58.7944%]">預約時段</li>
      </ul>

      <ul className="mt-5 flex flex-col space-y-4 px-4 pb-9 text-sm text-gray-900 lg:mt-7 lg:space-y-5 lg:px-7 lg:text-base">
        {fakeAry.map((_, index) => (
          <li key={index} className="flex items-center rounded-lg bg-white ">
            <div className="w-[45.4022%] pl-5 pt-5 pb-[25px] text-left text-gray-900 lg:w-[25.9414%] lg:p-6">
              <p className="mb-3 font-semibold lg:hidden">一般諮商</p>
              <p className="lg:hidden">諮商師｜家洋老師</p>
              <p className="hidden lg:block lg:text-center">家洋老師</p>
            </div>

            <div className="hidden lg:block lg:w-[17.5732%]">
              <p>一般成人</p>
            </div>

            <div className="flex w-[54.5977%] flex-col items-start py-5 pl-5 lg:w-[56.4853%] lg:flex-row lg:items-center lg:justify-center lg:space-x-10">
              <div className="mb-3 flex space-x-2 lg:mb-0 lg:space-x-5">
                <p>2023 / 03 / 05</p>
                <p>09:00</p>
              </div>
              <IButton text="選擇預約時段" fontSize="text-xs lg:text-sm" px="px-4 lg:px-5" py="py-1 lg:py-2" mode="light" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
