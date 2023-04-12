import { useState, useRef } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import wrapper from '@/common/redux/store';
import { useEditInformationPutMutation } from '@/common/redux/service/userCenter';
import { IUserDataProps } from '@/types/interface';
import UserInformation from '@/modules/userCenter/UserInformation';
import convertDate from '@/common/helpers/convertDate';
import UserCenterLayout from '@/modules/userCenter/UserCenterLayout';

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ req, res }) => {
  const token = getCookie('auth', { req, res });
  if (!token) {
    res.writeHead(302, { Location: '/login' });
    res.end();
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
  const { Account, BirthDate, Name, Sex } = data.Data[0];
  const nameRef = useRef(Name);
  const token = getCookie('auth');
  const transferDate = convertDate(BirthDate);
  const [nameDisable, setNameDisable] = useState(true);
  const isHidden = nameDisable ? '!opacity-0 transform duration-300' : '!opacity-100 transform duration-300';
  const [editInformationPut] = useEditInformationPutMutation();

  // 開啟編輯功能函式
  const edit = () => setNameDisable(false);

  // 儲存資料並打PUT API函式
  const save = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { value } = nameRef.current as unknown as { value: string };

    // 如果用戶沒有改變名字，則直接儲存
    if (value === '') {
      alert('儲存成功');
      setNameDisable(true);
      return;
    }

    const res = await editInformationPut({ token, value });

    // 這裡會攔截錯誤訊息
    if ('error' in res) {
      console.log('🚀 ~ file: index.tsx:54 ~ save ~ error:', res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      alert(Message);
      return;
    }
    const { Message } = res.data as { Message: string };
    setNameDisable(true);
    alert(Message);
  };

  return (
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
            <UserInformation edit={edit} save={save} nameDisable={nameDisable} accountName={Name} accountEmail={Account} BirthDate={transferDate} Sex={Sex} extraStyle={isHidden} nameRef={nameRef} />
          </div>
        </div>
      </section>

      {/* 電腦版 */}
      <UserCenterLayout>
        <UserInformation edit={edit} save={save} nameDisable={nameDisable} accountName={Name} accountEmail={Account} BirthDate={transferDate} Sex={Sex} extraStyle={isHidden} nameRef={nameRef} />
      </UserCenterLayout>
    </div>
  );
}
