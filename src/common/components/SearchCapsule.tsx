import { Input, ConfigProvider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { searchCounselorKeyWords } from '../redux/feature/counselorList';
import { ISearchCapsuleProps } from '../../types/interface';

export default function SearchCapsule({ colorPrimary, borderRadius, controlHeight, colorBgContainer, placeholder }: ISearchCapsuleProps) {
  const dispatch = useDispatch();
  return (
    <div className="searchCapsule">
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
          className="fakeBorder border-0"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              dispatch(searchCounselorKeyWords(e.currentTarget.value));
            }
          }}
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
    </div>
  );
}
