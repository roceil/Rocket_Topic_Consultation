import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import {
  Form, Space, Input, Upload, Button, Checkbox,
} from 'antd';
import { useCounselorSignUpPostApiMutation } from '../../common/redux/service/signUp';
import { ICounselorOnFinishProps } from '../../types/interface';

export default function CounselorSignUpForm() {
  const [form] = Form.useForm();
  const inputStyle = 'py-3 px-5 rounded-[24px]';
  const { value: signUpTab } = useSelector(
    (state: { signUpSlice: { value: string } }) => state.signUpSlice,
  );
  const [counselorSignUpPostApi] = useCounselorSignUpPostApiMutation();
  const router = useRouter();

  // 使用者註冊API
  const counselorSignUpPost = async (
    name: string,
    license: [],
    certification: string,
    email: string,
    password: string,
  ) => {
    const res = await counselorSignUpPostApi({
      name,
      license,
      certification,
      email,
      password,
    });
    if ('error' in res) {
      console.log(res);
      return;
    }
    const { Message } = res.data as { Message: string };
    alert(`${Message}，請重新登入`);
    router.push('/login');
    console.log(res);
  };

  // 表單送出函式
  const onFinish = ({
    name, license, certification, email, password,
  }: ICounselorOnFinishProps) => {
    if (signUpTab !== '諮商師') return;
    counselorSignUpPost(name, license, certification, email, password);
  };

  // 檔案上傳函式
  const normFile = (e: { fileList: unknown }) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
      {/* 姓名、執照 */}
      <Form.Item className="-mb-6">
        <Space className="flex items-start justify-between">
          <Form.Item
            name="name"
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
              return Promise.reject(new Error('密碼不一致，請重新輸入'));
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
