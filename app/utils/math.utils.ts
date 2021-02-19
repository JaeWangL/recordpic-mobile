export const isEven = (value: number): boolean => {
  return value % 2 === 0;
};

export const wp = (viewportWidth: number, percentage: number) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};
