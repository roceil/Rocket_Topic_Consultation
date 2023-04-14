import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Breadcrumb, ConfigProvider } from 'antd';
import { IButton } from '@/common/components/IButton';
import wrapper from '@/common/redux/store';
import { useDeleteItemDeleteMutation, useFinishOrderPostMutation } from '@/common/redux/service/shoppingCart';
import close from 'public/images/Close.svg';
import 人際關係 from 'public/images/home/customTopic/人際關係.svg';
import 伴侶關係 from 'public/images/home/customTopic/伴侶關係.svg';
import 負面情緒 from 'public/images/home/customTopic/負面情緒.svg';
import 個人發展 from 'public/images/home/customTopic/個人發展.svg';
import 家庭議題 from 'public/images/home/customTopic/家庭議題.svg';
import 職場議題 from 'public/images/home/customTopic/職場議題.svg';
import { useEffect, useState } from 'react';

const breadcrumbTabs = [
  {
    title: (
      <Link href="/" className="lg:text-base">
        Home
      </Link>
    ),
  },
  {
    title: <p className="text-secondary lg:text-base">購物車</p>,
  },
];

// !依據Field顯示對應的圖片 => 待刪除
const fieldImg = (field: string) => {
  switch (field) {
    case '人際關係':
      return 人際關係;
    case '伴侶關係':
      return 伴侶關係;
    case '負面情緒':
      return 負面情緒;
    case '個人發展':
      return 個人發展;
    case '家庭議題':
      return 家庭議題;
    case '職場議題':
      return 職場議題;
    default:
      return 人際關係;
  }
};

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ req, res }) => {
  try {
    const token = getCookie('auth', { req, res });
    if (!token) {
      res.writeHead(302, { Location: '/login' });
      res.end();
    }
    const resData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = resData;
    return {
      props: {
        data,
        token,
      },
    };
  } catch (error) {
    return {
      props: {
        data: { Data: { CartList: [], TotalAmount: 0 } },
        token: '',
      },
    };
  }
});

interface ICartList {
  CartId: number;
  Counselor: string;
  Field: string;
  Item: string;
  Price: number;
}

interface IShoppingCartProps {
  data: {
    Data: { CartList: ICartList[]; TotalAmount: number };
  };
  token: string;
}

export default function ShopCart({ token, data: { Data } }: IShoppingCartProps) {
  const { CartList = [], TotalAmount = 0 } = Data || {};
  const convertTotalPrice = TotalAmount.toLocaleString();
  const router = useRouter();
  const [renderDate, setRenderDate] = useState(CartList);
  const [TotalPrice, setTotalPrice] = useState(convertTotalPrice);
  const [confirmPayWay, setConfirmPayWay] = useState(false);
  const [deleteItemDelete] = useDeleteItemDeleteMutation();
  const [finishOrderPost] = useFinishOrderPostMutation();

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  // 確認付款方式
  const checkPayWay = confirmPayWay ? 'ring-2' : 'ring-0';

  // 刪除商品 API
  const deletedItem = async (CartId: number) => {
    const res = await deleteItemDelete({ token, CartId });
    if ('error' in res) {
      alert('刪除失敗');
      return;
    }

    const {
      data: { Message },
    } = res as { data: { Message: string } };
    alert(Message);

    // 刪除後重新渲染
    const newRenderDate = renderDate.filter((item) => item.CartId !== CartId);
    setRenderDate(newRenderDate);

    // 刪除後重新計算總價
    const newTotalPrice = newRenderDate.reduce((acc, cur) => acc + cur.Price, 0);
    const convertNewTotalPrice = newTotalPrice.toLocaleString();
    setTotalPrice(convertNewTotalPrice);
  };

  // 結帳 API
  const finishOrder = async () => {
    if (!confirmPayWay) {
      alert('請選擇付款方式');
      return;
    }
    const res = await finishOrderPost({ token });
    if ('error' in res) {
      const {
        data: { Message },
      } = res.error as unknown as { data: { Message: string } };
      alert(Message);
      return;
    }

    const {
      data: { Message },
    } = res as { data: { Message: string } };
    const { data } = res as { data: { Message: string } };
    const { PaymentData } = data as any;
    const { TradeInfo, TradeSha } = PaymentData;
    setInput1(TradeInfo);
    setInput2(TradeSha);
    // router.push('/usercenter/reservation');
    alert(Message);
  };

  useEffect(() => {
    console.log(input1, input2);
  }, [input1, input2]);

  // 返回上一頁函式
  const goBack = () => {
    router.back();
  };

  // 確認付款方式
  const selectPayWay = () => {
    setConfirmPayWay(!confirmPayWay);
  };

  return (
    <section className="bg-white pt-14 pb-28 lg:pt-[84px] lg:pb-[152px]">
      <div className="container text-center">
        {/* 麵包屑 */}
        <div>
          <ConfigProvider>
            <Breadcrumb items={breadcrumbTabs} />
          </ConfigProvider>
        </div>

        <h2 className="relative mt-9 pb-3 after:absolute after:left-1/2 after:-bottom-1 after:h-1 after:w-10 after:-translate-x-1/2 after:bg-secondary lg:mt-[65px]">購物車</h2>

        {/* 表格 */}
        <div className="mt-12 rounded-2xl border-2 border-gray-400 text-sm text-gray-700 lg:mt-[84px]">
          {/* 表頭 */}
          <ul className="flex border-b-2 border-gray-400 py-5 font-bold lg:py-[29px] lg:text-left lg:text-base">
            <li className="w-1/2 lg:pl-[130px]">預約項目</li>
            <li className="w-1/4 lg:pl-[85px]">堂數</li>
            <li className="w-1/4 lg:text-center">定價</li>
          </ul>

          {/* 表格內容 */}
          <ul className="text-gray-900 lg:text-left lg:text-base">
            {renderDate.map(({ Counselor, Field, Item, Price, CartId }) => {
              const convertPrice = Price.toLocaleString();
              const convertImg = fieldImg(Field);
              return (
                <li key={CartId} className="flex items-center border-b border-gray-400 py-5">
                  <div className="flex w-1/2 pl-7 lg:items-center lg:pl-14">
                    <button type="button">
                      <Image src={close} alt="delete_icon" className="mr-6 lg:mr-0 lg:hover:opacity-50" onClick={() => deletedItem(CartId)} />
                    </button>

                    <Image src={convertImg} className="hidden rounded-2xl lg:ml-14 lg:block" alt="product-pic" width={100} height={100} priority />

                    <div className="lg:ml-6">
                      <p className="mb-1 font-bold">{Field}</p>
                      <p className="text-left">{Counselor}</p>
                    </div>
                  </div>

                  <div className="w-1/4 lg:pl-[84px]">
                    <p>{Item}</p>
                  </div>

                  <div className="w-1/4 lg:text-center">
                    <p>{`$ ${convertPrice}`}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* 總價格 */}
          <div className=" flex justify-end space-x-5 py-6 pr-[25px] text-gray-900 lg:space-x-9 lg:py-8 lg:pr-[123px] lg:text-base">
            <p className="font-bold">總計</p>
            <p>{`$ ${TotalPrice}`}</p>
          </div>
        </div>

        {/* 內含付款跟須知 */}
        <div className="lg:mt-12 lg:flex lg:justify-between">
          {/* 付款 */}
          <div className="mt-7 flex space-x-8 rounded-2xl border-2 border-gray-400 py-5 px-7 font-bold text-gray-900 lg:mt-0 lg:w-[38.3399%] lg:justify-between lg:py-7 lg:pl-7 lg:pr-[91px] lg:text-lg">
            <p className="">進行付款</p>
            <button type="button" className={`flex w-[156px] items-center justify-center rounded-xl bg-primary py-5 text-xl ring-secondary lg:w-[188px] lg:py-[55px] ${checkPayWay}`} onClick={selectPayWay}>
              信用卡
            </button>
          </div>

          {/* 預約須知 */}
          <div className="mt-7 rounded-2xl border-2 border-gray-400 py-4 px-5 text-left font-bold text-gray-900 lg:mt-0 lg:w-[58.7944%] lg:py-5 lg:px-7 lg:text-lg">
            <p className="mb-2">預約須知</p>

            <ol className="ml-4 list-decimal text-sm font-normal leading-[175%] text-gray-800 lg:text-base">
              <li className="">請於結帳完成後，至會員中心選擇預約時段。</li>
              <li>
                預約成立後若要更改時段，請至
                <Link href="/usercenter/reservation" className="underline lg:hover:opacity-50">
                  {' '}
                  會員中心 / 預約管理 / 已成立
                  {' '}
                </Link>
                更改時段。
              </li>
              <li>為維護雙方權益，預約日前三天不可更改時段。</li>
              <li>如需取消預約，請聯絡小幫手處理。</li>
            </ol>
          </div>
        </div>

        {/* 按鈕 */}
        <div className="mt-7 flex space-x-5 text-base font-bold lg:mt-16 lg:justify-end lg:space-x-7 lg:text-base">
          <IButton text="返回" fontSize="text-base" py="py-4" extraStyle="w-full max-w-[180px]" mode="light" onClick={goBack} />
          <IButton text="完成結帳" fontSize="text-base" py="py-4" extraStyle="w-full max-w-[180px]" mode="dark" onClick={finishOrder} />
        </div>
      </div>

      <form name="Newebpay" method="post" action="https://ccore.newebpay.com/MPG/mpg_gateway">
        {/* <!-- 藍新金流商店代號 --> */}
        <input type="" id="MerchantID" name="MerchantID" value="MS148623457" />

        {/* <!-- 交易資料透過 Key 及 IV 進行 AES 加密 --> */}
        <input type="" id="TradeInfo" name="TradeInfo" value={input1} className="ring-1 " />

        {/* <!-- 經過上述 AES 加密過的字串，透過商店 Key 及 IV 進行 SHA256 加密 --> */}
        <input type="hiden" id="TradeSha" name="TradeSha" value={input2} className="ring-1" />

        {/* <!-- 串接程式版本 --> */}
        <input type="" id="Version" name="Version" value="2.0" />

        {/* <!-- 直接執行送出 --> */}
        <input type="submit" value="前往付款" onClick={() => console.log(123)} className="ring-1" />
      </form>
    </section>
  );
}
