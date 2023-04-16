import { IButton } from '@/common/components/IButton';
import { useRouter } from 'next/router';

export default function NewBPayForm({ TradeInfoInput, TradeShaInput, finishOrder }: { TradeInfoInput: string; TradeShaInput: string; finishOrder: () => void }) {
  const router = useRouter();

  // 返回上一頁函式
  const goBack = () => {
    router.back();
  };

  return (
    <form id="Newebpay" name="Newebpay" method="post" action={process.env.NEXT_PUBLIC_NEWBPAY_URL} className="mt-7 flex space-x-5 text-base font-bold lg:mt-16 lg:justify-end lg:space-x-7 lg:text-base">
      {/* <!-- 藍新金流商店代號 --> */}
      <input type="hidden" id="MerchantID" name="MerchantID" value="MS148623457" />

      {/* <!-- 交易資料透過 Key 及 IV 進行 AES 加密 --> */}
      <input type="hidden" id="TradeInfo" name="TradeInfo" value={TradeInfoInput} className="ring-1 " />

      {/* <!-- 經過上述 AES 加密過的字串，透過商店 Key 及 IV 進行 SHA256 加密 --> */}
      <input type="hidden" id="TradeSha" name="TradeSha" value={TradeShaInput} className="ring-1" />

      {/* <!-- 串接程式版本 --> */}
      <input type="hidden" id="Version" name="Version" value="2.0" />

      {/* <!-- 直接執行送出 --> */}
      <IButton text="返回" fontSize="text-base" py="py-4" extraStyle="w-full max-w-[180px]" mode="light" onClick={goBack} />
      <IButton type="button" text="完成結帳" fontSize="text-base" py="py-4" extraStyle="w-full max-w-[180px]" mode="dark" onClick={finishOrder} />
    </form>
  );
}
