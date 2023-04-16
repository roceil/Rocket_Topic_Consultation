import { Modal, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

export default function RateModal({ isModalOpen, setIsModalOpen }: any) {
  // =================== 留言的 input 的值 ===================
  const [commentValue, setCommentValue] = useState('');

  // =================== 評分的星星 ===================
  const [rateLevel, setRateLevel] = useState(5);

  // ==================== 更改評分 ====================
  const changeRate = (value: number) => {
    setRateLevel(value);
  };

  // ==================== 關閉評分 Modal => 確認 ====================
  const handleOk = () => {
    setIsModalOpen(false);
  };

  // ==================== 關閉評分 Modal => 取消 ====================
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={(
        <div className="flex items-center space-x-3">
          <span className="text-base font-bold text-secondary">您的評分</span>
          <Rate value={rateLevel} onChange={changeRate} />
        </div>
      )}
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="mt-4 mb-2 font-bold text-secondary">您的評價</p>

      <TextArea
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        placeholder="寫下這次晤談的收穫或感想吧！"
        autoSize={{
          minRows: 10,
          maxRows: 20,
        }}
        className="rounded-lg bg-gray-200 p-3 placeholder:text-gray-600"
      />
    </Modal>
  );
}
