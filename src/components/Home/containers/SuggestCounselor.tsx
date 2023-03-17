/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
// eslint-disable-next-line import/no-cycle
import CounselorCard from '../CounselorCard';
import { counselorRank } from '../../../lib/homeFilesRoute';

export default function SuggestCounselor() {
  return (
    <section className="bg-[#FAFAFF] ">
      <div className="container flex w-screen flex-col items-center  py-20 text-center">
        <h2 className="font-bold text-primary-heavy ">推薦諮商師</h2>
        <p className="mt-2 mb-3 text-primary lg:mt-3 lg:mb-[76px] lg:max-w-[612px] lg:text-lg">
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
          phasellus mollis sit aliquam sit nullam.
        </p>

        {/* 手機版輪播圖 */}
        <div className="block lg:hidden">
          <CounselorCard name="筱清" rankTag="我是第一名" />
        </div>

        {/* 電腦版 */}
        <ul className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-16">
          {counselorRank.map(({ name, rankTag }, index) => <CounselorCard key={index} name={name} rankTag={rankTag} />)}
        </ul>
      </div>
    </section>
  );
}
