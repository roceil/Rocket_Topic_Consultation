const convertDescription = (text: string) => {
  if (text === null) return '';
  if (text.length > 35) {
    return `${text.substring(0, 35)}...`;
  }
  return text;
};

export default convertDescription;
