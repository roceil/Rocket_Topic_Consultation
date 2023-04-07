import { ConfigProvider, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { loginTabs } from '@/common/redux/feature/loginTabs';
import LogInForm from './LogInForm';

const loginTab = [
  {
    key: '用戶',
    label: '我是用戶',
    children: <LogInForm />,
  },
  {
    key: '諮商師',
    label: '我是諮商師',
    children: <LogInForm />,
  },
];

export default function LoginTab() {
  const { value } = useSelector((state: { loginTabs: { value: string } }) => state.loginTabs);
  const dispatch = useDispatch();
  const onChange = (key: string) => {
    dispatch(loginTabs(key));
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: '#4A5364',
          colorBorder: '#D4D2E3',
          colorIcon: '#4A5364',
          colorPrimaryHover: '#4A5364',
          colorPrimaryActive: '#4A5364',
        },
        components: {
          Tabs: {
            colorText: '#D4D2E3',
            colorPrimary: '#4A5364',
          },
          Checkbox: {
            borderRadius: 0,
          },
          Button: {
            colorPrimaryHover: '#4A5364',
            colorPrimaryActive: '#4A5364',
            colorTextDisabled: '#fff',
          },
        },
      }}
    >
      <Tabs centered defaultActiveKey={value} items={loginTab} onChange={onChange} />
    </ConfigProvider>
  );
}
