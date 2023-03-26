import Image from 'next/image';
import right from '../../../../public/images/right.svg';

export default function CounselorCaseRecord() {
  return (
    <div className="rounded-2xl bg-bg2 pb-9 lg:pb-12">
      <ul className="flex border-b border-secondary py-5 px-5 text-center text-sm font-bold text-primary-heavy">
        <li className="w-[44.1176%]">個案記錄</li>
        <li className="w-[44.1176%]">記錄筆數</li>
        <li className="w-[11.7647%]" />
      </ul>

      <ul className=" space-y-4 px-5 pt-5">
        <li className="w-full">
          <button
            type="button"
            className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy"
          >
            <div className="w-[44.1176%]">
              <div className="flex items-center justify-center space-x-4">
                <Image
                  width={40}
                  height={40}
                  src="https://fakeimg.pl/40x40/EEECFA/"
                  alt="user_pic"
                  className="rounded-full"
                />
                <p>哈哈哈</p>
              </div>
            </div>

            <div className="w-[44.1176%] lg:w-[16.3179%]">5筆</div>

            <div className="flex w-[11.7647%] justify-center lg:w-[17.364%] lg:pl-[46px]">
              <Image src={right} width={16} height={16} alt="icons" />
            </div>
          </button>
        </li>

        <li className="w-full">
          <button
            type="button"
            className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy"
          >
            <div className="w-[44.1176%]">
              <div className="flex items-center justify-center space-x-4">
                <Image
                  width={40}
                  height={40}
                  src="https://fakeimg.pl/40x40/EEECFA/"
                  alt="user_pic"
                  className="rounded-full"
                />
                <p>哈哈哈</p>
              </div>
            </div>

            <div className="w-[44.1176%] lg:w-[16.3179%]">5筆</div>

            <div className="flex w-[11.7647%] justify-center lg:w-[17.364%] lg:pl-[46px]">
              <Image src={right} width={16} height={16} alt="icons" />
            </div>
          </button>
        </li>

        <li className="w-full">
          <button
            type="button"
            className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy"
          >
            <div className="w-[44.1176%]">
              <div className="flex items-center justify-center space-x-4">
                <Image
                  width={40}
                  height={40}
                  src="https://fakeimg.pl/40x40/EEECFA/"
                  alt="user_pic"
                  className="rounded-full"
                />
                <p>哈哈哈</p>
              </div>
            </div>

            <div className="w-[44.1176%] lg:w-[16.3179%]">5筆</div>

            <div className="flex w-[11.7647%] justify-center lg:w-[17.364%] lg:pl-[46px]">
              <Image src={right} width={16} height={16} alt="icons" />
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
}
