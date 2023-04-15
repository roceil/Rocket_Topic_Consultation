import Image from 'next/image';
import { useSelector } from 'react-redux';
import loadingImg from 'public/loading/base64.json';

export default function Loading() {
  const imgData = `data:image/png;base64,${loadingImg}`;
  const loading = useSelector((state:{ loadingSlice:{ value:string } }) => state.loadingSlice.value);
  const isLoading = loading === 'isLoading' ? 'block' : 'hidden';

  return (
    <div className={`${isLoading} fixed top-0 left-0 z-50 flex flex-col h-full w-screen items-center justify-center bg-white/80 `}>
      <Image src={imgData} alt="Loading..." width={100} height={100} priority />
    </div>
  );
}
