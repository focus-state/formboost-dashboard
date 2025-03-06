// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (obj: any) => {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
};
