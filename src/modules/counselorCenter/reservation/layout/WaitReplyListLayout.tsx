import { useState } from 'react';
import dayjs from 'dayjs';
import { getCookie } from 'cookies-next';
import { IButton } from '@/common/components/IButton';
import { ICounselorWaitReplyProps } from '@/types/interface';
import { useCounselorAcceptOrderPostMutation } from '@/common/redux/service/counselorReservation';
import CustomAlert from '@/common/helpers/customAlert';
import { Modal } from 'antd';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import { useDispatch } from 'react-redux';
import { loadingStatus } from '@/common/redux/feature/loading';
import CounselorChangeTimeModal from '../CounselorChangeTimeModal';

// !這個要想辦法元件化

export default function Appointment({ appointment, refetch }: { appointment: ICounselorWaitReplyProps;refetch:()=>void }) {
  const dispatch = useDispatch();
  const openLoading = useOpenLoading();
  const token = getCookie('auth');
  const [modal, alertModal] = Modal.useModal();
  const { AppointmentId, Field, Time, User } = appointment;
  const convertTime = dayjs(Time).format('HH:mm');
  const convertDate = dayjs(Time).format('YYYY / MM / DD');
  const [CounselorAcceptOrderPost] = useCounselorAcceptOrderPostMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // ====================== 接受預約 API ======================
  const handleAcceptOrderPost = async () => {
    openLoading();
    const res = await CounselorAcceptOrderPost({
      token,
      AppointmentId,
    });
    if ('error' in res) {
      dispatch(loadingStatus('none'));
      console.log('🚀 ~ file: LogInForm.tsx:33 ~ userLoginPost ~ res:', res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      CustomAlert({ modal, Message, type: 'error' });
      return;
    }
    const { Message } = res.data as { Message: string };
    dispatch(loadingStatus('none'));
    CustomAlert({ modal, Message, type: 'success' });
    refetch();
  };

  return (
    <li key={AppointmentId} className="flex  items-center space-x-10 rounded-lg bg-white py-5 px-4 text-sm text-gray-900 lg:space-x-0 lg:text-center lg:text-base">
      <div className="lg:w-[16.5271%] lg:pl-[64px] lg:text-left">{User}</div>

      <div className="lg:w-[16.3179%]">{Field}</div>

      <div className="lg:w-[20.3974%]">{convertDate}</div>

      <div className="lg:w-[13.9121%]">{convertTime}</div>

      <div className=" flex space-x-2 text-xs lg:w-[32.8451%] lg:space-x-3 lg:pl-[46px] lg:text-left lg:text-sm">
        <IButton text="我想更改時段" px="px-4 lg:px-5" py="py-1 lg:py-2" fontSize="text-secondary font-bold " onClick={showModal} />
        <IButton text="接受" px="px-4 lg:px-5" py="py-1 lg:py-2" fontSize="text-secondary font-bold " onClick={handleAcceptOrderPost} />
      </div>

      <CounselorChangeTimeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} AppointmentId={AppointmentId} />
      <div id="customAlert" className="alert">{alertModal}</div>
    </li>
  );
}
