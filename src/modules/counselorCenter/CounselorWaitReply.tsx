import { IButton } from '@/common/components/IButton';

const userInfo = [
  {
    id: 1,
    name: '第一筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
  },
  {
    id: 2,
    name: '第二筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
  },
  {
    id: 3,
    name: '第三筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
  },
  {
    id: 4,
    name: '第四筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
  },
  {
    id: 5,
    name: '第五筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
  },
];

export default function CounselorWaitReply() {
  return (
    <div className="overflow-x-auto rounded-2xl bg-gray-200 pb-9 lg:pb-12">
      <ul className="flex w-[624px] border-b border-gray-400  py-5 pl-[29px] text-sm font-bold text-gray-700 lg:w-auto lg:px-0 lg:text-center">
        <li className="lg:w-[17.5889%] lg:pl-[105px] lg:text-left">個案姓名</li>
        <li className="ml-[33px] lg:ml-0 lg:w-[16.996%] lg:pl-3">諮商議題</li>
        <li className="ml-[57px] lg:ml-0  lg:w-[17.7865%]">諮商日期</li>
        <li className="ml-[47px] lg:ml-0  lg:w-[14.4268%]">諮商時間</li>
        <li className="ml-[72px] lg:ml-0  lg:w-[33.2015%] lg:pl-[100px] lg:text-left">
          確認預約時段
        </li>
      </ul>

      <ul className="w-[624px] space-y-4 px-3 pt-5 lg:w-auto lg:px-7 lg:pt-7">
        {userInfo.map((item) => (
          <li key={item.id} className="flex  items-center space-x-10 rounded-lg bg-white py-5 px-4 text-sm text-gray-900 lg:space-x-0 lg:text-center lg:text-base">
            <div className="lg:w-[16.5271%] lg:pl-[64px] lg:text-left">{item.name}</div>

            <div className="lg:w-[16.3179%]">{item.topic}</div>

            <div className="lg:w-[20.3974%]">{item.date}</div>

            <div className="lg:w-[13.9121%]">{item.time}</div>

            <div className=" flex space-x-2 text-xs lg:w-[32.8451%] lg:space-x-3 lg:pl-[46px] lg:text-left lg:text-sm">
              <IButton text="我想更改時段" px="px-4 lg:px-5" py="py-1 lg:py-2" fontSize="text-secondary font-bold " />
              <IButton text="接受" px="px-4 lg:px-5" py="py-1 lg:py-2" fontSize="text-secondary font-bold " />
            </div>
          </li>

        )) }

      </ul>
    </div>
  );
}
