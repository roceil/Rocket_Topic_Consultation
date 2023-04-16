export default function CounselorRate() {
  return (
    <div className="container">
      <div className="flex flex-col items-center border-t border-secondary py-12 lg:py-14">
        <h2 className="mb-7 text-center lg:w-full lg:text-left lg:text-lg">諮商師評論數據</h2>

        <ul className="flex w-full max-w-[308px] py-3 lg:max-w-[356px]">
          <li className="w-1/3 font-bold text-secondary">
            <p className="mb-1 lg:text-2xl">
              99
              <span className="text-gray-500">％</span>
            </p>
            <p>滿意度</p>
          </li>

          <li className="w-1/3 min-w-[112px] border-x border-secondary text-center font-bold text-secondary">
            <p className="mb-1 lg:text-2xl">
              100
              <span className="text-gray-500">％</span>
            </p>
            <p>出席率</p>
          </li>

          <li className="w-1/3 text-end font-bold text-secondary">
            <p className="mb-1 lg:text-2xl">
              100
              <span className="text-gray-500">＋</span>
            </p>
            <p>個案人數</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
