import Link from 'next/link';
import Image from 'next/image';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { getCookie } from 'cookies-next';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import { ICounselorListCardProps } from '@/types/interface';
import convertDescription from '@/common/helpers/convertDescription';
import { IButton } from '@/common/components/IButton';
import CustomAlert from '@/common/helpers/customAlert';

const before = 'counselorCardShadow flex justify-between overflow-hidden rounded-3xl bg-white';

const after = 'counselorCardShadow flex justify-between overflow-hidden bg-white lg:mb-8 hidden rounded-3xl lg:flex';

export default function CounselorListCard({ className, counselorName, subtitle, img, description, id }: ICounselorListCardProps) {
  const isBefore = className === 'before' ? before : after;
  const identity = getCookie('identity');
  const clickUserId = getCookie('userID');
  const openLoading = useOpenLoading();
  const dispatch = useDispatch();
  const [modal, alertModal] = Modal.useModal();

  const startChat = () => {
    if (identity === 'user') {
      dispatch({
        type: 'chatRoomSwitch/chatRoomSwitch',
        payload: {
          isChatRoomOpen: true,
          clickUserId,
          clickCounselorId: id,
        },
      });
    }
    if (!identity) {
      CustomAlert({ modal, Message: '請先登入', type: 'error' });
    }
    if (identity === 'counselor') {
      CustomAlert({ modal, Message: '請更換至一般用戶', type: 'error' });
    }
  };

  return (
    <li className={isBefore}>
      {/* 這是圖片 */}
      <Image src={img} alt={counselorName} width={220} height={327} className="h-[270px] w-[41.5789%] bg-primary-tint object-cover lg:h-[327px] lg:w-[220px]" />

      {/* 這是文字區塊 */}
      <div className="flex w-[58.421%] py-3 flex-col justify-center pl-4  pr-[18px] lg:h-[327px] lg:w-[268px] lg:px-6">
        <h3 className="mb-1 text-xl font-bold text-secondary lg:text-2xl">{counselorName}</h3>
        <p className="mb-3 text-sm font-bold text-gray-900 lg:mb-6 lg:text-base">{subtitle}</p>
        <p className="mb-6 min-h-[72px] text-sm text-gray-700 lg:mb-8 lg:text-base">{convertDescription(description)}</p>

        <div className="flex justify-end space-x-3">
          <IButton text="我有問題" fontSize="text-xs lg:text-sm" mode="light" py="py-2" px="px-5" extraStyle="!hidden sm:!block" onClick={startChat} />
          <Link href={`/counselorlist/counselorpage/${id}`}>
            <IButton text="立即預約" fontSize="text-xs lg:text-sm" mode="dark" py="py-2" px="px-5" extraStyle="flex" onClick={openLoading} />
          </Link>
        </div>
      </div>
      <div id="customAlert" className="alert">{alertModal}</div>
    </li>
  );
}
