import { useState } from 'react';
import { IButton } from '@/common/components/IButton';
import ResetPassWordModal from '../../common/components/ResetPassWordModal';

export default function UserInformation({ save, edit, nameDisable, accountEmail, BirthDate, Sex, extraStyle, nameInput, setNameInput }: any) {
  const [showResetPassword, setShowResetPassword] = useState(false);

  return (
    <form onSubmit={save} action="" className="flex w-full flex-col ">
      <div className="mb-12 flex flex-col space-y-6 border-y border-gray-400 py-8 lg:rounded-xl lg:border lg:py-10 lg:px-9 lg:shadow">
        <label className="min-h-10 py-2 text-gray-900">
          <span>會員帳號：</span>
          <span className="text-sm">{accountEmail}</span>
        </label>

        <label className="min-h-10 text-gray-900">
          <span>修改密碼：</span>
          <button
            type="button"
            className="rounded-[10px] border border-secondary py-[9px] px-5 text-sm active:scale-[0.8] lg:hover:opacity-80"
            onClick={() => {
              setShowResetPassword(!showResetPassword);
            }}
          >
            點我重設密碼
          </button>
        </label>

        <ResetPassWordModal showResetPassword={showResetPassword} setShowResetPassword={setShowResetPassword} />

        <label className="min-h-10 text-gray-900">
          <span>會員姓名：</span>
          <input
            type="text"
            className="rounded-[10px] border border-secondary py-[9px] px-3 text-sm caret-secondary outline-none placeholder:text-gray-800 disabled:border-gray-500 disabled:bg-inherit disabled:text-gray-500 disabled:placeholder:text-gray-500"
            placeholder={nameInput}
            disabled={nameDisable}
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
          />
        </label>

        <label className="min-h-10 py-2 text-gray-900">
          <span>會員生日：</span>
          <span className="text-sm">{BirthDate}</span>
        </label>

        <label className="min-h-10 !mb-3 py-2 text-gray-900 ">
          <span>會員性別：</span>
          <span className="text-sm">{Sex}</span>
        </label>
      </div>

      <div className="flex justify-center space-x-5 lg:justify-end">
        <IButton text="編輯" fontSize="text-base" px="px-14 sm:px-[74px]" py="py-4" mode="light" onClick={edit} />
        <IButton text="儲存" fontSize="text-base" mode="dark" onClick={save} extraStyle={extraStyle} />
      </div>
    </form>
  );
}
