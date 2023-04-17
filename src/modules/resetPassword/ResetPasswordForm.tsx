import { useRouter } from 'next/router';
import { ConfigProvider, Form, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useResetPasswordPostApiMutation } from '@/common/redux/service/resetPassword';
import { loadingStatus } from '@/common/redux/feature/loading';
import FormPasswordInput from '@/common/components/form/FormPasswordInput';
import FormConfirmPasswordInput from '@/common/components/form/FormConfirmPasswordInput';
import FormSubmitBtn from '@/common/components/form/FormSubmitBtn';
import customAlert from '@/common/helpers/customAlert';

export default function ResetPasswordForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const [modal, alertModal] = Modal.useModal();
  const [resetPasswordPostApi] = useResetPasswordPostApiMutation();

  // ==================== 取得路由的 GUID ====================
  const { guid } = router.query;

  // ==================== 重設密碼 API ====================
  const resetPasswordPost = async (Guid: string | string[] | undefined, Password: string, ConfirmPassword: string) => {
    const res = await resetPasswordPostApi({
      Guid,
      Password,
      ConfirmPassword,
    });
    if ('error' in res) {
      console.log('🚀 ~ file: ResetPasswordForm.tsx:24 ~ resetPasswordPost ~ res:', res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      dispatch(loadingStatus('none'));
      customAlert({ modal, Message, type: 'error' });
      return;
    }

    const { Message } = res.data as { Message: string };
    customAlert({ modal, Message: `${Message}，請重新登入`, type: 'success', router, link: '/login' });
  };

  // 表單送出函式
  const onFinish = ({ Password, ConfirmPassword }: { Password: string; ConfirmPassword: string }) => {
    dispatch(loadingStatus('isLoading'));
    resetPasswordPost(guid, Password, ConfirmPassword);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextPlaceholder: '#4A5364',
          colorText: '#4A5364',
          colorBorder: '#4A5364',
          colorPrimaryBorderHover: '#4A5364',
          colorPrimaryHover: '#4A5364',
          colorPrimaryActive: '#4A5364',
        },
      }}
    >
      <Form layout="vertical" form={form} name="register-counselor" onFinish={onFinish} labelAlign="left">
        {/* 新密碼 */}
        <FormPasswordInput
          needLink={false}
          label="輸入新密碼 Password"
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

        {/* 再次輸入新密碼 */}
        <FormConfirmPasswordInput />

        {/* 重設密碼按鈕 */}
        <FormSubmitBtn text="重設密碼" extraStyle={{ marginTop: '60px' }} />
        <div className="alert">{alertModal}</div>
      </Form>
    </ConfigProvider>
  );
}
