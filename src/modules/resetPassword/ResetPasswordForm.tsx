import { ConfigProvider, Form } from 'antd';
import { useResetPasswordPostApiMutation } from '@/common/redux/service/resetPassword';
import FormPasswordInput from '@/common/components/form/FormPasswordInput';
import FormConfirmPasswordInput from '@/common/components/form/FormConfirmPasswordInput';
import FormSubmitBtn from '@/common/components/form/FormSubmitBtn';

export default function ResetPasswordForm() {
  const [form] = Form.useForm();
  const [resetPasswordPostApi] = useResetPasswordPostApiMutation();

  // 重設密碼API 函式
  const resetPasswordPost = async (Password: string) => {
    const res = await resetPasswordPostApi({ Password });
    if ('error' in res) {
      console.log(res);
      return;
    }
    const { Message } = res.data as { Message: string };
    alert(Message);
    console.log(Message);
  };

  // 表單送出函式
  const onFinish = ({ Password }: { Password: string }) => {
    resetPasswordPost(Password);
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
      <Form
        layout="vertical"
        form={form}
        name="register-counselor"
        onFinish={onFinish}
        labelAlign="left"
      >
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
      </Form>
    </ConfigProvider>
  );
}
