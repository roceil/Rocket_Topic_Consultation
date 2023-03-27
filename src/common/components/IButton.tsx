export const lightBtn = 'rounded-[50px] bg-white font-bold text-secondary border-[1px] border-secondary';

export const darkBtn = 'rounded-[50px] bg-secondary font-bold text-white ';

export interface IBtnStyle {
  text: string;
  bgColor: string;
  fontSize: string;
  px?: string;
  py?: string;
}

export function IButton({
  text, bgColor, fontSize, px, py,
}: IBtnStyle) {
  return (
    <input
      className={`${bgColor} ${fontSize} ${px} ${py} cursor-pointer hover:opacity-50`}
      type="button"
      value={text}
    />
  );
}
