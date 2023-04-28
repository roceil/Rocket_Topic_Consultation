import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import CustomHead from '@/common/components/CustomHead';
import CounselorCenterLayout from '@/modules/counselorCenter/CounselorCenterLayout';
import CounselorRecordList from '@/modules/counselorCenter/case/CounselorRecordList';

export default function name() {
  const token = getCookie('auth');
  const [renderData, setRenderData] = useState([]);

  // ======== 取個案姓名 ========
  const router = useRouter();
  const { name: UserName } = router.query;
  useEffect(() => {
    (
      async () => {
        if (!UserName) return;
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/AppointmentsRecordLogs`,
            { Name: Array.isArray(UserName) ? decodeURIComponent(UserName[0]) : decodeURIComponent(UserName) },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const { appointmentLogsList } = res.data.Data;
          setRenderData(appointmentLogsList);
        } catch (error) {
          console.log('🚀 ~ file: CounselorCaseRecordPC.tsx:92 ~ getRecord ~ error:', error);
        }
      }
    )();
  }, [UserName]);

  return (
    <>
      <CustomHead pageTitle="個案記錄" />
      {/* 手機版 個案記錄 */}
      <section className="pt-12 pb-28 lg:hidden bg-white">
        <div className="container">
          <h2 className="mb-12 text-center leading-loose lg:hidden">個案記錄</h2>
          <CounselorRecordList renderData={renderData} />
        </div>
      </section>
      {/* 電腦版 */}
      <CounselorCenterLayout>
        <CounselorRecordList renderData={renderData} />
      </CounselorCenterLayout>
    </>

  );
}
