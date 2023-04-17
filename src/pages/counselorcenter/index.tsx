import { ConfigProvider } from 'antd';
import { loadingStatus } from '@/common/redux/feature/loading';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CounselorInfoTab from './personalInfo';
import CounselorCenterLayout from '../../modules/counselorCenter/CounselorCenterLayout';

export default function index() {
  // ==================== 載入後關閉 Loading ====================
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingStatus('none'));
  }, []);
  return (
    <>
      {/* 手機版 */}
      <section className="pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px] bg-white">
        <div className="container">
          <h2 className="mb-12 text-center leading-loose lg:hidden text-secondary">個人資料</h2>
          <div className="counselorTab mx-4 ">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#4A5364',
                  colorText: '#4A5364',
                  fontSize: 16,
                  margin: 32,
                },
              }}
            >
              <CounselorInfoTab />
            </ConfigProvider>
          </div>
        </div>
      </section>
      {/* 電腦版 */}
      <CounselorCenterLayout>
        <CounselorInfoTab />
      </CounselorCenterLayout>
    </>
  );
}
