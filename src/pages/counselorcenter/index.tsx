import { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { getCookie } from 'cookies-next';
import CounselorInfoTab from '@/modules/counselorCenter/personalInfo/CounselorInfoTab';
import wrapper from '@/common/redux/store';
import CounselorCenterLayout from '@/modules/counselorCenter/CounselorCenterLayout';
import useCloseLoading from '@/common/hooks/useCloseLoading';
import CustomHead from '@/common/components/CustomHead';
import { useDispatch } from 'react-redux';
import { loadingStatus } from '@/common/redux/feature/loading';
import Unverified from '../../modules/counselorCenter/personalInfo/Unverified';

export const getServerSideProps = wrapper.getServerSideProps(
  () => async ({ req, res }) => {
    const validation = getCookie('validation', { req, res });
    const token = getCookie('auth', { req, res });
    if (!token) {
      res.writeHead(302, { Location: '/login' });
      res.end();
    }
    return {
      props: {
        validation,
      },
    };
  },
);

// status 當 PROPS 傳下去，用tf 判斷
//   "Validation":false,

export default function index({ validation }:{ validation:boolean }) {
  // ==================== 載入後關閉 Loading ====================
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingStatus('none'));
  }, []);
  useCloseLoading();

  return (
    <>
      <CustomHead pageTitle="會員中心" />
      {/* 手機版 */}
      <section className="bg-white pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px]">
        <div className="">
          <h2 className="mb-12 text-center leading-loose text-secondary lg:hidden">
            個人資料
          </h2>
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
              { validation ? <CounselorInfoTab /> : <Unverified /> }
            </ConfigProvider>
          </div>
        </div>
      </section>
      {/* 電腦版 */}
      <CounselorCenterLayout>
        { validation ? <CounselorInfoTab /> : <Unverified /> }
        {/* <CounselorInfoTab validation={validation} />  */}
        {/* <CounselorInfoTab /> */}
        {/* <Unverified /> */}
      </CounselorCenterLayout>
    </>
  );
}
