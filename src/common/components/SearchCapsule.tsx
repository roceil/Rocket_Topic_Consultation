import { SearchOutlined } from '@ant-design/icons';
import { Input, ConfigProvider } from 'antd';
import { ISearchCapsuleProps } from '../../types/interface';

export default function SearchCapsule({ colorPrimary, borderRadius, controlHeight, colorBgContainer, placeholder }: ISearchCapsuleProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary,
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
        className="border-[2px] border-secondary"
        style={{
          borderRadius,
        }}
        suffix={(
          <SearchOutlined
            className="text-lg"
            style={{
              color: colorPrimary,
            }}
          />
        )}
      />
    </ConfigProvider>
  );
}
