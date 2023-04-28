import { homeComponents } from '@/lib/homeFilesRoute';
import CustomHead from '@/common/components/CustomHead';
import useCloseLoading from '@/common/hooks/useCloseLoading';
import Console from '@/lib/Console';

const {
  Banner,
  SuggestCounselor,
  CustomTopic,
  PlatformFeature,
  UserComment,
  ReservationTour,
} = homeComponents;

export default function Home() {
  // ==================== 關閉 loading ====================
  useCloseLoading();

  return (
    <>
      <CustomHead />
      <Console />

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
