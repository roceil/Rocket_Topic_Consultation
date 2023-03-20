export const lightBtn = 'rounded-[50px] bg-white font-bold text-primary-heavy border-[1px] border-primary-heavy';

export const darkBtn = 'rounded-[50px] bg-primary-heavy font-bold text-white ';

export interface IBtnStyle {
  text: string;
  bgColor: string;
  fontSize: string;
  px?: string;
  py?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  onClick?: () => void;
}

export function IButton({
  text, bgColor, fontSize, px, py, onClick,
}: IBtnStyle) {
  return (
    <input
      className={`${bgColor} ${fontSize} ${px} ${py}`}
      type="button"
      value={text}
      onClick={onClick}
    />
  );
}
