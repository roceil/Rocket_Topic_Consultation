/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import chatRoomIcon from 'public/images/chatRoom/chatRoomIcon.svg';
import close from 'public/images/Close.svg';
import { IChatList } from '@/types/interface';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { chatRoomAlert } from '../redux/feature/chatRoom';
import CustomAlert from '../helpers/customAlert';

interface IChatRoomSwitch {
  isChatRoomOpen: boolean;
  clickUserId: number;
  clickCounselorId: number;
}

export default function ChatRoom() {
  const token = getCookie('auth');
  const id = getCookie('userID') || getCookie('counselorID');
  const type = getCookie('identity');
  const dispatch = useDispatch();
  const router = useRouter();
  const [modal, alertModal] = Modal.useModal();
  const chatRoomAlertState = useSelector((state: { chatRoomSlice:{ value:string } }) => state.chatRoomSlice.value);
  const { isChatRoomOpen, clickUserId, clickCounselorId } = useSelector((state: { chatRoomSwitchSlice:{ value:IChatRoomSwitch } }) => state.chatRoomSwitchSlice.value);

  // ====================== state ======================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatList, setChatList] = useState<IChatList[]>([]);
  const [chatRoomData, setChatRoomData] = useState<any>([]);
  const [chatCounselorName, setChatCounselorName] = useState<string | null>(null);
  const [chatUserName, setChatUserName] = useState<string | null>(null);
  const [renderChatRoomPhoto, setRenderChatRoomPhoto] = useState<string>('');

  // ====================== ref ======================
  const chatMessageRef = useRef<HTMLInputElement>(null);
  const chatRoomRef = useRef<HTMLUListElement>(null);

  // ====================== 聊天室列表 GET ======================
  const getChatList = async () => {
    if (!token || !id || !type) {
      setChatList(() => []);
      return;
    }
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chatroom/lastMsgTarget?Id=${id}&Type=${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!data || data.Data === null) return;
    setChatList(data.Data.userChatTargetList);
    const { isRead } = data.Data;
    dispatch(chatRoomAlert(isRead));
  };
  useEffect(() => {
    getChatList();
  }, [isModalOpen, id]);

  // ====================== 聊天室訊息 GET ======================
  useEffect(() => {
    if (chatRoomData) {
      setChatRoomData(() => []);
    }
    const getChatMessage = async () => {
      if (clickUserId === 0 || clickCounselorId === 0) return;
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chatroom/GetChatlogs?CounselorId=${clickCounselorId}&UserId=${clickUserId}&UserType=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!data.Data) {
        setChatRoomData(() => []);
        return;
      }
      setChatRoomData(() => data.Data.ChatlogList);
      setChatCounselorName(() => data.Data.CounselorName);
      setChatUserName(() => data.Data.UserName);
    };
    getChatMessage();
  }, [isChatRoomOpen, clickUserId, clickCounselorId]);

  // ====================== 開啟聊天室 ======================
  const handleChatRoom = async (CounselorId: number, OutName: string, Photo: string, UserId: number) => {
    dispatch({
      type: 'chatRoomSwitch/chatRoomSwitch',
      payload: {
        isChatRoomOpen: true,
        clickUserId: UserId,
        clickCounselorId: CounselorId,
      },
    });

    setChatCounselorName(OutName);
    setRenderChatRoomPhoto(Photo);
  };

  // 發送訊息 POST
  const sendChatMessage = async () => {
    if (!chatMessageRef.current) return;
    if (!chatMessageRef.current.value) return;
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chatroom/chatlogs`, {
      CounselorId: clickCounselorId,
      UserId: clickUserId,
      Type: type === 'user' ? 'send' : 'accept',
      Content: chatMessageRef.current.value,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!data) return;
    chatMessageRef.current.value = '';
  };

  // ======================= 返回時更改成已讀狀態 ======================
  const handlerReadStatus = async () => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chatroom/PostReadChatRoom`, {
      CounselorId: clickCounselorId,
      UserId: Number(clickUserId),
      MyType: type,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(chatRoomAlert(data.Success));
    // getChatList();
  };

  // ====================== 開啟聊天室列表 ======================
  const showModal = () => {
    if (!token) {
      CustomAlert({ modal, Message: '請先登入', type: 'success', router, link: '/login' });
      return;
    }
    setIsModalOpen(true);
  };

  // ====================== 關閉聊天室 ======================
  const handleCancel = () => {
    setIsModalOpen(false);
    setChatRoomData(() => []);
  };

  // ====================== 監聽營幕寬度息 ======================
  useEffect(() => {
    // 判斷是否為手機版，避免滾動時，背景也跟著滾動
    if (isModalOpen && window.innerWidth < 1280) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  // ====================== 聊天室自動滾到底部 ======================

  if (chatRoomRef.current) {
    chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
  }

  useEffect(() => {
    if (chatRoomRef.current && chatRoomRef.current.childNodes.length > 0) {
      const lastMessage = chatRoomRef.current.lastChild as HTMLElement;
      if (!lastMessage) return;
      lastMessage.scrollIntoView();
    }
  }, [isChatRoomOpen, chatRoomData]);

  // ====================== SignalR連線 ======================
  const [chatRoomsServer, setChatRoomsServer] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    // 建立連線
    $.connection.hub.url = 'https://pi.rocket-coding.com/signalr';
    // @ts-ignore
    const chat = $.connection.chartHubb;
    setChatRoomsServer(chat);

    // 註冊用戶身份
    setTimeout(() => {
      $.connection.hub.start()
        .done(() => {
          chat.server.setUserId(id, type);
          // console.log('連線成功', chat);
        })
        .fail((error) => {
          console.log(`连接失败: ${error}`);
        });
    }, 300);

    // 監聽訊息
    chat.client.showIconUnread = function () {
      getChatList();
    };

    // 如果傳送訊息，會將新訊息回傳回來
    chat.client.showMessage = function (_:null, message:string, userType:string, data:any) {
      if (userType !== type) {
        dispatch(chatRoomAlert('false'));
      }
      setChatRoomData((prev: any) => {
        if (prev) {
          return [...prev, data];
        }
        return [data];
      });
    };
    // 監聽所有用戶的登入狀態
    // chat.client.broadcastUserList = function (data:any) {
    //   console.log('142 =', data);
    // };

    return () => {
      $.connection.hub.stop();
    };
  }, [id]);

  // ====================== 聊天室發送訊息 ======================
  const handleSend = () => {
    if (!chatMessageRef.current) return;
    if (!chatMessageRef.current.value) return;
    if (!chatRoomsServer) return;
    if (type === 'user') {
      chatRoomsServer.server.sendTo(clickCounselorId, chatMessageRef.current.value, type);
    }
    if (type === 'counselor') {
      chatRoomsServer.server.sendTo(clickUserId, chatMessageRef.current.value, type);
    }
    chatMessageRef.current.value = '';
  };

  return (
    <>
      {/* 手機遮罩 */}
      <div className={`fixed top-0 z-50 hidden h-screen w-screen  bg-black opacity-70 ${isModalOpen && '!block'} transform duration-300 ease-in-out lg:!hidden `} />

      {/* 聊天室Icon */}
      <div className="fixed bottom-6 right-6 z-40  lg:bottom-[50px] lg:right-[50px] lg:hover:opacity-80">
        <button type="button" onClick={showModal} className=" relative ring-2 ring-secondary rounded-full ">
          <Image src={chatRoomIcon} alt="chatRoomIcon" width={60} height={60} />
          <div className={`absolute w-4 h-4 bg-[#D14D3C] right-0 top-0 rounded-full ${chatRoomAlertState}`} />
        </button>
      </div>

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
        <ul className="flex h-[calc(100%-48px)] flex-col overflow-y-auto bg-white px-5 py-2 lg:h-[452px] lg:rounded-b-xl">
          {chatList.map(({ OutName, Content, InitDate, CounselorId, Photo, UserRead, CounselorRead, UserId }:IChatList) => {
            const convertTime = dayjs(InitDate).format('HH:mm');
            // 如果用戶是user，因為要提示自己有沒有看過，所以要判斷userRead，反之則是counselorRead
            const userType = type === 'user' ? UserRead : CounselorRead;

            return (
              <li key={uuidv4()}>
                <button
                  type="button"
                  className="flex w-full cursor-pointer  items-center justify-between border-b border-gray-400  pt-4 pb-[22px] lg:w-[288px] lg:hover:opacity-80"
                  onClick={() => {
                    handleChatRoom(CounselorId, OutName, Photo, UserId);
                    getChatList();
                  }}
                >

                  {/* 用戶資訊 */}
                  <div className="flex justify-between">
                    {/* 用戶圖片 */}
                    {Photo && <Image src={Photo} alt="userPhoto" width={40} height={40} className="h-10 w-10 rounded-full ring-1 ring-gray-500" priority />}

                    {/* 用戶名稱 */}
                    <div className="ml-3 flex flex-col items-start space-y-1 text-sm text-gray-900">
                      <p className="font-bold">{OutName}</p>
                      <p className="w-[235px] overflow-hidden text-left lg:w-[196px]">{Content}</p>
                    </div>
                  </div>

                  {/* 時間 */}
                  <div className="flex flex-col h-full text-xs text-gray-600 ">
                    <span>{userType ? '' : '未讀'}</span>
                    <span>{convertTime}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 個人聊天室 */}
      <div className={`fixed bottom-0 right-0 z-50 h-0  w-full origin-bottom duration-300 lg:right-12 lg:bottom-0 lg:h-[-50px]  lg:w-[328px] ${isChatRoomOpen && 'h-[calc(100%-70px)] lg:!bottom-12 lg:h-[500px]'} ease-in-out `}>
        {/* 表頭 */}
        <div className="flex w-full items-center justify-between rounded-t-xl bg-primary-heavy pl-5 text-right font-bold text-gray-900">
          <button
            type="button"
            className="underline underline-offset-4 hover:opacity-80"
            onClick={() => {
              dispatch({
                type: 'chatRoomSwitch/chatRoomSwitch',
                payload: {
                  isChatRoomOpen: false,
                  clickCounselorId,
                  clickUserId,
                },
              });
              setChatRoomData(() => []);
              handlerReadStatus();
            }}
          >
            返回
          </button>
          <span>{type === 'user' ? chatCounselorName : chatUserName}</span>
          <button
            type="button"
            onClick={() => {
              handleCancel();
              dispatch({
                type: 'chatRoomSwitch/chatRoomSwitch',
                payload: {
                  isChatRoomOpen: false,
                  clickCounselorId,
                  clickUserId,
                },
              });
              dispatch(chatRoomAlert(true));
            }}
            className="py-4 px-5 hover:opacity-70 active:scale-[0.8]"
          >
            <Image src={close} alt="closeIcon" priority />
          </button>
        </div>

        {/* 內容 */}
        <ul ref={chatRoomRef} className="flex h-[calc(100%-120px)] flex-col space-y-10 overflow-y-auto bg-white px-5 py-6 lg:h-[390px] ">
          {/* 聊天室內容依據type渲染左右邊 */}
          {chatRoomData?.map(({ Content, InitDate, Type }:any) => {
            const convertTime = dayjs(InitDate).format('HH:mm');
            // 用戶訊息
            if (Type === 'send' && type === 'user') {
              return (
                <li key={uuidv4()} className="flex justify-end text-sm">
                  {/* 時間  */}
                  <span className="mr-2 flex h-full  items-end text-xs text-gray-600">{convertTime}</span>
                  {/* 內容  */}
                  <div className="max-w-[196px] rounded-xl bg-primary-heavy p-3 overFlowText">{Content}</div>
                </li>
              );
            }
            if (Type === 'accept' && type === 'counselor') {
              return (
                <li key={uuidv4()} className="flex justify-end text-sm">
                  {/* 時間  */}
                  <span className="mr-2 flex h-full  items-end text-xs text-gray-600">{convertTime}</span>
                  {/* 內容  */}
                  <div className="max-w-[196px] rounded-xl bg-primary-heavy p-3 overFlowText">{Content}</div>
                </li>
              );
            }
            // 諮商師訊息
            return (
              <li key={uuidv4()} className="flex justify-start space-x-2 text-sm">
                {/* 圖片 */}
                {renderChatRoomPhoto && <Image src={renderChatRoomPhoto} alt="userPhoto" width={40} height={40} className="h-10 w-10 rounded-full ring-1 ring-gray-500" priority />}
                {/* 內容 */}
                <div className="max-w-[196px] w-auto rounded-xl bg-primary-heavy p-3 overFlowText ">{Content}</div>
                {/* 時間 */}
                <div className="flex h-full justify-center  text-xs text-gray-600 items-end">
                  <span>{convertTime}</span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* 表尾 */}
        <div className="h-[72px] w-full bg-primary-heavy px-3 pt-3 lg:rounded-b-xl">
          <input
            ref={chatMessageRef}
            type="text"
            className="bg-primary-heavy outline-none placeholder:text-gray-600 active:shadow-none w-full h-full"
            placeholder="請在此輸入訊息"
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                sendChatMessage();
                handleSend();
              }
            }}
          />
        </div>
      </div>

      <div className="alert">{alertModal}</div>
    </>
  );
}
