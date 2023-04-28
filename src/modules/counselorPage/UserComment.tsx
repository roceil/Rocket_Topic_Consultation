import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import rateStar from 'public/images/rateStar.svg';
import { userCommentAry1 } from '@/lib/homeFilesRoute';

const rateStarAry = Array(5).fill(0);

export default function UserComment() {
  return (
    <section className="bg-primary py-20 lg:py-[148px]">
      <div className="container flex flex-col items-center">
        <h2 className="mb-[46px] w-full text-center lg:mb-[72px] lg:text-left ">用戶好評</h2>
        <div className="w-[320px] lg:w-[1220px]">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            loop
            spaceBetween={20}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {userCommentAry1.map((item) => (
              <SwiperSlide>
                <li>
                  <div className="flex h-[338px] maw-w-[284px] flex-col justify-between rounded-[20px] bg-white py-12 px-6 text-gray-900 shadow-md">
                    <div>
                      <ul className="mb-3 flex">
                        {rateStarAry.map(() => (
                          <li>
                            <Image src={rateStar} alt="rateStar" />
                          </li>
                        ))}
                      </ul>
                      <p>{item.comment}</p>
                    </div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                  </div>
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
