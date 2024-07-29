import { getStorageItem } from './localStorageFunctions';

export default () => {
  const userData = JSON.parse(getStorageItem());
  const { token } = userData;
  return token;
};
