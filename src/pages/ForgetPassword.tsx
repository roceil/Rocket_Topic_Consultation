/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ConfigProvider, Button,
  Form,
  Input,
} from 'antd';

type LayoutType = Parameters<typeof Form>[0]['layout'];
const inputStyle = 'py-3 px-5 rounded-[24px] ';

function ForgetPasswordForm() {
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
      name="forgetPassword"
      onFinish={onFinish}
      style={{
        maxWidth: 380,
      }}
      className="space-y-8"
      labelAlign="left"
    >
      <Form.Item
        name="email"
        label="信箱 Email Address"
      >
        <div>
          <Input placeholder="Email address" className={inputStyle} />
          <p className="text-right py-[1px]">請輸入註冊時使用的信箱</p>
        </div>
      </Form.Item>
      {/* 推底下間距 */}
      <div className="h-5 lg:h-[64px]" />
      <div className="flex justify-between items-end">
        <div className="flex h-8 items-center">
          <p>未收到信件？</p>
          <Link href="/" className="underline ml-2">
            重新發送
          </Link>
        </div>
      </div>
      <Form.Item {...formItemLayout}>
        <Button type="primary" shape="round" htmlType="submit" className="-mt-8 bg-[#D4D2E3] text-white h-[56px] w-[380px] text-base shadow-none">
          發送密碼重設信
        </Button>
      </Form.Item>
    </Form>
  );
}

export default function ForgetPassword() {
  return (
    <>
      <div className="hidden lg:block w-[416px] log-in-box-height-xl bg-[#D4D2E3] absolute -z-10" />
      {/* PC 左側底圖 */}
      <div className="z-20 container flex">
        {/* 圖片 */}
        <div className="hidden lg:block w-[492px] h-[492px] rounded-[25px] bg-primary-light mr-[176px] my-[120px] ml-[58px] text-center">Image</div>
        {/* 右側輸入區 */}
        <div className="max-w-[380px] lg:mt-[120px] lg:mb-[160px] mb-[84px]">
          <div className="flex flex-col items-center my-12 lg:mt-0 lg:mb-12 lg:items-start">
            <p className="text-base text-primary-heavy font-bold mb-1 hidden lg:block">FORGET PASSWORD</p>
            <h2>忘記密碼</h2>
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
                  Button: {
                    colorPrimaryHover: '#5D5A88',
                    colorPrimaryActive: '#5D5A88',
                    colorTextDisabled: '#fff',
                  },
                },
              }}
            >
              <ForgetPasswordForm />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
}
