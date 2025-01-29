export const getItemFromLocalStorage = (
  key: string,
  isJSON: boolean
): string => {
  return isJSON
    ? JSON.parse(localStorage.getItem(key)!)
    : localStorage.getItem(key)!;
};

export const notItemInLocalStorage = (key: string): boolean => {
  return !localStorage.getItem(key);
};

export const setItemInLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, value);
};
