import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Form } from 'antd';
import {
  useUserLoginPostApiMutation,
  useCounselorLoginPostApiMutation,
} from '@/common/redux/service/login';
import FormSubmitBtn from '@/common/components/FormSubmitBtn';
import FormPasswordInput from '@/common/components/FormPasswordInput';
import FormAccountInput from '@/common/components/FormAccountInput';

function LogInForm() {
  const [form] = Form.useForm();

  const [userLoginPostApi] = useUserLoginPostApiMutation();
  const [counselorLoginPostApi] = useCounselorLoginPostApiMutation();
  const { value } = useSelector((state: { loginTabs: { value: string } }) => state.loginTabs);

  // 使用者登入函式
  const userLoginPost = async (Email: string, Password: string) => {
    const res = await userLoginPostApi({
      Email,
      Password,
    });
    if ('error' in res) {
      console.log(res);
      return;
    }
    const { Message } = res.data as { Message: string };
    alert(Message);
    console.log(res);
  };

  // 諮商師登入函式
  const counselorLoginPost = async (Email: string, Password: string) => {
    const res = await counselorLoginPostApi({
      Email,
      Password,
    });
    if ('error' in res) {
      console.log(res);
      return;
    }
    const { Message } = res.data as { Message: string };
    alert(Message);
    console.log(res);
  };

  // 表單送出函式
  const onFinish = ({ Email, Password }: { Email: string; Password: string }) => {
    if (value === '用戶') {
      userLoginPost(Email, Password);
    } else if (value === '諮商師') {
      counselorLoginPost(Email, Password);
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="logIn"
      onFinish={onFinish}
      className="space-y-8 px-4"
      labelAlign="left"
    >
      <FormAccountInput />

      <FormPasswordInput needLink />

      <Form.Item className="pt-24">
        <div className="flex items-center justify-end">
          <p>尚未成為會員？</p>
          <Link href="/signup">
            <p className="ml-2 underline underline-offset-2 ">立即註冊</p>
          </Link>
        </div>
      </Form.Item>

      <FormSubmitBtn text="登入" />
    </Form>
  );
}

export default LogInForm;
