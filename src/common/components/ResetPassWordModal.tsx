import { useState } from 'react';
import { Form, Modal } from 'antd';
import { getCookie } from 'cookies-next';
import FormConfirmPasswordInput from '@/common/components/form/FormConfirmPasswordInput';
import FormPasswordInput from '@/common/components/form/FormPasswordInput';
import FormSubmitBtn from '@/common/components/form/FormSubmitBtn';
import { IResetPasswordModalProps } from '@/types/interface';
import { useResetPasswordModalPostMutation } from '../redux/service/resetPassword';

export default function ResetPassWordModal({ showResetPassword, setShowResetPassword }: IResetPasswordModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [resetPasswordModalPost] = useResetPasswordModalPostMutation();
  const token = getCookie('auth');

  // 送出表單函式
  const handleOk = async ({ Password, ConfirmPassword }: { Password: string; ConfirmPassword: string }) => {
    const res = await resetPasswordModalPost({
      Password,
      ConfirmPassword,
      token,
    });

    // 攔截錯誤訊息
    if ('error' in res) {
      console.log('🚀 ~ file: ResetPassWordModal.tsx:23 ~ handleOk ~ res:', res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      alert(Message);
      return;
    }
    const { Message } = res.data as { Message: string };
    alert(Message);

    setShowResetPassword(false);
    setConfirmLoading(false);
  };

  // 關閉modal函式
  const handleCancel = () => {
    setShowResetPassword(false);
  };

  return (
    <Modal
      centered
      title="重設密碼"
      cancelText="取消"
      open={showResetPassword}
      confirmLoading={confirmLoading}
      footer={false}
      onCancel={handleCancel}
      className="modalResetPassword"
    >
      <Form onFinish={handleOk} layout="vertical" className="mt-5">
        <FormPasswordInput
          needLink={false}
          extraRules={[
            {
              min: 8,
              message: '密碼須為 8 個字元以上',
            },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: '須包含大小寫英文字母及數字',
            },
          ]}
        />
        <FormConfirmPasswordInput />
        <FormSubmitBtn
          text="送出"
          extraStyle={{
            marginTop: '20px',
          }}
        />
      </Form>
    </Modal>
  );
}
