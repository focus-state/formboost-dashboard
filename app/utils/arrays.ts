export const getSingleParamValue = <T>(param: T[] | T): T => {
  return Array.isArray(param) ? param[0] : param;
};
