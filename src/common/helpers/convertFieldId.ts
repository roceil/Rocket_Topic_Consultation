const convertFieldId = (inputField: string) => {
  switch (inputField) {
    case '職場議題':
      return 1;
    case '伴侶關係':
      return 2;
    case '人際關係':
      return 3;
    case '負面情緒':
      return 4;
    case '個人發展':
      return 5;
    case '家庭議題':
      return 6;
    default:
      return inputField;
  }
};

export default convertFieldId;
