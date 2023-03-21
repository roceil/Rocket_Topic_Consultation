/* eslint-disable import/extensions */
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Form, Input, Space,
} from 'antd';
import { useUserLoginPostApiMutation } from '@/src/common/redux/service/login';

const inputStyle = 'py-3 px-5 rounded-[24px]';

function LogInForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userLoginPostApi] = useUserLoginPostApiMutation();
  const { value } = useSelector((state: { loginTabs: { value: string } }) => state.loginTabs);

  const loginPost = async (email: string, password: string) => {
    const res = await userLoginPostApi({
      email,
      password,
    });
    console.log(res);
  };
  const [form] = Form.useForm();

  const onFinish = ({ email, password }: { email: string; password: string }) => {
    if (value === '用戶') {
      loginPost(email, password);
    } else if (value === '諮商師') {
      console.log(123);
    }
  };
  return (
    <Form
      layout="vertical"
      form={form}
      name="logIn"
      onFinish={onFinish}
      className="space-y-8"
      labelAlign="left"
    >
      <Form.Item
        name="email"
        label="帳號 Account"
        rules={[{ required: true, message: '請輸入帳號' }]}
      >
        <Input placeholder="Email address" className={inputStyle} />
      </Form.Item>

      <Form.Item
        name="password"
        label="密碼 Password"
        rules={[{ required: true, message: '請輸入密碼' }]}
      >
        <Space className="block">
          <Input.Password
            placeholder="Password"
            className={inputStyle}
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
          <Link
            href="/ForgetPassword"
            className="absolute right-0 flex justify-end underline underline-offset-2"
          >
            忘記密碼？
          </Link>
        </Space>
      </Form.Item>

      <Form.Item className="pt-24">
        <div className="flex items-center justify-end">
          <p>尚未成為會員？</p>
          <Link href="/SignIn">
            <p className="ml-2 underline underline-offset-2 ">立即註冊</p>
          </Link>
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          shape="round"
          htmlType="submit"
          className="-mt-8 h-[56px] w-[380px] bg-[#D4D2E3] text-base text-white shadow-none"
        >
          登入
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LogInForm;