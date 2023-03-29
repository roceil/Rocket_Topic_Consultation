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
    <button
      type="button"
      className={`btnHover group ${px} ${py}`}
    >
      <span className={`${fontSize} btnHoverText`}>{text}</span>
    </button>
  );
}
