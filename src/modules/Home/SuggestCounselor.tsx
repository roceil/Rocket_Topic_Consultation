/* eslint-disable import/no-cycle */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { counselorRank } from '@/lib/homeFilesRoute';
import CounselorCard from './CounselorCard';

export default function SuggestCounselor() {
  return (
    <section className="bg-primary">
      <div className="bg-primary-tint">
        <div className="wavesTop" />
      </div>

      <div className="container flex w-screen flex-col items-center  py-6 text-center lg:py-20">
        <h2>推薦諮商師</h2>
        <p className="subTitle w-[250px] sm:w-auto">不用出門，在線上就能找到陪伴你聊天的專業夥伴</p>

        {/* 手機版輪播圖 */}
        <div className=" block w-[375px] sm:w-[428px] lg:hidden">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            slidesPerView="auto"
            loop
          >
            {counselorRank.map(({ name, rankTag, img, skillsAry, id }) => (
              <SwiperSlide key={name}>
                <CounselorCard key={name} name={name} id={id} rankTag={rankTag} img={img} skillsAry={skillsAry} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 電腦版 */}
        <ul className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-16">
          {counselorRank.map(({ name, rankTag, img, skillsAry, id }) => (
            <CounselorCard key={name} name={name} id={id} rankTag={rankTag} img={img} skillsAry={skillsAry} />
          ))}
        </ul>
      </div>

      <div className="rotate-180 bg-primary-tint">
        <div className="wavesTop" />
      </div>
    </section>
  );
}
