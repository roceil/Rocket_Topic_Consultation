/* eslint-disable react/no-array-index-key */
import Image from 'next/image';
import chatRoomIcon from 'public/images/chatRoom/chatRoomIcon.svg';
import close from 'public/images/Close.svg';
import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const fakeAry = Array(10).fill(1);
const fakeMessageAry = [
  {
    type: 'user',
    content: '我覺得我可能不適合當前端工程師....',
  },
  {
    type: 'counselor',
    content: '嗨！我是陳千妤 ，關於您的問題回覆如下：課程定價以小時為單位收費',
  },
  {
    type: 'user',
    content: '我覺得我可能不適合當前端工程師....',
  },
  {
    type: 'counselor',
    content: '嗨！我是陳千妤 ，關於您的問題回覆如下：課程定價以小時為單位收費',
  },
  {
    type: 'user',
    content: '我覺得我可能不適合當前端工程師....',
  },
  {
    type: 'counselor',
    content: '嗨！我是陳千妤 ，關於您的問題回覆如下：課程定價以小時為單位收費',
  },
];
export default function ChatRoom() {
  const [connection, setConnection] = useState<signalR.HubConnection>();

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://pi.rocket-coding.com/signalr')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatRoomOpen, setIsChatRoomOpen] = useState(false);
  const chatMessageRef = useRef<HTMLInputElement>(null);
  const chatRoomRef = useRef<HTMLUListElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 開啟聊天室函式
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (connection) {
      connection.start().then(() => {
        console.log('Connection started');
      });
    } else {
      console.log('Connection failed');
    }
  }, [connection]);

  console.log(connection);

  // 關閉聊天室函式
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsLoading(true);
  };

  // 模擬loading＆監聽營幕寬度
  useEffect(() => {
    // 模擬loading
    if (!isModalOpen) {
      setIsLoading(true);
    }
    if (isModalOpen) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }

    // 判斷是否為手機版，避免滾動時，背景也跟著滾動
    if (isModalOpen && window.innerWidth < 1280) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  // 打開chatRoom後，chatRoom會自動滾到最底部
  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, [isChatRoomOpen]);

  return (
    <>
      {/* 手機遮罩 */}
      <div className={`fixed top-0 z-50 hidden h-screen w-screen  bg-black opacity-70 ${isModalOpen && '!block'} transform duration-300 ease-in-out lg:!hidden `} />

      {/* 聊天室Icon */}
      <button type="button" onClick={showModal} className="fixed  bottom-6 right-6 z-40 rounded-full ring-2 ring-secondary lg:bottom-[50px] lg:right-[50px] lg:hover:opacity-80">
        <Image src={chatRoomIcon} alt="chatRoomIcon" width={60} height={60} />
      </button>

      {/* 聊天列表 */}
      <div className={`fixed bottom-0 right-0 z-50 h-0  w-full origin-bottom duration-300 lg:right-12 lg:bottom-0 lg:h-[-50px]  lg:w-[328px] ${isModalOpen && 'h-[calc(100%-70px)] lg:!bottom-12 lg:h-[500px]'} ease-in-out `}>
        {/* 表頭 */}
        <div className="flex w-full items-center justify-between rounded-t-xl bg-primary-heavy pl-5 text-right font-bold text-gray-900">
          <span>聊天室</span>
          <button type="button" onClick={handleCancel} className="py-4 px-5 hover:opacity-70 active:scale-[0.8]">
            <Image src={close} alt="closeIcon" priority />
          </button>
        </div>

        {/* 內容 */}
        <ul className={`flex h-[calc(100%-48px)] flex-col overflow-y-auto bg-white px-5 py-2 lg:h-[452px] lg:rounded-b-xl ${isLoading ? 'hidden' : 'block'}`}>
          {fakeAry.map((_, index) => (
            <li key={index}>
              <button
                type="button"
                className="flex w-full cursor-pointer  items-center justify-between border-b border-gray-400  pt-4 pb-[22px] lg:w-[288px] lg:hover:opacity-80"
                onClick={() => {
                  setIsChatRoomOpen(true);
                }}
              >
                {/* 用戶圖片 */}
                <div className="h-10 w-10 rounded-full bg-red-400" />

                {/* 用戶名稱 */}
                <div className="ml-3 flex flex-col items-start space-y-1 text-sm text-gray-900">
                  <p className="font-bold">我覺得</p>
                  <p className="w-[235px] text-left lg:w-[196px]">我可能不適合當前端工程師....</p>
                </div>

                {/* 時間 */}
                <span className="ml-[10px] h-full text-xs text-gray-600">21:06</span>
              </button>
            </li>
          ))}
        </ul>

        {/* loading時在內容區塊顯示loading */}
        <div className={`flex h-[calc(100%-48px)] flex-col overflow-y-auto bg-white px-5 py-2 lg:h-[452px] lg:rounded-b-xl ${isLoading ? 'block' : 'hidden'}`}>
          <div className="flex h-full items-center justify-center">
            <span className="ml-3 text-gray-900">Loading...</span>
          </div>
        </div>
      </div>

      {/* 個人聊天室 */}
      <div className={`fixed bottom-0 right-0 z-50 h-0  w-full origin-bottom duration-300 lg:right-12 lg:bottom-0 lg:h-[-50px]  lg:w-[328px] ${isChatRoomOpen && 'h-[calc(100%-70px)] lg:!bottom-12 lg:h-[500px]'} ease-in-out `}>
        {/* 表頭 */}
        <div className="flex w-full items-center justify-between rounded-t-xl bg-primary-heavy pl-5 text-right font-bold text-gray-900">
          <button
            type="button"
            className="underline underline-offset-4 hover:opacity-80"
            onClick={() => {
              setIsChatRoomOpen(false);
            }}
          >
            返回
          </button>
          <span>諮商師</span>
          <button
            type="button"
            onClick={() => {
              handleCancel();
              setIsChatRoomOpen(false);
            }}
            className="py-4 px-5 hover:opacity-70 active:scale-[0.8]"
          >
            <Image src={close} alt="closeIcon" priority />
          </button>
        </div>

        {/* 內容 */}
        <ul ref={chatRoomRef} className="flex h-[calc(100%-120px)] flex-col space-y-10 overflow-y-auto bg-white px-5 py-6 lg:h-[390px] ">
          {/* 聊天室內容依據type渲染左右邊 */}
          {fakeMessageAry.map(({ type, content }, index) => {
            // 用戶訊息
            if (type === 'user') {
              return (
                <li key={index} className="flex justify-end text-sm">
                  {/* 時間  */}
                  <span className="mr-2 flex h-full  items-end text-xs text-gray-600">21:06</span>
                  {/* 內容  */}
                  <div className="max-w-[196px] rounded-xl bg-primary-heavy p-3">{content}</div>
                </li>
              );
            }
            // 諮商師訊息
            return (
              <li key={index} className="flex justify-start space-x-2 text-sm">
                {/* 圖片 */}
                <div className="h-10 w-10 rounded-full bg-red-400" />
                {/* 內容 */}
                <div className="max-w-[196px] rounded-xl bg-primary-heavy p-3">嗨！我是陳千妤 ，關於您的問題回覆如下：課程定價以小時為單位收費</div>
                {/* 時間 */}
                <span className="flex h-full  items-end text-xs text-gray-600">21:06</span>
              </li>
            );
          })}

          {/* 用戶訊息 */}
          <li className="flex justify-end text-sm">
            {/* 時間 */}
            <span className="mr-2 flex h-full  items-end text-xs text-gray-600">21:06</span>
            {/* 內容 */}
            <div className="max-w-[196px] rounded-xl bg-primary-heavy p-3">嗨！有幾個問題想請教</div>
          </li>

          {/* 諮商師訊息 */}
          <li className="flex justify-start space-x-2 text-sm">
            {/* 圖片 */}
            <div className="h-10 w-10 rounded-full bg-red-400" />
            {/* 內容 */}
            <div className="max-w-[196px] rounded-xl bg-primary-heavy p-3">嗨！我是陳千妤 ，關於您的問題回覆如下：課程定價以小時為單位收費</div>
            {/* 時間 */}
            <span className="flex h-full  items-end text-xs text-gray-600">21:06</span>
          </li>
        </ul>

        {/* 表尾 */}
        <div className="h-[72px] w-full bg-primary-heavy px-3 pt-3 lg:rounded-b-xl">
          <input
            ref={chatMessageRef}
            type="text"
            className="bg-primary-heavy outline-none placeholder:text-gray-600 active:shadow-none "
            placeholder="請在此輸入訊息"
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                // 送出的訊息
                console.log(chatMessageRef?.current?.value);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
