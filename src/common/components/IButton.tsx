/* eslint-disable max-len */
export const lightBtn = 'rounded-[50px] bg-white font-bold text-secondary fakeBorder';

export const darkBtn = 'rounded-[50px] bg-secondary font-bold text-white ';

export interface IBtnStyle {
  text: string;
  fontSize: string;
  px?: string;
  py?: string;
  mode?: 'light' | 'dark';
  // eslint-disable-next-line react/no-unused-prop-types
  onClick?: () => void;
}

export function IButton({ text, fontSize, px, py, mode }: IBtnStyle) {
  const btnStyle = mode === 'dark' ? 'btnHoverDark' : 'btnHover';
  const textStyle = mode === 'dark' ? 'btnHoverTextDark' : 'btnHoverText';
  return (
    <button type="button" className={`group ${btnStyle} ${px} ${py}`}>
      <span className={`${fontSize} ${textStyle}`}>{text}</span>
    </button>
  );
}
