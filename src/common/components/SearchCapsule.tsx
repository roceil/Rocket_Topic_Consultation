import { SearchOutlined } from '@ant-design/icons';
import { Input, ConfigProvider } from 'antd';
import { ISearchCapsuleProps } from '../../types/interface';

export default function SearchCapsule({
  colorPrimary,
  borderRadius,
  controlHeight,
  colorBgContainer,
  placeholder,
}: ISearchCapsuleProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary,
          borderRadius,
          colorIcon: colorPrimary,
          colorTextPlaceholder: colorPrimary,
          colorText: colorPrimary,
          colorBgContainer,
          controlOutline: colorPrimary,
          controlHeight,
        },
      }}
    >
      <Input
        placeholder={placeholder}
        suffix={(
          <SearchOutlined
            style={{
              color: colorPrimary,
            }}
          />
        )}
      />
    </ConfigProvider>
  );
}
