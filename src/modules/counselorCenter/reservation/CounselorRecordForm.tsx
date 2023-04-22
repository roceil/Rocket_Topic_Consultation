import { useState } from 'react';
import { Input, Modal } from 'antd';
import dayjs from 'dayjs';
import { IRecordRenderData } from '@/types/interface';

export default function CounselorRecordForm({ isModalOpen, setIsModalOpen, renderData }:{ isModalOpen: boolean, setIsModalOpen: (value: boolean) => void, renderData:IRecordRenderData | object }) {
  const { TextArea } = Input;

  // ==================== 諮商記錄輸入框 ====================
  const [value, setValue] = useState('');

  // ==================== 解構表單元素 ====================
  const { AppointmentDate, AppointmentId, CounsellingRecord, Field, LastRecordDate, Name, RecordDate } = renderData as IRecordRenderData;

  //= =================== 轉換時間格式 ====================
  function formatDate(originDate: string) {
    const date = dayjs(originDate, 'YYYY/M/D');
    return date.format('YYYY / MM / DD');
  }
  const AppointmentDateFormate = formatDate(AppointmentDate);
  const LastRecordDateFormate = formatDate(LastRecordDate);
  const RecordDateFormate = formatDate(RecordDate);

  // ==================== Modal 開關 ====================
  const handleOk = () => {
    setIsModalOpen(false);
    console.log('AppointmentId', AppointmentId);
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
              <span>{Name}</span>
            </li>
            <li className="flex space-x-3">
              <span className="font-bold">諮商議題：</span>
              <span>{Field}</span>
            </li>
            <li className="flex space-x-3">
              <span className="font-bold">諮商日期：</span>
              <span>{AppointmentDateFormate}</span>
            </li>
            <li className="flex space-x-3">
              <span className="font-bold">記錄日期：</span>
              <span>{RecordDateFormate}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-secondary mb-2 font-bold">諮商記錄</p>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={CounsellingRecord || '請輸入諮商記錄'}
            autoSize={{
              minRows: 14,
              maxRows: 28,
            }}
            className="bg-gray-200 rounded-lg border-none focus:shadow-none mb-2 p-3"
          />
          <p>{`上次修改日期｜${LastRecordDateFormate}`}</p>
        </div>
      </div>
    </Modal>
  );
}
