import { ConfigProvider, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import LogInForm from './LogInForm';
import { loginTabs } from '../../common/redux/feature/loginTabs';

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
          colorTextPlaceholder: '#5D5A88',
          colorText: '#5D5A88',
          colorBorder: '#D4D2E3',
          colorIcon: '#5D5A88',
        },
        components: {
          Tabs: {
            colorText: '#D4D2E3',
            colorPrimary: '#5D5A88',
          },
          Checkbox: {
            borderRadius: 0,
          },
          Button: {
            colorPrimaryHover: '#5D5A88',
            colorPrimaryActive: '#5D5A88',
            colorTextDisabled: '#fff',
          },
        },
      }}
    >
      <Tabs centered defaultActiveKey={value} items={loginTab} onChange={onChange} />
    </ConfigProvider>
  );
}
