import { Form, Input } from 'antd';

export default function FormConfirmPasswordInput() {
  return (
    <Form.Item
      name="confirm"
      label="再次輸入密碼 Confirm password"
      dependencies={['Password']}
      rules={[
        {
          required: true,
          message: '請再次輸入密碼',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('Password') === value) {
              return Promise.resolve();
            }

            return Promise.reject(new Error('密碼不一致，請重新輸入'));
          },
        }),
      ]}
    >
      <Input.Password placeholder="Confirm password" className="formInput border-secondary" />
    </Form.Item>
  );
}
