import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setCookie } from 'cookies-next';
import { Form, Modal } from 'antd';
import { useUserLoginPostApiMutation, useCounselorLoginPostApiMutation } from '@/common/redux/service/login';
import { loadingStatus } from '@/common/redux/feature/loading';
import FormSubmitBtn from '@/common/components/form/FormSubmitBtn';
import FormPasswordInput from '@/common/components/form/FormPasswordInput';
import FormAccountInput from '@/common/components/form/FormAccountInput';
import CustomAlert from '@/common/helpers/customAlert';
import { IUserLoginRes } from '@/types/interface';

function LogInForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { value } = useSelector((state: { loginTabs: { value: string } }) => state.loginTabs);
  const [modal, alertModal] = Modal.useModal();

  // ==================== 用戶登入 API ====================
  const [userLoginPostApi] = useUserLoginPostApiMutation();
  const userLoginPost = async (Account: string, Password: string) => {
    const res = await userLoginPostApi({
      Account,
      Password,
    });
    if ('error' in res) {
      console.log('🚀 ~ file: LogInForm.tsx:33 ~ userLoginPost ~ res:', res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      dispatch(loadingStatus('none'));
      CustomAlert({ modal, Message, type: 'error' });
      return;
    }
    const { Message } = res.data as { Message: string };
    const { Authorization, Identity, UserID } = res.data.Data as IUserLoginRes;

    setCookie('auth', decodeURIComponent(`${Authorization}`), { maxAge: 60 * 60 * 24 * 14 });
    setCookie('identity', decodeURIComponent(Identity), { maxAge: 60 * 60 * 24 * 14 });
    setCookie('userID', decodeURIComponent(UserID), { maxAge: 60 * 60 * 24 * 14 });
    CustomAlert({ modal, Message, type: 'success', router });
  };

  // ==================== 諮商師登入 API ====================
  const [counselorLoginPostApi] = useCounselorLoginPostApiMutation();
  const counselorLoginPost = async (Account: string, Password: string) => {
    const res = await counselorLoginPostApi({
      Account,
      Password,
    });
    if ('error' in res) {
      console.log(res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      dispatch(loadingStatus('none'));
      CustomAlert({ modal, Message, type: 'error' });
      return;
    }
    const { Message } = res.data as { Message: string };
    const { Authorization, Identity, UserID } = res.data.Data as IUserLoginRes;

    setCookie('auth', decodeURIComponent(`${Authorization}`), { maxAge: 60 * 60 * 24 * 14 });
    setCookie('identity', decodeURIComponent(Identity), { maxAge: 60 * 60 * 24 * 14 });
    setCookie('counselorID', decodeURIComponent(UserID), { maxAge: 60 * 60 * 24 * 14 });
    router.push('/');
    CustomAlert({ modal, Message, type: 'success', router });
  };

  // ==================== 登入表單 ====================
  const onFinish = ({ Account, Password }: { Account: string; Password: string }) => {
    dispatch(loadingStatus('isLoading'));
    if (value === '用戶') {
      userLoginPost(Account, Password);
    } else if (value === '諮商師') {
      counselorLoginPost(Account, Password);
    }
  };

  return (
    <Form layout="vertical" form={form} name="logIn" onFinish={onFinish} className="space-y-8 px-4" labelAlign="left">
      <FormAccountInput />

      <FormPasswordInput needLink label="密碼 Password" />

      <Form.Item className="pt-24">
        <div className="flex items-center justify-end">
          <p>尚未成為會員？</p>
          <Link href="/signup" className="hover:text-secondary hover:opacity-50 ">
            <p className="ml-2 underline underline-offset-2">立即註冊</p>
          </Link>
        </div>
      </Form.Item>

      <FormSubmitBtn text="登入" />
      <div id="customAlert" className="alert">{alertModal}</div>
    </Form>
  );
}

export default LogInForm;
