import { useState } from 'react';
import { Form, Modal } from 'antd';
import { getCookie } from 'cookies-next';
import FormConfirmPasswordInput from '@/common/components/form/FormConfirmPasswordInput';
import FormPasswordInput from '@/common/components/form/FormPasswordInput';
import FormSubmitBtn from '@/common/components/form/FormSubmitBtn';
import { useResetPasswordPostApiMutation } from '../redux/service/resetPassword';

export default function ResetPassWordModal({ showResetPassword, setShowResetPassword }: any) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [resetPasswordPostApi] = useResetPasswordPostApiMutation();
  const token = getCookie('auth');

  //! 待修改
  const handleOk = async ({ Password, ConfirmPassword }: { Password: string; ConfirmPassword: string }) => {
    const res = await resetPasswordPostApi({
      Password,
      ConfirmPassword,
      token,
    });
    console.log('🚀 ~ file: ResetPassWordModal.tsx:18 ~ handleOk ~ res:', res);
    if ('error' in res) {
      console.log(res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      alert(Message);
      return;
    }
    const { Message } = res.data as { Message: string };
    alert(Message);

    setTimeout(() => {
      setShowResetPassword(false);
      setConfirmLoading(false);
    }, 2000);
  };
  // 關閉modal函式
  const handleCancel = () => {
    setShowResetPassword(false);
  };
  return (
    <Modal centered title="重設密碼" cancelText="取消" open={showResetPassword} confirmLoading={confirmLoading} footer={false} onCancel={handleCancel} className="modalResetPassword">
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
