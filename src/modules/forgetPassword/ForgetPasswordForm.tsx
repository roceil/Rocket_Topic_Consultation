import { useDispatch } from 'react-redux';
import { Button, ConfigProvider, Form, Input } from 'antd';
import { useForgetPasswordPostApiMutation } from '@/common/redux/service/forgetPassword';
import { loadingStatus } from '@/common/redux/feature/loading';
import FormSubmitBtn from '@/common/components/form/FormSubmitBtn';

export default function ForgetPasswordForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [forgetPasswordPostApi] = useForgetPasswordPostApiMutation();

  // ==================== 送出表單 API ====================
  const forgerPasswordPost = async (Account: string) => {
    const res = await forgetPasswordPostApi({ Account });
    if ('error' in res) {
      console.log('🚀 ~ file: ForgetPasswordForm.tsx:18 ~ forgerPasswordPost ~ res:', res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      dispatch(loadingStatus('none'));
      alert(Message);
      return;
    }
    const { Message } = res.data as { Message: string };
    dispatch(loadingStatus('none'));
    alert(Message);
    console.log(Message);
  };

  // ==================== 送出表單函式 ====================
  const onFinish = ({ Account }: { Account: string }) => {
    dispatch(loadingStatus('isLoading'));
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
          <div className="flex items-center resend">
            <p>未收到信件？</p>
            <Button htmlType="submit" className="ml-2 !border-b border-none border-red-500 shadow-none p-0">
              重新發送
            </Button>
          </div>
        </Form.Item>

        {/* 發送密碼重設信 */}
        <FormSubmitBtn text="發送密碼重設信" extraStyle={{ marginTop: '-11px' }} />
      </Form>
    </ConfigProvider>
  );
}
