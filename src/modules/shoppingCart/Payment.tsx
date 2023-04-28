import Link from 'next/link';

export default function Payment() {
  return (
    <div className="lg:mt-12 lg:flex lg:flex-row-reverse lg:justify-between">
      {/* 付款 */}
      <div className="mt-7  text-start   rounded-2xl border-2 border-gray-400 py-5 px-5 font-bold text-gray-900 lg:mt-0 lg:w-[38.3399%] lg:justify-between lg:py-7 lg:pl-7 lg:pr-[91px] lg:text-lg">
        <p className="mb-4">進行付款</p>
        <label>
          <input type="radio" name="payment" value="credit" defaultChecked disabled className="text-sm mr-2" />
          信用卡付款 ( VISA、MasterCard )
        </label>
        <p className="text-xs font-normal lg:text-sm text-gray-600 mt-[52px]">* 目前暫不提供其他付款方式，如有不便敬請見諒</p>
      </div>

      {/* 預約須知 */}
      <div className="mt-7 rounded-2xl border-2 border-gray-400 py-4 px-5 text-left font-bold text-gray-900 lg:mt-0 lg:w-[58.7944%] lg:py-5 lg:px-7 lg:text-lg">
        <p className="mb-2">預約須知</p>

        <ol className="ml-4 list-decimal text-sm font-normal leading-[175%] text-gray-800 lg:text-base">
          <li className="">請於結帳完成後，至會員中心選擇預約時段。</li>
          <li>
            預約成立後若要更改時段，請至
            <Link href="/usercenter/reservation" className="underline lg:hover:opacity-50">
              會員中心 / 預約管理 / 待回覆
            </Link>
            更改時段。
          </li>
          <li>為維護雙方權益，預約日前三天不可更改時段。</li>
          <li>如需取消預約，請聯絡小幫手處理。</li>
        </ol>
      </div>
    </div>
  );
}
