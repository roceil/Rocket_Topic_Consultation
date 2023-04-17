import { Input, Modal, Rate } from 'antd';
import { useState } from 'react';

export default function RateModal({ isModalOpen, setIsModalOpen, comment }: any) {
  const { TextArea } = Input;

  // =================== 留言的 input 的值 ===================
  const [commentValue, setCommentValue] = useState('');

  // =================== 撰寫流言  ===================
  const editComment = (e:{ target:{ value:string } }) => {
    setCommentValue(e.target.value);
  };

  // =================== 評分的星星 ===================
  const [rateLevel, setRateLevel] = useState(5);

  // ==================== 更改評分 ====================
  const changeRate = (value: number) => {
    setRateLevel(value);
  };

  // ==================== 關閉評分 Modal => 確認 ====================
  const handleOk = () => {
    // setIsModalOpen(false);
    console.log('評價文字', commentValue);
    console.log('評價星星', rateLevel);
    setCommentValue('');
  };

  // ==================== 關閉評分 Modal => 取消 ====================
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={(
        <div className="flex items-center space-x-3">
          <p className="mt-1 text-base font-bold text-secondary">預約時段</p>
          <Rate value={rateLevel} onChange={changeRate} />
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
          placeholder={comment}
          autoSize={{
            minRows: 8,
            maxRows: 20,
          }}
          className="rounded-lg border-none bg-gray-200 p-3 placeholder:text-gray-600 focus:shadow-none"
        />
      </div>
    </Modal>
  );
}
