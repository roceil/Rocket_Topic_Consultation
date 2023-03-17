/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link';
import React, { useState } from 'react';
import {
  ConfigProvider, Tabs, Button,
  Checkbox,
  Form,
  Input,
  TabsProps,
} from 'antd';

type LayoutType = Parameters<typeof Form>[0]['layout'];
const inputStyle = 'py-3 px-5 rounded-[24px]';

function LogInForm() {
  const [form] = Form.useForm();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const formItemLayout = formLayout === 'vertical' ? { labelCol: { span: 24 }, wrapperCol: { offset: 0 } } : null;

  const onFinish = (values:any) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      name="logIn"
      onFinish={onFinish}
      style={{
        maxWidth: 380,
      }}
      className="space-y-8"
      labelAlign="left"
    >
      <Form.Item
        name="email"
        label="帳號 Account"
      >
        <Input placeholder="Email address" className={inputStyle} />
      </Form.Item>

      <Form.Item
        name="password"
        label="密碼 Password"
        hasFeedback
      >
        <div>
          <Input placeholder="Password" className={inputStyle} />
          <Link href="/ForgetPassword" className="flex justify-end underline underline-offset-2 ">
            忘記密碼？
          </Link>
        </div>
      </Form.Item>
      {/* 推底下間距 */}
      <div className="h-12" />
      <div className="flex justify-between items-end">
        <Form.Item className="flex items-end m-0">
          <Checkbox>
            記住我
          </Checkbox>
        </Form.Item>
        <div className="flex h-8 items-center">
          <p>尚未成為會員？</p>
          <Link href="/SignIn">
            <p className="underline ml-2 underline-offset-2 ">立即註冊</p>
          </Link>
        </div>
      </div>
      <Form.Item {...formItemLayout}>
        <Button type="primary" shape="round" htmlType="submit" className="-mt-8 bg-[#D4D2E3] text-white h-[56px] w-[380px] text-base shadow-none">
          登入
        </Button>
      </Form.Item>

    </Form>
  );
}

export default function LogIn() {
  const LogInTabs:TabsProps['items'] = [
    {
      key: '用戶',
      label: '我是用戶',
      children: <LogInForm />,
    },
    {
      key: '諮商師',
      label: '我是諮商師',
      children: <LogInForm />,
    },
  ];

  return (
    <>
      <div className="hidden lg:block w-[416px] log-in-box-height-xl bg-[#D4D2E3] absolute  -z-[99]" />
      {/* PC 左側底圖 */}
      <div className="z-20 container flex">
        {/* 圖片 */}
        <div className="hidden lg:block w-[492px] h-[492px] rounded-[25px] bg-primary-light mr-[176px] mt-[120px] ml-[58px] text-center">Image</div>
        {/* 右側輸入區 */}
        <div className="max-w-[380px] lg:mt-[120px] lg:mb-[160px] mb-[84px]">
          <div className="flex flex-col items-center my-12 lg:mt-0 lg:mb-12 lg:items-start">
            <p className="text-sm text-primary-heavy font-bold mb-1 hidden lg:block">LOG IN</p>
            <h2>會員登入</h2>
          </div>
          <div className="max-w-[380px] flex fle-col form">
            <ConfigProvider
              theme={{
                token: {
                  colorTextPlaceholder: '#5D5A88',
                  colorText: '#5D5A88',
                  colorBorder: '#D4D2E3',
                  colorIcon: '#5D5A88',
                },
                components: {
                  Tabs: {
                    colorText: '#D4D2E3',
                    colorPrimary: '#5D5A88',
                  },
                  Checkbox: {
                    borderRadius: 0,
                  },
                  Button: {
                    colorPrimaryHover: '#5D5A88',
                    colorPrimaryActive: '#5D5A88',
                    colorTextDisabled: '#fff',
                  },
                },
              }}
            >
              <Tabs centered defaultActiveKey="1" items={LogInTabs} />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
}
