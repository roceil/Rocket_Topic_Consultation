import Link from 'next/link';
import { useState } from 'react';
import { Form, Input, Space } from 'antd';

export default function FormPasswordInput({ needLink, extraRules, label }: { needLink: boolean; extraRules?: any[]; label?: string }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Form.Item
      name="Password"
      label={label || '輸入新密碼 Password'}
      rules={[
        {
          required: true,
          message: '請輸入密碼',
        },
        ...(extraRules || []),
      ]}
    >
      <Space className="block">
        <Input.Password
          placeholder="Password"
          className="formInput border-secondary"
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
        />
        <Link style={needLink ? { visibility: 'visible' } : { visibility: 'hidden' }} href="/forgetpassword" className="absolute right-0 flex justify-end underline underline-offset-2 hover:text-secondary hover:opacity-50">
          忘記密碼？
        </Link>
      </Space>
    </Form.Item>
  );
}
