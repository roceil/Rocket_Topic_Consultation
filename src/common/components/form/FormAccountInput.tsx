import { Form, Input } from 'antd';

export default function FormAccountInput() {
  return (
    <Form.Item
      name="Email"
      label="帳號 Account"
      rules={[
        {
          required: true,
          message: '請輸入帳號',
        },
      ]}
    >
      <Input placeholder="Email address" className="formInput border-secondary" />
    </Form.Item>
  );
}
