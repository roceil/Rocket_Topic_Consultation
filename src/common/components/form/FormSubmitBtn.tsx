import { Button, Form } from 'antd';

export default function FormSubmitBtn({
  text,
  extraStyle,
}: {
  text: string;
  extraStyle?: React.CSSProperties;
}) {
  return (
    <Form.Item className="!mt-2">
      <Button
        type="primary"
        shape="round"
        htmlType="submit"
        style={extraStyle}
        className=" h-[56px] w-full bg-secondary text-base text-white shadow-none"
      >
        {text}
      </Button>
    </Form.Item>
  );
}
