import Image from 'next/image';
import { FieldImg } from '@/lib/shoppingCart/shoppingCartData';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import { useDispatch } from 'react-redux';
import { loadingStatus } from '@/common/redux/feature/loading';
import { useDeleteItemDeleteMutation } from '@/common/redux/service/shoppingCart';
import { getCookie } from 'cookies-next';
import close from 'public/images/Close.svg';
import { useState } from 'react';
import { IShoppingFormProps, ICartItem } from '@/types/interface';
import { Modal } from 'antd';
import customAlert from '@/common/helpers/customAlert';

export default function ShoppingForm({ renderDate, setRenderDate, TotalAmount }: IShoppingFormProps) {
  const [modal, alertModal] = Modal.useModal();
  const openLoading = useOpenLoading();
  const dispatch = useDispatch();
  const token = getCookie('auth');
  const convertTotalPrice = TotalAmount.toLocaleString();

  const [TotalPrice, setTotalPrice] = useState(convertTotalPrice);

  // =================== 刪除購物車項目 API ===================
  const [deleteItemDelete] = useDeleteItemDeleteMutation();
  const deletedItem = async (CartId: number) => {
    const res = await deleteItemDelete({ token, CartId });
    if ('error' in res) {
      console.log('🚀 ~ file: ShoppingForm.tsx:28 ~ deletedItem ~ res:', res);
      dispatch(loadingStatus('none'));
      customAlert({ modal, Message: '刪除失敗', type: 'error' });
      return;
    }

    const {
      data: { Message },
    } = res as { data: { Message: string } };
    dispatch(loadingStatus('none'));
    customAlert({ modal, Message, type: 'success', contentKeyWord: '關閉' });

    // 刪除後重新渲染
    const newRenderDate = renderDate.filter((item: { CartId: number }) => item.CartId !== CartId);
    setRenderDate(newRenderDate);

    // 刪除後重新計算總價
    const newTotalPrice = newRenderDate.reduce((acc: number, cur: { Price: number }) => acc + cur.Price, 0);
    const convertNewTotalPrice = newTotalPrice.toLocaleString();
    setTotalPrice(convertNewTotalPrice);
  };

  return (
    <div className="mt-12 rounded-2xl border-2 border-gray-400 text-sm text-gray-700 lg:mt-[84px]">
      {/* 表頭 */}
      <ul className="flex border-b-2 border-gray-400 py-5 font-bold lg:py-[29px] lg:text-left lg:text-base">
        <li className="w-1/2 lg:pl-[130px]">預約項目</li>
        <li className="w-1/4 lg:pl-[85px]">堂數</li>
        <li className="w-1/4 lg:text-center">定價</li>
      </ul>

      {/* 表格內容 */}
      <ul className="text-gray-900 lg:text-left lg:text-base">
        {renderDate.map(({ Counselor, Field, Item, Price, CartId }: ICartItem) => {
          const convertPrice = Price.toLocaleString();
          const convertImg = FieldImg(Field);
          return (
            <li key={CartId} className="flex items-center border-b border-gray-400 py-5">
              <div className="flex w-1/2 pl-7 lg:items-center lg:pl-14">
                <button type="button" onClick={openLoading}>
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
      <div className="alert">{alertModal}</div>
    </div>
  );
}
