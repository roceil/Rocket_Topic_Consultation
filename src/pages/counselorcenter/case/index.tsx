import CounselorCenterLayout from '@/modules/counselorCenter/CounselorCenterLayout';
import { SearchOutlined } from '@ant-design/icons';
import { ConfigProvider, Input } from 'antd';
import CounselorCaseRecordPC from '../../../modules/counselorCenter/case/CounselorCaseRecordPC';
import CounselorCaseRecord from '../../../modules/counselorCenter/case/CounselorCaseRecord';

export default function reservation() {
  return (
    <>
      {/* 手機版 個案記錄 */}
      <section className="pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px]">
        <div className="container">
          <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
            目前尚無預約
          </div>
          <h2 className="mb-12 text-center leading-loose lg:hidden">預約管理</h2>

          {/* 搜尋框 */}
          <div className="mb-6 w-full max-w-[200px]">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#5D5A88',
                  borderRadius: 9999,
                  colorTextPlaceholder: '#5D5A88',
                  // colorText: colorPrimary,
                  colorBgContainer: '#EEECFA',
                  // controlOutline: colorPrimary,
                },
              }}
            >
              <Input
                placeholder="輸入個案姓名"
                suffix={<SearchOutlined className="text-primary-heavy" />}
                className="border-none px-5 py-1 "
              />
            </ConfigProvider>
          </div>

          <CounselorCaseRecord />
        </div>
      </section>
      {/* 電腦版 */}
      <CounselorCenterLayout>
        <CounselorCaseRecordPC />
      </CounselorCenterLayout>
    </>
  );
}
