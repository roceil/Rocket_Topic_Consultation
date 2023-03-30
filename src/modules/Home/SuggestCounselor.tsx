/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import CounselorCard from './CounselorCard';
import { counselorRank, topicCardAry } from '../../lib/homeFilesRoute';
import counselor1 from '../../../public/images/home/suggestCounselor/counselor1.svg';

export default function SuggestCounselor() {
  return (
    <section className="bg-primary ">
      <div className="container flex w-screen flex-col items-center  py-20 text-center">
        <h2>推薦諮商師</h2>
        <p className="subTitle w-[250px] sm:w-auto">不用出門，在線上就能找到陪伴你聊天的專業夥伴</p>

        {/* 手機版輪播圖 */}
        <div className="block lg:hidden">
          <CounselorCard name="筱清" rankTag="我是第一名" img={counselor1} skillsAry={topicCardAry} />
        </div>

        {/* 電腦版 */}
        <ul className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-16">
          {counselorRank.map(({ name, rankTag, img, skillsAry }) => (
            <CounselorCard key={name} name={name} rankTag={rankTag} img={img} skillsAry={skillsAry} />
          ))}
        </ul>
      </div>
    </section>
  );
}
