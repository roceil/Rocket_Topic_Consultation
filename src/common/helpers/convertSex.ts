const convertSex = (inputSex: string) => {
  switch (inputSex) {
    case 'other':
      return '其他';
    default:
      return inputSex;
  }
};

export default convertSex;
