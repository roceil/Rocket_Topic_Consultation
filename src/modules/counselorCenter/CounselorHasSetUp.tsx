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

export default function CounselorHasSetUp() {
  return (
    <div className="overflow-x-auto rounded-2xl bg-gray-200 pb-9 lg:pb-12">
      <ul className="flex w-[624px] border-b border-gray-400  py-5 pl-[29px] text-sm font-bold text-gray-700 lg:w-auto lg:px-0 lg:text-center">
        <li className="w-[15.2631%] lg:w-[18.0498%] lg:pl-[95px] lg:text-left">個案姓名</li>
        <li className="w-[15.2631%] lg:w-[14.1762%] lg:pl-3">諮商議題</li>
        <li className="w-[15.2631%] lg:w-[19.5402%]">預約日期</li>
        <li className="w-[15.2631%] lg:w-[11.6858%]">預約時間</li>
        <li className="w-[22.7332%] lg:w-[17.1455%]">加入Google日曆</li>
        <li className="w-[16.2943%] pl-[20px] text-left lg:w-[17.3371%] lg:pl-[55px]">個案記錄</li>
      </ul>

      <ul className="w-[761px] space-y-4 px-4 pt-5 lg:w-auto lg:px-7 lg:pt-7">
        {userInfo.map((item) => (
          <li key={item.id} className="flex items-center  rounded-lg bg-white py-5 px-4 text-center text-sm text-gray-900 lg:text-base">
            <div className="w-[11.2947%] lg:w-[15.2719%] lg:pl-[52px] lg:text-left">{item.name}</div>
            <div className="w-[20.6611%] lg:w-[16.3179%]">{item.topic}</div>
            <div className="w-[13.3966%] lg:w-[20.3974%]">{item.date}</div>
            <div className="w-[20.11%] lg:w-[13.9121%]">{item.time}</div>
            <div className="w-[18.1818%] lg:w-[16.7364%]">
              <IButton text="加入" px="px-4 lg:px-5" py="py-1 lg:py-2" fontSize="text-secondary font-bold " />
            </div>
            <div className="w-[17.3553%] pl-[50px] text-left lg:w-[17.364%] lg:pl-[46px]">
              <IButton text="查看" px="px-4 lg:px-5" py="py-1 lg:py-2" fontSize="text-secondary font-bold " />
            </div>
          </li>

        ))}
      </ul>
    </div>
  );
}
