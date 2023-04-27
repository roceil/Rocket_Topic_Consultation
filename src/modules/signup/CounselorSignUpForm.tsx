import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { File } from 'buffer';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Form, Space, Input, Upload, Button, Checkbox, message, Modal } from 'antd';
import { useCounselorSignUpPostApiMutation, useCounselorUploadImagePostApiMutation } from '@/common/redux/service/signUp';
import { loadingStatus } from '@/common/redux/feature/loading';
import { ICounselorOnFinishProps } from '@/types/interface';
import FormNameInput from '@/common/components/form/FormNameInput';
import FormAccountInput from '@/common/components/form/FormAccountInput';
import FormPasswordInput from '@/common/components/form/FormPasswordInput';
import FormConfirmPasswordInput from '@/common/components/form/FormConfirmPasswordInput';
import FormSubmitBtn from '@/common/components/form/FormSubmitBtn';
import customAlert from '@/common/helpers/customAlert';

export default function CounselorSignUpForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const [modal, alertModal] = Modal.useModal();
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const { value: signUpTab } = useSelector((state: { signUpSlice: { value: string } }) => state.signUpSlice);
  const [counselorSignUpPostApi] = useCounselorSignUpPostApiMutation();
  const [counselorUploadImagePostApi] = useCounselorUploadImagePostApiMutation();

  // ==================== 諮商師註冊API ====================
  const counselorSignUpPost = async (Name: string, name: string, Certification: string, Account: string, Password: string, ConfirmPassword: string) => {
    // 文字POST
    const res = await counselorSignUpPostApi({
      Name,
      License: name,
      Certification,
      Account,
      Password,
      ConfirmPassword,
    });
    if ('error' in res) {
      console.log('🚀 ~ file: CounselorSignUpForm.tsx:41 ~ counselorSignUpPost ~ res:', res);
      const { Message } = (res.error as { data: { Message: string } }).data;
      dispatch(loadingStatus('none'));
      customAlert({ modal, Message, type: 'error' });
      return;
    }

    // 圖片POST
    const uploadImgRes = await counselorUploadImagePostApi({
      file: uploadImage,
      Account,
    });
    if ('error' in uploadImgRes) {
      const { Message } = (uploadImgRes.error as { data: { Message: string } }).data;
      dispatch(loadingStatus('none'));
      customAlert({ modal, Message, type: 'error' });
      return;
    }

    const { Message } = res.data as { Message: string };
    dispatch(loadingStatus('none'));
    customAlert({ modal, Message: `${Message}，請重新登入`, type: 'success', router, link: '/login' });
  };

  // ==================== 允許上傳的文件大小（以字節為單位） ====================
  const allowedSize = 2 * 1024 * 1024; // 2MB

  // ==================== 定義上傳文件前的檢查函式 ====================
  const beforeUpload = (file: { size: number }) => {
    // 檢查文件大小是否符合要求
    const isAllowedSize = file.size <= allowedSize;
    if (!isAllowedSize) {
      message.error('文件大小不超過 2MB');
      return false;
    }
    return false;
  };

  // ==================== 檔案上傳函式 ====================
  const normFile = (e: { fileList: { originFileObj: File }[] }) => {
    if (Array.isArray(e)) {
      return e;
    }
    // 這個判斷是為了防止刪除圖片時，e.fileList.length 會變成 0，進而導致 setUploadImage(undefined) 這個行為
    if (e.fileList.length > 0) {
      setUploadImage(e.fileList[0].originFileObj);
    }
    return e && e.fileList;
  };

  // ==================== 諮商師註冊表單 ====================
  const onFinish = ({ Name, License, Certification, Account, Password, ConfirmPassword }: ICounselorOnFinishProps) => {
    dispatch(loadingStatus('isLoading'));
    const { name } = License[0];
    if (signUpTab !== '諮商師') return;
    counselorSignUpPost(Name, name, Certification, Account, Password, ConfirmPassword);
  };

  return (
    <Form layout="vertical" form={form} name="register-user" onFinish={onFinish} className="CounselorSignUp space-y-8" labelAlign="left">
      {/* 姓名、執照 */}
      <Form.Item className="-mb-6">
        <Space className="flex items-start justify-between">
          {/* 姓名 Name */}
          <FormNameInput />

          {/* 執照 License */}
          <Form.Item
            name="License"
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
            <Upload listType="picture" maxCount={1} beforeUpload={beforeUpload} accept="image/png,image/jpg">
              <Button className="flex h-[51px] w-[160px] flex-row-reverse items-center justify-between !rounded-full border-secondary bg-white text-base text-gray-500 sm:w-[180px]" icon={<PlusCircleOutlined className="text-xl text-secondary" />}>
                License
              </Button>
            </Upload>
          </Form.Item>
        </Space>
      </Form.Item>

      {/* 證書字號 */}
      <Form.Item name="Certification" label="諮商師證書字號 Certification" rules={[{ required: true, message: '請輸入證書字號' }]}>
        <Input placeholder="Certification" className="formInput border-secondary !shadow-none placeholder:text-gray-500" />
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
              <p className="ml-2 underline">立即登入</p>
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
