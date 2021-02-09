export const wp = (viewportWidth: number, percentage: number) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};
