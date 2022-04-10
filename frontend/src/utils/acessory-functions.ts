export const KebabCase = (text: string) => {
  return text.replaceAll(' ', '-').toLowerCase();
};
