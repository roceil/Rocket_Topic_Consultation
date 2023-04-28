
export default function Console() {
  const asciiArt = [
    '_____      _     _____                      _             _   ',
    '|  __ ＼  (_)    |  __ ＼                   | |           | |  ',
    '| |__) |  _      | |__) |    ___     ___   | | __   ___  | |_ ',
    '|  ___/  | |     |  _  /    / _ ＼   / __| | |/ /  / _ ＼ | __|',
    '| |      | |  _  | | ＼ ＼  | (_) | | (__  |   <   |  __/ | |_ ',
    '|_|      |_| (_) |_|  ＼_＼ ＼___/   ＼___| |_|＼_＼ ＼___| ＼__|',
  ];

  console.log(
    asciiArt
      .map((line) => line
        .split('')
        .map((char) => String.fromCharCode(char.charCodeAt(0)))
        .join(''))
      .join('\n'),
  );

  return null;
}
