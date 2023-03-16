/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ConfigProvider, Tabs, Button,
  Checkbox,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
type LayoutType = Parameters<typeof Form>[0]['layout'];

const inputStyle = 'py-3 px-5 rounded-[24px]';

export default function SignIn() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const formItemLayout = formLayout === 'vertical' ? { labelCol: { span: 24 }, wrapperCol: { offset: 0 } } : null;
  const formItemLayoutH = formLayout === 'horizontal' ? { labelCol: { span: 0 }, wrapperCol: { offset: 0 } } : null;

  const onFinish = (values:any) => {
    console.log('Received values of form: ', values);
  };
  const config = {
    rules: [{ type: 'object' as const, required: true, message: '請選擇出生年月日' }],
  };
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const SignInAry = [
    {
      user: '用戶',
      form: <>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          name="register-counselor"
          onFinish={onFinish}
          style={{
            maxWidth: 380,
          }}
          className="space-y-8"
          labelAlign="left"
        >
          <Form
            className="flex justify-between"
            {...formItemLayoutH}
            layout={formLayout}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="Name"
              label="姓名 Name"
              rules={[
                {
                  required: true,
                  message: '請輸入姓名',
                  whitespace: true,
                },
              ]}
              style={{ width: 180 }}
            >
              <Input placeholder="Name" className={inputStyle} />
            </Form.Item>
            <Form.Item
              name="gender"
              label="性別 Sex"
              rules={[
                {
                  required: true,
                  message: '請選擇性別',
                },
              ]}
              style={{ width: 180 }}
            >
              <Select placeholder="選擇性別">
                <Option value="male">男</Option>
                <Option value="female">女</Option>
                <Option value="other">其他</Option>
              </Select>
            </Form.Item>
          </Form>

          <Form.Item name="date-picker" label="出生年月日 Birth date" {...config}>
            <DatePicker className={inputStyle} style={{ width: 380 }} placeholder="Select date" />
          </Form.Item>

          <Form.Item
            name="email"
            label="帳號 Account"
            rules={[
              {
                type: 'email',
                message: '請輸入 E-mail',
              },
              {
                required: true,
                message: '請輸入 E-mail',
              },
            ]}
          >
            <Input placeholder="Email address" className={inputStyle} />
          </Form.Item>

          <Form.Item
            name="password"
            label="密碼 Password"
            rules={[
              {
                required: true,
                message: '請輸入密碼',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" className={inputStyle} />
            <p className="text-right">須包含大小寫英文字母及數字</p>
          </Form.Item>

          <Form.Item
            name="confirm"
            label="再次輸入密碼 Confirm password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '請再次輸入密碼',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" className={inputStyle} />
          </Form.Item>
          {/* 推底下間距 */}
          <div className="h-5" />
          <div className="flex justify-between items-end">
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
                },
              ]}
              {...formItemLayout}
            >
              <Checkbox>
                我已同意
                {' '}
                <a href="" className="underline">隱私權條款</a>
              </Checkbox>
            </Form.Item>
            <div className="flex h-8 items-center">
              <p>已成為會員？</p>
              <Link href="#">
                <p className="underline ml-2">立即登入</p>
              </Link>
            </div>
          </div>
          <Form.Item {...formItemLayout}>
            <Button type="primary" shape="round" htmlType="submit" className="-mt-8 bg-[#D4D2E3] text-white h-[56px] w-[380px] text-base shadow-none">
              立即註冊
            </Button>
          </Form.Item>
        </Form>
      </>,
    },
    {
      user: '諮商師',
      form: <>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        name="register-counselor"
        onFinish={onFinish}
        style={{
          maxWidth: 380,
        }}
        className="space-y-8"
        labelAlign="left"
      >
        <Form
          className="flex justify-between license"
          {...formItemLayoutH}
          layout={formLayout}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="Name"
            label="諮商師姓名 Name"
            rules={[
              {
                required: true,
                message: '請輸入姓名',
                whitespace: true,
              },
            ]}
            style={{ width: 180 }}
          >
            <Input placeholder="Name" className={inputStyle} />
          </Form.Item>
          <Form.Item
            name="upload"
            label="諮商師執照 License"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: '請輸入諮商師執照',
              },
            ]}
          >
            <Upload name="logo" action="/upload.do" listType="picture" style={{ width: 180 }}>
              <Button icon={<PlusCircleOutlined style={{ height: 20 }} />} shape="round" style={{ width: 180, height: 48 }}>License</Button>
            </Upload>
          </Form.Item>
        </Form>
        <Form.Item
          name="Name"
          label="諮商師證書字號 Certification No."
          rules={[
            {
              required: true,
              message: '請輸入諮商師證書字號 Certification No.',
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Certification No." className={inputStyle} />
        </Form.Item>

        <Form.Item
          name="email"
          label="帳號 Account"
          rules={[
            {
              type: 'email',
              message: '請輸入 E-mail',
            },
            {
              required: true,
              message: '請輸入 E-mail',
            },
          ]}
        >
          <Input placeholder="Email address" className={inputStyle} />
        </Form.Item>

        <Form.Item
          name="password"
          label="密碼 Password"
          rules={[
            {
              required: true,
              message: '請輸入密碼',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" className={`${inputStyle}`} />
          <p className="text-right">須包含大小寫英文字母及數字</p>
        </Form.Item>

        <Form.Item
          name="confirm"
          label="再次輸入密碼 Confirm password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '請再次輸入密碼',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm password" className={inputStyle} />
        </Form.Item>
        {/* 推底下間距 */}
        <div className="h-5" />
        <div className="flex justify-between items-end">
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
              },
            ]}
          >
            <Checkbox>
              我已同意
              {' '}
              <a href="" className="underline">隱私權條款</a>
            </Checkbox>
          </Form.Item>
          <div className="flex h-8 items-center">
            <p>已成為會員？</p>
            <Link href="#">
              <p className="underline ml-2">立即登入</p>
            </Link>
          </div>
        </div>
        <Form.Item>
          <Button type="primary" shape="round" htmlType="submit" className="-mt-8 bg-[#D4D2E3] text-white h-[56px] w-[380px] text-base shadow-none">
            立即註冊
          </Button>
        </Form.Item>
      </Form>
    </>
    },
  ];

  return (
    <>
      <div className="hidden lg:block w-[416px] h-[1145px] bg-[#D4D2E3] absolute  -z-[99]" />
      {/* PC 左側底圖 */}
      <div className="z-20 container flex">
        {/* 圖片 */}
        <div className="hidden lg:block w-[492px] h-[492px] rounded-[25px] bg-primary-light mr-[176px] mt-[120px] ml-[58px] text-center">Image</div>
        {/* 右側輸入區 */}
        <div className="w-[380px] lg:mt-[120px] lg:mb-[160px] mb-[84px]">
          <div className="flex flex-col items-center my-12 lg:mt-0 lg:mb-12 lg:items-start">
            <p className="text-sm text-primary-heavy font-bold mb-1 hidden lg:block">SIGN UP</p>
            <h2>會員註冊</h2>
          </div>
          <div className="max-w-[380px] lg:w-[380px] flex fle-col form form-sign-in">
            <ConfigProvider
              theme={{
                token: {
                  colorTextPlaceholder: '#5D5A88',
                  colorPrimary: '#5D5A88', // Tab 被選取時的顏色
                  borderRadius: 24,
                  colorText: '#5D5A88',
                  colorIcon: '#5D5A88',
                  colorTextDescription: '#ff7f17',
                  colorBorder: '#D4D2E3',
                },
                components: {
                  Select: {
                    controlHeight: 48,
                  },
                  Tabs: {
                    colorText: '#D4D2E3',
                  },
                  Checkbox: {
                    borderRadius: 0,
                  },
                  Button: {
                    colorPrimaryHover: '#5D5A88',
                    colorPrimaryActive: '#5D5A88',
                    colorText: '#5D5A88',
                    colorTextDisabled: '#fff',
                  },
                },
              }}
            >
              <Tabs
                defaultActiveKey="1"
                centered
                items={SignInAry.map((_, i) => {
                  const id = String(i + 1);
                  return {
                    label: `我是${_.user}`,
                    key: id,
                    children: _.form,
                  };
                })}
                style={{ maxWidth: 380 }}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
}
