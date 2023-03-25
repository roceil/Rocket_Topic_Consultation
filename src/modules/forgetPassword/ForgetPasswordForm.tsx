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
  const forgerPasswordPost = async (Email: string) => {
    const res = await forgetPasswordPostApi({ Email });
    if ('error' in res) {
      console.log(res);
      return;
    }
    const { Message } = res.data as { Message: string };
    alert(Message);
    console.log(Message);
  };

  // 表單送出函式
  const onFinish = ({ Email }: { Email: string }) => {
    forgerPasswordPost(Email);
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
            colorTextDisabled: '#fff',
          },
        },
      }}
    >
      <Form
        layout="vertical"
        form={form}
        name="forgetPassword"
        onFinish={onFinish}
        labelAlign="left"
      >
        {/* 信箱 */}
        <Form.Item
          name="Email"
          label="信箱 Email Address"
          rules={[
            {
              required: true,
              message: '請輸入信箱',
            },
          ]}
        >
          <div>
            <Input placeholder="Email address" className="formInput" />
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
