import { ConfigProvider, Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import { signUpTabs } from '@/common/redux/feature/signUp';
import UserSignUpForm from './UserSignUpForm';
import CounselorSignUpForm from './CounselorSignUpForm';

export default function SignUpTabs() {
  const signUpTabsAry = [
    {
      label: '用戶',
      key: '用戶',
      children: <UserSignUpForm />,
    },
    {
      label: '諮商師',
      key: '諮商師',
      children: <CounselorSignUpForm />,
    },
  ];
  const dispatch = useDispatch();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextPlaceholder: '#4A5364',
          colorPrimary: '#4A5364',
          // Tab 被選取時的顏色
          borderRadius: 24,
          colorText: '#4A5364',
          colorError: '#D14D3C ',
        },
        components: {
          Select: {
            controlHeight: 48,
          },
          Tabs: {
            colorText: '#4A5364',
          },
          Checkbox: {
            borderRadius: 0,
          },
          Button: {
            colorPrimaryHover: '#4A5364',
            colorPrimaryActive: '#4A5364',
            colorText: '#4A5364',
            colorTextDisabled: '#fff',
          },
        },
      }}
    >
      <Tabs
        defaultActiveKey="用戶"
        centered
        onChange={(value) => {
          dispatch(signUpTabs(value));
        }}
        items={signUpTabsAry.map((data) => data)}
      />
    </ConfigProvider>
  );
}
