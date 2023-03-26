export default function UserInformation({
  save, edit, nameDisable, accountName, accountEmail,
}: any) {
  return (
    <form
      onSubmit={save}
      className="flex w-full flex-col  border-secondary "
    >
      <div className="mb-12 flex flex-col space-y-6 border-y py-8 lg:rounded-xl lg:border lg:border-secondary lg:py-10 lg:px-9">
        <label className="min-h-10 py-2 text-primary-heavy">
          <span>會員帳號：</span>
          <span className="text-sm">{accountEmail}</span>
        </label>

        <label className="min-h-10 text-primary-heavy">
          <span>修改密碼：</span>
          <button
            type="button"
            className="rounded-[10px] border border-secondary py-[9px] px-5 text-sm hover:bg-primary-heavy hover:text-white"
          >
            點我重設密碼
          </button>
        </label>

        <label className="min-h-10 text-primary-heavy">
          <span>會員姓名：</span>
          <input
            type="text"
            className="rounded-[10px] border border-secondary py-[9px] px-3 text-sm caret-primary-heavy outline-none placeholder:text-primary-heavy"
            placeholder={accountName}
            disabled={nameDisable}
          />
        </label>

        <label className="min-h-10 py-2 text-primary-heavy">
          <span>會員生日：</span>
          <span className="text-sm">1998/88/99</span>
        </label>

        <label className="min-h-10 !mb-3 py-2 text-primary-heavy ">
          <span>會員性別：</span>
          <span className="text-sm">女</span>
        </label>
      </div>

      <div className="flex justify-center space-x-5 lg:justify-end">
        <button
          type="button"
          className="w-full max-w-[180px] rounded-full border border-primary-heavy py-4 font-bold text-primary-heavy"
          onClick={edit}
        >
          編輯
        </button>

        <button
          type="submit"
          className="w-full max-w-[180px] rounded-full border border-primary-heavy bg-primary-heavy py-4 font-bold text-white"
        >
          儲存
        </button>
      </div>
    </form>
  );
}
