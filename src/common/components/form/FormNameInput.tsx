import { Form, Input } from 'antd';

export default function FormNameInput() {
  return (
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
      <Input placeholder="Name" className="formInput border-secondary" />
    </Form.Item>
  );
}
