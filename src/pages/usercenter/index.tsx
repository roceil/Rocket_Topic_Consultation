import React, { useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import useCloseLoading from '@/common/hooks/useCloseLoading';
import wrapper from '@/common/redux/store';
import { useEditInformationPutMutation } from '@/common/redux/service/userCenter';
import { IUserDataProps } from '@/types/interface';
import UserInformation from '@/modules/userCenter/UserInformation';
import convertDate from '@/common/helpers/convertDate';
import UserCenterLayout from '@/modules/userCenter/UserCenterLayout';
import CustomHead from '@/common/components/CustomHead';
import { Modal } from 'antd';
import CustomAlert from '@/common/helpers/customAlert';

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ req, res }) => {
  const token = getCookie('auth', { req, res });
  if (!token) {
    // 沒有token，導回登入頁
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const resData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data } = resData;
  return {
    props: {
      data,
    },
  };
});

export default function index({ data }: IUserDataProps) {
  // ======================== Alert ========================
  const [modal, alertModal] = Modal.useModal();
  // ======================== 關閉 loading ========================
  useCloseLoading();
  const { Account, BirthDate, Name, Sex } = data.Data[0];
  const token = getCookie('auth');
  const transferDate = convertDate(BirthDate);
  const [nameDisable, setNameDisable] = useState(true);
  const [nameInput, setNameInput] = useState(Name);
  const isHidden = nameDisable ? '!w-0 !h-14 transform duration-300' : '!w-[180px]  transform duration-300';
  const [editInformationPut] = useEditInformationPutMutation();

  // 開啟編輯功能函式
  const edit = () => setNameDisable(!nameDisable);

  // 儲存資料並打PUT API函式
  const save = async () => {
    // 如果用戶沒有改變名字，則直接儲存
    if (nameInput === '') {
      CustomAlert({ modal, Message: '儲存成功', type: 'success', contentKeyWord: '關閉' });
      setNameDisable(true);
      return;
    }

    const res = await editInformationPut({ token, nameInput });

    // 這裡會攔截錯誤訊息
    if ('error' in res) {
      console.log('🚀 ~ file: index.tsx:54 ~ save ~ error:', res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      CustomAlert({ modal, Message, type: 'error' });
      return;
    }
    const { Message } = res.data as { Message: string };
    setNameDisable(true);
    CustomAlert({ modal, Message, type: 'success', contentKeyWord: '關閉' });
  };

  return (
    <>
      <CustomHead pageTitle="會員中心" />
      <div className="bg-white">
        {/* 手機版 */}
        <section className="pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px] ">
          <div className="container">
            <div className="hidden rounded-full bg-primary-heavy py-[13px] text-center font-bold text-gray-900 lg:mb-[72px] lg:block">目前尚無預約</div>
            <h2 className="mb-5 text-center leading-loose lg:hidden">個人資料</h2>
            <div className="justify-between lg:flex">
              <div className="hidden h-[242px] w-[116px] ring-1 lg:block ">
                <h3 className="mb-8 font-bold text-primary-heavy">會員中心</h3>
              </div>
              <UserInformation edit={edit} save={save} nameDisable={nameDisable} accountName={Name} accountEmail={Account} BirthDate={transferDate} Sex={Sex} extraStyle={isHidden} nameInput={nameInput} setNameInput={setNameInput} />
            </div>
          </div>
        </section>

        {/* 電腦版 */}
        <UserCenterLayout>
          <UserInformation edit={edit} save={save} nameDisable={nameDisable} accountName={Name} accountEmail={Account} BirthDate={transferDate} Sex={Sex} extraStyle={isHidden} nameInput={nameInput} setNameInput={setNameInput} />
        </UserCenterLayout>
      </div>
      <div className="alert">{alertModal}</div>
    </>
  );
}
