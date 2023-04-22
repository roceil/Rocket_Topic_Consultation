import { useState } from 'react';
import { Input, Modal } from 'antd';
import { getCookie } from 'cookies-next';
import { useCounselorChangeOrderPostMutation } from '@/common/redux/service/counselorReservation';
import CustomAlert from '@/common/helpers/customAlert';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import { useDispatch } from 'react-redux';
import { loadingStatus } from '@/common/redux/feature/loading';

export default function CounselorChangeTimeModal({ isModalOpen, setIsModalOpen, AppointmentId }: { isModalOpen: boolean; setIsModalOpen: (value: boolean) => void, AppointmentId:number }) {
  const dispatch = useDispatch();
  const openLoading = useOpenLoading();
  const { TextArea } = Input;
  const [modal, alertModal] = Modal.useModal();
  const token = getCookie('auth');
  const [CounselorChangeOrderPost] = useCounselorChangeOrderPostMutation();

  const [value, setValue] = useState('');

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ====================== 更改預約 API ======================
  const handleCounselorChangeOrderPost = async () => {
    if (value === '') {
      dispatch(loadingStatus('none'));
      CustomAlert({ modal, Message: '請輸入更改原因', type: 'error' });
      return;
    }
    const res = await CounselorChangeOrderPost({
      token,
      AppointmentId,
      Reason: value,
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
    CustomAlert({ modal, Message, type: 'success', contentKeyWord: '關閉' });
  };
  const handleOk = () => {
    openLoading();
    setIsModalOpen(false);
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
      <div id="customAlert" className="alert">{alertModal}</div>
    </Modal>
  );
}
