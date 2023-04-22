import { useState } from 'react';
import Image from 'next/image';
import { Modal } from 'antd';
import right from 'public/images/Right.svg';
import { ICaseRenderData, IRecordRenderData } from '@/types/interface';
import { useCounselorCaseFormDataPostMutation } from '@/common/redux/service/counselorReservation';
import { CookieValueTypes } from 'cookies-next';
import CounselorRecordForm from './CounselorRecordForm';

export default function CaseRecordModal({
  isListModalOpen,
  setIsListModalOpen,
  caseRenderData,
  token,
}: {
  isListModalOpen: boolean;
  setIsListModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  caseRenderData: ICaseRenderData[];
  token: CookieValueTypes;
}) {
  const handleListOk = () => {
    setIsListModalOpen(false);
  };

  const handleListCancel = () => {
    setIsListModalOpen(false);
  };

  // ====================== 個案記錄表格 Modal 開關 ======================
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ====================== 個案記錄表格資料 ======================
  const [renderData, setRenderData] = useState < IRecordRenderData | object >({});

  // ====================== 撈取個案記錄表格 API ======================
  const [CounselorCaseFormDataPost] = useCounselorCaseFormDataPostMutation();
  const handleCaseFormDataPost = async (AppointmentId: number) => {
    setIsModalOpen(true);
    const res = await CounselorCaseFormDataPost({
      token,
      AppointmentId,
    });
    if ('error' in res) {
      console.log('🚀 ~ file: LogInForm.tsx:33 ~ userLoginPost ~ res:', res);
      return;
    }
    const { record } = res.data.Data;
    setRenderData(record);
  };

  return (
    <>
      <Modal
        title={(
          <ul className="flex w-full justify-between border-b border-gray-400  pb-5 text-center text-sm font-bold text-gray-700">
            <li className="sm:w-[90px] lg:w-[100px]">個案姓名</li>
            <li className="sm:w-[90px] lg:w-[100px]">諮商議題</li>
            <li className="ml-3 sm:w-[108px] lg:w-[150px]">諮商日期</li>
            <li className="hidden w-[150px] lg:block">紀錄時間</li>
            <li className="w-9 lg:w-[50px]" />
          </ul>
        )}
        open={isListModalOpen}
        onOk={handleListOk}
        onCancel={handleListCancel}
        width={600}
        footer={null}
        centered
      >
        <ul className="mt-5 flex h-[350px] flex-col space-y-4 overflow-y-auto">
          {caseRenderData.map(({ Name, Field, AppointmentDate, AppointmentId, AppointmentTime }: ICaseRenderData) => (
            <li key={AppointmentId}>
              <button onClick={() => handleCaseFormDataPost(AppointmentId)} type="button" className="flex w-full items-center justify-between rounded-lg bg-gray-200 px-3 py-5 text-center text-sm text-gray-900 hover:opacity-60 sm:px-0">
                <div className="font-bold sm:w-[90px] lg:w-[100px]">{Name}</div>
                <div className="sm:w-[90px] lg:w-[100px]">{Field}</div>
                <div className="sm:w-[108px] lg:w-[150px]">{AppointmentDate}</div>
                <div className="hidden lg:block lg:w-[150px]">{AppointmentTime}</div>
                <div className="sm:w-9 lg:w-[50px] ">
                  <Image src={right} alt="right_icon" width={16} height={16} />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Modal>

      <CounselorRecordForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} renderData={renderData} />
    </>
  );
}
