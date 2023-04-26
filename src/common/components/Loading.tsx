import { useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import loadingImg from 'public/loading/base64.json';
import { loadingStatus } from '../redux/feature/loading';

export default function Loading() {
  const dispatch = useDispatch();
  const imgData = `data:image/png;base64,${loadingImg}`;
  const loading = useSelector((state: { loadingSlice: { value: string } }) => state.loadingSlice.value);
  const isLoading = loading === 'isLoading' ? 'block' : 'hidden';

  // 如果 loading 3秒後還沒關閉，就自動關閉
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(loadingStatus('none'));
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${isLoading} fixed top-0 left-0 z-50 flex h-full w-screen flex-col items-center justify-center bg-white/80 `}>
      <Image src={imgData} alt="Loading..." width={100} height={100} priority />
    </div>
  );
}
