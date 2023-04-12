import { ConfigProvider, Form, Input } from 'antd';
import { useForgetPasswordPostApiMutation } from '@/common/redux/service/forgetPassword';
import FormSubmitBtn from '@/common/components/form/FormSubmitBtn';

export default function ForgetPasswordForm() {
  const [form] = Form.useForm();
  const [forgetPasswordPostApi] = useForgetPasswordPostApiMutation();

  // 重新發送函式
  const resendEmail = () => {
    alert('Email已重新發送');
  };

  // 重設密碼API 函式
  const forgerPasswordPost = async (Account: string) => {
    const res = await forgetPasswordPostApi({ Account });
    if ('error' in res) {
      console.log('🚀 ~ file: ForgetPasswordForm.tsx:18 ~ forgerPasswordPost ~ res:', res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      alert(Message);
      return;
    }
    const { Message } = res.data as { Message: string };
    alert(Message);
    console.log(Message);
  };

  // 表單送出函式
  const onFinish = ({ Account }: { Account: string }) => {
    forgerPasswordPost(Account);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimaryHover: '#4A5364',
            colorPrimaryActive: '#4A5364',
          },
        },
      }}
    >
      <Form layout="vertical" form={form} name="forgetPassword" onFinish={onFinish} labelAlign="left">
        {/* 信箱 */}
        <Form.Item
          name="Account"
          label="信箱 Email Address"
          rules={[
            {
              required: true,
              message: '請輸入信箱',
            },
            {
              pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: '請輸入正確的信箱格式',
            },
          ]}
        >
          <div>
            <Input placeholder="Email address" className="formInput border-secondary !shadow-none hover:border-secondary focus:border-secondary" />
            <p className="absolute right-0">請輸入註冊時使用的信箱</p>
          </div>
        </Form.Item>

        {/* 重新發送 */}
        <Form.Item className="pt-[84px]">
          <div className="flex items-center">
            <p>未收到信件？</p>
            <button type="button" onClick={resendEmail} className="ml-2 underline">
              重新發送
            </button>
          </div>
        </Form.Item>

        {/* 發送密碼重設信 */}
        <FormSubmitBtn text="發送密碼重設信" extraStyle={{ marginTop: '-11px' }} />
      </Form>
    </ConfigProvider>
  );
}
