import { Input, Modal, Rate } from 'antd';
import { getCookie } from 'cookies-next';
import { IRateModalProps } from '@/types/interface';
import customAlert from '@/common/helpers/customAlert';
import { useReservationRatePostMutation } from '@/common/redux/service/userCenter';

export default function RateModal({ isModalOpen, setIsModalOpen, comment, AppointmentId, rate: rateLevel, setRateLevel, setComment, refetch }: IRateModalProps) {
  const { TextArea } = Input;
  const token = getCookie('auth');
  const [modal, alertModal] = Modal.useModal();

  // =================== 撰寫流言  ===================
  const editComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // ==================== 更改評分 ====================
  const changeRate = (value: number) => {
    setRateLevel(value);
  };

  // ==================== 關閉評分 Modal => 確認 ====================
  const [reservationRatePost] = useReservationRatePostMutation();
  const handleOk = async () => {
    if (rateLevel === 0) {
      customAlert({ modal, Message: '請選擇評分', type: 'error' });
      return;
    }
    const res = await reservationRatePost({
      token,
      AppointmentId,
      Comment: comment,
      Star: rateLevel,
    });

    if ('error' in res) {
      console.log('🚀 ~ file: RateModal.tsx:33 ~ userLoginPost ~ res:', res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      customAlert({ modal, Message, type: 'error' });
      return;
    }
    const { Message } = res.data as { Message: string };
    customAlert({ modal, Message, type: 'success', contentKeyWord: '關閉' });
    setIsModalOpen(false);
    refetch();
  };

  // ==================== 關閉評分 Modal => 取消 ====================
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={(
          <div className="flex items-center space-x-3">
            <p className="mt-1 text-base font-bold text-secondary">
              您的評分
              <span className="text-red-400 ml-1">*</span>
            </p>
            <Rate value={rateLevel || 5} onChange={changeRate} />
          </div>
      )}
        open={isModalOpen}
        onOk={handleOk}
        okText="送出"
        onCancel={handleCancel}
        cancelText="返回"
        centered
        className="rateModal"
      >
        <div className="mt-3">
          <p className="mb-2 font-bold text-secondary">您的評價</p>
          <TextArea
            value={comment}
            onChange={editComment}
            placeholder="寫下這次晤談的收穫或感想吧！"
            autoSize={{
              minRows: 8,
              maxRows: 20,
            }}
            className="rounded-lg border-none bg-gray-200 p-3 placeholder:text-gray-600 focus:shadow-none"
          />
        </div>
      </Modal>

      <div className="alert">{alertModal}</div>
    </>
  );
}
