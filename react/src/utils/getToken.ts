import { getStorageItem } from './localStorageFunctions.ts';

export default () => {
  if(getStorageItem()) {
    const userData = JSON.parse(getStorageItem() as string);
    const { token } = userData;
    return token;
  }
};
