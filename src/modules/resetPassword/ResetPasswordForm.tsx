import { ConfigProvider, Button, Form, Input } from 'antd';
import { useResetPasswordPostApiMutation } from '../../common/redux/service/resetPassword';

export default function ResetPasswordForm() {
  const [form] = Form.useForm();
  const [resetPasswordPostApi] = useResetPasswordPostApiMutation();

  // 重設密碼API 函式
  const resetPasswordPost = async (password: string) => {
    const res = await resetPasswordPostApi({ password });
    if ('error' in res) {
      console.log(res);
      return;
    }
    const { Message } = res.data as { Message: string };
    alert(Message);
    console.log(Message);
  };

  // 表單送出函式
  const onFinish = ({ password }: { password: string }) => {
    resetPasswordPost(password);
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextPlaceholder: '#5D5A88',
          colorText: '#5D5A88',
          colorBorder: '#D4D2E3',
          colorIcon: '#5D5A88',
        },
        components: {
          Button: {
            colorPrimaryHover: '#5D5A88',
            colorPrimaryActive: '#5D5A88',
            colorText: '#5D5A88',
            colorTextDisabled: '#fff',
          },
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
        <Form.Item
          name="password"
          label="輸入新密碼 Password"
          rules={[
            {
              required: true,
              message: '請輸入密碼',
            },
            {
              min: 8,
              message: '密碼須為 8 個字元以上',
            },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: '須包含大小寫英文字母及數字',
            },
          ]}
        >
          <Input.Password placeholder="Password" className="formInput" />
        </Form.Item>

        {/* 再次輸入新密碼 */}
        <Form.Item
          name="confirm"
          label="再次輸入新密碼 Confirm password"
          className="mt-8"
          dependencies={['password']}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('與輸入的密碼不相符，請重新輸入'));
              },
            }),
            {
              required: true,
              message: '請再次輸入密碼',
            },
          ]}
        >
          <Input.Password placeholder="Confirm password" className="formInput" />
        </Form.Item>

        {/* 重設密碼按鈕 */}
        <Form.Item className="mt-[84px]">
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            className=" h-[56px] w-full bg-secondary text-base text-white shadow-none"
          >
            重設密碼
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}
