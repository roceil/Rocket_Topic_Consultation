/* eslint-disable import/no-cycle */
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import star from 'public/images/star.svg';
import { userCommentAry1, userCommentAry2 } from '@/lib/homeFilesRoute';

export default function UserComment() {
  console.log('userCommentAry1', userCommentAry1);
  return (
    <section className="overflow-hidden bg-primary-heavy">
      <div className="py-20 text-center lg:py-[160px]">
        <div className="flex flex-col items-center">
          <h2 className="mb-[49px] lg:mb-3">用戶好評</h2>
          <p className="subTitle mb-[116px] hidden lg:block lg:font-normal">上百名使用者體驗分享，快和他們一起學會擁抱自己</p>
        </div>

        <ul className="container flex flex-col space-y-[38px] lg:hidden">
          {userCommentAry1.map(({ name, comment, img }, index) => {
            if (index > 3) return null;
            return (
              <li key={name} className="flex h-[172px] w-full items-center justify-center rounded-[400px] bg-white px-8 lg:w-[400px] lg:pr-14">
                <div className="flex items-center justify-center space-x-4">
                  {/* 這是圖片 */}

                  <Image src={img} width={72} height={72} alt="user01" className="h-[72px] w-[72px] rounded-full object-cover" />

                  {/* 用戶名稱及評價 */}
                  <div className="">
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-gray-900">{name}</p>
                      <div className="flex space-x-2">
                        <Image src={star} width={20} height={19} alt="rate_star" />
                        <p className="items-center justify-center font-bold text-gray-900">5.0</p>
                      </div>
                    </div>

                    {/* 評價內容 */}
                    <p className="mt-2 max-w-[210px] text-left text-xs text-gray-900 sm:text-sm ">{comment}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className=" hidden flex-col items-center lg:block">
          {/* 第一條 */}
          <Marquee pauseOnHover gradient={false} speed={30}>
            {userCommentAry1.map(({ name, comment, img }) => (
              <div key={name} className="mr-5 h-[172px] w-[380px] rounded-[400px] bg-white px-8 py-[27px] lg:w-[400px] lg:pr-14">
                <div className="flex items-center justify-center space-x-4 h-full">
                  {/* 這是圖片 */}
                  <Image src={img} width={72} height={72} alt="user01" className="h-[72px] w-[72px] rounded-full object-cover" />

                  {/* 用戶名稱及評價 */}
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-gray-900">{name}</p>
                      <div className="flex space-x-2">
                        <Image src={star} width={20} height={19} alt="rate_star" />
                        <p className="items-center justify-center font-bold text-gray-900">5.0</p>
                      </div>
                    </div>

                    {/* 評價內容 */}
                    <p className="mt-2 max-w-[210px] text-left text-sm text-gray-900 min-h-[80px]">{comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>

          {/* 第二條 */}
          <Marquee pauseOnHover gradient={false} speed={30} className="mt-14" direction="right">
            {userCommentAry2.map(({ name, comment, img }) => (
              <div key={name} className="mr-5 h-[172px] w-[380px] rounded-[400px] bg-white px-8 py-[27px] lg:w-[400px] lg:pr-14">
                <div className="flex items-center justify-center space-x-4 h-full">
                  {/* 這是圖片 */}
                  <Image src={img} width={72} height={72} alt="user01" className="h-[72px] w-[72px] rounded-full object-cover" />

                  {/* 用戶名稱及評價 */}
                  <div className="">
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-gray-900">{name}</p>
                      <div className="flex space-x-2">
                        <Image src={star} width={20} height={19} alt="rate_star" />
                        <p className="items-center justify-center font-bold text-gray-900">5.0</p>
                      </div>
                    </div>

                    {/* 評價內容 */}
                    <p className="mt-2 max-w-[210px] text-left text-sm text-gray-900 min-h-[80px]">{comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
