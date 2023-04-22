import { homeComponents } from '@/lib/homeFilesRoute';
import CustomHead from '@/common/components/CustomHead';
import useCloseLoading from '@/common/hooks/useCloseLoading';

const { Banner, SuggestCounselor, CustomTopic, PlatformFeature, UserComment, ReservationTour } = homeComponents;

export default function Home() {
  // ==================== 關閉 loading ====================
  useCloseLoading();

  return (
    <>
      <CustomHead />

      <main>
        <Banner />
        <CustomTopic />
        <SuggestCounselor />
        <PlatformFeature />
        <UserComment />
        <ReservationTour />
      </main>
    </>
  );
}

