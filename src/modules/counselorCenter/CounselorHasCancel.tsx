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

export default function CounselorHasCancel() {
  return (
    <div className="overflow-x-auto rounded-2xl bg-gray-200 pb-9 lg:pb-12">
      <ul className="flex w-[624px] border-b border-gray-400  py-5 pl-[29px] text-sm font-bold text-gray-700 lg:w-auto lg:px-0 lg:text-center">
        <li className="w-[20.1438%] lg:pl-11">個案姓名</li>
        <li className="w-[20.1438%] lg:pl-3">諮商議題</li>
        <li className="w-[20.1438%]">諮商日期</li>
        <li className="w-[20.1438%]">諮商時間</li>
        <li className="w-[19.4244%] lg:pr-10">個案記錄</li>
      </ul>

      <ul className="w-[588px] space-y-4 px-[17px] pt-5 lg:w-auto lg:px-7 lg:pt-7">
        {userInfo.map((item) => (
          <li key={item.id} className="flex items-center rounded-lg bg-white py-5 text-center text-sm text-gray-900 lg:space-x-0 lg:text-base">
            <div className="w-[20.1438%]">{item.name}</div>
            <div className="w-[20.1438%]">{item.topic}</div>
            <div className="w-[22.1438%]">{item.date}</div>
            <div className="w-[20.1438%]">{item.time}</div>
            <div className="flex w-[19.4244%] justify-center text-xs lg:text-sm">
              <IButton text="查看" px="px-4 lg:px-5" py="py-1 lg:py-2" fontSize="text-secondary font-bold " />
            </div>
          </li>
        ))}

      </ul>
    </div>
  );
}
