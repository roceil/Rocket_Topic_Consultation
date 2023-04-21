import { useState } from 'react';
import { Input, Modal, Rate } from 'antd';
import { getCookie } from 'cookies-next';
import { IRateModalProps } from '@/types/interface';
import customAlert from '@/common/helpers/customAlert';
import { useReservationRatePostMutation } from '@/common/redux/service/userCenter';

export default function RateModal({ isModalOpen, setIsModalOpen, comment, AppointmentId, rate: rateLevel, setRateLevel, setComment }: IRateModalProps) {
  const { TextArea } = Input;
  const token = getCookie('auth');
  const [modal, alertModal] = Modal.useModal();

  // =================== 留言的 input 的值 ===================
  // commentValue是為了要讓後端傳值回來時，input還是可以顯示placeholder狀態
  const [commentValue, setCommentValue] = useState('');

  // =================== 撰寫流言  ===================
  const editComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
    // 這邊設回去是為了讓留言的input的值跟comment的值一樣
    setComment(e.target.value);
  };

  // ==================== 更改評分 ====================
  const changeRate = (value: number) => {
    setRateLevel(value);
  };

  // ==================== 關閉評分 Modal => 確認 ====================
  const [reservationRatePost] = useReservationRatePostMutation();
  const handleOk = async () => {
    const res = await reservationRatePost({
      token,
      AppointmentId,
      Comment: commentValue,
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
    customAlert({ modal, Message, type: 'success' });
    setIsModalOpen(false);
    setCommentValue('');
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
            <p className="mt-1 text-base font-bold text-secondary">預約時段</p>
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
            value={commentValue}
            onChange={editComment}
            placeholder={comment || '寫下這次晤談的收穫或感想吧！'}
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
