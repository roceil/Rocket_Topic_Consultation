/* eslint-disable import/no-extraneous-dependencies */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { setCookie } from 'cookies-next';
import { Form } from 'antd';
import { useUserLoginPostApiMutation, useCounselorLoginPostApiMutation } from '@/common/redux/service/login';
import FormSubmitBtn from '@/common/components/form/FormSubmitBtn';
import FormPasswordInput from '@/common/components/form/FormPasswordInput';
import FormAccountInput from '@/common/components/form/FormAccountInput';

interface IUserLoginRes {
  Message: string;
  Authorization: string;
  Identity: string;
  UserID: string;
}

function LogInForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [userLoginPostApi] = useUserLoginPostApiMutation();
  const [counselorLoginPostApi] = useCounselorLoginPostApiMutation();
  const { value } = useSelector((state: { loginTabs: { value: string } }) => state.loginTabs);

  // 使用者登入函式
  const userLoginPost = async (Account: string, Password: string) => {
    const res = await userLoginPostApi({
      Account,
      Password,
    });
    console.log('🚀 ~ file: LogInForm.tsx:27 ~ userLoginPost ~ res:', res);
    if ('error' in res) {
      console.log(res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      alert(Message);
      return;
    }
    const { Message } = res.data as { Message: string };
    const { Authorization, Identity, UserID } = res.data.Data as IUserLoginRes;
    alert(Message);
    setCookie('auth', decodeURIComponent(`Bearer ${Authorization}`), { maxAge: 60 * 60 * 24 * 14 });
    setCookie('identity', decodeURIComponent(Identity), { maxAge: 60 * 60 * 24 * 14 });
    setCookie('userID', decodeURIComponent(UserID), { maxAge: 60 * 60 * 24 * 14 });
    router.push('/');
  };

  // 諮商師登入函式
  const counselorLoginPost = async (Account: string, Password: string) => {
    const res = await counselorLoginPostApi({
      Account,
      Password,
    });
    if ('error' in res) {
      console.log(res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      alert(Message);
      return;
    }
    const { Message } = res.data as { Message: string };
    const { Authorization, Identity, UserID } = res.data.Data as IUserLoginRes;
    alert(Message);
    setCookie('auth', decodeURIComponent(`Bearer ${Authorization}`), { maxAge: 60 * 60 * 24 * 14 });
    setCookie('identity', decodeURIComponent(Identity), { maxAge: 60 * 60 * 24 * 14 });
    setCookie('userID', decodeURIComponent(UserID), { maxAge: 60 * 60 * 24 * 14 });
    router.push('/');
  };

  // 表單送出函式
  const onFinish = ({ Account, Password }: { Account: string; Password: string }) => {
    if (value === '用戶') {
      userLoginPost(Account, Password);
    } else if (value === '諮商師') {
      counselorLoginPost(Account, Password);
    }
  };

  return (
    <Form layout="vertical" form={form} name="logIn" onFinish={onFinish} className="space-y-8 px-4" labelAlign="left">
      <FormAccountInput />

      <FormPasswordInput needLink label="密碼 Password" />

      <Form.Item className="pt-24">
        <div className="flex items-center justify-end">
          <p>尚未成為會員？</p>
          <Link href="/signup" className="hover:text-secondary hover:opacity-50 ">
            <p className="ml-2 underline underline-offset-2">立即註冊</p>
          </Link>
        </div>
      </Form.Item>

      <FormSubmitBtn text="登入" />
    </Form>
  );
}

export default LogInForm;
