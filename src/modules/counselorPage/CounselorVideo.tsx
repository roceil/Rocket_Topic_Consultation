import Image from 'next/image';
import play from 'public/images/counselorPage/Play.svg';

export default function CounselorVideo({ VideoLink }:{ VideoLink:string | null }) {
  // console.log(VideoLink);
  let url;
  if (VideoLink) {
    url = VideoLink;
    url = url.replace('/watch?v=', '/embed/');
  }

  return (
    <div className="py-12 lg:py-14">
      <div className="container h-[212px] lg:h-[276px]">
        <iframe className={`h-full w-full hidden ${url && '!block'}`} src={url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
        <div className={`bg-primary-heavy flex-col rounded-xl h-full w-full flex justify-center items-center ${url && '!hidden'}`}>
          <Image src={play} alt="play" />
          <p className="text-gray-900 font-bold mt-3">尚無新增影片</p>
        </div>
      </div>
    </div>
  );
}

