import { getStorageItem } from './localStorageFunctions.ts';

export default () => {
  const userData = JSON.parse(getStorageItem());
  const { token } = userData;
  return token;
};
