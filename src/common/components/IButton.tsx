/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
export const lightBtn = 'rounded-[50px] bg-white font-bold text-secondary fakeBorder';

export const darkBtn = 'rounded-[50px] bg-secondary font-bold text-white ';

export interface IButtonProps {
  text: string;
  fontSize: string;
  px?: string;
  py?: string;
  mode?: 'light' | 'dark';
  onClick?: () => void;
  extraStyle?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function IButton({ type, text, fontSize, px, py, mode, onClick, extraStyle }: IButtonProps) {
  const btnStyle = mode === 'dark' ? 'btnHoverDark' : 'btnHover';
  const textStyle = mode === 'dark' ? 'btnHoverTextDark' : 'btnHoverText';

  return (
    <button type={type || 'button'} className={`group ${btnStyle} ${px} ${py} ${extraStyle}`} onClick={onClick}>
      <span className={`${fontSize} ${textStyle}`}>{text}</span>
    </button>
  );
}
