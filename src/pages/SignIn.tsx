/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ConfigProvider,
  Tabs,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Space,
  UploadProps,
  message,
} from 'antd';
import {
  LoadingOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Image from 'next/image';

const { Option } = Select;
type LayoutType = Parameters<typeof Form>[0]['layout'];

const inputStyle = 'py-3 px-5 rounded-[24px]';

export default function SignIn() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const formItemLayout = formLayout === 'vertical' ? { labelCol: { span: 24 }, wrapperCol: { offset: 0 } } : null;
  const formItemLayoutH = formLayout === 'horizontal' ? { labelCol: { span: 0 }, wrapperCol: { offset: 0 } } : null;

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const config = {
    rules: [{ type: 'object' as const, required: true, message: '請選擇出生年月日' }],
  };

  // 上傳圖片用函式
  const [loading, setLoading] = useState(false);

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const SignInAry = [
    {
      user: '用戶',
      form: (
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          name="register-user"
          onFinish={onFinish}
          style={{
            maxWidth: 380,
          }}
          className="space-y-8"
          labelAlign="left"
        >
          {/* 姓名、性別 */}
          <Form.Item className="-mb-6">
            <Space className="flex justify-between">
              <Form.Item
                name="Name"
                label="姓名 Name"
                className="inline-block w-[160px] sm:w-[180px]"
                rules={[
                  {
                    required: true,
                    message: '請輸入姓名',
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Name" className={inputStyle} />
              </Form.Item>

              <Form.Item
                name="gender"
                label="性別 Sex"
                className="inline-block w-[160px] sm:w-[180px]"
                rules={[
                  {
                    required: true,
                    message: '請選擇性別',
                  },
                ]}
              >
                <Select placeholder="選擇性別">
                  <Option value="male">男</Option>
                  <Option value="female">女</Option>
                  <Option value="other">其他</Option>
                </Select>
              </Form.Item>
            </Space>
          </Form.Item>

          {/* 出生年月日 Birth date */}
          <Form.Item name="date-picker" label="出生年月日 Birth date" {...config}>
            <DatePicker className={`${inputStyle} w-full`} placeholder="Select date" />
          </Form.Item>

          {/* 帳號 Account */}
          <Form.Item
            name="email"
            label="帳號 Account"
            rules={[
              {
                required: true,
                message: '請輸入帳號',
              },
            ]}
          >
            <Input placeholder="Email address" className={inputStyle} />
          </Form.Item>

          {/* 密碼 Password */}
          <Form.Item
            name="password"
            label="密碼 Password"
            rules={[
              {
                required: true,
                message: '請輸入密碼',
              },
              {
                min: 8,
                message: '密碼須為 8 個字元以上',
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8}$/,
                message: '須包含大小寫英文字母及數字',
              },
            ]}
          >
            <div>
              <Input.Password placeholder="Password" className={inputStyle} />
              <p className="absolute right-0">須包含大小寫英文字母及數字</p>
            </div>
          </Form.Item>

          {/* 再次輸入密碼 Confirm password */}
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
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!'),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" className={inputStyle} />
          </Form.Item>

          {/* 隱私權條款 */}
          <Form.Item
            className="pt-[60px]"
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('請詳閱後同意條款'))),
              },
            ]}
          >
            <div className="flex items-center justify-between">
              <Checkbox>
                我已同意
                <Link href="/" className="underline">
                  隱私權條款
                </Link>
              </Checkbox>

              <div className="flex h-8 items-center">
                <p>已成為會員？</p>
                <Link href="/login">
                  <p className="ml-2 underline">立即登入</p>
                </Link>
              </div>
            </div>
          </Form.Item>

          {/* 立即註冊 */}
          <Form.Item className="!mt-0">
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              className="h-[50px] w-full bg-[#D4D2E3] text-base text-white shadow-none"
            >
              立即註冊
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      user: '諮商師',
      form: (
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          name="register-user"
          onFinish={onFinish}
          style={{
            maxWidth: 380,
          }}
          className="space-y-8"
          labelAlign="left"
        >
          {/* 姓名、執照 */}
          <Form.Item className="-mb-6">
            <Space className="flex items-start justify-between">
              <Form.Item
                name="Name"
                label="姓名 Name"
                className="inline-block w-[160px] sm:w-[180px]"
                rules={[
                  {
                    required: true,
                    message: '請輸入姓名',
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Name" className={inputStyle} />
              </Form.Item>

              <Form.Item
                name="license"
                label="諮商師執照 License"
                className="inline-block w-[160px] sm:w-[180px]"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: '請上傳執照',
                  },
                ]}
              >
                <Upload listType="picture" maxCount={1}>
                  <Button
                    className="flex h-[51px] w-[160px] flex-row-reverse items-center justify-between !rounded-full sm:w-[180px]"
                    icon={<PlusCircleOutlined className="text-xl" />}
                  >
                    License
                  </Button>
                </Upload>
              </Form.Item>
            </Space>
          </Form.Item>

          {/* 證書字號 */}
          <Form.Item
            name="certification"
            label="諮商師證書字號 Certification"
            rules={[{ required: true, message: '請輸入證書字號' }]}
          >
            <Input placeholder="Certification" className={inputStyle} />
          </Form.Item>

          {/* 帳號 Account */}
          <Form.Item
            name="email"
            label="帳號 Account"
            rules={[
              {
                required: true,
                message: '請輸入帳號',
              },
            ]}
          >
            <Input placeholder="Email address" className={inputStyle} />
          </Form.Item>

          {/* 密碼 Password */}
          <Form.Item
            name="password"
            label="密碼 Password"
            rules={[
              {
                required: true,
                message: '請輸入密碼',
              },
              {
                min: 8,
                message: '密碼須為 8 個字元以上',
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8}$/,
                message: '須包含大小寫英文字母及數字',
              },
            ]}
          >
            <div>
              <Input.Password placeholder="Password" className={inputStyle} />
              <p className="absolute right-0">須包含大小寫英文字母及數字</p>
            </div>
          </Form.Item>

          {/* 再次輸入密碼 Confirm password */}
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
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!'),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" className={inputStyle} />
          </Form.Item>

          {/* 隱私權條款 */}
          <Form.Item
            className="pt-[60px]"
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('請詳閱後同意條款'))),
              },
            ]}
          >
            <div className="flex items-center justify-between">
              <Checkbox>
                我已同意
                <Link href="/" className="underline">
                  隱私權條款
                </Link>
              </Checkbox>

              <div className="flex h-8 items-center">
                <p>已成為會員？</p>
                <Link href="/login">
                  <p className="ml-2 underline">立即登入</p>
                </Link>
              </div>
            </div>
          </Form.Item>

          {/* 立即註冊 */}
          <Form.Item className="!mt-0">
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              className="h-[50px] w-full bg-[#D4D2E3] text-base text-white shadow-none"
            >
              立即註冊
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="container z-20 flex justify-center pt-12 pb-[84px] lg:pt-[120px] lg:pb-[160px]">
      {/* 圖片 */}
      <Image
        src="https://fakeimg.pl/492x492/F9F9FF/"
        alt="picture"
        width={492}
        height={492}
        className="mr-[176px] hidden h-[492px] w-[492px] rounded-[25px] lg:block"
      />

      {/* 右側輸入區 */}
      <div className="w-full lg:max-w-[380px]">
        <div className="flex flex-col items-center lg:my-0 lg:items-start">
          <p className="mb-1 hidden text-sm font-bold text-primary-heavy lg:block">SIGN UP</p>
          <h2>會員註冊</h2>
        </div>

        <div className="signUpForm fle-col mt-12 flex items-center justify-center">
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
              defaultActiveKey="2"
              centered
              className="w-full"
              items={SignInAry.map((_, i) => {
                const id = String(i + 1);
                return {
                  label: `我是${_.user}`,
                  key: id,
                  children: _.form,
                };
              })}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
