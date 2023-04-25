import { useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Breadcrumb, ConfigProvider, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { loadingStatus } from '@/common/redux/feature/loading';
import useCloseLoading from '@/common/hooks/useCloseLoading';
import wrapper from '@/common/redux/store';
import { useFinishOrderPostMutation } from '@/common/redux/service/shoppingCart';
import { IShoppingCartProps } from '@/types/interface';
import { breadcrumbTabs } from '@/lib/shoppingCart/shoppingCartData';
import customAlert from '@/common/helpers/customAlert';
import CustomHead from '@/common/components/CustomHead';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import { IButton } from '@/common/components/IButton';
import Link from 'next/link';
import NewBPayForm from '../modules/shoppingCart/NewBPayForm';
import Payment from '../modules/shoppingCart/Payment';
import ShoppingForm from '../modules/shoppingCart/ShoppingForm';

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ req, res }) => {
  try {
    const token = getCookie('auth', { req, res });
    const identity = getCookie('identity', { req, res });
    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }
    if (identity === 'counselor') {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
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

export default function ShopCart({ token, data: { Data } }: IShoppingCartProps) {
  const [modal, alertModal] = Modal.useModal();
  const dispatch = useDispatch();
  // =================== 關閉 loading ===================
  useCloseLoading();
  const openLoading = useOpenLoading();

  // =================== 購物車資料 ===================
  const { CartList = [], TotalAmount = 0 } = Data || {};
  const [renderDate, setRenderDate] = useState(CartList);

  // =================== 結帳 API ===================
  const [TradeInfoInput, setTradeInfo] = useState('');
  const [TradeShaInput, setTradeSha] = useState('');
  const [finishOrderPost] = useFinishOrderPostMutation();
  // ! 藍新表單跳轉 => 取值會有問題，先用setTimeout解決
  const redirectFormAction = (url: string) => {
    setTimeout(() => {
      const form = document.getElementById('Newebpay') as HTMLFormElement;
      dispatch(loadingStatus('none'));
      form.action = url;
      form.submit();
    }, 500);
  };
  const finishOrder = async () => {
    await openLoading();

    const res = await finishOrderPost({ token });
    if ('error' in res) {
      dispatch(loadingStatus('none'));
      const {
        data: { Message },
      } = res.error as unknown as { data: { Message: string } };
      customAlert({ modal, Message, type: 'error' });
      return;
    }

    const {
      PaymentData: { TradeInfo, TradeSha },
    } = (await res.data) as { PaymentData: { TradeInfo: string; TradeSha: string } };

    await setTradeInfo(TradeInfo);
    await setTradeSha(TradeSha);
    redirectFormAction('https://ccore.newebpay.com/MPG/mpg_gateway');
  };

  return (
    <>
      <CustomHead pageTitle="購物車" />
      <section className="bg-white pt-14 pb-28 lg:pt-[84px] lg:pb-[152px]">
        <div className="container text-center">
          {/* 麵包屑 */}
          <div>
            <ConfigProvider>
              <Breadcrumb items={breadcrumbTabs} />
            </ConfigProvider>
          </div>
          <h2 className="relative mt-9 pb-3 after:absolute after:left-1/2 after:-bottom-1 after:h-1 after:w-10 after:-translate-x-1/2 after:bg-secondary lg:mt-[65px]">購物車</h2>

          {/* 依據購物車內沒有商品判斷顯示什麼 */}
          {!renderDate.length ? (
            <div className="flex flex-col space-y-12 justify-center items-center h-[374px] border-2 border-gray-200 mt-[84px] rounded-2xl">
              <p className="text-2xl text-gray-600 font-bold">購物車內沒有商品</p>
              <Link href="/counselorlist/1">
                <IButton text="尋找專屬諮商師" fontSize="text-base" mode="dark" py="py-4" px="px-[34px]" onClick={openLoading} />
              </Link>
            </div>
          )
            : (
              <div>
                {/* 表格 */}
                <ShoppingForm renderDate={renderDate} setRenderDate={setRenderDate} TotalAmount={TotalAmount} />

                {/* 內含付款跟須知 */}
                <Payment />

                {/* 藍新表單 */}
                <NewBPayForm TradeInfoInput={TradeInfoInput} TradeShaInput={TradeShaInput} finishOrder={finishOrder} />
              </div>
            )}
        </div>
        <div className="alert">{alertModal}</div>
      </section>
    </>
  );
}
