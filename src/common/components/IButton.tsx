/* eslint-disable max-len */
export const lightBtn = 'rounded-[50px] bg-white font-bold text-secondary fakeBorder';

export const darkBtn = 'rounded-[50px] bg-secondary font-bold text-white ';

export interface IBtnStyle {
  text: string;
  bgColor: string;
  fontSize: string;
  px?: string;
  py?: string;
}

export function IButton({ text, bgColor, fontSize, px, py }: IBtnStyle) {
  return (
    // <input
    //   className={`${bgColor} ${fontSize} ${px} ${py} cursor-pointer hover:-translate-y-`}
    //   type="button"
    //   value={text}
    // />

    <div
      className={`inline-block ${px} ${py} ${fontSize} group relative overflow-hidden rounded-full inline-block fakeBorder bg-inherit [transform:translateZ(0)] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:origin-[100%_100%] before:scale-x-0 before:bg-secondary before:transition before:duration-500 before:ease-in-out hover:before:origin-[0_0] hover:before:scale-x-100`}
    >
      <span className="relative z-0 font-bold text-secondary transition duration-500 ease-in-out group-hover:text-gray-200 block">{text}</span>
    </div>
  );
}
