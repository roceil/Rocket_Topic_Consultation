import Link from 'next/link';
import { useSelector } from 'react-redux';
import {
  Form, Space, Input, Select, DatePicker, Checkbox, Button,
} from 'antd';

export default function UserSignUpForm() {
  const [form] = Form.useForm();
  const { Option } = Select;
  const inputStyle = 'py-3 px-5 rounded-[24px]';
  const { value: signUpTab } = useSelector((state: any) => state.signUpSlice);

  // 表單送出函式
  const onFinish = (values: any) => {
    if (signUpTab !== '用戶') return;
    console.log('Received values of form: ', values, signUpTab);
  };

  return (
    <Form
      layout="vertical"
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
      <Form.Item
        name="date-picker"
        label="出生年月日 Birth date"
        rules={[
          {
            required: true,
            message: '請選擇日期',
          },
        ]}
      >
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
        <Input.Password placeholder="Password" className={inputStyle} />
      </Form.Item>

      {/* 再次輸入密碼 Confirm password */}
      <Form.Item
        name="confirm"
        label="再次輸入密碼 Confirm password"
        dependencies={['password']}
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
  );
}
