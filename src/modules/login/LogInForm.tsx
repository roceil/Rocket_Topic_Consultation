import Link from 'next/link';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Input, Space } from 'antd';
import {
  useUserLoginPostApiMutation,
  useCounselorLoginPostApiMutation,
} from '../../common/redux/service/login';

function LogInForm() {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userLoginPostApi] = useUserLoginPostApiMutation();
  const [counselorLoginPostApi] = useCounselorLoginPostApiMutation();
  const { value } = useSelector((state: { loginTabs: { value: string } }) => state.loginTabs);

  const userLoginPost = async (email: string, password: string) => {
    const res = await userLoginPostApi({
      email,
      password,
    });
    if ('error' in res) {
      console.log(res);
      return;
    }
    const { Message } = res.data as { Message: string };
    alert(Message);
    console.log(res);
  };

  const counselorLoginPost = async (email: string, password: string) => {
    const res = await counselorLoginPostApi({
      email,
      password,
    });
    if ('error' in res) {
      console.log(res);
      return;
    }
    const { Message } = res.data as { Message: string };
    alert(Message);
    console.log(res);
  };

  const onFinish = ({ email, password }: { email: string; password: string }) => {
    if (value === '用戶') {
      userLoginPost(email, password);
    } else if (value === '諮商師') {
      counselorLoginPost(email, password);
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
      <Form.Item
        name="email"
        label="帳號 Account"
        rules={[{ required: true, message: '請輸入帳號' }]}
      >
        <Input placeholder="Email address" className="formInput" />
      </Form.Item>

      <Form.Item
        name="password"
        label="密碼 Password"
        rules={[{ required: true, message: '請輸入密碼' }]}
      >
        <Space className="block">
          <Input.Password
            placeholder="Password"
            className="formInput"
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
          <Link
            href="/forgetpassword"
            className="absolute right-0 flex justify-end underline underline-offset-2"
          >
            忘記密碼？
          </Link>
        </Space>
      </Form.Item>

      <Form.Item className="pt-24">
        <div className="flex items-center justify-end">
          <p>尚未成為會員？</p>
          <Link href="/signup">
            <p className="ml-2 underline underline-offset-2 ">立即註冊</p>
          </Link>
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          shape="round"
          htmlType="submit"
          className="-mt-8 h-[56px] w-full bg-[#D4D2E3] text-base text-white shadow-none"
        >
          登入
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LogInForm;
