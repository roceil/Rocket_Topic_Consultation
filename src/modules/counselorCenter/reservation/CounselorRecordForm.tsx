/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Input, Modal } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { IRecordRenderData } from '@/types/interface';

interface IRenderObj {
  AppointmentDate:string
  AppointmentId:number
  CounsellingRecord:boolean
  Field:string
  LastRecordDate:string
  Name:string
  RecordDate:string
}

export default function CounselorRecordForm({ isModalOpen, setIsModalOpen, renderData, AppointmentId }:{ isModalOpen: boolean, setIsModalOpen: (value: boolean) => void, renderData?:IRecordRenderData | object, AppointmentId:number | null }) {
  const { TextArea } = Input;
  const token = getCookie('auth');

  // ==================== 諮商記錄輸入框 ====================
  const [value, setValue] = useState('');

  // ==================== 諮商記錄 POST ====================
  const [renderObj, setRenderObj] = useState<IRenderObj>();
  const getDetailRecord = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/AppointmentsRecord`,
        { AppointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data.Data.record);
      const { record } = data.Data;
      setRenderObj(record);
    } catch (error) {
      console.log('🚀 ~ file: CounselorRecordForm.tsx:17 ~ getDetailRecord ~ error:', error);
    }
  };
  useEffect(() => {
    if (AppointmentId) {
      getDetailRecord();
    }
  }, [AppointmentId, isModalOpen]);

  // ==================== 諮商記錄 PUT ====================
  const handleSaveRecord = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/UpdateAppointmentsRecord`,
        {
          AppointmentId,
          CounsellingRecord: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data);
      setIsModalOpen(false);
      setValue('');
    } catch (error) {
      console.log('🚀 ~ file: CounselorRecordForm.tsx:17 ~ getDetailRecord ~ error:', error);
    }
  };

  // ==================== 解構表單元素 ====================
  // const { AppointmentDate, AppointmentId, CounsellingRecord, Field, LastRecordDate, Name, RecordDate } = renderData as IRecordRenderData;

  //= =================== 轉換時間格式 ====================
  function formatDate(originDate: string) {
    const date = dayjs(originDate, 'YYYY/M/D');
    return date.format('YYYY / MM / DD');
  }
  const AppointmentDateFormate = () => {
    if (renderObj?.AppointmentDate) {
      return formatDate(renderObj?.AppointmentDate);
    }
    return '';
  };

  const LastRecordDateFormate = () => {
    if (renderObj?.LastRecordDate) {
      return formatDate(renderObj?.LastRecordDate);
    }
    return '';
  };
  const RecordDateFormate = () => {
    if (renderObj?.RecordDate) {
      return formatDate(renderObj?.RecordDate);
    }
    return '';
  };

  // ==================== Modal 開關 ====================
  const handleOk = () => {
    handleSaveRecord();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (

    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600} okText="儲存" cancelText="返回歷史記錄" centered>
      <div className="p-4">
        <div className="mb-8">
          <p className="text-secondary mb-2 font-bold">基本資料</p>
          <ul className="bg-gray-200 rounded-lg px-6 py-4 space-y-3 text-gray-900">
            <li className="flex space-x-3">
              <span className="font-bold">
                個案姓名：
              </span>
              <span>{renderObj?.Name}</span>
            </li>
            <li className="flex space-x-3">
              <span className="font-bold">諮商議題：</span>
              <span>{renderObj?.Field}</span>
            </li>
            <li className="flex space-x-3">
              <span className="font-bold">諮商日期：</span>
              <span>{AppointmentDateFormate()}</span>
            </li>
            <li className="flex space-x-3">
              <span className="font-bold">記錄日期：</span>
              <span>{RecordDateFormate()}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-secondary mb-2 font-bold">諮商記錄</p>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`${renderObj?.CounsellingRecord === null ? '請輸入諮商記錄' : renderObj?.CounsellingRecord}`}
            autoSize={{
              minRows: 14,
              maxRows: 28,
            }}
            className="bg-gray-200 rounded-lg border-none focus:shadow-none mb-2 p-3"
          />

          <p>{`上次修改日期｜${LastRecordDateFormate()}`}</p>
        </div>
      </div>
    </Modal>
  );
}
