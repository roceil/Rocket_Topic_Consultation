import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

export default function ProjectInfoModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 檢查是否已經顯示過這個提示
    const hasShownInfo = sessionStorage.getItem('hasShownProjectInfo');

    if (!hasShownInfo) {
      // 延遲 1 秒顯示，讓頁面完全載入
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
    return () => null;
  }, []);

  const handleOk = () => {
    // 記錄用戶已經看過這個提示
    sessionStorage.setItem('hasShownProjectInfo', 'true');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    // 記錄用戶已經看過這個提示
    sessionStorage.setItem('hasShownProjectInfo', 'true');
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={(
        <div className="flex items-center space-x-2">
          <InfoCircleOutlined className="text-blue-500" />
          <span className="text-lg font-bold text-secondary">專題作品說明</span>
        </div>
      )}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="我知道了"
      cancelText="關閉"
      centered
      className="project-info-modal"
      width={480}
    >
      <div className="py-4">
        <div className="mb-4 text-center">
          <div className="mb-3">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="mb-2 text-xl font-bold text-secondary">
            歡迎來到拍拍心理諮商平台
          </h3>
        </div>

        <div className="space-y-3 text-gray-700">
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-center font-medium text-blue-800">
              此網站是火箭隊第11梯學員的專題作品
            </p>
          </div>

          <div className="text-sm">
            <p className="mb-2">
              <strong>作品特色：</strong>
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>線上心理諮商預約系統</li>
              <li>即時聊天功能</li>
              <li>首頁海浪效果</li>
              <li>金流串接與預約管理</li>
              <li>絕對不是詐騙的再三保證</li>
            </ul>
          </div>

          <div className="mt-4 rounded-lg bg-yellow-50 p-3">
            <p className="text-xs text-gray-600">
              本平台僅供展示與學習用途，請勿輸入真實個人敏感資料
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
