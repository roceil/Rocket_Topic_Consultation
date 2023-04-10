import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Form, Space, Select, DatePicker, Checkbox } from 'antd';
import dayjs from 'dayjs';
import { useUserSignUpPostApiMutation } from '@/common/redux/service/signUp';
import { IUserOnFinishProps } from '@/types/interface';
import FormAccountInput from '@/common/components/form/FormAccountInput';
import FormPasswordInput from '@/common/components/form/FormPasswordInput';
import FormSubmitBtn from '@/common/components/form/FormSubmitBtn';
import FormConfirmPasswordInput from '@/common/components/form/FormConfirmPasswordInput';
import FormNameInput from '@/common/components/form/FormNameInput';

export default function UserSignUpForm() {
  const [form] = Form.useForm();
  const { Option } = Select;
  const inputStyle = 'py-3 px-5 rounded-[24px]';
  const { value: signUpTab } = useSelector((state: { signUpSlice: { value: string } }) => state.signUpSlice);
  const [userSignUpPostApi] = useUserSignUpPostApiMutation();
  const router = useRouter();

  // 使用者註冊API
  const userSignUpPost = async (Name: string, Sex: string, BirthDate: string, Account: string, Password: string, ConfirmPassword: string) => {
    const res = await userSignUpPostApi({
      Name,
      Sex,
      BirthDate,
      Account,
      Password,
      ConfirmPassword,
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
  const onFinish = ({ Name, Sex, Account, Password, DatePicker: { $d: Date }, ConfirmPassword }: IUserOnFinishProps) => {
    const BirthDate = dayjs(Date).format('YYYY-MM-DD');

    if (signUpTab !== '用戶') return;
    userSignUpPost(Name, Sex, BirthDate, Account, Password, ConfirmPassword);
  };

  return (
    <Form layout="vertical" form={form} name="register-user" onFinish={onFinish} className="UserSignUp space-y-8" labelAlign="left">
      {/* 姓名、性別 */}
      <Form.Item className="-mb-6">
        <Space className="flex justify-between">
          {/* 姓名 Name */}
          <FormNameInput />

          {/* 性別 Gender */}
          <Form.Item
            name="Sex"
            label="性別 Sex"
            className="userSignUpGender inline-block w-[160px] sm:w-[180px]"
            rules={[
              {
                required: true,
                message: '請選擇性別',
              },
            ]}
          >
            <Select placeholder="選擇性別" getPopupContainer={(trigger) => trigger.parentElement}>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
              <Option value="不公開">不公開</Option>
            </Select>
          </Form.Item>
        </Space>
      </Form.Item>

      {/* 出生年月日 Birth date */}
      <Form.Item
        name="DatePicker"
        label="出生年月日 Birth date"
        rules={[
          {
            required: true,
            message: '請選擇日期',
          },
        ]}
      >
        <DatePicker className={`${inputStyle} w-full border-secondary  focus:shadow-none`} placeholder="Select date" />
      </Form.Item>

      {/* 帳號 Account */}
      <FormAccountInput />

      {/* 密碼 Password */}
      <FormPasswordInput
        needLink={false}
        extraRules={[
          {
            min: 8,
            message: '密碼須為 8 個字元以上',
          },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: '須包含大小寫英文字母及數字',
          },
        ]}
      />

      {/* 再次輸入密碼 Confirm password */}
      <FormConfirmPasswordInput />

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
            <Link href="/" className="underline hover:text-secondary hover:opacity-50">
              隱私權條款
            </Link>
          </Checkbox>

          <div className="flex h-8 items-center">
            <p>已成為會員？</p>
            <Link href="/login" className="hover:text-secondary hover:opacity-50">
              <p className="ml-2 underline ">立即登入</p>
            </Link>
          </div>
        </div>
      </Form.Item>

      {/* 立即註冊 */}
      <FormSubmitBtn text="立即註冊" />
    </Form>
  );
}
