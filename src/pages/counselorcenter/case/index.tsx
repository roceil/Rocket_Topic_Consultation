import CounselorCenterLayout from '@/modules/counselorCenter/CounselorCenterLayout';
import CustomHead from '@/common/components/CustomHead';
import CounselorCaseRecordPC from '@/modules/counselorCenter/case/CounselorCaseRecordPC';
import useCloseLoading from '@/common/hooks/useCloseLoading';

export default function index() {
  // ======== 關閉Loading ========
  useCloseLoading();
  return (
    <>
      <CustomHead pageTitle="個案記錄" />
      {/* 手機版 個案記錄 */}
      <section className="pt-12 pb-28 lg:hidden bg-white">
        <div className="container">
          <h2 className="mb-12 text-center leading-loose lg:hidden">預約管理</h2>
          <CounselorCaseRecordPC />
        </div>
      </section>
      {/* 電腦版 */}
      <CounselorCenterLayout>
        <CounselorCaseRecordPC />
      </CounselorCenterLayout>
    </>
  );
}
