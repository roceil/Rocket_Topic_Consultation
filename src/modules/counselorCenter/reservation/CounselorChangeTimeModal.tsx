import { useState } from 'react';
import { Input, Modal } from 'antd';
import { getCookie } from 'cookies-next';
import { useCounselorChangeOrderPostMutation } from '@/common/redux/service/counselorReservation';

export default function CounselorChangeTimeModal({ isModalOpen, setIsModalOpen, AppointmentId }: { isModalOpen: boolean; setIsModalOpen: (value: boolean) => void, AppointmentId:number }) {
  const { TextArea } = Input;
  const token = getCookie('auth');
  const [CounselorChangeOrderPost] = useCounselorChangeOrderPostMutation();

  const [value, setValue] = useState('');

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ====================== 更改預約 API ======================
  const handleCounselorChangeOrderPost = async () => {
    if (value === '') {
      alert('請輸入更改原因');
      return;
    }
    const res = await CounselorChangeOrderPost({
      token,
      AppointmentId,
      Reason: value,
    });
    if ('error' in res) {
      console.log('🚀 ~ file: LogInForm.tsx:33 ~ userLoginPost ~ res:', res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      alert(Message);
      return;
    }
    const { Message } = res.data as { Message: string };
    alert(Message);
  };
  const handleOk = () => {
    // setIsModalOpen(false);
    handleCounselorChangeOrderPost();
  };

  return (
    <Modal title={<p className="text-gray-900 font-bold mb-2">請說明更改原因</p>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} closable={false} centered okText="送出" cancelText="返回">
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="寫下更改時間的原因"
        autoSize={{
          minRows: 5,
          maxRows: 10,
        }}
        className="border-none bg-gray-200 p-3 focus:shadow-none active:shadow-none text-gray-900"
      />
      <p className="text-xs text-gray-900 mt-2 mb-3">* 系統會將此訊息傳送給個案，送出後可至聊天室確認</p>
    </Modal>
  );
}
