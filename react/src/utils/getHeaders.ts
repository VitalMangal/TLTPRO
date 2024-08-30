import { getStorageItem } from './localStorageFunctions.ts';

export default (headers: Headers) => {
    if(getStorageItem()) {
      const userData = JSON.parse(getStorageItem() as string);
      const { token } = userData;
      if (token) {
        headers.set('authorization', `Token ${token}`);
      }
    }
  return headers;
};
