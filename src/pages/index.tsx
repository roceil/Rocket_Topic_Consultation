import useCloseLoading from '@/common/hooks/useCloseLoading';
import { homeComponents } from '@/lib/homeFilesRoute';
import CustomHead from '@/common/components/CustomHead';

import { useEffect, useState } from 'react';

const { Banner, SuggestCounselor, CustomTopic, PlatformFeature, UserComment, ReservationTour } = homeComponents;

export default function Home() {
  // ==================== 關閉 loading ====================
  useCloseLoading();
  const [response, setResponse] = useState(null);

  const handleClick = async () => {
    const res = await fetch('https://pi-rocket-coding-1fro0rqmc-roceil.vercel.app/api/success', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* 可以在這裡傳遞 POST 資料 */ }),
    });
    const data = await res.json();
    setResponse(data);
  };

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <>
      <CustomHead />

      <main>
        <div>
          <button type="button" onClick={handleClick}>發送 POST 請求</button>
          {response && (
          <p>
            API 回應:
            {' '}
            {JSON.stringify(response)}
          </p>
          )}
        </div>
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

