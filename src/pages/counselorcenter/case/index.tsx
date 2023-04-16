import CounselorCenterLayout from '@/modules/counselorCenter/CounselorCenterLayout';
import CounselorCaseRecordPC from '../../../modules/counselorCenter/case/CounselorCaseRecordPC';
import CounselorCaseRecord from '../../../modules/counselorCenter/case/CounselorCaseRecord';

export default function reservation() {
  return (
    <>
      {/* 手機版 個案記錄 */}
      <section className="pt-12 pb-28 lg:hidden bg-white">
        <div className="container">
          <h2 className="mb-12 text-center leading-loose lg:hidden">預約管理</h2>
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
