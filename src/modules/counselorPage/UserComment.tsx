import Image from 'next/image';
import rateStar from 'public/images/rateStar.svg';

export default function UserComment() {
  return (
    <section className="bg-primary py-20 lg:py-[148px]">
      <div className="container flex flex-col items-center">
        <h2 className="mb-[46px] w-full text-center lg:mb-[72px] lg:text-left ">用戶好評</h2>

        <ul className="lg:flex lg:w-full lg:justify-between">
          <li>
            <div className="flex h-[338px] w-[284px] flex-col justify-between rounded-[20px] bg-white py-12 px-6 text-gray-900 shadow-md">
              <div>
                <ul className="mb-3 flex">
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                </ul>

                <p>平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師。</p>
              </div>

              <h3 className="text-xl font-bold">菲小姐</h3>
            </div>
          </li>

          <li className="hidden lg:block">
            <div className="flex h-[338px] w-[284px] flex-col justify-between rounded-[20px] bg-white py-12 px-6 text-gray-900 shadow-md">
              <div className="">
                <ul className="mb-3 flex">
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                </ul>

                <p className="mb-12">平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師。</p>
              </div>

              <h3 className="mb-2 text-xl font-bold">菲小姐</h3>
            </div>
          </li>

          <li className="hidden lg:block">
            <div className="flex h-[338px] w-[284px] flex-col justify-between rounded-[20px] bg-white py-12 px-6 text-gray-900 shadow-md">
              <div className="">
                <ul className="mb-3 flex">
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                </ul>

                <p className="mb-12">平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師。</p>
              </div>

              <h3 className="mb-2 text-xl font-bold">菲小姐</h3>
            </div>
          </li>

          <li className="hidden lg:block">
            <div className="flex h-[338px] w-[284px] flex-col justify-between rounded-[20px] bg-white py-12 px-6 text-gray-900 shadow-md">
              <div className="">
                <ul className="mb-3 flex">
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                  <li>
                    <Image src={rateStar} alt="rateStar" />
                  </li>
                </ul>

                <p className="mb-12">平台有心理師的簡介和評價，讓人更有方向去尋找。謝謝你們，讓遠在美國的我還可以找得到適合自己的心理師。</p>
              </div>

              <h3 className="mb-2 text-xl font-bold">菲小姐</h3>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
