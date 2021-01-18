export const isValidString = (source: string | undefined): boolean => {
  if (source && source.length > 0) {
    return true;
  }

  return false;
};
