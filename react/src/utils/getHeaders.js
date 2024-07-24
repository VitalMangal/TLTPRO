import { getStorageItem } from './localStorageFunctions';

export default (headers) => {
  const userData = JSON.parse(getStorageItem());
  const { token } = userData;
  if (token) {
    headers.set('authorization', `Token ${token}`);
  }
  return headers;
};
