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
          colorTextPlaceholder: '#5D5A88',
          colorPrimary: '#5D5A88',
          // Tab 被選取時的顏色
          borderRadius: 24,
          colorText: '#5D5A88',
          colorIcon: '#5D5A88',
          colorTextDescription: '#ff7f17',
          colorBorder: '#D4D2E3',
        },
        components: {
          Select: {
            controlHeight: 48,
          },
          Tabs: {
            colorText: '#D4D2E3',
          },
          Checkbox: {
            borderRadius: 0,
          },
          Button: {
            colorPrimaryHover: '#5D5A88',
            colorPrimaryActive: '#5D5A88',
            colorText: '#5D5A88',
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
