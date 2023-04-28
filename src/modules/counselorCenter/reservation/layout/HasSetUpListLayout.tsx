import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getCookie } from 'cookies-next';
import { IButton } from '@/common/components/IButton';
import { useCounselorCaseRecordPostMutation } from '@/common/redux/service/counselorReservation';
import CaseRecordModal from '../CaseRecordModal';

export interface ICounselorAppointment {
  AppointmentId: number;
  Field: string;
  OrderId: number;
  Time: string;
  User: string;
}

// !這個要想辦法元件化

export function Appointment({ appointment }: { appointment: ICounselorAppointment }) {
  const token = getCookie('auth');
  const { AppointmentId, Field, Time, User } = appointment;
  const convertTime = dayjs(Time).format('HH:mm');
  const convertDate = dayjs(Time).format('YYYY / MM / DD');
  const [CounselorCaseRecordPost] = useCounselorCaseRecordPostMutation();

  // ====================== 渲染個案記錄 ======================
  const [caseRenderData, setCaseRenderData] = useState<any>([]);

  // ====================== 個案 Modal 開關 ======================
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const openListModal = () => {
    setIsListModalOpen(true);
  };

  // ====================== 撈取個案記錄 API ======================
  const handleCaseRecordPost = async () => {
    const res = await CounselorCaseRecordPost({
      token,
      User,
    });
    if ('error' in res) {
      console.log('🚀 ~ file: LogInForm.tsx:33 ~ userLoginPost ~ res:', res);
      return;
    }
    if (res.data.Data === null) return;
    console.log(res.data.Data);

    const { appointmentLogsList } = res.data.Data;
    setCaseRenderData(appointmentLogsList);
  };

  // ====================== 監聽 modal 是否開啟並傳入姓名 ======================
  useEffect(() => {
    if (!isListModalOpen) {
      // 如果彈窗關閉，解除視窗鎖定
      document.body.style.overflow = 'auto';
      return;
    }
    handleCaseRecordPost();
    // 如果彈窗打開，鎖住視窗
    document.body.style.overflow = 'hidden';
  }, [isListModalOpen]);

  return (
    <li key={AppointmentId} className="flex items-center rounded-lg bg-white py-5  text-center text-sm text-gray-900 lg:text-base">
      <div className="w-1/5">{User}</div>
      <div className="w-1/5 ">{Field}</div>
      <div className="w-1/5 ">{convertDate}</div>
      <div className="w-1/5">{convertTime}</div>
      <div className="w-1/5">
        <IButton text="查看" px="px-4 lg:px-5" py="py-1 lg:py-2" fontSize="text-secondary font-bold " onClick={openListModal} />
      </div>

      {/* 個案記錄 Modal */}
      <CaseRecordModal isListModalOpen={isListModalOpen} setIsListModalOpen={setIsListModalOpen} caseRenderData={caseRenderData} />
    </li>
  );
}
