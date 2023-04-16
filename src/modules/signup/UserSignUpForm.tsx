import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Space, Select, DatePicker, Checkbox, Modal } from 'antd';
import { Rule } from 'antd/es/form';
import dayjs from 'dayjs';
import { loadingStatus } from '@/common/redux/feature/loading';
import { useUserSignUpPostApiMutation } from '@/common/redux/service/signUp';
import { IUserOnFinishProps } from '@/types/interface';
import FormAccountInput from '@/common/components/form/FormAccountInput';
import FormPasswordInput from '@/common/components/form/FormPasswordInput';
import FormSubmitBtn from '@/common/components/form/FormSubmitBtn';
import FormConfirmPasswordInput from '@/common/components/form/FormConfirmPasswordInput';
import FormNameInput from '@/common/components/form/FormNameInput';
import customAlert from '@/common/helpers/customAlert';

export default function UserSignUpForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const [modal, alertModal] = Modal.useModal();
  const { Option } = Select;
  const { value: signUpTab } = useSelector((state: { signUpSlice: { value: string } }) => state.signUpSlice);
  const [userSignUpPostApi] = useUserSignUpPostApiMutation();

  // ==================== 用戶註冊API ====================
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
      console.log('🚀 ~ file: UserSignUpForm.tsx:35 ~ userSignUpPost ~ res:', res);
      const { Message } = (res.error as { data: { Message: string } }).data;
      dispatch(loadingStatus('none'));
      customAlert({ modal, Message, type: 'error' });
      return;
    }
    const { Message } = res.data as { Message: string };

    customAlert({ modal, Message: `${Message}，請重新登入`, type: 'success', router, link: '/login' });
  };

  // ==================== 送出註冊表單 ====================
  const onFinish = ({ Name, Sex, Account, Password, DatePicker: { $d: Date }, ConfirmPassword }: IUserOnFinishProps) => {
    dispatch(loadingStatus('isLoading'));
    const BirthDate = dayjs(Date).format('YYYY-MM-DD');

    if (signUpTab !== '用戶') return;
    userSignUpPost(Name, Sex, BirthDate, Account, Password, ConfirmPassword);
  };

  // ==================== 出生日期驗證用 ====================
  const [, setSelectedDate] = useState('');
  const validateAge = (rule: Rule, value: string, callback: (error?: string) => void) => {
    const age = dayjs().diff(dayjs(value), 'year');
    if (age < 18) {
      callback('需滿18歲才能進行註冊');
    } else {
      callback();
    }
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
            className="userSignUpGender userSignUpSex inline-block w-[160px] sm:w-[180px]"
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
        id="DatePicker"
        name="DatePicker"
        label="出生年月日 Birth date"
        rules={[
          {
            required: true,
            message: '請選擇日期',
          },
          { validator: validateAge },
        ]}
      >
        <DatePicker
          placement="bottomLeft"
          inputReadOnly // 避免手機上出現鍵盤
          className="formInput w-full border-secondary  focus:shadow-none"
          placeholder="Select date"
          getPopupContainer={(trigger) => trigger.parentElement || document.body}
          onChange={(date, dateString) => setSelectedDate(dateString)}
        />
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
      <div className="alert">{alertModal}</div>
    </Form>
  );
}
