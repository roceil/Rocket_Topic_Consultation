import CounselorCenterLayout from '@/modules/counselorCenter/CounselorCenterLayout';
import CounselorReservationTab from '@/modules/counselorCenter/reservation/CounselorReservationTab';
import useCloseLoading from '@/common/hooks/useCloseLoading';
import CustomHead from '@/common/components/CustomHead';

export default function reservation() {
  // ====================== 關閉 loading ======================
  useCloseLoading();

  return (
    <>
      <CustomHead pageTitle="預約管理" />
      {/* 手機版 預約管理 */}
      <section className="pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px] bg-white">
        <div className="container mb-10">
          <h2 className="mb-12 text-center leading-loose lg:hidden">預約管理</h2>
          <CounselorReservationTab />
        </div>
      </section>

      {/* 電腦版 */}
      <CounselorCenterLayout>
        <CounselorReservationTab />
      </CounselorCenterLayout>
    </>
  );
}
