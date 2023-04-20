import { useState } from 'react';
import Image from 'next/image';
import { Button, Input, Modal } from 'antd';
import { IButton } from '@/common/components/IButton';
import right from 'public/images/Right.svg';

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
  {
    id: 6,
    name: '第六筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
  },
  {
    id: 7,
    name: '第七筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
  },
  {
    id: 8,
    name: '第八筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
  },
  {
    id: 9,
    name: '第九筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
  },
  {
    id: 10,
    name: '第十筆',
    topic: '親子關係',
    date: '2023 / 04 / 01',
    time: '13:00',
  },
];

export default function CounselorHasSetUp() {
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  const showListModal = () => {
    setIsListModalOpen(true);
  };

  const handleListOk = () => {
    setIsListModalOpen(false);
  };

  const handleListCancel = () => {
    setIsListModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [value, setValue] = useState('');
  const { TextArea } = Input;

  return (
    <>
      <div className="overflow-x-auto rounded-2xl bg-gray-200 pb-9 lg:pb-12">
        <ul className="flex w-[761px] border-b border-gray-400  py-5 pl-[40px] text-sm font-bold text-gray-700 lg:w-auto lg:px-0 lg:text-center">
          <li className="w-[15.2631%] lg:w-[18.0498%]  lg:pl-[92px] lg:text-left">個案姓名</li>
          <li className="w-[15.2631%] lg:w-[14.1762%] lg:pl-3">諮商議題</li>
          <li className="w-[15.2631%] lg:w-[19.5402%] pl-3 ">預約日期</li>
          <li className="w-[15.2631%] lg:w-[11.6858%] pl-4">預約時間</li>
          <li className="w-[22.7332%] lg:w-[17.1455%] pl-5">加入Google日曆</li>
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

      {/* 列表 */}
      <div>
        <Button onClick={showListModal}>
          列表
        </Button>
        <Modal
          title={(
            <ul className="flex w-full justify-between border-b border-gray-400  pb-5 text-sm font-bold text-gray-700 text-center">
              <li className="sm:w-[90px] lg:w-[100px]">個案姓名</li>
              <li className="sm:w-[90px] lg:w-[100px]">諮商議題</li>
              <li className="ml-3 sm:w-[108px] lg:w-[150px]">諮商日期</li>
              <li className="hidden w-[150px] lg:block">紀錄時間</li>
              <li className="w-9 lg:w-[50px]" />
            </ul>
                )}
          open={isListModalOpen}
          onOk={handleListOk}
          onCancel={handleListCancel}
          width={600}
          footer={null}
          centered
        >
          <ul className="flex flex-col space-y-4 mt-5 h-[350px] overflow-y-auto">
            {userInfo.map((item) => (
              <li key={item.id}>
                <button onClick={showModal} type="button" className="flex justify-between w-full items-center rounded-lg bg-gray-200 py-5 text-center text-sm text-gray-900 hover:opacity-60 px-3 sm:px-0">
                  <div className="sm:w-[90px] lg:w-[100px] font-bold">{item.name}</div>
                  <div className="sm:w-[90px] lg:w-[100px]">{item.topic}</div>
                  <div className="sm:w-[108px] lg:w-[150px]">{item.date}</div>
                  <div className="hidden lg:w-[150px] lg:block">{item.time}</div>
                  <div className="sm:w-9 lg:w-[50px] ">
                    <Image src={right} alt="right_icon" width={16} height={16} />
                  </div>
                </button>
              </li>

            ))}

          </ul>
        </Modal>
      </div>
      {/* 諮商記錄 */}
      <div>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={600}
          okText="儲存"
          cancelText="返回歷史記錄"
          centered
        >
          <div className="p-4">
            <div className="mb-8">
              <p className="text-secondary mb-2 font-bold">基本資料</p>
              <ul className="bg-gray-200 rounded-lg px-6 py-4 space-y-3 text-gray-900">
                <li className="flex space-x-3">
                  <span className="font-bold">
                    個案姓名：
                  </span>
                  <span>哈哈哈</span>
                </li>
                <li className="flex space-x-3">
                  <span className="font-bold">諮商議題：</span>
                  <span>一般成人</span>
                </li>
                <li className="flex space-x-3">
                  <span className="font-bold">諮商日期：</span>
                  <span>2023 / 03 / 05</span>
                </li>
                <li className="flex space-x-3">
                  <span className="font-bold">記錄日期：</span>
                  <span>2023 / 03 / 05</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-secondary mb-2 font-bold">諮商記錄</p>
              <TextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="請輸入諮商記錄"
                autoSize={{ minRows: 14, maxRows: 28 }}
                className="bg-gray-200 rounded-lg border-none focus:shadow-none mb-2 p-3"
              />
              <p>上次修改日期｜2023 / 03 / 06</p>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
